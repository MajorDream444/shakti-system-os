/* Checks for the signed, expiring guide links.

   These guard a paid product, so the failure cases matter more than the happy
   path. The rule throughout: when anything is wrong, refuse. */

import { mintGuideToken, verifyGuideToken } from "../server/signedLinks.js";

const results: Array<{ name: string; pass: boolean; detail?: string }> = [];
const check = (n: string, p: boolean, d?: string) => results.push({ name: n, pass: p, detail: d });

const SECRET = "test_guide_secret_not_real";
const OTHER = "a_different_secret";
const DOC = "navratri-companion";
const at = (iso: string) => () => new Date(iso);

function main() {
  /* Happy path */
  const token = mintGuideToken({ recipient: "Her@Example.com ", document: DOC, expiresInDays: 30 }, SECRET);
  check("mint: returns a token", typeof token === "string" && token!.includes("."));

  const ok = verifyGuideToken(token!, SECRET);
  check("verify: a fresh token is valid", ok.valid);
  check(
    "verify: recipient is normalised and carried",
    ok.valid && ok.payload.r === "her@example.com",
    ok.valid ? ok.payload.r : "",
  );
  check("verify: document is carried", ok.valid && ok.payload.d === DOC);

  /* No secret: mint refuses rather than returning an unsigned link, and
     verify refuses rather than serving the document. */
  check("mint: no secret returns null, never an unsigned link", mintGuideToken({ recipient: "a@b.c", document: DOC, expiresInDays: 30 }, undefined) === null);
  const unconf = verifyGuideToken(token!, undefined);
  check("verify: no secret FAILS CLOSED", !unconf.valid && unconf.reason === "unconfigured");

  /* Forgery */
  const wrongKey = verifyGuideToken(token!, OTHER);
  check("verify: a token signed with another key is rejected", !wrongKey.valid && wrongKey.reason === "bad_signature");

  const [payloadPart, sig] = token!.split(".");
  /* Edit the recipient to someone else and keep the old signature. */
  const tamperedPayload = Buffer.from(
    JSON.stringify({ r: "someone.else@example.com", d: DOC, x: 9999999999 }),
    "utf8",
  ).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const tampered = verifyGuideToken(`${tamperedPayload}.${sig}`, SECRET);
  check("verify: editing the recipient invalidates it", !tampered.valid && tampered.reason === "bad_signature");

  /* Push the expiry far into the future and keep the old signature. */
  const stretched = Buffer.from(JSON.stringify({ r: "her@example.com", d: DOC, x: 99999999999 }), "utf8")
    .toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
  const stretchedResult = verifyGuideToken(`${stretched}.${sig}`, SECRET);
  check("verify: extending the expiry invalidates it", !stretchedResult.valid && stretchedResult.reason === "bad_signature");

  /* Expiry actually bites */
  const shortLived = mintGuideToken(
    { recipient: "her@example.com", document: DOC, expiresInDays: 7 },
    SECRET,
    at("2026-10-12T00:00:00Z"),
  );
  check(
    "expiry: valid the day before it lapses",
    verifyGuideToken(shortLived!, SECRET, at("2026-10-18T00:00:00Z")).valid,
  );
  const lapsed = verifyGuideToken(shortLived!, SECRET, at("2026-10-20T00:00:00Z"));
  check("expiry: REFUSED after the date", !lapsed.valid && lapsed.reason === "expired");

  /* A token for one document must not open another */
  const otherDoc = mintGuideToken({ recipient: "her@example.com", document: "some-other-ebook", expiresInDays: 30 }, SECRET);
  const otherDocResult = verifyGuideToken(otherDoc!, SECRET);
  check(
    "document: a token for another document carries that name, so the endpoint can refuse it",
    otherDocResult.valid && otherDocResult.payload.d === "some-other-ebook",
  );

  /* Malformed input must never throw */
  for (const [label, bad] of [
    ["empty", ""],
    ["no dot", "justsomestring"],
    ["dot only", "."],
    ["garbage payload", "!!!!.aaaa"],
    ["undefined", undefined],
  ] as Array<[string, string | undefined]>) {
    let threw = false;
    let valid = true;
    try {
      valid = verifyGuideToken(bad, SECRET).valid;
    } catch {
      threw = true;
    }
    check(`malformed (${label}): refused without throwing`, !threw && !valid);
  }

  const failed = results.filter((r) => !r.pass);
  for (const r of results) console.log(`${r.pass ? "  PASS" : "  FAIL"}  ${r.name}${r.detail ? `  (${r.detail})` : ""}`);
  console.log(`\n  ${results.length - failed.length}/${results.length} passed`);
  if (failed.length) {
    console.error("\n  SIGNED LINK CHECKS FAILED\n");
    (globalThis as { process?: { exit: (c: number) => void } }).process?.exit(1);
  }
}

main();
