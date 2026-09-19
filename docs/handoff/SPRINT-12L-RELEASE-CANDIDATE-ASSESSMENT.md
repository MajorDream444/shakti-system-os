# Sprint 12L - September 18 Launch Assessment

Date: 2026-09-18  |  Status: **NOT RELEASE READY**

## A. Founder decisions and source

The bounded decision register is `docs/founder-source/SHEETAL-LAUNCH-ACCEPTANCE-2026-09-18.md`. The Sprint 12L handoff and Major's direct image instruction are available; the September 18 primary meeting transcript and founder campaign video are **not** present in this checkout. They cannot be quoted, transcribed, or independently reconciled here. Unrelated conversation was not ingested. `C-014` retains the September 5 historical `Shri` decision; `C-025` governs current public `Sri` spelling.

## B-C. Changed files and runtime behavior

- Public spelling was reconciled in `apps/web/src` across Home, navigation, Begin, Shala, Offerings, DWD, accessible labels, and data; current-route assertions in existing `apps/web/e2e` specs were aligned. `apps/web/index.html` now uses `Sri Shakti Shala` in title and description. `Shri Yantra` references are intentionally unchanged.
- `apps/web/src/components/PortalImageSlots.tsx` replaces only the Home gallery's second founder portrait with `IMG_3201.PNG`'s exact bytes, stored under the correct JPEG extension as `apps/web/src/shala/assets/images/founder-red-prayer-hands-sept18.jpg`. Other uses of the former founder portrait are untouched.
- `apps/web/src/data/visualAssets.ts` records the exact source filename, derivative, role, route, crop, mobile behavior, alt intent, and rights/replacement gate. `apps/web/e2e/sprint12l-release-gates.spec.ts` guards public spelling, the selected image, and DWD offer boundaries.
- The September 18 decision register and source-conflict register were updated. No DWD schedule, price, CTA, sacred asset, commerce, or production-write behavior was activated.
- This work sits atop substantial **pre-existing uncommitted** 12J/12K visual work on `codex/sprint-12j-1-visual-correction` at base `bd44e4c17fea900757caa7b8b2822eb6db40fec5`. No unrelated dirty files were cleaned up; no commit or deployment was made.

## D-E. Image and identity evidence

- Source `IMG_3201.PNG` is JPEG-encoded, 1035 x 1860, 286,096 bytes. SHA-256 of source and placed derivative match: `84a950b6e3c9cfa7ed3177f295718ab444ff823050215743b4b1e6d835821cdc`.
- The selected gallery image loaded at 390px and 1440px. Temporary local element screenshots showed face, veil, and prayer hands in the crop; those screenshots were review evidence only, were not part of the release manifest, and did not constitute founder sign-off.
- A source scan of `apps/web/src` and `apps/web/index.html` finds no `Shri Shakti Shala`. The runtime test visits seven public routes; a source-level guard covers hidden states. Historical founder-source documents retain original wording. The reported September 14 canonical identity decision file is not present at this checkout's `origin/main` (`de2a9f7`, September 12), so that provenance still needs repository reconciliation.

## F-H. Enrollment, DNS, payment

- **Enrollment: NOT VERIFIED.** DWD currently links `Request details` to `/begin?intent=community`. The repo has no DWD registration/checkout route, payment confirmation, participant record creation, receipt, failed/cancelled-payment handling, duplicate protection, or welcome handoff. The four-live/five-practice structure and 7:30-9:30 PM IST remain intact; the exact live dates remain founder-gated. A functional request CTA is not enrollment.
- **Payment: NOT READY.** Vercel Marketplace read-only discovery returns Stripe for payments, but `vercel integration list` shows no linked resource for the project. A Stripe profile/identity is not a verified product or checkout. No integration was installed, no secret was read, and no test or live charge was made. Product/price IDs, currency/regional rules, refund/support owner, test checkout and participant handoff need explicit setup and acceptance before public use.
- **DNS: NOT READY.** The linked Vercel project is `shakti-system-os` under `major-hanzoais-projects`; the domain is not attached there (`vercel domains inspect` returned not found). At inspection, apex A records were `207.207.210.23`, `.50`, `.36`; `www` CNAME was `uixie.porkbun.com`. HTTPS apex returned a 302 to `srishaktishala-com.l.ink`, not this site. No DNS, SSL, redirect or production deployment change was made. Vercel CLI was upgraded from 59.16.0 to 59.17.0 before project/domain/integration inspection.

## I. Remaining launch blockers

1. Reconcile the September 18 project-only transcript and the reported September 14 identity decision into canonical repo provenance; obtain the founder video and explicit website-use/rights decision if it is to appear on the site.
2. Confirm rights for the selected founder portrait and the other 12K production-candidate imagery; exact Sri Yantra and sacred/deity art remain provenance-gated.
3. Founder-confirm the four live-date mapping before any per-date LIVE labels, scheduling, or calendar invites.
4. Implement and test the complete DWD purchase-to-participant-to-welcome path in test mode, including regional prices, success/cancel/failure/duplicate/mobile/receipt/refund cases. No live charge without Major's explicit authorization.
5. Complete human visual/readability acceptance of the combined 12K/12L experience, then reconcile the dirty branch and obtain a clean, exact-SHA release review.
6. Attach the domain to the approved Vercel project only during an authorized cutover; read its exact required records, verify apex/www/SSL/redirect, and preserve old DNS values for rollback.

## J. Verification

- `npm run lint`, `npm run build`, `npm run check:backend`, `npm run check:begin-write`, and `npm run check:vault`: passed.
- Final full serial Playwright suite after the source-level guard: **70/70 passed**. The four focused 12L checks also passed separately.
- Desktop/mobile screenshot review confirms image load and crop. Existing suite covers seven-route reading, Begin journey, and reduced motion, but automated checks do not replace founder visual acceptance or true browser-zoom/age-inclusive reading review.
- `git diff --check`: passed. Bounded `graphify update .`: passed (5,489 nodes, 6,214 edges, 370 communities; HTML visualization skipped at the 5,000-node limit). The AST refresh does not certify founder meaning or asset rights.

## K. Rollback and release sequence

- **Current local work:** no commit/deployment exists to roll back. Preserve the 12J/12K dirty work; reverse only the bounded 12L name, metadata, test, and gallery-image changes if rejected. Never reset the worktree wholesale.
- **Future DNS cutover:** before touching Porkbun, export/record the three current apex A records, `www` CNAME, TTLs, and current redirect. Add the domain to the approved Vercel project, obtain project-specific required records, stage the exact change, verify both hosts and SSL, then seek launch authorization. If verification fails, restore the recorded records and confirm the prior redirect responds; do not alter registrar credentials or 2FA.
- **Future commerce rollout:** keep the current request-details path until test-mode payment, webhook/participant idempotency, receipts, failed/cancelled paths, and support owner pass. Disable/rollback the checkout entrypoint on failure; never grant membership or participant access from an unverified browser redirect alone.

Technical checks support a review checkpoint. They do **not** authorize production deployment, DNS change, live payment, or public release.
