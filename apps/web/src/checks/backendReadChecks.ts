import { mockInitiationKeys, mockLibraryAssets, mockPractices } from "../data/mockBackend";
import { BackendErrorLogger } from "../services/BackendErrorLogger";
import { BackendReadCache } from "../services/BackendReadCache";
import { BackendRepository } from "../services/BackendRepository";
import { ContentApprovalService } from "../services/ContentApprovalService";
import { buildLibraryCollections } from "../shala/libraryCollections";
import type { LibraryAssetRecord, PracticeRecord } from "../types/backend";

function assert(condition: boolean, message: string): asserts condition {
  if (!condition) {
    throw new Error(message);
  }
}

async function checkRepositoryFallbacks() {
  BackendRepository.clearCache();
  BackendErrorLogger.clear();

  const practices = await BackendRepository.listPractices();
  assert(practices.status === "miss", "Expected first practices read to miss cache.");
  assert(
    practices.value[0]?.practiceId === mockPractices[0]?.practiceId,
    "Expected practices read to use mock fallback when backend env is unavailable.",
  );

  const cachedPractices = await BackendRepository.listPractices();
  assert(cachedPractices.status === "hit", "Expected second practices read to hit cache.");

  const initiationKeys = await BackendRepository.listInitiationKeys();
  assert(initiationKeys.status === "miss", "Expected first initiation keys read to miss cache.");
  assert(
    initiationKeys.value[0]?.keyId === mockInitiationKeys[0]?.keyId,
    "Expected initiation keys read to use mock fallback when backend env is unavailable.",
  );

  const libraryAssets = await BackendRepository.listLibraryAssets();
  assert(libraryAssets.status === "miss", "Expected first library assets read to miss cache.");
  assert(
    libraryAssets.value[0]?.assetId === mockLibraryAssets[0]?.assetId,
    "Expected library assets read to use mock fallback when backend env is unavailable.",
  );
}

function checkCacheTtlBehavior() {
  const key = "backend-read-check";
  const now = 1_000;

  BackendReadCache.clear(key);
  assert(BackendReadCache.get<string[]>(key, now) === null, "Expected empty cache to miss.");

  const write = BackendReadCache.set(key, ["cached"], 50, now);
  assert(write.status === "miss", "Expected cache writes to report miss.");

  const hit = BackendReadCache.get<string[]>(key, now + 10);
  assert(hit?.status === "hit", "Expected unexpired cache entry to hit.");
  assert(hit.value[0] === "cached", "Expected cache hit to return stored value.");

  const expired = BackendReadCache.get<string[]>(key, now + 60);
  assert(expired === null, "Expected expired cache entry to miss.");

  BackendReadCache.clear(key);
}

function checkContentApprovalGate() {
  const reviewAsset: LibraryAssetRecord = {
    ...mockLibraryAssets[0],
    id: "review-library-asset",
    publishingStatus: "Needs Review",
  };
  const reviewPractice: PracticeRecord = {
    ...mockPractices[0],
    id: "review-practice",
    status: "Needs Review",
  };

  assert(
    ContentApprovalService.filterLibraryAssets([
      mockLibraryAssets[0],
      reviewAsset,
    ]).length === 1,
    "Expected review-stage Library Assets to remain outside app consumption.",
  );
  assert(
    ContentApprovalService.filterPractices([
      mockPractices[0],
      reviewPractice,
    ]).length === 1,
    "Expected review-stage Practices to remain outside app consumption.",
  );
}

function checkLibraryCollectionMapping() {
  const reviewAsset: LibraryAssetRecord = {
    ...mockLibraryAssets[0],
    id: "review-library-asset",
    assetId: "ASSET-VOW-BENEATH-PATH-001",
    title: "The Vow Beneath the Path",
    description: "Review-stage first living doctrine candidate.",
    driveUrl: "",
    publishingStatus: "Needs Review",
  };
  const approvedDriveAsset: LibraryAssetRecord = {
    ...reviewAsset,
    id: "approved-library-asset",
    driveUrl: "https://drive.google.com/file/d/example/view",
    publishingStatus: "Approved",
  };

  assert(
    buildLibraryCollections([reviewAsset], []).every(
      (collection) => collection.id !== "living-knowledge",
    ),
    "Expected review-stage or missing-Drive Library Assets to remain hidden.",
  );
  assert(
    buildLibraryCollections([approvedDriveAsset], [])[0]?.practices[0]?.title ===
      "The Vow Beneath the Path",
    "Expected approved Drive-backed Library Assets to map into the Temple Library.",
  );
}

async function main() {
  await checkRepositoryFallbacks();
  checkCacheTtlBehavior();
  checkContentApprovalGate();
  checkLibraryCollectionMapping();

  console.log("Backend read checks passed.");
}

main();
