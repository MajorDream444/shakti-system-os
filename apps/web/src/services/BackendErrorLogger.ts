import type { BackendErrorLog } from "../types/backend";

const logs: BackendErrorLog[] = [];

export const BackendErrorLogger = {
  log(error: BackendErrorLog) {
    logs.push(error);

    if (import.meta.env?.DEV) {
      console.warn(`[backend:${error.code}] ${error.message}`, error.context);
    }
  },

  list() {
    return [...logs];
  },

  clear() {
    logs.length = 0;
  },
};
