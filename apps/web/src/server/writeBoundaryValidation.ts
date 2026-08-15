import {
  BEGIN_CONSENT_VERSION,
  BEGIN_RESPONSE_QUESTION_KEYS,
  type BeginConsentState,
  type BeginCompleteRequest,
  type BeginIntakeResponseInput,
  type RequestSignalRequest,
} from "../contracts/beginWriteContract.js";
import { normalizeEmail, normalizePhone } from "../services/RequestSignalRules.js";

const BEGIN_KEYS = new Set([
  "beginSessionId",
  "firstName",
  "email",
  "phone",
  "consent",
  "responses",
  "clientAssignedPathway",
  "sourcePath",
  "idempotencyKey",
]);

const RESPONSE_KEYS = new Set([
  "stationKey",
  "questionKey",
  "responseValue",
  "responseLabel",
]);

const REQUEST_SIGNAL_KEYS = new Set([
  "beginSessionId",
  "firstName",
  "email",
  "phone",
  "consent",
  "signalType",
  "message",
  "sourcePath",
  "sourceNode",
  "intakeRecordIds",
  "idempotencyKey",
]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value && typeof value === "object" && !Array.isArray(value));
}

function hasOnlyKeys(value: Record<string, unknown>, allowed: Set<string>) {
  return Object.keys(value).every((key) => allowed.has(key));
}

function cleanText(value: unknown, maxLength: number) {
  if (typeof value !== "string") {
    return "";
  }

  return value.trim().replace(/\s+/g, " ").slice(0, maxLength);
}

function normalizeConsent(value: unknown): BeginConsentState {
  if (!isRecord(value)) {
    return { accepted: false, version: BEGIN_CONSENT_VERSION };
  }

  return {
    accepted: value.accepted === true,
    version: BEGIN_CONSENT_VERSION,
    acceptedAt: cleanText(value.acceptedAt, 40) || undefined,
  };
}

function normalizeResponses(value: unknown): BeginIntakeResponseInput[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item): BeginIntakeResponseInput[] => {
    if (!isRecord(item) || !hasOnlyKeys(item, RESPONSE_KEYS)) {
      return [];
    }

    const questionKey = cleanText(item.questionKey, 80);
    if (!BEGIN_RESPONSE_QUESTION_KEYS.includes(questionKey as BeginIntakeResponseInput["questionKey"])) {
      return [];
    }

    return [
      {
        stationKey: cleanText(item.stationKey, 80),
        questionKey: questionKey as BeginIntakeResponseInput["questionKey"],
        responseValue: cleanText(item.responseValue, 80),
        responseLabel: cleanText(item.responseLabel, 240),
      },
    ];
  });
}

export function parseBeginCompleteRequest(input: unknown): {
  ok: true;
  value: BeginCompleteRequest;
} | {
  ok: false;
  reason: string;
} {
  if (!isRecord(input) || !hasOnlyKeys(input, BEGIN_KEYS)) {
    return { ok: false, reason: "Unexpected or invalid request shape." };
  }

  const beginSessionId = cleanText(input.beginSessionId, 120);
  const firstName = cleanText(input.firstName, 100);
  const email = normalizeEmail(cleanText(input.email, 320));
  const phone = normalizePhone(cleanText(input.phone, 80));
  const responses = normalizeResponses(input.responses);
  const idempotencyKey = cleanText(input.idempotencyKey, 180);

  if (!beginSessionId || !firstName || !idempotencyKey || input.sourcePath !== "/begin") {
    return { ok: false, reason: "Missing required Begin fields." };
  }

  if (responses.length !== BEGIN_RESPONSE_QUESTION_KEYS.length) {
    return { ok: false, reason: "Begin responses are incomplete." };
  }

  return {
    ok: true,
    value: {
      beginSessionId,
      firstName,
      email,
      phone,
      consent: normalizeConsent(input.consent),
      responses,
      clientAssignedPathway: cleanText(input.clientAssignedPathway, 40) as BeginCompleteRequest["clientAssignedPathway"],
      sourcePath: "/begin",
      idempotencyKey,
    },
  };
}

export function parseRequestSignalRequest(input: unknown): {
  ok: true;
  value: RequestSignalRequest;
} | {
  ok: false;
  reason: string;
} {
  if (!isRecord(input) || !hasOnlyKeys(input, REQUEST_SIGNAL_KEYS)) {
    return { ok: false, reason: "Unexpected or invalid request shape." };
  }

  const beginSessionId = cleanText(input.beginSessionId, 120);
  const firstName = cleanText(input.firstName, 100);
  const email = normalizeEmail(cleanText(input.email, 320));
  const phone = normalizePhone(cleanText(input.phone, 80));
  const idempotencyKey = cleanText(input.idempotencyKey, 180);
  const signalType = cleanText(input.signalType, 80);

  if (
    !beginSessionId ||
    !firstName ||
    !idempotencyKey ||
    input.sourcePath !== "/begin" ||
    input.sourceNode !== "handoff"
  ) {
    return { ok: false, reason: "Missing required request fields." };
  }

  if (!["Guide Request", "Question", "Support Request"].includes(signalType)) {
    return { ok: false, reason: "Unsupported signal type." };
  }

  return {
    ok: true,
    value: {
      beginSessionId,
      firstName,
      email,
      phone,
      consent: normalizeConsent(input.consent),
      signalType: signalType as RequestSignalRequest["signalType"],
      message: cleanText(input.message, 2000) || undefined,
      sourcePath: "/begin",
      sourceNode: "handoff",
      intakeRecordIds: Array.isArray(input.intakeRecordIds)
        ? input.intakeRecordIds.filter((id): id is string => typeof id === "string").slice(0, 20)
        : undefined,
      idempotencyKey,
    },
  };
}
