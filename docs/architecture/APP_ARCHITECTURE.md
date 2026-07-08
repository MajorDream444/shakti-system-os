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

## Invariants

- Do not change visuals during backend prep.
- Do not add live secrets to source.
- Do not connect payments or auth before the Vault layer is ready.
- Keep the UI fed by typed data and service boundaries.

## Verification

Run from `apps/web`:

```bash
npm run lint
npx tsc -b
npm run build
```
