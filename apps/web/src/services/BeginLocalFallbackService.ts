import { STORAGE_KEYS } from "../constants/storage";
import {
  BEGIN_PENDING_RETENTION_MS,
  type BeginCompleteRequest,
} from "../contracts/beginWriteContract";
import { PersistenceService } from "./PersistenceService";

type SafePendingBegin = {
  savedAt: string;
  expiresAt: string;
  beginSessionId: string;
  pathway?: string;
  consentAccepted: boolean;
  hasContact: boolean;
};

function expiryFrom(now: number) {
  return new Date(now + BEGIN_PENDING_RETENTION_MS).toISOString();
}

export const BeginLocalFallbackService = {
  retainPendingBegin(request: BeginCompleteRequest, pathway?: string) {
    const now = Date.now();
    const pending: SafePendingBegin = {
      savedAt: new Date(now).toISOString(),
      expiresAt: expiryFrom(now),
      beginSessionId: request.beginSessionId,
      pathway,
      consentAccepted: request.consent.accepted,
      hasContact: Boolean(request.email || request.phone),
    };

    PersistenceService.write(STORAGE_KEYS.beginPendingWrite, pending);
  },

  clearSensitivePendingBegin() {
    PersistenceService.remove(STORAGE_KEYS.beginPendingWrite);
    PersistenceService.remove(STORAGE_KEYS.pathEmail);
    PersistenceService.remove(STORAGE_KEYS.pathWhatsapp);
    PersistenceService.remove(STORAGE_KEYS.pathLongings);
    PersistenceService.remove(STORAGE_KEYS.pathReflection);
  },

  cleanupExpiredPendingBegin() {
    const pending = PersistenceService.read<SafePendingBegin | null>(
      STORAGE_KEYS.beginPendingWrite,
      null,
    );

    if (!pending) {
      return;
    }

    if (Date.parse(pending.expiresAt) <= Date.now()) {
      this.clearSensitivePendingBegin();
    }
  },

  resetLocalJourney() {
    this.clearSensitivePendingBegin();
    PersistenceService.remove(STORAGE_KEYS.beginJourneyState);
    PersistenceService.remove(STORAGE_KEYS.pathFirstName);
    PersistenceService.remove(STORAGE_KEYS.pathPathway);
    PersistenceService.remove(STORAGE_KEYS.beginLocalStatus);
    PersistenceService.remove(STORAGE_KEYS.shalaSeekerState);
  },
};
