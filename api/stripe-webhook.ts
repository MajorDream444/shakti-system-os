/* Stripe -> Airtable. The buyer half of the system.

   Before this endpoint, a woman could pay for Dancing with Durga and the
   system held no record of it: she received a Stripe receipt and nothing
   else, at the moment she was most committed and least informed.

   Reads the RAW body, not the parsed one — Stripe's signature is computed
   over the exact bytes sent, so any reserialisation invalidates it. The
   bodyParser is disabled below for that reason. */

declare const process: {
  env: Record<string, string | undefined>;
};

type ApiRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  on: (event: string, listener: (chunk?: unknown) => void) => void;
};

type ApiResponse = {
  status: (statusCode: number) => { json: (payload: unknown) => void };
  setHeader?: (name: string, value: string) => void;
};

export const config = { api: { bodyParser: false } };

function readRawBody(req: ApiRequest): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = [];
    req.on("data", chunk => chunks.push(Buffer.from(chunk as Uint8Array)));
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.setHeader?.("Allow", "POST");
    return res.status(405).json({ status: "invalid", message: "Method not allowed." });
  }

  let rawBody: string;
  try {
    rawBody = await readRawBody(req);
  } catch {
    return res.status(400).json({ status: "invalid", message: "Unreadable body." });
  }

  const signature = req.headers?.["stripe-signature"];
  const { handleStripeWebhook } = await import(
    "../apps/web/src/server/stripeWebhook.js"
  );

  const result = await handleStripeWebhook(
    rawBody,
    typeof signature === "string" ? signature : "",
    process.env,
  );

  return res.status(result.statusCode).json(result.body);
}
