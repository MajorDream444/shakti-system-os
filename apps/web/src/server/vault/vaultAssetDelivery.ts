/* Protected delivery. The same posture as /api/guide, applied to the Vault.

   WHAT /api/guide ALREADY GOT RIGHT, AND IS REUSED HERE:

     - the bytes are never on a public path, so there is no URL that works
       without a check;
     - every refusal is the same 403 with the same sentence, so a reader
       cannot tell "expired" from "forged" from "you are not entitled" from
       "that asset does not exist";
     - nothing is cacheable, so a CDN cannot outlive the permission;
     - each delivery logs who received it, which is what makes a leak
       attributable to a person rather than to "someone".

   WHAT IS DIFFERENT. The guide is one file, shipped inside the function
   bundle. The Vault's assets live in Sheetal's Drive, and the Drive URL is
   the thing that must never reach a browser: a Drive link is a bearer
   credential that outlives any session, cannot be expired by us, and is
   shareable by whoever receives it. So the listing returns an asset ID and a
   PERMIT, never a URL; the stream endpoint exchanges the permit for bytes
   the server fetches itself; and the Drive URL stays on the server.

   ── THE PART THAT IS NOT BUILT, STATED PLAINLY ────────────────────────────
   Reading from Drive requires a service credential, and changing who may
   read those files requires a migration whose plan has not been approved.
   Neither is in scope here, so the default source REFUSES and says so. The
   boundary, the permit, the authorization and the refusal behaviour are all
   complete and tested; the byte source is a single interface with one method
   waiting for an approved credential. Nothing here loosens a Drive
   permission, and nothing here has been pointed at a real file. */

import { getVaultConfig, type VaultEnv } from "./vaultConfig.js";
import {
  decideAccess,
  type AccessDecision,
  type VaultAsset,
  type ViewerIdentity,
} from "./vaultEntitlement.js";
import type { VaultReadRepository } from "./vaultRepository.js";
import type { VaultStore } from "./vaultStore.js";
import { mintVaultToken, verifyVaultToken } from "./vaultTokens.js";

/* What a listing says about one asset. Note what is NOT here: no Drive URL,
   no source folder, no confidentiality label, no entitlement name. A listing
   describes what she may open, not what exists and why she may not. */
export type VaultListingEntry = {
  assetId: string;
  title: string;
};

export type VaultListing = {
  viewer: "anonymous" | "authenticated";
  entries: VaultListingEntry[];
};

export async function listAvailableAssets(
  viewer: ViewerIdentity,
  repository: VaultReadRepository,
): Promise<VaultListing> {
  const assets = await repository.listAssets();
  return {
    viewer: viewer.kind,
    /* Only what she may actually open is listed. An asset she is not
       entitled to is absent rather than shown locked: a locked row is still
       a disclosure that the teaching exists and that she is outside it. */
    entries: assets
      .filter((asset) => decideAccess(asset, viewer).allowed)
      .map((asset) => ({ assetId: asset.assetId, title: asset.title })),
  };
}

export type PermitResult =
  | { ok: true; permit: string; expiresInSeconds: number }
  | { ok: false; decision: AccessDecision | { allowed: false; reason: "not_found" | "unconfigured" } };

/* Step one of a download: authorize now, and hand back a permit that is good
   for one asset, for one session, for about two minutes.

   WHY A PERMIT AT ALL, when the session cookie would do. Because the stream
   endpoint may one day be served from a different origin, a signed media
   host or a range-request path where a cookie is awkward or absent — and
   because a permit narrows the blast radius: it names one asset, dies in
   minutes, and carries the session id so revoking the session kills it. */
export async function issueAssetPermit(
  input: { assetId: string; viewer: ViewerIdentity },
  deps: { env: VaultEnv; repository: VaultReadRepository; now?: () => Date },
): Promise<PermitResult> {
  const config = getVaultConfig(deps.env);

  const asset = await deps.repository.getAsset(input.assetId);
  /* "Not found" and "not allowed" are different internally and identical to
     the caller; the route renders both as the same 403. */
  if (!asset) return { ok: false, decision: { allowed: false, reason: "not_found" } };

  const decision = decideAccess(asset, input.viewer);
  if (!decision.allowed) return { ok: false, decision };

  const minted = mintVaultToken(
    {
      purpose: "vault.asset.v1",
      subject: input.viewer.kind === "authenticated" ? input.viewer.subject : "anonymous",
      expiresInSeconds: config.assetTtlSeconds,
      binding: asset.assetId,
      sessionId: input.viewer.kind === "authenticated" ? input.viewer.sessionId : undefined,
    },
    config.assetSecret,
    deps.now,
  );
  if (!minted) return { ok: false, decision: { allowed: false, reason: "unconfigured" } };

  return { ok: true, permit: minted.token, expiresInSeconds: config.assetTtlSeconds };
}

/* Where the bytes come from. One method, so an approved Drive credential,
   a signed storage bucket or a file in the function bundle can each be
   dropped in without touching the authorization above. */
export type VaultAssetSource = {
  open: (asset: VaultAsset) => Promise<
    | { ok: true; body: Uint8Array; contentType: string; filename: string }
    | { ok: false; reason: string }
  >;
};

/* The default. It refuses, because no credential has been approved and
   because a source that quietly fell back to the public Drive URL would
   hand out exactly the bearer link this whole file exists to avoid. */
export const unconfiguredAssetSource: VaultAssetSource = {
  async open() {
    return { ok: false, reason: "No approved asset source is configured for the Vault" };
  },
};

export type StreamResult =
  | { ok: true; body: Uint8Array; contentType: string; filename: string; recipient: string }
  | { ok: false; reason: string };

/* Step two: exchange a permit for bytes.

   EVERY CHECK FROM STEP ONE IS REPEATED. The permit proves a decision was
   made two minutes ago; it is not trusted as the decision itself. The
   session is re-resolved by the caller, the asset is re-read, the
   entitlement is decided again, and the session is re-checked for
   revocation. A permit minted before Sheetal withdrew a grant must not
   still work after. */
export async function streamAsset(
  input: { permit: string | undefined; viewer: ViewerIdentity },
  deps: {
    env: VaultEnv;
    repository: VaultReadRepository;
    store: VaultStore;
    source: VaultAssetSource;
    now?: () => Date;
  },
): Promise<StreamResult> {
  const config = getVaultConfig(deps.env);

  const verified = verifyVaultToken(input.permit, "vault.asset.v1", config.assetSecret, deps.now);
  if (!verified.valid) return { ok: false, reason: `permit_${verified.reason}` };
  if (!verified.payload.b) return { ok: false, reason: "permit_unbound" };

  /* The permit must belong to the session presenting it. Without this, a
     permit copied out of one woman's network tab would work in anyone's
     browser for its whole lifetime. */
  if (verified.payload.sid) {
    if (input.viewer.kind !== "authenticated" || input.viewer.sessionId !== verified.payload.sid) {
      return { ok: false, reason: "permit_session_mismatch" };
    }
    if (
      await deps.store.isRevoked({
        sessionId: verified.payload.sid,
        subject: verified.payload.s,
        issuedAtUnix: verified.payload.i,
      })
    ) {
      return { ok: false, reason: "permit_session_revoked" };
    }
  }

  const asset = await deps.repository.getAsset(verified.payload.b);
  if (!asset) return { ok: false, reason: "asset_not_found" };

  const decision = decideAccess(asset, input.viewer);
  if (!decision.allowed) return { ok: false, reason: `denied_${decision.reason}` };

  const opened = await deps.source.open(asset);
  if (!opened.ok) return { ok: false, reason: `source_${opened.reason}` };

  return {
    ok: true,
    body: opened.body,
    contentType: opened.contentType,
    filename: opened.filename,
    /* Returned so the route can log who received it. */
    recipient: verified.payload.s,
  };
}
