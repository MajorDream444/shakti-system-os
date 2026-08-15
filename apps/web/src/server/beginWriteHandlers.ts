import {
  BEGIN_CONSENT_VERSION,
  type BeginCompleteResponse,
  type RequestSignalResponse,
} from "../contracts/beginWriteContract.js";
import { PathwayAssignmentService } from "../services/PathwayAssignmentService.js";
import { hasUsableContact } from "../services/RequestSignalRules.js";
import type { BeginWriteRepository } from "./airtableWriteRepository.js";
import { checkWriteRateLimit } from "./writeBoundaryRateLimit.js";
import type { WriteBoundaryConfig } from "./writeBoundaryConfig.js";
import {
  parseBeginCompleteRequest,
  parseRequestSignalRequest,
} from "./writeBoundaryValidation.js";

type HandlerDeps = {
  config: WriteBoundaryConfig;
  repository: BeginWriteRepository;
  now?: () => Date;
  logger?: Pick<Console, "info" | "warn" | "error">;
};

function quietLogger(logger?: HandlerDeps["logger"]) {
  return logger ?? console;
}

export async function handleBeginComplete(
  input: unknown,
  deps: HandlerDeps,
): Promise<{ statusCode: number; body: BeginCompleteResponse }> {
  const parsed = parseBeginCompleteRequest(input);

  if (parsed.ok === false) {
    return {
      statusCode: 400,
      body: {
        status: "invalid",
        assignedPathway: "CIRCLE",
        accessState: "Open",
        message: parsed.reason,
      },
    };
  }

  const request = parsed.value;
  const assignment = PathwayAssignmentService.assign(request.responses);
  const logger = quietLogger(deps.logger);

  if (!request.consent.accepted) {
    logger.info("begin_complete_local_only", { reason: "missing_consent" });
    return {
      statusCode: 200,
      body: {
        status: "local_only",
        assignedPathway: assignment.assignedPathway,
        accessState: "Open",
        message: "Your path can continue privately until you choose to share it.",
      },
    };
  }

  if (!hasUsableContact(request.email, request.phone)) {
    logger.info("begin_complete_local_only", { reason: "missing_contact" });
    return {
      statusCode: 200,
      body: {
        status: "local_only",
        assignedPathway: assignment.assignedPathway,
        accessState: "Open",
        message: "Your path is held locally until you add a way for the team to respond.",
      },
    };
  }

  const rateKey = request.email || request.phone || request.beginSessionId;
  const rate = checkWriteRateLimit(rateKey);
  if (!rate.allowed) {
    return {
      statusCode: 429,
      body: {
        status: "error",
        assignedPathway: assignment.assignedPathway,
        accessState: "Open",
        message: "Please pause for a moment before trying again.",
      },
    };
  }

  if (!deps.config.enabled || !deps.config.token || !deps.config.baseId || !deps.config.requiredIdsReady) {
    logger.warn("begin_write_disabled", {
      enabled: deps.config.enabled,
      hasToken: Boolean(deps.config.token),
      hasBaseId: Boolean(deps.config.baseId),
      requiredIdsReady: deps.config.requiredIdsReady,
    });
    return {
      statusCode: 200,
      body: {
        status: "write_disabled",
        assignedPathway: assignment.assignedPathway,
        accessState: "Open",
        message: "Your path is safe to continue privately right now.",
      },
    };
  }

  try {
    const existingProgress = await deps.repository.findProgressByIdempotencyKey(request.idempotencyKey);
    if (existingProgress) {
      return {
        statusCode: 200,
        body: {
          status: "saved",
          assignedPathway: assignment.assignedPathway,
          accessState: "Open",
          message: "Your path has already been saved.",
          progressRecordId: existingProgress.id,
          consistencyWarning:
            request.clientAssignedPathway && request.clientAssignedPathway !== assignment.assignedPathway
              ? "Client pathway did not match server-derived pathway."
              : undefined,
        },
      };
    }

    const occurredAt = (deps.now?.() ?? new Date()).toISOString();
    const seeker = await deps.repository.upsertSeeker({
      firstName: request.firstName,
      email: request.email,
      phone: request.phone,
      assignedPathway: assignment.assignedPathway,
      consentVersion: BEGIN_CONSENT_VERSION,
      occurredAt,
    });
    const intakeRecords = await deps.repository.createIntakeResponses({
      begin: request,
      seekerRecordId: seeker.id,
      occurredAt,
    });
    const progress = await deps.repository.createPathwayProgress({
      seekerRecordId: seeker.id,
      assignedPathway: assignment.assignedPathway,
      beginSessionId: request.beginSessionId,
      idempotencyKey: request.idempotencyKey,
      occurredAt,
    });

    logger.info("begin_complete_saved", {
      seekerRecordId: seeker.id,
      intakeCount: intakeRecords.length,
      progressRecordId: progress.id,
      assignedPathway: assignment.assignedPathway,
      rulesVersion: assignment.rulesVersion,
    });

    return {
      statusCode: 200,
      body: {
        status: "saved",
        assignedPathway: assignment.assignedPathway,
        accessState: "Open",
        message: "Your path has been saved.",
        seekerRecordId: seeker.id,
        intakeRecordIds: intakeRecords.map((record) => record.id),
        progressRecordId: progress.id,
        consistencyWarning:
          request.clientAssignedPathway && request.clientAssignedPathway !== assignment.assignedPathway
            ? "Client pathway did not match server-derived pathway."
            : undefined,
      },
    };
  } catch (error) {
    logger.error("begin_complete_failed", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return {
      statusCode: 502,
      body: {
        status: "error",
        assignedPathway: assignment.assignedPathway,
        accessState: "Open",
        message: "Your path is safe to continue privately right now.",
      },
    };
  }
}

export async function handleRequestSignal(
  input: unknown,
  deps: HandlerDeps,
): Promise<{ statusCode: number; body: RequestSignalResponse }> {
  const parsed = parseRequestSignalRequest(input);
  const logger = quietLogger(deps.logger);

  if (parsed.ok === false) {
    return {
      statusCode: 400,
      body: {
        status: "invalid",
        message: parsed.reason,
      },
    };
  }

  const request = parsed.value;

  if (!request.consent.accepted || !hasUsableContact(request.email, request.phone)) {
    logger.info("request_signal_local_only", {
      reason: request.consent.accepted ? "missing_contact" : "missing_consent",
    });
    return {
      statusCode: 200,
      body: {
        status: "local_only",
        message: "Your request was not shared yet.",
      },
    };
  }

  const rate = checkWriteRateLimit(request.email || request.phone || request.beginSessionId);
  if (!rate.allowed) {
    return {
      statusCode: 429,
      body: {
        status: "error",
        message: "Please pause for a moment before trying again.",
      },
    };
  }

  if (!deps.config.enabled || !deps.config.token || !deps.config.baseId || !deps.config.requiredIdsReady) {
    logger.warn("request_signal_write_disabled", {
      enabled: deps.config.enabled,
      hasToken: Boolean(deps.config.token),
      hasBaseId: Boolean(deps.config.baseId),
      requiredIdsReady: deps.config.requiredIdsReady,
    });
    return {
      statusCode: 200,
      body: {
        status: "write_disabled",
        message: "Your request was not shared yet.",
      },
    };
  }

  try {
    const seeker = await deps.repository.upsertSeeker({
      firstName: request.firstName,
      email: request.email,
      phone: request.phone,
      consentVersion: BEGIN_CONSENT_VERSION,
      occurredAt: (deps.now?.() ?? new Date()).toISOString(),
    });
    const signal = await deps.repository.createRequestSignal({
      request,
      seekerRecordId: seeker.id,
      occurredAt: (deps.now?.() ?? new Date()).toISOString(),
    });

    logger.info("request_signal_saved", {
      signalRecordId: signal.id,
      signalType: request.signalType,
    });

    return {
      statusCode: 200,
      body: {
        status: "saved",
        message: "Your request has been shared for human review.",
        signalRecordId: signal.id,
      },
    };
  } catch (error) {
    logger.error("request_signal_failed", {
      message: error instanceof Error ? error.message : "Unknown error",
    });
    return {
      statusCode: 502,
      body: {
        status: "error",
        message: "Your request was not shared yet.",
      },
    };
  }
}
