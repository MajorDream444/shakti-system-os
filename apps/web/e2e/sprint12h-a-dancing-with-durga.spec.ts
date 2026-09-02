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

async function assertCampaignBoundary(page: Page) {
  const body = page.locator("body");

  await expect(body).toContainText("Registration and payment are not open yet");
  await expect(body).toContainText("human discernment");
  await expect(body).toContainText(/temporary community \/ Shala space/i);
  await expect(body).not.toContainText(/Register Now|Buy Now|Checkout|Pay Deposit/i);
  await expect(body).not.toContainText(/somatic breathwork/i);
  await expect(body).not.toContainText(/approved Shri Yantra|Doctrine Passport|approval gate|access rule/i);
}

test.describe("Sprint 12H-A Dancing with Durga launch foundation", () => {
  test("desktop exposes founder-confirmed campaign truth without commerce", async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1100 });
    await page.goto(`${baseUrl}/dancing-with-durga`);

    await expect(page.getByRole("heading", { name: "Dancing with Durga: Devotion with a Spine" })).toBeVisible();
    await expect(page.getByText("A Nine-Night Navratri Sadhana Through the Navadurgas")).toBeVisible();
    await expect(page.getByText("Durga. Devotion. Dharma.")).toBeVisible();
    await expect(page.getByText("Feel fear and stay.")).toBeVisible();
    await expect(page.getByText("Yoni: My Body Is Mine")).toBeVisible();
    await expect(page.getByText("$111 Early Devotion")).toBeVisible();
    await expect(page.getByText("₹6,666 Early Devotion")).toBeVisible();
    await expect(page.getByRole("link", { name: "Request details" })).toHaveAttribute("href", "/begin?intent=community");
    await expect(page.getByRole("link", { name: "Enter Shakti Shala" })).toHaveCount(0);
    await capture(page, testInfo, "desktop-dancing-with-durga-launch-foundation.png");
    await assertCampaignBoundary(page);
  });

  test("mobile preserves campaign hierarchy and safe CTA", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/dancing-with-durga`);

    await expect(page.getByRole("heading", { name: "Dancing with Durga: Devotion with a Spine" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Request details" })).toBeVisible();
    await expect(page.getByText("Durga teaches devotion with a spine.")).toBeVisible();
    await expect(page.getByText("Five live online gatherings plus four non-live practices")).toBeVisible();
    await capture(page, testInfo, "mobile-dancing-with-durga-launch-foundation.png");
    await assertCampaignBoundary(page);
  });
});
