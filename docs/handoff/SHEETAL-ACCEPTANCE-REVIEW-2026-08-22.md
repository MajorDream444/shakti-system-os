# Sheetal Acceptance Review - 2026-08-22

Owner: Codex  
Sprint: 12F - Sheetal Acceptance + Offer Path Clarity  
Source: founder review context relayed for Sprint 12F  
Status taxonomy: FIX BEFORE LAUNCH, SHEETAL POLISH, FUTURE SHAKTIVERSE

## Review Register

| Feedback | Source/time | Classification | Priority | Affected route/component | Implementation status | Acceptance test | Owner | Dependency | Resulting commit/PR |
|---|---|---|---|---|---|---|---|---|---|
| Sheetal could not find the paid offering or payment pathway. | Founder review context, 2026-08-22 | FIX BEFORE LAUNCH | P1 | `/`, `/offerings`, `Hero`, `OfferPathGateway`, `OfferingsPage`, `Nav` | Implemented public Offerings destination and visible Work With Sheetal pathway. No payment processing added. | `sprint12f-founder-acceptance.spec.ts` verifies Work With Sheetal is visible from Home and paid-path doorways are visible on `/offerings`. | Codex | Human approval required before real payments or prices. | Sprint 12F branch |
| The public journey needs both direct offer choice and Begin discernment. | Founder review context, 2026-08-22 | FIX BEFORE LAUNCH | P1 | `/`, `/offerings`, `/begin` | Implemented two-path entry: direct Offerings and private Begin threshold. | 12F Playwright rubric marks direct offer choice and discernment path YES on desktop and mobile. | Codex | None for UI; production writes remain disabled unless separately approved. | Sprint 12F branch |
| Founder trust must be easier to find. | Founder review context, 2026-08-22 | FIX BEFORE LAUNCH | P2 | `/about-sheetal`, `FounderPresence`, `Nav` | Added public About Sheetal route and main-nav link. Reused approved founder portrait and safe biography. | 12F suite verifies Sheetal Kandola, founder photo, Somatic Experiencing-informed practice, and classical Shakta Tantra copy. | Codex | Exact credentials still require source confirmation before public claim. | Sprint 12F branch |
| Do not resurrect unsupported credential claims. | Handover correction | FIX BEFORE LAUNCH | P1 | `/about-sheetal`, founder copy | Public copy avoids MSc, King's College, LSHTM, or other unsupported credential strings. | Source-boundary copy and prohibited-language scan. | Codex | Sheetal or team must approve exact credential wording. | Sprint 12F branch |
| Use Shakta Tantra where applicable. | Founder correction | FIX BEFORE LAUNCH | P1 | Portal copy, living doorways, tests | Updated public app wording from Classical Shakti Tantra to Classical Shakta Tantra where the product speaks in this cycle. | Updated 12C/12D/12E/12F tests expect Shakta framing. | Codex | Canonical doctrine docs may need a later careful audit rather than blind replacement. | Sprint 12F branch |
| Represent Somatic Experiencing accurately. | Founder correction | FIX BEFORE LAUNCH | P1 | Founder copy, About Sheetal | Public bio uses Somatic Experiencing-informed practice and does not use prohibited "somatic breathwork." | 12F test and prohibited-language scan. | Codex | None. | Sprint 12F branch |
| Sheetal rejected the incorrect/AI-generated Shri Yantra. | Founder correction | FIX BEFORE LAUNCH | P0 for symbol claim | Hero, Begin, Shala, Knowledge Chamber, tests | Removed public use of the current ShriYantraPreview component from seeker-facing surfaces and replaced with neutral lotus/threshold markers. Classical Shakta chamber says approved geometry appears only after source and founder review. | 12D/12E tests verify `.shri-yantra-preview` is absent in the chamber and sacred-symbol use does not claim approved Shri Yantra. | Codex | BLOCKED - APPROVED SHRI YANTRA SOURCE REQUIRED. | Sprint 12F branch |
| Do not make the offer path generic ecommerce. | Founder review context | SHEETAL POLISH | P2 | `/offerings`, Home offer gateway | Offerings language stays doorway/request/readiness based. No product cards with fake checkout. | 12F rubric marks authored commerce WATCH for human visual review. | Codex + Sheetal | Human taste review. | Sprint 12F branch |
| Testimonials/evidence need architecture but no fabrication. | Sprint 12F brief | FIX BEFORE LAUNCH | P2 | `/testimonials`, data model placeholder | Added public Transformation Evidence route with consent-forward architecture and no invented testimonials. | 12F suite verifies publication approval language. | Codex | Approved testimonials and source records. | Sprint 12F branch |
| "Welcome Home" language should be corrected. | Founder/language correction | FIX BEFORE LAUNCH | P2 | Shala Courtyard | Updated Shala Courtyard to "Welcome to Shakti Shala." | Source scan confirms public app no longer includes "Welcome home." | Codex | None. | Sprint 12F branch |
| Shakti reflection prompts should become future Reflection Pool architecture, not scoring. | Sprint 12F brief | FUTURE SHAKTIVERSE | P3 | Reflection Pool, future data model | Not implemented as feature in 12F. Kept outside scoring and persistence. | Reported as deferred. | Future sprint | Human-approved reflection model. | Not included |
| Group agreements and community values need future circle readiness. | Sprint 12F brief | FUTURE SHAKTIVERSE | P3 | Circles/community future path | Not implemented as platform/community feature. Offerings page names group practice agreements at a high level only. | Manual review. | Future sprint | Sheetal/team operating agreements. | Not included |

## Manual Founder Review Script

Use the current Preview only. Do not use real seeker data.

1. Open `/`.
2. Within three seconds, answer: can I find where to work with Sheetal?
3. Click `Work With Sheetal`.
4. Confirm `/offerings` shows:
   - Begin Here - Free
   - Self-Guided
   - Circles & Community
   - Work With Sheetal
   - Retreats & Immersions
5. Confirm private work and retreat language does not imply instant checkout, automatic approval, or payment completion.
6. Return to `/` and click `Start Your Shakti Path`.
7. Confirm Begin still feels like discernment/ascent, not an ecommerce funnel.
8. Open `/about-sheetal`.
9. Confirm Sheetal's portrait, name, and bio feel accurate and human.
10. Open `/testimonials`.
11. Confirm no fabricated testimonials are present.
12. Open `/shala` and confirm the sanctuary map remains recoverable.

## Open Founder Decisions

- BLOCKED - APPROVED SHRI YANTRA SOURCE REQUIRED.
- Exact public credential language remains source-confirmation dependent.
- Prices, deposits, checkout sequence, and payment language require a dedicated approved payment sprint.
- Real testimonials require publication approval and source tracking before display.
