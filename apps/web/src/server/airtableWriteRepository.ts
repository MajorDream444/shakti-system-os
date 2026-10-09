import {
  LIVE_AIRTABLE_FIELDS,
  LIVE_AIRTABLE_TABLE_IDS,
} from "../constants/liveAirtable.js";
import { PathwayAssignmentService } from "../services/PathwayAssignmentService.js";
import type {
  BeginCompleteRequest,
  RequestSignalRequest,
} from "../contracts/beginWriteContract.js";
import type { WriteBoundaryConfig } from "./writeBoundaryConfig.js";

export type SeekerUpsertInput = {
  firstName: string;
  email?: string;
  phone?: string;
  assignedPathway?: string;
  consentVersion: string;
  occurredAt: string;
};

export type CreatedIntakeResponse = {
  id: string;
  fields: Record<string, unknown>;
};

export type BeginWriteRepository = {
  findSeekerByContact(email?: string, phone?: string): Promise<{ id: string } | null>;
  findProgressByIdempotencyKey(idempotencyKey: string): Promise<{ id: string } | null>;
  findRequestSignalByIdempotencyKey(idempotencyKey: string): Promise<{ id: string } | null>;
  upsertSeeker(input: SeekerUpsertInput): Promise<{ id: string }>;
  createIntakeResponses(input: {
    begin: BeginCompleteRequest;
    seekerRecordId: string;
    occurredAt: string;
  }): Promise<CreatedIntakeResponse[]>;
  createPathwayProgress(input: {
    seekerRecordId: string;
    assignedPathway: string;
    beginSessionId: string;
    idempotencyKey: string;
    occurredAt: string;
  }): Promise<{ id: string }>;
  createRequestSignal(input: {
    request: RequestSignalRequest;
    seekerRecordId: string;
    occurredAt: string;
  }): Promise<{ id: string }>;
  /* Called ONLY after Resend accepts the welcome. Advances the seeker to step
     1 and stamps when, so the day-three automation can pick her up correctly. */
  markWaterfallDelivered(input: {
    seekerRecordId: string;
    messageId: string;
    occurredAt: string;
  }): Promise<void>;
  /* Called ONLY on a failed send. Deliberately does NOT write sequenceStep:
     an undelivered seeker must not look delivered, and must stay visible. */
  recordDeliveryFailure(input: {
    seekerRecordId: string;
    reason: string;
    occurredAt: string;
  }): Promise<void>;
  /* Seekers due the next note in the sequence. Mirrors the filter the retired
     Airtable automations used, so the rhythm is unchanged by the move. */
  findSeekersDueForStep(input: {
    currentStep: number;
    minDaysSinceLast: number;
  }): Promise<SeekerDueForSequence[]>;
  /* Called ONLY after Resend accepts. Same rule as the welcome: a seeker is
     never advanced past an email she did not receive. */
  advanceSequenceStep(input: {
    seekerRecordId: string;
    toStep: number;
    occurredAt: string;
  }): Promise<void>;
};

export type SeekerDueForSequence = {
  id: string;
  email: string;
  firstName?: string;
  /* Formula fields on the row that render her pathway into Sheetal's
     sentence. Empty when no pathway was assigned. */
  pathwayPhrase?: string;
  pathwaySuffix?: string;
};

type AirtableListResponse = {
  records: Array<{ id: string; fields: Record<string, unknown> }>;
};

type AirtableCreateResponse = {
  records: Array<{ id: string; fields: Record<string, unknown> }>;
};

const AIRTABLE_API_ROOT = "https://api.airtable.com/v0";

function escapeFormulaValue(value: string) {
  return value.replace(/\\/g, "\\\\").replace(/"/g, '\\"');
}

function buildRecordId(prefix: string, stablePart: string) {
  return `${prefix}-${stablePart}`.replace(/[^A-Z0-9:_-]/gi, "-").slice(0, 90);
}

export class AirtableWriteRepository implements BeginWriteRepository {
  private readonly config: WriteBoundaryConfig;
  private readonly fetchImpl: typeof fetch;

  constructor(config: WriteBoundaryConfig, fetchImpl: typeof fetch = fetch) {
    this.config = config;
    this.fetchImpl = fetchImpl;
  }

  private async request<TResponse>(
    tableId: string,
    options: RequestInit & { query?: Record<string, string> } = {},
  ): Promise<TResponse> {
    const url = new URL(`${AIRTABLE_API_ROOT}/${this.config.baseId}/${tableId}`);
    Object.entries(options.query ?? {}).forEach(([key, value]) => {
      url.searchParams.set(key, value);
    });

    const response = await this.fetchImpl(url, {
      ...options,
      headers: {
        Authorization: `Bearer ${this.config.token}`,
        "Content-Type": "application/json",
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Airtable write request failed: ${response.status}`);
    }

    return (await response.json()) as TResponse;
  }

  async findSeekerByContact(email?: string, phone?: string) {
    const clauses = [
      email ? `LOWER({Email}) = "${escapeFormulaValue(email.toLowerCase())}"` : "",
      phone ? `{Phone} = "${escapeFormulaValue(phone)}"` : "",
    ].filter(Boolean);

    if (!clauses.length) {
      return null;
    }

    const filterByFormula = clauses.length === 1 ? clauses[0] : `OR(${clauses.join(",")})`;
    const payload = await this.request<AirtableListResponse>(LIVE_AIRTABLE_TABLE_IDS.seekers, {
      method: "GET",
      query: {
        filterByFormula,
        maxRecords: "1",
      },
    });

    return payload.records[0] ? { id: payload.records[0].id } : null;
  }

  async findProgressByIdempotencyKey(idempotencyKey: string) {
    const payload = await this.request<AirtableListResponse>(LIVE_AIRTABLE_TABLE_IDS.progress, {
      method: "GET",
      query: {
        filterByFormula: `{Idempotency Key} = "${escapeFormulaValue(idempotencyKey)}"`,
        maxRecords: "1",
      },
    });

    return payload.records[0] ? { id: payload.records[0].id } : null;
  }

  async findRequestSignalByIdempotencyKey(idempotencyKey: string) {
    const signalId = buildRecordId("SIG", idempotencyKey);
    const payload = await this.request<AirtableListResponse>(LIVE_AIRTABLE_TABLE_IDS.requestsSignals, {
      method: "GET",
      query: {
        filterByFormula: `{Signal ID} = "${escapeFormulaValue(signalId)}"`,
        maxRecords: "1",
      },
    });

    return payload.records[0] ? { id: payload.records[0].id } : null;
  }

  async upsertSeeker(input: SeekerUpsertInput) {
    const existing = await this.findSeekerByContact(input.email, input.phone);
    const fields = {
      [LIVE_AIRTABLE_FIELDS.seekers.fullName]: input.firstName,
      ...(input.email ? { [LIVE_AIRTABLE_FIELDS.seekers.email]: input.email } : {}),
      ...(input.phone ? { [LIVE_AIRTABLE_FIELDS.seekers.phone]: input.phone } : {}),
      ...(input.assignedPathway
        ? { [LIVE_AIRTABLE_FIELDS.seekers.currentPathway]: input.assignedPathway }
        : {}),
      [LIVE_AIRTABLE_FIELDS.seekers.consentStatus]: "Begin Consent",
      [LIVE_AIRTABLE_FIELDS.seekers.consentVersion]: input.consentVersion,
      [LIVE_AIRTABLE_FIELDS.seekers.currentAccessSummary]: "Open",
      [LIVE_AIRTABLE_FIELDS.seekers.lastIntentionalActivityAt]: input.occurredAt,
      [LIVE_AIRTABLE_FIELDS.seekers.humanReviewNeeded]: false,
    };

    if (existing) {
      const response = await this.fetchImpl(
        `${AIRTABLE_API_ROOT}/${this.config.baseId}/${LIVE_AIRTABLE_TABLE_IDS.seekers}/${existing.id}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${this.config.token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ fields }),
        },
      );

      if (!response.ok) {
        throw new Error(`Airtable seeker update failed: ${response.status}`);
      }

      return existing;
    }

    const payload = await this.request<AirtableCreateResponse>(LIVE_AIRTABLE_TABLE_IDS.seekers, {
      method: "POST",
      body: JSON.stringify({
        records: [
          {
            fields: {
              [LIVE_AIRTABLE_FIELDS.seekers.seekerId]: buildRecordId("SEE", input.email || input.phone || input.occurredAt),
              ...fields,
            },
          },
        ],
      }),
    });

    return { id: payload.records[0].id };
  }

  async createIntakeResponses(input: {
    begin: BeginCompleteRequest;
    seekerRecordId: string;
    occurredAt: string;
  }) {
    const records = input.begin.responses.map((response, index) => {
      const scoreImpact = PathwayAssignmentService.scoreForResponse(response.responseValue);
      return {
        fields: {
          [LIVE_AIRTABLE_FIELDS.intakeResponses.intakeResponseId]: buildRecordId(
            `INT-${index + 1}`,
            `${input.begin.beginSessionId}-${response.questionKey}`,
          ),
          [LIVE_AIRTABLE_FIELDS.intakeResponses.beginSessionId]: input.begin.beginSessionId,
          [LIVE_AIRTABLE_FIELDS.intakeResponses.stationKey]: response.stationKey,
          [LIVE_AIRTABLE_FIELDS.intakeResponses.questionKey]: response.questionKey,
          [LIVE_AIRTABLE_FIELDS.intakeResponses.responseValue]: response.responseValue,
          [LIVE_AIRTABLE_FIELDS.intakeResponses.responseLabel]: response.responseLabel,
          [LIVE_AIRTABLE_FIELDS.intakeResponses.circleScoreImpact]: scoreImpact.CIRCLE,
          [LIVE_AIRTABLE_FIELDS.intakeResponses.oneOnOneScoreImpact]: scoreImpact.ONE_ON_ONE,
          [LIVE_AIRTABLE_FIELDS.intakeResponses.containerScoreImpact]: scoreImpact.CONTAINER,
          [LIVE_AIRTABLE_FIELDS.intakeResponses.retreatScoreImpact]: scoreImpact.RETREAT,
          [LIVE_AIRTABLE_FIELDS.intakeResponses.consentVersion]: input.begin.consent.version,
          [LIVE_AIRTABLE_FIELDS.intakeResponses.sourcePath]: input.begin.sourcePath,
          [LIVE_AIRTABLE_FIELDS.intakeResponses.createdAt]: input.occurredAt,
          [LIVE_AIRTABLE_FIELDS.intakeResponses.seeker]: [input.seekerRecordId],
        },
      };
    });

    const payload = await this.request<AirtableCreateResponse>(LIVE_AIRTABLE_TABLE_IDS.intakeResponses, {
      method: "POST",
      body: JSON.stringify({ records }),
    });

    return payload.records.map((record) => ({ id: record.id, fields: record.fields }));
  }

  async createPathwayProgress(input: {
    seekerRecordId: string;
    assignedPathway: string;
    beginSessionId: string;
    idempotencyKey: string;
    occurredAt: string;
  }) {
    const payload = await this.request<AirtableCreateResponse>(LIVE_AIRTABLE_TABLE_IDS.progress, {
      method: "POST",
      body: JSON.stringify({
        records: [
          {
            fields: {
              [LIVE_AIRTABLE_FIELDS.progress.progressId]: buildRecordId("PROG-PATHWAY", input.beginSessionId),
              [LIVE_AIRTABLE_FIELDS.progress.eventType]: "Pathway Assigned",
              [LIVE_AIRTABLE_FIELDS.progress.relatedPathway]: input.assignedPathway,
              [LIVE_AIRTABLE_FIELDS.progress.beginSessionId]: input.beginSessionId,
              [LIVE_AIRTABLE_FIELDS.progress.occurredAt]: input.occurredAt,
              [LIVE_AIRTABLE_FIELDS.progress.source]: "Begin",
              [LIVE_AIRTABLE_FIELDS.progress.notes]: "Server-derived pathway assignment. No Access Grant created.",
              [LIVE_AIRTABLE_FIELDS.progress.idempotencyKey]: input.idempotencyKey,
              [LIVE_AIRTABLE_FIELDS.progress.seeker]: [input.seekerRecordId],
            },
          },
        ],
      }),
    });

    return { id: payload.records[0].id };
  }

  async createRequestSignal(input: {
    request: RequestSignalRequest;
    seekerRecordId: string;
    occurredAt: string;
  }) {
    const payload = await this.request<AirtableCreateResponse>(LIVE_AIRTABLE_TABLE_IDS.requestsSignals, {
      method: "POST",
      body: JSON.stringify({
        records: [
          {
            fields: {
              [LIVE_AIRTABLE_FIELDS.requestsSignals.signalId]: buildRecordId("SIG", input.request.idempotencyKey),
              [LIVE_AIRTABLE_FIELDS.requestsSignals.signalType]: input.request.signalType,
              [LIVE_AIRTABLE_FIELDS.requestsSignals.sourcePath]: input.request.sourcePath,
              [LIVE_AIRTABLE_FIELDS.requestsSignals.sourceNode]: input.request.sourceNode,
              ...(input.request.message
                ? { [LIVE_AIRTABLE_FIELDS.requestsSignals.message]: input.request.message }
                : {}),
              [LIVE_AIRTABLE_FIELDS.requestsSignals.status]: "Needs Review",
              [LIVE_AIRTABLE_FIELDS.requestsSignals.humanReviewNeeded]: true,
              [LIVE_AIRTABLE_FIELDS.requestsSignals.createdAt]: input.occurredAt,
              [LIVE_AIRTABLE_FIELDS.requestsSignals.consentVersion]: input.request.consent.version,
              [LIVE_AIRTABLE_FIELDS.requestsSignals.seeker]: [input.seekerRecordId],
              ...(input.request.intakeRecordIds?.length
                ? {
                    [LIVE_AIRTABLE_FIELDS.requestsSignals.relatedIntakeResponses]:
                      input.request.intakeRecordIds,
                  }
                : {}),
            },
          },
        ],
      }),
    });

    return { id: payload.records[0].id };
  }

  async markWaterfallDelivered(input: {
    seekerRecordId: string;
    messageId: string;
    occurredAt: string;
  }) {
    await this.request(LIVE_AIRTABLE_TABLE_IDS.seekers, {
      method: "PATCH",
      body: JSON.stringify({
        records: [
          {
            id: input.seekerRecordId,
            fields: {
              [LIVE_AIRTABLE_FIELDS.seekers.sequenceStep]: 1,
              [LIVE_AIRTABLE_FIELDS.seekers.lastSequenceAt]: input.occurredAt,
            },
          },
        ],
      }),
    });
  }

  async recordDeliveryFailure(input: {
    seekerRecordId: string;
    reason: string;
    occurredAt: string;
  }) {
    /* No sequenceStep write. The row stays at "never sent", which is both the
       truth and what keeps the day-three filter from selecting her. The review
       flag is what surfaces her in Sheetal's view. */
    await this.request(LIVE_AIRTABLE_TABLE_IDS.seekers, {
      method: "PATCH",
      body: JSON.stringify({
        records: [
          {
            id: input.seekerRecordId,
            fields: {
              [LIVE_AIRTABLE_FIELDS.seekers.humanReviewNeeded]: true,
              [LIVE_AIRTABLE_FIELDS.seekers.notes]:
                `WATERFALL EMAIL DID NOT SEND at ${input.occurredAt}. Reason: ${input.reason}. ` +
                `Her record is intact and her sequence has NOT advanced, so no later email assumes ` +
                `she has the practice. Send her the Shakti Waterfall link directly.`,
            },
          },
        ],
      }),
    });
  }

  async findSeekersDueForStep(input: { currentStep: number; minDaysSinceLast: number }) {
    /* Same shape as the retired automation's filter: at the given step, not
       paused, has an email, and last contacted at least N days ago. */
    const formula =
      `AND(` +
      `{Sequence Step}=${input.currentStep},` +
      `NOT({Sequence Paused}),` +
      `{Email}!="",` +
      `IS_BEFORE({Last Sequence At}, DATEADD(NOW(), -${input.minDaysSinceLast}, 'days'))` +
      `)`;

    const payload = await this.request<{
      records?: Array<{ id: string; fields: Record<string, unknown> }>;
    }>(LIVE_AIRTABLE_TABLE_IDS.seekers, {
      query: { filterByFormula: formula, pageSize: "100" },
    });

    return (payload.records ?? []).map((record) => ({
      id: record.id,
      email: String(record.fields["Email"] ?? ""),
      firstName: record.fields["Full Name"] ? String(record.fields["Full Name"]) : undefined,
      pathwayPhrase: record.fields["Pathway Phrase"]
        ? String(record.fields["Pathway Phrase"])
        : undefined,
      pathwaySuffix: record.fields["Pathway Suffix"]
        ? String(record.fields["Pathway Suffix"])
        : undefined,
    })).filter((seeker) => seeker.email);
  }

  async advanceSequenceStep(input: { seekerRecordId: string; toStep: number; occurredAt: string }) {
    await this.request(LIVE_AIRTABLE_TABLE_IDS.seekers, {
      method: "PATCH",
      body: JSON.stringify({
        records: [
          {
            id: input.seekerRecordId,
            fields: {
              [LIVE_AIRTABLE_FIELDS.seekers.sequenceStep]: input.toStep,
              [LIVE_AIRTABLE_FIELDS.seekers.lastSequenceAt]: input.occurredAt,
            },
          },
        ],
      }),
    });
  }
}
