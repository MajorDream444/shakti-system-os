import { VAULT_LIBRARY_TABLE_NAME } from "../constants/vault";
import type { AirtableRecordDraft } from "../types/integrations";
import type { VaultMetadataDraft } from "../types/vault";

export const VaultRecordBuilderService = {
  buildLibraryAssetRecord(metadata: VaultMetadataDraft): AirtableRecordDraft {
    return {
      tableName: VAULT_LIBRARY_TABLE_NAME,
      fields: {
        Title: metadata.title,
        Description: metadata.description,
        "Drive URL": metadata.driveUrl,
        "Source Folder": metadata.sourceFolder,
        "Media Type": metadata.mediaType,
        "File Type": metadata.fileType,
        Theme: metadata.theme,
        Keywords: metadata.keywords,
        "Goddess / Archetype": metadata.goddessArchetype,
        "Moon Phase": metadata.moonPhase,
        "Practice Type": metadata.practiceType,
        "Access Level": metadata.accessLevel,
        "Readiness Level": metadata.readinessLevel,
        "Publishing Status": metadata.publishingStatus,
        Confidentiality: metadata.confidentiality,
        Notes: metadata.notes,
      },
    };
  },
};
