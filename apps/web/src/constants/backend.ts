export const BACKEND_READ_CACHE_TTL_MS = 5 * 60 * 1000;

export const BACKEND_CACHE_KEYS = {
  practices: "backend:practices",
  initiationKeys: "backend:initiation-keys",
  libraryAssets: "backend:library-assets",
} as const;
