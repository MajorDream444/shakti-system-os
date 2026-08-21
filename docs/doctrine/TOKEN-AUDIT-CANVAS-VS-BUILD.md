# Token Audit — Canvas vs Build

**Date:** 2026-08-21
**Source:** `Shakti_Team_Rules.dc.html`, `Shakti_Shala_Vault_7.html`,
`Shakti_Sanctuary__Wireframe_Map.html` — read directly for the first time.
**Status:** Deviations identified. Fixes applied where safe.

---

## 0. Why this document exists

Every prior reference to "Team Rules tokens" in this repo came from **Major relaying
values in chat**, because the Claude Design canvases were opaque to me — ~800KB bundled
exports with content gzip-compressed inside base64 inside a JSON string literal.

On 2026-08-21 they were extracted successfully. The relayed values were *mostly* right.
Several were not, and one is a direct rule violation.

**This document supersedes guesses.** Where it disagrees with anything earlier, this wins.

---

## 1. The canonical palette

From Vault 7, *"Design System — Ember Light on Old Stone"*:

| Name | Value | Build had | Status |
|---|---|---|---|
| Obsidian | `#090707` | `#0a0505` | ⚠️ off |
| Temple Charcoal | `#120E0F` | — | missing |
| Clay Surface | `#241515` | `#2a1216` | ⚠️ off |
| Deep Burgundy | `#4A1F24` | `#4a1c22` | ⚠️ off |
| **Ember → Fire** | **`#C35A2E` · `#E27A3F`** | **`#ff5a1f`** | ❌ **violation** |
| Warm Stone | `#D8C5B0` | — | missing |
| Ash Ivory | `#F3EBDD` | `#f4efe6` | ⚠️ off |

### The ember is the serious one

The build used `#ff5a1f` — a hot, saturated safety-orange. The canonical ember is
`#C35A2E` (rust/terracotta) and `#E27A3F` (warm amber-orange). Both are markedly more
muted and browner.

**Team Rules #10 states the failure mode by name:**

> *"Never a wellness influencer, SaaS UI, cyberpunk flyer, boho collage, or
> **Halloween orange**."*

`#ff5a1f` is Halloween orange. It appeared 18 times across the source.

---

## 2. Structural tokens

| Token | Canonical | Build had | Status |
|---|---|---|---|
| Card background | `rgba(36,21,21,0.78)` | `rgba(42,18,22,0.72)` | ⚠️ off — note `rgb(36,21,21)` **is** Clay Surface `#241515` |
| Border | `0.18` opacity | `0.14`–`0.18` | ⚠️ partial |
| Border colour | `rgba(216,197,176,…)` — **warm stone** | `rgba(244,239,230,…)` — near-white | ⚠️ off |
| Card radius | `22px` | `22px` | ✅ |
| **Choice card radius** | **`18–20px`** | `22px` | ⚠️ off — choice cards are a distinct token |
| Glow | `0.34` | not implemented | missing |
| Base unit | `8px` | — | not formalised |
| Screen padding | `24px` | varies | — |
| Max readable | `760px` | `680px` body | ⚠️ off |
| Touch target | `≥44px` | 44px min-height present | ✅ |

---

## 3. Typography — and a conflict to resolve

| Role | Team Rules (rule 6) | Vault 7 | Build |
|---|---|---|---|
| Display | Cormorant Garamond, −0.01em | Cormorant Garamond 34–56 | Cormorant Garamond ✅ |
| Body | **Inter**, 16px floor | **Manrope** 16–17 | Inter |
| Label | — | 11–12px · 0.18em | ~0.16em |

**Unresolved:** Team Rules says Inter; Vault 7 says Manrope. Vault 7 is the later
artefact and is the one carrying the full design system, so Manrope is probably current
— but this is a doctrine question, not an engineering one. **Flagged for Sheetal/Codex.**
Build left on Inter until resolved; switching is a one-line change.

Display letter-spacing should be `−0.01em`. The build uses `0` and `−0.025em` in places.

---

## 4. Motion — canonical values

From Vault 7, *"Motion Philosophy — Breath, Water, Candlelight"*:

| Token | Canonical |
|---|---|
| Entrance | **700–1200ms** |
| Page transition | 650–900ms |
| Hover | 180–260ms |
| Easing | ease-in-out |
| **Orb cycle** | **9s loop** |

> *"Motion regulates the nervous system rather than stimulating it. Nothing bounces,
> flashes, or demands. The user should feel themselves slow down the longer they stay."*

> *"Ember glows drift in brightness, never blink."*

> *"No confetti, no spinners, no elastic, no reward motion."*

### Three findings

1. **The breath premise was already canonical.** I proposed breath-paced motion as a
   recommendation; it is in fact the stated philosophy — "Breath, Water, Candlelight."
   Confirmed, not invented.
2. **The cycle is 9 seconds, not 5.5.** My motion study used a 5.5s coherent-breathing
   cycle. The canonical orb cycle is **9s**. The study should be re-timed before any
   decision is made from it.
3. **Particles are prohibited.** Team Rules #8: *"No particles, no neon, no dashboard
   telemetry, no casino reward motion."* The current `/begin` has rising ember sparks,
   and Intensity 03 of my motion study adds more. **Intensity 03 is not merely
   aggressive — it is disallowed.**

Entrance durations in `Threshold.tsx` run to 2400ms, outside the 700–1200ms band.

---

## 5. Wireframe guardrails — confirmations

From the Wireframe Map, stated as *"guardrails on every screen"*:

> *"Dark sanctuary is the resting field; luminous Shakti (pink · gold · green · flora ·
> water) opens the journey; heat and devotional red are punctuation. Kali seal and Shri
> Yantra are doctrinally intentional, never decoration."*

This confirms four things independently:

- **Dark ground is correct.** The parchment reading was wrong; settled.
- **The luminosity progression is canonical**, and Codex's per-station system implements
  the named sequence — pink, gold, green, flora, water.
- **Red as punctuation** matches the colour doctrine.
- **The Shri Yantra is doctrinally intentional.** My earlier claim that the existing
  sigil satisfied it was wrong on both counts — wrong geometry, and it is not optional.

Team Rules #1 also permits warm stone/ivory as a **deliberate secondary register** for
*"Himalayan / India storytelling"* and long-form editorial — which is exactly where the
photography lives.

---

## 6. Applied in this pass

- Ember corrected to `#C35A2E` / `#E27A3F`; `--accent` retired from Halloween orange
- Obsidian, Clay Surface, Deep Burgundy, Ash Ivory set to canonical values
- Warm Stone and Temple Charcoal added
- Border colour moved to warm stone `rgba(216,197,176,…)` at `0.18`
- `--radius-choice: 19px` added, distinct from `--radius-card: 22px`
- `--glow: 0.34` added
- `--orb-cycle: 9s`, `--entrance`, `--hover`, `--page-transition` added as motion tokens

## 7. Not applied — needs a decision

| Item | Why held |
|---|---|
| Inter → Manrope | Team Rules and Vault 7 disagree. Doctrine question. |
| Removing ember particles from `/begin` | Rule 8 prohibits them, but this is Codex's authored work and removal changes the feel of a shipped surface. Recommend removing; not doing it unilaterally. |
| Re-timing motion study to 9s | Trivial, but the study is a live artifact Major may already be showing people. |
| Entrance durations 2400ms → 700–1200ms | Touches Threshold animation feel. Recommend; not unilateral. |
