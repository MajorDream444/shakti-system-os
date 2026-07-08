# Environment Configuration

## Local Variables

The app reads environment values through:

```text
apps/web/src/config/env.ts
```

Local development may use:

```text
VITE_AIRTABLE_BASE=appj3hDhI0HoulNrf
VITE_AIRTABLE_TOKEN=
VITE_STRIPE_PUBLIC_KEY=
VITE_GOOGLE_DRIVE_ROOT=
VITE_APP_ENV=development
```

`.env` must remain local and ignored by Git.

## Airtable Token Security

Do not put a private Airtable token into production Vite variables.

Vite exposes `VITE_*` values to browser code. That means a production `VITE_AIRTABLE_TOKEN` would be visible to users.

## Current Sprint 7 Boundary

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

If `VITE_AIRTABLE_BASE` or `VITE_AIRTABLE_TOKEN` is missing, or if `VITE_APP_ENV=production`, the read adapters return mock fallback records through `BackendRepository`.

React components should not call Airtable adapters directly. Keeping Airtable behind the repository protects the sanctuary UI from future backend migrations.

## Before Live Production Reads

Choose one safe backend path:

```text
Vercel serverless API route
Backend proxy
Edge function
Supabase/Firebase intermediary
Manual export/import for early MVP
```

Only that backend should hold private Airtable credentials.
