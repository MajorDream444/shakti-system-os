/* Checks for the day-three and day-seven runner.

   The rule under test is the one the old Airtable automations could not
   honour: a seeker is never advanced past an email she did not receive. A
   failed send must leave her due, so tomorrow's run retries, rather than
   skipping her forward into silence.

   No network, no key: the transport and the repository are both stubbed. */

import { runSeekerSequence } from "../server/seekerSequenceRunner.js";
import type { BeginWriteRepository, SeekerDueForSequence } from "../server/airtableWriteRepository.js";

const results: Array<{ name: string; pass: boolean; detail?: string }> = [];
const check = (name: string, pass: boolean, detail?: string) =>
  results.push({ name, pass, detail });

const ENV = { RESEND_API_KEY: "re_test_key_not_real" };

function stubRepo(byStep: Record<number, SeekerDueForSequence[]>) {
  const advanced: Array<{ id: string; toStep: number }> = [];
  const repo = {
    async findSeekersDueForStep({ currentStep }: { currentStep: number }) {
      return byStep[currentStep] ?? [];
    },
    async advanceSequenceStep({ seekerRecordId, toStep }: { seekerRecordId: string; toStep: number }) {
      advanced.push({ id: seekerRecordId, toStep });
    },
  } as unknown as BeginWriteRepository;
  return { repo, advanced };
}

function stubSend(responder: (to: string) => { ok: boolean }) {
  const sent: Array<{ to: string; subject: string; text: string; key?: string }> = [];
  const impl = (async (_u: unknown, init?: { body?: string; headers?: Record<string, string> }) => {
    const b = JSON.parse(init?.body ?? "{}") as { to: string[]; subject: string; text: string };
    sent.push({ to: b.to[0], subject: b.subject, text: b.text, key: init?.headers?.["Idempotency-Key"] });
    return responder(b.to[0]).ok
      ? { ok: true, status: 200, json: async () => ({ id: `msg_${sent.length}` }), text: async () => "" }
      : { ok: false, status: 500, json: async () => ({ message: "down" }), text: async () => "" };
  }) as unknown as typeof fetch;
  return { impl, sent };
}

const CIRCLE: SeekerDueForSequence = {
  id: "recA",
  email: "a@example.com",
  firstName: "A",
  pathwayPhrase: "Shakti Moon Circles",
  pathwaySuffix: ", our gathering every fortnight around the lunar cycle",
};
const NOPATH: SeekerDueForSequence = { id: "recB", email: "b@example.com" };

async function main() {
  /* 1. Happy path — both stages send and advance. */
  {
    const { repo, advanced } = stubRepo({ 1: [CIRCLE], 2: [NOPATH] });
    const { impl, sent } = stubSend(() => ({ ok: true }));
    const s = await runSeekerSequence({ env: ENV, repository: repo, fetchImpl: impl });
    check("day-three sends", s[0].sent === 1 && s[0].failed === 0);
    check("day-seven sends", s[1].sent === 1 && s[1].failed === 0);
    check("advances 1 -> 2", advanced.some((a) => a.id === "recA" && a.toStep === 2));
    check("advances 2 -> 3", advanced.some((a) => a.id === "recB" && a.toStep === 3));
    check("records the Resend ids", s[0].messageIds.length === 1);
    check(
      "day-three renders her pathway sentence",
      sent[0].text.includes("Shakti Moon Circles") && sent[0].text.includes("every fortnight"),
    );
    check("neither note carries the Waterfall link", sent.every((m) => !m.text.includes("vimeo.com")));
    check("neither note carries the password", sent.every((m) => !m.text.includes("Shakti108")));
    check("both carry an opt-out", sent.every((m) => m.text.includes("No, thank you")));
  }

  /* 2. THE RULE. A failed send must not advance the step. */
  {
    const { repo, advanced } = stubRepo({ 1: [CIRCLE], 2: [] });
    const { impl } = stubSend(() => ({ ok: false }));
    const s = await runSeekerSequence({ env: ENV, repository: repo, fetchImpl: impl });
    check("failed send: counted as failed", s[0].failed === 1 && s[0].sent === 0);
    check("failed send: step NOT advanced", advanced.length === 0);
    check("failed send: reason recorded", Boolean(s[0].failures[0]?.reason));
    check("failed send: she stays due for the next run", s[0].due === 1 && advanced.length === 0);
  }

  /* 3. A missing pathway must not render a broken sentence. */
  {
    const { repo } = stubRepo({ 1: [NOPATH], 2: [] });
    const { impl, sent } = stubSend(() => ({ ok: true }));
    await runSeekerSequence({ env: ENV, repository: repo, fetchImpl: impl });
    check("no pathway: no dangling 'is .'", !/right now is\s*\./.test(sent[0].text));
    check("no pathway: letter still sends", sent.length === 1);
  }

  /* 4. Idempotency — keyed per seeker AND step. */
  {
    const { repo } = stubRepo({ 1: [CIRCLE], 2: [CIRCLE] });
    const { impl, sent } = stubSend(() => ({ ok: true }));
    await runSeekerSequence({ env: ENV, repository: repo, fetchImpl: impl });
    check("idempotency key names the step", sent[0].key === "seeker-step-2:recA", sent[0].key);
    check("different step, different key", sent[1].key === "seeker-step-3:recA", sent[1].key);
  }

  /* 5. No key configured — nothing sends, nothing advances. */
  {
    const { repo, advanced } = stubRepo({ 1: [CIRCLE], 2: [] });
    const { impl, sent } = stubSend(() => ({ ok: true }));
    const s = await runSeekerSequence({ env: {}, repository: repo, fetchImpl: impl });
    check("no key: nothing sent", sent.length === 0);
    check("no key: nothing advanced", advanced.length === 0 && s[0].sent === 0);
  }

  /* 6. A query failure in one stage must not stop the other. */
  {
    const advanced: Array<{ id: string }> = [];
    const repo = {
      async findSeekersDueForStep({ currentStep }: { currentStep: number }) {
        if (currentStep === 1) throw new Error("Airtable 500");
        return [NOPATH];
      },
      async advanceSequenceStep({ seekerRecordId }: { seekerRecordId: string }) {
        advanced.push({ id: seekerRecordId });
      },
    } as unknown as BeginWriteRepository;
    const { impl } = stubSend(() => ({ ok: true }));
    const s = await runSeekerSequence({ env: ENV, repository: repo, fetchImpl: impl });
    check("stage one query failure is contained", s[0].due === 0 && s[0].sent === 0);
    check("stage two still runs", s[1].sent === 1 && advanced.length === 1);
  }

  const failed = results.filter((r) => !r.pass);
  for (const r of results) {
    console.log(`${r.pass ? "  PASS" : "  FAIL"}  ${r.name}${r.detail ? `  (${r.detail})` : ""}`);
  }
  console.log(`\n  ${results.length - failed.length}/${results.length} passed`);
  if (failed.length) {
    console.error("\n  SEEKER SEQUENCE CHECKS FAILED\n");
    (globalThis as { process?: { exit: (c: number) => void } }).process?.exit(1);
  }
}

main();
