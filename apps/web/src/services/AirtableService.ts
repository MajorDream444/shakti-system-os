import {
  AIRTABLE_INITIAL_BUILD_PRIORITY,
  AIRTABLE_TABLES,
} from "../constants/airtableSchema";
import { env } from "../config/env";
import type {
  AirtableIntegrationStatus,
  AirtableRecordDraft,
  AirtableTableConfig,
} from "../types/integrations";

export const AirtableService = {
  getStatus(): AirtableIntegrationStatus {
    return {
      configured: env.airtableBase.length > 0,
      base: env.airtableBase,
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
