# Shakti Colour Doctrine

Authority: S-001 — Sheetal founder direct feedback, 2026-08-13, tier 1.
Last updated: 2026-08-18
Status: **APPROVED FOR BUILD** (colour system). Photography selection NEEDS SHEETAL APPROVAL.

---

## 1. The Founder Correction — BINDING

> *"the colors can be a little bit more… because it's kind of a little dark now, but
> more of the red, a little bit more of the pink and gold kind of details."*

> *"we can make this bit lighter, a bit more feminine."* — on the `/begin` journey

This is a tier-1 correction. It overrides any prior token document, including Team
Rules, where they conflict.

---

## 2. Why — the Three Gunas

The palette is **not an aesthetic preference. It is doctrine.**

> *"these are actually very tantric colors: white, black and red. White is sattva,
> red is rajas, black is tamas — which are the three gunas, the three qualities that
> exist within us and all around us… that red is really important because you already
> have white and black."* — S-001

| Guna | Colour | Quality | Status before this pass |
|---|---|---|---|
| Tamas | Black | Inertia, stillness, depth | **Over-represented** |
| Sattva | White | Clarity, purity, light | Present (text only) |
| **Rajas** | **Red** | **Activity, passion, movement** | **MISSING** |

The site rendered tamas and sattva and almost no rajas. That is a **doctrinal
incompleteness expressed as a colour gap** — the strongest possible mandate for the
change, and not a matter of taste.

### The second doctrinal reason

> *"the dark feminine and the light feminine — they're both integrated, rather than
> this is only Ma Kali or this is only Ma Lakshmi."*

An interface rendered only in darkness represents Kali without Lakshmi. Pink and gold
are not decoration; they are the Lakshmi half of an integration the whole system claims
to teach.

---

## 3. Approved Palette

Founder-requested additions, tier 1: deep burgundy (retain) · **a second maroon** ·
**pink** · **gold** · **more red**.

| Token | Value | Guna | Role |
|---|---|---|---|
| `--bg` | `#0a0505` | tamas | Ground. Warm-shifted from pure black. |
| `--maroon-deep` | `#2a1216` | tamas→rajas | Deep burgundy. Retained — she likes it. |
| `--maroon-lit` | `#4a1c22` | rajas | **NEW** second maroon she asked for. |
| `--rajas-red` | `#9d171d` | rajas | Sacred red. Bindu, active states. |
| `--ember` | `#C35A2E` | rajas | Vault 7 ember. Punctuation only. |
| `--shakti-pink` | `#E5849B` | rajas/sattva | **Promoted.** Lakshmi register. |
| `--pink-soft` | `#f0c4d0` | sattva | **NEW** light feminine, high-contrast text on dark. |
| `--leaf` | `#8FB27A` | sattva | Lush green. Flora, renewal, living place. |
| `--gold` | `#c4a15a` | rajas/sattva | Lamp, threshold, ornament. |
| `--gold-lit` | `#E9C77E` | sattva | **NEW** flame, bindu highlight. |
| `--text` | `#f4efe6` | sattva | Body text. |

### Restraint clause — also tier 1

> *"not like overly, you know… don't want to make it too complicated, but kind of
> having those simple but really beautiful qualities."*

Rajas is **punctuation, not flood**. Red/pink/gold should mark thresholds, active
states, and moments of transition — never wash a whole surface. A pink gradient hero
would violate this doctrine as badly as the all-black one did.

---

## 4. Luminosity Progression — BINDING

The interface becomes more alive as the seeker moves inward.

```
/            restrained    mist · stone · threshold · ember punctuation
/begin  1-3  quiet dark    tamas-dominant, gold thread appearing
/begin  4-6  warming       maroon-lit rises, pink enters
/begin  7-8  luminous      gold + pink carry the field
/shala       inhabited     full palette, photography, warmth, depth
```

**This is a hard requirement, not a mood note.** As of the 2026-08-18 review, stations
1 and 4 of `/begin` were visually indistinguishable — both near-black with ember. The
colour system was declared in tokens but never narrated across the journey.

Implementation: a per-station luminosity variable driving background warmth, not
eight separately hand-styled screens.

---

## 5. Contrast Floor — BINDING

Founder feedback ("too dark") coincided with a measured defect: the `/begin` choice
cards were near-illegible against their field.

| Element | Requirement | Standard |
|---|---|---|
| Body text on any surface | ≥ 4.5:1 | WCAG 1.4.3 |
| Choice / decision card **boundary** | ≥ 3:1 vs. field, satisfied by **border or fill** | WCAG 1.4.11 |
| Active vs. inactive station | Unambiguous at a glance | — |
| Interactive labels | ≥ 4.5:1 | WCAG 1.4.3 |

**Border or fill — not both.** This matters because of §3's restraint clause. Lifting
the *fill* to 3:1 requires a surface around `rgb(130, 82, 88)`, which floods the
interface with light and reads as the "overly" Sheetal warned against. Carrying the
boundary on the **border** instead keeps rajas at the edge, where it belongs as
punctuation, while the surface stays deep.

Measured on the 2026-08-18 build (station 3, 1440px):

| Sample | Value | Ratio vs field |
|---|---|---|
| Field | `rgb(18, 9, 5)` | — |
| Card border | `rgb(147, 106, 115)` | **4.26:1** ✅ |
| Card fill | `rgb(82, 38, 44)` | 1.57:1 (intentional) |

Decision surfaces are where legibility matters most. Atmosphere never outranks the
seeker's ability to read her options — but the boundary, not the fill, is what the
standard actually requires.

Decision surfaces are where legibility matters most. Atmosphere never outranks the
seeker's ability to read her options.

---

## 6. Symbols

| Symbol | Status | Source |
|---|---|---|
| Shri Yantra — downward triangle + bindu | **REQUESTED, tier 1** | S-001 |
| Lotus (8-petal) | In use — Threshold sigil | current build |
| Temple · bell · incense | Requested as "soft touches" | S-001 |

> *"having the Shri Yantra, which is a very well-known symbol… when you see the
> triangle in the middle, down, with the dot in the middle."*

### CORRECTION — 2026-08-19

An earlier revision of this file claimed the existing Threshold sigil "already carries
this geometry" and "satisfies the request." **That was wrong**, and it was repeated in
conversation before being caught against Sheetal's own mockup.

A Shri Yantra is a specific construction:

- **nine interlocking triangles** — four upward (Shiva), five downward (Shakti) —
  intersecting to form 43 smaller triangles
- **bindu** at the centre
- ringed by an **8-petal** and a **16-petal lotus**
- enclosed by the **bhupura**: nested squares with four T-shaped gates

The Threshold sigil has **one** downward triangle inside an 8-petal lotus. That is a
yoni triangle — a legitimate form, but not the Shri Yantra she asked for by name as the
thing that anchors the site "in genuine Shakta Tantra."

Standing rules for any implementation:

1. The enclosure order runs inward: gates → 16 petals → 8 petals → triangles → bindu.
   The triangle field nests **inside** the lotus rings, never overflowing them.
2. **The bhupura never rotates.** It is the temple enclosure. Only the petals may turn
   within it.
3. The proportions must be verified by Sheetal before shipping. In a true Shri Yantra
   every triangle vertex meets its neighbours at exact triple-points; that solution is
   iterative and a near-miss is visible to anyone who knows the figure. She will know.

Working implementation with all three rules applied: `docs/design/motion-study.html`.

Restraint clause applies: symbols are accents, never wallpaper. No generic sacred-
geometry background patterns.

---

## 7. Photography

Requested, tier 1: a **gallery** of Sheetal — *"put a gallery on there… this is me
here, this is me here"* — plus classical Indian devotional imagery, *"not overusing."*

Reference direction she named: soft pink, aged/vintage imagery, temple-like, inviting.

### Victorian devotional prints — CONFIRMED 2026-08-19

The transcript's garbled *"these like Vic Indian… pictures"* is **Victorian-era Indian
devotional prints, in the Raja Ravi Varma lineage** — confirmed with Sheetal.

This is now a specific, sourceable art-historical category rather than a vague register,
and it governs the whole imagery pass: colonial-period oleograph printing, soft rose and
gold palettes, aged paper, framed as objects.

Applies to the **framing** as much as the images. Sheetal's own mockup shows the
treatment used correctly — a cream-bordered vintage-print card holding the portrait,
set against the dark ground rather than replacing it.

**Important distinction:** that mockup places an *illustrated* goddess inside the frame.
Her actual request was photographs of herself — *"this is me here"* — for human
recognition and safety at the front door. Keep the vintage-print frame; put **her
photograph** in it. Substituting a decorative illustration for the founder inverts the
purpose of the section and lands near the AI-generated-goddess cliché the taste gate
prohibits.

**Current state:** much of the site's "flora" and "water" atmosphere is CSS
abstraction — radial gradients and rounded botanical shapes — rather than approved
photography. Colour-system completion must not be mistaken for art-direction
completion.

**BLOCKED:** no approved photography set is registered. See open gaps in the source
register.

---

## 8. Conflict Resolution

Where this file and `Shakti_Team_Rules.dc.html` disagree, **this file wins** — it
derives from tier-1 founder feedback dated after the Team Rules canvas.

Specifically: Team Rules mandates `rgba(36,21,21,0.78)` card surfaces. That value is
retained as `--maroon-deep`-family, but it must not be applied so uniformly that the
interface returns to the "too dark" state Sheetal corrected. Card surfaces carry a
luminosity variable rather than one fixed value.
