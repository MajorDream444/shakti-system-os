import { AirtableWriteRepository } from "./airtableWriteRepository.js";
import { handleBeginComplete, handleRequestSignal } from "./beginWriteHandlers.js";
import { getWriteBoundaryConfig, type ServerEnv } from "./writeBoundaryConfig.js";

export async function handleBeginCompleteHttp(payload: unknown, env: ServerEnv) {
  const config = getWriteBoundaryConfig(env);
  return handleBeginComplete(payload, {
    config,
    repository: new AirtableWriteRepository(config),
    /* The environment has to reach the handler or RESEND_API_KEY is never
       found and every welcome is silently skipped. This single line is the
       whole difference between the practice sending and not. */
    env,
  });
}

export async function handleRequestSignalHttp(payload: unknown, env: ServerEnv) {
  const config = getWriteBoundaryConfig(env);
  return handleRequestSignal(payload, {
    config,
    repository: new AirtableWriteRepository(config),
  });
}
