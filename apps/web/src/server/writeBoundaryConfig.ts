import {
  LIVE_AIRTABLE_BASE_ID,
  LIVE_AIRTABLE_FIELDS,
  LIVE_AIRTABLE_TABLE_IDS,
} from "../constants/liveAirtable.js";

export type ServerEnv = Record<string, string | undefined>;

export type WriteBoundaryConfig = {
  enabled: boolean;
  baseId: string;
  token: string;
  requiredIdsReady: boolean;
};

const REQUIRED_IDS = [
  LIVE_AIRTABLE_TABLE_IDS.seekers,
  LIVE_AIRTABLE_TABLE_IDS.intakeResponses,
  LIVE_AIRTABLE_TABLE_IDS.requestsSignals,
  LIVE_AIRTABLE_TABLE_IDS.progress,
  LIVE_AIRTABLE_TABLE_IDS.accessGrants,
  LIVE_AIRTABLE_FIELDS.seekers.seekerId,
  LIVE_AIRTABLE_FIELDS.seekers.fullName,
  LIVE_AIRTABLE_FIELDS.seekers.email,
  LIVE_AIRTABLE_FIELDS.seekers.phone,
  LIVE_AIRTABLE_FIELDS.seekers.currentPathway,
  LIVE_AIRTABLE_FIELDS.seekers.consentStatus,
  LIVE_AIRTABLE_FIELDS.seekers.consentVersion,
  LIVE_AIRTABLE_FIELDS.seekers.currentAccessSummary,
  LIVE_AIRTABLE_FIELDS.seekers.lastIntentionalActivityAt,
  LIVE_AIRTABLE_FIELDS.intakeResponses.intakeResponseId,
  LIVE_AIRTABLE_FIELDS.intakeResponses.seeker,
  LIVE_AIRTABLE_FIELDS.requestsSignals.signalId,
  LIVE_AIRTABLE_FIELDS.requestsSignals.seeker,
  LIVE_AIRTABLE_FIELDS.progress.progressId,
  LIVE_AIRTABLE_FIELDS.progress.idempotencyKey,
  LIVE_AIRTABLE_FIELDS.progress.seeker,
] as const;

export function getWriteBoundaryConfig(env: ServerEnv): WriteBoundaryConfig {
  const baseId = env.AIRTABLE_BASE_ID || LIVE_AIRTABLE_BASE_ID;
  const token = env.AIRTABLE_PERSONAL_ACCESS_TOKEN || env.AIRTABLE_TOKEN || "";

  return {
    enabled: env.BEGIN_WRITES_ENABLED === "true",
    baseId,
    token,
    requiredIdsReady: REQUIRED_IDS.every(Boolean),
  };
}
