import { AirtableWriteRepository } from "./airtableWriteRepository.js";
import { handleBeginComplete, handleRequestSignal } from "./beginWriteHandlers.js";
import { getWriteBoundaryConfig, type ServerEnv } from "./writeBoundaryConfig.js";

export async function handleBeginCompleteHttp(payload: unknown, env: ServerEnv) {
  const config = getWriteBoundaryConfig(env);
  return handleBeginComplete(payload, {
    config,
    repository: new AirtableWriteRepository(config),
  });
}

export async function handleRequestSignalHttp(payload: unknown, env: ServerEnv) {
  const config = getWriteBoundaryConfig(env);
  return handleRequestSignal(payload, {
    config,
    repository: new AirtableWriteRepository(config),
  });
}
