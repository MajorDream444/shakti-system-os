declare const process: { env: Record<string, string | undefined> };

import {
  applyNoStore,
  buildVaultRepository,
  cookieHeaderFor,
  getVaultStore,
  readJsonBody,
  type VaultApiRequest,
  type VaultApiResponse,
} from "../../apps/web/src/server/vault/vaultHttp.js";
import { signOut } from "../../apps/web/src/server/vault/vaultAuth.js";
import {
  buildClearedSessionCookie,
  resolveViewer,
} from "../../apps/web/src/server/vault/vaultIdentity.js";
import { getVaultConfig } from "../../apps/web/src/server/vault/vaultConfig.js";

/* GET    /api/vault/session   who the server thinks is asking
   DELETE /api/vault/session   sign out  { "everywhere": true } to kill all

   The GET answers for an anonymous caller too, with signedIn: false. It is
   how a page decides whether to show the sign-in form, and it deliberately
   returns nothing but the address and a count — never the grant areas
   themselves, which would tell a browser the names of tiers it is outside. */
export default async function handler(req: VaultApiRequest, res: VaultApiResponse) {
  applyNoStore(res);

  const deps = {
    env: process.env,
    store: getVaultStore(),
    repository: buildVaultRepository(process.env),
  };

  if (req.method === "GET") {
    const { viewer } = await resolveViewer(cookieHeaderFor(req), deps);
    if (viewer.kind !== "authenticated") {
      return res.status(200).json({ status: "ok", signedIn: false });
    }
    return res.status(200).json({
      status: "ok",
      signedIn: true,
      email: viewer.subject,
      grantCount: viewer.grantedAreas.length,
    });
  }

  if (req.method === "DELETE" || req.method === "POST") {
    const { viewer } = await resolveViewer(cookieHeaderFor(req), deps);
    /* The cookie is cleared either way. Signing out while already signed
       out must not be an error, and must not say whether there was a
       session to end. */
    res.setHeader?.("Set-Cookie", buildClearedSessionCookie(getVaultConfig(process.env).cookieName));

    if (viewer.kind === "authenticated") {
      await signOut(
        {
          subject: viewer.subject,
          sessionId: viewer.sessionId,
          everywhere: readJsonBody(req.body).everywhere === true,
        },
        deps,
      );
    }
    return res.status(200).json({ status: "signed_out" });
  }

  res.setHeader?.("Allow", "GET, DELETE, POST");
  return res.status(405).json({ status: "invalid", message: "Method not allowed." });
}
