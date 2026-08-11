# Sprint 11 — Opening Housekeeping

## Status

Complete.

## Objective

Review duplicate Library collection implementation files before new application
logic begins.

Reviewed local workspace files:

```text
apps/web/src/hooks/useLibraryCollections 2.ts
apps/web/src/shala/libraryCollections 2.ts
```

## Determination

The `* 2.ts` files were accidental local duplicates, not intentional forks.

Canonical implementations:

```text
apps/web/src/hooks/useLibraryCollections.ts
apps/web/src/shala/libraryCollections.ts
```

## Reason

The canonical `buildLibraryCollections()` implementation accepts explicit
fallback collections. That keeps backend read checks able to pass an empty
fallback and verify that review-stage or missing-Drive Library Assets do not
appear in the Temple Library.

The duplicate implementation imported `COLLECTIONS` internally, which would
remove that test seam and make hidden Library Asset leakage harder to detect.

## Result

- no unique logic was found in the duplicate files
- no imports referenced the duplicate files
- no canonical code changes were required
- duplicate local files were removed after verification

## Verification

```text
npm run lint
npx tsc -b
npm run build
npm run check:backend
npm run check:vault
graphify update .
```

Verification completed successfully.

Known existing lint warning:

```text
apps/web/src/shala/components/EnvironmentalCanopy.tsx
react-hooks/unsupported-syntax
Inline class declarations are not supported
```

This warning predates the housekeeping cleanup and was not changed.
