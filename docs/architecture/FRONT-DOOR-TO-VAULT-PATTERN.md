# Front Door to Vault Pattern

## Reusable Architecture

```text
Front Door
    |
Pathway / Intake
    |
Vault / Sanctuary
    |
Operating Intelligence
```

This is the reusable experience model for Shakti and future HAMAL Mob OS client
universes. Each layer has a distinct responsibility and should remain
replaceable without flattening the others.

## Shakti Routes

| Route | Role | Current State |
| --- | --- | --- |
| `/` | Shakti Portal public front door | Live |
| `/begin` | Pathway discernment and intake | Live |
| `/shala` | Mountain sanctuary journey | Live |
| `/vault` | Temple Library and operating intelligence | Reserved |

## Data Boundary

Front-door intake may capture:

```text
Name
Email
WhatsApp
Recommended pathway
Longings
Reflection
Source and campaign attribution
```

Google Sheets or a Google Form may receive approved intake data.

Sanctuary memory remains separate:

```text
Practice completion
Hours in stillness
Prayer lamps
Prayer flags
Journal entries
Environmental memory
Access state
```

Do not route sanctuary journals or private environmental memory into the
front-door CRM by default.

## Reuse Rule

Future client universes may use the same structure with different language,
visuals, pathways, and intelligence layers:

```text
Public identity
  -> guided intake
  -> private universe
  -> client-specific operating intelligence
```
