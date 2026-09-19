import { BackendErrorLogger } from "./BackendErrorLogger";
import type { AirtableApiRecord, ReadOnlyBackendState } from "../types/backend";

function getReadOnlyState(): ReadOnlyBackendState {
  BackendErrorLogger.log({
    code: "backend_unavailable",
    message: "Direct Airtable browser reads are disabled. Using mock backend fallback.",
  });

  return {
    source: "mock",
    reason: "Airtable reads require an approved server-side endpoint.",
  };
}

export const AirtableReadOnlyClient = {
  getState: getReadOnlyState,

  async listRecords(
    tableId: string,
    fieldIds: readonly string[],
  ): Promise<AirtableApiRecord[] | null> {
    void tableId;
    void fieldIds;
    getReadOnlyState();
    return null;
  },
};
