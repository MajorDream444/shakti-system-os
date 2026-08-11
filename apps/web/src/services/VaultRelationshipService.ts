import type {
  VaultMetadataDraft,
  VaultRelationshipDraft,
} from "../types/vault";

export const VaultRelationshipService = {
  buildRelationships(metadata: VaultMetadataDraft): VaultRelationshipDraft[] {
    const relationships: VaultRelationshipDraft[] = [];

    if (metadata.practiceType) {
      relationships.push({
        from: metadata.title,
        to: metadata.practiceType,
        type: "RELATED_TO",
      });
    }

    if (metadata.sourceFolder) {
      relationships.push({
        from: metadata.title,
        to: metadata.sourceFolder,
        type: "BELONGS_TO",
      });
    }

    return relationships;
  },
};
