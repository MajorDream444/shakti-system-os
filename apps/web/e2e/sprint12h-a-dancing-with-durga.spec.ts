import { expect, test, type Page, type TestInfo } from "@playwright/test";

const baseUrl = (process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4173").replace(/\/$/, "");

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

  await expect(body).toContainText(
    "Choose the payment option that applies to you. You will continue to Sri Shakti Shala's secure payment page.",
  );
  await expect(body).not.toContainText(/Stripe/i);
  await expect(body).toContainText("human discernment");
  await expect(body).toContainText(/temporary community \/ Sri Shakti Shala space/i);
  await expect(body).not.toContainText(/\$111|\$222|₹6,666/);
  await expect(body).not.toContainText(/Register Now|Buy Now|Checkout|Pay Deposit/i);
  await expect(body).not.toContainText(/somatic breathwork/i);
  await expect(body).not.toContainText(/approved Shri Yantra|Doctrine Passport|approval gate|access rule/i);
}

test.describe("Sprint 12H-A Dancing with Durga launch foundation", () => {
  test("desktop exposes founder-confirmed campaign truth and secure reservation", async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1100 });
    await page.goto(`${baseUrl}/dancing-with-durga`);

    await expect(page.getByRole("heading", { name: "Dancing with Durga: Devotion with a Spine" })).toBeVisible();
    await expect(page.getByText("A Nine-Night Navratri Sadhana Through the Navadurgas")).toBeVisible();
    await expect(page.getByText("Durga. Devotion. Dharma.")).toBeVisible();
    await expect(page.getByText("Feel fear and stay.")).toBeVisible();
    await expect(page.getByText("Yoni: My Body Is Mine")).toBeVisible();
    await expect(page.getByRole("link", { name: "Global · $150 USD" })).toHaveAttribute(
      "href",
      "https://buy.stripe.com/7sYfZg0zre8DdUA9ePd7q00",
    );
    await expect(page.getByRole("link", { name: "Indian Citizens · ₹9,999 INR" })).toHaveAttribute(
      "href",
      "https://buy.stripe.com/fZu6oGbe5aWr3fWgHhd7q01",
    );
    await expect(page.getByRole("link", { name: "Request details" })).toHaveAttribute("href", "/begin?intent=community");
    await expect(page.getByRole("link", { name: "Enter Shakti Shala" })).toHaveCount(0);
    await capture(page, testInfo, "desktop-dancing-with-durga-launch-foundation.png");
    await assertCampaignBoundary(page);
  });

  test("mobile preserves campaign hierarchy and safe CTA", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/dancing-with-durga`);

    await expect(page.getByRole("heading", { name: "Dancing with Durga: Devotion with a Spine" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Global · $150 USD" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Indian Citizens · ₹9,999 INR" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Request details" })).toBeVisible();
    await expect(page.getByText("Durga teaches devotion with a spine.")).toBeVisible();
    await expect(page.getByText("Four live gatherings plus five practice nights")).toBeVisible();
    await expect(page.getByText("7:30-9:30 PM IST")).toBeVisible();
    await expect(page.locator("body")).not.toContainText("7:30-9:00 PM IST");
    await expect(page.locator("body")).not.toContainText("Five live online gatherings plus four non-live practices");
    await expect(page.locator("body")).not.toContainText(/bonus gathering/i);
    await capture(page, testInfo, "mobile-dancing-with-durga-launch-foundation.png");
    await assertCampaignBoundary(page);
  });
});
