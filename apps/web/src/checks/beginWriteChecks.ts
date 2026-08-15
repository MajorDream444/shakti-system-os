import type {
  BeginCompleteRequest,
  RequestSignalRequest,
} from "../contracts/beginWriteContract";
import { BEGIN_CONSENT_VERSION } from "../contracts/beginWriteContract";
import { BeginLocalFallbackService } from "../services/BeginLocalFallbackService";
import { STORAGE_KEYS } from "../constants/storage";
import type {
  BeginWriteRepository,
  CreatedIntakeResponse,
  SeekerUpsertInput,
} from "../server/airtableWriteRepository";
import { handleBeginComplete, handleRequestSignal } from "../server/beginWriteHandlers";
import { clearWriteRateLimitForTests } from "../server/writeBoundaryRateLimit";
import type { WriteBoundaryConfig } from "../server/writeBoundaryConfig";

const assert = {
  equal(actual: unknown, expected: unknown, message?: string) {
    if (actual !== expected) {
      throw new Error(message ?? `Expected ${String(expected)}, received ${String(actual)}`);
    }
  },
};

const enabledConfig: WriteBoundaryConfig = {
  enabled: true,
  baseId: "appj3hDhI0HoulNrf",
  token: "test-token",
  requiredIdsReady: true,
};

const disabledConfig: WriteBoundaryConfig = {
  ...enabledConfig,
  enabled: false,
};

const testLogger = {
  info: () => undefined,
  warn: () => undefined,
  error: () => undefined,
};

function beginPayload(overrides: Partial<BeginCompleteRequest> = {}): BeginCompleteRequest {
  return {
    beginSessionId: "BEGIN-CHECK-001",
    firstName: "Test",
    email: "test@example.com",
    phone: "",
    consent: {
      accepted: true,
      version: BEGIN_CONSENT_VERSION,
      acceptedAt: "2026-08-15T00:00:00.000Z",
    },
    responses: [
      {
        stationKey: "Listening",
        questionKey: "current_state",
        responseValue: "depth",
        responseLabel: "I feel ready to meet deeper shadow and embodied transformation.",
      },
      {
        stationKey: "Pace",
        questionKey: "trusted_pace",
        responseValue: "structured",
        responseLabel: "Structured and committed",
      },
      {
        stationKey: "Support",
        questionKey: "support_capacity",
        responseValue: "transformational",
        responseLabel: "A deeper container with structure",
      },
    ],
    clientAssignedPathway: "CIRCLE",
    sourcePath: "/begin",
    idempotencyKey: "begin:BEGIN-CHECK-001:begin-consent-v1",
    ...overrides,
  };
}

function signalPayload(overrides: Partial<RequestSignalRequest> = {}): RequestSignalRequest {
  return {
    beginSessionId: "BEGIN-CHECK-001",
    firstName: "Test",
    email: "test@example.com",
    phone: "",
    consent: {
      accepted: true,
      version: BEGIN_CONSENT_VERSION,
      acceptedAt: "2026-08-15T00:00:00.000Z",
    },
    signalType: "Guide Request",
    message: "I would like guidance.",
    sourcePath: "/begin",
    sourceNode: "handoff",
    intakeRecordIds: ["rec-intake-1"],
    idempotencyKey: "signal:BEGIN-CHECK-001:guide-request",
    ...overrides,
  };
}

class MockRepository implements BeginWriteRepository {
  seekerRecordId = "rec-seeker-1";
  progressByIdempotency = new Map<string, string>();
  writes = {
    seekerUpserts: [] as SeekerUpsertInput[],
    intakeCreates: 0,
    progressCreates: 0,
    signalCreates: 0,
  };

  async findSeekerByContact() {
    return { id: this.seekerRecordId };
  }

  async findProgressByIdempotencyKey(idempotencyKey: string) {
    const id = this.progressByIdempotency.get(idempotencyKey);
    return id ? { id } : null;
  }

  async upsertSeeker(input: SeekerUpsertInput) {
    this.writes.seekerUpserts.push(input);
    return { id: this.seekerRecordId };
  }

  async createIntakeResponses(): Promise<CreatedIntakeResponse[]> {
    this.writes.intakeCreates += 1;
    return [
      { id: "rec-intake-1", fields: {} },
      { id: "rec-intake-2", fields: {} },
      { id: "rec-intake-3", fields: {} },
    ];
  }

  async createPathwayProgress(input: Parameters<BeginWriteRepository["createPathwayProgress"]>[0]) {
    this.writes.progressCreates += 1;
    this.progressByIdempotency.set(input.idempotencyKey, "rec-progress-1");
    return { id: "rec-progress-1" };
  }

  async createRequestSignal() {
    this.writes.signalCreates += 1;
    return { id: "rec-signal-1" };
  }
}

class FailingRepository extends MockRepository {
  async upsertSeeker(): Promise<{ id: string }> {
    throw new Error("Simulated Airtable failure");
  }
}

function installStorageMock() {
  const store = new Map<string, string>();
  const localStorage = {
    getItem: (key: string) => store.get(key) ?? null,
    setItem: (key: string, value: string) => {
      store.set(key, value);
    },
    removeItem: (key: string) => {
      store.delete(key);
    },
    clear: () => store.clear(),
    key: (index: number) => Array.from(store.keys())[index] ?? null,
    get length() {
      return store.size;
    },
  };

  (globalThis as unknown as { window: { localStorage: Storage } }).window = {
    localStorage: localStorage as Storage,
  };

  return store;
}

async function runChecks() {
  clearWriteRateLimitForTests();

  const repo = new MockRepository();
  const result = await handleBeginComplete(beginPayload(), {
    config: enabledConfig,
    repository: repo,
    logger: testLogger,
  });
  assert.equal(result.body.status, "saved");
  assert.equal(result.body.assignedPathway, "CONTAINER");
  assert.equal(repo.writes.seekerUpserts[0].assignedPathway, "CONTAINER");
  assert.equal(result.body.consistencyWarning, "Client pathway did not match server-derived pathway.");

  const duplicate = await handleBeginComplete(beginPayload(), {
    config: enabledConfig,
    repository: repo,
    logger: testLogger,
  });
  assert.equal(duplicate.body.status, "saved");
  assert.equal(repo.writes.intakeCreates, 1);
  assert.equal(repo.writes.progressCreates, 1);

  const noConsentRepo = new MockRepository();
  const noConsent = await handleBeginComplete(
    beginPayload({ consent: { accepted: false, version: BEGIN_CONSENT_VERSION } }),
    { config: enabledConfig, repository: noConsentRepo, logger: testLogger },
  );
  assert.equal(noConsent.body.status, "local_only");
  assert.equal(noConsentRepo.writes.seekerUpserts.length, 0);

  const noContactRepo = new MockRepository();
  const noContact = await handleBeginComplete(
    beginPayload({ email: "", phone: "" }),
    { config: enabledConfig, repository: noContactRepo, logger: testLogger },
  );
  assert.equal(noContact.body.status, "local_only");
  assert.equal(noContactRepo.writes.seekerUpserts.length, 0);

  const disabledRepo = new MockRepository();
  const disabled = await handleBeginComplete(beginPayload(), {
    config: disabledConfig,
    repository: disabledRepo,
    logger: testLogger,
  });
  assert.equal(disabled.body.status, "write_disabled");
  assert.equal(disabledRepo.writes.seekerUpserts.length, 0);

  const failure = await handleBeginComplete(beginPayload({ beginSessionId: "BEGIN-CHECK-FAIL" }), {
    config: enabledConfig,
    repository: new FailingRepository(),
    logger: testLogger,
  });
  assert.equal(failure.body.status, "error");
  assert.equal(failure.body.accessState, "Open");

  const signalNoContactRepo = new MockRepository();
  const signalNoContact = await handleRequestSignal(
    signalPayload({ email: "", phone: "" }),
    { config: enabledConfig, repository: signalNoContactRepo, logger: testLogger },
  );
  assert.equal(signalNoContact.body.status, "local_only");
  assert.equal(signalNoContactRepo.writes.signalCreates, 0);

  const signalRepo = new MockRepository();
  const signal = await handleRequestSignal(signalPayload(), {
    config: enabledConfig,
    repository: signalRepo,
    logger: testLogger,
  });
  assert.equal(signal.body.status, "saved");
  assert.equal(signalRepo.writes.signalCreates, 1);
  assert.equal(signalRepo.writes.seekerUpserts[0].assignedPathway, undefined);

  const localStore = installStorageMock();
  BeginLocalFallbackService.retainPendingBegin(beginPayload(), "CONTAINER");
  const pending = JSON.parse(localStore.get(STORAGE_KEYS.beginPendingWrite) ?? "{}") as Record<string, unknown>;
  assert.equal(pending.pathway, "CONTAINER");
  assert.equal(Object.hasOwn(pending, "email"), false);
  assert.equal(Object.hasOwn(pending, "phone"), false);
  assert.equal(Object.hasOwn(pending, "responses"), false);
  BeginLocalFallbackService.clearSensitivePendingBegin();
  assert.equal(localStore.has(STORAGE_KEYS.beginPendingWrite), false);

  console.log("Begin secure-write checks passed.");
}

runChecks();
