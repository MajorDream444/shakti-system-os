declare const process: { env: Record<string, string | undefined> };

import {
  applyNoStore,
  getVaultStore,
  buildVaultRepository,
  readJsonBody,
  sourceKeyFor,
  type VaultApiRequest,
  type VaultApiResponse,
} from "../../apps/web/src/server/vault/vaultHttp.js";
import { requestSignInLink } from "../../apps/web/src/server/vault/vaultAuth.js";

/* POST /api/vault/request-link   { "email": "her@example.com" }

   Always answers 202 with the same sentence, whatever happened — sent,
   unknown address, rate limited, or Resend refused. The only other answers
   are 400 for a request with no address in it at all, and 503 when the
   Vault's secrets are not configured, neither of which says anything about
   any person. See the note on rule 1 in vaultAuth.ts. */
export default async function handler(req: VaultApiRequest, res: VaultApiResponse) {
  applyNoStore(res);

  if (req.method !== "POST") {
    res.setHeader?.("Allow", "POST");
    return res.status(405).json({ status: "invalid", message: "Method not allowed." });
  }

  const result = await requestSignInLink(
    { email: readJsonBody(req.body).email, sourceKey: sourceKeyFor(req) },
    {
      env: process.env,
      store: getVaultStore(),
      repository: buildVaultRepository(process.env),
      logger: { info: (event, data) => console.log(event, data), error: (event, data) => console.error(event, data) },
    },
  );

  if (result.status === "unconfigured") {
    return res.status(503).json({
      status: "unconfigured",
      message: "The vault is not open yet. Please write to sheetalkandola@gmail.com.",
    });
  }

  if (result.status === "invalid") {
    return res.status(400).json({ status: "invalid", message: "Please enter an email address." });
  }

  return res.status(202).json({
    status: "acknowledged",
    message:
      "If that address is known to Sheetal, a link is on its way. It opens once and lasts a short while.",
  });
}
