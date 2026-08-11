import {
  VAULT_DEFAULT_KNOWLEDGE_MATURITY,
  VAULT_FOLDER_HINTS,
} from "../constants/vault";
import type { DriveFileReference } from "../types/integrations";
import type {
  VaultAssetClassification,
  VaultMetadataDraft,
} from "../types/vault";

function tokenize(value: string) {
  return value
    .replace(/\.[^/.]+$/, "")
    .split(/[\s_-]+/)
    .map((token) => token.trim())
    .filter(Boolean);
}

function inferTheme(file: DriveFileReference) {
  const tokens = tokenize(`${file.name} ${file.sourceFolder ?? ""}`);
  return tokens.slice(0, 6);
}

function inferPracticeType(file: DriveFileReference) {
  const haystack = `${file.name} ${file.sourceFolder ?? ""}`.toLowerCase();
  if (VAULT_FOLDER_HINTS.retreat.some((hint) => haystack.includes(hint))) {
    return "Retreat Prep";
  }
  if (VAULT_FOLDER_HINTS.ceremony.some((hint) => haystack.includes(hint))) {
    return "Ceremony";
  }
  if (VAULT_FOLDER_HINTS.practices.some((hint) => haystack.includes(hint))) {
    return "Somatic";
  }
  return "";
}

export const VaultMetadataService = {
  extractDraft(
    file: DriveFileReference,
    classification: VaultAssetClassification,
  ): VaultMetadataDraft {
    const title = file.name.replace(/\.[^/.]+$/, "");

    return {
      title,
      description: file.description ?? "",
      driveUrl: file.url ?? "",
      sourceFolder: classification.sourceFolder ?? "",
      mediaType: classification.mediaType,
      fileType: classification.fileType,
      theme: inferTheme(file),
      keywords: tokenize(title),
      goddessArchetype: "",
      moonPhase: "",
      practiceType: inferPracticeType(file),
      accessLevel: classification.accessLevel,
      readinessLevel: "",
      publishingStatus: classification.publishingStatus,
      knowledgeMaturity: VAULT_DEFAULT_KNOWLEDGE_MATURITY,
      confidentiality: file.confidentiality ?? "Needs Review",
      notes:
        file.notes ??
        "Generated as a local metadata draft. Requires human review.",
    };
  },
};
