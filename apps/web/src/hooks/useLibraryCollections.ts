import { useEffect, useState } from "react";
import { VAULT_LIBRARY_CONTRACT_VERSION, type VaultLibraryViewState } from "../contracts/vaultLibraryContract";
import { fetchAuthorizedLibrary } from "../services/AuthorizedLibraryClient";

export function useLibraryCollections() {
  const [library, setLibrary] = useState<VaultLibraryViewState>({
    contractVersion: VAULT_LIBRARY_CONTRACT_VERSION,
    status: "loading",
    collections: [],
  });

  useEffect(() => {
    let isMounted = true;

    fetchAuthorizedLibrary().then((response) => {
      if (isMounted) setLibrary(response);
    });

    return () => {
      isMounted = false;
    };
  }, []);

  return library;
}
