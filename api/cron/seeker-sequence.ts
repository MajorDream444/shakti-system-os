declare const process: {
  env: Record<string, string | undefined>;
};

type ApiRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
};

type ApiResponse = {
  status: (statusCode: number) => { json: (payload: unknown) => void };
  setHeader?: (name: string, value: string) => void;
};

/* Day-three and day-seven notes. Invoked by the Vercel cron in vercel.json.

   PROTECTED. Vercel attaches `Authorization: Bearer $CRON_SECRET` to cron
   invocations when that variable is set. Without the guard, anyone who found
   this URL could make the whole due list fire early. It FAILS CLOSED: if
   CRON_SECRET is not configured the endpoint refuses rather than running
   open, because an unprotected endpoint that sends real email to real women
   is worse than one that does nothing. */
export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "GET" && req.method !== "POST") {
    res.setHeader?.("Allow", "GET, POST");
    return res.status(405).json({ status: "invalid", message: "Method not allowed." });
  }

  const secret = process.env.CRON_SECRET;
  if (!secret) {
    return res.status(503).json({
      status: "unconfigured",
      message: "CRON_SECRET is not set, so this endpoint refuses to run.",
    });
  }

  const header = req.headers?.authorization ?? req.headers?.Authorization;
  const provided = Array.isArray(header) ? header[0] : header;
  if (provided !== `Bearer ${secret}`) {
    return res.status(401).json({ status: "unauthorized", message: "Not authorized." });
  }

  const [{ runSeekerSequence }, { AirtableWriteRepository }, { getWriteBoundaryConfig }] =
    await Promise.all([
      import("../../apps/web/src/server/seekerSequenceRunner.js"),
      import("../../apps/web/src/server/airtableWriteRepository.js"),
      import("../../apps/web/src/server/writeBoundaryConfig.js"),
    ]);

  const config = getWriteBoundaryConfig(process.env);
  const summaries = await runSeekerSequence({
    env: process.env,
    repository: new AirtableWriteRepository(config),
  });

  /* Always 200 when the run completed, even with per-seeker failures: those
     are recorded in the summary and the seeker stays due for tomorrow. A 500
     would make Vercel retry the whole batch for faults that are already
     handled. */
  return res.status(200).json({ status: "ran", summaries });
}
