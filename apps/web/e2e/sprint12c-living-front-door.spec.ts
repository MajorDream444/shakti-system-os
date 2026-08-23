import { expect, test, type Page, type TestInfo } from "@playwright/test";

const baseUrl = "http://127.0.0.1:4173";

const knowledgeDoorways = [
  "Neuroscience",
  "Somatics",
  "Shadow Work",
  "Classical Shakta Tantra",
  "Diaspora Identity",
  "Retreat Practice",
];

const pathwayDoorways = [
  "Self-Audit",
  "Community",
  "Container",
  "Retreat",
];

const forbiddenPublicLanguage = [
  "CONTENT REQUIRED",
  "SHEETAL APPROVAL REQUIRED",
  "unresolved question",
  "contract row",
  "designer annotation",
  "Doctrine Passport",
  "approval gate",
  "access rule",
  "entitlement",
];

test.setTimeout(90_000);

async function capture(page: Page, testInfo: TestInfo, name: string) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(300);
  await page.screenshot({
    path: testInfo.outputPath(name),
    fullPage: false,
  });
}

async function closeChamber(page: Page) {
  await page.getByRole("button", { name: /return|close/i }).last().click();
  await expect(page.getByRole("dialog")).toHaveCount(0);
}

test.describe("Sprint 12C living front door", () => {
  test("desktop implements closed front-door decisions without public annotations", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1100 });
    await page.goto(`${baseUrl}/`);

    await expect(page.getByRole("link", { name: "Work With Sheetal" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Start Your Shakti Path" }).first()).toBeVisible();
    await capture(page, testInfo, "desktop-01-dual-front-door.png");

    await page.locator("#explore").scrollIntoViewIfNeeded();
    await expect(page.getByRole("button", { name: "Open Neuroscience knowledge chamber" })).toBeVisible();
    await capture(page, testInfo, "desktop-02-knowledge-doorways.png");

    for (const doorway of knowledgeDoorways) {
      await page.getByRole("button", { name: `Open ${doorway} knowledge chamber` }).click();
      const dialog = page.getByRole("dialog");
      await expect(dialog.getByRole("heading", { name: doorway })).toBeVisible();
      await expect(dialog).toContainText("Deeper explanation");
      await expect(dialog).toContainText("Why it matters");
      await expect(dialog).toContainText("Example");
      await expect(dialog).toContainText("From Sheetal");
      await expect(dialog).toContainText("Connected to");
      await closeChamber(page);
    }

    await page.locator("#method").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Open the method" }).click();
    await expect(page.getByRole("dialog").getByRole("heading", { name: "The Method" })).toBeVisible();
    await capture(page, testInfo, "desktop-03-method-chamber.png");
    await closeChamber(page);

    await page.locator("#pathway").scrollIntoViewIfNeeded();
    for (const doorway of pathwayDoorways) {
      await page.getByRole("button", { name: `Open ${doorway} doorway` }).click({ force: true });
      await expect(page.getByRole("dialog").getByRole("heading", { name: doorway })).toBeVisible();
      await closeChamber(page);
    }
    await capture(page, testInfo, "desktop-04-pathway-doorways.png");

    await page.getByLabel("Readiness Map").scrollIntoViewIfNeeded();
    await expect(page.getByText("Public Readiness Map")).toBeVisible();
    await expect(page.getByText("This is an illustration, not you.")).toBeVisible();
    await capture(page, testInfo, "desktop-05-readiness-map.png");

    const visibleText = await page.locator("body").innerText();
    for (const phrase of forbiddenPublicLanguage) {
      expect(visibleText).not.toContain(phrase);
    }
  });

  test("mobile keeps chamber navigation usable and annotation-free", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/`);

    await expect(page.getByRole("link", { name: "Start Your Shakti Path" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Work With Sheetal" }).first()).toBeVisible();
    await capture(page, testInfo, "mobile-01-front-door.png");

    await page.locator("#explore").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Open Classical Shakta Tantra knowledge chamber" }).click();
    await expect(page.getByRole("dialog").getByRole("heading", { name: "Classical Shakta Tantra" })).toBeVisible();
    await capture(page, testInfo, "mobile-02-knowledge-chamber.png");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).toHaveCount(0);

    await page.locator("#method").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Open the method" }).click();
    await expect(page.getByRole("dialog").getByRole("heading", { name: "The Method" })).toBeVisible();
    await closeChamber(page);

    await page.getByLabel("Readiness Map").scrollIntoViewIfNeeded();
    await expect(page.getByText("Public Readiness Map")).toBeVisible();
    await capture(page, testInfo, "mobile-03-readiness-map.png");

    const visibleText = await page.locator("body").innerText();
    for (const phrase of forbiddenPublicLanguage) {
      expect(visibleText).not.toContain(phrase);
    }
  });
});
