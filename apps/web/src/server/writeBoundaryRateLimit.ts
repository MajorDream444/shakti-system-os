type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const WINDOW_MS = 10 * 60 * 1000;
const MAX_ATTEMPTS = 12;
const attempts = new Map<string, RateLimitEntry>();

export function checkWriteRateLimit(key: string, now = Date.now()) {
  const current = attempts.get(key);

  if (!current || current.resetAt <= now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return { allowed: true };
  }

  current.count += 1;
  return {
    allowed: current.count <= MAX_ATTEMPTS,
    retryAfterMs: Math.max(0, current.resetAt - now),
  };
}

export function clearWriteRateLimitForTests() {
  attempts.clear();
}
