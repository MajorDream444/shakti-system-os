import { VaultSyncService } from "../services/VaultSyncService";
import type { AirtableRecordDraft } from "../types/integrations";
import { sampleVaultIntakeFiles } from "./vaultIntakeSamples";

export const internalLibraryAssetSeedFixtures: AirtableRecordDraft[] =
  VaultSyncService.buildDrafts({
    files: sampleVaultIntakeFiles,
  }).drafts.map((draft) => draft.airtableRecord);
