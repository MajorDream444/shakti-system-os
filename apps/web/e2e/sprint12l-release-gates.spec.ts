import { expect, test } from "@playwright/test";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const baseUrl = (process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4173").replace(/\/$/, "");
const routes = [
  "/",
  "/about-sheetal",
  "/offerings",
  "/shala",
  "/begin",
  "/dancing-with-durga",
  "/testimonials",
];

function publicSourceFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) return publicSourceFiles(path);
    return /\.(ts|tsx|css|html)$/.test(entry.name) ? [path] : [];
  });
}

test("public source cannot reintroduce the superseded umbrella spelling", () => {
  const files = [join(process.cwd(), "index.html"), ...publicSourceFiles(join(process.cwd(), "src"))];
  for (const file of files) {
    expect(readFileSync(file, "utf8"), file).not.toMatch(/Shri Shakti Shala/i);
  }
});

test("current public routes use the canonical Sri identity", async ({ page }) => {
  for (const route of routes) {
    await page.goto(`${baseUrl}${route}`);
    await expect(page.locator("body")).not.toContainText(/Shri Shakti Shala/i);
  }
});

test("Home uses the exact founder-selected welcoming portrait", async ({ page }) => {
  await page.goto(baseUrl);
  const portrait = page.getByRole("img", {
    name: "Sheetal Kandola smiling in a red veil with her hands together in greeting",
  });
  await expect(portrait).toHaveAttribute("src", /founder-red-prayer-hands-sept18/);
  await expect(portrait).toHaveJSProperty("complete", true);
  expect(await portrait.evaluate((image: HTMLImageElement) => image.naturalWidth)).toBeGreaterThan(0);
});

test("Home arrival uses the approved authentic waterfall photograph", async ({ page }) => {
  await page.goto(baseUrl);
  const environment = page.locator(".hero-visual");
  await expect(environment).toHaveAttribute("data-asset-status", "APPROVED_CANDIDATE");
  await expect(environment).toHaveCSS(
    "background-image",
    /founder-waterfall-red-v2-img-4518/,
  );
});

test("Dancing with Durga is discoverable from Home and primary navigation", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(baseUrl);

  const seasonalDoorway = page.locator(".hero-seasonal-doorway");
  await expect(seasonalDoorway).toBeVisible();
  await expect(seasonalDoorway).toContainText("Dancing with Durga");
  await expect(seasonalDoorway).toHaveAttribute("href", "/dancing-with-durga");

  const desktopNavLink = page.locator('.nav-links a[href="/dancing-with-durga"]');
  await expect(desktopNavLink).toBeVisible();
  await expect(desktopNavLink).toHaveText("Dancing with Durga");

  await page.setViewportSize({ width: 390, height: 844 });
  await expect(seasonalDoorway).toBeVisible();
  await page.getByRole("button", { name: "Toggle menu" }).click();
  const mobileNavLink = page.locator('.mobile-menu a[href="/dancing-with-durga"]');
  await expect(mobileNavLink).toBeVisible();
  await expect(mobileNavLink).toHaveText("Dancing with Durga");
});

test("DWD preserves confirmed delivery facts and links to the public storefront", async ({ page }) => {
  await page.goto(`${baseUrl}/dancing-with-durga`);
  const body = page.locator("body");
  await expect(body).toContainText("Four live gatherings plus five practice nights");
  await expect(body).toContainText("7:30-9:30 PM IST");
  await expect(body).not.toContainText(/five live gatherings|7:30-9:00 PM IST|bonus gathering/i);
  await expect(body).not.toContainText(/October (11|13|15|17|19)\s*[-:]?\s*LIVE/i);
  await expect(body).not.toContainText(/Stripe/i);
  await expect(body).toContainText("Secure reservation");
  const paymentCta = page.getByRole("link", { name: "View offerings & reserve" });
  await expect(paymentCta).toHaveAttribute("href", "https://stripe.com/@srishaktishala");
  await expect(paymentCta).toHaveAttribute("target", "_blank");
  await expect(paymentCta).toHaveAttribute("rel", "noopener noreferrer");
  await expect(page.getByRole("link", { name: "Request details" })).toHaveAttribute("href", /\/begin\?intent=community/);
});

test("DWD access notes inherit the shared ceremonial portal system", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${baseUrl}/dancing-with-durga`);
  const forms = page.locator(".durga-access-form");
  await expect(forms).toHaveCount(5);
  await expect(forms.locator(".living-portal--tone-durga")).toHaveCount(5);
  expect(
    await forms.evaluateAll((elements) =>
      elements.map((element) => element.getAttribute("data-form-variant")),
    ),
  ).toEqual(["0", "1", "2", "3", "4"]);

  for (const form of await forms.all()) {
    await expect(form).toHaveCSS("clip-path", "none");
    await expect(form).toHaveCSS("background-color", "rgba(0, 0, 0, 0)");
  }

  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    const section = document.querySelector(".durga-investment");
    if (section) {
      window.scrollTo(0, section.getBoundingClientRect().top + window.scrollY - 116);
    }
  });
  const headingTop = await page.locator("#durga-investment-title").evaluate(
    (element) => element.getBoundingClientRect().top,
  );
  const navigationBottom = await page.locator(".site-nav").evaluate(
    (element) => element.getBoundingClientRect().bottom,
  );
  expect(headingTop).toBeGreaterThan(navigationBottom);

  await page.setViewportSize({ width: 390, height: 844 });
  const mobileWidths = await forms.evaluateAll((elements) =>
    elements.map((element) => Math.round(element.getBoundingClientRect().width)),
  );
  expect(new Set(mobileWidths).size).toBeGreaterThanOrEqual(4);
});
