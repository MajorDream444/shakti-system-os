import type { PathType } from "../begin/types.js";

export const BEGIN_CONSENT_VERSION = "begin-consent-v1";
export const BEGIN_PENDING_RETENTION_MS = 24 * 60 * 60 * 1000;

export const BEGIN_RESPONSE_QUESTION_KEYS = [
  "current_state",
  "trusted_pace",
  "support_capacity",
] as const;

export type BeginResponseQuestionKey = (typeof BEGIN_RESPONSE_QUESTION_KEYS)[number];

export type BeginConsentState = {
  accepted: boolean;
  version: typeof BEGIN_CONSENT_VERSION;
  acceptedAt?: string;
};

export type BeginIntakeResponseInput = {
  stationKey: string;
  questionKey: BeginResponseQuestionKey;
  responseValue: string;
  responseLabel: string;
};

export type BeginCompleteRequest = {
  beginSessionId: string;
  firstName: string;
  email?: string;
  phone?: string;
  consent: BeginConsentState;
  responses: BeginIntakeResponseInput[];
  clientAssignedPathway?: PathType;
  sourcePath: "/begin";
  idempotencyKey: string;
};

export type BeginCompleteStatus =
  | "saved"
  | "local_only"
  | "write_disabled"
  | "invalid"
  | "error";

export type BeginCompleteResponse = {
  status: BeginCompleteStatus;
  assignedPathway: PathType;
  accessState: "Open";
  message: string;
  seekerRecordId?: string;
  intakeRecordIds?: string[];
  progressRecordId?: string;
  consistencyWarning?: string;
};

export type RequestSignalRequest = {
  beginSessionId: string;
  firstName: string;
  email?: string;
  phone?: string;
  consent: BeginConsentState;
  signalType: "Guide Request" | "Question" | "Support Request";
  message?: string;
  sourcePath: "/begin";
  sourceNode: "handoff";
  intakeRecordIds?: string[];
  idempotencyKey: string;
};

export type RequestSignalResponse = {
  status: "saved" | "local_only" | "write_disabled" | "invalid" | "error";
  message: string;
  signalRecordId?: string;
};
