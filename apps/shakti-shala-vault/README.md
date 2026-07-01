# Shakti Shala Vault

## Status

**Future application layer / prototype shell.**

This directory is reserved for the eventual production implementation of the **Shakti Shala Vault**.

Do not build the full app here until the architecture, design direction, content model, access model, and first MVP screen flow have been approved.

---

# Role

The Shakti Shala Vault is the ongoing digital sanctuary for practice.

It sits after the public front door:

```text
Start Your Shakti Path
→ Self-Audit / pathway routing
→ Shakti Shala Vault
```

The Vault should hold:

- Temple Library
- Goddess Pathways
- Daily Practice
- Moon Rhythm
- Audio Reflections
- Sacred Journal
- Retreat Readiness
- Community
- Personal Journey

---

# Current Build Rule

Do not treat this as a normal dashboard or LMS.

The design standard is:

```text
Natural sanctuary on the surface.
Precision architecture beneath.
```

The first implementation should prove:

1. the emotional field
2. the navigation model
3. the Temple Library structure
4. the Goddess Pathway structure
5. the Moon Rhythm page
6. the Retreat Readiness page
7. the journal / practice rhythm

---

# Related Documentation

```text
/docs/design/SHAKTI-SHALA-VAULT.md
/docs/prompts/CLAUDE-DESIGN-SHAKTI-SHALA-VAULT.md
/docs/drive/SHAKTI-SHALA-VAULT-DRIVE-MAP.md
/DESIGN.md
/docs/operating-principles/BEDROCK-BUILD-PHILOSOPHY.md
```

---

# Future Technical Direction

Likely stack:

```text
Next.js or Vite / React
Tailwind
Framer Motion or GSAP for restrained motion
Airtable or Supabase-backed content schema later
Google Drive source asset references during early build
Notion / Airtable / Graphify for operating memory
```

No final stack decision has been made yet.

---

# MVP Screens

Suggested first shell:

```text
Vault Home
Temple Library Index
Goddess Pathways Index
Single Goddess Pathway Page
Moon Rhythm Page
Practice Detail Page
Sacred Journal Page
Retreat Readiness Page
Audio Reflection Player
```

---

# Guardrails

This app must not become:

- a SaaS dashboard
- a content dump
- a generic wellness portal
- an AI companion pretending intimacy
- a gamified self-improvement app
- a retreat sales engine

It must remain:

```text
sanctuary
practice
rhythm
readiness
doctrine
continuity
```

---

# Next Action

Run the Claude Design prompt, capture the resulting IA / wireframes / design system, then create a formal implementation issue or Codex handoff before writing app code.