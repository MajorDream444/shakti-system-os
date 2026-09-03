# Sprint 12H - Dancing with Durga Shakti Shala Activation Plan

Owner: Codex
Mode: Architecture planning only
Created: 2026-09-03
Status: HUMAN REVIEW REQUIRED
Do not implement from this plan until approved.

## Purpose

Establish the current canonical commercial and access truth for the next Shakti workstream:

```text
Navratri
-> Dancing with Durga
-> participant access
-> completion
-> Shakti Shala invitation
-> simple application
-> human discernment
-> paid Shala membership
-> ongoing rhythm
```

Sprint 12G remains separate and should not be modified by this plan.

## Source Packet

| Source | Role |
|---|---|
| `docs/founder-source/FOUNDER-SOURCE-NAVRATRI-SHAKTI-SHALA-ACTIVATION-2026-09-02.md` | First direct founder signal that Navratri may activate Shakti Shala. |
| `docs/founder-source/FOUNDER-SOURCE-DANCING-WITH-DURGA-2026-09-03.md` | Direct founder offer material for Dancing with Durga. |
| `docs/founder-source/FOUNDER-SOURCE-COMMERCE-ACCESS-REFINEMENT-2026-09-03.md` | Reported founder clarification on access, membership, and private-work pricing. |
| `docs/reconciliation/SHAKTI-SOURCE-CONFLICT-REGISTER.md` | Current conflict and supersession register. |

## Current Canonical Planning Truth

### Offer

| Item | Current status |
|---|---|
| Offer name | Recommended: `Dancing with Durga: Devotion with a Spine`; final title still needs human approval. |
| Campaign refrain | `Durga. Devotion. Dharma.` |
| Container | 9-night Navratri sadhana. |
| Audience | Women-only. |
| Center | Maa Durga / Navadurgas. |
| Live gatherings | Five live online gatherings. |
| Non-live nights | Four shorter mantra, audio transmission, reflection, or embodiment practices. |
| Live time | 7:30-9:00 PM IST. |
| Live dates | Oct 11, 13, 15, 17, 19; year/date labels require final confirmation before publication. |
| Visual world | Sindoor red, blood red, oxblood, black, antique gold, Maa Durga, eyes, lion, trishul, sword, red hibiscus. |
| Visual prohibition | No soft pastel or generic divine feminine aesthetic. |

### Investment

| Region / path | Price |
|---|---:|
| Global Early Devotion, first 9 women | `$111` |
| Global Standard | `$222` |
| India-resident Early Devotion, first 9 women | `₹6,666` |
| India-resident Standard | `₹9,999` |
| Gifted scholarship | 1 place |
| Supported-price places | 2 places |

Pricing is founder-supplied for planning, but checkout/payment implementation still requires an approved commerce sprint.

### Access Contract

```text
Dancing with Durga purchase
-> live Navratri container
-> recordings
-> materials and practices
-> temporary community / Shala space
-> container ends
-> non-member retains recording/material access for 2 months
-> aligned women may be invited toward Shakti Shala
-> simple application
-> human discernment
-> paid Shakti Shala membership
-> Dancing with Durga library remains available while membership remains active
```

### Shakti Shala Founding Membership

| Item | Status |
|---|---|
| First founding cohort | Working: first 10 women. |
| Monthly price | Working: `$11/month`. |
| Annual price | Working: `$111/year`. |
| Founding rate duration | BLOCKED: needs founder decision. |
| Monthly minimum commitment | WORKING: six-month minimum possible, not public. |
| Membership conversion | Not automatic; requires invitation, simple application, human discernment, then payment. |

### Private Work Pricing

The Sept 3 refinement supersedes the Sept 1 no-standalone-session correction for planning.

| Path | Current founder price |
|---|---:|
| Standalone private session | `$200` |
| 3-session container | `$450` |
| 6-session container | `$900` |
| 9-session container | `$1,350` |
| 12-session container | `$1,800` |

Do not implement public pricing or checkout yet.

## Required System Contracts Before Implementation

1. Offer contract: final title, dates, inclusions, exclusions, support places, pricing, refund/cancellation terms.
2. Registration contract: required data, consent, region selection, supported-price/scholarship requests.
3. Payment contract: provider, idempotency, currency handling, payment states, receipts, refunds.
4. Participant access contract: DWD Participant state, content access window, non-member expiry, member continuation.
5. Shala transition contract: invitation, simple application, human review, payment, membership activation.
6. Content contract: recordings, materials, practices, storage, library status after container.
7. Communications contract: confirmations, reminders, non-live transmissions, completion, Shala invitation.
8. Operations contract: who reviews scholarship/support applications and Shala continuation.

## Implementation Order After Human Approval

1. Launch materials first: public page, carousel/story/message assets, source-safe visual system.
2. Registration/payment architecture: no browser secrets, server-side validation, clear price paths.
3. Participant operations: Airtable/event records, communication rhythm, support/scholarship queue.
4. Shala transition: invitation/application/human discernment, not automatic membership.
5. Ongoing membership: founding cohort, payment, access continuity, library retention.

## Hard Boundaries

Do not implement in this planning pass:

- app route changes
- checkout
- payment links
- Stripe activation
- Airtable mutations
- Access Grant writes
- Shakti Shala membership state
- production writes
- generated deity art as production asset
- automatic Shala acceptance
- retreat applications

## Immediate Human Review Questions

1. Is `Dancing with Durga: Devotion with a Spine` the final public title?
2. Are Oct 11, 13, 15, 17, and 19 the 2026 live dates?
3. Is the generated visual reference allowed only as mood/reference, or can any generated artwork be public after editing?
4. What does "temporary community / Shala space" mean operationally?
5. Does DWD purchase include live recordings for all participants?
6. How long is founding Shala pricing protected?
7. Is there a six-month minimum for monthly Shala membership?
8. Who reviews scholarship/support requests?
9. Who decides Shala continuation alignment?
10. What are refund/cancellation terms?

## Build Readiness

Planning: READY FOR HUMAN REVIEW.
Implementation: NOT YET APPROVED.
Commerce: NOT YET APPROVED.
Production: NOT ENABLED.
