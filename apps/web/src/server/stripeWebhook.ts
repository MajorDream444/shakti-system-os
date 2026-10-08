import { createHmac, timingSafeEqual } from "node:crypto";

/* Verifies a Stripe webhook and records the purchase in Airtable.

   Signature verification is done by hand rather than with the Stripe SDK.
   It is a documented HMAC-SHA256 over `${timestamp}.${rawBody}`, and doing it
   here keeps a dependency out of a serverless function whose whole job is one
   POST.

   Three properties this has to hold, because money is involved:

   - It fails CLOSED. No secret, bad signature, stale timestamp: nothing is
     written. A missing record is recoverable from the Stripe dashboard; a
     forged one is not.
   - It is IDEMPOTENT. Stripe retries until it gets a 2xx, and will happily
     deliver the same event twice. The checkout session id is looked up before
     any write, so a retry updates nothing and still answers 200.
   - It NEVER creates access. It records that a payment happened and links the
     buyer to a Seeker if one already exists. Granting entitlements stays a
     human decision, consistent with the Access Grants rule in this base. */

const PAYMENTS_TABLE = "tblf2kC6qHsgJMjUm";
const SEEKERS_TABLE = "tblKLBelhnhTaoS6o";
const AIRTABLE_API_ROOT = "https://api.airtable.com/v0";

/* Added 7 October for the Resend buyer welcome. Welcome Sent already existed
   and keeps its meaning: Resend accepted the message. The rest are evidence. */
const WELCOME_FIELDS = {
  welcomeSent: "fldmHbXKWG4MkymZU",
  welcomeStatus: "fldUDgF4LscobY2So",
  welcomeMessageId: "fldI6bs7N6hEfhAVJ",
  welcomeAttemptedAt: "fldZSuGC8Ry3yKMzF",
  welcomeFailureReason: "fld3n2o6bbFBDVsPM",
} as const;

const PAYMENT_FIELDS = {
  paymentId: "fld5lacVScpsXtyQT",
  sessionId: "fldZ21ADta2Y3AVkR",
  paymentIntent: "flddwjv2Xw8x44jMK",
  buyerName: "fldEWO5hMMoQeInSi",
  buyerEmail: "fldyRI464InDXTJHr",
  offering: "fldARMVPO4Mk3QCwU",
  amount: "fldPDddjk6guqToNI",
  currency: "fldSa2zHw7lSIRW5S",
  status: "fldqNP9t9QGHCbZo8",
  paidAt: "fldbvosK8CDvYhlUu",
  seeker: "fldUDRGUQPibCnpme",
  notes: "fldzQLFU7EBYmghFP",
} as const;

const SEEKER_EMAIL_FIELD = "fldWwaJyVIncInn9Z";

/* Stripe tolerates five minutes of clock drift; anything older is replay. */
const TIMESTAMP_TOLERANCE_SECONDS = 300;

export type WebhookResult = {
  statusCode: number;
  body: { status: string; message: string };
};

/* Accepts SEVERAL signing secrets, comma or whitespace separated.

   Stripe issues a different signing secret per endpoint, and this project has
   two — production and preview — pointing at the same code. One variable
   holding one value could only ever satisfy one of them; the other would
   reject every event with a bad signature, which looks exactly like a broken
   webhook and wastes an afternoon proving otherwise.

   This is also what Stripe's own rotation guidance requires: during a rotation
   both the old and new secret are live, and an endpoint that understands only
   one of them drops events in the window between.

   Every candidate is compared in constant time and the result is a plain
   boolean, so nothing about which secret matched, or how nearly, is leaked. */
export function parseSigningSecrets(raw: string | undefined): string[] {
  return (raw ?? "")
    .split(/[,\s]+/)
    .map((value) => value.trim())
    .filter(Boolean);
}

function verifySignatureWithAny(rawBody: string, header: string, secrets: string[]): boolean {
  /* `some` short-circuits, but each individual comparison is still
     timing-safe; the only thing observable is total work, which varies with
     the number of configured secrets rather than with any attacker input. */
  return secrets.some((secret) => verifySignature(rawBody, header, secret));
}

function verifySignature(rawBody: string, header: string, secret: string): boolean {
  const parts = header.split(",").reduce<Record<string, string[]>>((acc, part) => {
    const [key, value] = part.split("=");
    if (!key || !value) return acc;
    (acc[key.trim()] ||= []).push(value.trim());
    return acc;
  }, {});

  const timestamp = parts.t?.[0];
  const signatures = parts.v1 ?? [];
  if (!timestamp || signatures.length === 0) return false;

  const age = Math.abs(Math.floor(Date.now() / 1000) - Number(timestamp));
  if (!Number.isFinite(age) || age > TIMESTAMP_TOLERANCE_SECONDS) return false;

  const expected = createHmac("sha256", secret)
    .update(`${timestamp}.${rawBody}`, "utf8")
    .digest("hex");
  const expectedBuf = Buffer.from(expected, "utf8");

  /* Compared with timingSafeEqual over every candidate, so the comparison
     leaks nothing about how close a forged signature was. */
  return signatures.some(candidate => {
    const candidateBuf = Buffer.from(candidate, "utf8");
    return (
      candidateBuf.length === expectedBuf.length &&
      timingSafeEqual(candidateBuf, expectedBuf)
    );
  });
}

/* Stripe amounts are in the currency's minor unit, except for zero-decimal
   currencies. JPY 9999 is 9,999 yen, not 99.99. */
const ZERO_DECIMAL = new Set(["bif", "clp", "djf", "gnf", "jpy", "kmf", "krw",
  "mga", "pyg", "rwf", "ugx", "vnd", "vuv", "xaf", "xof", "xpf"]);

function toMajorUnits(amount: number, currency: string): number {
  return ZERO_DECIMAL.has(currency.toLowerCase()) ? amount : amount / 100;
}

function offeringFromSession(session: Record<string, unknown>): string {
  const haystack = [
    (session.metadata as Record<string, string> | undefined)?.offering,
    session.client_reference_id,
    (session as { payment_link?: string }).payment_link,
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  if (haystack.includes("durga")) return "Dancing with Durga";
  if (haystack.includes("embodiment")) return "Shakti Embodiment";
  if (haystack.includes("membership") || haystack.includes("shala")) return "Shala Membership";
  return "Other";
}

async function airtable(
  path: string,
  token: string,
  init?: { method?: string; body?: string },
): Promise<Record<string, unknown>> {
  const response = await fetch(`${AIRTABLE_API_ROOT}/${path}`, {
    method: init?.method ?? "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: init?.body,
  });
  if (!response.ok) {
    throw new Error(`Airtable ${response.status}: ${await response.text()}`);
  }
  return (await response.json()) as Record<string, unknown>;
}

export async function handleStripeWebhook(
  rawBody: string,
  signatureHeader: string,
  env: Record<string, string | undefined>,
): Promise<WebhookResult> {
  const secrets = parseSigningSecrets(env.STRIPE_WEBHOOK_SECRET);
  const token = env.AIRTABLE_PERSONAL_ACCESS_TOKEN || env.AIRTABLE_TOKEN;
  const baseId = env.AIRTABLE_BASE_ID || "appj3hDhI0HoulNrf";

  if (secrets.length === 0 || !token) {
    /* Deliberately vague to the caller, and deliberately NOT a 2xx: Stripe
       will retry, so nothing is lost once the secrets are configured. */
    return { statusCode: 503, body: { status: "unconfigured", message: "Not configured." } };
  }

  if (!signatureHeader || !verifySignatureWithAny(rawBody, signatureHeader, secrets)) {
    return { statusCode: 400, body: { status: "invalid", message: "Bad signature." } };
  }

  let event: { type?: string; data?: { object?: Record<string, unknown> } };
  try {
    event = JSON.parse(rawBody);
  } catch {
    return { statusCode: 400, body: { status: "invalid", message: "Bad payload." } };
  }

  if (event.type !== "checkout.session.completed") {
    /* Acknowledged so Stripe stops retrying an event we do not act on. */
    return { statusCode: 200, body: { status: "ignored", message: "Event not handled." } };
  }

  const session = event.data?.object ?? {};
  const sessionId = String(session.id ?? "");
  if (!sessionId) {
    return { statusCode: 400, body: { status: "invalid", message: "No session id." } };
  }

  try {
    /* Idempotency: Stripe retries, and a duplicate row would mean Sheetal
       sees two sales where there was one. */
    const formula = encodeURIComponent(`{Stripe Session ID}="${sessionId}"`);
    const existing = (await airtable(
      `${baseId}/${PAYMENTS_TABLE}?filterByFormula=${formula}&maxRecords=1`,
      token,
    )) as { records?: unknown[] };

    if (existing.records?.length) {
      return { statusCode: 200, body: { status: "duplicate", message: "Already recorded." } };
    }

    const details = (session.customer_details ?? {}) as Record<string, string>;
    const email = details.email ?? "";

    /* Link to an existing Seeker when the email matches. Never create one:
       a buyer who has not been through Begin has not consented to a Seeker
       record, and this base's rule is that consent is explicit. */
    let seekerLinks: string[] = [];
    if (email) {
      const seekerFormula = encodeURIComponent(`LOWER({Email})="${email.toLowerCase()}"`);
      const match = (await airtable(
        `${baseId}/${SEEKERS_TABLE}?filterByFormula=${seekerFormula}&maxRecords=1`,
        token,
      )) as { records?: Array<{ id: string }> };
      seekerLinks = match.records?.length ? [match.records[0].id] : [];
    }

    const currency = String(session.currency ?? "usd");
    const amountTotal = Number(session.amount_total ?? 0);

    const created = (await airtable(`${baseId}/${PAYMENTS_TABLE}`, token, {
      method: "POST",
      body: JSON.stringify({
        fields: {
          [PAYMENT_FIELDS.paymentId]: `PAY-${sessionId.slice(-12)}`,
          [PAYMENT_FIELDS.sessionId]: sessionId,
          [PAYMENT_FIELDS.paymentIntent]: String(session.payment_intent ?? ""),
          [PAYMENT_FIELDS.buyerName]: details.name ?? "",
          [PAYMENT_FIELDS.buyerEmail]: email,
          [PAYMENT_FIELDS.offering]: offeringFromSession(session),
          [PAYMENT_FIELDS.amount]: toMajorUnits(amountTotal, currency),
          [PAYMENT_FIELDS.currency]: currency.toUpperCase(),
          [PAYMENT_FIELDS.status]: "Paid",
          [PAYMENT_FIELDS.paidAt]: new Date().toISOString(),
          ...(seekerLinks.length ? { [PAYMENT_FIELDS.seeker]: seekerLinks } : {}),
          ...(seekerLinks.length
            ? {}
            : { [PAYMENT_FIELDS.notes]: "No matching Seeker on this email — buyer did not come through Begin." }),
        },
        typecast: true,
      }),
    })) as { id?: string };

    const paymentRecordId = created.id ?? "";

    /* The payment is now safely recorded. ONLY NOW do we try to email.

       Ordering is the whole design. A send that fails cannot cost us the row,
       because the row already exists and is never rolled back. The outcome is
       written back onto that row so a buyer who did not hear from Sheetal is
       visible in the table rather than indistinguishable from one who did. */
    const offering = offeringFromSession(session);
    const { deliverBuyerWelcome } = await import("./buyerEmailDelivery.js");
    const { state } = await deliverBuyerWelcome(
      {
        paymentRecordId,
        sessionId,
        buyerEmail: email,
        buyerName: details.name ?? "",
        offering,
      },
      { env },
    );

    if (paymentRecordId) {
      /* Best effort, and deliberately separate from the send. If this write
         fails the buyer still HAS her welcome; the cost is a row that
         understates what happened, which is recoverable. Wrapped so it can
         never turn a successful payment into a 500 and a Stripe retry. */
      try {
        await airtable(`${baseId}/${PAYMENTS_TABLE}/${paymentRecordId}`, token, {
          method: "PATCH",
          body: JSON.stringify({
            fields: {
              [WELCOME_FIELDS.welcomeSent]: state.welcomeSent,
              [WELCOME_FIELDS.welcomeStatus]: state.status,
              [WELCOME_FIELDS.welcomeAttemptedAt]: state.attemptedAt,
              ...(state.messageId ? { [WELCOME_FIELDS.welcomeMessageId]: state.messageId } : {}),
              ...(state.failureReason
                ? { [WELCOME_FIELDS.welcomeFailureReason]: state.failureReason }
                : {}),
            },
            typecast: true,
          }),
        });
      } catch {
        /* Swallowed on purpose. See the comment above. */
      }
    }

    /* 200 regardless of the email outcome. The payment IS recorded, and a
       non-2xx would make Stripe retry a webhook whose only remaining work is
       an email — which the duplicate guard would then skip anyway, leaving
       Stripe retrying forever against a row that already exists. */
    return { statusCode: 200, body: { status: "recorded", message: "Payment recorded." } };
  } catch (error) {
    /* 500 so Stripe retries. Never swallow this into a 200 — a lost payment
       record is a person who paid and whom nobody knows about. */
    return {
      statusCode: 500,
      body: { status: "error", message: error instanceof Error ? error.message : "Write failed." },
    };
  }
}
