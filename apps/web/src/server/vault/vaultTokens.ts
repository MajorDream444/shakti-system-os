/* Signed tokens for the Vault.

   WHY NOT REUSE THE GUIDE TOKEN. `signedLinks.ts` mints a link that opens one
   document. That is a capability, not an identity: it says "whoever holds this
   may read this file", and it is designed to be emailed, forwarded and
   expired. A session says "the person on the other end of this request IS
   this woman", and everything else in the Vault is decided from it. Letting a
   download link act as a session would mean a forwarded email hands over an
   account.

   So the two are kept apart by three separate things, any one of which would
   be enough on its own:

     1. DIFFERENT SECRETS.   VAULT_SESSION_SECRET and VAULT_MAGIC_SECRET are
        not GUIDE_LINK_SECRET. A guide token cannot be verified here at all.
     2. DOMAIN SEPARATION.   The HMAC is taken over "<purpose>:<payload>", not
        the payload alone. Even if someone configured all three variables to
        the same value — which they must not — a token minted for one purpose
        produces a different signature from the same bytes minted for another.
     3. AN EXPLICIT TYPE.    The purpose is inside the signed payload and is
        checked after verification, so a magic link cannot be presented as a
        session cookie even by an attacker who somehow obtained a signature.

   The wire format deliberately matches signedLinks.ts — base64url payload, a
   dot, a hex HMAC-SHA256 — because that shape is already understood in this
   codebase and by the people who maintain it. Familiar is safer than clever. */

import { createHmac, randomBytes, timingSafeEqual } from "node:crypto";

/* The purposes a Vault token may carry. These strings are part of the signed
   material; renaming one invalidates every token already issued for it, which
   is the intended effect of a purpose changing meaning. */
export type VaultTokenPurpose =
  /* Emailed to a woman to prove she controls the address. Single use. */
  | "vault.magic.v1"
  /* Her session after she has followed a magic link. Sent as a cookie. */
  | "vault.session.v1"
  /* A short-lived permit to stream ONE asset. Bound to one session. */
  | "vault.asset.v1";

export type VaultTokenPayload = {
  /* Purpose. Checked against the expected purpose after the signature. */
  t: VaultTokenPurpose;
  /* Subject: the lowercased email the token speaks for. */
  s: string;
  /* Unique id for this token. For a magic link it is what "single use"
     consumes; for a session it is what revocation names. */
  j: string;
  /* Issued at, unix seconds. Kept so a session can be aged out by a global
     "revoke everything issued before X" without storing per-session rows. */
  i: number;
  /* Absolute expiry, unix seconds. Absolute rather than a duration so a clock
     difference between minting and serving cannot silently extend it. */
  x: number;
  /* Optional binding. On an asset permit this is the asset id, so a permit
     for one asset cannot open another. On a session it is absent. */
  b?: string;
  /* Optional session binding on an asset permit: the session id the permit
     was issued to, so a leaked permit dies when that session is revoked. */
  sid?: string;
};

export type VaultVerifyFailure =
  | "unconfigured"
  | "malformed"
  | "bad_signature"
  | "wrong_purpose"
  | "expired";

export type VaultVerifyResult =
  | { valid: true; payload: VaultTokenPayload }
  | { valid: false; reason: VaultVerifyFailure };

function b64url(input: Buffer): string {
  return input.toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function unb64url(input: string): Buffer {
  const padded = input.replace(/-/g, "+").replace(/_/g, "/");
  return Buffer.from(padded + "=".repeat((4 - (padded.length % 4)) % 4), "base64");
}

/* The purpose is mixed into the signed material rather than only sitting in
   the payload. See note 2 at the top of this file. */
function sign(purpose: VaultTokenPurpose, payloadPart: string, secret: string): string {
  return createHmac("sha256", secret).update(`${purpose}:${payloadPart}`, "utf8").digest("hex");
}

/* 32 bytes of randomness. Used for token ids and session ids; long enough
   that guessing one is not a strategy, and it is never derived from the
   email, so an id does not leak who it belongs to. */
export function newTokenId(): string {
  return b64url(randomBytes(24));
}

/* Mints a token. Returns null when no secret is configured, so a caller can
   never hand out an UNSIGNED credential believing it is protected. */
export function mintVaultToken(
  input: {
    purpose: VaultTokenPurpose;
    subject: string;
    expiresInSeconds: number;
    tokenId?: string;
    binding?: string;
    sessionId?: string;
  },
  secret: string | undefined,
  now: () => Date = () => new Date(),
): { token: string; payload: VaultTokenPayload } | null {
  if (!secret) return null;

  const issuedAt = Math.floor(now().getTime() / 1000);
  const payload: VaultTokenPayload = {
    t: input.purpose,
    s: input.subject.trim().toLowerCase(),
    j: input.tokenId ?? newTokenId(),
    i: issuedAt,
    x: issuedAt + Math.max(1, Math.round(input.expiresInSeconds)),
    ...(input.binding ? { b: input.binding } : {}),
    ...(input.sessionId ? { sid: input.sessionId } : {}),
  };

  const payloadPart = b64url(Buffer.from(JSON.stringify(payload), "utf8"));
  return { token: `${payloadPart}.${sign(input.purpose, payloadPart, secret)}`, payload };
}

export function verifyVaultToken(
  token: string | undefined,
  expectedPurpose: VaultTokenPurpose,
  secret: string | undefined,
  now: () => Date = () => new Date(),
): VaultVerifyResult {
  /* No secret means this process cannot tell a real token from a forged one,
     so it refuses everything. Fail closed: a locked Vault is a bug, an open
     one is a breach. */
  if (!secret) return { valid: false, reason: "unconfigured" };
  if (!token || !token.includes(".")) return { valid: false, reason: "malformed" };

  const [payloadPart, providedSignature] = token.split(".", 2);
  if (!payloadPart || !providedSignature) return { valid: false, reason: "malformed" };

  const expected = sign(expectedPurpose, payloadPart, secret);
  const expectedBuf = Buffer.from(expected, "utf8");
  const providedBuf = Buffer.from(providedSignature, "utf8");

  /* Constant time, length-checked first because timingSafeEqual throws on a
     length mismatch rather than returning false. */
  if (providedBuf.length !== expectedBuf.length || !timingSafeEqual(providedBuf, expectedBuf)) {
    return { valid: false, reason: "bad_signature" };
  }

  let payload: VaultTokenPayload;
  try {
    payload = JSON.parse(unb64url(payloadPart).toString("utf8")) as VaultTokenPayload;
  } catch {
    return { valid: false, reason: "malformed" };
  }

  if (
    typeof payload?.t !== "string" ||
    typeof payload?.s !== "string" ||
    typeof payload?.j !== "string" ||
    typeof payload?.i !== "number" ||
    typeof payload?.x !== "number"
  ) {
    return { valid: false, reason: "malformed" };
  }

  /* Belt and braces with the domain separation above. */
  if (payload.t !== expectedPurpose) return { valid: false, reason: "wrong_purpose" };

  /* Checked AFTER the signature, so an attacker learns nothing about validity
     from how quickly a forged token is rejected. */
  if (Math.floor(now().getTime() / 1000) > payload.x) return { valid: false, reason: "expired" };

  return { valid: true, payload };
}
