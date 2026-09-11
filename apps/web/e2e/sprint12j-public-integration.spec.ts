import { expect, test, type Page, type TestInfo } from "@playwright/test";

const baseUrl = "http://127.0.0.1:4173";

test.setTimeout(120_000);

async function capture(page: Page, testInfo: TestInfo, name: string) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(700);
  await page.screenshot({
    path: testInfo.outputPath(name),
    fullPage: false,
  });
}

async function assertPublicBoundaries(page: Page) {
  const body = page.locator("body");

  await expect(body).not.toContainText(/somatic breathwork/i);
  await expect(body).not.toContainText(/Shakti Tantra/i);
  await expect(body).not.toContainText(/approved Shri Yantra|Doctrine Passport|approval gate|access rule/i);
  await expect(body).not.toContainText(/Register Now|Buy Now|Checkout Now|Complete Checkout|Pay Deposit/i);
}

test.describe("Sprint 12J public identity and visual integration", () => {
  test("desktop clarifies place, method, pillars, founder, and entry", async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1100 });
    await page.goto(`${baseUrl}/`);

    await expect(page.getByText("SHRI SHAKTI SHALA / LIVING SCHOOL")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Shakti Shadow & Somatics" })).toBeVisible();
    await expect(page.getByText("Sheetal Kandola's body of work inside Shri Shakti Shala")).toBeVisible();
    await expect(page.getByRole("link", { name: "Start Your Shakti Path" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Work With Sheetal" }).first()).toBeVisible();
    await expect(page.locator(".portal-gallery").getByText("Shakti Waterfall")).toBeVisible();
    await expect(page.getByText("The body of work inside Shri Shakti Shala.")).toBeVisible();

    for (const pillar of ["Shakti", "Shadow", "Sensuality", "Somatics", "Sovereignty"]) {
      await expect(page.getByRole("button", { name: new RegExp(`Open ${pillar}`) })).toBeVisible();
    }

    await expect(page.getByText("Punjabi Indian woman raised in the Deep American South")).toBeVisible();
    await expect(page.getByAltText("Sheetal Kandola in devotional presence")).toBeVisible();
    await capture(page, testInfo, "desktop-12j-home-public-identity.png");
    await assertPublicBoundaries(page);
  });

  test("offerings and about preserve method clarity without commerce", async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1100 });

    await page.goto(`${baseUrl}/offerings`);
    await expect(page.getByRole("heading", { name: "Work With Sheetal" })).toBeVisible();
    await expect(page.getByText("One body of work. Different ways to enter")).toBeVisible();
    await expect(page.getByText("Enter Shri Shakti Shala for open teachings")).toBeVisible();
    await expect(page.getByText("Private work in 6-, 9-, or 12-session containers")).toBeVisible();
    await capture(page, testInfo, "desktop-12j-offerings-public-identity.png");
    await assertPublicBoundaries(page);

    await page.goto(`${baseUrl}/about-sheetal`);
    await expect(
      page.locator(".about-hero").getByText("Punjabi Indian woman raised in the Deep American South"),
    ).toBeVisible();
    await expect(
      page.locator(".about-hero").getByText("embodied sensuality, movement, dance"),
    ).toBeVisible();
    await capture(page, testInfo, "desktop-12j-about-founder-source-v2.png");
    await assertPublicBoundaries(page);
  });

  test("mobile preserves public identity and shala recovery", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/`);

    await expect(page.getByText("SHRI SHAKTI SHALA / LIVING SCHOOL")).toBeVisible();
    await expect(page.getByRole("heading", { name: "Shakti Shadow & Somatics" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Start Your Shakti Path" }).first()).toBeVisible();
    await expect(page.getByText("Sovereignty", { exact: true }).first()).toBeVisible();
    await capture(page, testInfo, "mobile-12j-home-public-identity.png");
    await assertPublicBoundaries(page);

    await page.goto(`${baseUrl}/shala`);
    await expect(page.getByText("SHRI SHAKTI SHALA")).toBeVisible();
    await page.locator("button").filter({ hasText: /sanctuary map|map/i }).first().click();
    await expect(page.locator("#threshold-drawer")).toBeVisible();
    await capture(page, testInfo, "mobile-12j-shala-map-public-name.png");
    await assertPublicBoundaries(page);
  });

  test("Dancing with Durga retains canonical delivery and sacred-asset boundary", async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/dancing-with-durga`);

    await expect(page.getByText("Five live online gatherings plus four non-live practices")).toBeVisible();
    await expect(page.getByText("7:30-9:00 PM IST")).toBeVisible();
    await expect(page.getByRole("img", { name: "Sheetal Kandola wearing a red veil" })).toBeVisible();
    await expect(page.getByText("Generated imagery and sacred depictions are review references only")).toBeVisible();
    await capture(page, testInfo, "mobile-12j-dwd-schedule-boundary.png");
    await assertPublicBoundaries(page);
  });
});
