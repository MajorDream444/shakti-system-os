declare const process: { env: Record<string, string | undefined> };

import {
  applyNoStore,
  buildVaultRepository,
  cookieHeaderFor,
  firstValue,
  getVaultStore,
  VAULT_REFUSAL_BODY,
  type VaultApiRequest,
  type VaultApiResponse,
} from "../../apps/web/src/server/vault/vaultHttp.js";
import { resolveViewer } from "../../apps/web/src/server/vault/vaultIdentity.js";
import {
  issueAssetPermit,
  listAvailableAssets,
} from "../../apps/web/src/server/vault/vaultAssetDelivery.js";

/* GET /api/vault/assets                 what this viewer may open
   GET /api/vault/assets?assetId=ASSET-… a short-lived permit for one of them

   The listing contains only assets the viewer may actually open. On
   15 October 2026 that is none for everyone, because no asset has been
   approved for publication — an empty list is this working, not a fault.

   The permit answer is the same 403 whether the asset does not exist, is
   not approved, or is approved but not hers. */
export default async function handler(req: VaultApiRequest, res: VaultApiResponse) {
  applyNoStore(res);

  if (req.method !== "GET") {
    res.setHeader?.("Allow", "GET");
    return res.status(405).json({ status: "invalid", message: "Method not allowed." });
  }

  const repository = buildVaultRepository(process.env);
  const { viewer } = await resolveViewer(cookieHeaderFor(req), {
    env: process.env,
    store: getVaultStore(),
    repository,
  });

  const assetId = firstValue(req.query?.assetId);

  try {
    if (!assetId) {
      const listing = await listAvailableAssets(viewer, repository);
      return res.status(200).json({ status: "ok", ...listing });
    }

    const permit = await issueAssetPermit(
      { assetId, viewer },
      { env: process.env, repository },
    );

    if (!permit.ok) {
      /* The reason is logged, never returned. */
      console.error("vault_permit_refused", {
        assetId,
        reason: permit.decision.reason,
        signedIn: viewer.kind === "authenticated",
      });
      return res.status(403).json(VAULT_REFUSAL_BODY);
    }

    return res.status(200).json({
      status: "ok",
      assetId,
      permit: permit.permit,
      expiresInSeconds: permit.expiresInSeconds,
    });
  } catch (error) {
    console.error("vault_assets_failed", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    /* A catalogue we could not read is not a catalogue that is open. */
    return res.status(503).json({
      status: "unavailable",
      message: "The vault cannot be reached just now. Please try again shortly.",
    });
  }
}
