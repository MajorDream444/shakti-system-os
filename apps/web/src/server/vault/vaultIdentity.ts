/* The viewer identity boundary.

   ONE RULE, AND EVERYTHING ELSE FOLLOWS FROM IT:

     THE SERVER DECIDES WHO THE VIEWER IS. THE BROWSER ONLY CARRIES PROOF.

   Nothing a request asserts about itself is believed. There is no email
   parameter, no "viewer" header, no id in a query string that this layer will
   read. The only input is a signed session cookie, and the only thing a
   cookie can do is fail to verify. Identity is then completed from Airtable —
   her grants are read server-side, never sent to the browser and never read
   back from it.

   AccessService.ts in the browser bundle defaults to { hasAccess: true }.
   That is a prototype convenience for rendering, and the October 15
   reconciliation flagged it. This module is the reason that no longer
   matters for anything real: the browser may believe whatever it likes about
   what to draw, because it never sees a protected byte unless this boundary
   put it there. */

import { getVaultConfig, type VaultEnv } from "./vaultConfig.js";
import type { ViewerIdentity } from "./vaultEntitlement.js";
import type { VaultReadRepository } from "./vaultRepository.js";
import type { VaultStore } from "./vaultStore.js";
import { verifyVaultToken } from "./vaultTokens.js";

export type ResolveViewerDeps = {
  env: VaultEnv;
  store: VaultStore;
  repository: VaultReadRepository;
  now?: () => Date;
};

export type ResolvedViewer = {
  viewer: ViewerIdentity;
  /* Why the viewer is anonymous, for the log only. Absent when signed in. */
  anonymousReason?:
    | "no_cookie"
    | "unconfigured"
    | "malformed"
    | "bad_signature"
    | "wrong_purpose"
    | "expired"
    | "revoked"
    | "lookup_failed";
};

const ANONYMOUS: ViewerIdentity = { kind: "anonymous" };

/* Parses a Cookie header. Deliberately small and deliberately strict: it
   takes the FIRST occurrence of the name, because a request carrying two
   cookies of the same name is either a misconfiguration or someone trying to
   confuse the parser, and picking the last one is how that attack works. */
export function readCookie(header: string | undefined, name: string): string | undefined {
  if (!header) return undefined;
  for (const part of header.split(";")) {
    const index = part.indexOf("=");
    if (index === -1) continue;
    if (part.slice(0, index).trim() === name) return part.slice(index + 1).trim();
  }
  return undefined;
}

export async function resolveViewer(
  cookieHeader: string | undefined,
  deps: ResolveViewerDeps,
): Promise<ResolvedViewer> {
  const config = getVaultConfig(deps.env);
  const raw = readCookie(cookieHeader, config.cookieName);
  if (!raw) return { viewer: ANONYMOUS, anonymousReason: "no_cookie" };

  const verified = verifyVaultToken(raw, "vault.session.v1", config.sessionSecret, deps.now);
  if (!verified.valid) return { viewer: ANONYMOUS, anonymousReason: verified.reason };

  const { s: subject, j: sessionId, i: issuedAt } = verified.payload;

  if (await deps.store.isRevoked({ sessionId, subject, issuedAtUnix: issuedAt })) {
    return { viewer: ANONYMOUS, anonymousReason: "revoked" };
  }

  /* Grants are read fresh on every request rather than baked into the token.
     A session lasts hours; a grant Sheetal withdraws must bite immediately,
     and a claim inside a signed cookie cannot be taken back. */
  let grantedAreas: string[];
  try {
    grantedAreas = await deps.repository.listGrantedAreas(subject);
  } catch {
    /* Airtable unreachable. She is NOT promoted to a grantless signed-in
       viewer, because that would silently turn a lookup failure into a
       different and possibly wider answer for some other asset. Fail closed
       to anonymous and let her try again. */
    return { viewer: ANONYMOUS, anonymousReason: "lookup_failed" };
  }

  return { viewer: { kind: "authenticated", subject, sessionId, grantedAreas } };
}

/* The Set-Cookie value for a session.

   HttpOnly    script cannot read it, so an injected script cannot steal it
   Secure      never sent over plain http
   SameSite    Lax, not Strict: the magic link arrives from an email client,
               which is a cross-site top-level navigation, and Strict would
               drop the cookie on exactly that first hop
   Path=/      the API and any future page share it
   Max-Age     matches the token's own expiry, so the browser forgets it at
               roughly the moment the signature stops being accepted */
export function buildSessionCookie(value: string, maxAgeSeconds: number, name: string): string {
  return [
    `${name}=${value}`,
    "HttpOnly",
    "Secure",
    "SameSite=Lax",
    "Path=/",
    `Max-Age=${Math.max(0, Math.round(maxAgeSeconds))}`,
  ].join("; ");
}

export function buildClearedSessionCookie(name: string): string {
  return `${name}=; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=0`;
}
