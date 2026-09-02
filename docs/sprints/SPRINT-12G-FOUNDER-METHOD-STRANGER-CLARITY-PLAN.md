# Sprint 12G - Founder Method + Stranger Clarity Plan

Owner: Codex  
Mode: Pre-implementation plan for human review  
Created: 2026-09-02  
Branch: `codex/sprint-12g-founder-method-stranger-clarity`  
Base: `origin/main` after PR #19 merge, `3b2401f39d079c32d0888b9e9ff91c87b37ae7a4`

## Scope Boundary

This plan does not implement Sprint 12G. It does not redesign the site, alter backend behavior, change Airtable, enable Production writes, add commerce, publish credentials, publish testimonials, or introduce new routes.

Sprint 12G should answer five stranger questions using current approved evidence:

1. What is Shakti Shadow & Somatics?
2. How does Sheetal actually work?
3. Why Sheetal?
4. What can I receive from her?
5. Where do I begin?

## Current Stranger-Clarity Diagnosis

Sprint 12F made the offer path findable, but the core body of work still lands too late.

Current Home evidence:

- Hero subheadline says Shakti Shadow & Somatics is where "body, shadow, lineage, and neuroscience meet."
- The Method section says it bridges Western neuroscience, somatic practice, shadow integration, and classical Shakta Tantra.
- The offer gateway clearly separates "I know the doorway I want" from "Help me discern what is right."
- Founder presence identifies Sheetal Kandola and names nervous-system literacy, Somatic Experiencing-informed practice, shadow work, psychology, sensuality, and classical Shakta Tantra.

Gap:

The ingredients are named, but a stranger still may not quickly understand what happens in the work, why Sheetal's synthesis is distinct, or how free practice, Shala, circles, private work, and retreats radiate from one method rather than separate products.

Tester signal already recorded in reconciliation:

- The portal has depth and feels interactive.
- It can also feel like a "game console."
- It has too much wording.
- The offering is not simple enough before exploration.
- The tester wants to know what Shakti Shadow & Somatics actually is and why they would choose Sheetal if they do not already follow her.

## Evidence Supporting The Five Questions

| Question | Current evidence | Current status | Failure mode |
|---|---|---|---|
| What is Shakti Shadow & Somatics? | `portalCopy.hero.subheadline`; `philosophy` copy; founder bio; `goddesses.ts` method sentence. | WATCH | The definition is ingredient-based, not method-based. |
| How does Sheetal actually work? | Founder profile approves somatic therapy, pranayama/yogic breath practice, Hatha yoga, classical Shakti Tantra, shadow work, Ayurveda, embodiment practice, and sadhana. | WATCH | Public copy does not yet translate this into a concise experience sequence. |
| Why Sheetal? | Founder profile verifies Indian woman raised in the American South; Tantra/neuroscience bridge; refusal of bypassing; dark/light feminine integration; not-guru stance. | WATCH | Distinctiveness exists in source docs but is not front-loaded enough in the public page. |
| What can I receive from her? | `/offerings` lists Begin, self-guided Shala, circles, private containers, and retreats. | YES/WATCH | Offers are visible, but method-centered hierarchy needs strengthening. |
| Where do I begin? | Hero and nav expose `Start Your Shakti Path`; offer gateway gives direct offer vs discernment paths. | YES | Keep current doorway structure. |

## Source Citations / Provenance

| Source | Use in 12G |
|---|---|
| `docs/reconciliation/SHEETAL-31-AUG-FOUNDER-FEEDBACK-RECONCILIATION-v1.md` | Governs 12G as a clarity/positioning sprint, not commerce or backend. |
| `docs/reconciliation/SHAKTI-SOURCE-CONFLICT-REGISTER.md` | Applies newer founder authority over older source material while preserving provenance. |
| `docs/handoff/FOUNDER-CORRECTION-PRIVATE-WORK-CONTAINERS-2026-09-01.md` | Precedence test: no standalone private sessions; 6/9/12 private containers; 3 sessions exception-only. |
| `docs/handoff/SHEETAL-ACCEPTANCE-REVIEW-2026-08-22.md` | Confirms offer-path clarity and founder trust requirements already handled in 12F. |
| `docs/doctrine/SHEETAL-FOUNDER-PROFILE.md` | Supplies approved-for-build founder claims and blocks unverified credentials. |
| `docs/doctrine/SHAKTI-CANONICAL-VOCABULARY.md` | Governs language, especially no `somatic breathwork`, no generic Tantra, and careful use of Sanskrit/source-sensitive terms. |
| `apps/web/src/data/portalCopy.ts` | Current Home hero/founder copy. |
| `apps/web/src/data/offerings.ts` | Current offer categories and public offer-path architecture. |
| `apps/web/e2e/sprint12f-founder-acceptance.spec.ts` | Current founder acceptance and offer-path regression coverage. |

## Proposed Changes

| ID | Classification | Surface | Proposed change | Rationale | Source / boundary |
|---|---|---|---|---|---|
| G12-001 | COPY | Home hero | Replace the current abstract headline with a clearer founder-method threshold. Proposed direction: "Shakti Shadow & Somatics is Sheetal Kandola's body of work for women ready to meet the body, shadow, lineage, and nervous system without bypassing any part of themselves." | Answer WHAT within 10 seconds. | Must use approved vocabulary; avoid unsupported credentials and generic wellness claims. |
| G12-002 | COPY | Home hero body | Add one concise sentence explaining how the work happens: "Through sadhana, somatic therapy, shadow integration, yogic breath practice, and classical Shakta Tantra, Sheetal helps seekers move with readiness rather than rush." | Answer METHOD without adding a long essay. | Founder profile approves modality set; `sadhana` is approved vocabulary. |
| G12-003 | CONTENT STRUCTURE | Home top section | Reorder top-of-page story so the sequence is method first, then two entry paths, then founder trust. Do not add a new route. | Lead with the body of work before the system architecture. | Current IA preserved; this is hierarchy, not redesign. |
| G12-004 | COPY | Method section | Replace "This is not surface wellness" with a clearer method frame. Proposed direction: "A bridge between nervous-system care and classical Shakta practice." | Distinguish the method without cheap anti-wellness posture. | Tantra/neuroscience bridge is approved-for-build as paraphrase. |
| G12-005 | COPY | Method section | Add a four-part method explanation: listen to the body, meet the shadow, return to practice, choose the next doorway. | Gives a stranger a concrete sense of what happens. | Do not invent a clinical protocol or promise outcomes. |
| G12-006 | CONTENT STRUCTURE | Offer gateway | Add a short "What you can receive" ladder before offer categories: free orientation, Shala practice, circles, private containers, retreats. | Keeps offers as one ecosystem of depth/proximity, not a product catalogue. | Must preserve no-pricing/no-checkout and private-container correction. |
| G12-007 | COPY | `/offerings` intro | Clarify that offerings are expressions of one body of work. Proposed direction: "Everything here begins from Shakti Shadow & Somatics; the difference is proximity, depth, rhythm, and readiness." | Answers receiving and reduces catalogue feel. | No commerce activation. |
| G12-008 | COPY | Private work card | Preserve current 6/9/12 language; strengthen "container, not single session" only if it can be stated without sounding defensive. | Founder correction is canonical. | Do not market 3 sessions as standard. |
| G12-009 | SOURCE / GOVERNANCE | Docs | Add a note to the 12G report after implementation that newer founder corrections must be linked to the conflict register when they supersede public copy. | Makes the memory-preserving change protocol reusable inside Shakti. | No app behavior change. |
| G12-010 | TEST | Playwright | Add a `sprint12g-stranger-clarity.spec.ts` rubric that records YES/WATCH/NO for the five questions on desktop and mobile. | Turns deterministic clarity checks into review evidence. | WATCH items do not auto-fix; P0/P1 objective failures block. |
| G12-011 | TEST | Playwright/prohibited language | Extend regression guards for: no standalone private sessions, no unsupported credentials, no `somatic breathwork`, no instant checkout, no fabricated testimonials, no approved Shri Yantra claim without asset. | Protects current governance. | Do not weaken existing tests. |

## Exact Proposed Copy Directions

These are proposed directions for founder/human review before implementation. They should be tightened in code only after approval.

Home hero:

> Shakti Shadow & Somatics is Sheetal Kandola's body of work for women ready to meet the body, shadow, lineage, and nervous system without bypassing any part of themselves.

Method:

> Sheetal works at the meeting place of nervous-system care and classical Shakta practice. The work listens to the body, meets the shadow, returns to sadhana, and lets the next doorway emerge through readiness.

Offer ecosystem:

> The offerings are not separate products. They are different levels of proximity to the same work: begin privately, practice inside Shakti Shala, join held rhythm, request a private container, or prepare for retreat.

Why Sheetal:

> Sheetal translates between worlds: Indian devotional context, classical Tantra, somatic therapy, shadow integration, and modern nervous-system language. She does not ask a seeker to rise above grief, anger, fear, or the body.

Use these as draft material only. Do not add unsupported institution names, license claims, exact pricing, checkout language, public testimonial claims, or sacred asset claims.

## What Remains Unchanged

- Routes remain `/`, `/begin`, `/shala`, `/offerings`, `/about-sheetal`, and `/testimonials`.
- Begin scoring and server-owned pathway behavior remain unchanged.
- `/api/begin/complete` and `/api/request-signal` remain unchanged.
- Production writes remain disabled unless separately approved.
- No Airtable schema/data changes.
- No payments, deposits, checkout, or commerce.
- No testimonial ingestion.
- No approved Shri Yantra substitution.
- No credential expansion without source verification.
- No Shala membership, pricing, event schedule, or community platform.

## Progressive-Disclosure Strategy

12G should reduce apparent complexity by changing the order and density of meaning, not by removing depth.

Recommended order:

1. Clear method statement.
2. One-sentence "how Sheetal works."
3. Two entry paths: Start Your Shakti Path or Work With Sheetal.
4. Founder trust.
5. Method depth for curious readers.
6. Offer ecosystem by proximity/readiness.
7. Shala/retreat pathways.

The Home page should say less in each block but answer the first question faster. Deeper context can remain behind `/about-sheetal`, `/offerings`, knowledge chambers, and Shala rooms.

## Conflict Flags

| Conflict | Status | 12G handling |
|---|---|---|
| Private single-session language vs Sept 1 correction | Resolved for public app | Preserve current correction and tests. |
| Month-based private mentorship vs 6/9/12 session containers | Needs founder decision | Do not publish month-based mentorship as current offer. |
| Pricing from historical docs vs no commerce approval | Needs commerce sprint | Do not add prices or checkout. |
| Credentials from summarized sources | Blocked | Do not publish MSc/institution/license claims. |
| Shri Yantra visual request | Blocked by founder asset | Do not recreate geometry. |
| Testimonials exist vs permission unknown | Blocked by source/permission | Do not publish testimonials. |

## Credential Boundaries

Allowed for current public copy:

- Sheetal Kandola.
- Founder of Shakti Shadow & Somatics and Shakti Shala.
- Indian woman raised in the American South.
- Somatic Experiencing-informed practice.
- Nervous-system literacy.
- Somatic therapy / somatic work where context is accurate.
- Shadow integration.
- Classical Shakta Tantra where context is supported.

Blocked until verified:

- MSc Global Mental Health.
- King's College London.
- LSHTM.
- License/certificate names.
- "Certified" or "licensed" claims unless the exact title and issuing body are approved.
- Punjab / second-generation American unless directly confirmed.

## Acceptance Criteria

Before 12G can be called implemented:

- A first-time visitor can answer the five stranger questions from Home and `/offerings` without opening internal docs.
- The primary Begin doorway remains obvious.
- The direct Work With Sheetal doorway remains obvious.
- The offer ecosystem reads as one body of work at different depth/proximity levels.
- Private work remains container-based; no single-session language leaks into public offers.
- No new backend, Airtable, commerce, payment, credential, testimonial, sacred-asset, or Shala-membership behavior is added.
- Mobile preserves the same method-first narrative order.
- Playwright produces desktop and mobile evidence for the stranger-clarity rubric.

## Playwright Regression Strategy

Add a focused Sprint 12G test file:

`apps/web/e2e/sprint12g-stranger-clarity.spec.ts`

Required checks:

- Home visibly answers WHAT with `Shakti Shadow & Somatics`.
- Home visibly answers METHOD with body / shadow / nervous-system / Shakta practice language.
- Home exposes WHY SHEETAL through founder, lived context, and bridge language.
- `/offerings` exposes what can be received without implying checkout.
- `Start Your Shakti Path` remains visible on desktop and mobile.
- `Work With Sheetal` remains visible on desktop and mobile.
- No prohibited public language appears.
- Existing 12F tests still pass.

Rubric output should mark:

- YES for objective text/route evidence.
- WATCH for taste or founder-feel questions.
- NO only for broken or absent required evidence.

## Explicit Non-Goals

- No visual redesign.
- No new IA.
- No backend changes.
- No Vault build.
- No testimonial ingestion.
- No credential verification.
- No commerce implementation.
- No Shakti Shala pricing.
- No retreat scheduling.
- No goddess/initiation sequencing.
- No Production activation.
- No invented founder truth.

## Implementation Authorization Readiness

Sprint 12G is ready to authorize only after human review approves:

1. The method-first copy direction.
2. Whether the proposed "Why Sheetal" language is accurate enough.
3. Whether Shakta/Tantra wording should remain at the top of the page or be progressively disclosed.
4. Whether "sadhana" is appropriate in public first-screen language or should appear in the method section instead.
5. Whether the "not separate products" sentence should appear publicly or be softened.

Until then, this branch should contain only this planning artifact.
