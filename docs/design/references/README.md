# Dancing with Durga — Approved Layout Reference

**Date:** 2026-09-23
**Status:** Approved direction. Not site assets.
**Files:**
- `dwd-approved-layout-durga-art-2026-09-23.jpeg`
- `dwd-approved-layout-nine-forms-2026-09-23.jpeg`

---

## What these are

Full-page design mockups of the Dancing with Durga page, shared by Major and
approved with Sheetal on 2026-09-23. They are **layout direction, not image
assets** — do not place them in `apps/web/src/shala/assets/images/`, or they
will be rendered as page content.

## The artwork in them is already in the repo

Both mockups use the two devotional artworks Sheetal approved on the 23rd, and
both are already wired into `DancingWithDurgaPage.tsx`:

| In the mockup | Repo asset | Where it renders |
|---|---|---|
| Classical Durga on lion, arched frame | `durga-approved-art-sept23.jpg` | DWD hero |
| Navadurga nine-forms chart | `durga-nine-forms-approved-sept23.jpg` | Navadurgas section |

**No new artwork is required for this page.** The gap between the mockup and the
live page is treatment, not assets.

## What the mockups specify that the build does not yet do

1. **Artwork large and gold-framed**, filling the left column and balanced against
   the text. Live build renders it ~479px in a plain rectangle inside a mostly
   empty maroon field, cut off at the viewport base. This is the single biggest
   visual gap.
2. **Two-column balance** — artwork roughly 45%, content 55%.
3. **Four icon features** — Somatic Practice · Sacred Teachings · Intimate
   Community · Ritual & Reflection, as gold line icons above the payment block.
4. **Payment as cards** — audience, price, explicit `Pay Now →`, confirming line.
   ✅ Implemented 2026-09-24.
5. **Questions block** — `?` icon, explanatory line, Request Details outline
   button. ✅ Implemented 2026-09-24.
6. **Blessing line beneath the artwork** — *"May the fierce and tender grace of
   Maa Durga awaken what is yours to reclaim."*
7. **Footer ribbon** — DEVOTION ✦ EMBODIMENT ✦ COMMUNITY ✦ TRANSFORMATION.
8. **Deep oxblood ground** with a faint mandala watermark, warmer than the
   current flat dark field.
9. **Simplified navigation** — Home · About · Offerings · Dancing with Durga ·
   Start Your Shakti Path · Vault · Journal · Contact, with a gold Request
   Details button. Differs from the live nav; a structural decision, not yet made.

## Provenance note

These are screenshots of a design comp, not photographs and not devotional source
material. They carry no publication rights question of their own, but the artworks
reproduced inside them are governed by the existing approval recorded for the
September 23 Navratri container media.
