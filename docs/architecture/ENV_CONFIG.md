# Environment Configuration

## Browser Variables

The app reads environment values through:

```text
apps/web/src/config/env.ts
```

Local development may use only public configuration:

```text
VITE_STRIPE_PUBLIC_KEY=
VITE_GOOGLE_DRIVE_ROOT=
VITE_SHEET_ENDPOINT=
VITE_APP_ENV=development
VITE_VERCEL_ANALYTICS_ENABLED=false
```

`.env` must remain local and ignored by Git.

## Intake Endpoint

`VITE_SHEET_ENDPOINT` may point to the approved Google Apps Script web app used
by the `/begin` handoff screen. It is an optional browser-facing submission
endpoint, not a private credential.

When it is missing, the intake experience remains functional and stores the
handoff locally through `PersistenceService`. No live Google Sheet submission
is attempted.

Do not add Airtable credentials or base identifiers to `VITE_*` variables. The
current browser adapters use mock fallback data until an approved server-side
read endpoint exists.

## Server Write Variables

The `/begin` write functions read these names on the server only:

```text
AIRTABLE_BASE_ID
AIRTABLE_PERSONAL_ACCESS_TOKEN
BEGIN_WRITES_ENABLED
```

`AIRTABLE_TOKEN` remains a legacy server-only fallback in code. New configuration
must use `AIRTABLE_PERSONAL_ACCESS_TOKEN`. A temporary duplicate Preview variable
may exist only during credential migration and should be removed after the
canonical name passes the bounded Preview QA check.

Writes are disabled unless `BEGIN_WRITES_ENABLED` is exactly `true`. Missing,
empty, and `false` all fail closed.

## Airtable Token Security

Do not put a private Airtable token into any Vite variable.

Vite exposes `VITE_*` values to browser code. `VITE_AIRTABLE_TOKEN` is forbidden
in Local, Preview, and Production environments.

## Read Boundary

The app has one app-facing read boundary:

```text
BackendRepository
```

The repository owns read cache behavior and routes current backend reads for:

```text
Practices
Initiation Keys
Library Assets
```

The read adapters return mock fallback records through `BackendRepository`.
Direct browser reads from Airtable are disabled in every environment.

React components should not call Airtable adapters directly. Keeping Airtable behind the repository protects the sanctuary UI from future backend migrations.

## Before Live Production Reads

Implement an approved server-side read path:

```text
Vercel Function
Backend proxy
Manual approved export/import for early MVP
```

Only that backend should hold private Airtable credentials.

## HAMAL Environment Review - 2026-09-19

Current configuration intent:

```text
Preview: AIRTABLE_BASE_ID and the canonical Sensitive credential are present;
BEGIN_WRITES_ENABLED remains absent or false outside the bounded QA build;
VITE_AIRTABLE_TOKEN is absent.

Production: AIRTABLE_BASE_ID is present; the canonical credential is intentionally
not installed yet; BEGIN_WRITES_ENABLED is absent; VITE_AIRTABLE_TOKEN is absent.
```

A bounded Preview build may set `AIRTABLE_QA_VERIFY=true` to run the synthetic
authentication/schema/write/replay/cleanup script. That flag does not enable the
public API endpoints; public writes remain governed by `BEGIN_WRITES_ENABLED`.

`VITE_VERCEL_ANALYTICS_ENABLED` is a public feature gate, not a credential. Web
Analytics is enabled for the HAMAL Vercel project. Set the gate to `true` only
for a deployment intended to emit privacy-bounded page analytics; no visitor PII
or form values belong in this variable or the analytics payload.
