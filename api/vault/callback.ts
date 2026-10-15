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

/* The hop from her inbox into a session.

   ── WHY A GET DOES NOT SIGN HER IN ────────────────────────────────────────
   The first version consumed the token on GET. That is wrong, and Codex's
   review of PR #39 caught it: mail providers, corporate security scanners
   and chat link-preview bots all follow URLs in email before a human sees
   them. A scanner would have spent her one-time link — and been handed the
   session cookie — and she would then have clicked through to a 403 she
   could do nothing about. A single-use link plus an automatic fetcher is a
   lockout, not a security control.

   So the token is spent only by an explicit human action:

     GET   renders a plain page with one button. Nothing is consumed, nothing
           is verified, no cookie is set. A scanner may fetch this all day.
     POST  consumes the token and opens the session. Browsers do not issue
           this on their own, and a preview bot will not press a button.

   The page is deliberately unstyled and lives entirely inside this function.
   It is not part of the sanctuary design and must not grow into it. */

function interstitial(token: string): string {
  /* The token is placed in a hidden field, HTML-escaped. It arrived in a URL
     we signed, but it is still untrusted input until verified, and it is
     echoed into a document here — so it is escaped rather than trusted. */
  const safe = token
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="robots" content="noindex,nofollow">
<title>Sri Shakti Shala</title>
<style>
  :root { color-scheme: light dark; }
  body { font-family: Georgia, serif; line-height: 1.6; margin: 0;
         min-height: 100vh; display: grid; place-items: center; padding: 24px; }
  main { max-width: 32rem; text-align: center; }
  button { font: inherit; padding: 0.75rem 2rem; margin-top: 1.5rem;
           border: 1px solid currentColor; border-radius: 999px;
           background: transparent; color: inherit; cursor: pointer; }
  p { opacity: 0.8; }
</style></head>
<body><main>
  <h1>Welcome back</h1>
  <p>Press below to open the vault. This link opens once.</p>
  <form method="POST" action="/api/vault/callback">
    <input type="hidden" name="t" value="${safe}">
    <button type="submit">Enter the vault</button>
  </form>
</main></body></html>`;
}

const REFUSAL =
  "This link is no longer valid. Sign-in links open once and expire quickly, " +
  "for your protection. Please ask for another.";

export default async function handler(req: VaultApiRequest, res: VaultApiResponse) {
  applyNoStore(res);

  const token = firstValue(req.query?.t);

  if (req.method === "GET") {
    /* No token, no page — but still no information about whether any token
       would have worked. */
    if (!token) {
      return res.status(400).json({ status: "invalid", message: "This link is incomplete." });
    }
    res.setHeader?.("Content-Type", "text/html; charset=utf-8");
    return res.status(200).send(interstitial(token));
  }

  if (req.method !== "POST") {
    res.setHeader?.("Allow", "GET, POST");
    return res.status(405).json({ status: "invalid", message: "Method not allowed." });
  }

  /* The form posts the token in the body; a direct caller may still use the
     query string. */
  const body = req.body;
  const fromBody =
    body && typeof body === "object" && !Array.isArray(body)
      ? (body as Record<string, unknown>).t
      : undefined;

  const result = await completeSignIn(typeof fromBody === "string" ? fromBody : token, {
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
    /* Expired, forged and already-used are one answer. */
    return res.status(403).json({ status: "refused", message: REFUSAL });
  }

  res.setHeader?.("Set-Cookie", result.setCookie);
  return res.status(200).json({ status: "signed_in" });
}
