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
```

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

# Integration Rule

The app should initially read from Airtable in read-only mode.

Do not enable app writes for seeker state, journal entries, payments, or environmental memory until:

1. schema is stable
2. privacy rules are documented
3. access model is confirmed
4. human review process is defined

---

# Local Environment Setup

Add to local `.env` only:

```text
VITE_AIRTABLE_BASE=appj3hDhI0HoulNrf
VITE_AIRTABLE_TOKEN=<local-only-token>
```

Do not commit `.env`.

---

# Notion Dashboard

A Notion control page has been created under AMA MOB OS -Clients:

```text
Shakti System OS — Backend + Vault Activation
https://app.notion.com/p/3972804e252f81cfa81bc59910c184f2
```

This page is the human operating dashboard for backend activation, Vault sync, Airtable, Drive, GitHub, and Vercel coordination.

---

# Next Sprint

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

# Security Note

A Vite frontend cannot safely hold a private Airtable token in browser-exposed environment variables.

Before production use, decide between:

```text
Serverless API route
Backend proxy
Edge function
Supabase/Firebase intermediary
Manual export/import for early MVP
```

For now, treat Airtable as operational backend and app integration as staged/read-only architecture.
