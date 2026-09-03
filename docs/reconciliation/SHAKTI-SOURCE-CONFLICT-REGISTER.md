# Shakti Source Conflict Register

Owner: Codex
Mode: Reconciliation / audit only
Created: 2026-09-02
Repository: `MajorDream444/shakti-system-os`
Current branch audited: `codex/sprint-12f-sheetal-offer-path`
Current HEAD audited: `fda1ac1edc8f937c4c8140f0904d8705bbbced0b`

## Conflict Handling Rule

Newer founder authority overrides older source material without deleting historical provenance.

When a conflict appears:

1. Preserve the older source.
2. Name the conflict.
3. Mark the older claim as `SUPERSEDED` or `NEEDS FOUNDER DECISION`.
4. Route public behavior to the newest approved authority.
5. Add a guard through docs, tests, scripts, or typed data where possible.

## Register

| ID | Older source | Older claim | Newer source | Newer claim | Governing claim | Why it overrides | Public surfaces affected | Test / guard available? | Status |
|---|---|---|---|---|---|---|---|---|---|
| C-001 | 2026-08-31 founder offer document | `1:1 Private Session`; `Single session`; old per-session pricing. | 2026-09-01 direct founder correction. | No standalone private sessions; public private work is 6, 9, or 12 sessions; 3 sessions only by exception. | Superseded by C-012 for future commerce planning; preserved as the original precedence test. | Newer direct founder correction controlled Sprint 12F/12G until the Sept 3 refinement arrived. | `/offerings`, `/begin`, offer charts, future commerce schema. | `sprint12f-founder-acceptance.spec.ts` rejects single-session language on `/offerings`; future tests must be revised only during an approved commerce sprint. | SUPERSEDED BY C-012 FOR FUTURE COMMERCE; CURRENT APP NOT UPDATED |
| C-002 | 2026-08-31 founder offer document | Shakti Shala TBD; private session and mentorship prices listed. | Sprint 12F implementation boundary and 2026-09-01 correction. | Do not invent pricing or checkout; private package pricing needs a dedicated approved commerce sprint. | Public app withholds pricing until commerce approval. | A price in a source doc is not enough to activate commerce or public payment behavior. | `/offerings`, future checkout, Airtable offers/payment schema. | 12F Playwright checks no fake pricing/checkout; `paymentArchitectureStatus` marks payment approval required. | NEEDS FOUNDER / COMMERCE DECISION |
| C-003 | Older app/docs terminology | `Classical Shakti Tantra` appears in some doctrine and prompt material. | Sprint 12F founder/language correction. | Use `Classical Shakta Tantra` where the product speaks in this cycle. | Public app uses `Classical Shakta Tantra`; broader doctrine needs careful audit. | Founder/language correction controls current public copy; docs may preserve historical terms until audited. | Home, `/about-sheetal`, knowledge chambers, tests. | 12F tests expect `classical Shakta Tantra`; vocabulary registry still needs a later doctrine audit. | PARTIALLY RESOLVED |
| C-004 | Historical public biography / prior chat summaries | MSc, institutional names, certification strings, possible regulated titles. | Source register + 31 Aug founder credential caution. | Verify exact license/certificate titles and issuing bodies before publishing sensitive titles. | Public bio stays broad and avoids unsupported credential claims. | Credential-sensitive claims require direct evidence or founder-approved wording. | `/about-sheetal`, founder section, metadata, future press kit. | 12F tests verify safe founder bio; source register labels credential strings unverified. | PUBLIC APP RESOLVED; CREDENTIAL VERIFICATION BLOCKED |
| C-005 | Sprint 12D/12E preview geometry | Agent-built Shri Yantra-like preview geometry was used for review. | 31 Aug founder feedback and 12F correction. | Use exact founder-approved Shri Yantra reference; do not redraw, reinterpret, regenerate, or alter sacred geometry. | No public Shri Yantra until approved asset is available. | Sacred geometry is lineage-sensitive and founder-provided asset controls. | Knowledge chamber, Shala threshold, deeper sanctuary moments. | 12D/12E/12F tests verify `.shri-yantra-preview` is absent from public chamber. | BLOCKED BY FOUNDER ASSET |
| C-006 | Source register open gap | No approved photography set registered. | Photography direction doc + Sprint 12D/12E implementation. | Selects are approved for build, but clearance still needs confirmation. | Use only committed/approved-safe assets; keep clearance status visible. | Image placement can be implemented, but rights/clearance remains a separate truth. | Home, `/begin`, founder, `/shala`, galleries. | Visual tests verify imagery renders; clearance still requires human confirmation. | PARTIALLY RESOLVED |
| C-007 | Earlier Shala/prototype docs | Initiation, keys, tiers, access ladders, Temple Key-like logic appear in historical architecture. | Sprint 11/12 governance and 31 Aug feedback. | Initiatory arc is emerging; not ready for fixed month-by-month publication or automated access. | No initiation automation or public access-credential claims in current release. | Human discernment and founder doctrine are not runtime automation. | `/shala`, future access, future initiatory content. | Secure-write checks verify no Initiation Key or Access Grant writes from Begin. | INTENTIONALLY DEFERRED |
| C-008 | Shala RetreatRoom prototype | October/Kedar Valley retreat details and local request modal exist in room code. | 31 Aug founder feedback + Sprint 11/12 retreat boundary. | Retreat dates and applications should be updated when confirmed; interest is not readiness or approval. | Public retreat language should stay request/preparation-based until dates/terms are approved. | Prototype local state cannot become operational retreat truth. | `/shala` RetreatRoom, Home retreat section, `/offerings#retreats`. | Existing boundaries say no Retreat Application writes. | NEEDS VERIFICATION |
| C-009 | 31 Aug founder feedback | Shakti Shala direct join / low-friction entry and ongoing community are desired. | Current implementation | Shakti Shala is open as a room architecture; no membership, payment, or community platform is active. | Shala can be visited, but join/member operations are not implemented. | Direct join requires pricing, access, community ops, and team ownership. | `/shala`, `/offerings`, future member onboarding. | No current automated test for membership because feature is absent. | NEEDS DATA/BACKEND AND COMMERCE DECISION |
| C-010 | 31 Aug founder feedback | Substantial testimonial bank exists and should be organized. | Current implementation | `/testimonials` is evidence architecture only; no real testimonials are published. | No testimonial content appears until source and permission are tracked. | Private praise is not public marketing consent. | `/testimonials`, future offer pages. | 12F tests verify no fabricated testimonials and permission language. | NEEDS DATA/BACKEND WORK |
| C-011 | Historical payment/offer schema drafts | Offerings/payment tables and Stripe fields exist in draft constants. | Sprint 11/12 boundaries. | No payment/deposit writes and no checkout until an approved commerce sprint. | Payment schema remains draft/deferred, not production behavior. | Schema possibility is not activation approval. | `/offerings`, Airtable schema, future checkout. | Begin-write checks verify no payment/deposit writes. | INTENTIONALLY DEFERRED |
| C-012 | 2026-09-01 founder correction | No standalone private sessions; public private work is 6-, 9-, or 12-session containers; 3 sessions only by exception. | 2026-09-03 reported founder commerce/access refinement | Standalone private session permitted at `$200`; 3/6/9/12-session containers priced at `$150/session`. | Sept 3 is the current planning truth for future commerce: standalone may exist at a premium, while containers reward deeper commitment. | Newer founder clarification explicitly resolves the ambiguity. Public app changes still require an approved commerce implementation sprint. | `/offerings`, future commerce pages, Airtable offer records, checkout/payment schema. | Existing 12F/12G tests intentionally still guard the no-commerce public app. Future commerce sprint must update tests from "no standalone ever" to "no unsupported one-off checkout / no stale pricing." | RESOLVED FOR PLANNING; NOT IMPLEMENTED IN APP |
| C-013 | Sept 2 Navratri voice note | Shakti Shala entry from Navratri was exploratory: cheaper entry, secret door, founding-member/discount/one-month possibilities. | 2026-09-03 Dancing with Durga and commerce/access refinement | Dancing with Durga purchase includes the container, recordings, materials/practices, temporary community/Shala space, two-month post-container access for non-members, and invitation/application/discernment before paid Shala membership. | Temporary event access is distinct from full Shakti Shala membership. | The Sept 3 refinement adds operational access rules while preserving human discernment. | Future DWD launch page, registration, payment, content library, Shala transition, Access Grants. | Future access tests must verify DWD Participant is not treated as full Shala Member and payment alone does not grant deeper readiness. | RESOLVED FOR PLANNING; IMPLEMENTATION BLOCKED |

## Current Precedence Test Result

`C-001` is the reference case for the Shakti OS change-with-memory pattern:

```text
Founder says something
-> source is recorded
-> conflict is detected
-> authority is resolved
-> historical truth remains visible
-> current system changes
-> tests protect the new truth
```

The older 2026-08-31 private-session claim remains visible as provenance in the correction document, but the public app now follows the newer founder correction.
