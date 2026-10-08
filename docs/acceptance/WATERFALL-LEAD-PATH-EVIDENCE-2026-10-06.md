# Shakti Waterfall Lead Path — Build Evidence and Verification Plan

**Branch:** `claude/waterfall-lead-path`
**Base:** `main` @ `0b742f7`
**Date:** 6 October 2026
**Governing brief:** `docs/canonical/SHAKTI-WATERFALL-LEAD-PATH-2026-10-06.md`
**Status:** PREVIEW — awaiting Major's approval. Not deployed to production.

---

## 1. Three things that must be decided before this ships

These were found by reading the existing implementation against the brief.
None of them is a code defect; each is a mismatch between what the brief
promises and what the live system does. **None has been resolved unilaterally.**

### 1.1 The practice does not arrive on completion. It arrives about three days later.

This is the most important finding in this document.

The brief's journey is *"completes the Guided Path → receives the Shakti
Waterfall Embodiment Practice by email"*. The live Airtable rhythm is:

| Automation | Trigger | Carries the Waterfall? |
|---|---|---|
| `Seeker sequence 1 — welcome reply` | record created — **immediate** | **No.** "Arrive, land, settle." |
| `Seeker sequence 2 — day three, the doorway` | daily 09:00 WITA, where Sequence Step = 1 and last email 3+ days ago | **Yes** — link and password |

So a woman who finishes the path today gets Sheetal's welcome immediately and
the practice roughly three days later.

Every line of copy on this branch is written to be **true under that rhythm**.
The confirmation screen says *"within the next few days, after Sheetal's
welcome note"*, not *"check your inbox"*. §9 of the brief permits "immediate
**or clearly timed**" delivery, so this is compliant — but it is weaker than
what Sheetal described, and it is a decision she should make rather than
inherit from how the automation happens to be built.

**Two options.**

**Option A — deliver immediately (recommended).** Move the Waterfall link and
password into `Seeker sequence 1`, so the practice arrives with the welcome.
Sequence 2 then becomes a day-three nudge without the link. Matches the
promise exactly; strongest magnet; the exchange is instant.
*Cost:* edits a live production automation. Two strings on this branch change
with it (`waterfallDeliveryWindow`, `waterfallConfirmationBody` in
`apps/web/src/data/waterfallCopy.ts`) — nothing else asserts timing.

**Option B — keep the three-day rhythm.** Ship exactly what is on this branch.
Nothing in production changes. The staged arrival arguably suits the work's own
"Shakti does not rush" register.
*Cost:* a visitor who expects an instant download waits three days, and some
will assume it failed and write in.

**This is Sheetal's call, not mine.** I have not touched the automation.

### 1.2 The brief says seven questions. The build has four.

§4 asks `/begin` to state that the path "contains seven reflective questions".
`BeginApp.tsx` renders eight stations, of which a visitor answers **four**:
three choice questions (current state, pace, support) and one written
reflection. The other four are arrival, orientation, path reveal, handoff.

Writing "seven questions" on the page would be a false statement about the
product, so the copy says **"Four short reflections."**

**Two options.** Either the copy stays accurate at four, or three questions are
added to match what Sheetal described. Accuracy wins until she rules.

### 1.3 Email is optional, and the practice cannot be sent without one.

The handoff deliberately offers "Hold Privately" — completing the path without
giving contact details. That is a founder-respecting path and has not been
removed. But the Waterfall is delivered by the seeker sequence to the **email**
field specifically; a WhatsApp number alone will not reach it, even though the
existing `hasContact` check accepts either.

Handled by stating the consequence rather than blocking: the field is no longer
labelled "(optional)", it carries the note *"Where your free Shakti Waterfall
practice is sent. Leave it blank to continue privately without the practice."*,
and **the confirmation screen branches** — it only promises the practice when a
seeker row actually saved *and* an email was given.

---

## 2. What changed

| File | Change |
|---|---|
| `src/data/waterfallCopy.ts` | **New.** Sheetal's verbatim §3 copy, naming, the exchange sentence, honest delivery window, confirmation and support copy. Single source for every surface. |
| `src/components/WaterfallInvitation.tsx` | **New.** The homepage invitation band. |
| `src/App.tsx` | Renders it immediately after the hero. |
| `src/styles/globals.css` | `.waterfall-*` styles. Every size clamped with a 1rem floor; all colours stated, never inherited. |
| `src/begin/components/Screens/Orientation.tsx` | The exchange stated before question one, as a quiet panel. |
| `src/begin/components/Screens/Handoff.tsx` | Delivery promise beside the email field; branching confirmation; support/recovery line. |
| `eslint.config.js` | Node globals for `scripts/**`, clearing 5 pre-existing errors in the smoke test. |

**The hero was not touched.** It is founder-locked to five elements from the
25 September direction; a sixth would quietly overturn her decision. The
invitation takes the first position after the fold instead.

**No second quiz, no public Vimeo page, no new database, no nurture email** —
all four excluded by §9 and none added.

---

## 3. Evidence

Production build served by `vite preview`, driven in real Chromium. Scripts:
`journey.js`, `handoff.js`, `success.js` (session scratchpad).

### 3.1 Guided Path → Waterfall, both viewports

| Check | Desktop 1440×900 | Mobile 390×844 |
|---|---|---|
| Invitation renders on homepage | PASS | PASS |
| Label / title correct | `Free Embodiment Practice` / `Shakti Waterfall` | same |
| CTA text | `Begin Your Path + Receive the Practice` | same |
| CTA lands on | `/begin` | `/begin` |
| Exchange shown **before** question one | PASS | PASS |
| Glyph overflow (measured by `Range.getClientRects`, not element boxes) | none | none |
| Anything under 16px | none | none |
| Console / page errors | none | none |

### 3.2 Confirmation state, both branches

| Scenario | Heading | Promises the practice? |
|---|---|---|
| Email given, write saved | "Your Shakti Waterfall practice is on its way" | yes — with honest timing and the support line |
| No email, held privately | "Your path is held." | **no** — correctly silent |

Also asserted on the confirmation screen: the string `vimeo` and the password
`Shakti108!` are **absent** from rendered HTML, satisfying §4's instruction not
to expose the protected URL publicly.

### 3.3 Gates

| Gate | Result |
|---|---|
| `tsc -b tsconfig.app.json` | clean |
| `npm run build` | success |
| `npm run smoke` | pass — page can mount, fonts self-hosted |
| `npm run lint` | 1566 problems, **all pre-existing**; baseline on the branch point was 1571. This branch adds **zero** and removes five. |

### 3.4 What this evidence does NOT prove

Stated plainly, because overstating verification is what damaged trust here.

- **No real seeker row was written.** Preview has no backend; the saved branch
  was proven by stubbing `/api/begin/complete` with the contract's success
  shape. That proves the UI branch, not the Airtable write.
- **The Vimeo link has not been opened logged out.** Egress from this container
  blocks Vimeo. §7 items 7–10 remain unverified and are nobody's job but a
  human with a private browser window.
- **Nothing has been deployed.** No production URL carries this.

---

## 4. Remaining acceptance tests (§7), with owners

### Guided Path → Waterfall

| # | Test | Owner | State |
|---|---|---|---|
| 1–2 | Homepage CTA → complete path, desktop + mobile | — | **PASS** (§3.1) |
| 3 | Submit a controlled test email | Major | pending preview deploy |
| 4 | Exactly one Seeker record created | Major | pending |
| 5 | Intake responses stored and linked | Major | pending |
| 6 | Waterfall delivery sends | Major | pending — **gated on decision 1.1** |
| 7–9 | Open in logged-out browser; Vimeo resolves; password documented | Major or Sheetal | **blocked here** — egress blocks Vimeo |
| 10 | Practice usable on mobile | Sheetal | pending |
| 11 | Later seeker emails do not resend the welcome | Major | pending — check `Sequence Step` advances |
| 12 | Missing-email recovery language | — | **PASS** (§3.2) |

### Stripe → Payments → Buyer Welcome

**No part of this is testable from this session.** The Stripe MCP connection
here is **M.A.I.M.** (`acct_1TLgn2BaiziDnHMm`), which is Major's account, not
Sheetal's. §7 explicitly forbids using it as evidence for hers. Egress also
blocks `srishaktishala.com` and `buy.stripe.com`.

The plan below is therefore written to be executed by a human.

| # | Step | Owner | How to tell it worked |
|---|---|---|---|
| 1 | Complete Stripe re-authentication after the country change; enable stable 2FA | Sheetal | dashboard loads without re-prompting |
| 2 | Open each of the 2 Durga payment links from her own dashboard; confirm offer name and amount | Sheetal | Global $150 USD, India ₹9,999 INR |
| 3 | Confirm the webhook endpoint exists: Developers → Webhooks → `https://www.srishaktishala.com/api/stripe-webhook` | Sheetal + Major | endpoint listed and enabled |
| 4 | Send a test event from that endpoint's page, or make a controlled live purchase and refund | Major | delivery attempt shows **2xx** |
| 5 | Confirm exactly one row lands in Payments (`tblf2kC6qHsgJMjUm`) | Major | table currently holds **0 rows** — first row is the proof |
| 6 | Re-send the same event; confirm no duplicate row | Major | still one row — idempotency key holds |
| 7 | Confirm `Buyer welcome — on payment` fired once on the right branch | Major | `list_automation_runs`, not the description text |
| 8 | Check the received email: Zoom link, dates 11/13/15/17 Oct, calendar link, Durga image | Sheetal | all resolve |
| 9 | Record evidence and the owner of failure recovery | Major | appended to this file |

**Why Payments has zero rows.** Until `4c626d2` (5 Oct) the site rendered a
blank page for four days — nobody could reach a payment link. Zero rows is
consistent with that and is **not** itself evidence the webhook is broken.
Step 4 is what settles it.

---

## 5. Release gate

Do not merge to `main` until:

1. Major approves the preview visually;
2. decision **1.1** is made — immediate delivery or the three-day rhythm;
3. decision **1.2** is made — four questions, or three more are written;
4. if Option A is chosen, the Airtable change is applied **and** the two timing
   strings in `waterfallCopy.ts` are updated in the same change.

Items 3–12 of the Guided Path tests and all of the Stripe tests can run against
a preview deployment; they do not require production.

---

# ADDENDUM — controlled seeker test, 6 October 12:22 UTC

## LAUNCH BLOCKER: Airtable cannot email anyone who is not a base collaborator

The controlled test did not prove delivery. It proved the opposite, and the
failure is not specific to the Waterfall — **it affects every customer-facing
email in the system, including Buyer Welcome.**

### What was done

One controlled row created in `Seekers` (`tblKLBelhnhTaoS6o`):

| | |
|---|---|
| Record | `rec7BJKP7tpA1cPWx` |
| Seeker ID | `SEE-WATERFALL-EVIDENCE-2026-10-06` |
| Email | `waterfall-evidence-2026-10-06@agentmail.to` (agent-controlled test inbox) |
| Created | 2026-10-06 12:22:39 UTC |

### What happened

Two automations fire on `recordCreated` for that table. Both ran at 12:22:40
UTC — **one second after creation**, from the same record:

| Automation | Recipient | Result |
|---|---|---|
| `Alert Sheetal — new Seeker` | Sheetal — **a base collaborator** | **success** |
| `Seeker sequence 1 — welcome + Shakti Waterfall` | the seeker — **not a collaborator** | **failure** |

The failure, from the run log:

```
nodeKey      wac9je8hPnMvVVAU1   (the Send Email node)
code         NODE_SPECIFIC_FAILURE
specificCode NON_COLLABORATOR_RECIPIENTS
```

Test inbox after the run: **empty, including spam.**

### Why this is conclusive

Same instant, same trigger, same record, same base. The *only* difference
between the automation that succeeded and the one that failed is whether the
recipient is a collaborator on the base. The error code states it outright.

### What it actually means

Airtable's native **Send Email** action on this base's plan will only deliver to
base collaborators. Therefore:

- **no seeker has ever received a welcome, a Waterfall, or a day-three note;**
- **no buyer would receive a welcome either** — `Buyer welcome — on payment`
  uses the same action and sends to the buyer's address;
- the "Alert Sheetal" automations work, and always have, because Sheetal is a
  collaborator. That is why the system has looked alive.

**Dancing with Durga Devi opens on 11 October, in five days.** As it stands, a
woman who pays would receive nothing automatically.

### Why this was never caught

`Seeker sequence 2` and `3` run daily and report **success** every morning —
but their `findRecords` step matches on `Sequence Step`, and no row has ever
carried the value that makes them match. A run that emails nobody still
succeeds. The green run history was real and meant nothing.

The one real non-test seeker on the base (23 September) has no `Sequence Step`
set, so no sequence has ever selected him either.

### One more consequence

The failed send halted the automation before its `updateRecord` node, so
`rec7BJKP7tpA1cPWx` has no `Sequence Step`. A failed delivery therefore leaves
the seeker in a state no later sequence will ever pick up — the failure is
silent *and* self-perpetuating.

## What has to happen, and who owns it

| # | Action | Owner |
|---|---|---|
| 1 | Decide the delivery route — see the two options below | Major + Sheetal |
| 2 | Re-run this exact test and confirm the message lands in a non-collaborator inbox | Major |
| 3 | Only then re-run the Stripe → Payments → Buyer Welcome plan in §4 | Major |

**Option A — upgrade the Airtable plan.** Paid Airtable plans lift the
collaborator restriction on the Send Email action. Smallest change by far:
nothing in the automations or the site moves, and every email already written
in Sheetal's voice starts working as built. Needs the plan confirmed against
Airtable's current limits before paying.

**Option B — send through a real email service.** Move delivery to a provider
(Resend, Postmark, SendGrid) called from a Vercel function, triggered by the
same Airtable events or directly from the Begin write. More robust long term,
gives real deliverability, bounce handling and a sending domain — but it is a
build, not a setting, and five days before Navratri it is the riskier path.

**Recommendation: Option A now, Option B later if volume justifies it.** The
emails are written, the branching is correct, and the only broken link is a
plan restriction.

## Status of the rest of this branch

Everything in §3 of this document still holds. The site work is complete and
verified: the invitation renders, the exchange is stated before the first
question, both confirmation branches behave, nothing overflows, nothing is
under 16px, and the Vimeo URL and password stay out of public HTML.

**But the confirmation screen now promises something the system cannot
deliver.** Until the sending route is fixed, this branch must not be merged —
not because the code is wrong, but because shipping it would tell a woman to
check an inbox that will stay empty.

The test row `rec7BJKP7tpA1cPWx` is left in place as evidence. Safe to delete
once this is resolved.

---

# ADDENDUM 2 — the Gmail route, and the one thing blocking it

Major's decision, 6 October: do **not** upgrade Airtable and do **not** build
Resend now. Move the four customer-facing sends to Airtable's **Gmail Send
Email** action, from Sheetal's own address, keeping every trigger, condition,
branch, link and record-update step exactly as it is.

This is the better call. Airtable's own documentation confirms free workspaces
can reach external recipients through the Gmail or Outlook action, so nothing
needs to be bought or rebuilt — and the messages arrive from an address her
women already recognise.

**Sender, confirmed by Major:** `sheetalkandola@gmail.com` — already the
reply-to on every automated email, so nothing changes from the reader's side.

## BLOCKED: no Gmail account is connected to Airtable

`list_external_accounts` returns Slack, Google Drive, Google Forms, Google
Sheets and GitHub Pull Requests. **There is no Gmail account.**

The API confirms the dependency:

> `gmailSendEmail` — Prerequisite: call `list_external_accounts` to get the
> `externalAccountId` for a Gmail account. Include it on the node.

Without that ID the action cannot be configured, and the connection is an OAuth
consent flow in the Airtable UI. **It cannot be done through the API, and it
has to be done by whoever owns the mailbox** — the emails must come from
Sheetal's address, so Sheetal signs in, or Major does if he holds that account.

### What Sheetal (or Major) needs to do — once, about two minutes

1. Open the base → **Automations**.
2. Open `Seeker sequence 1 — welcome + Shakti Waterfall` → the **Send email**
   action.
3. Change the action type to **Gmail → Send email**.
4. Click **Connect new account**, sign in as **sheetalkandola@gmail.com**, and
   grant Airtable permission to send mail.
5. Stop there and tell Claude Code. The remaining configuration is scripted.

Only step 4 matters — once that account exists, it is reusable across all four
automations and the rest is applied by API in one call each.

## What happens the moment it is connected

| # | Automation | Change |
|---|---|---|
| 1 | `Seeker sequence 1 — welcome + Shakti Waterfall` | `sendEmail` → `gmailSendEmail` + `externalAccountId`. Copy, subject, Waterfall link, password and the `updateRecord` step unchanged. |
| 2 | `Seeker sequence 2 — day three, the doorway` | same swap. Copy, doorway formula fields, `repeatingGroup` and step gate unchanged. Existing opt-out retained. |
| 3 | `Seeker sequence 3 — day seven` | same swap, **plus an opt-out line added** — it is a nurture message and currently has none. |
| 4 | `Buyer welcome — on payment` | same swap on all three sending branches. The "Other" branch has no email and is untouched. |
| — | `Alert Sheetal — new Seeker` | **unchanged.** Internal, reaches a collaborator, works today. |
| — | `Alert Sheetal — new request or signal` | **unchanged**, same reason. |

### Opt-out, per Major's instruction 3

| Message | Opt-out | Action |
|---|---|---|
| Seeker 1 | welcome/transactional — carries the practice someone asked for | none needed |
| Seeker 2 | *"reply **No, thank you**, and I'll honor that too"* | already present |
| Seeker 3 | none | **add**, in her own existing wording |
| Buyer welcome | transactional, follows a purchase | none needed |

Proposed line for Seeker 3, reusing her phrasing verbatim from Seeker 2 so the
voice does not drift:

> And if you'd rather not hear from me again, you can simply reply
> **"No, thank you,"** and I'll honor that too.

### Then, in order

5. Create a **fresh** seeker record — never rerun the failed one. Airtable
   reruns use the *old* configuration, so a rerun would prove nothing.
6. Confirm the Waterfall email arrives immediately, and that `Sequence Step`
   advances to 1 (it did not on the failed run, because the send halted the
   automation before `updateRecord`).
7. Confirm Sequence 2 cannot resend the practice — it carries no link, and the
   step gate requires `Sequence Step = 1` with the last email 3+ days old.
8. Run a controlled Buyer Welcome test before 11 October.
9. Record run IDs and screenshots here.
10. Merge and deploy only on Major's approval of the successful results.

## Test record status (instruction 9)

`rec7BJKP7tpA1cPWx` is kept as evidence and marked unmistakably:

- name → `ZZ TEST RECORD — DO NOT CONTACT`
- notes → the full failure account, including the rerun warning
- the suppression checkbox (`fldJ4jziAZG86E2Jx`) is **ticked**, which removes it
  from the `findRecords` filter in sequences 2 and 3, so it can never be picked
  up by a later send

Safe to delete once the Gmail route is verified.

## Branch status

`claude/waterfall-lead-path` @ `1d6362d`. **Not merged, not deployed.**
Preview: `https://shakti-system-63icm329l-hamal-agi.vercel.app`

The site work is finished and verified. It stays unmerged for one reason: the
confirmation screen tells a woman to check her inbox, and until the Gmail route
is live that inbox stays empty.

---

# ADDENDUM 3 — pre-flight audit, 7 October

Requested by Major while `srishaktishala.com` DNS ownership is established.
**No DNS was changed, no verification attempted, no email sent.**

| # | Requirement | Verified | Evidence |
|---|---|---|---|
| 1 | `RESEND_API_KEY` in Preview **and** Production, value not displayed | **PASS** | target `["production","preview"]`, `visibility: secret`, `decrypted: false` |
| 2 | Sender `Sheetal Kandola <hello@srishaktishala.com>`, Reply-To `sheetalkandola@gmail.com` | **PASS** | `resendClient.ts` constants; `from` composed as `${fromName} <${fromAddress}>`; `reply_to` set on every send |
| 3 | Four honest states | **PASS** | `"sent" \| "failed" \| "skipped" \| "private"` in the contract, derived in the handler |
| 4 | `Sequence Step` = 1 only after acceptance | **PASS** | `markWaterfallDelivered` is called inside the `accepted` branch only; `recordDeliveryFailure` never writes `sequenceStep` |
| 5 | No false claim that Sheetal was notified | **PASS** | screen keys on `waterfallStatus === 'failed'`; the alert send sits only in the failed branch |
| 6 | Vimeo URL and password server-side only | **PASS** | absent from every built asset; present only in `server/emailTemplates.ts` and its checks; no client module imports it |
| 7 | Tests | **PASS** | typecheck clean, build clean, 30/30 delivery checks, begin-write checks pass, smoke passes, lint 1566 vs 1571 on `main` — five fewer, none added |
| 8 | Controlled test prepared, not run | **DONE** | `WATERFALL-CONTROLLED-TEST-PROCEDURE.md` |
| 9 | Branch unmerged, production unchanged | **PASS** | `main` at `0b742f7`; branch 6 ahead, 0 behind |

## One finding from the audit

**A redeploy is required before the test, independent of DNS.**
`RESEND_API_KEY` was last updated at `1791292095`. The most recent preview
deployment was created at `1791292084` — eleven seconds earlier. Vercel injects
environment variables at deploy time, so that build cannot see the key. This is
the whole explanation for the first attempt's log line:

```
waterfall_delivery_skipped { reason: 'RESEND_API_KEY is not configured' }
```

Not a code fault, not a key fault. A build that predates its own secret.

## What the first real submission did prove

Everything except the send, which is most of the pipeline:

- one seeker row, correctly **upserted** on the existing email rather than
  duplicated;
- three intake responses created and linked;
- a progress record created;
- a Guide Request signal saved;
- `Sequence Step` correctly **left unset**, because nothing was delivered.

That last line is the behaviour that did not exist before. Under the old native
send a failure halted the automation before its state write and stranded the
seeker silently; here the absence of a step is a deliberate, recorded outcome.

It also surfaced a real defect in my own work — the screen claimed Sheetal had
been alerted when nothing had been attempted — which is now fixed and guarded
by two checks.

---

# ADDENDUM 4 — SEEKER PATH PROVEN END TO END, 7 October

The controlled test passed. This is the first time a Guided Path submission has
ever produced an email for a real address.

## Run record

| | |
|---|---|
| Preview | `shakti-system-cf69zrn1u-hamal-agi.vercel.app` |
| Commit | `26ed7fe` (app code identical to `0624559`) |
| Seeker record | `rec38s7kWz9UQUxR5` — **new row**, not an upsert |
| Recipient | `waterfall-resend-verified-07oct@agentmail.to` (fresh, empty inbox) |
| Resend message id | `01a11592-e7a3-7c27-85cd-eb4f103d66f5` |

## Results

| # | Check | Result |
|---|---|---|
| 1 | Exactly one seeker record | **PASS** |
| 2 | Intake responses stored and linked | **PASS** — 3 |
| 3 | `Sequence Step` = 1 | **PASS** — and only because Resend accepted |
| 4 | `Last Sequence At` stamped | **PASS** — `08:55:11.496Z` |
| 5 | Review flag not set | **PASS** |
| 6 | Exactly one email, none in spam | **PASS** |
| 7 | From | **PASS** — `Sheetal Kandola <hello@srishaktishala.com>` |
| 8 | Reply-To | **PASS** — `sheetalkandola@gmail.com` |
| 9 | Vimeo link and password present | **PASS** |
| 10 | Founder copy intact | **PASS** — her welcome verbatim, `Jai Ma`, `In devotion, Sheetal` |

## The number that matters

```
08:55:10   seeker record created
08:55:11   waterfall_delivered { messageId: 01a11592-… }
```

**About one second.** The three-day gap is closed, and the ordering held under
real conditions: the step advanced *after* acceptance, which is precisely the
sequence that failed silently under Airtable's native send.

## Infrastructure note

Four Resend DNS records were added at **Porkbun**. The existing Vercel and
Porkbun mail records were left untouched and nameservers were not moved, so the
live site was never at risk. Resend reports `srishaktishala.com` **Verified**.

The earlier `RESEND_API_KEY is not configured` was neither a code nor a key
fault: the preview build predated the key by eleven seconds, and Vercel injects
environment variables at deploy time.

---

# ADDENDUM 5 — BUYER WELCOME BUILT, awaiting controlled test

`47e82f7`. Built and unit-proven; **not yet exercised by a real Stripe event.**

## Design

The Payments row is written first and never rolled back. Only then is the
welcome attempted. A delivery problem cannot cost the payment record; the worst
case is a recorded buyer who has not yet heard from Sheetal, which is visible
and recoverable.

## New Payments fields

| Field | Meaning |
|---|---|
| `Welcome Sent` (existing) | Ticked **only** when Resend accepted |
| `Welcome Status` | Sent / Failed / Skipped |
| `Welcome Message ID` | Resend's id, the delivery evidence |
| `Welcome Attempted At` | When it was tried, success or not |
| `Welcome Failure Reason` | Why not — rows with text here are the queue to work |

## Idempotency, two layers

1. The webhook already returns early when a row exists for the session, so a
   Stripe retry never reaches the send.
2. Every send carries `buyer-welcome:<stripe session id>`, so even a duplicate
   that got through is de-duplicated by Resend for 24 hours.

Both Airtable write-backs are wrapped so neither can turn a successful payment
into a 500 and a Stripe retry. The handler returns 200 whatever the email did.

## Checks — 56 total, 24 new

Offering mapping both directions; Zoom link, dates and calendar link on Durga;
intake form and Calendly on the 1:1; rejection leaving the buyer unmarked with
Sheetal alerted; skips for an unknown offering and a missing address; one
idempotency key across duplicate events; no buyer email leaking the Vimeo
password.

## Not done, and owned by Major

| # | Test | Why it cannot run here |
|---|---|---|
| 1 | Hold Privately, live | Egress blocks the preview host |
| 2 | Intentional Resend failure, live | Same |
| 3 | Stripe → Payments → Buyer Welcome | Needs a Stripe test event from **Sheetal's** account; the MCP here is M.A.I.M. and §7 forbids using it as evidence |
| 4 | Vimeo opened logged out | Egress blocks Vimeo |

Procedure for all four: `WATERFALL-CONTROLLED-TEST-PROCEDURE.md`.

## Deliberately unchanged

Public contact addresses, legal copy, cancellation language, reply-to routing.
`support@`, `retreats@` and `payments@` are **not** implemented and must not be
until each forwards to Sheetal's Gmail and is tested in both directions.

Native Airtable customer sends stay in place and stay incapable of reaching a
customer, so there is no duplicate risk. Internal alerts to Sheetal unchanged.
Branch unmerged; `main` at `0b742f7`.
