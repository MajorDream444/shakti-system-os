import {
  AIRTABLE_INITIAL_BUILD_PRIORITY,
  AIRTABLE_TABLES,
} from "../constants/airtableSchema";
import type {
  AirtableIntegrationStatus,
  AirtableRecordDraft,
  AirtableTableConfig,
} from "../types/integrations";

const airtableBase = import.meta.env.VITE_AIRTABLE_BASE ?? "";

export const AirtableService = {
  getStatus(): AirtableIntegrationStatus {
    return {
      configured: airtableBase.length > 0,
      base: airtableBase,
    };
  },

  getTableSchema(tableName: string): AirtableTableConfig | undefined {
    return Object.values(AIRTABLE_TABLES).find(
      (table) => table.name === tableName,
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
