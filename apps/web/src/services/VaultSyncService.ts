import { VaultClassifierService } from "./VaultClassifierService";
import { VaultMetadataService } from "./VaultMetadataService";
import { VaultRecordBuilderService } from "./VaultRecordBuilderService";
import { VaultRelationshipService } from "./VaultRelationshipService";
import { VaultScannerService } from "./VaultScannerService";
import type { VaultScanInput, VaultSyncResult } from "../types/vault";

export const VaultSyncService = {
  buildDrafts(input: VaultScanInput): VaultSyncResult {
    const files = VaultScannerService.fromDriveReferences(input);

    return {
      drafts: files.map((file) => {
        const classification = VaultClassifierService.classify(file);
        const metadata = VaultMetadataService.extractDraft(
          file,
          classification,
        );

        return {
          source: file,
          classification,
          metadata,
          airtableRecord:
            VaultRecordBuilderService.buildLibraryAssetRecord(metadata),
          relationships: VaultRelationshipService.buildRelationships(metadata),
        };
      }),
    };
  },
};
