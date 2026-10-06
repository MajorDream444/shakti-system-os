/* Delivery of the seeker welcome + Shakti Waterfall, and what happens either way.

   This module exists to enforce one rule that the previous system broke
   silently:

     SEQUENCE STATE ADVANCES ONLY AFTER RESEND ACCEPTS THE MESSAGE.

   Under Airtable's native action the send failed and the automation halted
   BEFORE its updateRecord step, which left the seeker with no Sequence Step —
   a state no later sequence selects. The failure was invisible and permanent.
   Here the ordering is explicit and every branch is accounted for:

     accepted → mark Sequence Step = 1, stamp Last Sequence At, store the id
     failed   → leave Sequence Step UNSET, flag for human review, alert Sheetal
     skipped  → do nothing at all, because nothing was promised

   "Hold Privately" is the skipped case. No email means no attempt, no mark,
   no promise — the confirmation screen already says so. */

import {
  buildDeliveryFailureAlert,
  buildSeekerWelcomeEmail,
} from "./emailTemplates.js";
import {
  getResendConfig,
  sendViaResend,
  type ResendConfig,
  type ResendSendResult,
} from "./resendClient.js";

export type SequenceStateWriter = {
  /* Called only on acceptance. Advances the seeker to step 1 and records when
     and with which Resend message, so a duplicate can be traced to its id. */
  markWaterfallDelivered(input: {
    seekerRecordId: string;
    messageId: string;
    occurredAt: string;
  }): Promise<void>;
  /* Called only on failure. Does NOT touch Sequence Step. */
  recordDeliveryFailure(input: {
    seekerRecordId: string;
    reason: string;
    occurredAt: string;
  }): Promise<void>;
};

export type SeekerDeliveryOutcome = {
  attempted: boolean;
  result: ResendSendResult;
  sequenceAdvanced: boolean;
};

export type DeliverSeekerWelcomeDeps = {
  env: Record<string, string | undefined>;
  writer: SequenceStateWriter;
  fetchImpl?: typeof fetch;
  now?: () => Date;
  logger?: { info: (e: string, d?: unknown) => void; error: (e: string, d?: unknown) => void };
  /* Where failure alerts go. Sheetal is a collaborator, so this address has
     always worked — but it goes through Resend here so there is one transport
     to reason about, not two. */
  alertAddress?: string;
  resendConfigOverride?: ResendConfig | null;
};

const DEFAULT_ALERT_ADDRESS = "sheetalkandola@gmail.com";

export async function deliverSeekerWelcome(
  input: { seekerRecordId: string; email?: string; firstName?: string; idempotencyKey: string },
  deps: DeliverSeekerWelcomeDeps,
): Promise<SeekerDeliveryOutcome> {
  const logger = deps.logger ?? { info: () => {}, error: () => {} };
  const occurredAt = (deps.now?.() ?? new Date()).toISOString();

  /* Hold Privately. Nothing was promised, so nothing is attempted or marked. */
  if (!input.email?.trim()) {
    return {
      attempted: false,
      result: { outcome: "skipped", reason: "No email given — held privately" },
      sequenceAdvanced: false,
    };
  }

  const config =
    deps.resendConfigOverride !== undefined
      ? deps.resendConfigOverride
      : getResendConfig(deps.env);

  const email = buildSeekerWelcomeEmail({ firstName: input.firstName });

  const result = await sendViaResend(
    config,
    {
      to: input.email.trim(),
      subject: email.subject,
      text: email.text,
      /* Keyed on the Begin submission, so a double-submitted form or a retried
         request cannot produce two welcomes. Resend de-duplicates for 24h. */
      idempotencyKey: `seeker-welcome:${input.idempotencyKey}`,
    },
    deps.fetchImpl,
  );

  if (result.outcome === "accepted") {
    /* The mark is a separate write and can itself fail. If it does, the woman
       HAS her practice and the worst case is a day-three email that repeats
       the invitation — recoverable, and far better than the inverse. It is
       logged loudly so it is not silent either way. */
    try {
      await deps.writer.markWaterfallDelivered({
        seekerRecordId: input.seekerRecordId,
        messageId: result.messageId,
        occurredAt,
      });
      logger.info("waterfall_delivered", {
        seekerRecordId: input.seekerRecordId,
        messageId: result.messageId,
      });
      return { attempted: true, result, sequenceAdvanced: true };
    } catch (error) {
      logger.error("waterfall_delivered_but_state_not_written", {
        seekerRecordId: input.seekerRecordId,
        messageId: result.messageId,
        message: error instanceof Error ? error.message : "Unknown error",
      });
      return { attempted: true, result, sequenceAdvanced: false };
    }
  }

  if (result.outcome === "skipped") {
    /* No key configured. The record stands, nothing is marked, and this is
       logged as a configuration problem rather than a delivery failure so it
       does not read as "Resend rejected her". */
    logger.error("waterfall_delivery_skipped", {
      seekerRecordId: input.seekerRecordId,
      reason: result.reason,
    });
    return { attempted: false, result, sequenceAdvanced: false };
  }

  /* Failed. Preserve the record, record the failure, tell Sheetal. Sequence
     Step is deliberately left unset so no later email assumes she has the
     practice, and so she shows up as owed something rather than disappearing. */
  logger.error("waterfall_delivery_failed", {
    seekerRecordId: input.seekerRecordId,
    reason: result.reason,
  });

  try {
    await deps.writer.recordDeliveryFailure({
      seekerRecordId: input.seekerRecordId,
      reason: result.reason,
      occurredAt,
    });
  } catch (error) {
    logger.error("waterfall_failure_not_recorded", {
      seekerRecordId: input.seekerRecordId,
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }

  const alert = buildDeliveryFailureAlert({
    seekerRecordId: input.seekerRecordId,
    recipient: input.email.trim(),
    firstName: input.firstName,
    reason: result.reason,
  });

  /* Best effort. If the alert itself cannot go out, the Airtable flag is still
     set and the row is visible — the human path does not depend on this email. */
  await sendViaResend(
    config,
    {
      to: deps.alertAddress ?? DEFAULT_ALERT_ADDRESS,
      subject: alert.subject,
      text: alert.text,
      idempotencyKey: `delivery-failure:${input.idempotencyKey}`,
    },
    deps.fetchImpl,
  ).catch(() => undefined);

  return { attempted: true, result, sequenceAdvanced: false };
}
