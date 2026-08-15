# Shakti System OS — Live Airtable Base

## Status

A live Airtable base has been created under the AMA MOB OS V2 workspace.

This base is the operational backend for the Shakti System OS.

---

# Base

```text
Name: Shakti System OS
Base ID: appj3hDhI0HoulNrf
Workspace: AMA MOB OS V2
Workspace ID: wspF6Ye2ola6vWWW2
```

Do not commit Airtable tokens to GitHub.

Only the base ID may be referenced in documentation and local `.env` setup.

---

# Created Tables

```text
Seekers
Library Assets
Practices
Initiation Keys
Retreats
Retreat Applications
Environmental Memory
Intake Responses
Requests & Signals
Progress
Access Grants
```

---

# Table IDs

```text
Seekers: tblKLBelhnhTaoS6o
Library Assets: tblAwFHIjlkzYG9zD
Practices: tblvUQpdVjz1VWkJr
Initiation Keys: tblAd4o2MPALUThgN
Retreats: tblClCsYwmXd3YX0T
Retreat Applications: tbluLkd1K3zV3nObM
Environmental Memory: tblPSReXWjSawoiW1
Intake Responses: tblfGqSLi8NLBpSVv
Requests & Signals: tblcKmCTyPhk68jLU
Progress: tblR04jj5MNMXJ69N
Access Grants: tblTQ0jfG1pftUKxS
```

---

# Current Production Guidance

Current write architecture:

```text
Sprint 11C server boundary
```

Rules:

```text
Browser Airtable writes are forbidden.
VITE_AIRTABLE_TOKEN is not a production-write mechanism.
BEGIN_WRITES_ENABLED=false remains the default.
Server-only Airtable credentials are required before writes can occur.
The browser must never receive an Airtable Personal Access Token.
```

Required server-only environment variables for approved preview/write tests:

```text
BEGIN_WRITES_ENABLED=true
AIRTABLE_BASE_ID=appj3hDhI0HoulNrf
AIRTABLE_PERSONAL_ACCESS_TOKEN=<server-only-token>
```

Allowed Sprint 11C write surface:

```text
/api/begin/complete
  may write Seekers, Intake Responses, and Progress.

/api/request-signal
  may write Requests & Signals after explicit action and usable contact.
```

Forbidden Sprint 11C write surface:

```text
Browser -> Airtable privileged writes
Begin -> Access Grants
Request/Signal -> Access Grants
Initiation Keys writes
Environmental Memory writes
Retreat Application writes
Reflection writes
Payment/deposit writes
Passive telemetry writes
```

---

# Sprint 11C First Living Seeker Schema

Created on 2026-08-15 for the approved first living-seeker loop:

```text
Portal -> Begin -> explicit consent -> secure server-side write -> Seeker -> Intake Responses -> pathway assignment -> optional Request/Signal -> Shala
```

Created tables:

```text
Intake Responses: tblfGqSLi8NLBpSVv
Requests & Signals: tblcKmCTyPhk68jLU
Progress: tblR04jj5MNMXJ69N
Access Grants: tblTQ0jfG1pftUKxS
```

Default views created automatically by Airtable:

```text
Intake Responses: viwfqURAk5psekk16
Requests & Signals: viwPEYCUqu4EzFgLo
Progress: viwde0XZJGEdNynO2
Access Grants: viwCMMTmHK1hM4yc1
```

The Airtable connector available during Sprint 11C did not expose a view-creation tool, so the approved human-review views still require manual Airtable setup.

Sprint 11C write boundary:

```text
BEGIN_WRITES_ENABLED=false by default.
Browser code never uses a privileged Airtable write token.
Server calculates pathway from approved responses.
Begin writes Seekers, Intake Responses, and Progress only.
Request/Signal writes Requests & Signals only after explicit action and usable contact.
Access Grants is infrastructure-only in Sprint 11C.
Reflections and Events remain deferred.
Initiation Keys and Environmental Memory remain quarantined from v1 writes.
```

Test records created for schema QA only:

```text
Seeker: SEE-TEST-001 -> recD7xisY2QON45Ri
Intake Responses:
- INT-TEST-001-current -> recpTFM7ULl2Q4fKi
- INT-TEST-001-pace -> recojjiWYjAfrmkJ9
Progress: PROG-TEST-001-PATHWAY -> recsvMhVUcuipY1Fv
Request/Signal: SIG-TEST-001-GUIDE -> recEX8O4r6JPkX3sE
```

No Access Grant test record was created.

---

# Library Assets Lifecycle Field

`Library Assets` includes a production lifecycle field:

```text
Field: Knowledge Maturity
Field ID: fldfsRCPBUCSbChoF
Type: single select
```

Options:

```text
Raw Recording
Transcript Generated
Transcript Reviewed
Doctrine Extracted
Media Tagged
Library Ready
Sheetal Approved
Published
Repurposed Complete
```

This field tracks content maturity. It does not replace `Publishing Status`,
which remains the app visibility and approval gate.

---

# Seeded Records

## Initiation Keys

```text
KEY-SEEKER-001
KEY-PRACTITIONER-001
KEY-CIRCLE-001
```

## Practices

```text
PRAC-GROUNDING-001
PRAC-DURGA-001
PRAC-REFLECTION-001
```

These are seed records for system testing only. They should be reviewed and replaced or approved by Sheetal/team before public-facing use.

---

# Manual Airtable Operating Views

The available Airtable connector did not expose a view-creation tool during Sprint 11C/11D. Create these views manually in Airtable.

## Requests - Needs Review

Table:

```text
Requests & Signals
```

Purpose:

```text
Human-review queue for explicit seeker requests and signals.
```

Users:

```text
Sheetal/team reviewers
```

Filters:

```text
Status is Needs Review
Human Review Needed is checked
```

Visible fields:

```text
Signal ID
Signal Type
Created At
Seeker
Message
Source Path
Source Node
Related Intake Responses
Consent Version
Assigned Reviewer
Status
Human Review Needed
```

Sort:

```text
Created At descending
```

## Begin Completions - Recent

Table:

```text
Intake Responses
```

Purpose:

```text
Recent consented Begin response review, grouped by Begin Session ID and Seeker.
```

Users:

```text
Operations reviewer, implementation QA
```

Filters:

```text
Source Path is /begin
Created At is within the last 30 days
```

Visible fields:

```text
Intake Response ID
Created At
Seeker
Begin Session ID
Station Key
Question Key
Response Value
Response Label
Circle Score Impact
One-on-One Score Impact
Container Score Impact
Retreat Score Impact
Consent Version
Requests & Signals
```

Sort:

```text
Created At descending
Begin Session ID ascending
Station Key ascending
```

## Progress - Pathway Assigned

Table:

```text
Progress
```

Purpose:

```text
Audit trail for server-derived pathway assignment.
```

Users:

```text
Implementation QA, operations reviewer
```

Filters:

```text
Event Type is Pathway Assigned
Source is Begin
```

Visible fields:

```text
Progress ID
Occurred At
Seeker
Related Pathway
Begin Session ID
Idempotency Key
Source
Notes
```

Sort:

```text
Occurred At descending
```

## Access Grants - Active

Table:

```text
Access Grants
```

Purpose:

```text
Internal access-state audit view. This table is infrastructure-only for Sprint 11C/11D and must not be written by Begin or Request/Signal.
```

Users:

```text
System steward, future access reviewer
```

Filters:

```text
Internal Access State is Active
Expires At is empty OR Expires At is after today
```

Visible fields:

```text
Access Grant ID
Seeker
Access Area
Internal Access State
Seeker-Facing State
Source
Reason
Approved By
Approved At
Expires At
Notes
```

Sort:

```text
Approved At descending
Expires At ascending
```

---

# Historical / Archive: Sprint 6 Read-Only Backend Notes

This section is historical. It is preserved for context only and is not current production-write guidance.

## Integration Rule

The app should initially read from Airtable in read-only mode.

Do not enable app writes for seeker state, journal entries, payments, or environmental memory until:

1. schema is stable
2. privacy rules are documented
3. access model is confirmed
4. human review process is defined

---

## Historical Local Read-Only Environment Setup

This setup was for local read-only adapter experiments. It is not a production write mechanism.

For local read-only development only:

```text
VITE_AIRTABLE_BASE=appj3hDhI0HoulNrf
VITE_AIRTABLE_TOKEN=<local-only-token>
```

`VITE_AIRTABLE_TOKEN` must not be used for production writes and must not be exposed in production browser bundles.

---

# Notion Dashboard

A Notion control page has been created under AMA MOB OS -Clients:

```text
Shakti System OS — Backend + Vault Activation
https://app.notion.com/p/3972804e252f81cfa81bc59910c184f2
```

This page is the human operating dashboard for backend activation, Vault sync, Airtable, Drive, GitHub, and Vercel coordination.

---

## Sprint 6 — Read-Only Backend Connection

Goal:

Wire the app to read approved Airtable records without changing visuals or enabling writes.

Tasks:

1. Add table ID constants for live Airtable base.
2. Add read-only fetch methods behind `AirtableService`.
3. Add mock fallback behavior if env is missing.
4. Add sample read adapters for `Practices` and `Initiation Keys`.
5. Do not expose Airtable token client-side in production without a secure server/proxy decision.
6. Document deployment security risk before live token use.

Implemented Sprint 6 boundary:

```text
apps/web/src/constants/liveAirtable.ts
apps/web/src/services/AirtableReadOnlyClient.ts
apps/web/src/services/PracticeReadAdapter.ts
apps/web/src/services/InitiationKeyReadAdapter.ts
apps/web/src/data/mockBackend.ts
docs/architecture/ENV_CONFIG.md
```

The app still does not consume Airtable data in the UI. The adapters are available for the next integration sprint.

---

## Historical Security Note

A Vite frontend cannot safely hold a private Airtable token in browser-exposed environment variables.

Before production use, decide between:

```text
Serverless API route
Backend proxy
Vercel Function
Supabase/Firebase intermediary
Manual export/import for early MVP
```

For now, treat Airtable as operational backend and app integration as staged/read-only architecture.

Sprint 11C adds a server-only write boundary for the Begin loop. Production writes must remain disabled until human review approves the implementation report and server-only environment variables are configured.
