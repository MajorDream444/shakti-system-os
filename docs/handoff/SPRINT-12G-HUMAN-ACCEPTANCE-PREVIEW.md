# Sprint 12G - Human Acceptance Preview

Owner: Codex  
Mode: Human acceptance preview gate  
Created: 2026-09-02  
Repository: `MajorDream444/shakti-system-os`  
Branch: `codex/sprint-12g-founder-method-stranger-clarity`  
Status: HUMAN ACCEPTANCE REVIEW REQUIRED

## Source

Expected source SHA:

`0a463683f11cb32941d49071e3437b90fac6a924`

Confirmed local branch SHA:

`0a463683f11cb32941d49071e3437b90fac6a924`

Confirmed remote branch SHA:

`0a463683f11cb32941d49071e3437b90fac6a924`

Current `origin/main` remains:

`3b2401f39d079c32d0888b9e9ff91c87b37ae7a4`

## Vercel CLI

Version before:

`59.4.0`

Version after:

`59.11.2`

No project configuration was changed as part of the CLI upgrade.

## Preview Deployment

Preview URL:

`https://shakti-system-ctrxxcx5i-major-hanzoais-projects.vercel.app`

Branch alias:

`https://shakti-system-os-git-codex-sprin-95036a-major-hanzoais-projects.vercel.app`

Deployment ID:

`dpl_tNYYtCd7wcVy4aFsuUjMD2XH7Hmj`

Deployment status:

`Ready`

Deployment target:

`preview`

Deployment source metadata:

- `githubCommitOrg`: `MajorDream444`
- `githubCommitRepo`: `shakti-system-os`
- `githubCommitRef`: `codex/sprint-12g-founder-method-stranger-clarity`
- `githubCommitSha`: `0a463683f11cb32941d49071e3437b90fac6a924`
- `githubCommitMessage`: `Implement Sprint 12G stranger clarity pass`

The Preview corresponds to the expected Sprint 12G implementation SHA.

## Production State

No Production deployment was performed.

No merge was performed.

Production Begin writes remain disabled.

Vercel environment inventory showed:

- `AIRTABLE_PERSONAL_ACCESS_TOKEN`: Preview only
- `AIRTABLE_BASE_ID`: Preview only
- `BEGIN_WRITES_ENABLED`: Preview only
- `VITE_SHEET_ENDPOINT`: Production and Preview, legacy/browser-safe endpoint variable

No Airtable credentials were created, copied, moved, or added to Production.

## Write State

Preview remains governed by existing Preview environment configuration.

Production writes remain disabled because the server-only Airtable credential, base ID, and `BEGIN_WRITES_ENABLED` are not scoped to Production.

No Airtable mutation was performed during this gate.

## Routes Checked

Protected deployment route reachability was checked with `vercel curl`:

| Route | Result |
|---|---|
| `/` | `HTTP 200` |
| `/offerings` | `HTTP 200` |
| `/begin` | `HTTP 200` |
| `/shala` | `HTTP 200` |
| `/about-sheetal` | `HTTP 200` |
| `/api/begin/complete` | `HTTP 405` on GET with `Allow: POST` |
| `/api/request-signal` | `HTTP 405` on GET with `Allow: POST` |

The API results confirm the routes exist and reject unsupported GET requests.

## Objective Verification

The protected Preview is behind Vercel Deployment Protection. Browser automation saw the Vercel login page, not the rendered application. The Vercel connector could not generate a temporary share URL for this deployment.

Because full protected-browser rendering was blocked, objective verification used:

1. Vercel deployment metadata to confirm exact source SHA.
2. `vercel inspect` to confirm Preview target, Ready status, and API functions.
3. `vercel curl` to confirm protected route reachability.
4. Protected bundle fetch and string scan to confirm the deployed app contains the Sprint 12G implementation.

Deployed bundle checks passed for:

- `Shakti Shadow & Somatics`
- `Sheetal Kandola's body of work`
- `A bridge between nervous-system care`
- `Listen to the body`
- `Meet the shadow`
- `Return to practice`
- `Choose the next doorway`
- `living between worlds`
- `One body of work. Different ways to enter`
- `6-, 9-, or 12-session private pathways`

Deployed bundle prohibited-language checks found no matches for:

- `somatic breathwork`
- `single session`
- `standalone session`
- `one-off support`
- `try a session`
- `buy now`
- `pay deposit`
- `King's College`
- `LSHTM`
- `MSc Global Mental Health`
- `approved Shri Yantra`
- `Doctrine Passport`
- `approval gate`
- `access rule`

## Existing Verification Still Valid

Sprint 12G implementation verification passed locally at the same source SHA before this Preview gate:

- `npm run lint`
- `npm run build`
- `npm run check:backend`
- `npm run check:begin-write`
- `npm run check:vault`
- `npm audit --audit-level=moderate`
- `git diff --check`
- `npm run test:begin-browser`
- `npm run test:visual-review`
- `npx playwright test e2e/sprint12g-stranger-clarity.spec.ts --workers=1 --reporter=line`
- `npx playwright test e2e/sprint12f-founder-acceptance.spec.ts e2e/sprint12g-stranger-clarity.spec.ts --workers=1 --reporter=line`

## Known WATCH Items

These remain human acceptance questions, not automated pass/fail items:

- Does the clarity feel human and not over-explained?
- Does mobile feel calm rather than text-heavy?
- Is the public `sadhana` reference appropriate at its current depth?

## Remaining Human Acceptance Questions

A. Does the body of work feel immediately understandable?

B. Does it sound like Sheetal rather than an explanation of Sheetal?

C. Is there enough depth without over-explaining?

D. Does mobile feel calm?

E. Is the public `sadhana` reference appropriate at its current depth?

## Boundary Confirmation

This gate did not:

- merge
- deploy Production
- change copy
- change backend
- change Airtable
- enable writes
- introduce commerce
- begin Sprint 12H

## Recommendation

Use the Preview URL above for Major / Sheetal human acceptance.

Because Deployment Protection blocked automated rendered-page inspection, a human with Vercel access should open the protected Preview directly on desktop and mobile. The deployment identity and deployed bundle content are verified against the expected Sprint 12G SHA.
