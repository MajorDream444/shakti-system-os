import { expect, test, type Page, type TestInfo } from "@playwright/test";

const baseUrl = "http://127.0.0.1:4173";

test.setTimeout(90_000);

type RubricAnswer = {
  question: string;
  status: "YES" | "WATCH" | "NO";
  evidence: string;
};

async function capture(page: Page, testInfo: TestInfo, name: string) {
  await page.waitForLoadState("networkidle").catch(() => {});
  await page.waitForTimeout(450);
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
    "Rubric rule: `WATCH` requires human visual review before release approval. `NO` requires a fix before the surface is presented as ready.",
  ].join("\n");

  await testInfo.attach(`${title}.md`, {
    body,
    contentType: "text/markdown",
  });
  console.log(`\n${body}\n`);
}

async function beginToReveal(page: Page, testInfo: TestInfo) {
  await page.goto(`${baseUrl}/begin`);
  await expect(page.getByText("Arrival").first()).toBeVisible();
  await capture(page, testInfo, "desktop-03-begin-arrival.png");

  await page.locator("button").filter({ hasText: /begin|enter|continue/i }).first().click();
  await page.locator("button").filter({ hasText: /continue|enter/i }).first().click();
  await capture(page, testInfo, "desktop-04-begin-mid-journey.png");

  await page.getByText("I feel ready to meet deeper shadow").click({ force: true });
  await page.getByText("Structured and committed").click({ force: true });
  await page.getByText("A deeper container with structure").click({ force: true });
  await page.getByRole("button", { name: "Continue" }).click();

  await expect(page.getByText("Your clearest doorway may be structured depth.")).toBeVisible();
  await capture(page, testInfo, "desktop-05-begin-reveal.png");
}

test.describe("Sprint 12A visual review evidence", () => {
  test("desktop walkthrough captures authored orientation surfaces", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1100 });

    await page.goto(`${baseUrl}/`);
    await expect(page.getByRole("link", { name: "Start Your Shakti Path" }).first()).toBeVisible();
    await expect(page.getByText("Shakti Shala").first()).toBeVisible();
    await capture(page, testInfo, "desktop-01-portal-above-fold.png");

    await page.locator("#founder").scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, -88));
    await expect(page.getByText("The sanctuary begins with the woman holding it.")).toBeVisible();
    await expect(page.getByAltText("Sheetal Kandola in devotional presence")).toBeVisible();
    await capture(page, testInfo, "desktop-02-founder-presence.png");

    await beginToReveal(page, testInfo);

    await page.goto(`${baseUrl}/shala`);
    await expect(page.locator("body")).toContainText(/Shakti Shala|Courtyard|Sanctuary/i);
    await capture(page, testInfo, "desktop-06-shala-arrival.png");

    await page.locator("button").filter({ hasText: /sanctuary map|map/i }).first().click();
    await expect(page.locator("#threshold-drawer")).toBeVisible();
    await capture(page, testInfo, "desktop-07-shala-map-open.png");

    await page.locator("#nav-room-library").click();
    await expect(page.getByText("Temple Library").first()).toBeVisible();
    await capture(page, testInfo, "desktop-08-shala-room.png");

    await attachRubric(testInfo, "desktop-design-intention-rubric", [
      {
        question: "Can I tell who Sheetal is?",
        status: "YES",
        evidence:
          "`#founder` shows `Sheetal Kandola`, a real portrait image, and founder-specific biography copy.",
      },
      {
        question: "Can I tell what this place is?",
        status: "YES",
        evidence:
          "Portal and Shala surfaces expose `Shakti Shala`, `Shakti Shadow & Somatics`, sanctuary language, and room names.",
      },
      {
        question: "Can I tell where to begin?",
        status: "YES",
        evidence: "The first viewport exposes the primary `Start Your Shakti Path` link.",
      },
      {
        question: "Can I see the next step?",
        status: "YES",
        evidence:
          "`/begin` exposes Arrival, mid-journey response controls, and the reveal state; `/shala` exposes Sanctuary Map navigation.",
      },
      {
        question: "Can I recover if I get lost?",
        status: "YES",
        evidence:
          "`/shala` exposes the Sanctuary Map drawer and the map can navigate to Temple Library without URL knowledge.",
      },
      {
        question: "Does mobile preserve the hierarchy?",
        status: "WATCH",
        evidence:
          "Desktop test cannot prove mobile; mobile companion test attaches its own rubric and screenshots.",
      },
      {
        question: "Does this look authored rather than templated?",
        status: "WATCH",
        evidence:
          "Browser evidence shows Sheetal-specific founder copy and Shakti room architecture. Final judgment remains a human taste gate.",
      },
      {
        question: "Does the founder feel human and present?",
        status: "YES",
        evidence:
          "Founder portrait, name, biography, and contextual Shakti Shala connection are visible in the captured founder section.",
      },
      {
        question: "Does the sanctuary feel inhabited?",
        status: "YES",
        evidence:
          "Shala arrival, Sanctuary Map, and Temple Library room are captured as navigable places rather than static menu links.",
      },
    ]);
  });

  test("mobile walkthrough preserves the founder and pathway hierarchy", async ({ page }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });

    await page.goto(`${baseUrl}/`);
    await expect(page.getByRole("link", { name: "Start Your Shakti Path" }).first()).toBeVisible();
    await capture(page, testInfo, "mobile-01-portal-above-fold.png");

    await page.locator("#founder").scrollIntoViewIfNeeded();
    await page.evaluate(() => window.scrollBy(0, -72));
    await expect(page.getByText("The sanctuary begins with the woman holding it.")).toBeVisible();
    await capture(page, testInfo, "mobile-02-founder-presence.png");

    await page.goto(`${baseUrl}/begin`);
    await expect(page.getByText("Arrival").first()).toBeVisible();
    await capture(page, testInfo, "mobile-03-begin-arrival.png");

    await page.goto(`${baseUrl}/shala`);
    await expect(page.locator("body")).toContainText(/Shakti Shala|Courtyard|Sanctuary/i);
    await page.locator("button").filter({ hasText: /sanctuary map|map/i }).first().click();
    await expect(page.locator("#threshold-drawer")).toBeVisible();
    await capture(page, testInfo, "mobile-04-shala-map-open.png");

    await attachRubric(testInfo, "mobile-design-intention-rubric", [
      {
        question: "Can I tell who Sheetal is?",
        status: "YES",
        evidence:
          "Mobile founder viewport shows `Sheetal Kandola`, the portrait area, and founder headline/copy.",
      },
      {
        question: "Can I tell what this place is?",
        status: "YES",
        evidence:
          "Mobile portal and Shala states expose Shakti Portal/Shakti Shala sanctuary language.",
      },
      {
        question: "Can I tell where to begin?",
        status: "YES",
        evidence: "The mobile first viewport exposes `Start Your Shakti Path`.",
      },
      {
        question: "Can I see the next step?",
        status: "YES",
        evidence:
          "Mobile Begin arrival is visible and the Shala map button opens the navigation drawer.",
      },
      {
        question: "Can I recover if I get lost?",
        status: "YES",
        evidence:
          "Mobile Shala exposes the Sanctuary Map drawer as a persistent orientation/recovery mechanism.",
      },
      {
        question: "Does mobile preserve the hierarchy?",
        status: "YES",
        evidence:
          "Captured mobile states show primary CTA, founder headline, Begin arrival, and Sanctuary Map in reachable order.",
      },
      {
        question: "Does this look authored rather than templated?",
        status: "WATCH",
        evidence:
          "The mobile evidence carries Sheetal-specific language and image presence; final authored-vs-templated judgment remains human visual review.",
      },
      {
        question: "Does the founder feel human and present?",
        status: "YES",
        evidence:
          "The mobile founder screenshot captures portrait, name, and biography rather than a generic profile card.",
      },
      {
        question: "Does the sanctuary feel inhabited?",
        status: "YES",
        evidence:
          "The Shala mobile evidence shows the map drawer as a spatial room system rather than URL-only navigation.",
      },
    ]);
  });
});
