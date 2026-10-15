export const VAULT_LIBRARY_CONTRACT_VERSION = "vault-library-v1" as const;

export type VaultLibraryStatus =
  | "ready"
  | "empty"
  | "review_required"
  | "unavailable";

export type VaultCollectionAccess = "free" | "membership_locked";

export type AuthorizedLibraryItem = {
  id: string;
  title: string;
  description: string;
  durationLabel: string;
  categoryLabel: string;
  goddess?: string;
  deliveryUrl: string;
};

export type AuthorizedLibraryCollection = {
  id: string;
  title: string;
  description: string;
  access: VaultCollectionAccess;
  items: AuthorizedLibraryItem[];
};

export type VaultLibraryResponse = {
  contractVersion: typeof VAULT_LIBRARY_CONTRACT_VERSION;
  status: VaultLibraryStatus;
  collections: AuthorizedLibraryCollection[];
};

export type VaultLibraryViewState = VaultLibraryResponse | {
  contractVersion: typeof VAULT_LIBRARY_CONTRACT_VERSION;
  status: "loading";
  collections: [];
};

function isString(value: unknown): value is string {
  return typeof value === "string";
}

function isAuthorizedItem(value: unknown): value is AuthorizedLibraryItem {
  if (!value || typeof value !== "object") return false;
  const item = value as Record<string, unknown>;
  return ["id", "title", "description", "durationLabel", "categoryLabel", "deliveryUrl"]
    .every((key) => isString(item[key]));
}

function isAuthorizedCollection(value: unknown): value is AuthorizedLibraryCollection {
  if (!value || typeof value !== "object") return false;
  const collection = value as Record<string, unknown>;
  if (!["free", "membership_locked"].includes(String(collection.access))) return false;
  if (!["id", "title", "description"].every((key) => isString(collection[key]))) return false;
  if (!Array.isArray(collection.items) || !collection.items.every(isAuthorizedItem)) return false;
  return collection.access === "free" || collection.items.length === 0;
}

export function parseVaultLibraryResponse(value: unknown): VaultLibraryResponse | null {
  if (!value || typeof value !== "object") return null;
  const response = value as Record<string, unknown>;
  if (response.contractVersion !== VAULT_LIBRARY_CONTRACT_VERSION) return null;
  if (!["ready", "empty", "review_required", "unavailable"].includes(String(response.status))) return null;
  if (!Array.isArray(response.collections) || !response.collections.every(isAuthorizedCollection)) return null;
  if (response.status !== "ready" && response.collections.length !== 0) return null;
  return response as VaultLibraryResponse;
}
