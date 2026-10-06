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
