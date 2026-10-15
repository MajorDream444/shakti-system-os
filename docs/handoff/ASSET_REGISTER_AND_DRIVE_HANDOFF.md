# Sheetal Kandola — asset register and Drive handoff

Updated: 15 October 2026. Status: migration in progress; not a completed handoff.

## Authority and scope

This repository is the implementation source of truth for Sheetal Kandola's Shakti project. Keep client-specific doctrine, assets and operational records separate from MAIM platform material. The owner's instruction is to consolidate Sheetal/Shakti working files in the client Drive vault, verify transfer, then remove local working copies when filesystem access permits. Do not delete a mixed project or repository because one file mentions Sheetal.

## Storage map

| Material | Authoritative location | Repository role |
| --- | --- | --- |
| Application code, approved public design specifications, schemas and operating instructions | This repository | Versioned source and handoff instructions |
| Original recordings, private correspondence, unpublished teachings, client records and heavy media | Major NFTs account / Shakti Legacy Vault | Describe asset classes and integration contracts; retain private identifiers in Drive |
| Incoming local client files | Shakti Legacy Vault / 10_UPLOAD_HERE_FIRST / LOCAL_MIGRATION_2026-10-15 | Track workflow and aggregate status |
| Private per-file source paths, hashes, tags and upload receipts | File indexes inside the migration folder | Never copy private indexes into this public repository |
| Credentials and payment secrets | Authorized secret storage | Document variable names only; never commit values |

This repository is public as verified on 15 October 2026. It can serve as the complete handoff map without publishing all source material. Storing private content in GitHub requires a separately established private repository or an explicit visibility decision; do not change visibility or permissions automatically.

## Migration checkpoint

The initial Downloads/Desktop/Documents path-based scan identified 3,451 files totaling approximately 6.91 GB. Of these, 1,893 resident files were source-hashed; 1,558 cloud-only placeholders require hydration. Additional related files with unrelated names may remain undiscovered. This is not a full content audit. Dependency directories, Git internals and symlink targets were excluded from the initial scan.

One batch containing 99 files (101,564,388 bytes) was uploaded. Destination and remote size were verified; remote content-hash verification remains pending. All source originals remain in place. The private index explicitly distinguishes uploaded files from planned batches. Most files have not been uploaded. No client handoff or access transfer has occurred.

Current execution limits: source folders are read-only in this session; connector uploads are limited to 100 MiB per file; browser upload failed because browser policy loading was unavailable. No daily cleaner was activated by this migration.

## Per-asset private index

Record: stable asset ID; original name and path; plain-English description; client/project; source and destination; size; MIME type; version and date; checksum; duplicate relationships; upload status and receipt; verification status; rights/access; analysis confidence; review reason; and at least 12 evidence-supported metadata tags.

Migration-context tags are not a substitute for content analysis. Mark content-review-pending when only a path establishes association. Keep uncertain associations in review. Preserve exact originals and retain a traceable mapping for renamed files.

## Completion gates

1. Hydrate cloud-only files and discover additional related material through content review.
2. Check for uncommitted source work and preserve repository history before removing a local checkout.
3. Upload originals in their usable formats with a resumable route for larger files; ZIP batches are interim preservation, not the final browsable library.
4. Verify destination, complete byte count and content checksum for each original or documented preservation package.
5. Classify, describe and tag each asset; resolve duplicates by content, not filename alone.
6. Route intake material into the existing client library while preserving stable Drive IDs where possible.
7. Remove local source copies only after verified preservation and permitted filesystem access. Record every removal and destination in the private migration log.
8. Give Sheetal a verified inventory, repository/runbook links, ownership/access map, operational dependencies, backup/restore instructions and remaining issues. Verify actual access before declaring handoff complete.

## Maintenance

Daily Downloads triage should identify, analyze, tag and route new files; unresolved items remain in review. Route Sheetal material to this client vault. Record receipts and failures rather than claiming completion from a scheduled intention. A scheduler must be installed and its successful runs verified before describing this as operating automatically.
