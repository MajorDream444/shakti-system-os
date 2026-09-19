import { expect, test } from "@playwright/test";

test.setTimeout(90_000);
const baseUrl = (process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4173").replace(/\/$/, "");

for (const width of [320, 390, 700, 768, 1024, 1440]) {
  test(`living concepts retain legibility without false sequencing at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto(`${baseUrl}/`);
    const concepts = page.locator(".five-pillar-constellation");
    await expect(concepts.locator("article")).toHaveCount(5);
    for (const title of await page.locator(".living-concepts h3").all()) {
      expect(await title.evaluate(e => {
        const range = document.createRange();
        range.selectNodeContents(e);
        return range.getClientRects().length;
      })).toBe(1);
    }
    await expect(page.locator(".hero-lotus-seal, .portal-mark, .shri-yantra-preview")).toHaveCount(0);
    await expect(page.locator(".authority-grid")).not.toContainText(/\b0[1-5]\b/);
    for (const text of await page.locator(".living-concepts h3, .living-concepts p, .founder-credentials li").all()) {
      expect(await text.evaluate(e => e.scrollWidth <= e.clientWidth)).toBe(true);
      expect(await text.evaluate(e => parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(18);
    }
    for (const card of await page.locator(".living-concepts > article, .living-concepts > button").all()) {
      expect(await card.evaluate(e => getComputedStyle(e).backgroundImage)).toBe("none");
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    if (width === 1440) {
      expect(await page.locator(".nav-links").evaluate(e => parseFloat(getComputedStyle(e).fontSize))).toBe(18);
      await expect(page.locator(".nav-links")).toBeVisible();
    } else {
      await page.getByRole("button", { name: "Toggle menu" }).click();
      await expect(page.locator(".mobile-menu")).toHaveClass(/active/);
      await page.getByRole("button", { name: "Toggle menu" }).click();
    }
    await page.locator(".authority-pillar").first().focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toBeVisible();
  });
}

for (const width of [390, 768, 1440]) {
  test(`living pathways remain readable and keyboard operable at ${width}px`, async ({ page }, testInfo) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${baseUrl}/`);
    const pathway = page.locator("#pathway");
    await pathway.scrollIntoViewIfNeeded();
    await expect(pathway.locator(".living-portal")).toHaveCount(4);
    expect(await pathway.locator(".living-portal-waterline").first().evaluate(e => getComputedStyle(e).animationName)).toBe("none");
    await expect(pathway.locator(".portal-mark")).toHaveCount(0);
    await expect(pathway).not.toContainText(/\b0[1-4]\b/);
    for (const choice of await pathway.locator(".pathway-card").all()) {
      await choice.focus();
      await expect(choice).toBeFocused();
      expect(await choice.evaluate(e => getComputedStyle(e).outlineStyle)).toBe("solid");
      expect(await choice.locator("p").evaluate(e => parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(18);
      expect(await choice.evaluate(e => e.scrollWidth <= e.clientWidth)).toBe(true);
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
    await pathway.locator(".pathway-card").first().focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.screenshot({ path: testInfo.outputPath(`portal-keyboard-${width}.png`) });
  });
}

test("pace portals keep choice authority and reduced-motion behavior", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  const writes: string[] = [];
  page.on("request", request => {
    if (request.method() === "POST" && request.url().includes("/api/")) writes.push(request.url());
  });
  await page.goto(`${baseUrl}/begin`);
  await page.locator("button").filter({ hasText: /begin|enter|continue/i }).first().click();
  await page.locator("button").filter({ hasText: /continue|enter/i }).first().click();
  await page.getByText("I feel ready to meet deeper shadow").click();
  const portals = page.locator(".begin-pace-portal");
  await expect(portals).toHaveCount(4);
  expect(await portals.first().locator(".living-portal-waterline").evaluate(e => getComputedStyle(e).animationName)).toBe("none");
  for (const portal of await portals.all()) {
    expect(await portal.locator("p").evaluate(e => parseFloat(getComputedStyle(e).fontSize))).toBeGreaterThanOrEqual(28);
    expect(await portal.evaluate(e => e.scrollWidth <= e.clientWidth)).toBe(true);
  }
  await portals.first().scrollIntoViewIfNeeded();
  await page.screenshot({ path: testInfo.outputPath("mobile-pace-reduced-motion.png") });
  await page.getByRole("button", { name: "Structured and committed" }).click();
  await expect(page.getByText("A deeper container with structure")).toBeVisible();
  expect(writes).toEqual([]);
});

test("living motion can be paused without changing the doorway", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto(`${baseUrl}/`);
  const pathway = page.locator("#pathway");
  await pathway.scrollIntoViewIfNeeded();
  const material = pathway.locator(".portal-material").first();
  expect(await material.evaluate(e => getComputedStyle(e).animationIterationCount)).toBe("infinite");
  await pathway.getByRole("button", { name: "Pause portal motion" }).click();
  expect(await material.evaluate(e => getComputedStyle(e).animationPlayState)).toBe("paused");
  await pathway.getByRole("button", { name: "Resume portal motion" }).click();
  expect(await material.evaluate(e => getComputedStyle(e).animationPlayState)).toBe("running");
  await pathway.getByRole("button", { name: "Open Community doorway" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
});
