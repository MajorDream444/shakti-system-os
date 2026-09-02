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

async function moveBeginToReveal(page: Page, testInfo: TestInfo, prefix: string) {
  await page.goto(`${baseUrl}/begin`);
  await expect(page.getByText("Arrival").first()).toBeVisible();
  await expect(page.locator(".begin-ascent-image")).toHaveCount(1);
  await capture(page, testInfo, `${prefix}-begin-arrival.png`);

  await page.locator("button").filter({ hasText: /begin|enter|continue/i }).first().click();
  await page.locator("button").filter({ hasText: /continue|enter/i }).first().click();
  await page.getByText("I feel ready to meet deeper shadow").click({ force: true });
  await page.getByText("Structured and committed").click({ force: true });
  await page.getByText("A deeper container with structure").click({ force: true });
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.getByText("Your clearest doorway may be structured depth.")).toBeVisible();
  await capture(page, testInfo, `${prefix}-begin-reveal.png`);
}

test.describe("Sprint 12D luminous Shakti art direction", () => {
  test("desktop exposes the luminous palette, photography, and sacred-geometry approval boundary", async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1100 });
    await page.goto(`${baseUrl}/`);

    await expect(page.getByRole("link", { name: "Start Your Shakti Path" }).first()).toBeVisible();
    await expect(page.locator(".hero-visual").first()).toHaveCSS("background-image", /reflection_pool/);
    await expect(page.getByAltText("Sheetal Kandola in devotional presence")).toBeVisible();
    await capture(page, testInfo, "desktop-home-luminous-front-door.png");

    await page.locator("#explore").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Open Classical Shakta Tantra knowledge chamber" }).click();
    await expect(page.getByRole("dialog").getByRole("heading", { name: "Classical Shakta Tantra" })).toBeVisible();
    await expect(page.getByRole("dialog")).toContainText("Approved sacred geometry will appear only after source and founder review");
    await expect(page.getByRole("dialog").locator(".shri-yantra-preview")).toHaveCount(0);
    await capture(page, testInfo, "desktop-classical-shakta-tantra-boundary.png");

    await moveBeginToReveal(page, testInfo, "desktop");

    await page.goto(`${baseUrl}/shala`);
    await expect(page.locator("#gates-room .shala-threshold-seal")).toHaveCount(1);
    await expect(page.locator("body")).toContainText(/Shakti Shala|Courtyard|Sanctuary/i);
    await capture(page, testInfo, "desktop-shala-threshold.png");
  });

  test("mobile preserves the primary doorway and luminous orientation surfaces", async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/`);

    await expect(page.getByRole("link", { name: "Start Your Shakti Path" }).first()).toBeVisible();
    await expect(page.getByAltText("Sheetal Kandola in devotional presence")).toBeVisible();
    await capture(page, testInfo, "mobile-home-luminous-front-door.png");

    await page.locator("#explore").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Open Classical Shakta Tantra knowledge chamber" }).click();
    await expect(page.getByRole("dialog").getByRole("heading", { name: "Classical Shakta Tantra" })).toBeVisible();
    await expect(page.getByRole("dialog").locator(".shri-yantra-preview")).toHaveCount(0);
    await capture(page, testInfo, "mobile-classical-shakta-tantra-boundary.png");

    await moveBeginToReveal(page, testInfo, "mobile");

    await page.goto(`${baseUrl}/shala`);
    await page.locator("button").filter({ hasText: /sanctuary map|map/i }).first().click();
    await expect(page.locator("#threshold-drawer")).toBeVisible();
    await expect(page.locator("#gates-room .shala-threshold-seal")).toHaveCount(1);
    await capture(page, testInfo, "mobile-shala-map-threshold.png");
  });
});
