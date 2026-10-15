import { expect, test } from "@playwright/test";

const contractVersion = "vault-library-v1";
const baseUrl = (process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4173").replace(/\/$/, "");

async function enterLibrary(page: import("@playwright/test").Page) {
  await page.goto(`${baseUrl}/shala`);
  await page.getByRole("button", { name: "Enter the Temple Library" }).click();
}

test("renders free and locked collections without restricted item metadata", async ({ page }) => {
  await page.route("**/api/vault/library", (route) => route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify({
      contractVersion,
      status: "ready",
      collections: [
        { id: "free", title: "Free Practices", description: "Open to everyone.", access: "free", items: [
          { id: "breath", title: "A Free Breath", description: "An approved practice.", durationLabel: "8 min", categoryLabel: "Free", deliveryUrl: "/media/free-breath.mp3" },
        ] },
        { id: "members", title: "Member Library", description: "For current members.", access: "membership_locked", items: [] },
      ],
    }),
  }));
  await enterLibrary(page);
  await expect(page.getByText("A Free Breath")).toBeVisible();
  await expect(page.getByTestId("locked-collection-members")).toContainText("Sri Shakti Shala membership");
  await expect(page.getByText("restricted title")).toHaveCount(0);
});

for (const state of ["empty", "review_required", "unavailable"] as const) {
  test(`renders the ${state} state without catalog metadata`, async ({ page }) => {
    await page.route("**/api/vault/library", (route) => route.fulfill({
      status: state === "unavailable" ? 503 : 200,
      contentType: "application/json",
      body: JSON.stringify({ contractVersion, status: state, collections: [] }),
    }));
    await enterLibrary(page);
    await expect(page.getByRole("status")).toBeVisible();
    await expect(page.getByText("No unpublished or restricted details are shown here.")).toBeVisible();
  });
}

test("library status is announced accessibly", async ({ page }) => {
  await page.route("**/api/vault/library", (route) => route.abort());
  await enterLibrary(page);
  await expect(page.getByRole("status")).toHaveAttribute("aria-live", "polite");
});
