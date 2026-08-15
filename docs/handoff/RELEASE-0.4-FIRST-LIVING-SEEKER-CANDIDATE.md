# Release 0.4 First Living Seeker Candidate

Prepared: 2026-08-15

## Status

```text
Release 0.4 - First Living Seeker

ARCHITECTURE: APPROVED
PREVIEW PROOF: PASSED
CANONICAL SOURCE: CANDIDATE PREPARED
PRODUCTION ACTIVATION: NOT APPROVED
TEAM OPERATIONS: NOT COMPLETE
```

Production is not active for First Living Seeker writes.

## Canonical Commit SHA

Canonical implementation commit:

```text
87677973574abc32bf99721d271a919dcda050e2
```

Branch prepared for review:

```text
codex/begin-ux-refinement
```

Base before Sprint 11F canonicalization:

```text
origin/main: a0c3ffce6343c7c5d463ed3f0013c9ac532a8741
```

## Included Sprint 11 Changes

Included in the release-candidate implementation commit:

- Sprint 11C secure server write boundary for Begin completion.
- Sprint 11C Airtable live schema constants using actual table and field IDs.
- Sprint 11C server-side validation, field allowlisting, normalization, idempotency, and rate limiting.
- Sprint 11C server-owned deterministic pathway assignment.
- Sprint 11C local fallback with short-lived pending-write retention and delete-local-journey capability.
- Sprint 11C `/api/begin/complete` and `/api/request-signal` Vercel function entrypoints.
- Sprint 11C Begin connection from consent to persistence attempt to pathway reveal to Shala handoff.
- Sprint 11C Request/Signal write path requiring explicit seeker action and usable contact.
- Sprint 11D documentation cleanup for current Airtable production guidance.
- Sprint 11D manual Airtable operating view setup instructions.
- Sprint 11D/11E proof reports and Graphify blocker record.
- Sprint 11E enabled-write addendum with fake-data Airtable proof IDs and verification results.

Preserved behavior:

- Browser never receives a privileged Airtable PAT.
- Browser-submitted pathway is not authoritative.
- No-consent and consent-without-contact journeys remain local-only.
- Shala remains Open for this proof.
- Begin and Request/Signal cannot create Access Grants.
- No initiation, retreat approval, reflection, payment, deposit, Moon Rhythm, Fire Circle, or Temple Key implementation was added.

## Excluded Or Test-Only Changes

Excluded from the release candidate:

- Private chat handover file `SHAKTI_SYSTEM_OS_CHAT_HANDOVER_2026-08-14.md`.
- Generated Playwright/test output directories.
- Local `.vercel` state.
- `.env` files and local secrets.
- Real seeker information.
- Production Airtable write activation.

Retained only as review evidence:

- Sprint 11E fake Airtable proof records using `sprint11e-test@example.com` and `BEGIN-11E-001`.
- Sprint 11C seed/schema QA record IDs documented in Airtable architecture docs.

## Airtable Schema State

Live base:

```text
AIRTABLE_BASE_ID=appj3hDhI0HoulNrf
```

Operational tables in the First Living Seeker loop:

```text
Seekers: tblKLBelhnhTaoS6o
Intake Responses: tblfGqSLi8NLBpSVv
Requests & Signals: tblcKmCTyPhk68jLU
Progress: tblR04jj5MNMXJ69N
Access Grants: tblTQ0jfG1pftUKxS
```

Sprint 11 write permissions by route:

```text
/api/begin/complete -> Seekers, Intake Responses, Progress
/api/request-signal -> Requests & Signals
```

Infrastructure-only in Sprint 11:

```text
Access Grants
```

Deferred:

```text
Reflections
Events
```

Quarantined from v1 operational writes:

```text
Initiation Keys
Environmental Memory
```

## Environment Requirements

Default:

```text
BEGIN_WRITES_ENABLED=false
```

Approved Preview write proof requires server-only variables:

```text
BEGIN_WRITES_ENABLED=true
AIRTABLE_BASE_ID=appj3hDhI0HoulNrf
AIRTABLE_PERSONAL_ACCESS_TOKEN=<server-only Airtable PAT>
```

The browser must not use:

```text
VITE_AIRTABLE_TOKEN
```

or any other privileged Airtable write token.

Vercel environment scope observed during Sprint 11F:

```text
AIRTABLE_BASE_ID: Preview
BEGIN_WRITES_ENABLED: Preview
AIRTABLE_PERSONAL_ACCESS_TOKEN: Production, Preview
VITE_SHEET_ENDPOINT: Production, Preview
```

Production Begin writes remain disabled because `AIRTABLE_BASE_ID` and `BEGIN_WRITES_ENABLED` are not scoped to Production. The PAT is still visible as dual-scoped in Vercel and should be manually retargeted or recreated as Preview-only before any production release decision.

## Security Boundary

The release candidate preserves these boundaries:

- No Airtable personal access token in browser code.
- No `VITE_AIRTABLE_TOKEN` production write path.
- Server validates all Begin and Request/Signal payloads.
- Server allowlists fields and rejects unexpected fields.
- Server derives and persists pathway assignment.
- Client pathway may be compared but cannot control persistence.
- Explicit Begin consent is required before persistence.
- A stable contact method is required before creating a Seeker.
- Local fallback avoids indefinite localStorage retention of email, phone, response text, or request messages.
- Request/Signal requires explicit seeker action.
- Begin and Request/Signal cannot create Access Grants.
- Operational logging avoids sensitive seeker content.

## Verification Results

Completed locally in `apps/web` during Sprint 11F:

```text
npm install
npm run lint
npm run check:backend
npm run check:begin-write
npm run check:vault
npm run build
npm audit --audit-level=moderate
npm run test:begin-browser
```

Results:

```text
npm install: pass
lint: pass with one existing React compiler warning in EnvironmentalCanopy.tsx
check:backend: pass
check:begin-write: pass
check:vault: pass
build: pass
npm audit --audit-level=moderate: 0 vulnerabilities
browser QA: pass, 2 tests
```

Security/debris checks:

```text
No PAT-shaped Airtable secret found in source or built browser output.
No `.env` or `.vercel` state included.
No real seeker data included.
```

## Known Limitations

- Release 0.4 production activation is not approved.
- Manual Airtable review views still need human confirmation.
- The Vercel PAT variable is still dual-scoped in the UI, although Production Begin writes are disabled by the missing Production base ID and write flag.
- Graphify refresh remains blocked by a silent hang.
- The release candidate still depends on human review ownership for `Requests - Needs Review`.
- Existing lint warning remains in `apps/web/src/shala/components/EnvironmentalCanopy.tsx`; it does not block the First Living Seeker proof.
- Sprint 11E fake Airtable proof records remain in the live base for human review and should not be deleted until their IDs are recorded.

## Manual Airtable View Status

Manual setup remains required for:

```text
Requests - Needs Review
Begin Completions - Recent
Progress - Pathway Assigned
Access Grants - Active
```

The available tooling did not expose a reliable view-creation or view-inspection path. The exact manual setup instructions are documented in:

```text
docs/architecture/SHAKTI-SYSTEM-AIRTABLE-LIVE-BASE.md
docs/handoff/FIRST-LIVING-SEEKER-ENABLED-WRITE-ADDENDUM-v1.md
```

Team handoff should wait until `Requests - Needs Review` is visible and owned.

## Graphify Blocker Status

Graphify context was read before canonicalization:

```text
graphify-out/GRAPH_REPORT.md
```

The readable report remains stale:

```text
Built from commit: 49ebd475
```

Sprint 11F attempted:

```text
graphify update .
```

Result:

```text
No stdout after 30 seconds.
Process stopped cleanly.
```

Classification:

```text
Maintenance debt
Not a runtime dependency
Not a release-candidate blocker
```

## Exact Production Activation Requirements

Do not activate Production writes until a human explicitly approves Release 0.4 production activation.

Before activation:

1. Confirm the canonical release-candidate branch has been reviewed.
2. Confirm Airtable human-review views exist.
3. Name the owner of `Requests - Needs Review`.
4. Define response rhythm and escalation rules.
5. Confirm what information operators may view.
6. Retarget or recreate `AIRTABLE_PERSONAL_ACCESS_TOKEN` so it is scoped only to the approved environments.
7. Add Production `AIRTABLE_BASE_ID` only after approval.
8. Set Production `BEGIN_WRITES_ENABLED=true` only after approval.
9. Deploy from canonical GitHub source.
10. Re-run secret scan and write-boundary verification.
11. Execute one approved fake Production smoke test before real seeker traffic, if human-approved.

## Rollback Procedure

Immediate environment rollback:

```text
Set BEGIN_WRITES_ENABLED=false.
Remove Production AIRTABLE_BASE_ID if it was added.
Remove Production AIRTABLE_PERSONAL_ACCESS_TOKEN if it was added.
Redeploy from the last known safe commit if needed.
```

Code rollback:

```text
Revert the First Living Seeker implementation commit.
Redeploy the prior canonical commit.
Confirm /begin falls back to private local continuation.
```

Airtable cleanup after human review:

```text
Delete Sprint 11E fake Request/Signal record.
Delete Sprint 11E fake Progress record.
Delete Sprint 11E fake Intake Response records.
Delete Sprint 11E fake Seeker record.
Do not delete any non-Sprint 11E record.
```

## Release Recommendation

```text
Release 0.4 architecture: APPROVED
Release 0.4 Preview proof: PASSED
Release 0.4 canonical candidate: PREPARED
Release 0.4 Production activation: NOT APPROVED
```

Stop for human review before production activation.
