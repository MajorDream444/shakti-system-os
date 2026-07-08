# Vault Architecture

## Purpose

The Vault Synchronization Layer turns Google Drive source material into structured metadata that can enter Airtable and eventually feed the Shakti app.

## Flow

```text
Google Drive
Folder Scanner
Asset Classifier
Metadata Extractor
Airtable Record Builder
Graphify Relationship Builder
Shakti App
```

## Sprint 4 Boundary

Sprint 4 creates the non-live code shape only. It does not call Google Drive, Airtable, AI metadata services, NotebookLM, or live Graphify APIs.

## Current Code Boundary

```text
apps/web/src/services/VaultSyncService.ts
apps/web/src/services/VaultScannerService.ts
apps/web/src/services/VaultClassifierService.ts
apps/web/src/services/VaultMetadataService.ts
apps/web/src/services/VaultRecordBuilderService.ts
apps/web/src/services/VaultRelationshipService.ts
apps/web/src/constants/vault.ts
apps/web/src/types/vault.ts
```

## Asset Lifecycle

1. A file appears in Drive.
2. The scanner receives or lists a file reference.
3. The classifier identifies media type, source folder, and routing hints.
4. The metadata extractor prepares a conservative metadata draft.
5. The record builder maps metadata to the `Library Assets` Airtable schema.
6. Human review approves the record before it appears in the app.

## Sensitive Content Rule

Do not expose private journal content, confidential participant material, or raw client records by default. Store only reviewed metadata in Airtable.
