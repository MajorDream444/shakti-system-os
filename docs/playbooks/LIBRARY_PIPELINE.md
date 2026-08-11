# Library Pipeline Playbook

## Flow

```text
Drive Upload
Folder Scan
Asset Classification
Metadata Extraction
Airtable Library Asset Draft
Human Review
Approved Temple Library Record
```

## Initial Metadata

- Title
- Drive URL
- Source folder
- Media type
- File type
- Theme
- Keywords
- Goddess / Archetype
- Moon Phase
- Practice Type
- Access Level
- Readiness Level
- Publishing Status
- Knowledge Maturity
- Confidentiality

## Current Implementation

The app contains a non-live Vault sync scaffolding layer under `apps/web/src/services`.
