import {
  BEGIN_CONSENT_VERSION,
  type BeginCompleteRequest,
  type RequestSignalRequest,
} from "../src/contracts/beginWriteContract";
import {
  LIVE_AIRTABLE_BASE_ID,
  LIVE_AIRTABLE_FIELDS,
  LIVE_AIRTABLE_TABLE_IDS,
} from "../src/constants/liveAirtable";
import { AirtableWriteRepository } from "../src/server/airtableWriteRepository";
import { handleBeginComplete, handleRequestSignal } from "../src/server/beginWriteHandlers";

const API_ROOT = "https://api.airtable.com/v0";
const token = process.env.AIRTABLE_PERSONAL_ACCESS_TOKEN ?? "";
const baseId = process.env.AIRTABLE_BASE_ID ?? LIVE_AIRTABLE_BASE_ID;
const qaEnabled = process.env.AIRTABLE_QA_VERIFY === "true";

function assert(condition: unknown, message: string): asserts condition {
  if (!condition) throw new Error(message);
}

async function airtable(path: string, init: RequestInit = {}) {
  const response = await fetch(`${API_ROOT}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...init.headers,
    },
  });
  if (!response.ok) throw new Error(`Airtable QA request failed with ${response.status}.`);
  return response;
}

function escapeFormula(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

async function findRecordIds(tableId: string, filterByFormula: string) {
  const query = new URLSearchParams({ filterByFormula, maxRecords: "10" });
  const response = await airtable(`/${baseId}/${tableId}?${query}`);
  const body = (await response.json()) as { records?: Array<{ id: string }> };
  return body.records?.map((record) => record.id) ?? [];
}

async function deleteRecords(tableId: string, ids: string[]) {
  for (const id of ids) {
    await airtable(`/${baseId}/${tableId}/${id}`, { method: "DELETE" });
  }
}

async function run() {
  if (!qaEnabled) {
    console.log("Airtable Preview QA skipped.");
    return;
  }

  assert(process.env.VERCEL_ENV === "preview", "Airtable QA may run only in Vercel Preview.");
  assert(token, "Canonical Airtable Preview credential is missing.");

  const basesResponse = await airtable("/meta/bases");
  const bases = (await basesResponse.json()) as { bases?: Array<{ id: string; name: string }> };
  const intendedBase = bases.bases?.find((base) => base.id === baseId);
  assert(intendedBase, "Configured Airtable base is not accessible.");
  assert(/shakti/i.test(intendedBase.name), "Configured base is not the intended Shakti base.");
  assert(!/client clarity/i.test(intendedBase.name), "Client Clarity base cannot receive seeker submissions.");

  const schemaResponse = await airtable(`/meta/bases/${baseId}/tables`);
  const schema = (await schemaResponse.json()) as {
    tables?: Array<{
      id: string;
      fields: Array<{ id: string; name: string; options?: { choices?: Array<{ name: string }> } }>;
    }>;
  };
  const tableById = new Map(schema.tables?.map((table) => [table.id, table]) ?? []);
  const requiredTables = [
    LIVE_AIRTABLE_TABLE_IDS.seekers,
    LIVE_AIRTABLE_TABLE_IDS.intakeResponses,
    LIVE_AIRTABLE_TABLE_IDS.progress,
    LIVE_AIRTABLE_TABLE_IDS.requestsSignals,
  ];
  requiredTables.forEach((tableId) => assert(tableById.has(tableId), "Required Airtable table is missing."));

  const requiredFields = new Map<string, string[]>([
    [LIVE_AIRTABLE_TABLE_IDS.seekers, [
      LIVE_AIRTABLE_FIELDS.seekers.seekerId,
      LIVE_AIRTABLE_FIELDS.seekers.fullName,
      LIVE_AIRTABLE_FIELDS.seekers.email,
      LIVE_AIRTABLE_FIELDS.seekers.currentPathway,
      LIVE_AIRTABLE_FIELDS.seekers.consentStatus,
      LIVE_AIRTABLE_FIELDS.seekers.consentVersion,
      LIVE_AIRTABLE_FIELDS.seekers.currentAccessSummary,
      LIVE_AIRTABLE_FIELDS.seekers.lastIntentionalActivityAt,
    ]],
    [LIVE_AIRTABLE_TABLE_IDS.intakeResponses, Object.values(LIVE_AIRTABLE_FIELDS.intakeResponses)],
    [LIVE_AIRTABLE_TABLE_IDS.progress, [
      LIVE_AIRTABLE_FIELDS.progress.progressId,
      LIVE_AIRTABLE_FIELDS.progress.eventType,
      LIVE_AIRTABLE_FIELDS.progress.relatedPathway,
      LIVE_AIRTABLE_FIELDS.progress.beginSessionId,
      LIVE_AIRTABLE_FIELDS.progress.occurredAt,
      LIVE_AIRTABLE_FIELDS.progress.source,
      LIVE_AIRTABLE_FIELDS.progress.notes,
      LIVE_AIRTABLE_FIELDS.progress.idempotencyKey,
      LIVE_AIRTABLE_FIELDS.progress.seeker,
    ]],
    [LIVE_AIRTABLE_TABLE_IDS.requestsSignals, [
      LIVE_AIRTABLE_FIELDS.requestsSignals.signalId,
      LIVE_AIRTABLE_FIELDS.requestsSignals.signalType,
      LIVE_AIRTABLE_FIELDS.requestsSignals.sourcePath,
      LIVE_AIRTABLE_FIELDS.requestsSignals.sourceNode,
      LIVE_AIRTABLE_FIELDS.requestsSignals.message,
      LIVE_AIRTABLE_FIELDS.requestsSignals.status,
      LIVE_AIRTABLE_FIELDS.requestsSignals.humanReviewNeeded,
      LIVE_AIRTABLE_FIELDS.requestsSignals.createdAt,
      LIVE_AIRTABLE_FIELDS.requestsSignals.consentVersion,
      LIVE_AIRTABLE_FIELDS.requestsSignals.seeker,
      LIVE_AIRTABLE_FIELDS.requestsSignals.relatedIntakeResponses,
    ]],
  ]);
  for (const [tableId, fieldIds] of requiredFields) {
    const actual = new Set(tableById.get(tableId)?.fields.map((field) => field.id));
    fieldIds.forEach((fieldId) => assert(actual.has(fieldId), "Required Airtable field is missing."));
  }

  const timestamp = Date.now();
  const beginSessionId = `QA-PREVIEW-${timestamp}`;
  const email = `qa-preview-${timestamp}@example.test`;
  const beginIdempotencyKey = `begin:${beginSessionId}:${BEGIN_CONSENT_VERSION}`;
  const cleanup = {
    seekers: [] as string[],
    intake: [] as string[],
    progress: [] as string[],
    signals: [] as string[],
  };

  const config = {
    enabled: true,
    baseId,
    token,
    requiredIdsReady: true,
  };
  const repository = new AirtableWriteRepository(config);
  const logger = { info: () => undefined, warn: () => undefined, error: () => undefined };
  const beginPayload: BeginCompleteRequest = {
    beginSessionId,
    firstName: "QA Preview",
    email,
    consent: {
      accepted: true,
      version: BEGIN_CONSENT_VERSION,
      acceptedAt: new Date().toISOString(),
    },
    responses: [
      { stationKey: "Listening", questionKey: "current_state", responseValue: "depth", responseLabel: "QA depth" },
      { stationKey: "Pace", questionKey: "trusted_pace", responseValue: "structured", responseLabel: "QA structured" },
      { stationKey: "Support", questionKey: "support_capacity", responseValue: "transformational", responseLabel: "QA container" },
    ],
    sourcePath: "/begin",
    idempotencyKey: beginIdempotencyKey,
  };

  try {
    const begin = await handleBeginComplete(beginPayload, { config, repository, logger });
    assert(begin.body.status === "saved", "Synthetic Begin submission did not persist.");
    assert(begin.body.seekerRecordId, "Synthetic Seeker record was not returned.");
    cleanup.seekers.push(begin.body.seekerRecordId);
    cleanup.intake.push(...(begin.body.intakeRecordIds ?? []));
    if (begin.body.progressRecordId) cleanup.progress.push(begin.body.progressRecordId);

    const replay = await handleBeginComplete(beginPayload, { config, repository, logger });
    assert(replay.body.status === "saved", "Synthetic Begin replay was not idempotent.");
    assert(!replay.body.intakeRecordIds, "Synthetic Begin replay created duplicate intake records.");

    const signalPayloads: RequestSignalRequest[] = [
      {
        beginSessionId,
        firstName: "QA Preview",
        email,
        consent: beginPayload.consent,
        signalType: "Support Request",
        message: "QA Dancing with Durga community interest.",
        sourcePath: "/dancing-with-durga",
        sourceNode: "request-details",
        intakeRecordIds: begin.body.intakeRecordIds,
        idempotencyKey: `signal:${beginSessionId}:dwd-community`,
      },
      {
        beginSessionId,
        firstName: "QA Preview",
        email,
        consent: beginPayload.consent,
        signalType: "Support Request",
        message: "QA retreat interest.",
        sourcePath: "/shala/retreat",
        sourceNode: "retreat-room",
        idempotencyKey: `signal:${beginSessionId}:retreat-interest`,
      },
    ];

    for (const payload of signalPayloads) {
      const signal = await handleRequestSignal(payload, { config, repository, logger });
      assert(signal.body.status === "saved", "Synthetic request signal did not persist.");
      if (signal.body.signalRecordId) cleanup.signals.push(signal.body.signalRecordId);
      const replayed = await handleRequestSignal(payload, { config, repository, logger });
      assert(replayed.body.status === "saved", "Synthetic request replay was not idempotent.");
      assert(replayed.body.signalRecordId === signal.body.signalRecordId, "Synthetic request replay changed record identity.");
    }

    console.log("Airtable authentication, schema, writes, and replay checks passed.");
  } finally {
    cleanup.signals.push(...await findRecordIds(
      LIVE_AIRTABLE_TABLE_IDS.requestsSignals,
      `{Signal ID} = "${escapeFormula(`SIG-signal:${beginSessionId}:dwd-community`)}"`,
    ));
    cleanup.signals.push(...await findRecordIds(
      LIVE_AIRTABLE_TABLE_IDS.requestsSignals,
      `{Signal ID} = "${escapeFormula(`SIG-signal:${beginSessionId}:retreat-interest`)}"`,
    ));
    cleanup.progress.push(...await findRecordIds(
      LIVE_AIRTABLE_TABLE_IDS.progress,
      `{Idempotency Key} = "${escapeFormula(beginIdempotencyKey)}"`,
    ));
    cleanup.intake.push(...await findRecordIds(
      LIVE_AIRTABLE_TABLE_IDS.intakeResponses,
      `{Begin Session ID} = "${escapeFormula(beginSessionId)}"`,
    ));
    cleanup.seekers.push(...await findRecordIds(
      LIVE_AIRTABLE_TABLE_IDS.seekers,
      `LOWER({Email}) = "${escapeFormula(email.toLowerCase())}"`,
    ));

    await deleteRecords(LIVE_AIRTABLE_TABLE_IDS.requestsSignals, [...new Set(cleanup.signals)]);
    await deleteRecords(LIVE_AIRTABLE_TABLE_IDS.progress, [...new Set(cleanup.progress)]);
    await deleteRecords(LIVE_AIRTABLE_TABLE_IDS.intakeResponses, [...new Set(cleanup.intake)]);
    await deleteRecords(LIVE_AIRTABLE_TABLE_IDS.seekers, [...new Set(cleanup.seekers)]);

    const remaining = await findRecordIds(
      LIVE_AIRTABLE_TABLE_IDS.seekers,
      `LOWER({Email}) = "${escapeFormula(email.toLowerCase())}"`,
    );
    assert(remaining.length === 0, "Synthetic QA cleanup did not complete.");
    console.log("Synthetic Airtable QA records removed.");
  }
}

run().catch((error) => {
  console.error(error instanceof Error ? error.message : "Airtable Preview QA failed.");
  process.exitCode = 1;
});
