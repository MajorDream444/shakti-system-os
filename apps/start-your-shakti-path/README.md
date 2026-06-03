# Start Your Shakti Path

A sanctuary-like discernment experience for Sheetal Kandola's Shakti System OS.

This is not a quiz. It is not a funnel. It is a calm first step — an eight-screen pathway that helps a woman sense which doorway into Sheetal's work fits her current season.

---

## Purpose

This app is the front-door prototype of the Shakti System OS. It guides a seeker through a reflective pathway and surfaces one of four aligned next steps:

- **Weekly Shakti Circle** — rhythm, grounding, community
- **1:1 Somatic / Shadow Support** — personal, focused, private
- **6-Week Shakti Shadow & Somatics Container** — structured depth
- **Retreat Readiness Pathway** — immersion with discernment

The result appears before any contact is captured. Contact capture is a continuation, not a gate.

---

## Local Development

```bash
cd apps/start-your-shakti-path
npm install
npm run dev
```

App runs at `http://localhost:3000`

---

## Build

```bash
npm run build
```

Output goes to `dist/`. Preview the production build:

```bash
npm run preview
```

Type-check without emitting:

```bash
npm run lint
```

---

## Deployment

### Vercel (recommended)

1. Connect the `MajorDream444/shakti-system-os` GitHub repository to Vercel.
2. In Vercel project settings, set **Root Directory** to: `apps/start-your-shakti-path`
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`

The `vercel.json` in this directory handles the rest automatically.

---

## Environment Variables

This prototype has **no required environment variables**. The Gemini API dependency has been removed — it was present in the Google AI Studio export template but is not used anywhere in the application.

If a future version integrates AI-assisted reflection, add:

```
VITE_GEMINI_API_KEY=your_key_here
```

Note: Any variable exposed to the client must be prefixed `VITE_`.

---

## What Is Mocked / Future

| Feature | Status |
|---|---|
| Pathway discernment (scoring) | Live |
| Ambient canvas animation | Live |
| Generative audio soundscape | Live |
| Custom cursor | Live |
| Lead capture form (Handoff screen) | UI complete — saves to localStorage only |
| Airtable CRM integration | Future |
| Email handoff / confirmation | Future |
| WhatsApp onboarding route | Future |
| Self-audit / application form | Future |
| Analytics | Future |
| Sheetal review dashboard | Future |

---

## Prototyping Note

The initial MVP of this app was generated in **Google AI Studio** as a one-shot prototype to validate the emotional field, screen flow, and pathway logic. That prototype has been migrated into this repository as the implementation source of truth.

**GitHub is the source of truth. Google AI Studio was a prototyping environment only.**

---

## Language and Emotional Guardrails

This app preserves the project doctrine. When editing copy or flows, maintain:

- Calm, sovereign, non-performative language
- Result before contact capture
- No manipulative urgency
- No generic wellness clichés
- No "divine feminine" flattening
- No clinical diagnosis language
- No automation of intimacy
