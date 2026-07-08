import { mockInitiationKeys, mockLibraryAssets, mockPractices } from "../data/mockBackend";
import { BackendErrorLogger } from "../services/BackendErrorLogger";
import { BackendReadCache } from "../services/BackendReadCache";
import { BackendRepository } from "../services/BackendRepository";

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

async function main() {
  await checkRepositoryFallbacks();
  checkCacheTtlBehavior();

  console.log("Backend read checks passed.");
}

main();
