import { env } from "../config/env";
import { LIVE_AIRTABLE_BASE_ID } from "../constants/liveAirtable";
import type {
  AirtableApiListResponse,
  AirtableApiRecord,
  ReadOnlyBackendState,
} from "../types/backend";

const AIRTABLE_API_ROOT = "https://api.airtable.com/v0";

function getReadOnlyState(): ReadOnlyBackendState {
  if (!env.airtableBase) {
    return {
      source: "mock",
      reason: "Missing VITE_AIRTABLE_BASE.",
    };
  }

  if (!env.airtableToken) {
    return {
      source: "mock",
      reason: "Missing VITE_AIRTABLE_TOKEN.",
    };
  }

  if (env.appEnv === "production") {
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
      return null;
    }

    const payload = (await response.json()) as AirtableApiListResponse;
    return payload.records;
  },
};
