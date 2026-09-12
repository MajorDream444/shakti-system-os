# Sprint 12J - Public Identity, Doctrine, and Visual Integration Plan

Owner: Major / Sheetal
Prepared by: Codex
Repository: `MajorDream444/shakti-system-os`
Status: IMPLEMENTATION CONTRACT FOR NEXT SPRINT
Current pass runtime impact: NONE

## Objective

Integrate the founder-approved public identity, method clarity, five-pillar architecture, sovereignty direction, Waterfall placement, and Goddess Temple visual boundary into the existing public experience without rebuilding the entire site.

This plan authorizes a future bounded implementation sprint. It does not implement 12J.

## Governing Source

- `docs/acceptance/SPRINT-12I-FOUNDER-BRAND-BOUNDARY-ACCEPTANCE.md`
- `docs/brand-system/FOUNDER-VISUAL-SOURCE-v2-2026-09-11.md`
- `docs/founder-source/FOUNDER-SOURCE-SHEETAL-IN-PERSON-REVIEW-2026-09-05.md`
- `docs/reconciliation/SHAKTI-SOURCE-CONFLICT-REGISTER.md`
- `docs/doctrine/SHAKTI-FOUNDER-METHOD-DOCTRINE-v1.md`
- `docs/brand-system/BRAND-ARCHITECTURE-DECISION-SHRI-SHAKTI-SHALA-v1.md`

Operating principle:

```text
Founder feedback should change canonical truth before it changes software.
```

## Stranger-Clarity Requirement

A new visitor should be able to answer:

1. Who is Sheetal?
2. What is Shakti Shadow & Somatics?
3. What is Shri Shakti Shala?
4. What are the five pillars?
5. How does Sheetal work?
6. What can I receive?
7. Where do I begin?

Do not make the website explain the internal `Shakti System OS`.

## Approved Integration Boundary

Public identity:

- `Shri Shakti Shala` = public umbrella / living school / sanctuary / community ecosystem.
- `Shakti Shadow & Somatics` = Sheetal's body of work / method.
- `Shakti System OS` = internal operating architecture.

Five pillars:

- Shakti.
- Shadow.
- Sensuality.
- Somatics.
- Sovereignty.

Sovereignty:

- Treat as one of the five pillars.
- Treat as a direction/outcome of practice.
- Do not make guaranteed transformation or therapeutic claims.

Waterfall:

- Treat as emergent founder doctrine with visual support from founder-selected waterfall/water imagery.
- Do not manufacture a proprietary multi-step branded framework.
- Begin carefully where already supported by the Shakti Waterfall front-door concept and founder imagery.

Goddess Temple visual boundary:

- Living Goddess temple grounded in Sheetal's embodied world.
- Use founder-selected photography intentionally, not decoratively.
- Red/maroon/gold, water, jungle, flowers, temple context, movement, fierceness and tenderness.
- Keep darkness as threshold/depth, not the continuous default.

## Surface Scope

### `/`

Purpose:

- Make the public identity and method legible fast.
- Move from generic portal feeling toward founder-grounded sanctuary.

Bounded changes:

- Introduce `Shri Shakti Shala` as the living place/sanctuary if copy review approves exact wording.
- Clarify `Shakti Shadow & Somatics` as the method/body of work.
- Add or refine the five-pillar orientation without making the homepage a doctrine wall.
- Use one or two high-value founder-selected images with explicit roles.
- Keep `Start Your Shakti Path` obvious.

### `/begin`

Purpose:

- Preserve the eight-station threshold and First Living Seeker backend boundaries.
- Let public identity support orientation without adding friction.

Bounded changes:

- Use visual source v2 as threshold/nature/water/founder atmosphere where helpful.
- Avoid campaign-specific Durga treatment unless contextually relevant.
- Preserve server-derived pathway, consent, idempotency, local-only anonymous journeys, and secure write boundary.

### `/shala`

Purpose:

- Make the sanctuary feel more like `Shri Shakti Shala` while preserving room architecture.

Bounded changes:

- Update public naming/orientation copy if approved.
- Clarify current room state and sanctuary map in founder-language terms.
- Use temple/nature/founder visual lineage sparingly and intentionally.
- Do not introduce membership automation or access grants.

### `/offerings`

Purpose:

- Help strangers understand ways to enter the body of work.

Bounded changes:

- Reframe offers under the public identity and method hierarchy.
- Preserve current commerce boundaries.
- Do not publish checkout, unconfirmed DWD schedule deltas, or unsupported pricing changes.
- Keep private-work language aligned with current source governance.

### `/about-sheetal`

Purpose:

- Anchor trust in Sheetal's lived synthesis without credential stacking.

Bounded changes:

- Use founder-selected portrait/practice/context imagery.
- Clarify Punjabi Indian founder identity if current approved copy supports it.
- Keep unsupported institutional/credential claims out.

### `/testimonials`

Purpose:

- Keep evidence architecture clear without fabricating social proof.

Bounded changes:

- No real testimonials unless permission/source records exist.
- Future structure may reference founder-approved testimonial bank only after permissions.

### `/dancing-with-durga`

Purpose:

- Keep the campaign inside the same sanctuary lineage while preserving Durga-specific intensity.

Bounded changes:

- Use v2 visual boundary to ensure DWD belongs to Shakti Shala rather than becoming a separate visual universe.
- Sept. 11 founder confirmation now supersedes the older five-live/four-practice structure and live time. Current DWD public behavior is four live gatherings, five practice nights, and 7:30-9:30 PM IST; bonus gathering is optional and not publicly promised.
- Do not ship unprovenanced sacred/deity assets.

## Visual Implementation Rule

Every selected image should have:

- asset ID / filename.
- source.
- page.
- role.
- crop behavior.
- mobile behavior.
- alt-text intent.
- provenance/status.
- replacement rule.

Prefer a small number of high-value images over filling every section with photography.

Do not ship sacred/deity imagery marked `NEEDS PROVENANCE`.

Do not use reference-only imagery as public product art.

## Proposed Asset Metadata Shape

```ts
type ShaktiVisualAsset = {
  id: string;
  filename: string;
  source: 'Founder Visual Source v2';
  status: 'APPROVED_CANDIDATE' | 'REFERENCE_ONLY' | 'NEEDS_PROVENANCE' | 'DUPLICATE';
  page: string;
  role: string;
  cropBehavior: string;
  mobileBehavior: string;
  altTextIntent: string;
  replacementRule: string;
};
```

This is a planning shape only. Use the repo's actual data/file patterns during implementation.

## Non-Goals

Do not include:

- Stripe implementation.
- Payment processing.
- Production Airtable writes.
- Shala membership automation.
- Retreat booking.
- Generic CMS.
- Fixed 2027 calendar.
- Unconfirmed DWD schedule changes.
- Unconfirmed DWD time changes.
- Generated sacred imagery.
- Unprovenanced sacred/deity imagery.
- Full site rebuild.

12H-B remains the commerce sprint after public integration unless new dependencies justify a different order.

## Required Verification for 12J

Minimum checks:

- `git diff --check`
- `npm run lint`
- `npm run build`
- `npm run check:backend`
- `npm run check:begin-write`
- `npm run check:vault`
- relevant Playwright visual / browser checks for `/`, `/begin`, `/shala`, `/offerings`, `/about-sheetal`, `/dancing-with-durga`

Specific guards:

- no Production writes enabled.
- no Airtable mutation outside approved API paths.
- no Access Grant creation from Begin.
- no payment/checkout behavior.
- no unconfirmed DWD live-structure or time changes.
- no public sacred/deity asset without provenance approval.
- no internal `Shakti System OS` explanation in seeker-facing copy.

## Human Review Gate

12J should stop for human review before merge/deploy.

Human review should answer:

- Does `Shri Shakti Shala` read as the place/sanctuary rather than a random rename?
- Does `Shakti Shadow & Somatics` read as Sheetal's body of work?
- Are the five pillars clear without becoming a slogan grid?
- Is sovereignty present without overpromising?
- Is Waterfall grounded rather than over-productized?
- Does the visual field feel like a living Goddess temple grounded in Sheetal's actual world?
