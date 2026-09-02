# Sheetal 31 Aug Founder Feedback Reconciliation v1

Owner: Codex  
Mode: Reconciliation / audit only  
Created: 2026-09-02  
Repository: `MajorDream444/shakti-system-os`  
Audited branch: `codex/sprint-12f-sheetal-offer-path`  
Audited HEAD: `fda1ac1edc8f937c4c8140f0904d8705bbbced0b`  
Canonical comparison: `origin/main` at `94718deafbfcff225a0b2e34f4e40b28a3785d7e`

## Scope Boundary

This pass did not implement features, deploy, merge, alter Airtable, enable production writes, create payment links, or invent copy, pricing, credentials, testimonials, sacred assets, commerce rules, access rules, or founder claims.

The purpose is to reconcile Sheetal Kandola's 2026-08-31 founder feedback against the current 12F branch and determine the next sprint from evidence.

## Source Authority Used

1. Newest direct founder correction.
2. 2026-08-31 direct founder feedback document, `SHAKTISHALA_MAJOR_31AUG26 (1).docx`.
3. Earlier direct founder feedback.
4. Approved canonical doctrine and vocabulary.
5. Current approved implementation.
6. Historical source documents.
7. Prototype / legacy copy.
8. Agent inference.

Newer founder corrections override conflicting older material without deleting historical provenance.

## Current Repo Evidence Inspected

- `graphify-out/GRAPH_REPORT.md` was read first. It is stale, built from `49ebd475`.
- Current branch is `codex/sprint-12f-sheetal-offer-path`.
- Current branch is 4 commits ahead and 0 behind `origin/main`.
- The working tree already contains uncommitted private-work correction changes from the prior founder-correction pass.
- Current public routes in app code include `/`, `/begin`, `/shala`, `/offerings`, `/about-sheetal`, and `/testimonials`.
- Current server write boundary preserves Sprint 11C behavior through `apps/web/src/server/beginWriteHandlers.ts`.
- Current live Airtable IDs are documented in `apps/web/src/constants/liveAirtable.ts`, `docs/architecture/AIRTABLE_SCHEMA.md`, and `docs/architecture/SHAKTI-SYSTEM-AIRTABLE-LIVE-BASE.md`.

## Classification Counts

| Classification | Count |
|---|---:|
| ALREADY SATISFIED | 8 |
| NEEDS PUBLIC COPY CHANGE | 4 |
| NEEDS DESIGN CHANGE | 0 |
| NEEDS DATA/BACKEND WORK | 11 |
| NEEDS FOUNDER ASSET | 4 |
| NEEDS VERIFICATION | 5 |
| INTENTIONALLY DEFERRED | 4 |
| Total founder instructions classified | 36 |

## Precedence Test - Private Work Containers

| Check | Result | Evidence |
|---|---|---|
| Historical source remains preserved | PASS | The 2026-08-31 document remains available and is quoted in the correction doc as superseded provenance. |
| Correction explicitly documented | PASS | `docs/handoff/FOUNDER-CORRECTION-PRIVATE-WORK-CONTAINERS-2026-09-01.md`. |
| Public app follows newest founder authority | PASS | `apps/web/src/data/offerings.ts` presents 6-, 9-, or 12-session containers and 3 sessions as exception-only; `apps/web/src/begin/types.ts` says `Private Work With Sheetal`. |
| Tests guard against regression | PASS | `apps/web/e2e/sprint12f-founder-acceptance.spec.ts` rejects single-session / standalone-session language on `/offerings`. |
| Legacy/prototype leakage reduced | PASS | `apps/start-your-shakti-path` labels were updated away from old `1:1` copy; remaining forbidden language appears only in the correction anti-pattern list and test regexes. |

Conclusion: this is the correct governance pattern for future founder corrections.

## Instruction Matrix

| ID | Founder instruction | Source / date | Current repo evidence | Current status | Primary classification | Secondary dependencies | Affected routes | Affected files | Affected data system | Founder decision required? | Human approval required? | Risk if implemented incorrectly | Recommended next action |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| F31-001 | Show the offers as one ecosystem at different levels of depth and proximity, not disconnected products. | 31 Aug founder doc | `offerCategories`, `OfferPathGateway`, and `Pathway` now organize Begin, self-guided, circles, private work, and retreats. | Mostly implemented. | ALREADY SATISFIED | Human visual review. | `/`, `/offerings` | `apps/web/src/data/offerings.ts`, `OfferPathGateway.tsx`, `practices.ts` | GitHub | No | Yes before launch | Site could feel like a catalogue or game console before method clarity lands. | Keep; use in 12G clarity pass. |
| F31-002 | Shakti Shala is an ongoing Tantric, devotional, embodied practice space and living school/community. | 31 Aug founder doc | `/shala` exists and `/offerings` lists self-guided Shala entry, but ongoing school/community rhythm is not clearly public. | Partial. | NEEDS PUBLIC COPY CHANGE | Future community ops. | `/`, `/offerings`, `/shala` | `offerings.ts`, Shala room copy | GitHub, future Airtable | Yes for exact public language | Yes | Shala may read like a feature menu instead of a living school. | Add public Shala definition in 12G without adding membership mechanics. |
| F31-003 | Shakti Shala rhythm includes monthly immersion, short weekly transmissions, lunar temple openings, community, and evolving currents. | 31 Aug founder doc | Existing docs mention moon rhythm; app has no event/transmission records or schedule model. | Not operational. | NEEDS DATA/BACKEND WORK | Commerce and team ops. | `/shala`, `/offerings` | Future Events/Offer records; current `AIRTABLE_SCHEMA.md` defers Events. | Airtable, Notion, GitHub | Yes | Yes | False calendar promises, stale events, or accidental spiritual authority automation. | Create event/theme data contract later; not 12G. |
| F31-004 | Public private work is 6-, 9-, or 12-session containers; 3 sessions is exception-only; no standalone private sessions. | 2026-09-01 founder correction | Current uncommitted correction updates `/offerings`, `/begin`, tests, and docs. | Implemented and verified locally. | ALREADY SATISFIED | Future commerce schema. | `/offerings`, `/begin` | `offerings.ts`, `begin/types.ts`, 12F tests, correction doc | GitHub, future Airtable | No for principle | Yes before launch | Transactional private-work positioning. | Preserve as precedence guard. |
| F31-005 | 6-month and 1-year private mentorship were listed in 31 Aug offer table. | 31 Aug founder doc | Current app does not publish month-based mentorship tiers; newer package rule may supersede or remap them. | Ambiguous. | NEEDS VERIFICATION | Private package naming/pricing. | `/offerings` | `offerings.ts`, future commerce docs | GitHub, Airtable | Yes | Yes | Publishing outdated package architecture. | Ask Sheetal whether month-based mentorship remains distinct from 6/9/12 session containers. |
| F31-006 | Practitioner / facilitator mentorship exists, current format 24 sessions / 6 months. | 31 Aug founder doc | Current app only gestures to private work broadly; no practitioner offer route or schema. | Not implemented. | NEEDS VERIFICATION | Commerce and admissions rules. | `/offerings`, future practitioner page | Future offer data | Airtable, GitHub, Notion | Yes | Yes | Conflating practitioner training with seeker private work. | Verify whether this is public, request-only, or private referral before implementing. |
| F31-007 | Retreats, yatras, and in-person immersions are part of the ecosystem. | 31 Aug founder doc | Retreats are visible; yatras and in-person immersion language is not fully represented. | Partial. | NEEDS PUBLIC COPY CHANGE | Confirm dates/locations. | `/`, `/offerings`, `/shala` | `retreats.ts`, `offerings.ts`, `RetreatRoom.tsx` | GitHub, future Airtable | Yes for specifics | Yes | Overpromising retreat readiness or dates. | Add careful ecosystem wording only after confirming current retreat/yatra language. |
| F31-008 | A-Z of Tantra Guide + Embodiment Practices should be a free front-door gift. | 31 Aug founder doc | No opt-in asset or route exists. | Missing asset. | NEEDS FOUNDER ASSET | Email capture and consent. | `/`, `/offerings`, future free gift route | Future components/data | Drive, Airtable, GitHub | Yes | Yes | Inventing doctrine or publishing incomplete teaching. | Wait for approved PDF/content outline; plan as free-front-door sprint after 12G. |
| F31-009 | Shakti Waterfall should be a 4-5 minute free guided embodiment practice. | 31 Aug founder doc | No source audio/video is registered; current app has no lead magnet delivery. | Missing asset. | NEEDS FOUNDER ASSET | Email capture and safe delivery. | `/`, `/offerings`, `/shala` | Future media delivery | Drive, Airtable, GitHub | Yes | Yes | Fabricated practice or unsafe recording delivery. | Request approved audio/video file and delivery permission. |
| F31-010 | Free discovery call remains a relational front door into deeper private work. | 31 Aug founder doc | Begin reveal has discovery-call language; `/offerings` says request conversation, but no scheduling flow exists. | Partial. | NEEDS PUBLIC COPY CHANGE | Scheduling/ops later. | `/begin`, `/offerings` | `Handoff.tsx`, `PathReveal.tsx`, `offerings.ts` | GitHub, Notion later | Yes for preferred wording | Yes | Making it look like automatic booking or one-off work. | Clarify public CTA as request/conversation, not instant booking. |
| F31-011 | Free gifts should invite into Shakti Shala; deeper proximity goes to discovery/private mentorship. | 31 Aug founder doc | Offer pathway architecture exists, but no free-gift funnel or fulfillment. | Partial architecture only. | NEEDS DATA/BACKEND WORK | Assets and consent. | `/`, `/offerings`, `/begin` | Future API/form/asset delivery | Airtable, Drive, GitHub | Yes | Yes | Lead magnet creates duplicate system of record or PII leakage. | Defer until assets and email/consent rules are approved. |
| F31-012 | Founder page should show broad academic/professional background without reading like a CV. | 31 Aug founder doc | `/about-sheetal` exists with safe broad bio and source-boundary note. Exact credentials withheld. | Partial. | NEEDS VERIFICATION | Certificates/CV. | `/about-sheetal`, founder section | `offerings.ts`, `AboutSheetalPage.tsx`, `FounderPresence.tsx` | GitHub, Drive | Yes | Yes | Unsupported regulated claims. | Gather certificates/CV evidence and approve exact credential wording. |
| F31-013 | Public authority language should bridge mental health, research, counseling, sex education, somatics, Tantra/Yoga/Ayurveda. | 31 Aug founder doc | Current public bio bridges nervous-system literacy, SE-informed practice, psychology, sensuality, shadow, Shakta Tantra, lived context. | Safe but incomplete. | ALREADY SATISFIED | Credential verification for expansion. | `/`, `/about-sheetal` | `portalCopy.ts`, `offerings.ts` | GitHub | Yes for expansion | Yes | Over-clinical or unsupported authority. | Preserve current safe copy until credential evidence arrives. |
| F31-014 | Verify exact license/certificate titles before publishing `licensed`, `certified`, or Somatic Experiencing title claims. | 31 Aug founder doc | Source register marks credential strings unverified; app avoids these claims. | Correctly blocked. | NEEDS VERIFICATION | Certificate files. | `/about-sheetal` | `SHEETAL-PUBLIC-SOURCE-REGISTER.md`, `aboutSheetalCopy` | Drive, GitHub | Yes | Yes | Regulatory or trust harm. | Create credential verification packet before any bio expansion. |
| F31-015 | Specific lineage, initiation, or named-master claims require exact approved wording. | 31 Aug founder doc | Public app avoids named-master and initiation claims; vocabulary registry demands human review. | Satisfied for current release. | ALREADY SATISFIED | Future doctrine review. | All public surfaces | `SHAKTI-CANONICAL-VOCABULARY.md`, app copy | GitHub | Yes for future claims | Yes | False lineage claim. | Keep current restraint. |
| F31-016 | Use Sheetal's exact approved Shri Yantra reference; do not redraw, reinterpret, regenerate, or alter. | 31 Aug founder doc | App removed public `ShriYantraPreview`; docs say approved geometry appears only after source/founder review. Actual asset is not in repo. | Blocked. | NEEDS FOUNDER ASSET | Asset delivery and usage rights. | Knowledge chamber, `/shala` threshold | `KnowledgeChamber.tsx`, `ShriYantraPreview.tsx`, tests | Drive, GitHub | Yes | Yes | Pseudo-sacred geometry or lineage harm. | Wait for approved asset file/reference and integrate as asset, not generated geometry. |
| F31-017 | Devi eyes and feet can be used, but exact imagery requires Sheetal approval. | 31 Aug founder doc | No Devi eyes/feet assets are published. | Correctly absent. | NEEDS FOUNDER ASSET | Image permission. | Future visual system | Future asset slots | Drive, GitHub | Yes | Yes | Cliche or unapproved devotional imagery. | Keep absent until supplied/approved. |
| F31-018 | Lotus, hibiscus, flowers, fire, water, earth, moon, and elemental textures can support visual language. | 31 Aug founder doc | 12D/12E added luminous imagery, lotus/threshold markers, water/mountain/temple image roles. | Implemented structurally. | ALREADY SATISFIED | Human visual review. | `/`, `/begin`, `/shala` | `PortalImageSlots.tsx`, CSS, Shala components | GitHub | No for principle | Yes | Symbol wallpaper or generic wellness art. | Keep taste gate; avoid overuse. |
| F31-019 | Do not create decorative pseudo-yantras. | 31 Aug founder doc | 12F removed public reliance on unapproved geometry; tests guard absence. | Satisfied. | ALREADY SATISFIED | Approved asset later. | Public sacred surfaces | `KnowledgeChamber.tsx`, 12D/12E tests | GitHub | No | Yes | Sacred-symbol wallpaper. | Preserve. |
| F31-020 | Organize existing recordings/classes/meditations/practices/retreat/social content before asking for new library content. | 31 Aug founder doc | Vault architecture exists; mock and sample fixtures exist; no full source inventory is operationalized. | Partial infrastructure. | NEEDS DATA/BACKEND WORK | Drive access and Airtable tagging. | `/shala`, Temple Library | `VaultSyncService`, `LibraryAssetReadAdapter`, `libraryCollections.ts` | Drive, Airtable | No for principle | Yes | Asking founder to recreate content already present. | Run approved vault ingestion/inventory sprint. |
| F31-021 | Vault taxonomy should include Tantra foundations, Devi/Mahavidya/Shiva/Bhairava, mantra, meditation, mudra, sadhana, somatics, chakras/elements, embodiment, shadow, lunar, Navratri, retreats, interviews, testimonials, social teachings. | 31 Aug founder doc | Docs name many categories; Airtable Library Assets has theme/keywords/goddess/moon/practice fields but not this full taxonomy as governed options. | Partial. | NEEDS DATA/BACKEND WORK | Taxonomy approval. | Temple Library, `/shala` | `liveAirtable.ts`, `airtableSchema.ts`, vault docs | Airtable, GitHub | Yes for exact taxonomy | Yes | Flattening doctrine into generic tags. | Define canonical taxonomy before bulk tagging. |
| F31-022 | Vault records should be tagged by topic, format, length, and level. | 31 Aug founder doc | Library Assets has media type, file type, theme, keywords, access level; length is not clearly represented. | Partial. | NEEDS DATA/BACKEND WORK | Airtable extension. | Temple Library | `liveAirtable.ts`, `types/backend.ts`, Airtable base | Airtable | No for principle | Yes | Content cannot be retrieved or permissioned cleanly. | Extend Library Assets only after schema proposal. |
| F31-023 | Somatic Experiencing-informed practices should include orientation, interoception, titration, pendulation, SIBAM, grounding, capacity. | 31 Aug founder doc | Current public copy uses SE-informed language; practice schema has broad practice type fields. Exact practice taxonomy is absent. | Partial. | NEEDS DATA/BACKEND WORK | Founder/training review. | `/shala`, Temple Library, `/about-sheetal` | Practice schema and library taxonomy | Airtable, GitHub | Yes | Yes | Unsupported therapeutic claims or unsafe practice labeling. | Add to vault taxonomy only with exact approval. |
| F31-024 | High-intensity practices and deeper content need careful access/context. | 31 Aug founder doc and session notes | Access architecture exists; no deeper content release is active. | Correctly not implemented. | INTENTIONALLY DEFERRED | Access/grant governance. | `/shala`, Temple Library | Access services, Library Asset confidentiality | Airtable, GitHub, Notion | Yes | Yes | Unsafe self-serve exposure of sensitive practices. | Defer until access and human review operations are approved. |
| F31-025 | Create testimonial inventory with quote/clip, source, offer/retreat, transformation theme, and permission level. | 31 Aug founder doc | `/testimonials` shows architecture only; Airtable does not yet expose a dedicated testimonial table in live constants. | Missing ops layer. | NEEDS DATA/BACKEND WORK | Testimonial archive. | `/testimonials`, future offer pages | Future schema and adapter | Airtable, Drive, GitHub | Yes for final selection | Yes | Publishing without consent or losing best stories. | Create testimonial data contract and inventory workflow. |
| F31-026 | Do not assume private kind words equal public marketing permission. | 31 Aug founder doc | Current `/testimonials` explicitly says client words appear only with publication approval. | Satisfied. | ALREADY SATISFIED | Real records later. | `/testimonials` | `TestimonialsPage.tsx`, `testimonialArchitecture` | GitHub, future Airtable | No | Yes for real content | Consent violation. | Keep and later automate permission checks. |
| F31-027 | Track permission separately for words, first name, full name, photograph, video, and identifying details. | 31 Aug founder doc | Current placeholder fields are too broad; no structured permission model exists. | Missing schema. | NEEDS DATA/BACKEND WORK | Testimonial table design. | `/testimonials` | Future Airtable schema | Airtable, Drive, GitHub | Yes | Yes | Overexposure of client identity. | Add to testimonial data contract before publishing testimonials. |
| F31-028 | Open Shakti Shala through intentional New Moon and Full Moon openings. | 31 Aug founder doc | Moon rhythm appears in docs and Shala concepts, not current operational schedule. | Not operational. | NEEDS DATA/BACKEND WORK | Events/calendar ownership. | `/shala`, `/offerings` | Future Events or Offers schema | Airtable, Notion, GitHub | Yes | Yes | Stale or inaccurate openings. | Defer to events/rhythm contract. |
| F31-029 | Provide one deeper monthly teaching/immersion and short weekly audio transmissions/practices. | 31 Aug founder doc | No monthly/weekly content scheduling exists. | Not operational. | NEEDS DATA/BACKEND WORK | Vault and event publishing workflow. | `/shala`, Temple Library | Future content scheduling | Airtable, Drive | Yes | Yes | Promise maintenance rhythm without team capacity. | Put in operations readiness, not 12G UI. |
| F31-030 | Community sharing, witnessing, questions, and voice notes happen while temple is open, then silence/integration. | 31 Aug founder doc | No community platform or voice-note feature exists. | Not implemented by design. | INTENTIONALLY DEFERRED | Community platform and moderation. | Future Shala community | None current | Notion, future tool | Yes | Yes | Automating intimacy or creating unattended community obligations. | Defer until team ownership and tool choice exist. |
| F31-031 | Programming stays responsive to what is alive, not rigidly scripted a year ahead. | 31 Aug founder doc | Static copy is compatible; no editable current-theme mechanism exists. | Principle accepted, mechanism absent. | NEEDS DATA/BACKEND WORK | Founder-editable ops. | `/`, `/shala`, `/offerings` | Future current-theme data source | Airtable, Notion, GitHub | Yes | Yes | Rigid stale curriculum or too much developer dependency. | Design current-theme/event data contract later. |
| F31-032 | Emerging Shiva/Bhairava, Durga, Mahavidya arc is not ready for fixed publication. | 31 Aug founder doc | Current app has goddess pathways but no fixed month-by-month arc. | Correctly deferred. | INTENTIONALLY DEFERRED | Doctrine approval. | `/shala`, Temple Library | `goddesses.ts`, Shala rooms | GitHub, Drive | Yes | Yes | Publishing premature initiatory doctrine. | Keep as future doctrine sprint. |
| F31-033 | Sheetal/team should update current theme, lunar events, special classes, retreat dates, application windows, and temporary offers without a developer. | 31 Aug founder doc | Current content is mostly GitHub/static with Airtable read adapters for approved library/practice records only. | Missing. | NEEDS DATA/BACKEND WORK | Admin workflow and source-of-truth decision. | `/`, `/offerings`, `/shala` | Future adapters/routes/schema | Airtable, Notion, GitHub | Yes for workflow | Yes | Developer bottleneck or duplicate records. | Propose founder-editable operations contract after 12G. |
| F31-034 | Public path should be simple: discover the work, enter Shakti Shala, move into private/practitioner depth or immersion when desired. | 31 Aug founder doc | 12F gives direct offers vs Begin discernment, but tester feedback says core method is still not quickly clear. | Partial. | NEEDS PUBLIC COPY CHANGE | Founder method statement. | `/`, `/offerings` | `Hero.tsx`, `OfferPathGateway.tsx`, `offerings.ts`, `portalCopy.ts` | GitHub | Yes for exact words | Yes | Visitor sees game console before body of work. | Make 12G a clarity/positioning pass. |
| F31-035 | The site should not look like a catalogue of disconnected products. | 31 Aug founder doc | Offer architecture attempts this; tester feedback still sees groups/classes/retreats without main offering clarity. | Partial. | NEEDS PUBLIC COPY CHANGE | Founder method statement. | `/`, `/offerings` | Same as F31-034 | GitHub | Yes | Yes | Offer sprawl obscures why Sheetal. | 12G should center Shakti Shadow & Somatics as the body of work. |
| F31-036 | Commerce remains unresolved: Shakti Shala pricing, private package pricing, payment behavior, cancellation, refund, rescheduling, fulfillment, access after payment, application vs direct purchase. | 31 Aug source plus current boundaries | `/offerings` says no browser checkout; schema drafts include payment fields but Sprint 11/12 forbid writes. | Intentionally not implemented. | INTENTIONALLY DEFERRED | Commerce contract and legal/ops. | `/offerings`, future checkout | Future commerce schema and payment pages | Airtable, payment provider, Notion, GitHub | Yes | Yes | Activating sales without fulfillment or access rules. | Do not make 12G commerce; schedule dedicated Offer + Commerce Contract later. |

## A. Executive Finding

The 31 Aug founder feedback has not become one simple backlog. It divides into three different kinds of work:

1. The public front door needs clearer method/positioning language so a stranger understands Shakti Shadow & Somatics before exploring offers.
2. The operating layer needs Airtable/Drive/Notion structures for events, free gifts, testimonials, vault taxonomy, editable current offerings, and eventual commerce.
3. Several founder assets and verification packets are required before sacred imagery, credentials, testimonials, and lead magnets can safely publish.

The highest-leverage next sprint is a small public clarity pass, not commerce or backend expansion.

## B. Already Satisfied

- One-ecosystem offer architecture is present through `/offerings` and the Home offer gateway.
- Private-work container correction is implemented and tested on the current branch.
- Safe founder bio exists without unsupported credential claims.
- Lineage/named-master claims remain withheld.
- Botanical, water, mountain, temple, lotus, and elemental language exists in the visual system.
- Public pseudo-Yantra use was removed.
- Testimonial page does not fabricate client stories.
- Public copy preserves payment/approval restraint.

## C. Safe Next Implementation Items

Recommended Sprint 12G:

```text
Founder Method + Stranger Clarity Pass
```

Boundaries:

- Public copy/IA only.
- No backend changes.
- No payment/checkout.
- No invented credentials.
- No invented testimonials.
- No sacred-asset substitution.
- Preserve Begin/write/security behavior.

Primary outcomes:

- Within 10-15 seconds, a stranger can answer what Shakti Shadow & Somatics is.
- The Home page states how Sheetal works and why her approach is distinct.
- `/offerings` reads as one body of work at different depth/proximity levels.
- Discovery Call is framed as a relational request, not a booking for a one-off service.
- Playwright adds a stranger-clarity rubric with objective text/route evidence.

## D. Blocked By Founder Asset

- A-Z of Tantra Guide + Embodiment Practices.
- Shakti Waterfall audio/video practice.
- Exact approved Shri Yantra asset.
- Devi eyes/feet imagery.
- Final public testimonial selections and media.

## E. Blocked By Verification

- Exact credential and certification wording.
- Whether month-based mentorship language remains current under the newer session-container rule.
- Practitioner/facilitator mentorship public architecture.
- Retreat/yatra dates, locations, and availability.
- Photography clearance and final approved public asset set.

## F. Backend / Data Work Required

- Founder-editable current theme/events/classes/retreat dates/application windows/offers.
- Library Asset taxonomy extension for full 31 Aug vault categories.
- Length/level/topic metadata normalization.
- Testimonial permission schema.
- Lead magnet delivery and consent capture.
- Shakti Shala event/rhythm publishing model.
- Future Shala membership/community operations.

## G. Commerce Decisions Still Required

- Shakti Shala pricing and join model.
- Private 6/9/12 package pricing and whether 3-session exception appears publicly.
- Mentorship/practitioner mentorship naming, eligibility, duration, and price.
- Payment provider behavior.
- Cancellation/refund/rescheduling policy.
- Fulfillment after payment.
- Access after purchase.
- Application vs direct purchase rules.
- Who reviews requests and how quickly.

## H. Intentionally Deferred

- Payment/checkout/deposit writes.
- Initiation automation or fixed initiatory calendar.
- Community/voice-note platform behavior.
- High-intensity practice access.
- Private reflection syncing.
- Access grant automation.

## I. Source Conflicts

The dedicated source-conflict register is:

```text
docs/reconciliation/SHAKTI-SOURCE-CONFLICT-REGISTER.md
```

Priority conflicts:

- Private single-session claim is superseded by the 2026-09-01 founder correction.
- Pricing exists in historical/source context but is not approved for public commerce activation.
- Credential strings are founder-supplied context but still verification-sensitive.
- Approved Shri Yantra is founder-required but not yet present as a repo asset.
- Testimonials exist as a claimed archive, but public permission records do not exist yet.

## J. Stranger Clarity Findings

Audit question: Within 10-15 seconds, can a woman who has never heard of Sheetal understand the following?

| Question | Status | Evidence | Failure type |
|---|---|---|---|
| What is Shakti Shadow & Somatics? | WATCH | Home says it is where body, shadow, lineage, and neuroscience meet; Method chamber explains the bridge. | COPY FAILURE |
| Who is Sheetal? | YES | Founder section and `/about-sheetal` name Sheetal Kandola with portrait and safe biography. | None |
| Why is her approach distinctive? | WATCH | The ingredients are named, but the lived synthesis could land faster. | MISSING FOUNDER TRUTH |
| What does she actually offer? | YES/WATCH | `/offerings` exposes free, self-guided, circles, private, retreats; tester still saw groups/classes/retreats before the core method. | OFFER TRUTH / HIERARCHY |
| Where should I begin? | YES | Hero and nav expose `Start Your Shakti Path`; `/offerings` also gives direct vs discernment path. | None |

Conclusion: 12F solved offer-path discoverability. It did not fully solve stranger method clarity.

## K. Recommended Next Sprint

### Sprint 12G - Founder Method + Stranger Clarity Pass

Objective:

Make the public front door answer, quickly and plainly:

```text
What is Shakti Shadow & Somatics?
How does Sheetal work?
Why choose Sheetal if I do not already follow her?
What can I receive now?
Where do I begin?
```

Do:

- Refine Home and `/offerings` copy hierarchy.
- Preserve current art direction and route structure.
- Use founder-supplied 31 Aug language only where already safe.
- Keep private work container-based.
- Keep no-pricing/no-checkout boundary.
- Add Playwright stranger-clarity tests.

Do not:

- Implement lead magnets.
- Add commerce.
- Add event scheduling.
- Publish credentials.
- Publish testimonials.
- Add sacred imagery.
- Change backend write behavior.

### Phase 2

- Free front-door asset delivery once A-Z and Shakti Waterfall files are supplied.
- Vault taxonomy and Drive/Airtable ingestion.
- Testimonial inventory and permission tracking.
- Founder-editable operations layer.

### Future Expansion

- Shakti Shala rhythm/member operations.
- Practitioner mentorship application path.
- Retreat/yatra application pipeline.
- Commerce and fulfillment.
- Approved Shri Yantra / Devi asset integration.

## Verification Performed

| Check | Result |
|---|---|
| Read Graphify report before source inspection | PASS, stale report noted |
| Bounded Graphify refresh attempt | PARTIAL / TIMED OUT after 60 seconds; AST extraction reached 322/322 files, then the process did not exit before the bound |
| Fetch/branch status inspected | PASS |
| 31 Aug source read from `.docx` via `textutil` | PASS |
| Current routes/components/data inspected | PASS |
| Airtable schema/constants inspected | PASS |
| Existing tests inspected | PASS |
| App behavior changed during this pass | NO |

Graphify remains maintenance debt for this repo. It produced useful AST extraction progress but did not complete cleanly within the bounded refresh window.

## Files Created

- `docs/reconciliation/SHEETAL-31-AUG-FOUNDER-FEEDBACK-RECONCILIATION-v1.md`
- `docs/reconciliation/SHAKTI-SOURCE-CONFLICT-REGISTER.md`

## Files Modified

This reconciliation pass creates documentation only. It does not require app behavior changes.

Note: the working tree already contained uncommitted private-work correction changes before this reconciliation artifact was created.
