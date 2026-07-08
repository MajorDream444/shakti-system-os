# Changelog

All notable changes to Shakti System OS are documented in this file.

## [Unreleased]

### Planned

- First Living Knowledge milestone.

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

[Unreleased]: https://github.com/MajorDream444/shakti-system-os/compare/v0.2-living-vault-foundation...HEAD
[v0.2-living-vault-foundation]: https://github.com/MajorDream444/shakti-system-os/releases/tag/v0.2-living-vault-foundation
