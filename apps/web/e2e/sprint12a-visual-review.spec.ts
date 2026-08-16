import { expect, test, type Page, type TestInfo } from "@playwright/test";

const baseUrl = "http://127.0.0.1:4173";

test.setTimeout(90_000);

async function capture(page: Page, testInfo: TestInfo, name: string) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(450);
  await page.screenshot({
    path: testInfo.outputPath(name),
    fullPage: false,
  });
}

async function beginToReveal(page: Page, testInfo: TestInfo) {
  await page.goto(`${baseUrl}/begin`);
  await expect(page.getByText("Arrival").first()).toBeVisible();
  await capture(page, testInfo, "desktop-03-begin-arrival.png");

  await page.locator("button").filter({ hasText: /begin|enter|continue/i }).first().click();
  await page.locator("button").filter({ hasText: /continue|enter/i }).first().click();
  await capture(page, testInfo, "desktop-04-begin-mid-journey.png");

  await page.getByText("I feel ready to meet deeper shadow").click({ force: true });
  await page.getByText("Structured and committed").click({ force: true });
  await page.getByText("A deeper container with structure").click({ force: true });
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.getByText("Your clearest doorway may be structured depth.")).toBeVisible();
  await capture(page, testInfo, "desktop-05-begin-reveal.png");
}

test.describe("Sprint 12A visual review evidence", () => {
  test("desktop walkthrough captures authored orientation surfaces", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1100 });

    await page.goto(`${baseUrl}/`);
    await expect(page.getByRole("link", { name: "Start Your Shakti Path" }).first()).toBeVisible();
    await expect(page.getByText("Shakti Shala").first()).toBeVisible();
    await capture(page, testInfo, "desktop-01-portal-above-fold.png");

    await page.locator("#founder").scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, -88));
    await expect(page.getByText("The sanctuary begins with the woman holding it.")).toBeVisible();
    await expect(page.getByAltText("Sheetal Kandola in devotional presence")).toBeVisible();
    await capture(page, testInfo, "desktop-02-founder-presence.png");

    await beginToReveal(page, testInfo);

    await page.goto(`${baseUrl}/shala`);
    await expect(page.locator("body")).toContainText(/Shakti Shala|Courtyard|Sanctuary/i);
    await capture(page, testInfo, "desktop-06-shala-arrival.png");

    await page.locator("button").filter({ hasText: /sanctuary map|map/i }).first().click();
    await expect(page.locator("#threshold-drawer")).toBeVisible();
    await capture(page, testInfo, "desktop-07-shala-map-open.png");

    await page.locator("#nav-room-library").click();
    await expect(page.getByText("Temple Library").first()).toBeVisible();
    await capture(page, testInfo, "desktop-08-shala-room.png");
  });

  test("mobile walkthrough preserves the founder and pathway hierarchy", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto(`${baseUrl}/`);
    await expect(page.getByRole("link", { name: "Start Your Shakti Path" }).first()).toBeVisible();
    await capture(page, testInfo, "mobile-01-portal-above-fold.png");

    await page.locator("#founder").scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, -72));
    await expect(page.getByText("The sanctuary begins with the woman holding it.")).toBeVisible();
    await capture(page, testInfo, "mobile-02-founder-presence.png");

    await page.goto(`${baseUrl}/begin`);
    await expect(page.getByText("Arrival").first()).toBeVisible();
    await capture(page, testInfo, "mobile-03-begin-arrival.png");

    await page.goto(`${baseUrl}/shala`);
    await expect(page.locator("body")).toContainText(/Shakti Shala|Courtyard|Sanctuary/i);
    await page.locator("button").filter({ hasText: /sanctuary map|map/i }).first().click();
    await expect(page.locator("#threshold-drawer")).toBeVisible();
    await capture(page, testInfo, "mobile-04-shala-map-open.png");
  });
});
