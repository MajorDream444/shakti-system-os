import type {
  BeginCompleteRequest,
  BeginCompleteResponse,
  RequestSignalRequest,
  RequestSignalResponse,
} from "../contracts/beginWriteContract";

async function postJson<TResponse>(path: string, payload: unknown): Promise<TResponse> {
  const response = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const body = (await response.json().catch(() => null)) as TResponse | null;

  if (!response.ok || !body) {
    throw new Error(`Request failed: ${response.status}`);
  }

  return body;
}

export const BeginWriteClient = {
  completeBegin(payload: BeginCompleteRequest) {
    return postJson<BeginCompleteResponse>("/api/begin/complete", payload);
  },

  requestSignal(payload: RequestSignalRequest) {
    return postJson<RequestSignalResponse>("/api/request-signal", payload);
  },
};
