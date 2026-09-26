# Building a design capability

**Created:** 2026-09-26
**For:** Major — AMA Solutions / Hanzo
**Question being answered:** what do we adopt so that UI and UX stop being the
weak link, and start being something we can sell at $10k, $50k, $100k?

---

## 0. The honest diagnosis first

Nothing that went wrong on Sri Shakti Shala was a skill problem. The backend is
sound. The commerce works. The consent model is better than most agencies ship.

What went wrong is that **every section was invented independently.** There was
no constraint, so nothing stopped drift, and the result was 46 distinct text
sizes, text at 2.56:1 on photography, five sections repeating each other, and a
home page 27 screens long on a phone. Each decision was defensible alone. There
were just too many of them, made too far apart.

That is not fixed by better taste. It is fixed by **deciding fewer things and
then holding them.** Everything below serves that.

---

## 1. The single highest-value thing to build

### A design system, as an artefact, before the next page

Claude has a **Design System** artifact type available on this account
(`claude.ai/artifact/5M7UeXXcx16TP3vzVFNDzd`). It produces a browsable
reference — tokens, type scale, spacing, components with live previews — that
both a person and an agent build against.

Build one for Sri Shakti Shala and every future client starts from a named
system rather than a blank page. Concretely, it would have prevented:

| What happened | What a system prevents |
|---|---|
| 46 text sizes, smallest 8px | One scale. 16px floor declared once. |
| Text at 2.56:1 over photos | Ink tokens with contrast already checked. |
| Captions cropped by arch shapes | One frame component, one caption position. |
| Payment cards cream-on-gold | Surface tokens that carry their own foreground. |

**This is the first thing I would do on Monday.** It is a day of work and it
compounds on every project after.

---

## 2. Learn these four, in this order

Deliberately short. Four things read properly beat forty bookmarked.

### 1. Refactoring UI — Adam Wathan & Steve Schoger
The single best resource in existence for a non-designer who can build. It is
specifically about the decisions engineers get wrong: hierarchy through weight
and colour rather than size, spacing as a system, why your greys look muddy,
why your borders are too dark. Paid book, a few hours, and it will raise the
floor on everything you ship. Start here.

### 2. Every Layout — Heydon Pickering & Andy Bell
Layout as a small set of primitives — Stack, Cluster, Sidebar, Switcher, Cover —
that compose instead of a thousand bespoke media queries. Systems thinking
applied to CSS, which is your native mode. `every-layout.dev`.

### 3. Utopia — fluid type and space scales
`utopia.fyi`. Generates a type and spacing scale that interpolates smoothly
between phone and desktop, so you stop hand-tuning breakpoints. Directly
addresses how the small-type problem happened here.

### 4. Open Props
`open-props.style`. A ready-made set of CSS custom properties — colour, size,
shadow, easing — you can adopt wholesale or cherry-pick. A shortcut to a
coherent token layer while the design system is being built.

---

## 3. Tools already in this account, underused

Worth knowing before buying anything new.

| Tool | Status | What it is actually for |
|---|---|---|
| **Figma MCP** | Connected | Pull real design context into code, and push code into Figma. `get_design_context`, `generate_design`, `search_design_system`. This is the biggest unused asset here. |
| **theme-factory** skill | Enabled | Ten preset themes, or generate one, applied consistently across artifacts. |
| **clone-website** skill | Enabled | Reverse-engineers a site's structure and CSS. Good for studying a reference properly rather than eyeballing a screenshot. |
| **web-artifacts-builder** | Enabled | React + Tailwind + shadcn/ui for complex artifacts. |
| **canvas-design** | Enabled | Posters and static visual work. |
| **Canva MCP** | Connected | Brand templates, bulk asset generation. |
| **Netlify / Vercel MCP** | Connected | Deploy previews clients can open without a GitHub account. |

---

## 4. Component and pattern sources

Not design systems to copy wholesale. Sources to compose from.

- **shadcn/ui** — copy-in React + Tailwind components you own outright. Not a
  dependency. The default choice for anything app-shaped.
- **Radix Primitives** — unstyled, accessible behaviour (dialogs, popovers,
  tabs). Accessibility that is correct by construction rather than by audit.
- **Lucide** — a single coherent icon set, already used in this repo.
- **Motion** (`framer-motion`) — already a dependency here.
- **Modern Font Stacks** (`modernfontstacks.com`) — system font pairings that
  load instantly. Relevant because a Google Fonts `@import` failure once blanked
  two routes of this site entirely.

---

## 5. Aura and Meng To

Major raised this and it is worth pursuing.

**What I can say:** Meng To founded Design+Code (`designcode.io`) and wrote the
book of the same name, which taught a generation of designers to ship real
interfaces. His work is genuinely good and unusually well-suited to exactly the
gap described here — a builder who wants design fluency rather than a design
degree.

**What I cannot say:** anything specific about Aura's current capabilities.
This container's egress policy blocks `aura.build` along with every other
reference site, so I have not seen it. The templates you pasted from it look
like well-specified, high-fidelity single-page builds with a strong point of
view, which is promising, but that is an inference from five screenshots.

**To do this properly**, in a session with browsing: look at how Aura specs a
build. The Gloop Slime Studio prompt you pasted is the interesting artefact —
it names the exact palette, the easing curve, the layer stack with z-indexes,
the scroll maths, and an asset map. **That level of specification is the thing
worth stealing**, independent of the platform. It is a design brief precise
enough to be executed without taste being required at execution time, which is
exactly the problem being solved here.

---

## 6. What a design department needs that tooling cannot supply

Said plainly, because the ambition in the question is a corporation, not a
plugin list.

1. **A house system per client, built first.** Not a style guide written after
   the fact. The thing the pages are actually built from.
2. **A written brief in the client's own words before any design.** The
   specification for this project did not exist until 25 September, four months
   in. That single absence explains most of what went wrong. It is now at
   `docs/doctrine/SHEETAL-DIRECTION-2026-09-25.md`, and that document is the
   template.
3. **Two options, always.** One reads as take-it-or-leave-it. Five is homework.
   This is now captured as a skill at
   `.claude/skills/visual-first-delivery/SKILL.md`.
4. **Measurement in the loop.** Every real defect on this project was found by
   measuring, not by looking, including four regressions introduced by the fixes
   themselves. The sweeps used here — clipped text, type floor, pixel-sampled
   contrast against actual rendered photography — are worth keeping as a
   reusable harness. They are the difference between "looks fine" and "is fine".
5. **A revision boundary, stated up front.** One consolidated round, then build.
   Agreed with Sheetal on 25 September and it is the right policy: *"I don't
   want any dribble."*

At $10k the client buys a good-looking site. At $50k they buy a system their
team can extend. At $100k they buy the second thing plus the confidence that it
will not drift — which is bought with constraints and measurement, not taste.

---

## 7. If only one thing gets done

Build the design system artefact for Sri Shakti Shala, then rebuild the
remaining pages from it. It is the smallest change that makes the next project
cheaper than this one.
