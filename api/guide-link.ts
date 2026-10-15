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

  /* Accepts one address or several, comma separated. Batch exists because
     minting by hand is a chore and a chore gets skipped: four separate
     requests is four chances to fumble a quote and conclude the endpoint is
     broken. One paste, one answer. */
  const emailRaw = req.query?.email ?? req.query?.emails;
  const emailValue = Array.isArray(emailRaw) ? emailRaw.join(",") : emailRaw;
  const recipients = (emailValue ?? "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);

  if (recipients.length === 0 || recipients.some((r) => !r.includes("@"))) {
    return res.status(400).json({
      status: "invalid",
      message: "Pass ?email=a@b.com or ?emails=a@b.com,c@d.com",
    });
  }

  const daysRaw = req.query?.days;
  const daysValue = Array.isArray(daysRaw) ? daysRaw[0] : daysRaw;
  const parsedDays = Number(daysValue ?? 60);
  const days = Number.isFinite(parsedDays) && parsedDays > 0 ? parsedDays : 60;

  const { mintGuideToken } = await import("../apps/web/src/server/signedLinks.js");
  const base = process.env.PUBLIC_SITE_URL || "https://www.srishaktishala.com";

  const links = recipients.map((recipient) => ({
    recipient,
    url: `${base}/api/guide?t=${mintGuideToken(
      { recipient, document: "navratri-companion", expiresInDays: days },
      secret,
    )}`,
  }));

  /* `plain` returns one "address <tab> url" per line instead of JSON, so the
     output can be pasted straight back without reading around the quoting. */
  const formatRaw = req.query?.format;
  const format = Array.isArray(formatRaw) ? formatRaw[0] : formatRaw;
  if (format === "plain") {
    res.setHeader?.("Content-Type", "text/plain; charset=utf-8");
    return res
      .status(200)
      .json(links.map((l) => `${l.recipient}\t${l.url}`).join("\n"));
  }

  return res.status(200).json({
    status: "minted",
    expiresInDays: days,
    count: links.length,
    links,
  });
}
