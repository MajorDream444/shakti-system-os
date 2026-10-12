/* Signed, expiring download links.

   WHY. The Navratri Companion Guide was served from a public path with a
   random filename. That is unguessable, not protected: once the URL is in an
   inbox it works forever and for anyone it is forwarded to. Before the guide
   sells at $9 that is the wrong posture.

   WHAT THIS DOES, AND WHAT IT DOES NOT. A signed link stops the LINK
   circulating: it dies on a date, and it names the person it was minted for,
   so a leaked link is traceable back to whoever shared it. It cannot stop
   someone downloading the PDF and forwarding the file itself. Nothing served
   over the web can. The deterrent for that is a per-buyer watermark on the
   document, which is a separate job.

   HOW. The token is a payload and an HMAC of that payload, in the same shape
   as Stripe's own webhook signatures — which this codebase already verifies,
   so the pattern is familiar rather than invented here.

     payload   base64url of { r: recipient, x: expiry, d: document }
     token     payload + "." + hex HMAC-SHA256(payload, GUIDE_LINK_SECRET)

   The recipient is inside the SIGNED payload, so it cannot be edited to
   someone else's name without invalidating the signature. The expiry is
   inside it for the same reason — a querystring expiry a reader can change is
   decoration, not a limit. */

import { createHmac, timingSafeEqual } from "node:crypto";

export type GuideTokenPayload = {
  /* Who it was minted for. Lowercased email. Recorded so a leaked link can be
     traced, and shown nowhere publicly. */
  r: string;
  /* Unix seconds. Absolute, not a duration, so a clock difference between
     minting and serving cannot silently extend it. */
  x: number;
  /* Which document. One guide today; this stops a future second document
     being reachable with a token minted for the first. */
  d: string;
};

export type VerifyResult =
  | { valid: true; payload: GuideTokenPayload }
  | { valid: false; reason: "malformed" | "bad_signature" | "expired" | "unconfigured" };

function b64url(input: Buffer): string {
  return input.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function unb64url(input: string): Buffer {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(padded + "=".repeat((4 - (padded.length % 4)) % 4), "base64");
}

function sign(payloadPart: string, secret: string): string {
  return createHmac("sha256", secret).update(payloadPart, "utf8").digest("hex");
}

/* Mints a token. Returns null when no secret is configured, so a caller can
   never accidentally hand out an UNSIGNED link believing it is protected. */
export function mintGuideToken(
  input: { recipient: string; document: string; expiresInDays: number },
  secret: string | undefined,
  now: () => Date = () => new Date(),
): string | null {
  if (!secret) return null;

  const payload: GuideTokenPayload = {
    r: input.recipient.trim().toLowerCase(),
    d: input.document,
    x: Math.floor(now().getTime() / 1000) + Math.round(input.expiresInDays * 86400),
  };

  const payloadPart = b64url(Buffer.from(JSON.stringify(payload), "utf8"));
  return `${payloadPart}.${sign(payloadPart, secret)}`;
}

export function verifyGuideToken(
  token: string | undefined,
  secret: string | undefined,
  now: () => Date = () => new Date(),
): VerifyResult {
  /* No secret means the endpoint cannot distinguish a real token from a
     forged one, so it refuses everything rather than serving the document.
     Fail closed: an open download is worse than a broken one. */
  if (!secret) return { valid: false, reason: "unconfigured" };
  if (!token || !token.includes(".")) return { valid: false, reason: "malformed" };

  const [payloadPart, providedSignature] = token.split(".", 2);
  if (!payloadPart || !providedSignature) return { valid: false, reason: "malformed" };

  const expected = sign(payloadPart, secret);
  const expectedBuf = Buffer.from(expected, "utf8");
  const providedBuf = Buffer.from(providedSignature, "utf8");

  /* Constant time, and length-checked first because timingSafeEqual throws on
     a length mismatch rather than returning false. */
  if (
    providedBuf.length !== expectedBuf.length ||
    !timingSafeEqual(providedBuf, expectedBuf)
  ) {
    return { valid: false, reason: "bad_signature" };
  }

  let payload: GuideTokenPayload;
  try {
    payload = JSON.parse(unb64url(payloadPart).toString("utf8")) as GuideTokenPayload;
  } catch {
    return { valid: false, reason: "malformed" };
  }

  if (typeof payload?.x !== "number" || typeof payload?.r !== "string" || typeof payload?.d !== "string") {
    return { valid: false, reason: "malformed" };
  }

  /* Expiry is checked AFTER the signature, so an attacker learns nothing
     about validity from how quickly a forged token is rejected. */
  if (Math.floor(now().getTime() / 1000) > payload.x) {
    return { valid: false, reason: "expired" };
  }

  return { valid: true, payload };
}
