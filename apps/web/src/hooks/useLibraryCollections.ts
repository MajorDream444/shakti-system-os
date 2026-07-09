import { useEffect, useState } from "react";
import { BackendRepository } from "../services/BackendRepository";
import { buildLibraryCollections } from "../shala/libraryCollections";
import { COLLECTIONS } from "../shala/data";
import type { Collection } from "../shala/types";

export function useLibraryCollections() {
  const [collections, setCollections] = useState<Collection[]>(COLLECTIONS);

  useEffect(() => {
    let isMounted = true;

    BackendRepository.listLibraryAssets()
      .then((read) => {
        if (isMounted) {
          setCollections(buildLibraryCollections(read.value, COLLECTIONS));
        }
      })
      .catch(() => {
        if (isMounted) {
          setCollections(COLLECTIONS);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return collections;
}
