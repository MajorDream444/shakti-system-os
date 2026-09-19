export const SHAKTI_ANALYTICS_EVENTS = [
  "start_path_viewed",
  "self_audit_started",
  "self_audit_completed",
  "request_details_clicked",
  "stripe_storefront_clicked",
  "community_interest_submitted",
  "retreat_interest_submitted",
] as const;

export type ShaktiAnalyticsEvent = (typeof SHAKTI_ANALYTICS_EVENTS)[number];

type AnalyticsCommand =
  | ["beforeSend", (event: { url?: string }) => { url?: string } | null]
  | ["event", { name: ShaktiAnalyticsEvent }];

declare global {
  interface Window {
    va?: (...command: AnalyticsCommand) => void;
    vaq?: AnalyticsCommand[];
  }
}

const emittedOnce = new Set<string>();
let privacyFilterInstalled = false;

export function redactAnalyticsUrl(event: { url?: string }) {
  if (!event.url) return event;

  try {
    const url = new URL(event.url, window.location.origin);
    url.search = "";
    url.hash = "";
    return { ...event, url: url.toString() };
  } catch {
    return null;
  }
}

export function ensureAnonymousAnalyticsQueue() {
  if (!window.va) {
    window.va = (...command: AnalyticsCommand) => {
      window.vaq = window.vaq ?? [];
      window.vaq.push(command);
    };
  }

  if (!privacyFilterInstalled) {
    window.va("beforeSend", redactAnalyticsUrl);
    privacyFilterInstalled = true;
  }
}

export function trackAnonymousEvent(event: ShaktiAnalyticsEvent) {
  ensureAnonymousAnalyticsQueue();
  window.va?.("event", { name: event });
}

export function trackAnonymousEventOnce(
  event: ShaktiAnalyticsEvent,
  onceKey: string = event,
) {
  const key = `${event}:${onceKey}`;
  if (emittedOnce.has(key)) return false;

  emittedOnce.add(key);
  trackAnonymousEvent(event);
  return true;
}

export function shouldLoadVercelAnalytics(hostname: string) {
  return (
    hostname.endsWith(".vercel.app") ||
    hostname === "srishaktishala.com" ||
    hostname === "www.srishaktishala.com"
  );
}

export function installAnonymousAnalytics(enabled: boolean) {
  ensureAnonymousAnalyticsQueue();

  if (!enabled) return;
  if (!shouldLoadVercelAnalytics(window.location.hostname)) return;
  if (document.querySelector('script[data-shakti-analytics="vercel"]')) return;

  const script = document.createElement("script");
  script.src = "/_vercel/insights/script.js";
  script.defer = true;
  script.dataset.shaktiAnalytics = "vercel";
  document.head.appendChild(script);
}

export function resetAnonymousAnalyticsForTests() {
  emittedOnce.clear();
  privacyFilterInstalled = false;
}
