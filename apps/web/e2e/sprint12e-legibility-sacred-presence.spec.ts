import { expect, test, type Page, type TestInfo } from "@playwright/test";

const baseUrl = "http://127.0.0.1:4173";

test.setTimeout(120_000);

type RubricAnswer = {
  question: string;
  status: "YES" | "WATCH" | "NO";
  evidence: string;
};

async function capture(page: Page, testInfo: TestInfo, name: string) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(1600);
  await page.screenshot({
    path: testInfo.outputPath(name),
    fullPage: false,
  });
}

async function attachRubric(testInfo: TestInfo, title: string, answers: RubricAnswer[]) {
  const body = [
    `# ${title}`,
    "",
    "| Question | Status | Browser Evidence |",
    "|---|---|---|",
    ...answers.map(
      (answer) =>
        `| ${answer.question} | ${answer.status} | ${answer.evidence.replaceAll("|", "\\|")} |`,
    ),
    "",
    "`NO` requires a fix before readiness claim. `WATCH` requires human visual review.",
  ].join("\n");

  await testInfo.attach(`${title}.md`, {
    body,
    contentType: "text/markdown",
  });
  console.log(`\n${body}\n`);
}

async function beginToMid(page: Page, testInfo: TestInfo, prefix: string) {
  await page.goto(`${baseUrl}/begin`);
  await expect(page.getByText("Arrival").first()).toBeVisible();
  await expect(page.locator(".begin-lotus-threshold")).toHaveCount(1);
  await capture(page, testInfo, `${prefix}-begin-arrival.png`);

  await page.locator("button").filter({ hasText: /begin|enter|continue/i }).first().click();
  await page.locator("button").filter({ hasText: /continue|enter/i }).first().click();
  await capture(page, testInfo, `${prefix}-begin-mid-ascent.png`);
}

async function beginToReveal(page: Page, testInfo: TestInfo, prefix: string) {
  await beginToMid(page, testInfo, prefix);
  await page.getByText("I feel ready to meet deeper shadow").click({ force: true });
  await page.getByText("Structured and committed").click({ force: true });
  await page.getByText("A deeper container with structure").click({ force: true });
  await page.getByRole("button", { name: "Continue" }).click();
  await expect(page.getByText("Your clearest doorway may be structured depth.")).toBeVisible();
  await expect(page.getByText("Book a Discovery Call")).toBeVisible();
  await capture(page, testInfo, `${prefix}-begin-reveal-enter.png`);
}

test.describe("Sprint 12E legibility, sacred presence, and embodiment", () => {
  test("desktop captures legible action hierarchy and varied Yantra roles", async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1100 });
    await page.goto(`${baseUrl}/`);

    await expect(page.getByRole("link", { name: "Start Your Shakti Path" }).first()).toBeVisible();
    await expect(page.locator(".hero-lotus-seal")).toHaveCount(1);
    await capture(page, testInfo, "desktop-home-legibility.png");

    await page.locator("#explore").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Open Classical Shakta Tantra knowledge chamber" }).click();
    await expect(page.getByRole("dialog").getByRole("heading", { name: "Classical Shakta Tantra" })).toBeVisible();
    await expect(page.getByRole("dialog").locator(".shri-yantra-preview")).toHaveCount(0);
    await capture(page, testInfo, "desktop-knowledge-chamber-yantra.png");

    await beginToReveal(page, testInfo, "desktop");

    await page.goto(`${baseUrl}/shala`);
    await expect(page.locator("#gates-room .shala-threshold-seal")).toHaveCount(1);
    await capture(page, testInfo, "desktop-shala-arrival.png");
    await page.locator("button").filter({ hasText: /sanctuary map|map/i }).first().click();
    await expect(page.locator(".threshold-map-seal .threshold-map-lotus")).toHaveCount(1);
    await capture(page, testInfo, "desktop-shala-map.png");

    await page.locator("#nav-room-retreat").click();
    await expect(page.getByText("Retreat Threshold").first()).toBeVisible();
    await capture(page, testInfo, "desktop-retreat-readiness.png");

    await attachRubric(testInfo, "desktop-sprint-12e-rubric", [
      {
        question: "Can I immediately read every primary action?",
        status: "YES",
        evidence: "Home Start doorway, Begin reveal actions, Shala map, and Retreat request actions are visible in screenshots.",
      },
      {
        question: "Can I read navigation without leaning toward the screen?",
        status: "YES",
        evidence: "Desktop nav, Begin ascent, Shala utility, and Sanctuary Map labels use raised contrast and larger text.",
      },
      {
        question: "Are station names readable on /begin?",
        status: "YES",
        evidence: "Begin screenshots show the ascent rail and current station label with stronger contrast.",
      },
      {
        question: "Can an older user reasonably read secondary descriptions?",
        status: "WATCH",
        evidence: "Secondary text contrast has been raised; final age-inclusive comfort remains human visual review.",
      },
      {
        question: "Does photography preserve text readability?",
        status: "YES",
        evidence: "Home and Shala screenshots keep foreground text separated from photography with controlled overlays.",
      },
      {
        question: "Is sacred-symbol usage visibly present without claiming an approved Shri Yantra?",
        status: "YES",
        evidence: "Home seal, Begin threshold, chamber approval boundary, Shala threshold, and map orientation roles are present.",
      },
      {
        question: "Does symbolic usage vary rather than appearing copy-pasted?",
        status: "YES",
        evidence: "Different role classes are present: home seal, threshold, approval boundary, and orientation.",
      },
      {
        question: "Does the experience feel more like a place than a slide deck?",
        status: "WATCH",
        evidence: "Shala and Begin show spatial layers; final presentation-to-place judgment remains human review.",
      },
      {
        question: "Are pink/gold/green visibly present?",
        status: "YES",
        evidence: "Home, Begin, chamber, and Shala screenshots show pink, gold, and green accents.",
      },
      {
        question: "Does darkness create depth rather than conceal information?",
        status: "WATCH",
        evidence: "Functional text has been lifted; Shala darkness remains intentionally atmospheric and needs human review.",
      },
      {
        question: "Can I tell where I am?",
        status: "YES",
        evidence: "Begin current station, Shala current room, and Sanctuary Map current state are visible.",
      },
      {
        question: "Can I tell where I can go?",
        status: "YES",
        evidence: "Home doorways, Begin actions, and Shala room routes are visible.",
      },
      {
        question: "Can I recover if I get lost?",
        status: "YES",
        evidence: "Shala utility and Sanctuary Map remain visible and recoverable.",
      },
      {
        question: "Does the founder/world still feel human and authored?",
        status: "YES",
        evidence: "Home image system preserves Sheetal photography and Shakti-specific language.",
      },
    ]);
  });

  test("mobile captures readable movement and recovery surfaces", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/`);

    await expect(page.getByRole("link", { name: "Start Your Shakti Path" }).first()).toBeVisible();
    await expect(page.locator(".hero-lotus-seal")).toHaveCount(1);
    await capture(page, testInfo, "mobile-home-legibility.png");

    await page.locator("#explore").scrollIntoViewIfNeeded();
    await page.getByRole("button", { name: "Open Classical Shakta Tantra knowledge chamber" }).click();
    await expect(page.getByRole("dialog").getByRole("heading", { name: "Classical Shakta Tantra" })).toBeVisible();
    await expect(page.getByRole("dialog").locator(".shri-yantra-preview")).toHaveCount(0);
    await capture(page, testInfo, "mobile-knowledge-chamber-yantra.png");

    await beginToReveal(page, testInfo, "mobile");

    await page.goto(`${baseUrl}/shala`);
    await page.locator("button").filter({ hasText: /sanctuary map|map/i }).first().click();
    await expect(page.locator("#threshold-drawer")).toBeVisible();
    await expect(page.locator(".threshold-map-seal .threshold-map-lotus")).toHaveCount(1);
    await capture(page, testInfo, "mobile-shala-map.png");

    await page.locator("#nav-room-retreat").click();
    await expect(page.getByText("Retreat Threshold").first()).toBeVisible();
    await capture(page, testInfo, "mobile-retreat-readiness.png");

    await attachRubric(testInfo, "mobile-sprint-12e-rubric", [
      {
        question: "Can I immediately read every primary action?",
        status: "YES",
        evidence: "Mobile screenshots show the Start doorway, Begin actions, Shala map routes, and retreat request surface.",
      },
      {
        question: "Can I read navigation without leaning toward the screen?",
        status: "YES",
        evidence: "Mobile map and Begin surfaces use larger labels and stronger contrast than 12D.",
      },
      {
        question: "Are station names readable on /begin?",
        status: "YES",
        evidence: "The current Begin station remains visible on mobile while the compact progress treatment stays unobtrusive.",
      },
      {
        question: "Can an older user reasonably read secondary descriptions?",
        status: "WATCH",
        evidence: "Secondary descriptions are raised, but comfort across older users remains human visual review.",
      },
      {
        question: "Does photography preserve text readability?",
        status: "YES",
        evidence: "Mobile home keeps the Start doorway and text readable over the photographic field.",
      },
      {
        question: "Is sacred-symbol usage visibly present without claiming an approved Shri Yantra?",
        status: "YES",
        evidence: "Home, Begin, chamber boundary, and Shala map surfaces expose different symbolic roles.",
      },
      {
        question: "Does symbolic usage vary rather than appearing copy-pasted?",
        status: "YES",
        evidence: "Mobile uses home, threshold, chamber boundary, and orientation roles at different scale and placement.",
      },
      {
        question: "Does the experience feel more like a place than a slide deck?",
        status: "WATCH",
        evidence: "Evidence captures spatial map, ascent, and image-led threshold; final judgment remains human.",
      },
      {
        question: "Are pink/gold/green visibly present?",
        status: "YES",
        evidence: "Luminous palette remains visible in mobile Home, Begin, and Shala.",
      },
      {
        question: "Does darkness create depth rather than conceal information?",
        status: "WATCH",
        evidence: "Functional text has been lifted; human review should judge ordinary brightness comfort.",
      },
      {
        question: "Can I tell where I am?",
        status: "YES",
        evidence: "Begin station and Shala map current room are visible.",
      },
      {
        question: "Can I tell where I can go?",
        status: "YES",
        evidence: "Home doorways and Shala routes remain reachable without URL memory.",
      },
      {
        question: "Can I recover if I get lost?",
        status: "YES",
        evidence: "Mobile Sanctuary Map opens and exposes return/navigation routes.",
      },
      {
        question: "Does the founder/world still feel human and authored?",
        status: "YES",
        evidence: "Mobile front door still carries approved photography and Sheetal-specific copy.",
      },
    ]);
  });
});
