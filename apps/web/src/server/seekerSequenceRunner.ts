/* The day-three and day-seven notes, moved off Airtable onto Resend.

   WHY THIS EXISTS. Until 9 October these were Airtable automations. They ran
   every morning and reported success, but they had never sent a single email:
   Airtable's native Send Email action cannot reach anyone who is not a
   collaborator on the base. Retiring them without a replacement would have
   left every seeker with a welcome, a practice, and then permanent silence —
   worse than the broken state, because it looks finished.

   Airtable could not simply "use Resend": its automations can only send
   through their own action, and routing them via a script would mean putting
   the Resend key inside Airtable, which is out of bounds. So the TRIGGER
   moves to a Vercel cron and the TRANSPORT to Resend. Airtable stays as the
   database that says who is due.

   THE RULE IS THE SAME AS THE WELCOME, and it is the whole point:

     A SEEKER IS NEVER ADVANCED PAST AN EMAIL SHE DID NOT RECEIVE.

   A failed send leaves her at her current step, so the next run tries again
   rather than skipping her forward into silence. That is deliberate: a
   transient Resend outage should self-heal tomorrow, not quietly cost someone
   a letter. The only thing that can advance a step is Resend accepting. */

import {
  buildDaySevenEmail,
  buildDayThreeEmail,
} from "./emailTemplates.js";
import {
  getResendConfig,
  sendViaResend,
  type ResendConfig,
} from "./resendClient.js";
import type { BeginWriteRepository, SeekerDueForSequence } from "./airtableWriteRepository.js";

/* Matches the cadence the retired automations used, so the rhythm a seeker
   experiences is unchanged by the move.

     step 1 -> 2   three days after the welcome
     step 2 -> 3   four more days, so day seven overall */
export const SEQUENCE_STAGES = [
  { fromStep: 1, toStep: 2, minDaysSinceLast: 3, label: "day-three" },
  { fromStep: 2, toStep: 3, minDaysSinceLast: 4, label: "day-seven" },
] as const;

export type SequenceRunSummary = {
  stage: string;
  due: number;
  sent: number;
  failed: number;
  /* Resend ids for the accepted sends, so a run can be audited afterwards. */
  messageIds: string[];
  failures: Array<{ seekerRecordId: string; reason: string }>;
};

export type RunSeekerSequenceDeps = {
  env: Record<string, string | undefined>;
  repository: BeginWriteRepository;
  fetchImpl?: typeof fetch;
  now?: () => Date;
  logger?: { info: (e: string, d?: unknown) => void; error: (e: string, d?: unknown) => void };
  resendConfigOverride?: ResendConfig | null;
};

function buildForStage(stage: (typeof SEQUENCE_STAGES)[number], seeker: SeekerDueForSequence) {
  return stage.toStep === 2
    ? buildDayThreeEmail({
        pathwayPhrase: seeker.pathwayPhrase,
        pathwaySuffix: seeker.pathwaySuffix,
      })
    : buildDaySevenEmail();
}

export async function runSeekerSequence(
  deps: RunSeekerSequenceDeps,
): Promise<SequenceRunSummary[]> {
  const logger = deps.logger ?? { info: () => {}, error: () => {} };
  const config =
    deps.resendConfigOverride !== undefined ? deps.resendConfigOverride : getResendConfig(deps.env);

  const summaries: SequenceRunSummary[] = [];

  for (const stage of SEQUENCE_STAGES) {
    const summary: SequenceRunSummary = {
      stage: stage.label,
      due: 0,
      sent: 0,
      failed: 0,
      messageIds: [],
      failures: [],
    };

    let due: SeekerDueForSequence[] = [];
    try {
      due = await deps.repository.findSeekersDueForStep({
        currentStep: stage.fromStep,
        minDaysSinceLast: stage.minDaysSinceLast,
      });
    } catch (error) {
      /* One stage failing to query must not stop the other. */
      logger.error("sequence_query_failed", {
        stage: stage.label,
        message: error instanceof Error ? error.message : "Unknown error",
      });
      summaries.push(summary);
      continue;
    }

    summary.due = due.length;

    for (const seeker of due) {
      const email = buildForStage(stage, seeker);
      const occurredAt = (deps.now?.() ?? new Date()).toISOString();

      const result = await sendViaResend(
        config,
        {
          to: seeker.email,
          subject: email.subject,
          text: email.text,
          /* Keyed on the seeker AND the step, so a run that fires twice in a
             day — a retried cron, a manual trigger — cannot send the same
             note twice. Resend de-duplicates on this for 24 hours. */
          idempotencyKey: `seeker-step-${stage.toStep}:${seeker.id}`,
        },
        deps.fetchImpl,
      );

      if (result.outcome !== "accepted") {
        summary.failed += 1;
        summary.failures.push({ seekerRecordId: seeker.id, reason: result.reason });
        logger.error("sequence_send_failed", {
          stage: stage.label,
          seekerRecordId: seeker.id,
          reason: result.reason,
        });
        /* Step deliberately NOT advanced. She stays due, and tomorrow's run
           tries again. */
        continue;
      }

      try {
        await deps.repository.advanceSequenceStep({
          seekerRecordId: seeker.id,
          toStep: stage.toStep,
          occurredAt,
        });
        summary.sent += 1;
        summary.messageIds.push(result.messageId);
      } catch (error) {
        /* She HAS the email; only the bookkeeping failed. Counted as sent,
           because it was, and logged loudly — the cost is that tomorrow's run
           may send it again, which the idempotency key suppresses for 24h. */
        summary.sent += 1;
        summary.messageIds.push(result.messageId);
        logger.error("sequence_sent_but_step_not_advanced", {
          stage: stage.label,
          seekerRecordId: seeker.id,
          messageId: result.messageId,
          message: error instanceof Error ? error.message : "Unknown error",
        });
      }
    }

    logger.info("sequence_stage_complete", {
      stage: stage.label,
      due: summary.due,
      sent: summary.sent,
      failed: summary.failed,
    });
    summaries.push(summary);
  }

  return summaries;
}
