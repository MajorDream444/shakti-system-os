import type { LibraryAssetRecord } from "../types/backend";
import type { Collection, Practice } from "./types";

function normalizePracticeId(asset: LibraryAssetRecord) {
  return asset.assetId.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}

function isRenderableLibraryAsset(asset: LibraryAssetRecord) {
  return Boolean(asset.assetId && asset.title && asset.description && asset.driveUrl);
}

function toLibraryPractice(asset: LibraryAssetRecord): Practice {
  return {
    id: normalizePracticeId(asset),
    title: asset.title,
    duration: asset.mediaType || "Library Asset",
    category: asset.practiceType || "Temple Library",
    goddess: asset.goddessArchetype || undefined,
    description: asset.description,
  };
}

export function buildLibraryCollections(
  libraryAssets: LibraryAssetRecord[],
  fallbackCollections: Collection[],
): Collection[] {
  const practices = libraryAssets
    .filter(isRenderableLibraryAsset)
    .map(toLibraryPractice);

  if (practices.length === 0) {
    return fallbackCollections;
  }

  return [
    {
      id: "living-knowledge",
      title: "Living Knowledge",
      description: "Approved teachings routed through the Temple Library metadata layer.",
      practices,
    },
    ...fallbackCollections,
  ];
}
