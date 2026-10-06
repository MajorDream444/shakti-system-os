/* Checks for the Resend delivery path.

   These exist because the failure they guard against already happened: under
   Airtable's native send the message failed, the automation halted before its
   state write, and the seeker was stranded in a state no later sequence would
   ever select — silently. The rule below is the fix, and it is the one thing
   that must never regress:

     SEQUENCE STATE ADVANCES ONLY AFTER RESEND ACCEPTS THE MESSAGE.

   No network and no API key are needed: fetch is stubbed, so these run
   anywhere, including CI, and prove the decision logic rather than Resend. */

import {
  deliverSeekerWelcome,
  type SequenceStateWriter,
} from "../server/seekerEmailDelivery.js";
import { buildBuyerWelcomeEmail, buildSeekerWelcomeEmail } from "../server/emailTemplates.js";

type Call = { url: string; body: Record<string, unknown> };

function stubFetch(responder: (call: Call) => { ok: boolean; status: number; payload: unknown }) {
  const calls: Call[] = [];
  const impl = (async (url: unknown, init?: { body?: string }) => {
    const body = init?.body ? (JSON.parse(init.body) as Record<string, unknown>) : {};
    const call = { url: String(url), body };
    calls.push(call);
    const { ok, status, payload } = responder(call);
    return {
      ok,
      status,
      json: async () => payload,
      text: async () => JSON.stringify(payload),
    };
  }) as unknown as typeof fetch;
  return { impl, calls };
}

function recordingWriter() {
  const marked: string[] = [];
  const failures: Array<{ id: string; reason: string }> = [];
  const writer: SequenceStateWriter = {
    async markWaterfallDelivered(input) {
      marked.push(input.seekerRecordId);
    },
    async recordDeliveryFailure(input) {
      failures.push({ id: input.seekerRecordId, reason: input.reason });
    },
  };
  return { writer, marked, failures };
}

const ENV = { RESEND_API_KEY: "re_test_key_not_real" };
const BASE = { seekerRecordId: "recSEEKER", firstName: "Evidence", idempotencyKey: "begin:test:v1" };

const results: Array<{ name: string; pass: boolean; detail?: string }> = [];
function check(name: string, pass: boolean, detail?: string) {
  results.push({ name, pass, detail });
}

export async function runResendDeliveryChecks() {
  /* 1. Accepted → sequence advances, exactly one send. */
  {
    const { impl, calls } = stubFetch(() => ({ ok: true, status: 200, payload: { id: "msg_001" } }));
    const { writer, marked, failures } = recordingWriter();
    const out = await deliverSeekerWelcome(
      { ...BASE, email: "her@example.com" },
      { env: ENV, writer, fetchImpl: impl },
    );
    check("accepted: advances sequence", out.sequenceAdvanced && marked.length === 1);
    check("accepted: no failure recorded", failures.length === 0);
    check("accepted: exactly one send", calls.length === 1, `sent ${calls.length}`);
    check(
      "accepted: carries the Waterfall link",
      String(calls[0]?.body.text ?? "").includes("vimeo.com/1231792529"),
    );
    check(
      "accepted: reply-to is Sheetal",
      calls[0]?.body.reply_to === "sheetalkandola@gmail.com",
      String(calls[0]?.body.reply_to),
    );
    check(
      "accepted: does not send from gmail.com",
      !String(calls[0]?.body.from ?? "").includes("@gmail.com"),
      String(calls[0]?.body.from),
    );
  }

  /* 2. Rejected → sequence MUST NOT advance, failure recorded, Sheetal alerted. */
  {
    const { impl, calls } = stubFetch((call) =>
      String((call.body.to as string[])?.[0]).includes("sheetalkandola")
        ? { ok: true, status: 200, payload: { id: "msg_alert" } }
        : { ok: false, status: 422, payload: { message: "domain not verified" } },
    );
    const { writer, marked, failures } = recordingWriter();
    const out = await deliverSeekerWelcome(
      { ...BASE, email: "her@example.com" },
      { env: ENV, writer, fetchImpl: impl },
    );
    check("rejected: sequence does NOT advance", !out.sequenceAdvanced && marked.length === 0);
    check("rejected: failure is recorded", failures.length === 1);
    check(
      "rejected: reason is preserved",
      failures[0]?.reason.includes("422"),
      failures[0]?.reason,
    );
    check(
      "rejected: Sheetal is alerted",
      calls.some((c) => String((c.body.to as string[])?.[0]).includes("sheetalkandola")),
    );
  }

  /* 3. Hold Privately → nothing attempted, nothing marked, nothing promised. */
  {
    const { impl, calls } = stubFetch(() => ({ ok: true, status: 200, payload: { id: "msg_x" } }));
    const { writer, marked, failures } = recordingWriter();
    const out = await deliverSeekerWelcome({ ...BASE, email: undefined }, { env: ENV, writer, fetchImpl: impl });
    check("private: no send attempted", !out.attempted && calls.length === 0);
    check("private: sequence untouched", !out.sequenceAdvanced && marked.length === 0);
    check("private: not treated as a failure", failures.length === 0);
  }

  /* 4. No API key → skipped, not failed, and the record is never advanced. */
  {
    const { impl, calls } = stubFetch(() => ({ ok: true, status: 200, payload: { id: "msg_x" } }));
    const { writer, marked } = recordingWriter();
    const out = await deliverSeekerWelcome({ ...BASE, email: "her@example.com" }, { env: {}, writer, fetchImpl: impl });
    check("no key: skipped not failed", out.result.outcome === "skipped");
    check("no key: nothing sent", calls.length === 0);
    check("no key: sequence untouched", !out.sequenceAdvanced && marked.length === 0);
  }

  /* 5. 2xx without an id is not evidence of delivery. */
  {
    const { impl } = stubFetch(() => ({ ok: true, status: 200, payload: {} }));
    const { writer, marked } = recordingWriter();
    const out = await deliverSeekerWelcome({ ...BASE, email: "her@example.com" }, { env: ENV, writer, fetchImpl: impl });
    check("2xx without id: treated as failure", out.result.outcome === "failed");
    check("2xx without id: sequence untouched", marked.length === 0);
  }

  /* 6. Retry safety — the idempotency key is keyed on the Begin submission. */
  {
    const { impl, calls } = stubFetch(() => ({ ok: true, status: 200, payload: { id: "msg_dup" } }));
    const { writer } = recordingWriter();
    await deliverSeekerWelcome({ ...BASE, email: "her@example.com" }, { env: ENV, writer, fetchImpl: impl });
    await deliverSeekerWelcome({ ...BASE, email: "her@example.com" }, { env: ENV, writer, fetchImpl: impl });
    const keys = new Set(calls.map((c) => c.url));
    check("retry: same idempotency key both times", keys.size === 1 && calls.length === 2);
  }

  /* 7. Copy integrity — the day-three email must not carry the link again, and
        every buyer branch must exist. */
  {
    const welcome = buildSeekerWelcomeEmail({ firstName: "Evidence" });
    /* Case-insensitive: the plain-text email uses a caps section heading
       ("YOUR PRACTICE: SHAKTI WATERFALL"), which is correct for text mail. */
    check("welcome: names the practice", /shakti waterfall/i.test(welcome.text));
    check("welcome: carries the password", welcome.text.includes("Shakti108!"));
    for (const offering of ["dancing-with-durga", "shakti-embodiment", "shala-membership"] as const) {
      const built = buildBuyerWelcomeEmail({ firstName: "Evidence", offering });
      check(`buyer: ${offering} exists`, built !== null && built.text.length > 200);
      check(
        `buyer: ${offering} carries no Waterfall link`,
        !!built && !built.text.includes("vimeo.com/1231792529"),
      );
    }
    check(
      "buyer: unknown offering returns null rather than improvising",
      buildBuyerWelcomeEmail({ offering: "something-else" as never }) === null,
    );
  }

  /* 8. The over-claim caught in the 6 October preview test.

        A missing key produced a screen saying "Sheetal has been told", which
        was false: nothing had failed, so nothing had alerted her. These assert
        the distinction the UI now keys on — skipped must never alert, failed
        must always alert. */
  {
    const { impl, calls } = stubFetch(() => ({ ok: true, status: 200, payload: { id: "x" } }));
    const { writer } = recordingWriter();
    const out = await deliverSeekerWelcome(
      { ...BASE, email: "her@example.com" },
      { env: {}, writer, fetchImpl: impl },
    );
    check("skipped: Sheetal is NOT alerted", calls.length === 0 && out.result.outcome === "skipped");
  }
  {
    const { impl, calls } = stubFetch((call) =>
      String((call.body.to as string[])?.[0]).includes("sheetalkandola")
        ? { ok: true, status: 200, payload: { id: "alert" } }
        : { ok: false, status: 500, payload: { message: "boom" } },
    );
    const { writer } = recordingWriter();
    await deliverSeekerWelcome({ ...BASE, email: "her@example.com" }, { env: ENV, writer, fetchImpl: impl });
    check(
      "failed: Sheetal IS alerted",
      calls.some((c) => String((c.body.to as string[])?.[0]).includes("sheetalkandola")),
    );
  }

  const failed = results.filter((r) => !r.pass);
  for (const r of results) {
    console.log(`${r.pass ? "  PASS" : "  FAIL"}  ${r.name}${r.detail ? `  (${r.detail})` : ""}`);
  }
  console.log(`\n  ${results.length - failed.length}/${results.length} passed`);
  return failed.length === 0;
}

runResendDeliveryChecks().then((ok) => {
  if (!ok) {
    console.error("\n  RESEND DELIVERY CHECKS FAILED\n");
    (globalThis as { process?: { exit: (c: number) => void } }).process?.exit(1);
  }
});
