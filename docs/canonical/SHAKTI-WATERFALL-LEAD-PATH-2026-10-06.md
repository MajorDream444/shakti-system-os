# Shakti Waterfall Lead Path — Founder Direction and Launch Closure

**Status:** ACTIVE CANONICAL BUILD DIRECTION — amended 6 October with Major's implementation decisions (§13)  
**Date:** 6 October 2026  
**Founder source:** Sheetal Kandola  
**Meeting:** [Sheetal in India — 6 October 2026](https://fathom.video/share/ngxYGac7XLP3KP66ZLp6xV8Ga3QNxKvG)  
**Applies to:** homepage, `/begin`, seeker capture, Waterfall delivery, launch verification, and handoff  
**Repository:** `MajorDream444/shakti-system-os`

> This record contains the implementation-relevant decisions and founder copy from the October 6 call. The raw transcript is intentionally not committed because this repository is public and the call contains personal and unrelated material.

## 1. Governing decision

Sheetal wants the existing **Shakti Waterfall Embodiment Practice** to become the visible exchange for completing the existing Guided Path.

This is not a new generic course, a separate funnel, or a public Vimeo page.

The intended exchange is:

```text
Visitor sees a clear invitation
→ begins the existing seven-question Guided Path
→ supplies name and email
→ receives the Shakti Waterfall Embodiment Practice by email
→ continues into the existing seeker follow-up rhythm
```

Founder intent:

- make the free practice visible before the visitor begins;
- give a clear, low-friction reason to complete the Guided Path;
- let the practice introduce people to Sheetal's work experientially;
- capture contact information for future containers, offerings, and retreats;
- let Sheetal's social team direct people to one coherent website entry point.

This is a magnet and an introduction to the medicine, not a manipulative urgency device.

## 2. Canonical offer identity

**Public label:** Free Embodiment Practice  
**Practice title:** Shakti Waterfall  
**Full operational title:** Shakti Waterfall Embodiment Practice

Recommended promise, derived directly from Sheetal's direction:

> Complete the short Guided Path and receive Shakti Waterfall, a free Tantric somatic embodiment practice created to help you return to your Shakti, your body, and yourself.

Do not call it a course unless Sheetal later does. The founder used **practice**, **embodiment practice**, and **free embodiment practice**.

## 3. Founder-written copy

The following copy was supplied by Sheetal after the call. Preserve her voice. Editorial changes are limited to punctuation, spacing, and format unless she approves substantive revision.

### FREE EMBODIMENT PRACTICE

## SHAKTI WATERFALL

*A Tantric somatic practice to return to your Shakti, your body, and yourself.*

Shakti Waterfall is a fluid, sensual embodiment practice rooted in somatic awareness, Tantra, breath, and feminine embodiment. Through touch, breath, movement, sensation, and intentional presence, we awaken the body's innate intelligence and create space to soften, feel, receive, and move energy.

This is an invitation to resource yourself through the body, regulate the nervous system, release what has been held, and reconnect with the deeper currents of your feminine being.

You will be guided to anchor into your feminine intelligence, awaken your life force, cultivate sensual awareness, and inhabit your sovereignty from the inside out. Returning to what is already alive within you.

Let the body become the temple.

**Come home to your Shakti.**

### Editorial restraint

The supplied source had `inside out.Returning`; this record normalizes the missing space and treats “Returning to what is already alive within you” as a sentence fragment for cadence. Do not otherwise rewrite the founder copy silently.

## 4. Required public surfaces

### Homepage

Add one visible invitation into the existing Guided Path. It must make the free practice legible without turning the homepage into a long sales page.

Minimum content:

- `Free Embodiment Practice`
- `Shakti Waterfall`
- one concise sentence explaining the exchange;
- CTA into `/begin`.

Recommended CTA:

`Begin Your Path + Receive the Practice`

Acceptable shorter CTA if layout requires it:

`Begin Your Path`

If the shorter CTA is used, nearby copy must still state that completion delivers the free practice.

### `/begin` opening

Before the first question, state:

- this is a short Guided Path;
- the visitor receives Shakti Waterfall by email after completion.

**No question count is stated.** This record originally said "seven reflective
questions"; the build has four, and rather than print a number that is wrong
today and fragile tomorrow, the count is not claimed at all. See §13.2.

Do not add a pop-up, forced modal, countdown, or manipulative scarcity language.

### Email-capture step

Repeat the delivery promise next to the email request. Do not collect an email without explaining why it is needed.

### Completion state

Recommended message:

> **Your Shakti Waterfall practice is on its way**  
> Check your inbox — it arrives with Sheetal's welcome note. This is an invitation to soften, feel, receive, and return to what is already alive within you.

This is literally true as of §13.1: the practice is delivered by Seeker
sequence 1 on record creation, not three days later.

Provide a support/failure instruction if delivery does not arrive. Do not expose the protected Vimeo URL in public HTML merely to make the confirmation screen feel complete.

### Email delivery

Recommended subject:

`Your Shakti Waterfall embodiment practice`

The email must:

- identify the practice clearly;
- include the verified Vimeo access route;
- include a password if the logged-out viewer requires one;
- avoid tracking parameters when they are not operationally necessary;
- preserve Sheetal's language;
- allow the existing seeker rhythm to continue without duplicate sends.

## 5. System behavior and ownership

| Stage | System record | Automated action | Human owner | Evidence required |
|---|---|---|---|---|
| Visitor begins | Begin session | Preserve existing path state | System | Session persists through questions |
| Visitor completes | Seeker + intake records | Store answers and contact | System | One new seeker and linked responses |
| Email captured | Seeker record | Deliver Waterfall promptly | System | Delivery/run log succeeds |
| Practice opened | No new promise unless tracked lawfully | Existing follow-up rhythm continues | System + Sheetal | Logged-out access test |
| Visitor requests support | Request/signal or support route | Notify appropriate owner | Sheetal/team | Clear recovery response |
| Social promotion | Existing site entry point | None | Sheetal's social team | Correct URL and promise |

Do not create a second lead database or parallel freebie system.

## 6. Known current state

As of the October 6 direction:

- the Guided Path already captures seeker and intake data;
- Airtable seeker automations are ON;
- the Shakti Waterfall Vimeo link already exists in the seeker sequence — it sat in sequence 2 (day three) until 6 October and now sits in sequence 1 (immediate), per §13.1;
- prior descriptions claiming the automations were switched off were stale text, not live state;
- the remaining Waterfall question is whether a logged-out viewer can open the Vimeo link and whether a password is required;
- the Payments table previously contained zero rows, so Buyer Welcome had not had a real payment-triggered rehearsal;
- Sheetal is re-authenticating Stripe after a country change and needs to confirm the payment links from her Stripe dashboard.

Runs/history, not automation descriptions, are the source of truth for Airtable live state.

## 7. Launch-critical acceptance tests

Do not report this path complete until all applicable tests have evidence.

### Guided Path → Waterfall

1. Start from the public homepage CTA.
2. Complete all seven questions on desktop and mobile.
3. Submit a new controlled test email.
4. Confirm exactly one Seeker record is created.
5. Confirm the related intake responses are stored.
6. Confirm the Waterfall delivery sends promptly.
7. Open the email in a logged-out/private browser.
8. Confirm the Vimeo link resolves.
9. Confirm and document whether a password is required.
10. Confirm the practice is usable on mobile.
11. Confirm later seeker emails do not resend the same welcome unexpectedly.
12. Test the missing-email/support recovery language.

### Stripe → Payments → Buyer Welcome

1. Sheetal completes Stripe re-authentication and 2FA.
2. Confirm each production Payment Link opens and reflects the intended offer and amount.
3. Use Stripe test mode or an approved controlled live purchase/refund.
4. Confirm the webhook returns a successful delivery.
5. Confirm exactly one Payments row lands.
6. Confirm idempotent retry does not create a duplicate.
7. Confirm Buyer Welcome fires exactly once with the correct offer branch.
8. Confirm links, dates, and access instructions in the email.
9. Record the test evidence and owner of failure recovery.

Do not use Major's M.A.I.M. Stripe connection as evidence for Sheetal's Stripe account.

## 8. Dependencies and decision rules

### Sheetal

- complete Stripe re-authentication;
- enable a stable 2FA method;
- confirm the live payment links in her account;
- provide or confirm the Vimeo password if one is required.

### Major / implementation team

- add the visible Waterfall promise to the approved public surfaces;
- preserve the existing Guided Path rather than building a second form;
- run and document the controlled seeker test;
- coordinate the controlled payment/webhook test;
- verify current `main`, Vercel production, and Airtable run history;
- update handoff documentation with evidence.

### Sheetal's social team

- create promotion directing visitors to the website Guided Path;
- use the approved offer name and promise;
- do not publish the protected Vimeo URL directly.

## 9. Scope boundary

### Launch-critical

- visible Waterfall invitation;
- clear questionnaire exchange;
- immediate or clearly timed email delivery;
- logged-out Vimeo verification;
- Stripe re-authentication;
- payment-link and webhook test;
- buyer-welcome test;
- mobile and failure-path verification;
- operational documentation.

### Later / Phase 2

- nurture email for people who received Waterfall but did not join;
- retreat campaign for the newly selected India riverfront venue;
- behavioral analytics beyond necessary operational evidence;
- expanded content library;
- new free-course architecture;
- additional scoring, segmentation, or personalization.

The unfinished “For those who haven't joined yet” email remains unbuildable until Sheetal completes it and any referenced founding price is verified against the public offer and Stripe.

## 10. Privacy and source handling

The October 6 call also included private personal context, travel, health, community feedback, retreat impressions, and Major's unrelated projects. Those details are not required to implement this lead path and must not be copied into public pages, application data, or additional repository transcripts.

The implementation-relevant retreat fact is limited to:

- Sheetal selected a riverfront property in India as a promising women's-retreat venue;
- it belongs in the Retreat Pipeline / Future Activation layer;
- it is not part of this launch-critical Waterfall change.

## 11. Claude Code execution brief

Before changing code:

1. Read `AGENTS.md`.
2. Read `graphify-out/GRAPH_REPORT.md` if present. It is referenced by repository policy but was not present on `main` when this record was added; regenerate/update Graphify before relying on cross-module assumptions.
3. Read `CODEX.md`.
4. Read `docs/doctrine/SHEETAL-DIRECTION-2026-09-25.md`.
5. Read this document.
6. Read `docs/handoff/HANDOVER-2026-09-30-WEEK-IN-REVIEW.md`, including the October corrections.
7. Inspect current `main`, not an old Claude branch.
8. Inspect existing Begin, seeker-write, email, and webhook implementations before proposing additions.

Delivery protocol:

- create a bounded branch from current `main`;
- present a visual preview before production release if public layout changes materially;
- use real founder copy;
- keep the 16px reading floor;
- measure rendered glyphs and shaped-container boundaries;
- test desktop and mobile;
- verify required assets exist in the pushed tree;
- run lint, production build, type-check, and the relevant journey tests;
- document evidence;
- do not deploy to production without Major's approval.

## 12. Definition of done

This change is done when:

```text
A stranger can see the free Shakti Waterfall invitation
→ understand the exchange
→ complete the existing Guided Path
→ receive and open the practice
→ enter the correct seeker rhythm

AND

a controlled payment proves
Stripe → webhook → Payments → Buyer Welcome
```

After evidence is recorded, freeze non-critical expansion and move this first build layer from **BUILD** into **HANDOFF**.

---

## 13. Implementation decisions — Major, 6 October

Three contradictions surfaced when this brief was read against the running
system. Major resolved all three. This section records the decisions and what
was changed, so the document describes the system that exists.

### 13.1 Delivery is immediate (Option A)

**Found:** the practice did not arrive on completion. `Seeker sequence 1` fired
immediately with Sheetal's welcome and carried no link; the Waterfall sat in
`Seeker sequence 2 — day three`, which runs daily over seekers whose last email
was 3+ days old. A woman finishing the path waited roughly three days.

**Decision:** deliver immediately. Sheetal described the practice as the reward
for completing the path; a three-day gap weakened both the promise and the
lead-generation purpose.

**Changed, in live Airtable:**

| Automation | Before | After |
|---|---|---|
| `Seeker sequence 1` | welcome only | welcome **+ Waterfall link and password**, renamed *welcome + Shakti Waterfall* |
| `Seeker sequence 2` | carried the link | **refers back** to the practice, delivers nothing |

No seeker receives the link twice. `Seeker sequence 3` already referred back to
the practice and needed no change. Both edits validate; neither automation's
trigger, filter or step-gating was altered.

**Coupling:** the site asserts immediate delivery in exactly two strings —
`waterfallDeliveryWindow` and `waterfallConfirmationBody` in
`apps/web/src/data/waterfallCopy.ts`. If delivery ever moves again, those move
with it. Nothing else in the codebase claims timing.

### 13.2 No question count is claimed

**Found:** §4 asked `/begin` to say "seven reflective questions". `BeginApp`
renders eight stations, of which a visitor answers four.

**Decision:** do not add three artificial questions, and do not print a number.
Say "a short Guided Path" or "guided reflection". The experience can evolve
without making the copy false.

§4 above is corrected in place. No numeric claim exists anywhere in
`apps/web/src/` — verified by search.

### 13.3 Hold Privately is preserved, and the exchange is stated plainly

**Found:** the email field was optional, and the Waterfall can only be sent to
an email — a WhatsApp number will not reach it, though the existing contact
check accepts either.

**Decision:** keep the private path. Require email only to receive the practice.

**Implemented:**

- the field is no longer labelled "(optional)";
- beside it: *"Enter your email to receive Shakti Waterfall, or continue
  privately without email."*;
- the confirmation **branches** — it promises the practice only when a seeker
  row actually saved **and** an address was given. Someone who holds privately
  is told plainly that no email was sent and how to ask for the practice later.

### 13.4 Status of this brief

§1–§12 remain the founder direction. §13 is what was built. Where the two
disagree, §13 describes the running system and §1–§12 record what was asked
for. Evidence lives in
`docs/acceptance/WATERFALL-LEAD-PATH-EVIDENCE-2026-10-06.md`.
