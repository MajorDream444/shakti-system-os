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
import { describeViewer } from "../../apps/web/src/server/vault/vaultLogging.js";
import {
  streamAsset,
  unconfiguredAssetSource,
} from "../../apps/web/src/server/vault/vaultAssetDelivery.js";

/* GET /api/vault/asset?permit=<permit>

   The only route that serves bytes, and the one place a Drive URL could
   have leaked. It does not: the server fetches the file itself and writes
   the body out. The browser is given a permit and never a source.

   Today the configured source refuses, because no Drive credential has been
   approved and nothing here may change a Drive permission. That refusal is
   a 503, not a 403: it is our fault, not hers, and the distinction only
   appears AFTER she has passed every authorization check, so it discloses
   nothing to anyone who has not already been let in. */
export default async function handler(req: VaultApiRequest, res: VaultApiResponse) {
  applyNoStore(res);

  if (req.method !== "GET") {
    res.setHeader?.("Allow", "GET");
    return res.status(405).json({ status: "invalid", message: "Method not allowed." });
  }

  const repository = buildVaultRepository(process.env);
  const store = getVaultStore();
  const { viewer } = await resolveViewer(cookieHeaderFor(req), {
    env: process.env,
    store,
    repository,
  });

  let result;
  try {
    result = await streamAsset(
      { permit: firstValue(req.query?.permit), viewer },
      { env: process.env, repository, store, source: unconfiguredAssetSource },
    );
  } catch (error) {
    console.error("vault_asset_failed", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return res.status(503).json({
      status: "unavailable",
      message: "The vault cannot be reached just now. Please try again shortly.",
    });
  }

  if (!result.ok) {
    console.error("vault_asset_refused", { reason: result.reason });
    /* An unconfigured source is the one failure that is ours. Everything
       else — a bad permit, a mismatched session, a withdrawn grant — is the
       single shared refusal. */
    if (result.reason.startsWith("source_")) {
      return res.status(503).json({
        status: "unavailable",
        message: "This teaching is not ready to open yet. Please write to sheetalkandola@gmail.com.",
      });
    }
    return res.status(403).json(VAULT_REFUSAL_BODY);
  }

  /* Logged so a leaked file is attributable — as a fingerprint and a masked
     address, never the plaintext one, and never the permit or the Drive URL.
     See vaultLogging.ts for why. */
  console.log("vault_asset_delivered", {
    ...describeViewer(result.recipient, process.env.VAULT_SESSION_SECRET),
    filename: result.filename,
  });

  res.setHeader?.("Content-Type", result.contentType);
  res.setHeader?.("Content-Disposition", `inline; filename="${result.filename}"`);
  return res.status(200).send(result.body);
}
