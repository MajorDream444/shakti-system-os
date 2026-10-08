/* Buyer welcome delivery, called by the Stripe webhook once a Payments row
   exists.

   Same rule as the seeker path, for the same reason:

     THE BUYER IS MARKED WELCOMED ONLY AFTER RESEND ACCEPTS THE MESSAGE.

   And one rule specific to money: a delivery problem must never cost us the
   payment record. The row is written first and is never rolled back. The worst
   case this module can produce is a recorded payment whose buyer has not yet
   heard from Sheetal — visible, queryable, and recoverable by a human. The
   inverse, a silent buyer with no record, is not.

   IDEMPOTENCY has two layers, because Stripe retries and duplicate events are
   normal rather than exceptional:

     1. the webhook returns early when a row already exists for the session, so
        a retry never reaches this module at all;
     2. every send carries an idempotency key derived from the Stripe session
        id, so even if it did, Resend de-duplicates for 24 hours.

   Dancing with Durga Devi opens on 11 October. If this path is wrong, a woman
   pays and silently receives no Zoom link. That is the failure this file
   exists to make impossible. */

import {
  buildBuyerWelcomeEmail,
  type BuyerWelcomeOffering,
} from "./emailTemplates.js";
import {
  getAlertConfig,
  getResendConfig,
  sendViaResend,
  type ResendConfig,
  type ResendSendResult,
} from "./resendClient.js";

/* The Payments table's "Offering" single-select, as the webhook derives it,
   mapped to the welcome bodies. Anything unmatched stays null and is treated
   as Skipped — the webhook's existing "Other" behaviour, which flags the row
   for a human rather than improvising an email nobody wrote. */
const OFFERING_BY_AIRTABLE_VALUE: Record<string, BuyerWelcomeOffering> = {
  "Dancing with Durga": "dancing-with-durga",
  "Shakti Embodiment": "shakti-embodiment",
  "Shala Membership": "shala-membership",
};

export function offeringToTemplateKey(airtableValue: string): BuyerWelcomeOffering | null {
  return OFFERING_BY_AIRTABLE_VALUE[airtableValue] ?? null;
}

export type BuyerWelcomeState = {
  status: "Sent" | "Failed" | "Skipped";
  messageId?: string;
  attemptedAt: string;
  failureReason?: string;
  /* Only ever true alongside status "Sent". The webhook writes this to the
     Welcome Sent checkbox, so the box means "Resend took it", not "we tried". */
  welcomeSent: boolean;
};

export type DeliverBuyerWelcomeInput = {
  paymentRecordId: string;
  sessionId: string;
  buyerEmail: string;
  buyerName?: string;
  /* The Airtable single-select value, e.g. "Dancing with Durga". */
  offering: string;
};

export type DeliverBuyerWelcomeDeps = {
  env: Record<string, string | undefined>;
  fetchImpl?: typeof fetch;
  now?: () => Date;
  logger?: { info: (e: string, d?: unknown) => void; error: (e: string, d?: unknown) => void };
  alertAddress?: string;
  resendConfigOverride?: ResendConfig | null;
};

const DEFAULT_ALERT_ADDRESS = "sheetalkandola@gmail.com";

export async function deliverBuyerWelcome(
  input: DeliverBuyerWelcomeInput,
  deps: DeliverBuyerWelcomeDeps,
): Promise<{ state: BuyerWelcomeState; result: ResendSendResult }> {
  const logger = deps.logger ?? { info: () => {}, error: () => {} };
  const attemptedAt = (deps.now?.() ?? new Date()).toISOString();

  const skip = (failureReason: string): { state: BuyerWelcomeState; result: ResendSendResult } => ({
    state: { status: "Skipped", attemptedAt, failureReason, welcomeSent: false },
    result: { outcome: "skipped", reason: failureReason },
  });

  if (!input.buyerEmail?.trim()) {
    return skip("Stripe session carried no buyer email, so nothing could be sent.");
  }

  const templateKey = offeringToTemplateKey(input.offering);
  if (!templateKey) {
    /* Matches the webhook's existing "Other" branch: no email is invented for
       an offering Sheetal has not written one for. */
    return skip(
      `No welcome is written for the offering "${input.offering}". Write to this buyer personally.`,
    );
  }

  const email = buildBuyerWelcomeEmail({ firstName: input.buyerName, offering: templateKey });
  if (!email) {
    return skip(`No welcome body for "${input.offering}". Write to this buyer personally.`);
  }

  const config =
    deps.resendConfigOverride !== undefined ? deps.resendConfigOverride : getResendConfig(deps.env);

  const result = await sendViaResend(
    config,
    {
      to: input.buyerEmail.trim(),
      subject: email.subject,
      text: email.text,
      /* Keyed on the Stripe session, so the same purchase can never produce
         two welcomes even if the event arrives twice. */
      idempotencyKey: `buyer-welcome:${input.sessionId}`,
    },
    deps.fetchImpl,
  );

  if (result.outcome === "accepted") {
    logger.info("buyer_welcome_sent", {
      paymentRecordId: input.paymentRecordId,
      offering: input.offering,
      messageId: result.messageId,
    });
    return {
      state: {
        status: "Sent",
        messageId: result.messageId,
        attemptedAt,
        welcomeSent: true,
      },
      result,
    };
  }

  if (result.outcome === "skipped") {
    logger.error("buyer_welcome_skipped", {
      paymentRecordId: input.paymentRecordId,
      reason: result.reason,
    });
    return skip(result.reason);
  }

  /* Failed. The payment stands; the buyer is NOT marked welcomed; Sheetal is
     told, with everything she needs to write the email by hand. */
  logger.error("buyer_welcome_failed", {
    paymentRecordId: input.paymentRecordId,
    reason: result.reason,
  });

  /* Pinned alert config, not the customer one — see getAlertConfig. */
  await sendViaResend(
    deps.resendConfigOverride !== undefined ? deps.resendConfigOverride : getAlertConfig(deps.env),
    {
      to: deps.alertAddress ?? DEFAULT_ALERT_ADDRESS,
      subject: "ACTION NEEDED — a buyer has paid and did not receive her welcome",
      text: `Someone has paid and her welcome email did not send.

Name:      ${input.buyerName || "(not given)"}
Email:     ${input.buyerEmail}
Offering:  ${input.offering}
Payment:   ${input.paymentRecordId}
Stripe:    ${input.sessionId}
Reason:    ${result.reason}

Her payment IS recorded. Welcome Sent is deliberately unticked and Welcome
Status reads Failed, so she stays visible in the Payments table rather than
looking handled.

What to do: write to her directly with her access details. For Dancing with
Durga Devi that is the Zoom link, the dates of 11, 13, 15 and 17 October, and
the calendar link.`,
      idempotencyKey: `buyer-welcome-failure:${input.sessionId}`,
    },
    deps.fetchImpl,
  ).catch(() => undefined);

  return {
    state: {
      status: "Failed",
      attemptedAt,
      failureReason: result.reason,
      welcomeSent: false,
    },
    result,
  };
}
