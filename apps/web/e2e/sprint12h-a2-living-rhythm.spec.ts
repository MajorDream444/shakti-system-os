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

test.describe("Sprint 12H-A.2a Durga emotional visual integration", () => {
  test("desktop Durga page leads with devotional visual world and safe CTA", async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1100 });
    await page.goto(`${baseUrl}/dancing-with-durga`);

    await expect(page.getByRole("heading", { name: "Dancing with Durga: Devotion with a Spine" })).toBeVisible();
    await expect(
      page.getByRole("img", {
        name: "Traditional devotional artwork of Maa Durga with her lion and accompanying deities",
      }),
    ).toHaveAttribute("data-asset-status", "FOUNDER_APPROVED");
    await expect(page.getByRole("heading", { name: "Devotion with a Spine", exact: true })).toBeVisible();
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
    await expect(page.locator("body")).not.toContainText(/Register Now|Buy Now|Checkout|Pay Deposit|somatic breathwork/i);
    await capture(page, testInfo, "desktop-durga-emotional-integration.png");
  });

  test("mobile Durga page leads with feeling, founder presence, and clear actions", async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/dancing-with-durga`);

    await expect(page.getByRole("heading", { name: "Dancing with Durga: Devotion with a Spine" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Global · $150 USD" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Indian Citizens · ₹9,999 INR" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Request details" })).toBeVisible();
    await expect(page.getByRole("link", { name: "Enter Shakti Shala" })).toHaveCount(0);
    await expect(page.getByRole("img", { name: "Sheetal Kandola wearing a red veil" })).toBeVisible();
    await expect(page.getByText("Held by Sheetal. Centered on Maa Durga.")).toBeVisible();
    await expect(page.getByText("Sheetal Kandola holds this container as practitioner and facilitator.")).toBeVisible();
    await expect(page.locator(".durga-motif-line").getByText("hibiscus", { exact: true })).toBeVisible();
    await expect(page.locator(".durga-boundary")).toContainText("Sri Shakti Shala's secure payment page");
    await expect(page.locator("body")).not.toContainText(/Stripe/i);
    await expect(page.locator("body")).not.toContainText(/founder-supplied pricing|approved commerce sprint|gated by human review/i);
    await expect(page.locator("body")).not.toContainText(/Register Now|Buy Now|Checkout|Pay Deposit|somatic breathwork/i);
    await capture(page, testInfo, "mobile-durga-emotional-integration.png");
  });
});
