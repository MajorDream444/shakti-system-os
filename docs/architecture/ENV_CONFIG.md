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

`AIRTABLE_TOKEN` remains a legacy server-only fallback. New configuration must
use `AIRTABLE_PERSONAL_ACCESS_TOKEN`; do not create multiple credential names to
mask a mismatch.

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

Read-only inspection found:

```text
Preview: AIRTABLE_BASE_ID present; canonical Airtable credential absent;
BEGIN_WRITES_ENABLED absent; VITE_AIRTABLE_TOKEN absent.

Production: AIRTABLE_BASE_ID present; credential stored under an unsupported
name; BEGIN_WRITES_ENABLED absent; VITE_AIRTABLE_TOKEN absent.
```

No environment value was changed. Before any enabled write test, an authorized
operator must configure `AIRTABLE_PERSONAL_ACCESS_TOKEN` in the intended
environment and explicitly set `BEGIN_WRITES_ENABLED` for that environment.

`VITE_VERCEL_ANALYTICS_ENABLED` is a public feature gate, not a credential. Keep
it false until Web Analytics is enabled in the HAMAL Vercel dashboard; then set
it true and redeploy so the first-party analytics script can load without a
failed request.
