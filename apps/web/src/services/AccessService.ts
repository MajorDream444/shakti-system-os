import { STORAGE_KEYS } from "../constants/storage";
import { PersistenceService } from "./PersistenceService";
import type { AccessState, InitiationKey } from "../types/access";

const DEFAULT_ACCESS_STATE: AccessState = {
  hasAccess: true,
};

export const AccessService = {
  getAccessState(): AccessState {
    return PersistenceService.read(STORAGE_KEYS.accessState, DEFAULT_ACCESS_STATE);
  },

  storeInitiationKey(initiationKey: InitiationKey): AccessState {
    const accessState: AccessState = {
      hasAccess: true,
      initiationKey,
    };

    PersistenceService.write(STORAGE_KEYS.accessState, accessState);
    return accessState;
  },

  clearInitiationKey() {
    PersistenceService.remove(STORAGE_KEYS.accessState);
  },
};
