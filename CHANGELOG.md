# Changelog

All notable changes to Shakti System OS are documented in this file.

## [Unreleased]

### In Progress

- First Living Doctrine milestone, beginning with a human-approved teaching
  flowing from the Living Vault through `BackendRepository`.
- Connected the public Shakti Portal at `/` to the preserved intake at `/begin`
  and Shakti Shala sanctuary experience at `/shala`.
- Created the Airtable `Library Assets` review record for "The Vow Beneath the
  Path" and wired the Temple Library to consume approved Library Assets through
  `BackendRepository` once a Drive URL and human approval are present.
- Added Sprint 10 MAIM Living Intelligence OS foundation docs to separate
  reusable OS standards from Shakti-specific implementation decisions.
- Added Sprint 11 Living Doctrine Pipeline docs for turning "The Vow Beneath
  the Path" into approved derivative experiences.
- Added `Knowledge Maturity` lifecycle tracking for Library Assets.
- Added future AI orchestration role standard with human approval boundaries.
- Clarified Release 0.3 as a First Living Doctrine proof of derivative
  experiences, not generic content output.
- Added four Human Approval Gates for source, doctrine, lineage, and publication
  integrity.
- Added Doctrine Passport provenance standard for preserving source lineage
  across derivative experiences.
- Preserved the Living Intelligence OS principle: "The practitioner teaches.
  AI prepares. Humans steward. The system remembers. The seeker receives."
- Completed Sprint 11 opening housekeeping by verifying and removing local
  duplicate Library collection implementation files.
- Added MAIM OS sprint order discipline: repository hygiene, architecture,
  feature, verification, documentation, and release.

## [v0.2-living-vault-foundation] - 2026-07-09

### Added

- Production-oriented application boundaries for services, hooks, types,
  constants, and source data.
- Centralized persistence and sanctuary ritual state services.
- Future-facing access boundary for Initiation Keys.
- Typed environment configuration with secret-safe placeholders.
- Google Drive and Airtable integration boundaries with documented schemas.
- Read-only Airtable adapters for Practices, Initiation Keys, and Library
  Assets.
- Backend repository abstraction with mock fallback, caching, and centralized
  read error reporting.
- Living Vault intake classification, metadata mapping, sample fixtures, and
  execution checks.
- Team handoff documentation and a repeatable Living Vault intake SOP.

### Changed

- Moved hardcoded practices, Goddess content, and Retreat content into dedicated
  data modules.
- Replaced repeated storage logic and magic strings with typed services and
  constants.
- Aligned backend documentation with the Shakti System OS Airtable base in the
  AMA MOB OS V2 client operations workspace.

### Security

- Kept Airtable access read-only.
- Kept private Airtable credentials out of the production browser bundle.
- Preserved mock fallback behavior when backend environment configuration is
  unavailable.

### Preserved

- Sanctuary visuals, language, environmental memory, room architecture, and
  existing interactions remain unchanged.

### Notes

Living Vault Foundation is complete. First Living Doctrine is now in progress.

[Unreleased]: https://github.com/MajorDream444/shakti-system-os/compare/v0.2-living-vault-foundation...HEAD
[v0.2-living-vault-foundation]: https://github.com/MajorDream444/shakti-system-os/releases/tag/v0.2-living-vault-foundation
