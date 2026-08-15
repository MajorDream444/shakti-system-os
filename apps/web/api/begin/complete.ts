import { handleBeginCompleteHttp } from "../../src/server/httpAdapters.js";

declare const process: {
  env: Record<string, string | undefined>;
};

type ApiRequest = {
  method?: string;
  body?: unknown;
};

type ApiResponse = {
  status: (statusCode: number) => {
    json: (payload: unknown) => void;
  };
  setHeader?: (name: string, value: string) => void;
};

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== "POST") {
    res.setHeader?.("Allow", "POST");
    return res.status(405).json({ status: "invalid", message: "Method not allowed." });
  }

  const result = await handleBeginCompleteHttp(req.body, process.env);
  return res.status(result.statusCode).json(result.body);
}
