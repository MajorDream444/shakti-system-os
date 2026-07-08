import { BACKEND_READ_CACHE_TTL_MS } from "../constants/backend";
import type { CachedRead } from "../types/backend";

type CacheEntry<T> = {
  value: T;
  expiresAt: number;
};

const cache = new Map<string, CacheEntry<unknown>>();

export const BackendReadCache = {
  get<T>(key: string, now = Date.now()): CachedRead<T> | null {
    const entry = cache.get(key) as CacheEntry<T> | undefined;

    if (!entry || entry.expiresAt <= now) {
      cache.delete(key);
      return null;
    }

    return {
      value: entry.value,
      status: "hit",
    };
  },

  set<T>(
    key: string,
    value: T,
    ttlMs = BACKEND_READ_CACHE_TTL_MS,
    now = Date.now(),
  ): CachedRead<T> {
    cache.set(key, {
      value,
      expiresAt: now + ttlMs,
    });

    return {
      value,
      status: "miss",
    };
  },

  clear(key?: string) {
    if (key) {
      cache.delete(key);
      return;
    }

    cache.clear();
  },
};
