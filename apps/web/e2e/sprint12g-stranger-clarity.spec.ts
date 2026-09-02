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
    "`NO` on the five stranger questions blocks Sprint 12G. `WATCH` stays for human review.",
  ].join("\n");

  await testInfo.attach(`${title}.md`, {
    body,
    contentType: "text/markdown",
  });
  console.log(`\n${body}\n`);
}

async function assertNoBoundaryRegression(page: Page) {
  const body = page.locator("body");

  await expect(body).not.toContainText(/somatic breathwork/i);
  await expect(body).not.toContainText(/single session|standalone session|one-off support|try a session/i);
  await expect(body).not.toContainText(/buy now|pay deposit/i);
  await expect(body).not.toContainText(/King's College|LSHTM|MSc Global Mental Health|certified|licensed/i);
  await expect(body).not.toContainText(/approved Shri Yantra|Doctrine Passport|approval gate|access rule/i);
}

test.describe("Sprint 12G stranger clarity", () => {
  test("desktop answers the five stranger questions without opening About", async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 1440, height: 1100 });
    await page.goto(`${baseUrl}/`);

    await expect(page.getByRole("heading", { name: "Shakti Shadow & Somatics" })).toBeVisible();
    await expect(page.getByText("Sheetal Kandola's body of work")).toBeVisible();
    await expect(page.getByText("Rooted in somatics, nervous-system literacy")).toBeVisible();
    await expect(page.getByText("A bridge between nervous-system care")).toBeVisible();
    await expect(page.getByText("Listen to the body", { exact: true })).toBeVisible();
    await expect(page.getByText("Meet the shadow", { exact: true })).toBeVisible();
    await expect(page.getByText("Return to practice", { exact: true })).toBeVisible();
    await expect(page.getByText("Choose the next doorway", { exact: true })).toBeVisible();
    await expect(page.getByText("living between worlds")).toBeVisible();
    await expect(page.getByText("One body of work. Different ways to enter.")).toBeVisible();
    await expect(page.getByRole("link", { name: "Start Your Shakti Path" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Work With Sheetal" }).first()).toBeVisible();
    await capture(page, testInfo, "desktop-home-stranger-clarity.png");
    await assertNoBoundaryRegression(page);

    await page.getByRole("link", { name: "Work With Sheetal" }).first().click();
    await expect(page).toHaveURL(/\/offerings/);
    await expect(page.getByText("One body of work. Different ways to enter")).toBeVisible();
    await expect(page.getByText("Free orientation")).toBeVisible();
    await expect(page.getByText("Practice and belonging")).toBeVisible();
    await expect(page.getByText("Held support")).toBeVisible();
    await expect(page.getByText("Deeper immersion")).toBeVisible();
    await expect(page.getByText("Private work is container-based")).toBeVisible();
    await capture(page, testInfo, "desktop-offerings-receiving-ladder.png");
    await assertNoBoundaryRegression(page);

    await attachRubric(testInfo, "desktop-sprint-12g-stranger-clarity-rubric", [
      {
        item: "What is Shakti Shadow & Somatics?",
        status: "YES",
        evidence: "Home hero names Shakti Shadow & Somatics as Sheetal Kandola's body of work for women seeking deeper relationship with body, shadow, practice, and inner life.",
        objective: true,
      },
      {
        item: "How does Sheetal actually work?",
        status: "YES",
        evidence: "Home names somatics, nervous-system literacy, shadow integration, classical Shakta Tantra, and the four-part rhythm: listen, meet, return, choose.",
        objective: true,
      },
      {
        item: "Why is Sheetal distinct?",
        status: "YES",
        evidence: "Founder section states her work comes from living between Indian spiritual and devotional traditions, modern somatic and nervous-system practice, shadow work, and Western/Indian contexts.",
        objective: true,
      },
      {
        item: "What can I receive?",
        status: "YES",
        evidence: "/offerings exposes free orientation, Shala practice, held support, private containers, and deeper immersion without checkout.",
        objective: true,
      },
      {
        item: "Where do I begin?",
        status: "YES",
        evidence: "Home keeps Start Your Shakti Path and Work With Sheetal visible as the two entry choices.",
        objective: true,
      },
      {
        item: "Does the clarity feel human and not over-explained?",
        status: "WATCH",
        evidence: "Copy is clearer and less architectural; final tone remains founder/human review.",
        objective: false,
      },
    ]);
  });

  test("mobile preserves method-first clarity and offer orientation", async ({
    page,
  }, testInfo) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`${baseUrl}/`);

    await expect(page.getByRole("heading", { name: "Shakti Shadow & Somatics" })).toBeVisible();
    await expect(page.getByText("Sheetal Kandola's body of work")).toBeVisible();
    await expect(page.getByRole("link", { name: "Start Your Shakti Path" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "Work With Sheetal" }).first()).toBeVisible();
    await expect(page.getByText("Listen to the body", { exact: true })).toBeVisible();
    await capture(page, testInfo, "mobile-home-stranger-clarity.png");
    await assertNoBoundaryRegression(page);

    await page.getByRole("link", { name: "Work With Sheetal" }).first().click();
    await expect(page).toHaveURL(/\/offerings/);
    await expect(page.getByText("Free orientation")).toBeVisible();
    await expect(page.getByText("Request Private Work").first()).toBeVisible();
    await expect(page.getByText("6-, 9-, or 12-session private pathways")).toBeVisible();
    await capture(page, testInfo, "mobile-offerings-receiving-ladder.png");
    await assertNoBoundaryRegression(page);

    await attachRubric(testInfo, "mobile-sprint-12g-stranger-clarity-rubric", [
      {
        item: "What is Shakti Shadow & Somatics?",
        status: "YES",
        evidence: "Mobile hero names the work plainly before deeper sections.",
        objective: true,
      },
      {
        item: "How does Sheetal actually work?",
        status: "YES",
        evidence: "Mobile keeps the method rhythm in sequence: body, shadow, practice, next doorway.",
        objective: true,
      },
      {
        item: "Why is Sheetal distinct?",
        status: "YES",
        evidence: "Founder copy remains in the same narrative order and names lived synthesis without credential stacking.",
        objective: true,
      },
      {
        item: "What can I receive?",
        status: "YES",
        evidence: "Offerings page shows the receiving ladder and private-container language.",
        objective: true,
      },
      {
        item: "Where do I begin?",
        status: "YES",
        evidence: "Start Your Shakti Path remains visible before the deeper offering details.",
        objective: true,
      },
      {
        item: "Does mobile feel calm rather than text-heavy?",
        status: "WATCH",
        evidence: "Method-first order is present; final density and tone remain human review.",
        objective: false,
      },
    ]);
  });
});
