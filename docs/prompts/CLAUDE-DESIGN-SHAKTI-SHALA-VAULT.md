# Claude Design Prompt — Shakti Shala Vault

## Purpose

Use this prompt in Claude / Claude Design to generate the first serious product-design pass for the **Shakti Shala Vault**.

Claude should act as a sanctuary architect and senior product designer, not as a generic website builder.

---

# Master Prompt

```text
You are one of the world's strongest product designers and experience architects.

Design the digital sanctuary called:

SHAKTI SHALA VAULT

This is not an LMS.
This is not Kajabi.
This is not Circle.
This is not Notion.
This is not a membership dashboard.
This is not a content platform.

It is a sanctuary for practice.

Design an experience that feels like entering a Himalayan monastery mixed with the refinement of Apple, the quiet luxury of Aman Resorts, the clarity of Notion, and the interaction restraint of Arc Browser.

The interface should regulate the nervous system rather than stimulate dopamine.

The emotional goals are:

- calm
- reverence
- spaciousness
- belonging
- beauty
- continuity
- embodiment
- discernment

The Vault contains:

- Temple Library
- Goddess Pathways
- Daily Practice
- Moon Rhythm
- Audio Reflections
- Sacred Journal
- Retreat Readiness
- Community
- Personal Journey

The experience must feel:

Natural sanctuary on the surface.
Precision architecture beneath.

Visual language:

- charcoal
- deep burgundy
- warm stone
- clay
- muted gold
- candlelight
- ember glow
- flowing water / current motifs
- mountain pathways
- carved temple architecture
- editorial typography
- large negative space

Avoid:

- dashboards
- gamification
- SaaS UI
- wellness clichés
- neon gradients
- cosmic spirituality clichés
- clutter
- excessive cards
- generic lotus design
- oversexualized goddess imagery

Design every screen mobile-first, but make the desktop version feel cinematic and spacious.

Create:

1. Information architecture
2. UX journey
3. Navigation system
4. Design system
5. Motion philosophy
6. Typography guidance
7. Component library
8. Screen wireframes
9. User flows
10. Figma-ready specifications

Think like a sanctuary architect, not a software designer.
```

---

# Required Screens

Ask Claude to design at least these screens:

```text
1. Vault Home / Arrival
2. Temple Library Index
3. Goddess Pathways Index
4. Single Goddess Pathway Page
5. Daily Practice Page
6. Moon Rhythm Page
7. Sacred Journal Page
8. Retreat Readiness Page
9. Audio Reflection Player
10. Profile / Journey Page
```

---

# Screen-Specific Guidance

## 1. Vault Home / Arrival

The home screen should not feel like a dashboard.

It should answer:

```text
Where am I?
What is today asking of me?
Where do I return next?
```

Suggested modules:

```text
Welcome back
Today’s Moon
Today’s Practice
Continue Your Pathway
Journal Prompt
Upcoming Ceremony
```

## 2. Temple Library Index

Should feel like entering an archive, not browsing files.

Suggested sections:

```text
Sacred Texts
Audio Teachings
Guided Practices
Ceremonies
Moon Rituals
Sankalpa
Shadow Work
Retreat Preparation
Living Doctrine
Archive
```

## 3. Goddess Pathways Index

Should feel like temple chambers or doorways.

Avoid cartoon goddess cards.
Use restrained symbols, light, texture, and atmosphere.

Initial pathways:

```text
Durga
Kali
Lakshmi
Saraswati
Bhuvaneshwari
Bagalamukhi
Matangi
Tara
Kamala
Tripura Sundari
Bhairavi
Chinnamasta
Dhumavati
```

## 4. Single Goddess Pathway Page

Each page should include:

```text
Doorway statement
What this pathway holds
Teachings
Practices
Journal prompts
Audio
Ceremony recordings
Readiness notes
Related offers
Integration guidance
```

## 5. Daily Practice Page

Should feel like a gentle rhythm, not a task list.

Possible sections:

```text
Begin
Listen
Practice
Reflect
Integrate
```

## 6. Moon Rhythm Page

Should hold New Moon and Full Moon ceremony rhythm.

Possible sections:

```text
New Moon Intention
Full Moon Reflection
Ceremony Archive
Preparation
Integration
Moon Journal
```

## 7. Sacred Journal Page

The journal should be private, quiet, and spacious.

Suggested journal categories:

```text
Body
Dreams
Practices
Sankalpa
Moon
Goddess Pathway
Retreat Readiness
Integration
```

## 8. Retreat Readiness Page

This must not feel like a booking page.

It should feel like a discernment chamber.

Sections:

```text
Capacity
Practice history
Support needs
Travel readiness
Emotional readiness
Financial readiness
Suggested next doorway
```

---

# Behavioral Guardrails

The design should not:

- pressure the user
- diagnose the user
- imply that intensity equals readiness
- use progress as performance
- make retreat feel like the obvious goal for everyone
- create dependency on an AI companion
- imitate Sheetal’s intimate voice

The design should:

- preserve agency
- support rhythm
- protect readiness
- allow human review
- create calm continuation
- make teachings easier to return to

---

# Copy Tone

Use language that is:

- clinical-embodied for instructions
- poetic-precise for major headers
- calm and direct for CTAs
- spacious and non-coercive throughout

Avoid phrases like:

```text
healing journey
divine feminine clichés
step into your power
abundance activation
transform your life instantly
unlock your goddess
```

Preferred terms:

```text
pathway
practice
rhythm
readiness
threshold
container
sanctuary
stewardship
integration
discernment
```

---

# Output Format Claude Should Produce

Ask Claude to output:

```text
1. Product concept summary
2. Information architecture map
3. Navigation model
4. Screen-by-screen wireframe notes
5. Component library
6. Visual system
7. Motion rules
8. Mobile-first layout guidance
9. Figma board structure
10. Build handoff notes for GitHub / Codex
```

---

# Corrective Prompts

Use these if Claude drifts.

## If it becomes too SaaS

```text
This feels too much like a software dashboard. Remove the SaaS energy. Make it feel more like entering a quiet temple library with hidden intelligence beneath the floor. Reduce cards, metrics, and interface density. Increase atmosphere, breath, and spatial calm.
```

## If it becomes too mystical

```text
This has become too fantasy-spiritual. Ground it in practice, body, rhythm, and discernment. Keep the sacred atmosphere, but remove cosmic excess, vague goddess language, and decorative mysticism.
```

## If it becomes too generic wellness

```text
This feels like a generic wellness app. Bring back Shakti Tantra, somatics, shadow integration, nervous-system literacy, moon rhythm, goddess pathways, and retreat readiness. Make it specific to Shakti Shala.
```

## If it becomes too busy

```text
Reduce the interface density. Few words per screen. More negative space. More quiet. This system should feel like a sanctuary, not a productivity app.
```

## If it overuses AI

```text
Do not center AI as the experience. The Vault is a sanctuary for practice. AI, if present, should only support orientation and retrieval. It should never replace Sheetal, diagnose the user, or simulate intimacy.
```

---

# Final Design Standard

```text
The user should never feel the machinery.
Sheetal should feel the relief of it.
The doctrine should remain alive.
```