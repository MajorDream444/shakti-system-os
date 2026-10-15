/* The small amount of state that signed tokens cannot carry.

   A signed token proves who minted it and when it dies. Three things it
   cannot prove on its own, because each of them is a fact about the PAST:

     SINGLE USE    whether this magic link has already been followed
     REVOCATION    whether this session was signed out, or all of hers were
     RATE LIMITS   how many links this address has asked for recently

   All three therefore need a store. This file defines the interface and
   ships one implementation that keeps it in process memory.

   ── READ THIS BEFORE RELYING ON IT ────────────────────────────────────────
   THE IN-MEMORY STORE IS NOT SUFFICIENT FOR PRODUCTION. On Vercel each
   serverless invocation may be a fresh instance, so:

     - a magic link consumed on one instance may still look unused on another,
       which weakens single use to "usually single use";
     - a revoked session may still be honoured by an instance that never saw
       the revocation, until the token expires on its own;
     - a rate limit counts per instance, so the real limit is the configured
       number multiplied by however many instances are warm.

   None of these fail OPEN against an attacker who has no token at all — the
   signature and the expiry still hold, and those are enforced by maths rather
   than memory. They degrade the guarantees that depend on remembering.

   This is a deliberate, bounded choice. The alternative was to create an
   Airtable table or stand up a database, and the October 15 reconciliation
   recorded that no datastore is approved for the Vault yet. So the shape is
   fixed here, behind an interface with four methods, and swapping in Vercel
   Edge Config, KV, Redis or an approved Airtable table is a single new class
   and one line in the composition root. Until that is done, the Vault must be
   treated as protected but not yet hardened, and the short token lifetimes in
   vaultConfig.ts are what keep the exposure small. */

export type VaultStore = {
  /* Returns true the FIRST time a token id is presented and false every time
     after. Must be atomic in any real implementation: two simultaneous uses
     of the same link must not both win. */
  consumeOnce: (tokenId: string, expiresAtUnix: number, nowUnix: number) => Promise<boolean>;

  /* True when this session id, or everything issued to this subject before a
     recorded cutoff, has been revoked. */
  isRevoked: (input: { sessionId: string; subject: string; issuedAtUnix: number }) => Promise<boolean>;

  /* Revokes one session, or — with no sessionId — every session issued to
     this subject up to now. The second form is what a woman needs when she
     thinks someone else has read her email. */
  revoke: (input: { subject: string; sessionId?: string; atUnix: number }) => Promise<void>;

  /* Counts an attempt and says whether it is allowed. The key is caller
     chosen so the same store serves both the per-address and per-source
     limits. */
  countAttempt: (
    key: string,
    limit: number,
    windowSeconds: number,
    nowUnix: number,
  ) => Promise<{ allowed: boolean; retryAfterSeconds: number }>;
};

type Window = { count: number; resetAtUnix: number };

export class InMemoryVaultStore implements VaultStore {
  private readonly consumed = new Map<string, number>();
  private readonly revokedSessions = new Map<string, number>();
  private readonly revokedBefore = new Map<string, number>();
  private readonly windows = new Map<string, Window>();

  /* The caller supplies the clock. Reading Date.now() here instead would
     mean the store and the token disagreed about what time it is whenever a
     caller injects a clock, and the first thing that disagreement does is
     sweep a live token out of the consumed set — which silently turns a
     single-use link back into a reusable one. */
  async consumeOnce(tokenId: string, expiresAtUnix: number, nowUnix: number): Promise<boolean> {
    this.sweep(nowUnix);
    if (this.consumed.has(tokenId)) return false;
    /* Kept only until the token would have expired anyway. After that the
       signature refuses it, so remembering it buys nothing and the map would
       grow without bound. */
    this.consumed.set(tokenId, expiresAtUnix);
    return true;
  }

  async isRevoked(input: {
    sessionId: string;
    subject: string;
    issuedAtUnix: number;
  }): Promise<boolean> {
    if (this.revokedSessions.has(input.sessionId)) return true;
    const cutoff = this.revokedBefore.get(input.subject.toLowerCase());
    /* `<=` not `<`: a session issued in the same second as a "sign me out
       everywhere" is the one she is trying to kill, not one to spare. */
    return typeof cutoff === "number" && input.issuedAtUnix <= cutoff;
  }

  async revoke(input: { subject: string; sessionId?: string; atUnix: number }): Promise<void> {
    if (input.sessionId) {
      this.revokedSessions.set(input.sessionId, input.atUnix);
      return;
    }
    this.revokedBefore.set(input.subject.toLowerCase(), input.atUnix);
  }

  async countAttempt(
    key: string,
    limit: number,
    windowSeconds: number,
    nowUnix: number,
  ): Promise<{ allowed: boolean; retryAfterSeconds: number }> {
    const current = this.windows.get(key);
    if (!current || current.resetAtUnix <= nowUnix) {
      this.windows.set(key, { count: 1, resetAtUnix: nowUnix + windowSeconds });
      return { allowed: true, retryAfterSeconds: 0 };
    }
    current.count += 1;
    return {
      allowed: current.count <= limit,
      retryAfterSeconds: Math.max(0, current.resetAtUnix - nowUnix),
    };
  }

  private sweep(nowUnix: number) {
    for (const [id, expiresAt] of this.consumed) {
      if (expiresAt <= nowUnix) this.consumed.delete(id);
    }
  }

  /* Tests only. */
  clear() {
    this.consumed.clear();
    this.revokedSessions.clear();
    this.revokedBefore.clear();
    this.windows.clear();
  }
}

/* One instance per process. Exported so the API routes share it: a store
   created per request would remember nothing at all. */
export const defaultVaultStore = new InMemoryVaultStore();
