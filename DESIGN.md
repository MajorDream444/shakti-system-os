---
version: "shakti-system-foundation-v0.1"
name: "Shakti System OS — Sanctuary Threshold Design"
description: "Initial design direction for the Shakti System OS front-door experience, derived from Sheetal Kandola project doctrine, the one-shot threshold experience, and two Aura reference systems. This file is a first-crack design foundation for the Google AI Studio one-shot MVP and later repo implementation. It should be refined after Sheetal review and visual testing."
status: "working-first-crack"
source-of-truth:
  repo: "MajorDream444/shakti-system-os"
  use: "Google AI Studio one-shot prototype now; Codex/local production build later"
visual-thesis: "Natural sanctuary on the surface; precision architecture beneath."
experience-thesis: "A calm digital threshold, not a chatbot, not a quiz, not a funnel."
colors:
  ember-primary: "#C35A2E"
  fire-accent: "#E27A3F"
  deep-burgundy: "#4A1F24"
  temple-charcoal: "#120E0F"
  obsidian: "#090707"
  clay-surface: "#241515"
  warm-stone: "#D8C5B0"
  ash-ivory: "#F3EBDD"
  text-primary: "#F6EFE7"
  text-secondary: "#C8B7A5"
  border: "rgba(216, 197, 176, 0.18)"
  glow: "rgba(226, 122, 63, 0.34)"
  water-thread: "rgba(200, 183, 165, 0.34)"
color-modes:
  primary-mode: "dark sanctuary"
  later-exploration: "high-altitude monastery light mode / Himalayan white stone variant"
typography:
  display:
    family: "Cormorant Garamond, Canela, or a comparable refined serif"
    purpose: "Headlines, threshold statements, selected poetic-precise copy"
    sizes:
      desktop-xl: "clamp(52px, 6vw, 88px)"
      desktop-lg: "clamp(40px, 4.8vw, 68px)"
      mobile-xl: "clamp(38px, 10vw, 56px)"
    weight: "500–600"
    line-height: "0.98–1.08"
    letter-spacing: "-0.01em to 0"
  body:
    family: "Inter, Manrope, or a comparable humanist sans-serif"
    purpose: "Instructions, orientation, prompts, pathway copy"
    size-desktop: "18px"
    size-mobile: "16px"
    weight: "400–500"
    line-height: "1.55–1.7"
  label:
    family: "Inter, Manrope, or an understated small-caps treatment; avoid tech-mono as a default"
    purpose: "Microcopy, section markers, progress labels"
    size: "11px–13px"
    weight: "500–600"
    letter-spacing: "0.12em–0.18em"
    transform: "uppercase sparingly"
spacing:
  base: "8px"
  flow-gap: "16px"
  card-gap: "18px–24px"
  card-padding: "20px mobile / 28px desktop"
  screen-padding-mobile: "24px"
  screen-padding-desktop: "48px–72px"
  section-padding: "96px desktop / 64px mobile"
  max-readable-width: "760px"
  max-experience-width: "1180px"
rounded:
  card: "22px"
  control: "9999px for primary CTA; 18px–22px for choice cards"
  pill: "9999px"
surfaces:
  hero-shell: "Obsidian to temple-charcoal gradient with layered warm ember glow"
  cards: "Clay surface with warm-stone border and restrained translucency"
  modal: "Deep burgundy-black with soft edge glow"
  input: "Obsidian/charcoal field with warm-stone border; no bright form chrome"
components:
  primary-button:
    feel: "Warm ember invitation; glows softly without feeling neon or techy"
    background: "linear-gradient(135deg, #C35A2E 0%, #E27A3F 100%)"
    text: "#F6EFE7"
    hover: "slight lift + 6–10% brightness + expanded soft glow"
    radius: "pill"
    padding: "16px 28px"
  secondary-button:
    feel: "Quiet pathway alternative"
    background: "transparent or subtle clay wash"
    border: "warm-stone translucent border"
    text: "#F3EBDD"
  choice-card:
    feel: "Selecting a doorway, not answering a quiz"
    background: "rgba(36, 21, 21, 0.78)"
    border: "rgba(216, 197, 176, 0.18)"
    hover: "slight ember trace, soft elevation, no sharp SaaS shadows"
    selected: "inner ember halo + warm-stone border increase"
  reflection-card:
    feel: "Sanctuary note / threshold reveal"
    background: "deep burgundy into clay surface"
    border: "subtle warm-stone line"
    effect: "low-frequency internal glow, not glassmorphism"
  progress-indicator:
    feel: "breath-paced movement"
    design: "thin line, soft nodes, or subtle temple-step progression"
    avoid: "gamified stepper, numerical pressure"
layout:
  first-viewport:
    hierarchy: "Atmosphere first, message second, CTA third"
    composition: "Central threshold focal object or doorway-like luminous portal; copy sits with generous space, not UI clutter"
    CTA-position: "Below grounding statement, not competing with headline"
  screen-flow:
    rule: "One emotional job per screen"
    pacing: "Allow quiet, generous spacing, measured transitions"
    prompt-pages: "Choice cards arranged 1-column mobile, 2-column desktop"
  content-density:
    rule: "Sparse, precise, intentional; never cram"
  responsive:
    rule: "Mobile-first, touch-safe controls, comfortable vertical rhythm"
motion:
  global-feel: "breath, ember, current, ascent"
  timing:
    entrance: "700–1200ms"
    hover: "180–260ms"
    page-transition: "650–900ms"
  effects:
    - "slow ember pulse behind primary focal object"
    - "soft masked reveal for headings"
    - "low-amplitude drift in background grain or glow"
    - "subtle curved line movement suggesting river/pathway/energy current"
    - "warm path illumination on result reveal"
  avoid:
    - "hyperactive particles"
    - "cyberpunk neon"
    - "dashboard animation density"
    - "casino-like reward motion"
    - "aggressive parallax"
background-system:
  source-direction: "Blend the dark gravity field from Cosmic Gravity CTA with the warmth/orbiting atmosphere of Aura Systems, then remove the tech aesthetic."
  visual-elements:
    - "temple doorway / sanctuary threshold"
    - "ember field / fire warmth"
    - "soft arc lines or pathway currents"
    - "stone, smoke, dusk, or Himalayan atmospheric cues"
    - "optional water-current linework as balance against fire"
  art-direction: "More sacred architecture and embodied atmosphere than software product showcase."
  phase-2-visual-variant: "Himalayan light/white stone mode may emerge later as a second visual path or a later section within the ecosystem."
sonic-layer:
  status: "later-layer, not MVP dependency"
  possible-use: "ambient threshold tone, low wind, temple bell residue, subtle breath-like score"
  design-rule: "Sound must be optional, user-controlled, and never required to complete the experience."
voice-layer:
  status: "later-layer after visual pacing, copy, and routing are validated"
  purpose: "eventual seeker reflection / feeling capture / richer threshold engagement"
  design-rule: "Do not automate intimacy. Voice should deepen consented reflection, not impersonate Sheetal or act as a healer."
forms-and-capture:
  rule: "Result before capture. Contact exchange is continuation, not a gate."
  fields-v0:
    - "First name"
    - "Email"
    - "Optional WhatsApp"
  later-candidates:
    - "Open reflection"
    - "Preferred way to continue"
    - "Interest area / doorway"
  copy-tone: "clear, warm, agency-preserving"
experience-specific-guardrails:
  - "Do not make the Shakti experience look like a SaaS dashboard."
  - "Do not use Aura orange literally without grounding it into Sheetal's burgundy/clay/ember world."
  - "Do not use technical metadata, code-like labels, or futuristic product copy in the front-facing prototype."
  - "Use the precision and composition discipline of Aura, not its tech identity."
  - "Keep the world organic, embodied, sanctuary-like, and feminine without cliché."
  - "Retain intelligence and interface discipline beneath the surface."
  - "Preserve Sheetal's doctrinal depth: lineage, somatics, shadow, nervous-system literacy, sovereignty."
  - "No generic wellness gradients, boho collage, loud mandala overload, or social-media retreat clichés."
reference-inheritance:
  cosmic-gravity-cta:
    borrow:
      - "dark void field"
      - "single central focal moment"
      - "low-light orange gravity line / pull energy"
      - "restrained action emphasis"
    reject:
      - "sci-fi command center copy"
      - "tech-product feel"
      - "hard black/orange startup aesthetic"
  aura-systems-core-infrastructure:
    borrow:
      - "warm orange orbiting light"
      - "central focus with atmospheric supporting layers"
      - "interface rhythm and density discipline"
      - "layered panel thinking for future system views"
    reject:
      - "dashboard grammar for seeker-facing experience"
      - "metrics/cards as front-door language"
      - "white product-dashboard palette for MVP"
implementation-notes:
  google-ai-studio:
    use: "One-shot MVP prototype for Start Your Shakti Path"
    prototype-priority:
      - "emotional atmosphere"
      - "screen flow"
      - "threshold reveal"
      - "choice card feel"
      - "result screen warmth"
    not-yet:
      - "final production code"
      - "Airtable integration"
      - "advanced voice layer"
      - "audio dependency"
  codex-later:
    use: "production build, schema implementation, repo integration, durable components"
  future-files:
    - "GOOGLE-AI-STUDIO-PROMPT-PACK.md"
    - "docs/experience-design/one-shot-threshold-experience.md"
    - "docs/design/visual-explorations.md"
    - "docs/playbooks/client-update-podcast-system.md"
---

# Shakti System OS — DESIGN.md

## 1. Design North Star

The Shakti System OS front door should feel like a **sanctuary threshold**, not a software interface.

The user should feel:

- a small exhale
- a sense of being met without pressure
- that the work is intelligent and deep
- that there is a clear path forward
- that the system is precise without presenting itself as technical

The design posture is:

```text
Natural sanctuary on the surface.
Precision architecture beneath.
```

This DESIGN.md is the first formal design foundation for the project. It is intended to guide the **Google AI Studio one-shot MVP** now, and later the **Codex / repository production build** once the visual language has been tested and approved.

## 2. Reference Synthesis

Two Aura references shaped this first direction:

1. **Cosmic Gravity CTA** contributes:
   - dark void field
   - central pull / single focal moment
   - restrained orange line energy
   - immersive depth without visual clutter

2. **Aura Systems | Core Infrastructure** contributes:
   - warm orbiting glow
   - layered hierarchy
   - atmospheric central composition
   - careful interface rhythm and visual discipline

For Sheetal, we borrow the **energy system** and **composition discipline**, not the tech identity.

The Shakti translation is:

```text
void → sanctuary darkness
orange gravity line → ember / kundalini current / living threshold
system orchestration → pathfinding and discernment
technology precision → hidden structure
```

## 3. Palette Direction

The MVP should begin in a **dark sanctuary mode**.

This is aligned with:

- the burgundy and darker deck colors Major noted Sheetal responded to
- the shadow-work dimension of the project
- the fire / Shakti / tantric field references
- the emotional need for a protected, interior threshold before a pathway reveal

### Core Palette

- **Temple Charcoal / Obsidian:** deep background field
- **Deep Burgundy / Clay Surface:** emotional containment
- **Burnt Ember / Fire Accent:** action, warmth, awakening
- **Warm Stone / Ash Ivory:** text, structure, ritual clarity

This should not become Halloween orange or tech startup orange. It should feel like:

```text
ember light on old stone
```

not:

```text
neon orange on black SaaS UI
```

## 4. Future Himalayan Light Variant

A later branch of the design system may explore a **high-altitude monastery light mode**:

- ivory stone
- misted whites
- pale sand
- soft gold
- cold Himalayan blue-gray restraint

That may be valuable for:

- sanctuary / retreat sections
- India / Himalaya storytelling
- second-stage visual language beyond the first dark threshold

For the current MVP, the dark sanctuary approach is the better starting point because it reflects the shadow-work, tantric-fire, and deeper threshold themes already present in the work.

## 5. Typography

Typography should help the experience feel both **sacred** and **precise**.

### Display Typography

Use a refined serif for major emotional statements:

- Cormorant Garamond
- Canela-like serif
- or a comparable editorial serif

Use for:

- hero headline
- result headline
- selected poetic-precise lines

### Body Typography

Use a humanist sans-serif for clarity:

- Inter
- Manrope
- or a comparable clean modern sans-serif

Use for:

- instructions
- prompts
- explanatory copy
- form labels
- pathway logic

### What to Avoid

- default product-dashboard typography
- excessive mono styling
- anything too futuristic
- overly decorative ritual fonts

The brand should feel **editorial, not theatrical**.

## 6. Composition

The one-shot should preserve a strong focal center, especially on the first screen.

### First Viewport

The first frame should include:

- a sanctuary field / doorway / living threshold visual
- a clear central or near-central headline
- a grounding line
- one primary CTA

The opening screen should not look like a landing page with multiple columns, metrics, FAQs, or feature strips. It should feel like **arrival**.

### Prompt Screens

The choice questions should feel like selecting a doorway.

Use:

- generous spacing
- 1-column cards on mobile
- 2-column choice cards on desktop
- soft hover treatment
- meaningful selection state

Avoid:

- survey UI
- bubble quiz styling
- gamified progress badges
- aggressive motion

## 7. Motion Philosophy

Motion should resemble:

- breath
- ember
- current
- ascent

The system should feel alive, but not animated for its own sake.

Good motion:

- slow glow pulses
- subtle drifting atmospheric texture
- soft reveals
- cards lifting gently on hover
- result pathway illuminating once revealed

Bad motion:

- excessive particle storms
- twitchy CTA bounce
- constant spin
- stock WebGL tricks
- dashboard-style telemetry rings unless deeply abstracted

## 8. Buttons and Interactions

The primary action should feel like an **invitation**, not a demand.

### Primary CTA

Warm ember gradient, pill-like, soft interior glow.

Examples:

- Enter the Threshold
- Continue
- See My Next Step
- Send My Path

### Secondary CTA

Quieter, line-based, space-preserving.

Examples:

- Continue Without Sharing
- Take the Deeper Self-Audit
- Explore the Weekly Circle

## 9. Audio and Voice Layers

### Audio

Optional ambient sound may be explored later:

- faint wind
- low bowl tone
- ember warmth
- distant temple residue

It must be:

- optional
- muted by default unless intentionally tested otherwise
- never required for comprehension

### Voice

Voice should be treated as a later-layer capability, not the current front-door foundation.

Potential future role:

- seeker spoken reflection
- softer embodied response layer
- richer feeling extraction

Guardrail:

```text
Do not automate intimacy.
```

Voice should not impersonate Sheetal, diagnose users, or act as a healer.

## 10. The Emotional Test

Every visual decision should answer:

```text
Does this help a woman feel steadier, clearer, and more willing to discern her next doorway?
```

If not, it does not belong in the MVP.

## 11. MVP-Specific Direction

The **Start Your Shakti Path** one-shot MVP should primarily test:

1. dark sanctuary palette
2. ember / fire pathway accents
3. temple-threshold first viewport
4. calm choice-card interaction
5. result screen warmth
6. whether the one-shot feels emotionally right before deeper production build

It does **not** need to finalize:

- the entire Shakti brand system
- voice input/output
- audio score
- production Airtable integration
- fully populated design library

## 12. Repo Handoff Standard

This file should evolve as:

- Sheetal responds to the visual world
- the one-shot prototype reveals what lands
- the pitch deck visual language gets consolidated
- future sanctuary / retreat imagery becomes clearer

Once approved, this DESIGN.md should guide:

- front-door implementation
- self-audit pages
- onboarding screens
- pathway reveal cards
- later retreat pipeline front-facing UX
- future docs and design artifacts
