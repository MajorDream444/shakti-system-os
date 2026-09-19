import { test, expect, type Page, type TestInfo } from "@playwright/test";
import { designScope, publicReviewRoutes } from "../src/data/designScope";

test.setTimeout(120_000);
const base = (process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4173").replace(/\/$/, "");

async function capture(page: Page, info: TestInfo, name: string) {
  await expect(page.locator("body")).toBeVisible();
  const audit = await page.locator("#root").evaluate(root => {
    const failures: object[] = [];
    for (const node of root.querySelectorAll("p, label, button, input, textarea, nav a")) {
      const rect = node.getBoundingClientRect();
      if (!rect.width || !rect.height || node.closest('[aria-hidden="true"]')) continue;
      const style = getComputedStyle(node);
      const text = node.textContent?.trim() || node.getAttribute("aria-label") || node.getAttribute("placeholder");
      if (!text) continue;
      if (parseFloat(style.fontSize) < 18 || node.scrollWidth > node.clientWidth + 2) failures.push({ text, fontSize: style.fontSize, width: rect.width, scrollWidth: node.scrollWidth });
    }
    return failures;
  });
  await info.attach(`${name}-readability.json`, { body: JSON.stringify(audit, null, 2), contentType: "application/json" });
  expect(audit, `${name}: meaningful text size/wrapping`).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true);
  const path = info.outputPath(`${name}.png`);
  await page.screenshot({ path, fullPage: true });
  await info.attach(name, { path, contentType: "image/png" });
}

test("canonical visual decisions cover the system, not Home alone", () => {
  expect(designScope).toHaveLength(6);
  for (const decision of designScope) {
    expect(decision.scope).toBe("SYSTEM");
    expect(decision.routes).toEqual(publicReviewRoutes);
  }
});

for (const width of [390, 1440]) {
  for (const route of publicReviewRoutes.filter(route => route !== "/begin")) {
    test(`system reading ${route} ${width}`, async ({ page }, info) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`${base}${route}`);
      await capture(page, info, `${route.replaceAll("/", "") || "home"}-${width}`);
    });
  }
  test(`Begin complete visual journey ${width}`, async ({ page }, info) => {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const writes: string[] = [];
    page.on("request", request => { if (request.method() === "POST") writes.push(request.url()); });
    await page.goto(`${base}/begin`);
    const names = ["Arrival", "Listening", "Current-State", "Pace", "Support", "Longing", "Discernment-Reveal", "Enter"];
    const headings = [/foot of the mountain/, /Not every woman/, /What feels most alive/, /What pace/, /What kind of support/, /What are you longing/, /Your clearest doorway/, /Where shall/];
    for (let station = 1; station <= 8; station++) {
      await expect(page.locator(`.begin-station-${station}`)).toBeVisible();
      if (station < 8) await expect(page.getByRole("heading", { name: headings[station - 1] })).toBeVisible();
      else await expect(page.getByPlaceholder("First name")).toBeVisible();
      await expect(page.locator(".begin-stage-inner")).toHaveCSS("opacity", "1");
      await capture(page, info, `begin-${station}-${names[station - 1]}-${width}`);
      if (station === 1) await page.getByRole("button", { name: "Begin the Ascent" }).click();
      if (station === 2 || station === 6) await page.getByRole("button", { name: "Continue", exact: true }).click();
      if (station >= 3 && station <= 5) {
        const choices = page.locator(".begin-choice");
        await expect(choices.locator(".living-portal")).toHaveCount(4);
        await choices.first().focus();
        await expect(choices.first()).toBeFocused();
        await page.keyboard.press("Enter");
      }
      if (station === 7) await page.getByRole("button", { name: "Explore the Weekly Circle", exact: true }).click();
    }
    expect(writes).toEqual([]);
  });
}

// Text magnification/reflow stress is not labelled as real browser zoom.
for (const scale of [1, 1.25, 1.5, 2]) {
  test(`Begin text magnification ${scale}`, async ({ page }, info) => {
    await page.setViewportSize({ width: 1280, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${base}/begin`);
    await page.addStyleTag({ content: `html { font-size: ${16 * scale}px !important; }` });
    await capture(page, info, `text-magnification-${scale}`);
  });
}
