import { expect, test } from "@playwright/test";

test.setTimeout(90_000);

const base = (process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:4173").replace(/\/$/, "");
const routes = ["/", "/about-sheetal", "/offerings", "/shala", "/begin", "/dancing-with-durga", "/testimonials"];

for (const width of [390, 1440]) {
  for (const route of routes) {
    test(`prominent image review ${route} at ${width}`, async ({ page }, testInfo) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`${base}${route}`);
      const review = await page.evaluate(() => {
        const uses: { url: string; location: string; kind: string }[] = [];
        for (const element of document.querySelectorAll("body *")) {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          if (rect.width < 120 || rect.height < 120 || style.display === "none" || style.visibility === "hidden") continue;
          const section = element.closest("section");
          const location = section?.id || section?.getAttribute("aria-label") || section?.className || element.tagName;
          const add = (url: string | null, kind: string) => {
            if (url) uses.push({ url: new URL(url, document.baseURI).href, location, kind });
          };
          if (element instanceof HTMLImageElement) add(element.currentSrc || element.src, "img");
          if (element.tagName.toLowerCase() === "image") add(element.getAttribute("href"), "svg-image");
          for (const pseudo of [null, "::before", "::after"]) {
            const css = getComputedStyle(element, pseudo);
            if (pseudo && (css.content === "none" || css.content === "normal")) continue;
            for (const match of css.backgroundImage.matchAll(/url\(["']?([^"')]+)["']?\)/g)) add(match[1], pseudo || "background");
          }
        }
        const repeated = [...new Set(uses.map(use => use.url))]
          .map(url => ({ url, placements: uses.filter(use => use.url === url) }))
          .filter(group => group.placements.length > 1);
        return { status: repeated.length ? "WATCH" : "NO DUPLICATES DETECTED", uses, repeated };
      });
      await testInfo.attach("image-repetition-review.json", {
        body: JSON.stringify({ route, width, ...review }, null, 2), contentType: "application/json",
      });
      if (review.repeated.length) testInfo.annotations.push({ type: "WATCH", description: "Prominent repetition requires human narrative/provenance review; not an automatic error." });
      if (route === "/") {
        const photo = page.locator('img[src*="founder-waterfall-v2-img-2359"]');
        await expect(photo).toHaveCount(1);
        await expect(page.locator(".portal-gallery").locator('img[src*="founder-waterfall-v2-img-2359"]')).toHaveCount(1);
        expect(review.uses.filter(use => use.url.includes("founder-waterfall-v2-img-2359"))).toHaveLength(1);
        const heroEnvironment = page.locator('[data-image-gate="founder-visual-source-v2-approved-candidate"]');
        await expect(heroEnvironment).toHaveAttribute(
          "data-asset-status",
          "APPROVED_CANDIDATE",
        );
        await expect(heroEnvironment).toHaveCSS("background-image", /founder-waterfall-red-v2-img-4518/);
        expect(review.uses.filter(use => use.url.includes("founder-waterfall-red-v2-img-4518"))).toHaveLength(1);
        await expect(page.locator('[data-image-gate="founder-acceptance-and-rights-confirmation-required"] img')).toHaveCount(1);
        await expect(page.getByRole("heading", { name: "Notice where energy flows." })).toBeVisible();
        await page.screenshot({ path: testInfo.outputPath(`home-${width}.png`), fullPage: true });
        await page.locator("#hero").screenshot({ path: testInfo.outputPath(`hero-${width}.png`) });
        await page.locator(".waterfall-doctrine").screenshot({ path: testInfo.outputPath(`energy-flow-${width}.png`) });
      }
    });
  }
}
