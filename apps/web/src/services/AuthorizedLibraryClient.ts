import {
  VAULT_LIBRARY_CONTRACT_VERSION,
  parseVaultLibraryResponse,
  type VaultLibraryResponse,
} from "../contracts/vaultLibraryContract";

const UNAVAILABLE_RESPONSE: VaultLibraryResponse = {
  contractVersion: VAULT_LIBRARY_CONTRACT_VERSION,
  status: "unavailable",
  collections: [],
};

export async function fetchAuthorizedLibrary(
  fetcher: typeof fetch = fetch,
): Promise<VaultLibraryResponse> {
  try {
    const response = await fetcher("/api/vault/library", {
      method: "GET",
      credentials: "same-origin",
      headers: { Accept: "application/json" },
    });
    if (!response.ok) return UNAVAILABLE_RESPONSE;
    return parseVaultLibraryResponse(await response.json()) ?? UNAVAILABLE_RESPONSE;
  } catch {
    return UNAVAILABLE_RESPONSE;
  }
}
