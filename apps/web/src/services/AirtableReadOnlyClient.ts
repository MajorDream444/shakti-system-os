import { env } from "../config/env";
import { LIVE_AIRTABLE_BASE_ID } from "../constants/liveAirtable";
import { BackendErrorLogger } from "./BackendErrorLogger";
import type {
  AirtableApiListResponse,
  AirtableApiRecord,
  ReadOnlyBackendState,
} from "../types/backend";

const AIRTABLE_API_ROOT = "https://api.airtable.com/v0";

function getReadOnlyState(): ReadOnlyBackendState {
  if (!env.airtableBase) {
    BackendErrorLogger.log({
      code: "missing_env",
      message: "Missing VITE_AIRTABLE_BASE. Using mock backend fallback.",
    });

    return {
      source: "mock",
      reason: "Missing VITE_AIRTABLE_BASE.",
    };
  }

  if (!env.airtableToken) {
    BackendErrorLogger.log({
      code: "missing_env",
      message: "Missing VITE_AIRTABLE_TOKEN. Using mock backend fallback.",
    });

    return {
      source: "mock",
      reason: "Missing VITE_AIRTABLE_TOKEN.",
    };
  }

  if (env.appEnv === "production") {
    BackendErrorLogger.log({
      code: "backend_unavailable",
      message:
        "Direct Airtable browser reads are disabled in production. Using mock fallback.",
      context: { appEnv: env.appEnv },
    });

    return {
      source: "mock",
      reason: "Browser-exposed Airtable tokens are disabled in production.",
    };
  }

  return { source: "airtable" };
}

function buildRecordsUrl(tableId: string, fieldIds: readonly string[]) {
  const baseId = env.airtableBase || LIVE_AIRTABLE_BASE_ID;
  const url = new URL(`${AIRTABLE_API_ROOT}/${baseId}/${tableId}`);
  fieldIds.forEach((fieldId) => url.searchParams.append("fields[]", fieldId));
  return url;
}

export const AirtableReadOnlyClient = {
  getState: getReadOnlyState,

  async listRecords(
    tableId: string,
    fieldIds: readonly string[],
  ): Promise<AirtableApiRecord[] | null> {
    const state = getReadOnlyState();

    if (state.source !== "airtable") {
      return null;
    }

    const response = await fetch(buildRecordsUrl(tableId, fieldIds), {
      headers: {
        Authorization: `Bearer ${env.airtableToken}`,
      },
    });

    if (!response.ok) {
      BackendErrorLogger.log({
        code: "request_failed",
        message: "Airtable read request failed. Using mock fallback.",
        context: { tableId, status: response.status },
      });
      return null;
    }

    const payload = (await response.json()) as AirtableApiListResponse;
    return payload.records;
  },
};
