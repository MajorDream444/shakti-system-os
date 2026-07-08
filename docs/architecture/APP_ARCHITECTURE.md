# Shakti App Architecture

## Purpose

The app is the seeker-facing sanctuary. It should preserve visual behavior, room architecture, sanctuary language, and current interactions while backend capability grows around it.

## Current App Root

```text
apps/web
```

## Runtime Shape

- `src/components`: visual sections and interaction surfaces.
- `src/data`: copy and content collections.
- `src/services`: persistence, access, ritual state, Drive, Airtable, and Vault boundaries.
- `src/hooks`: browser and animation side effects.
- `src/constants`: navigation, animation, storage, and schema constants.
- `src/types`: shared contracts.
- `src/config/env.ts`: typed environment boundary.

## Backend Read Boundary

`src/services/BackendRepository.ts` is the app-facing read boundary for live backend data. React should call the repository rather than Airtable adapters directly.

Current read path:

```text
React App
  -> BackendRepository
  -> read cache
  -> PracticeReadAdapter / InitiationKeyReadAdapter / LibraryAssetReadAdapter
  -> AirtableReadOnlyClient
  -> Airtable or mock fallback
```

This keeps Airtable replaceable. A future Supabase, Firestore, Postgres, or API-backed implementation should be introduced behind `BackendRepository` without changing sanctuary components.

## Invariants

- Do not change visuals during backend prep.
- Do not add live secrets to source.
- Do not connect payments or auth before the Vault layer is ready.
- Keep the UI fed by typed data and service boundaries.

## Verification

Run from `apps/web`:

```bash
npm run check:backend
npm run lint
npx tsc -b
npm run build
```
