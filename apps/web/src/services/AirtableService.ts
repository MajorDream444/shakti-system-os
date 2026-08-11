import {
  AIRTABLE_INITIAL_BUILD_PRIORITY,
  AIRTABLE_TABLES,
} from "../constants/airtableSchema";
import { env } from "../config/env";
import { AirtableReadOnlyClient } from "./AirtableReadOnlyClient";
import type {
  AirtableIntegrationStatus,
  AirtableRecordDraft,
  AirtableTableConfig,
} from "../types/integrations";

function normalizeTableName(tableName: string) {
  return tableName.trim().toLowerCase();
}

export const AirtableService = {
  getStatus(): AirtableIntegrationStatus {
    const readOnlyState = AirtableReadOnlyClient.getState();

    return {
      configured:
        env.airtableBase.length > 0 && readOnlyState.source === "airtable",
      base: env.airtableBase,
    };
  },

  getTableSchema(tableName: string): AirtableTableConfig | undefined {
    const normalizedName = normalizeTableName(tableName);

    return Object.values(AIRTABLE_TABLES).find(
      (table) => normalizeTableName(table.name) === normalizedName,
    );
  },

  getInitialBuildTables(): readonly string[] {
    return AIRTABLE_INITIAL_BUILD_PRIORITY;
  },

  createRecordDraft(record: AirtableRecordDraft): AirtableRecordDraft {
    return record;
  },

  async listApprovedRecords(tableName: string): Promise<AirtableRecordDraft[]> {
    void tableName;
    return [];
  },
};
