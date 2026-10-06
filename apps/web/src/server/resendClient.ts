/* Resend transport for every customer-facing email.

   WHY THIS EXISTS. Airtable's native Send Email action cannot reach anyone who
   is not a collaborator on the base. Proven 6 October: run wfxGwMRUJ0WgzNxPs
   failed with NON_COLLABORATOR_RECIPIENTS while, in the same second and from
   the same new record, the alert addressed to Sheetal succeeded. So no seeker
   had ever received a welcome and no buyer would have received one either.
   Airtable keeps the records and the sequence state; Resend carries the mail.

   ── THE KEY ────────────────────────────────────────────────────────────────
   RESEND_API_KEY is read from the server environment and nowhere else. It is
   never imported into client code, never written to the repository, never put
   in Airtable, and never logged. This module is server-only: it lives behind
   /api, and nothing under src/components or src/begin may import it.

   A missing key is NOT an error that throws. It returns a structured
   `skipped` result, because the one behaviour we must never have is a seeker
   whose record is lost or whose sequence advances on a send that never
   happened. Callers decide what to do with each outcome. */

export type ResendSendInput = {
  to: string;
  subject: string;
  /* Plain text. Resend accepts `text` and renders it faithfully; the founder
     copy is written as prose with light markdown emphasis, and a text part is
     what keeps her voice intact without a template engine in between. */
  text: string;
  html?: string;
  /* Overrides the default sender. Used by nothing today; present so a future
     transactional stream can use a different From without touching callers. */
  from?: string;
  replyTo?: string;
  /* Resend de-duplicates on this header for 24h, which is what makes a retried
     webhook or a double-submitted form safe. */
  idempotencyKey?: string;
};

export type ResendSendResult =
  /* Resend accepted the message and returned an id. This — and only this —
     is what may advance a seeker's sequence state. */
  | { outcome: "accepted"; messageId: string }
  /* The send was not attempted: no key configured, or no recipient. Not a
     failure; nothing is owed and nothing should be marked. */
  | { outcome: "skipped"; reason: string }
  /* Resend was reached and refused, or the network failed. The caller must
     preserve the record, record the failure and notify Sheetal. */
  | { outcome: "failed"; reason: string; status?: number };

export type ResendConfig = {
  apiKey: string;
  fromName: string;
  fromAddress: string;
  replyTo: string;
};

const RESEND_ENDPOINT = "https://api.resend.com/emails";

/* Default sender.

   Resend will not send from gmail.com — a free mailbox provider cannot be
   domain-verified by a third party, and SPF/DKIM would fail. So mail goes out
   from a verified srishaktishala.com address and REPLIES go to her Gmail,
   which is where she already reads them. That split is deliberate:
   `hello@srishaktishala.com` is a sending identity, not a mailbox she has to
   watch. */
export const DEFAULT_FROM_ADDRESS = "hello@srishaktishala.com";
export const DEFAULT_FROM_NAME = "Sheetal Kandola";
export const DEFAULT_REPLY_TO = "sheetalkandola@gmail.com";

export function getResendConfig(env: Record<string, string | undefined>): ResendConfig | null {
  const apiKey = env.RESEND_API_KEY;
  if (!apiKey) return null;

  return {
    apiKey,
    fromName: env.RESEND_FROM_NAME || DEFAULT_FROM_NAME,
    fromAddress: env.RESEND_FROM_ADDRESS || DEFAULT_FROM_ADDRESS,
    replyTo: env.RESEND_REPLY_TO || DEFAULT_REPLY_TO,
  };
}

/* Sends one message. Never throws — every path returns a ResendSendResult, so
   a caller can never mistake an exception for a delivery. */
export async function sendViaResend(
  config: ResendConfig | null,
  input: ResendSendInput,
  fetchImpl: typeof fetch = fetch,
): Promise<ResendSendResult> {
  if (!config) {
    return { outcome: "skipped", reason: "RESEND_API_KEY is not configured" };
  }
  if (!input.to?.trim()) {
    return { outcome: "skipped", reason: "No recipient address" };
  }

  const headers: Record<string, string> = {
    Authorization: `Bearer ${config.apiKey}`,
    "Content-Type": "application/json",
  };
  if (input.idempotencyKey) {
    headers["Idempotency-Key"] = input.idempotencyKey;
  }

  try {
    const response = await fetchImpl(RESEND_ENDPOINT, {
      method: "POST",
      headers,
      body: JSON.stringify({
        from: `${config.fromName} <${input.from || config.fromAddress}>`,
        to: [input.to],
        reply_to: input.replyTo || config.replyTo,
        subject: input.subject,
        text: input.text,
        ...(input.html ? { html: input.html } : {}),
      }),
    });

    if (!response.ok) {
      /* Read the body for the reason, but never let a parse failure mask the
         status — the status is the part that tells us whether to retry. */
      let detail = "";
      try {
        detail = JSON.stringify(await response.json()).slice(0, 300);
      } catch {
        detail = await response.text().catch(() => "");
      }
      return {
        outcome: "failed",
        status: response.status,
        reason: `Resend returned ${response.status}: ${detail}`.slice(0, 400),
      };
    }

    const body = (await response.json()) as { id?: string };
    if (!body?.id) {
      /* A 2xx with no id is not a delivery we can evidence, so it is a
         failure rather than an acceptance. Being strict here is what keeps
         "sequence advanced" meaning "Resend took the message". */
      return { outcome: "failed", reason: "Resend returned 2xx without a message id" };
    }

    return { outcome: "accepted", messageId: body.id };
  } catch (error) {
    return {
      outcome: "failed",
      reason: error instanceof Error ? error.message.slice(0, 300) : "Unknown transport error",
    };
  }
}
