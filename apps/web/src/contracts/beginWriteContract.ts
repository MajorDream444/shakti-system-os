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
  /* True only when Resend accepted the welcome carrying the Shakti Waterfall.
     The confirmation screen keys its promise on this rather than on `saved`,
     because a record can save perfectly while the email does not go out — and
     telling a woman to check an inbox that will stay empty is the exact
     failure this field exists to prevent. Absent on older responses, which is
     why the client treats undefined as "do not promise". */
  waterfallDelivered?: boolean;
  /* WHY THIS IS SEPARATE FROM THE BOOLEAN ABOVE.

     "Not delivered" has two very different meanings and the screen must not
     conflate them. Caught in the 6 October preview test, where a missing API
     key produced a screen that told a woman "Sheetal has been told and will
     send it to you directly" — she had not been told, because nothing had
     failed; nothing had been attempted.

       sent      Resend accepted it. Promise the inbox.
       failed    Resend refused. Sheetal IS alerted. Say so.
       skipped   Nothing was attempted — no key configured. Sheetal is NOT
                 alerted, so the screen must not claim she is.
       private   No email given. Nothing owed, nothing promised. */
  waterfallDeliveryStatus?: "sent" | "failed" | "skipped" | "private";
};

export type RequestSignalRequest = {
  beginSessionId: string;
  firstName: string;
  email?: string;
  phone?: string;
  consent: BeginConsentState;
  signalType: "Guide Request" | "Question" | "Support Request";
  message?: string;
  sourcePath: "/begin" | "/dancing-with-durga" | "/shala/retreat";
  sourceNode: "handoff" | "request-details" | "retreat-room";
  intakeRecordIds?: string[];
  idempotencyKey: string;
};

export type RequestSignalResponse = {
  status: "saved" | "local_only" | "write_disabled" | "invalid" | "error";
  message: string;
  signalRecordId?: string;
};
