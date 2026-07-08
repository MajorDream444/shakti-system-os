import {
  VAULT_DEFAULT_ACCESS_LEVEL,
  VAULT_DEFAULT_PUBLISHING_STATUS,
  VAULT_FOLDER_HINTS,
  VAULT_MEDIA_EXTENSION_MAP,
} from "../constants/vault";
import type { DriveFileReference } from "../types/integrations";
import type { VaultAssetClassification } from "../types/vault";

function getExtension(name: string) {
  const extension = name.split(".").pop();
  return extension ? extension.toLowerCase() : "";
}

function hasFolderHint(file: DriveFileReference, hints: readonly string[]) {
  const haystack = `${file.name} ${file.sourceFolder ?? ""}`.toLowerCase();
  return hints.some((hint) => haystack.includes(hint));
}

export const VaultClassifierService = {
  classify(file: DriveFileReference): VaultAssetClassification {
    const fileType = getExtension(file.name);
    const hintedMediaType = file.mediaType;
    const mediaType =
      hintedMediaType ??
      VAULT_MEDIA_EXTENSION_MAP[fileType] ??
      (hasFolderHint(file, VAULT_FOLDER_HINTS.transcript)
        ? "Transcript"
        : "Other");

    return {
      mediaType,
      fileType,
      publishingStatus:
        mediaType === "Audio" || mediaType === "Video"
          ? "Needs Transcript"
          : VAULT_DEFAULT_PUBLISHING_STATUS,
      accessLevel: VAULT_DEFAULT_ACCESS_LEVEL,
      sourceFolder: file.sourceFolder,
    };
  },
};
