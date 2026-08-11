import { BACKEND_CACHE_KEYS } from "../constants/backend";
import { BackendReadCache } from "./BackendReadCache";
import { InitiationKeyReadAdapter } from "./InitiationKeyReadAdapter";
import { LibraryAssetReadAdapter } from "./LibraryAssetReadAdapter";
import { PracticeReadAdapter } from "./PracticeReadAdapter";
import type {
  CachedRead,
  InitiationKeyRecord,
  LibraryAssetRecord,
  PracticeRecord,
} from "../types/backend";

async function readThroughCache<T>(
  cacheKey: string,
  fetcher: () => Promise<T>,
): Promise<CachedRead<T>> {
  const cached = BackendReadCache.get<T>(cacheKey);

  if (cached) {
    return cached;
  }

  const value = await fetcher();
  return BackendReadCache.set(cacheKey, value);
}

export const BackendRepository = {
  listPractices(): Promise<CachedRead<PracticeRecord[]>> {
    return readThroughCache(BACKEND_CACHE_KEYS.practices, () =>
      PracticeReadAdapter.listPractices(),
    );
  },

  listInitiationKeys(): Promise<CachedRead<InitiationKeyRecord[]>> {
    return readThroughCache(BACKEND_CACHE_KEYS.initiationKeys, () =>
      InitiationKeyReadAdapter.listInitiationKeys(),
    );
  },

  listLibraryAssets(): Promise<CachedRead<LibraryAssetRecord[]>> {
    return readThroughCache(BACKEND_CACHE_KEYS.libraryAssets, () =>
      LibraryAssetReadAdapter.listLibraryAssets(),
    );
  },

  clearCache() {
    BackendReadCache.clear();
  },
};
