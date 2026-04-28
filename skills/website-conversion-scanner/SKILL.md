---
name: website-conversion-scanner
description: Analyze high-converting websites for structure, design tokens, user journey, CTA rhythm, interaction patterns, and Figma-ready insights without copying protected assets or exact creative expression.
argument-hint: "<url1> [<url2> ...]"
user-invocable: true
---

# Website Conversion Scanner

Use this skill when the operator wants to study a website, reverse-engineer conversion patterns, prepare Figma design briefs, or generate a Shakti System OS page plan inspired by high-performing websites.

This skill is adapted for insight extraction from the public MIT-licensed `JCodesMore/ai-website-cloner-template`, but Shakti System OS uses it as an **ethical conversion intelligence tool**, not a blind clone tool.

## Core Rule

Extract structure. Do not steal expression.

Allowed:
- section order
- CTA rhythm
- conversion patterns
- offer framing
- information hierarchy
- interaction ideas
- emotional journey
- mobile UX observations
- accessibility issues
- design system notes
- Figma-ready wireframe recommendations

Not allowed:
- copying exact copy
- copying logos
- copying images
- cloning proprietary layouts pixel-for-pixel
- scraping private content
- bypassing paywalls
- reusing protected brand assets
- impersonation, phishing, or deceptive lookalikes

## Best Use Cases

Use this for:
- Shakti landing page inspiration
- retreat sales page teardown
- container application page flow
- high-ticket wellness funnel research
- Figma layout briefs
- Codex implementation specs
- agent-generated design documentation

## Output Artifacts

For every scanned URL, create:

```text
docs/site-insights/<hostname>/
  00-summary.md
  01-page-topology.md
  02-conversion-journey.md
  03-design-tokens.md
  04-interactions.md
  05-figma-brief.md
  06-shakti-translation.md
```

## Phase 1 — Reconnaissance

For each URL:

1. Capture the page purpose.
2. Identify what the page sells or invites.
3. Map the section order from top to bottom.
4. Record primary CTAs and secondary CTAs.
5. Identify trust-building elements:
   - testimonials
   - social proof
   - authority markers
   - press/logos
   - founder story
   - FAQ
   - guarantee/risk reversal
6. Identify friction-reducing elements:
   - simple copy
   - clear next step
   - low-risk entry
   - application flow
   - pricing clarity

## Phase 2 — Conversion Journey

Document the user journey:

```text
Arrival → Recognition → Desire → Trust → Decision → Action
```

Answer:
- What does the user understand in the first 5 seconds?
- What emotional tension is created?
- What promise is made?
- Where does the page build credibility?
- Where does the page ask for action?
- What could Shakti learn from this without copying it?

## Phase 3 — Design Tokens

Extract high-level visual system notes:

- color palette
- typography feel
- spacing rhythm
- border radius style
- background treatment
- button style
- imagery style
- motion style
- mobile layout behavior

Do not copy exact protected identity. Convert into generalized direction.

Example:

```text
Original: bold black/yellow SaaS palette with hard shadows.
Translation: strong contrast palette with ritual warmth, soft shadows, and grounded earth tones.
```

## Phase 4 — Interaction Patterns

Record:
- scroll-driven reveals
- sticky sections
- hover effects
- accordion/tab behavior
- form progression
- modal behavior
- animated transitions
- parallax / 3D / immersive moments

For each interaction, include:

```text
Pattern:
Purpose:
How it supports conversion:
Shakti translation:
Figma note:
Implementation note:
```

## Phase 5 — Figma Brief

Create `05-figma-brief.md` with:

```md
# Figma Brief — <Site Name>

## Design Goal

## Suggested Frames
- Desktop 1440
- Tablet 768
- Mobile 390

## Page Sections
1. Hero
2. Problem / Recognition
3. Doctrine / Differentiation
4. Path / Offer Ladder
5. Social Proof / Authority
6. Application CTA
7. Footer

## Visual Direction

## Interaction Notes

## Component List
- Hero
- CTA Button
- Path Cards
- Application Form
- Retreat CTA
- Testimonial Card
- FAQ Accordion

## Shakti Adaptation Notes

## Do Not Copy
- exact copy
- brand colors
- imagery
- logos
```

## Phase 6 — Shakti Translation

Create `06-shakti-translation.md` with the practical translation:

```md
# Shakti Translation

## What We Learned

## What Applies To Shakti

## What Does Not Apply

## Recommended Shakti Page Pattern

## Suggested Copy Direction

## Suggested Figma Components

## Suggested Codex Tasks
```

## Shakti-Specific Lens

Every insight must be filtered through:

- classical Shakti Tantra
- shadow work
- somatics
- neuroscience
- diaspora identity
- women-centered transformation
- Bali / India retreat ecosystem
- consent, integrity, and trauma-aware language

## Agent Roles

Recommended agent routing:

- `oracle-doctrine` reviews spiritual/teaching alignment
- `pathfinder-funnel` maps conversion flow
- `scribe-content` translates insight into copy
- `guardian-integrity` checks ethics and safety
- `retreat-architect` adapts retreat-specific patterns
- `figma-brief-agent` converts findings into design instructions

## Codex Implementation Prompt

Use this prompt after scanning:

```text
Using the website insights in docs/site-insights/<hostname>/, build a Shakti System OS page section inspired by the extracted conversion pattern.

Do not copy the original site's protected copy, images, brand identity, or exact layout.

Create an original Shakti-aligned component that serves the same conversion purpose.

Use React, TypeScript, Tailwind, and the existing design system.

Return:
- component file path
- props/data structure
- responsive behavior
- accessibility notes
```

## Completion Report

At the end, report:

- URLs scanned
- conversion patterns extracted
- Figma artifacts created
- Shakti translation recommendations
- implementation tasks for Codex
- any ethical or legal concerns
