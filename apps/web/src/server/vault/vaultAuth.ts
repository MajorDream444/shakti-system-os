/* Passwordless sign-in: ask for a link, follow it, get a session.

   WHY PASSWORDLESS. The women who will use this already prove who they are
   by email every week — it is how the welcome, the practice and the guide all
   reach them. A password would add a secret for them to lose and for us to
   store, and would protect nothing that the mailbox does not already gate.

   ── THE THREE RULES THIS FILE EXISTS TO HOLD ──────────────────────────────

   1. ASKING TELLS YOU NOTHING. The answer to "send me a link" is identical
      whether the address is known, unknown, rate limited or mistyped. A
      different answer would turn this endpoint into a way to ask "is this
      woman one of Sheetal's?" — which, for a practice this intimate, is a
      real disclosure, not a theoretical one.

   2. A LINK IS SPENT WHEN IT IS FOLLOWED. The token id is consumed before a
      session is issued, so a link sitting in a forwarded thread, a backup or
      a mail scanner's cache cannot be replayed. See the honest limits of
      that guarantee in vaultStore.ts.

   3. NO SESSION IS ISSUED ON AN EMAIL THAT WAS NOT ACCEPTED. The same rule
      the seeker sequence and the buyer welcome already follow: state never
      advances on a send that did not happen. Here it means a Resend failure
      is reported as a failure rather than quietly leaving her waiting for a
      letter that was never posted. */

import { getResendConfig, sendViaResend } from "../resendClient.js";
import { getVaultConfig, getVaultReadiness, type VaultEnv } from "./vaultConfig.js";
import { buildSessionCookie } from "./vaultIdentity.js";
import { buildVaultSignInEmail } from "./vaultEmail.js";
import type { VaultReadRepository } from "./vaultRepository.js";
import type { VaultStore } from "./vaultStore.js";
import { mintVaultToken, newTokenId, verifyVaultToken } from "./vaultTokens.js";

export type VaultAuthDeps = {
  env: VaultEnv;
  store: VaultStore;
  repository: VaultReadRepository;
  fetchImpl?: typeof fetch;
  now?: () => Date;
  logger?: { info: (event: string, data?: unknown) => void; error: (event: string, data?: unknown) => void };
  /* Injectable so the checks can assert the padding without waiting on it. */
  sleep?: (ms: number) => Promise<void>;
};

/* What the endpoint returns. `acknowledged` is returned for every outcome a
   caller must not be able to tell apart; the `internal` field is for the log
   and is stripped before the body is written. */
export type RequestLinkResult = {
  status: "acknowledged" | "unconfigured" | "invalid";
  internal:
    | "sent"
    | "unknown_address"
    | "rate_limited_email"
    | "rate_limited_source"
    | "send_failed"
    | "send_skipped"
    | "not_configured"
    | "malformed_address";
};

/* The floor every acknowledged answer is padded to.

   WHY. An identical 202 body is not enough. For an address Sheetal has no
   record of, the handler returns straight after the Airtable lookup; for one
   she does, it goes on to mint a token and wait on a Resend request. That is
   a difference of hundreds of milliseconds, repeatable, and measurable from
   anywhere — so the timing discloses exactly the membership fact the uniform
   body exists to conceal. Found by Codex's review of PR #39.

   The fix is to make the observable completion time independent of the path
   taken: every acknowledged answer is held until the same floor has elapsed.
   The floor is above a normal Resend round trip, so the slow path usually
   does not exceed it. When it does — a genuinely slow send — the answer is
   simply late; it still carries no information an attacker can separate from
   ordinary network noise.

   This is mitigation, not a proof. A determined attacker with enough samples
   can still see the tail of a very slow send. The complete fix is to move
   delivery off the request path onto a queue, so nothing downstream of the
   lookup is in the response at all. That is recorded as a follow-up. */
const ACKNOWLEDGE_FLOOR_MS = 1200;

const defaultSleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

async function padToFloor<T>(startedAt: number, value: T, sleep = defaultSleep): Promise<T> {
  const elapsed = Date.now() - startedAt;
  if (elapsed < ACKNOWLEDGE_FLOOR_MS) await sleep(ACKNOWLEDGE_FLOOR_MS - elapsed);
  return value;
}

/* Enough to reject obvious nonsense without pretending to validate email
   addresses, which cannot be done with a regular expression and should not
   be attempted. Anything that passes this is simply emailed; a bad address
   bounces at Resend, which is the only real test. */
function looksLikeEmail(value: string): boolean {
  const trimmed = value.trim();
  if (trimmed.length < 6 || trimmed.length > 254) return false;
  if (/\s/.test(trimmed)) return false;
  const at = trimmed.indexOf("@");
  return at > 0 && at === trimmed.lastIndexOf("@") && trimmed.indexOf(".", at) > at + 1;
}

export async function requestSignInLink(
  input: { email: unknown; sourceKey: string },
  deps: VaultAuthDeps,
): Promise<RequestLinkResult> {
  const logger = deps.logger ?? { info: () => {}, error: () => {} };
  const now = deps.now ?? (() => new Date());
  const nowUnix = Math.floor(now().getTime() / 1000);
  /* Wall clock, not the injected clock: this measures real elapsed time, and
     a test that freezes `now` must not thereby disable the padding. */
  const startedAt = Date.now();
  const ack = (result: RequestLinkResult) => padToFloor(startedAt, result, deps.sleep ?? defaultSleep);

  const readiness = getVaultReadiness(deps.env);
  if (!readiness.ready) {
    /* The reason names variables, never values. */
    logger.error("vault_signin_unconfigured", { reason: readiness.reason });
    return { status: "unconfigured", internal: "not_configured" };
  }

  if (typeof input.email !== "string" || !looksLikeEmail(input.email)) {
    /* The one case that IS distinguishable, because it says nothing about
       any person: the request did not contain an address at all. */
    return { status: "invalid", internal: "malformed_address" };
  }

  const config = getVaultConfig(deps.env);
  const email = input.email.trim().toLowerCase();

  /* Per source first. A single machine working through a list of addresses
     is stopped before any of those addresses is touched, so the per-address
     budget is still there for the real woman. */
  const bySource = await deps.store.countAttempt(
    `vault:signin:src:${input.sourceKey}`,
    config.requestsPerSource,
    config.rateWindowSeconds,
    nowUnix,
  );
  if (!bySource.allowed) {
    logger.error("vault_signin_rate_limited", { scope: "source" });
    return ack({ status: "acknowledged", internal: "rate_limited_source" });
  }

  const byEmail = await deps.store.countAttempt(
    `vault:signin:email:${email}`,
    config.requestsPerEmail,
    config.rateWindowSeconds,
    nowUnix,
  );
  if (!byEmail.allowed) {
    /* Her inbox is also a thing to protect. Someone typing an address into
       the form repeatedly should not be able to bury her in letters. */
    logger.error("vault_signin_rate_limited", { scope: "email" });
    return ack({ status: "acknowledged", internal: "rate_limited_email" });
  }

  let known = false;
  try {
    known = await deps.repository.isKnownSeeker(email);
  } catch (error) {
    logger.error("vault_signin_lookup_failed", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    /* Treated as unknown. No link, same answer. */
  }

  if (!known) {
    /* No letter is sent to an address Sheetal has no record of. This is not
       only hygiene: it stops the endpoint being used to post mail, in her
       name and from her verified domain, to anyone at all. */
    logger.info("vault_signin_unknown_address");
    return ack({ status: "acknowledged", internal: "unknown_address" });
  }

  const minted = mintVaultToken(
    {
      purpose: "vault.magic.v1",
      subject: email,
      expiresInSeconds: config.magicTtlSeconds,
      tokenId: newTokenId(),
    },
    config.magicSecret,
    now,
  );
  if (!minted) return { status: "unconfigured", internal: "not_configured" };

  const url = `${config.publicSiteUrl}/api/vault/callback?t=${encodeURIComponent(minted.token)}`;
  const letter = buildVaultSignInEmail({
    url,
    expiresInMinutes: Math.round(config.magicTtlSeconds / 60),
  });

  const result = await sendViaResend(
    getResendConfig(deps.env),
    {
      to: email,
      subject: letter.subject,
      text: letter.text,
      /* NOT keyed on the token: every request must produce a distinct
         letter, or a second attempt after a lost link would be silently
         de-duplicated and she would wait for a message that never comes. */
      idempotencyKey: `vault-signin:${minted.payload.j}`,
    },
    deps.fetchImpl,
  );

  if (result.outcome !== "accepted") {
    /* The reason, never the address. */
    logger.error("vault_signin_send_failed", { outcome: result.outcome, reason: result.reason });
    return ack({
      status: "acknowledged",
      internal: result.outcome === "failed" ? "send_failed" : "send_skipped",
    });
  }

  logger.info("vault_signin_sent", { messageId: result.messageId });
  return ack({ status: "acknowledged", internal: "sent" });
}

export type CompleteSignInResult =
  | { ok: true; setCookie: string; subject: string; sessionId: string }
  | { ok: false; reason: "unconfigured" | "invalid_or_expired" | "already_used" };

export async function completeSignIn(
  token: string | undefined,
  deps: VaultAuthDeps,
): Promise<CompleteSignInResult> {
  const logger = deps.logger ?? { info: () => {}, error: () => {} };
  const now = deps.now ?? (() => new Date());
  const config = getVaultConfig(deps.env);

  const readiness = getVaultReadiness(deps.env);
  if (!readiness.ready) {
    logger.error("vault_callback_unconfigured", { reason: readiness.reason });
    return { ok: false, reason: "unconfigured" };
  }

  const verified = verifyVaultToken(token, "vault.magic.v1", config.magicSecret, now);
  if (!verified.valid) {
    logger.error("vault_callback_refused", { reason: verified.reason });
    return { ok: false, reason: "invalid_or_expired" };
  }

  /* Spent BEFORE the session is minted. If this returns false the link has
     already been followed, and the right answer is to refuse rather than to
     hand out a second session on one proof of ownership. */
  const fresh = await deps.store.consumeOnce(
    verified.payload.j,
    verified.payload.x,
    Math.floor(now().getTime() / 1000),
  );
  if (!fresh) {
    logger.error("vault_callback_replayed");
    return { ok: false, reason: "already_used" };
  }

  const session = mintVaultToken(
    {
      purpose: "vault.session.v1",
      subject: verified.payload.s,
      expiresInSeconds: config.sessionTtlSeconds,
    },
    config.sessionSecret,
    now,
  );
  if (!session) return { ok: false, reason: "unconfigured" };

  logger.info("vault_session_opened", { sessionId: session.payload.j });
  return {
    ok: true,
    setCookie: buildSessionCookie(session.token, config.sessionTtlSeconds, config.cookieName),
    subject: verified.payload.s,
    sessionId: session.payload.j,
  };
}

/* Signing out. `everywhere` is the one a woman needs when she thinks someone
   else has her inbox: it revokes every session issued to her up to now, not
   just the one in front of her. */
export async function signOut(
  input: { subject: string; sessionId: string; everywhere: boolean },
  deps: VaultAuthDeps,
): Promise<void> {
  const atUnix = Math.floor((deps.now ?? (() => new Date()))().getTime() / 1000);
  await deps.store.revoke({
    subject: input.subject,
    sessionId: input.everywhere ? undefined : input.sessionId,
    atUnix,
  });
}
