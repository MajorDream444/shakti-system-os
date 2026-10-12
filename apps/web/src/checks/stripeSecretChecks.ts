/* Checks for multi-secret webhook verification.

   Two Stripe endpoints point at this code, production and preview, and each
   has its own signing secret. One variable holding one value could only ever
   satisfy one of them. These assert that both are accepted, that a wrong one
   is not, and that a real signature still verifies end to end. */

import { createHmac } from "node:crypto";
import { collectSigningSecrets, offeringFromSession, parseSigningSecrets } from "../server/stripeWebhook.js";
import { handleStripeWebhook } from "../server/stripeWebhook.js";

const results: Array<{ name: string; pass: boolean; detail?: string }> = [];
const check = (name: string, pass: boolean, detail?: string) =>
  results.push({ name, pass, detail });

const PROD = "whsec_production_endpoint_secret";
const PREVIEW = "whsec_preview_endpoint_secret";

function sign(body: string, secret: string, skewSeconds = 0): string {
  const t = Math.floor(Date.now() / 1000) - skewSeconds;
  const v1 = createHmac("sha256", secret).update(`${t}.${body}`, "utf8").digest("hex");
  return `t=${t},v1=${v1}`;
}

/* Returns 200 for any Airtable call so the test exercises signature handling
   rather than the network. */
const okFetch = (async () =>
  ({ ok: true, status: 200, json: async () => ({ id: "recTEST", records: [] }), text: async () => "" })) as unknown as typeof fetch;

async function main() {
  /* Parsing */
  check("parse: single secret", parseSigningSecrets("whsec_a").length === 1);
  check("parse: comma separated", parseSigningSecrets("whsec_a,whsec_b").length === 2);
  check("parse: comma and spaces", parseSigningSecrets("whsec_a, whsec_b").length === 2);
  check("parse: newline separated", parseSigningSecrets("whsec_a\nwhsec_b").length === 2);
  check("parse: empty is none", parseSigningSecrets("").length === 0);
  check("parse: undefined is none", parseSigningSecrets(undefined).length === 0);
  check(
    "parse: no empty entries from trailing comma",
    parseSigningSecrets("whsec_a,").every(Boolean) && parseSigningSecrets("whsec_a,").length === 1,
  );

  const body = JSON.stringify({ type: "payment_intent.created", data: { object: {} } });
  const env = {
    STRIPE_WEBHOOK_SECRET: `${PROD},${PREVIEW}`,
    AIRTABLE_PERSONAL_ACCESS_TOKEN: "pat_test",
    AIRTABLE_BASE_ID: "appTEST",
  };

  /* An event type we ignore returns 200 "ignored" — which only happens AFTER
     the signature verified, so it is a clean signal that verification passed. */
  const prodRes = await handleStripeWebhook(body, sign(body, PROD), env);
  check("verify: production secret accepted", prodRes.body.status === "ignored", JSON.stringify(prodRes.body));

  const previewRes = await handleStripeWebhook(body, sign(body, PREVIEW), env);
  check("verify: preview secret accepted", previewRes.body.status === "ignored", JSON.stringify(previewRes.body));

  const wrongRes = await handleStripeWebhook(body, sign(body, "whsec_not_ours"), env);
  check("verify: wrong secret REJECTED", wrongRes.statusCode === 400, String(wrongRes.statusCode));

  const staleRes = await handleStripeWebhook(body, sign(body, PROD, 3600), env);
  check("verify: stale timestamp REJECTED (replay)", staleRes.statusCode === 400, String(staleRes.statusCode));

  const noSigRes = await handleStripeWebhook(body, "", env);
  check("verify: missing signature REJECTED", noSigRes.statusCode === 400);

  const unconfigured = await handleStripeWebhook(body, sign(body, PROD), {
    AIRTABLE_PERSONAL_ACCESS_TOKEN: "pat_test",
  });
  check("verify: no secrets configured returns 503, not 200", unconfigured.statusCode === 503);

  /* A single secret must still work — the common case, and the one in place
     today if only one endpoint's secret is pasted. */
  const singleRes = await handleStripeWebhook(body, sign(body, PROD), {
    ...env,
    STRIPE_WEBHOOK_SECRET: PROD,
  });
  check("verify: single secret still works", singleRes.body.status === "ignored");

  void okFetch;

  /* Secrets added under a DIFFERENT variable name must still be honoured.
     STRIPE_WEBHOOK_SECRET_SRI_SHAKTI was added on 9 October for Sheetal's
     replacement endpoint; a secret the code does not read fails as a bad
     signature and sends you hunting in Stripe for a fault that is not there. */
  {
    const SRI = "whsec_sri_shakti_endpoint";
    const multiEnv = {
      STRIPE_WEBHOOK_SECRET: PROD,
      STRIPE_WEBHOOK_SECRET_SRI_SHAKTI: SRI,
      AIRTABLE_PERSONAL_ACCESS_TOKEN: "pat_test",
      AIRTABLE_BASE_ID: "appTEST",
    };
    const collected = collectSigningSecrets(multiEnv);
    check("collect: finds both variable names", collected.length === 2, collected.length + " found");
    check("collect: ignores unrelated variables", !collected.includes("pat_test"));
    check(
      "collect: de-duplicates the same secret in two variables",
      collectSigningSecrets({ STRIPE_WEBHOOK_SECRET: PROD, STRIPE_WEBHOOK_SECRET_COPY: PROD }).length === 1,
    );

    const sriRes = await handleStripeWebhook(body, sign(body, SRI), multiEnv);
    check("verify: SRI_SHAKTI-named secret accepted", sriRes.body.status === "ignored", JSON.stringify(sriRes.body));

    const stillProd = await handleStripeWebhook(body, sign(body, PROD), multiEnv);
    check("verify: original secret still accepted alongside it", stillProd.body.status === "ignored");

    const stillWrong = await handleStripeWebhook(body, sign(body, "whsec_nope"), multiEnv);
    check("verify: an unknown secret is still REJECTED", stillWrong.statusCode === 400);
  }

  /* OFFERING DETECTION — the fault that cost Rachel Tisdall her first night.

     She paid $150 on 11 October, the day Dancing with Durga opened. The
     webhook worked and wrote the row, but the offering came out as "Other",
     so no welcome matched and nothing was sent. A Stripe PAYMENT LINK carries
     no metadata.offering, no client_reference_id, and an opaque plink_ id, so
     every real Payment Link purchase fell through the name matching.

     These assert the amount fallback, using her actual session shape. */
  {
    /* Exactly what Stripe sent for Rachel: USD 15000, no usable name. */
    const rachel = { currency: "usd", amount_total: 15000, payment_link: "plink_1ABCdef" };
    check(
      "offering: Rachel's real session resolves to Durga",
      offeringFromSession(rachel) === "Dancing with Durga",
      offeringFromSession(rachel),
    );

    check(
      "offering: Indian Durga price resolves",
      offeringFromSession({ currency: "inr", amount_total: 999900 }) === "Dancing with Durga",
    );
    check(
      "offering: 1:1 single session resolves",
      offeringFromSession({ currency: "usd", amount_total: 17500 }) === "Shakti Embodiment",
    );
    check(
      "offering: 1:1 six-session resolves",
      offeringFromSession({ currency: "usd", amount_total: 90000 }) === "Shakti Embodiment",
    );
    check(
      "offering: Shala membership resolves",
      offeringFromSession({ currency: "usd", amount_total: 11100 }) === "Shala Membership",
    );

    /* An explicit name must still win over the amount. */
    check(
      "offering: metadata beats the amount",
      offeringFromSession({
        currency: "usd",
        amount_total: 15000,
        metadata: { offering: "shala membership" },
      }) === "Shala Membership",
    );

    /* An unknown amount must still fall to Other rather than guess — the
       webhook then flags the row for a human instead of sending the wrong
       welcome, which is worse than sending none. */
    check(
      "offering: unknown amount is still Other",
      offeringFromSession({ currency: "usd", amount_total: 4200 }) === "Other",
    );
    check("offering: empty session is Other", offeringFromSession({}) === "Other");
    check(
      "offering: zero amount is Other",
      offeringFromSession({ currency: "usd", amount_total: 0 }) === "Other",
    );
  }

  const failed = results.filter((r) => !r.pass);
  for (const r of results) {
    console.log(`${r.pass ? "  PASS" : "  FAIL"}  ${r.name}${r.detail ? `  (${r.detail})` : ""}`);
  }
  console.log(`\n  ${results.length - failed.length}/${results.length} passed`);
  if (failed.length) {
    console.error("\n  STRIPE SECRET CHECKS FAILED\n");
    (globalThis as { process?: { exit: (c: number) => void } }).process?.exit(1);
  }
}

main();
