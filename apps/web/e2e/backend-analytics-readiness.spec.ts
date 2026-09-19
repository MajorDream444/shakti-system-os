import { expect, test, type Page } from "@playwright/test";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { SHAKTI_ANALYTICS_EVENTS } from "../src/services/AnonymousAnalytics";

const baseUrl = (process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4173").replace(/\/$/, "");

async function eventNames(page: Page) {
  return page.evaluate(() => {
    const queue = (window as Window & { vaq?: unknown[][] }).vaq ?? [];
    return queue.flatMap((command) => {
      if (command[0] !== "event") return [];
      const payload = command[1] as { name?: string } | undefined;
      return payload?.name ? [payload.name] : [];
    });
  });
}

async function clickWithoutNavigation(page: Page, accessibleName: string) {
  await page.getByRole("link", { name: accessibleName }).evaluate((element) => {
    element.addEventListener("click", (event) => event.preventDefault(), { once: true });
    (element as HTMLAnchorElement).click();
  });
}

test("analytics contract is allowlisted and browser Airtable credentials are disabled", () => {
  expect(SHAKTI_ANALYTICS_EVENTS).toEqual([
    "start_path_viewed",
    "self_audit_started",
    "self_audit_completed",
    "request_details_clicked",
    "stripe_storefront_clicked",
    "community_interest_submitted",
    "retreat_interest_submitted",
  ]);

  const browserSources = [
    join(process.cwd(), "src/config/env.ts"),
    join(process.cwd(), "src/services/AirtableReadOnlyClient.ts"),
  ].map((path) => readFileSync(path, "utf8")).join("\n");

  expect(browserSources).not.toContain("VITE_AIRTABLE_TOKEN");
  expect(browserSources).not.toContain("Authorization: `Bearer");
});

for (const viewport of [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
] as const) {
  test(`${viewport.name} DWD actions emit anonymous events once`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto(`${baseUrl}/dancing-with-durga`);

    await clickWithoutNavigation(page, "View offerings & reserve");
    await clickWithoutNavigation(page, "Request details");

    const events = await eventNames(page);
    expect(events.filter((event) => event === "stripe_storefront_clicked")).toHaveLength(1);
    expect(events.filter((event) => event === "request_details_clicked")).toHaveLength(1);
    expect(JSON.stringify(events)).not.toMatch(/email|phone|whatsapp|message|response/i);
  });
}

test("Begin emits journey events once and records community intent without PII", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "shakti_path_journey_state",
      JSON.stringify({
        beginSessionId: "qa-analytics-session",
        currentScreen: 8,
        scores: { CIRCLE: 2, ONE_ON_ONE: 0, CONTAINER: 1, RETREAT: 0 },
        selections: { 3: "carry", 4: "gentle", 5: "light" },
        longings: [],
        reflection: "",
      }),
    );
  });

  await page.goto(`${baseUrl}/begin?intent=community`);
  await page.getByPlaceholder("First name").fill("Analytics QA Person");
  await page.getByRole("button", { name: "Hold Privately" }).click();
  await expect(page.getByRole("heading", { name: "Your path is held." })).toBeVisible();

  const events = await eventNames(page);
  expect(events.filter((event) => event === "start_path_viewed")).toHaveLength(1);
  expect(events.filter((event) => event === "self_audit_started")).toHaveLength(1);
  expect(events.filter((event) => event === "self_audit_completed")).toHaveLength(1);
  expect(events.filter((event) => event === "community_interest_submitted")).toHaveLength(1);

  const queueText = await page.evaluate(() =>
    JSON.stringify((window as Window & { vaq?: unknown[][] }).vaq ?? []),
  );
  expect(queueText).not.toContain("Analytics QA Person");

  const redactedUrl = await page.evaluate(() => {
    const queue = (window as Window & { vaq?: unknown[][] }).vaq ?? [];
    const command = queue.find((item) => item[0] === "beforeSend");
    const redact = command?.[1] as ((event: { url: string }) => { url?: string } | null) | undefined;
    return redact?.({ url: "https://example.test/begin?intent=community&email=private" })?.url;
  });
  expect(redactedUrl).toBe("https://example.test/begin");
});

test("retreat prototype emits an anonymous local-interest event", async ({ page }) => {
  await page.goto(`${baseUrl}/shala`);
  await page.getByRole("button", { name: "Open Sanctuary Map" }).click();
  await page.locator("#nav-room-retreat").click();
  await page.getByRole("button", { name: "Request Retreat Conversation" }).click();
  await page.getByPlaceholder("e.g. Seeker Ishan").fill("Retreat QA Person");
  await page.getByRole("button", { name: "Request Human Review" }).click();
  await expect(page.getByRole("heading", { name: "Passage Requested" })).toBeVisible();

  const events = await eventNames(page);
  expect(events.filter((event) => event === "retreat_interest_submitted")).toHaveLength(1);
  const queueText = await page.evaluate(() =>
    JSON.stringify((window as Window & { vaq?: unknown[][] }).vaq ?? []),
  );
  expect(queueText).not.toContain("Retreat QA Person");
});
