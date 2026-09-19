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

test("DWD does not promise unconfirmed dates, bonus, or checkout", async ({ page }) => {
  await page.goto(`${baseUrl}/dancing-with-durga`);
  const body = page.locator("body");
  await expect(body).toContainText("Four live gatherings plus five practice nights");
  await expect(body).toContainText("7:30-9:30 PM IST");
  await expect(body).not.toContainText(/five live gatherings|7:30-9:00 PM IST|bonus gathering/i);
  await expect(body).not.toContainText(/October (11|13|15|17|19)\s*[-:]?\s*LIVE/i);
  await expect(page.getByRole("link", { name: "Request details" })).toHaveAttribute("href", /\/begin\?intent=community/);
});
