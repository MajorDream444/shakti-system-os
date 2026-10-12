import { readFile } from "node:fs/promises";
import { join } from "node:path";

declare const process: {
  env: Record<string, string | undefined>;
  cwd: () => string;
};

type ApiRequest = { method?: string; query?: Record<string, string | string[] | undefined> };
type ApiResponse = {
  status: (code: number) => {
    json: (payload: unknown) => void;
    send: (payload: unknown) => void;
  };
  setHeader?: (name: string, value: string) => void;
};

/* Gated download for the Navratri Companion Guide.

   The file is NOT under public/. Anything there is served directly by Vercel
   with no check at all, which is what this replaces: a random filename is
   unguessable, not protected, and works forever once forwarded.

   Every refusal returns the SAME 403 and the same words. A reader must not be
   able to tell an expired link from a forged one from a wrong document — that
   difference is the only feedback an attacker would get, and it is free to
   withhold. The real reason goes to the log, where Sheetal's side can see it. */
export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET") {
    res.setHeader?.("Allow", "GET");
    return res.status(405).json({ status: "invalid", message: "Method not allowed." });
  }

  const raw = req.query?.t;
  const token = Array.isArray(raw) ? raw[0] : raw;

  const { verifyGuideToken } = await import("../apps/web/src/server/signedLinks.js");
  const result = verifyGuideToken(token, process.env.GUIDE_LINK_SECRET);

  if (!result.valid) {
    console.error("guide_download_refused", { reason: result.reason });
    return res.status(403).json({
      status: "refused",
      message:
        "This download link is no longer valid. Links expire for your protection. " +
        "Please write to sheetalkandola@gmail.com and a new one will be sent to you.",
    });
  }

  if (result.payload.d !== "navratri-companion") {
    console.error("guide_download_refused", { reason: "unknown_document", d: result.payload.d });
    return res.status(403).json({
      status: "refused",
      message:
        "This download link is no longer valid. Links expire for your protection. " +
        "Please write to sheetalkandola@gmail.com and a new one will be sent to you.",
    });
  }

  /* Logged so a leaked link is traceable to the person it was minted for.
     This is the only thing that makes sharing attributable. */
  console.log("guide_downloaded", { recipient: result.payload.r });

  try {
    const file = await readFile(join(process.cwd(), "assets/guide/navratri-companion.pdf"));
    res.setHeader?.("Content-Type", "application/pdf");
    res.setHeader?.(
      "Content-Disposition",
      'inline; filename="Navratri-Companion-Guide-Sri-Shakti-Shala.pdf"',
    );
    /* Never cached by a CDN or proxy: a cached copy would outlive the token
       and could be served to someone whose link has expired. */
    res.setHeader?.("Cache-Control", "private, no-store, max-age=0");
    return res.status(200).send(file);
  } catch (error) {
    console.error("guide_file_unreadable", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return res.status(500).json({
      status: "error",
      message: "The guide could not be loaded. Please write to sheetalkandola@gmail.com.",
    });
  }
}
