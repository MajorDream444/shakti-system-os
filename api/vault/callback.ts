declare const process: { env: Record<string, string | undefined> };

import {
  applyNoStore,
  buildVaultRepository,
  firstValue,
  getVaultStore,
  type VaultApiRequest,
  type VaultApiResponse,
} from "../../apps/web/src/server/vault/vaultHttp.js";
import { completeSignIn } from "../../apps/web/src/server/vault/vaultAuth.js";

/* GET /api/vault/callback?t=<magic token>

   The hop from her inbox into a session. On success it sets the session
   cookie and answers with JSON rather than redirecting: there is no Vault
   page yet, and inventing a redirect target now would be a public-surface
   change this work is not allowed to make. The response contract is fixed
   so Codex can build the page against it; when that page exists, the only
   change here is a 302 to it alongside the same Set-Cookie.

   Every refusal is the same 403. A link that is expired, forged, or already
   followed must look identical, or the endpoint becomes a way to test
   whether a token was ever real. */
export default async function handler(req: VaultApiRequest, res: VaultApiResponse) {
  applyNoStore(res);

  if (req.method !== "GET") {
    res.setHeader?.("Allow", "GET");
    return res.status(405).json({ status: "invalid", message: "Method not allowed." });
  }

  const result = await completeSignIn(firstValue(req.query?.t), {
    env: process.env,
    store: getVaultStore(),
    repository: buildVaultRepository(process.env),
    logger: { info: (event, data) => console.log(event, data), error: (event, data) => console.error(event, data) },
  });

  if (!result.ok) {
    if (result.reason === "unconfigured") {
      return res.status(503).json({
        status: "unconfigured",
        message: "The vault is not open yet. Please write to sheetalkandola@gmail.com.",
      });
    }
    return res.status(403).json({
      status: "refused",
      message:
        "This link is no longer valid. Sign-in links open once and expire quickly, for your protection. " +
        "Please ask for another.",
    });
  }

  res.setHeader?.("Set-Cookie", result.setCookie);
  return res.status(200).json({ status: "signed_in" });
}
