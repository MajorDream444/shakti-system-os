# Release 0.4 Canonicalization Report

Prepared: 2026-08-15

## Status

```text
Release 0.4 - First Living Seeker

GitHub main: canonical deployment source of truth
Architecture: approved
Preview proof: passed
Production writes: disabled
Production activation: not approved
```

This report records the canonicalization review requested after Sprint 11E. It does not add features, redesign the experience, or enable Production writes.

## Repository Reality Check

Current canonical main:

```text
origin/main: 58f07cb3d9e4eb0849686b9ec50bf8eed15df631
```

`origin/main` already includes the First Living Seeker release-candidate implementation through:

```text
PR #6: Merge pull request #6 from MajorDream444/codex/begin-ux-refinement
Implementation commit: 87677973574abc32bf99721d271a919dcda050e2
Release gate commit: f8b7e28c8245a1557bf5288a5a9592af468d7795
```

Diff result:

```text
origin/main...origin/codex/begin-ux-refinement: empty
origin/main..origin/codex/begin-ux-refinement: empty
```

Conclusion: the proven Sprint 11C-11E source is already canonical on `main`; no additional implementation merge is required.

## File Classification

Classification of the files introduced or modified by the canonical Sprint 11 First Living Seeker merge:

| File | Classification | Notes |
| --- | --- | --- |
| `.gitignore` | KEEP | Excludes local env, Vercel state, and generated QA artifacts. |
| `AGENTS.md` | KEEP | Repo operating doctrine and Graphify guidance. |
| `api/begin/complete.ts` | KEEP | Root Vercel API shim for Begin completion. |
| `api/request-signal.ts` | KEEP | Root Vercel API shim for explicit request/signal. |
| `apps/web/.env.example` | KEEP | Placeholder-only environment documentation. |
| `apps/web/api/begin/complete.ts` | KEEP | App-level API entrypoint mirror. |
| `apps/web/api/request-signal.ts` | KEEP | App-level request/signal entrypoint mirror. |
| `apps/web/e2e/begin-qa.spec.ts` | KEEP | Browser QA coverage, not generated test debris. |
| `apps/web/eslint.config.js` | KEEP | Verification support. |
| `apps/web/package-lock.json` | KEEP | Dependency lock for reproducible install. |
| `apps/web/package.json` | KEEP | Adds verification scripts for Begin write boundary. |
| `apps/web/src/begin/BeginApp.tsx` | KEEP | Begin flow wiring with consent, persistence attempt, and Shala handoff. |
| `apps/web/src/begin/begin.css` | KEEP | Frozen visual experience support. |
| `apps/web/src/begin/components/Screens/ChoiceScreen.tsx` | KEEP | Begin response capture UI. |
| `apps/web/src/begin/components/Screens/Handoff.tsx` | KEEP | Safe saved/local/private continuation language. |
| `apps/web/src/begin/components/Screens/PathReveal.tsx` | KEEP | Pathway reveal and optional guide request surface. |
| `apps/web/src/begin/components/Screens/Threshold.tsx` | KEEP | Consent-aware threshold screen. |
| `apps/web/src/begin/types.ts` | KEEP | Begin flow typing. |
| `apps/web/src/checks/beginWriteChecks.ts` | KEEP | Backend security/idempotency verification. |
| `apps/web/src/config/env.ts` | KEEP | Environment boundary and defaults. |
| `apps/web/src/constants/liveAirtable.ts` | KEEP | Actual live Airtable IDs; no invented IDs. |
| `apps/web/src/constants/storage.ts` | KEEP | Local retention keys and cleanup support. |
| `apps/web/src/contracts/beginWriteContract.ts` | KEEP | Shared request/response contract. |
| `apps/web/src/server/airtableWriteRepository.ts` | KEEP | Server-only Airtable write repository. |
| `apps/web/src/server/beginWriteHandlers.ts` | KEEP | Server-owned Begin and Request/Signal handling. |
| `apps/web/src/server/httpAdapters.ts` | KEEP | Function response adapters. |
| `apps/web/src/server/writeBoundaryConfig.ts` | KEEP | Fail-closed server config and feature flag boundary. |
| `apps/web/src/server/writeBoundaryRateLimit.ts` | KEEP | Abuse control for write endpoints. |
| `apps/web/src/server/writeBoundaryValidation.ts` | KEEP | Strict validation and allowlisting. |
| `apps/web/src/services/BeginLocalFallbackService.ts` | KEEP | Short-lived local fallback and cleanup. |
| `apps/web/src/services/BeginWriteClient.ts` | KEEP | Browser-to-server write client; no Airtable secret. |
| `apps/web/src/services/PathwayAssignmentService.ts` | KEEP | Deterministic trusted pathway assignment logic. |
| `apps/web/src/services/RequestSignalRules.ts` | KEEP | Explicit request/signal eligibility rules. |
| `apps/web/src/shala/ShalaApp.tsx` | KEEP | Safe Shala entry after Begin. |
| `apps/web/src/shala/components/JourneyRoom.tsx` | KEEP | Shala continuity display. |
| `apps/web/src/shala/components/RetreatRoom.tsx` | KEEP | Preserves retreat interest/readiness boundary. |
| `apps/web/src/shala/shala.css` | KEEP | Frozen visual support. |
| `apps/web/tsconfig.json` | KEEP | TypeScript verification support. |
| `docs/architecture/AIRTABLE_SCHEMA.md` | KEEP | Current schema/write-boundary documentation. |
| `docs/architecture/SHAKTI-SYSTEM-AIRTABLE-LIVE-BASE.md` | KEEP | Live base guidance, manual views, and production write boundary. |
| `docs/handoff/BEGIN-UX-REFINEMENT-REPORT.md` | KEEP | Approved UX refinement evidence. |
| `docs/handoff/FIRST-LIVING-SEEKER-ENABLED-WRITE-ADDENDUM-v1.md` | KEEP | Sprint 11E credentialed preview proof. |
| `docs/handoff/FIRST-LIVING-SEEKER-IMPLEMENTATION-REPORT-v1.md` | KEEP | Sprint 11C implementation record. |
| `docs/handoff/FIRST-LIVING-SEEKER-PREVIEW-GATE-REPORT-v1.md` | KEEP | Sprint 11D preview gate record. |
| `docs/handoff/GRAPHIFY-REFRESH-BLOCKER.md` | KEEP | Documents Graphify maintenance debt. |
| `docs/handoff/RELEASE-0.4-FIRST-LIVING-SEEKER-CANDIDATE.md` | KEEP | Release candidate gate. |

No Sprint 11 source file was classified as `SUPERSEDED` after comparison with current `origin/main`.

## Test-Only And Discarded Material

Excluded from Git:

| File or artifact | Classification | Notes |
| --- | --- | --- |
| `.env*` | DISCARD | Must never enter GitHub. |
| `.vercel/` | DISCARD | Local deployment state. |
| `apps/web/test-results/` | TEST-ONLY | Generated Playwright output. |
| `apps/web/playwright-report/` | TEST-ONLY | Generated QA report. |
| `apps/web/qa-artifacts/` | TEST-ONLY | Local screenshots/artifacts. |
| `.DS_Store` | DISCARD | Local macOS metadata. |
| `SHAKTI_SYSTEM_OS_CHAT_HANDOVER_2026-08-14.md` | DISCARD | Private working context; not a release artifact. |

## Claude Branch Review

Reviewed branch:

```text
origin/claude/festive-edison-ULWrl
```

Unique files:

```text
docs/sessions/Sheetal_Meeting_Prep_And_Client_Operating_Package.pdf
docs/sessions/Sheetal_Shakti_Verse_Day5_2026-05-31_Notes.md
```

Decision:

| File | Classification | Reason |
| --- | --- | --- |
| `docs/sessions/Sheetal_Meeting_Prep_And_Client_Operating_Package.pdf` | DISCARD from Release 0.4 PR | Client operating/session package with milestone/payment context; not needed for First Living Seeker code canonicalization. |
| `docs/sessions/Sheetal_Shakti_Verse_Day5_2026-05-31_Notes.md` | DISCARD from Release 0.4 PR | Raw meeting notes/transcript with personal details and contact links; should not be pulled into the release branch without a separate privacy/provenance review. |

The stale Claude branch was not merged wholesale.

## Conflicts Resolved

No source conflicts were present because `origin/main` already contains the Sprint 11 implementation.

Resolved process contradiction:

```text
Older report language said the implementation was local/uncommitted.
Current GitHub reality shows PR #6 has already merged it into main.
```

Current state supersedes the older report language.

## Production Write Boundary

Production Begin writes remain disabled.

Required Production activation remains separate and human-approved:

```text
BEGIN_WRITES_ENABLED=true
AIRTABLE_BASE_ID=<approved production scope>
AIRTABLE_PERSONAL_ACCESS_TOKEN=<server-only approved production scope>
```

Do not add these to Production until human approval.

## Next Gate

After this canonicalization report PR is reviewed:

1. Merge documentation-only canonicalization report if approved.
2. Deploy Preview from current `main`.
3. Verify `/`, `/begin`, `/shala`, `/api/begin/complete`, and `/api/request-signal`.
4. Keep Production Begin writes disabled.
5. Complete Airtable human-review views and team ownership before real seeker activation.
