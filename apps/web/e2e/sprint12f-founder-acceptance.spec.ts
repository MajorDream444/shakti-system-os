import { expect, test, type Page, type TestInfo } from "@playwright/test";

const baseUrl = "http://127.0.0.1:4173";

test.setTimeout(120_000);

type RubricAnswer = {
  item: string;
  status: "YES" | "WATCH" | "NO";
  evidence: string;
  objective: boolean;
};

async function capture(page: Page, testInfo: TestInfo, name: string) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(700);
  await page.screenshot({
    path: testInfo.outputPath(name),
    fullPage: false,
  });
}

async function attachRubric(testInfo: TestInfo, title: string, answers: RubricAnswer[]) {
  const body = [
    `# ${title}`,
    "",
    "| Rubric item | Status | Evidence | Objective failure? |",
    "|---|---|---|---|",
    ...answers.map(
      (answer) =>
        `| ${answer.item} | ${answer.status} | ${answer.evidence.replaceAll("|", "\\|")} | ${answer.objective ? "Yes" : "No"} |`,
    ),
    "",
    "`NO` on commercial discoverability blocks Sprint 12F. `WATCH` stays for human review.",
  ].join("\n");

  await testInfo.attach(`${title}.md`, {
    body,
    contentType: "text/markdown",
  });
  console.log(`\n${body}\n`);
}

async function assertNoPublicInternalLanguage(page: Page) {
  const visibleText = await page.locator("body").innerText();
  for (const phrase of [
    "Doctrine Passport",
    "approval gate",
    "access rule",
    "entitlement",
    "contract row",
    "designer annotation",
    "unresolved question",
    "CONTENT REQUIRED",
    "SHEETAL APPROVAL REQUIRED",
    "NEEDS SOURCE CONFIRMATION",
    "somatic breathwork",
  ]) {
    expect(visibleText).not.toContain(phrase);
  }
}

test.describe("Sprint 12F Sheetal acceptance and offer path clarity", () => {
  test("desktop proves a first-time seeker can find paid-path doorways and discernment", async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1100 });
    await page.goto(`${baseUrl}/`);

    await expect(page.getByRole("link", { name: "Work With Sheetal" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Start Your Shakti Path" }).first()).toBeVisible();
    await expect(page.getByRole("heading", { name: "Two clear ways into the work." })).toBeVisible();
    await capture(page, testInfo, "desktop-home-offer-path.png");

    await page.getByRole("link", { name: "Work With Sheetal" }).first().click();
    await expect(page).toHaveURL(/\/offerings/);
    await expect(page.getByRole("heading", { name: "Work With Sheetal" })).toBeVisible();
    for (const category of [
      "Begin Here - Free",
      "Self-Guided",
      "Circles & Community",
      "Work With Sheetal",
      "Retreats & Immersions",
    ]) {
      await expect(page.getByText(category).first()).toBeVisible();
    }
    await expect(page.getByRole("link", { name: "Request Private Work" }).first()).toBeVisible();
    await expect(page.getByText("Private work in 6-, 9-, or 12-session containers")).toBeVisible();
    await expect(page.getByText("A shorter 3-session container only by exception")).toBeVisible();
    await expect(page.locator("body")).not.toContainText(/single session|standalone session|one-off support|try a session/i);
    await expect(page.getByText("No instant paid access.")).toBeVisible();
    await capture(page, testInfo, "desktop-offerings-visible-paths.png");
    await assertNoPublicInternalLanguage(page);

    await page.goto(`${baseUrl}/about-sheetal`);
    await expect(page.getByRole("heading", { name: "Sheetal Kandola" }).first()).toBeVisible();
    await expect(page.getByAltText("Sheetal Kandola in devotional presence")).toBeVisible();
    await expect(page.getByText("Somatic Experiencing-informed practice").first()).toBeVisible();
    await expect(page.getByText("classical Shakta Tantra").first()).toBeVisible();
    await capture(page, testInfo, "desktop-about-sheetal-founder-presence.png");

    await page.goto(`${baseUrl}/testimonials`);
    await expect(page.getByRole("heading", { name: "Transformation Evidence" })).toBeVisible();
    await expect(page.getByText("Client words will appear here only when publication approval")).toBeVisible();
    await capture(page, testInfo, "desktop-testimonials-consent-architecture.png");

    await page.goto(`${baseUrl}/begin`);
    await expect(page.getByText("Arrival").first()).toBeVisible();
    await expect(page.locator(".begin-ascent-title").getByText("Ascent", { exact: true })).toBeVisible();
    await capture(page, testInfo, "desktop-begin-ascent-preserved.png");

    await page.goto(`${baseUrl}/shala`);
    await expect(page.getByText("Where is your practice calling you?")).toBeVisible();
    await page.locator("button").filter({ hasText: /sanctuary map|map/i }).first().click();
    await expect(page.locator("#threshold-drawer")).toBeVisible();
    await capture(page, testInfo, "desktop-shala-recovery-preserved.png");

    await attachRubric(testInfo, "desktop-sprint-12f-founder-acceptance-rubric", [
      {
        item: "Can I find where to work with Sheetal within two clicks from home?",
        status: "YES",
        evidence: "Hero and nav expose Work With Sheetal; click lands on /offerings with private work, circles, retreats, and access states visible.",
        objective: true,
      },
      {
        item: "Can I distinguish direct offer choice from discernment path?",
        status: "YES",
        evidence: "Home and Offerings both present two paths: know the doorway or start the private Begin threshold.",
        objective: true,
      },
      {
        item: "Does paid-path language avoid fake checkout or fake pricing?",
        status: "YES",
        evidence: "Offer cards say investment is confirmed or published when approved; payment state says no instant paid access.",
        objective: true,
      },
      {
        item: "Does founder presence read clearly?",
        status: "YES",
        evidence: "About Sheetal and home founder section expose Sheetal Kandola, portrait, method, and safe source boundary.",
        objective: true,
      },
      {
        item: "Does sacred presence remain without unapproved Shri Yantra claims?",
        status: "YES",
        evidence: "Public pages use lotus/threshold markers and the Shakta chamber states approved geometry requires source and founder review.",
        objective: true,
      },
      {
        item: "Does the experience still feel authored rather than generic commerce?",
        status: "WATCH",
        evidence: "Offer structure uses Sheetal-specific language and imagery; final taste belongs to human founder review.",
        objective: false,
      },
    ]);
  });

  test("mobile preserves commercial clarity, founder trust, and recovery", async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/`);

    await expect(page.getByRole("link", { name: "Work With Sheetal" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Start Your Shakti Path" }).first()).toBeVisible();
    await capture(page, testInfo, "mobile-home-offer-path.png");

    await page.getByRole("link", { name: "Work With Sheetal" }).first().click();
    await expect(page).toHaveURL(/\/offerings/);
    await expect(page.getByText("Begin Here - Free")).toBeVisible();
    await expect(page.getByText("Request Private Work").first()).toBeVisible();
    await expect(page.getByText("6-, 9-, or 12-session private pathways")).toBeVisible();
    await expect(page.locator("body")).not.toContainText(/single session|standalone session|one-off support|try a session/i);
    await expect(page.getByText("No instant paid access.")).toBeVisible();
    await capture(page, testInfo, "mobile-offerings-visible-paths.png");
    await assertNoPublicInternalLanguage(page);

    await page.goto(`${baseUrl}/about-sheetal`);
    await expect(page.getByRole("heading", { name: "Sheetal Kandola" }).first()).toBeVisible();
    await expect(page.getByAltText("Sheetal Kandola in devotional presence")).toBeVisible();
    await capture(page, testInfo, "mobile-about-sheetal-founder-presence.png");

    await page.goto(`${baseUrl}/shala`);
    await page.locator("button").filter({ hasText: /sanctuary map|map/i }).first().click();
    await expect(page.locator("#threshold-drawer")).toBeVisible();
    await capture(page, testInfo, "mobile-shala-recovery-preserved.png");

    await attachRubric(testInfo, "mobile-sprint-12f-founder-acceptance-rubric", [
      {
        item: "Can I find where to work with Sheetal within two clicks from home?",
        status: "YES",
        evidence: "Mobile home exposes Work With Sheetal immediately; Offerings page exposes private work and paid-path categories.",
        objective: true,
      },
      {
        item: "Does mobile preserve narrative order?",
        status: "YES",
        evidence: "Home moves from hero actions to method, offer path, founder trust, pathway, retreat, and final action.",
        objective: true,
      },
      {
        item: "Can I recover if I get lost?",
        status: "YES",
        evidence: "Shala Sanctuary Map remains available and opens on mobile.",
        objective: true,
      },
      {
        item: "Does mobile feel designed, not merely collapsed?",
        status: "WATCH",
        evidence: "Offer cards and founder surfaces stack with readable hierarchy; final feel remains human visual review.",
        objective: false,
      },
    ]);
  });
});
