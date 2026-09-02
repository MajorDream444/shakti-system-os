import { test, expect } from "@playwright/test";

test.use({ viewport: { width: 1440, height: 1000 } });
test.setTimeout(90_000);

test("Begin can continue privately without storing contact PII", async ({ page }) => {
  await page.goto("http://127.0.0.1:4173/begin");

  await page.locator("button").filter({ hasText: /begin|enter|continue/i }).first().click();
  await page.locator("button").filter({ hasText: /continue|enter/i }).first().click();
  await page.getByText("I feel ready to meet deeper shadow").click();
  await page.getByText("Structured and committed").click();
  await page.getByText("A deeper container with structure").click();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Your clearest doorway may be structured depth.")).toBeVisible();
  await page.getByText("Learn About the Container").click({ force: true });

  await page.getByPlaceholder("First name").fill("Test");
  await page.getByRole("button", { name: "Hold Privately" }).click();

  await expect(page.getByText("Your path is held.")).toBeVisible({ timeout: 20_000 });
  await expect(page.getByText("has not been shared yet")).toBeVisible();

  const localState = await page.evaluate(() => ({
    pending: window.localStorage.getItem("shakti_path_pending_write"),
    email: window.localStorage.getItem("shakti_path_email"),
    phone: window.localStorage.getItem("shakti_path_whatsapp"),
    reflection: window.localStorage.getItem("shakti_path_reflection"),
  }));

  expect(localState.pending).toContain("CONTAINER");
  expect(localState.email).toBeNull();
  expect(localState.phone).toBeNull();
  expect(localState.reflection).toBeNull();
});

test("Begin network failure is safe to continue privately", async ({ page }) => {
  await page.route("**/api/begin/complete", (route) => route.abort());
  await page.goto("http://127.0.0.1:4173/begin");

  await page.locator("button").filter({ hasText: /begin|enter|continue/i }).first().click();
  await page.locator("button").filter({ hasText: /continue|enter/i }).first().click();
  await page.getByText("I am moving through something specific").click();
  await page.getByText("Personal and focused").click();
  await page.getByText("Private guidance and reflection").click();
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Your clearest doorway may be focused support.")).toBeVisible();
  await page.getByText("Request a Private Container").click({ force: true });

  await page.getByPlaceholder("First name").fill("Test");
  await page.getByPlaceholder("Email address (optional)").fill("test@example.com");
  await page.getByLabel(/I consent to share/).check({ force: true });
  await page
    .getByRole("button", { name: "Save My Path" })
    .evaluate((button) => (button as HTMLButtonElement).click());

  await expect(page.getByText("Your path is held.")).toBeVisible({ timeout: 20_000 });
  await expect(page.getByText("continue privately")).toBeVisible();

  const localState = await page.evaluate(() => ({
    pending: window.localStorage.getItem("shakti_path_pending_write"),
    email: window.localStorage.getItem("shakti_path_email"),
    phone: window.localStorage.getItem("shakti_path_whatsapp"),
  }));

  expect(localState.pending).toContain("ONE_ON_ONE");
  expect(localState.email).toBeNull();
  expect(localState.phone).toBeNull();
});
