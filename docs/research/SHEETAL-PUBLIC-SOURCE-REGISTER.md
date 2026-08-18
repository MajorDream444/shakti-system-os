# Sheetal Public Source Register

Authority ledger for every source used to build founder doctrine. No claim enters
`SHEETAL-FOUNDER-PROFILE.md`, `SHAKTI-CANONICAL-VOCABULARY.md`, or
`SHAKTI-VOICE-AND-LANGUAGE.md` without a row here.

Last updated: 2026-08-18

---

## Authority Hierarchy

Higher tier always overrides lower tier. A tier-1 correction retires conflicting
tier-4/5/6 language permanently.

| Tier | Source Type | Weight |
|---|---|---|
| 1 | Sheetal founder interview / direct feedback | Absolute. Overrides everything. |
| 2 | Current Sheetal-controlled public profiles | High. Current self-description. |
| 3 | Current Shakti doctrine documents | High for system language, not for biography. |
| 4 | Historical Sheetal interviews / articles | Contextual only. Never auto-promoted. |
| 5 | Social content (Sheetal-owned accounts) | High for *vocabulary frequency*, medium for biography. |
| 6 | Third-party descriptions | Corroboration only. Never a sole basis for a claim. |

---

## Registered Sources

### S-001 — In-Person Founder Meeting, Aug 13 2026

| Field | Value |
|---|---|
| SOURCE | `Sheetal_InPerson_Notes_(2026_08_13_16_52_WITA)_Notes_by_Gemini.md` — Gemini transcript + notes |
| DATE | 2026-08-13 |
| SOURCE TYPE | 1 — Founder direct feedback |
| CURRENT/HISTORICAL | CURRENT |
| CONFIDENCE | HIGH for direct quotes; MEDIUM for Gemini's summary layer (machine-generated, flagged as possibly containing errors) |
| APPROVAL STATUS | Quotes usable as authority. Summary layer NOT authoritative. |

Governs: colour doctrine, "too dark now" correction, Shri Yantra request, gallery
request, breathwork negative prompt, launch target, doctrine passport.

Two identical copies were uploaded (`76c4b252-`, `e6b2e443-`). Same document; deduplicated.

**Caveat:** Gemini's own footer states the transcript "might contain errors" and that
people can edit it after creation. Direct quotes below were read in context and are
consistent with tier-5 evidence, but should be confirmed with Sheetal before any
quote is published verbatim as her words.

---

### S-002 — Instagram Reel Export, Aug 14 2026

| Field | Value |
|---|---|
| SOURCE | `dataset_instagramreelscraper_20260814_035302765.csv` |
| DATE | Scraped 2026-08-14; content spans 2024-09-17 → 2026-08-12 |
| SOURCE TYPE | 5 — Social content, Sheetal-controlled accounts |
| CURRENT/HISTORICAL | CURRENT (majority within 12 months) |
| CONFIDENCE | HIGH for term frequency; MEDIUM for biography |
| APPROVAL STATUS | Vocabulary findings usable. Caption text NOT to be republished as site copy without approval. |

123 records total. Ownership split:

| Account | Records | Note |
|---|---|---|
| `sheetalkandola` | 84 | Primary — tier 5 authority |
| `srishaktishala` | 18 | Sheetal-affiliated — tier 5 authority |
| `neo.yug` | 8 | Third party — tier 6, corroboration only |
| `abneetsandharwellness` | 4 | Third party — tier 6 |
| (blank owner) | 4 | Unattributed — EXCLUDE from doctrine |
| others | 5 | Third party — tier 6 |

Only the 102 Sheetal-controlled records inform vocabulary. The remaining 21 are
excluded from frequency counts.

---

### S-003 — Existing Repo Doctrine

| Field | Value |
|---|---|
| SOURCE | `docs/doctrine/SHAKTI-CANONICAL-VOCABULARY.md`, `docs/research/SHEETAL-INSTAGRAM-INTELLIGENCE-AUDIT-2026-08.md` |
| DATE | Pre-2026-08-18 (Codex, Sprint 12A / Release 0.4) |
| SOURCE TYPE | 3 — Current doctrine document |
| CURRENT/HISTORICAL | CURRENT |
| CONFIDENCE | HIGH for breath/somatics ruling |
| APPROVAL STATUS | RETAINED and EXTENDED, not replaced. |

Note: this audit counted 84 records; the present register counts 102 Sheetal-controlled
records across both her accounts. Absolute term counts therefore differ between the two
documents. **Both are correct for their stated scope.** Rankings agree.

---

### S-004 — Historical Public Biography and Interviews

| Field | Value |
|---|---|
| SOURCE | `sheetalkandola.com/about-3`; In That Number (IWES); IWES staff spotlight "Love and Sex in the East and West" (2019); Sway interview |
| DATE | 2019 – unknown |
| SOURCE TYPE | 2 and 4 (mixed) |
| CURRENT/HISTORICAL | **UNVERIFIED — treat as HISTORICAL** |
| CONFIDENCE | LOW-MEDIUM |
| APPROVAL STATUS | **NOT APPROVED for site copy.** |

These were summarised into this project via a prior chat message rather than fetched
and read directly in-session. Credential strings (MSc Global Mental Health, King's
College London, LSHTM) originate here and are **NOT independently verified**. The 2019
IWES essay is seven years old.

**Required before any credential appears on the founder page:** direct confirmation
from Sheetal, or a fetch of the live page with the retrieval date recorded here.

---

### S-005 — Linktree Inventory

| Field | Value |
|---|---|
| SOURCE | Sheetal's Linktree |
| DATE | n/a |
| SOURCE TYPE | 2 |
| CURRENT/HISTORICAL | UNKNOWN |
| CONFIDENCE | NONE — never successfully retrieved |
| APPROVAL STATUS | OPEN TASK |

Did not resolve through the scraper. **We do not have a current link inventory.**
Do not assert what Sheetal does or does not link to publicly.

---

## Open Gaps

| Gap | Blocks | Owner |
|---|---|---|
| Credentials unverified (S-004) | Founder page credential strip | Sheetal |
| Linktree never retrieved (S-005) | Public surface map | Crawl task |
| Gemini transcript unconfirmed by Sheetal (S-001) | Verbatim quotation | Sheetal |
| No approved photography set registered | Gallery, art-direction pass | Sheetal |
| Sheetal's preferred one-line self-description unknown | Hero + founder headline | Sheetal |

---

## Rule

> Do not silently promote historical language into current doctrine.

A tier-4 claim may only become site copy after tier-1 or tier-2 confirmation, recorded
here with its retrieval date.
