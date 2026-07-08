# Shakti Shala OS — Current Component Map

## Purpose

This document maps the current AI Studio V2 / Living Mountain prototype so future Codex, GitHub, Airtable, Google Drive, and Vercel work can proceed without losing the architectural intent.

The app is no longer only a visual prototype.

It is now a sanctuary operating system prototype with rooms, environmental memory, ritual persistence, and access concepts.

---

# Main App Entry

```text
src/App.tsx
```

Current responsibilities:

- holds `SeekerState`
- persists state to localStorage
- controls current room
- controls active practice overlay
- controls global environmental state
- renders the ThresholdDrawer
- renders EnvironmentalCanopy
- passes state/actions into room components

## Refactor Target

Move persistence and ritual state mutation out of App over time.

Future target:

```text
App.tsx
  ↓
services/PersistenceService.ts
services/RitualService.ts
services/AccessService.ts
```

---

# Core Rooms

## GatesRoom

Role:

- arrival threshold
- first orientation
- entry into the sanctuary
- prayer flags / lamp memory
- quick start into foundational practice

System meaning:

The seeker crosses from outside world into Shakti Shala.

---

## CourtyardRoom

Role:

- central hub
- return space
- environmental telemetry
- living sanctuary overview
- navigation into deeper rooms

System meaning:

The courtyard is the daily return point.

It should eventually surface:

- next practice
- moon rhythm
- current pathway
- upcoming circle
- unfinished reflection
- retreat reminders

without feeling like a dashboard.

---

## FireCircleRoom

Role:

- live ceremony container
- circle gathering space
- fire-based practice
- future community / live transmission layer

System meaning:

The Fire Circle is where synchronous community and ceremony enter the system.

Future integrations:

- live ceremony schedule
- Circle Key access
- Zoom / streaming / audio room
- pre-circle intention offering
- post-circle integration prompt

---

## LibraryRoom

Role:

- Archive of Lineage
- Temple Library
- practices and teaching assets

System meaning:

The Vault becomes visible here.

Future source:

```text
Google Drive / Shakti Legacy Vault / 04_TEMPLE_LIBRARY
```

Future metadata:

```text
Airtable / Library Assets
Airtable / Practices
```

---

## ChambersRoom

Role:

- Goddess Chambers
- archetypal / pathway-based practice spaces
- dynamic chamber atmosphere

System meaning:

The seeker enters specific energetic blueprints.

Future metadata fields:

- Goddess / Archetype
- Practice Type
- Access Level
- Readiness Level
- Moon Phase
- Related Practices
- Related Ceremonies

---

## ReflectionPoolRoom

Role:

- journal
- reflection history
- lotus memory
- emotional integration

System meaning:

The Reflection Pool is not a notes app.

It is where inner work leaves a visible trace in the sanctuary.

Future caution:

Do not expose private reflections to broad team/admin views without explicit consent architecture.

---

## JourneyRoom

Role:

- personal path
- environmental memory
- initiation keys
- stillness witnesses
- prayer wall / cedar / lantern / lotus

System meaning:

The Journey Room is the mirror of devotion.

It should avoid productivity language.

No badges.
No streaks.
No points.

---

## RetreatRoom

Role:

- Pilgrim's Hall
- retreat readiness
- preparation checklist
- high-ticket retreat passage

System meaning:

Digital preparation for physical pilgrimage.

Future integration:

```text
Airtable / Retreats
Airtable / Seekers
Airtable / Retreat Applications
Stripe / deposit or offering
```

---

## PracticeRoom

Role:

- active practice overlay
- breath/practice container
- completion path

System meaning:

This should feel like entering a quiet chamber, not launching a media player.

Future integration:

- audio
- timers
- transcript
- practice notes
- related journal prompt
- completion memory

---

# Global Components

## ThresholdDrawer

Role:

- mountain map
- altitude-based sanctuary navigation
- spatial orientation

System meaning:

Users are not switching pages.

They are moving through the mountain.

---

## EnvironmentalCanopy

Role:

- global time of day
- weather
- season
- soundscape state
- environmental continuity

System meaning:

The sanctuary is one living ecosystem.

Rooms should not feel disconnected.

---

## EnvironmentalRitual

Role:

- daily offering
- intention bowl
- ritual memory
- sanctuary growth trigger

System meaning:

This should become the root mechanic of continuity.

The sanctuary does not reward.

The sanctuary witnesses.

---

## PrayerLamp

Role:

- simple persistent devotional marker
- local interaction
- acoustic bell feedback

System meaning:

A lamp is not a checkbox.

It is a visible sign of presence.

---

# Current State Object

Current `SeekerState` includes:

```text
name
accessLevel
hoursInStillness
currentPathway
pathwayDay
pathwayTotalDays
lastActiveDate
journalEntries
completedPractices
litLamps
prayerFlagsCount
birdsReturnedCount
dailyIntentions
ritualGrowthLevel
```

## Future Split

This should eventually split into:

```text
SeekerProfile
AccessState
PracticeState
JournalState
EnvironmentalMemory
RetreatState
```

This keeps Airtable / cloud sync cleaner later.

---

# Integration Boundaries

## Google Drive

Owns:

- source files
- audio
- PDFs
- workbooks
- video
- ceremony documents
- retreat guides
- teaching archive

## Airtable

Owns:

- metadata
- readiness
- access state
- seeker records
- retreat pipeline
- content queue
- asset status

## GitHub

Owns:

- application code
- design constitution
- architecture docs
- handoff docs
- prompts
- playbooks

## Vercel

Owns:

- public and preview deployments
- environment variables
- production hosting

## Hanzo Later

Owns:

- reusable intelligence layer
- vault engine
- search/retrieval
- universal metadata service
- cross-client operating standards

Not now.

---

# Immediate Refactor Recommendation

1. Keep the rooms.
2. Keep the environmental memory.
3. Keep the monastic language.
4. Move storage behind a service.
5. Move content into data files.
6. Prepare Drive/Airtable integration.
7. Avoid new feature sprawl.

---

# Quality Bar

Every component should pass this question:

```text
Would this feel natural inside a living Himalayan sanctuary?
```

If not, rewrite it.
