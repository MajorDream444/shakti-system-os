declare const process: { env: Record<string, string | undefined> };

type ApiRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
};
type ApiResponse = {
  status: (code: number) => { json: (payload: unknown) => void };
  setHeader?: (name: string, value: string) => void;
};

/* Mints a signed download link for one person.

   Needed because the four women who already have the guide were emailed by
   hand, so their links cannot be minted at send time the way a future
   buyer's will be. It is also the tool for reissuing a link to anyone whose
   has expired.

   PROTECTED BY THE SAME SECRET IT SIGNS WITH. Anyone who can mint links can
   already forge them, so a separate credential would be theatre. It fails
   closed when the secret is absent. */
export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader?.("Allow", "GET, POST");
    return res.status(405).json({ status: "invalid", message: "Method not allowed." });
  }

  const secret = process.env.GUIDE_LINK_SECRET;
  if (!secret) {
    return res.status(503).json({ status: "unconfigured", message: "GUIDE_LINK_SECRET is not set." });
  }

  const header = req.headers?.authorization ?? req.headers?.Authorization;
  const provided = Array.isArray(header) ? header[0] : header;
  if (provided !== `Bearer ${secret}`) {
    return res.status(401).json({ status: "unauthorized", message: "Not authorized." });
  }

  const emailRaw = req.query?.email;
  const email = Array.isArray(emailRaw) ? emailRaw[0] : emailRaw;
  if (!email?.includes("@")) {
    return res.status(400).json({ status: "invalid", message: "Pass ?email=someone@example.com" });
  }

  const daysRaw = req.query?.days;
  const daysValue = Array.isArray(daysRaw) ? daysRaw[0] : daysRaw;
  const days = Number(daysValue ?? 30);

  const { mintGuideToken } = await import("../apps/web/src/server/signedLinks.js");
  const token = mintGuideToken(
    { recipient: email, document: "navratri-companion", expiresInDays: Number.isFinite(days) ? days : 30 },
    secret,
  );

  const base = process.env.PUBLIC_SITE_URL || "https://www.srishaktishala.com";
  return res.status(200).json({
    status: "minted",
    recipient: email,
    expiresInDays: Number.isFinite(days) ? days : 30,
    url: `${base}/api/guide?t=${token}`,
  });
}
