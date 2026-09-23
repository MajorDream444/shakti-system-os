import { expect, test } from "@playwright/test";

const baseUrl = (process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4173").replace(/\/$/, "");

const hostedPayments = [
  ["/dancing-with-durga", "Global · $150 USD", "https://buy.stripe.com/7sYfZg0zre8DdUA9ePd7q00"],
  ["/dancing-with-durga", "Indian Citizens · ₹9,999 INR", "https://buy.stripe.com/fZu6oGbe5aWr3fWgHhd7q01"],
  ["/offerings", "Reserve single session", "https://buy.stripe.com/14A00igyp0hN03KfDdd7q02"],
  ["/offerings", "Reserve 3-session container", "https://buy.stripe.com/dRm3cu2Hzc0v9Ek9ePd7q04"],
  ["/offerings", "Reserve 6-session container", "https://buy.stripe.com/28EeVc2HzaWr9Ek62Dd7q05"],
  ["/offerings", "Reserve 9-session container", "https://buy.stripe.com/aFa00i4PH8Oj8Ag1Mnd7q06"],
  ["/offerings", "Reserve 12-session container", "https://buy.stripe.com/5kQ3cu2Hzd4zcQw1Mnd7q03"],
  ["/offerings", "Choose annual membership", "https://buy.stripe.com/dRm28qdmd1lReYE76Hd7q07"],
  ["/offerings", "Begin global membership trial", "https://buy.stripe.com/cNi14maa18OjbMsez9d7q08"],
  ["/offerings", "Begin Indian resident membership trial", "https://buy.stripe.com/5kQ3cu95XggLcQwgHhd7q09"],
] as const;

for (const viewport of [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
] as const) {
  test(`${viewport.name} exposes the ten approved hosted payment destinations`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });

    for (const [route, label, href] of hostedPayments) {
      await page.goto(`${baseUrl}${route}`);
      const link = page.getByRole("link", { name: label });
      await expect(link).toBeVisible();
      await expect(link).toHaveAttribute("href", href);
      await expect(link).toHaveAttribute("target", "_blank");
      await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }

    await page.goto(`${baseUrl}/dancing-with-durga`);
    await expect(page.getByRole("link", { name: "Request details" })).toHaveAttribute(
      "href",
      "/begin?intent=community",
    );
    await expect(page.locator("body")).not.toContainText(/\$222|₹6,666/i);

    await page.goto(`${baseUrl}/offerings`);
    await expect(page.getByText("Use SHAKTISHALA for $50 off")).toHaveCount(3);
    await expect(page.getByText(/21 days free, then monthly/)).toHaveCount(2);
    await expect(page.getByText(/minimum 6-month commitment/i)).toHaveCount(1);
  });
}

test("DWD uses both founder-approved devotional images without changing commerce", async ({ page }) => {
  await page.goto(`${baseUrl}/dancing-with-durga`);

  const approvedImages = page.locator('img[data-asset-status="FOUNDER_APPROVED"]');
  await expect(approvedImages).toHaveCount(2);
  await expect(approvedImages.nth(0)).toHaveAttribute("src", /durga-approved-art-sept23/);
  await expect(approvedImages.nth(1)).toHaveAttribute("src", /durga-nine-forms-approved-sept23/);
});

test("purchase actions use one accessible filled hierarchy across current offers", async ({ page }) => {
  await page.goto(`${baseUrl}/offerings`);

  const actions = page.locator(".offering-purchase-action .button");
  await expect(actions).toHaveCount(8);

  const baseStyles = await actions.evaluateAll((links) =>
    links.map((link) => {
      const style = getComputedStyle(link);
      return {
        backgroundImage: style.backgroundImage,
        color: style.color,
        borderRadius: style.borderRadius,
      };
    }),
  );

  expect(new Set(baseStyles.map((style) => style.backgroundImage)).size).toBe(1);
  expect(new Set(baseStyles.map((style) => style.color)).size).toBe(1);
  expect(baseStyles.every((style) => style.backgroundImage !== "none")).toBe(true);
  expect(baseStyles.every((style) => style.borderRadius === "999px")).toBe(true);

  const firstAction = actions.first();
  await firstAction.focus();
  await expect
    .poll(() => firstAction.evaluate((link) => getComputedStyle(link).boxShadow))
    .toContain("6px");

  await firstAction.hover();
  await expect
    .poll(() => firstAction.evaluate((link) => getComputedStyle(link).transform))
    .not.toBe("none");
});
