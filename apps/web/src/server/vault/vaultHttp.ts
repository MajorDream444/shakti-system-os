/* The composition root and the shared HTTP shapes for the Vault routes.

   Everything under api/vault/ is a thin shell: read the request, call into
   here, write the response. The decisions all live in the modules above, so
   they can be tested without a server and so a route cannot accidentally
   become the place a rule is written down. */

import { getWriteBoundaryConfig } from "../writeBoundaryConfig.js";
import type { VaultEnv } from "./vaultConfig.js";
import { AirtableVaultRepository, type VaultReadRepository } from "./vaultRepository.js";
import { defaultVaultStore, type VaultStore } from "./vaultStore.js";

export type VaultApiRequest = {
  method?: string;
  headers?: Record<string, string | string[] | undefined>;
  query?: Record<string, string | string[] | undefined>;
  body?: unknown;
};

export type VaultApiResponse = {
  status: (code: number) => {
    json: (payload: unknown) => void;
    send: (payload: unknown) => void;
    end?: () => void;
  };
  setHeader?: (name: string, value: string) => void;
};

export function firstValue(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

/* The key the per-source rate limit counts against.

   x-forwarded-for on Vercel is a list the platform appends to; the FIRST
   entry is the client as the edge saw it. Taking the last would count the
   proxy, which is the same for everyone and would make the limit global. A
   client can still forge earlier entries, which is why this is a courtesy
   limit on top of the per-address one, not a security boundary by itself. */
export function sourceKeyFor(req: VaultApiRequest): string {
  const forwarded = firstValue(req.headers?.["x-forwarded-for"]);
  const first = forwarded?.split(",")[0]?.trim();
  return first || firstValue(req.headers?.["x-real-ip"]) || "unknown";
}

export function cookieHeaderFor(req: VaultApiRequest): string | undefined {
  return firstValue(req.headers?.cookie ?? req.headers?.Cookie);
}

/* Vercel parses a JSON body for us, but a hand-rolled curl or a form post
   may deliver a string. Both are accepted; anything else is an empty object,
   never a throw. */
export function readJsonBody(body: unknown): Record<string, unknown> {
  if (body && typeof body === "object" && !Array.isArray(body)) return body as Record<string, unknown>;
  if (typeof body === "string" && body.trim()) {
    try {
      const parsed = JSON.parse(body) as unknown;
      if (parsed && typeof parsed === "object" && !Array.isArray(parsed)) {
        return parsed as Record<string, unknown>;
      }
    } catch {
      /* Fall through to an empty body. A malformed payload is a missing
         field, which the handler already refuses properly. */
    }
  }
  return {};
}

export function buildVaultRepository(env: VaultEnv): VaultReadRepository {
  /* Reuses the Airtable credentials the write boundary already resolves, so
     there is one place where the token name is known. BEGIN_WRITES_ENABLED
     is irrelevant here: this repository cannot write. */
  const config = getWriteBoundaryConfig(env);
  return new AirtableVaultRepository({ baseId: config.baseId, token: config.token });
}

export function getVaultStore(): VaultStore {
  return defaultVaultStore;
}

/* Vault responses are never cached and never indexed. Applied to every
   route, including refusals: a cached 403 is a 403 served to the wrong
   person later. */
export function applyNoStore(res: VaultApiResponse) {
  res.setHeader?.("Cache-Control", "private, no-store, max-age=0");
  res.setHeader?.("X-Robots-Tag", "noindex, nofollow");
}

/* One sentence for every refusal in the whole surface. See
   vaultEntitlement.REFUSAL_MESSAGE for why. */
export const VAULT_REFUSAL_BODY = {
  status: "refused" as const,
  message:
    "This teaching is not open to you yet. If you believe it should be, please write to sheetalkandola@gmail.com.",
};
