# Drive audit manifest — 15 October 2026

**Connection:** Major Dream Systems, `majornfts@gmail.com`.
**Mode:** read-only. Nothing was moved, renamed, deleted, shared or unshared.
**Scope of this pass:** stated honestly in §6. It is not a complete recursion.

---

## 1. The finding that outranks everything else

**The entire working Shakti folder tree is readable by anyone with the link.**

Verified by `get_file_permissions` on seven separate objects at four depths:

| Object | ID | Permissions |
|---|---|---|
| Working Shakti folder (root) | `13U7xJINifGbkbqtxcfgDzzmNICS-0TwU` | **`anyone: reader`** |
| Temple Library | `1SJB7CsNiq7LQSEsFyZhM5ItmRGGuopnW` | **`anyone: reader`** |
| `10_UPLOAD_HERE_FIRST` | `1eOgB0S-Z6qcvNcXWANarQyZl65QDJhR2` | **`anyone: reader`** |
| Shakti Sankalpa audio (.m4a) | `1BC3rkGO_TJYRXqrHrRr5qDpfQCFZXeNL` | **`anyone: reader`** |
| Maa Kali live session (shortcut) | `1PNb2vgzpe_CUMpoEhIOtpkQRTGXmP1Xz` | **`anyone: reader`** |
| **Founder Source — 13 Goddess System** | `18s_xPfPiTkrW_ZYqQixo0twuiCtXShmF` | **`anyone: reader`** |
| `Sheetal_Local_Archive_019.zip` | `1v2Il5kFmNmb_Wc4XHFUbbsyoXeIHIdOA` | **`anyone: reader`** |

Every object carries the identical four-entry permission set, which is the
signature of inheritance from the root working folder.

**What this means in plain terms:**

1. The **13 Goddess Founder Source** — the record that Airtable marks
   `Internal`, the deepest doctrine in the catalogue — is on a public link
   today.
2. `Sheetal_Local_Archive_019.zip` is a **101 MB archive of Sheetal's local
   files**, indexed with `sensitivity:private`, on a public link.
3. **The Vault's entitlement model is moot until this changes.** Building a
   permit system in front of files that are already world-readable protects
   nothing. Anyone holding a Drive URL bypasses every gate in PR #39.
4. A Drive link that has ever been shared, pasted into a chat, or included
   in an email is still live and cannot be expired.

**A fourth party has write access.** `ms.srijanidas00@gmail.com` holds
`writer` on Sheetal's doctrine, including the Founder Source. That may be
entirely intended — it is not for me to assume otherwise — but it is a
rights question Sheetal should be asked about explicitly, because `writer`
can alter and delete source material.

**Not remediated.** Issue #41 forbids altering Drive permissions without an
approved migration and verification plan, so nothing was changed. The
recommendation is in §7 and it is the first item.

---

## 2. The intake folder — `10_UPLOAD_HERE_FIRST`

First page of direct children (5 of an unknown total; see §6):

| File | ID | Bytes | Owner | Note |
|---|---|---|---|---|
| `NAVRATRI2026_SRISHAKTISHALA_SK.pdf` | `1Hyk4dA1Jrzu…` | 4,980,939 | majornfts | Likely the companion guide source |
| `SSSEMAILS_27Sep_SK` | `1luLVM9olOSt…` | 5,758 | **sheetalkandola** | Founder copy, Google Doc |
| `DWDEMAIL_27Sep_SK` | `1A54ygp5qtxD…` | 69,404 | **sheetalkandola** | Founder copy, Google Doc |
| `Shakti_System_Foundation_Deck (1).pptx` | `1bYasvFmr_Nq…` | 247,079 | majornfts | **Duplicate pair** |
| `Shakti_System_Foundation_Deck (1).pptx` | `1CT0G9Gef4dY…` | 247,079 | majornfts | **Duplicate pair** |

Two files, same name, same byte count, two Drive IDs, in the same folder.
This is the duplicate pattern the intake design in
`VAULT-INBOX-INTAKE-PLAYBOOK.md` exists to catch.

Also found in this folder by title search: `The_Shakti_Sankalpa.pdf` twice
(`1rWGMdzQYb0y…`, `15WtayFXCs-W…`, both 17,360,084 bytes) and
`The Vow Beneath the Path.txt` twice (`1BKrdkXiL7yV…`, `1GYStEfO5OPy…`,
both 27,031 bytes).

---

## 3. The migration register — read, and it disagrees with itself

### `MIGRATION_STATUS.md` (read in full, 1,989 bytes)

States: 3,451 matching files, ~6.91 GB; 1,893 hashed; 1,558 cloud-only
placeholders needing hydration. Declares one completed batch —
`Sheetal_Local_Archive_019.zip`, 99 files, 101,564,388 bytes, Drive ID
`1v2Il5kFmNmb_Wc4XHFUbbsyoXeIHIdOA`, local SHA256 `4abed27d…ef9309`, with
**remote content-hash verification still pending**.

**Verified:** that archive exists on Drive at that ID, with exactly the
stated byte count, in the migration folder. The upload is real.

### `Sheetal_File_Index.csv` — **read ~91%** (1,049,473 of 1,145,995 bytes)

1,716 rows parsed. Every row:

- `upload_status` = **`not_uploaded`** — 1,715 of 1,715 non-empty values
- `drive_file_id` = **empty on all 1,716 rows**
- `analysis_status` = `path-associated; content-review-pending` on all rows
- `sha256` present on all 1,716 rows

**The index and the status note contradict each other.** The note says 99
files were uploaded and verified; the index records no upload and no Drive
ID for any row. One of the two is stale. **Do not treat the index as proof
of what is or is not on Drive**, in either direction — this is precisely the
failure mode recorded in `LIVE-SYSTEM-STATE.md` §11, a note read back later
as fact.

**Duplication inside the index:** 1,295 distinct SHA256 values across 1,716
rows. **306 duplicate groups covering 727 files — 42% of the indexed
corpus is a duplicate of something else in it.** Deduplicating before any
cataloguing is not optional.

Content mix (by extension): jpg 241, png 215, md 181, csv 55, heic 52,
pdf 45, mp4 23, jpeg 14, mov 14, docx 9, m4a 7, pptx 1. Total 4,189,636,770
bytes across parsed rows.

### `Sheetal_Pending_Files.csv` — **read in full** (267,369 chars)

1,560 rows. 1,558 `cloud-only: hydrate before verification`, 2
`additional-name-match: review pending`.

**1,554 of the 1,560 rows are under `Desktop/Shakti Portal`** — extensions
json 835, md 245, ts 155, tsx 152. **That is the website's source tree, not
Sheetal's teaching material.** The pending register is overwhelmingly a code
checkout that the path-based scan swept in. Genuine media in the whole
pending set: 6 mp4, 6 m4a, 24 pdf, 34 jpg, 32 png.

**Implication:** hydrating all 1,558 cloud-only files would move several GB
of a git working tree into the Drive vault for no benefit to the Vault.
Hydration should be scoped to the media and documents, not the tree.

---

## 4. Temple Library — ten branches, verified

All ten branch IDs captured:

| Branch | ID |
|---|---|
| `00_FOUNDATIONS` | `1OdcCvD5dBGeoUyd7F7DZqPsXaruIbHT_` |
| `01_PRACTICES` | `11eaklSlaLOlMDK7-3QEkRWZuOpoB14Yf` |
| `02_MEDITATIONS` | `1C7cs85M9hYgG3DxrAtvhtOTfz28OKCOq` |
| `03_AUDIO_REFLECTIONS` | `1Cl_HSdYM4mof9G0IhfQUuURFuWcXue1z` |
| `04_CEREMONIES` | `1AZUspMtO6uQeX-MdRoLsjT-d8DqYBXZG` |
| `05_MOON_RHYTHM` | `1pvinjZ2TqJ5yjaJTjHVJd3xAZrW90cdl` |
| `06_GODDESS_PATHWAYS` | `1q4OPkaXqjKxX3tMPiK4fgMOGTpvi1HbZ` |
| `07_RETREAT_GUIDES` | `1Zw7WcrDOoSzCMpR8mcTEOSV95mw2ezO-` |
| `08_WORKBOOKS_AND_JOURNAL_PROMPTS` | `1H6M03wInZQ7C838JP2UewNKiTz9qe5MB` |
| `09_TEACHER_RESOURCES` | `188GWotlds0mPRj31Tn5q1ebiCMaEwM1p` |

Canonical originals located:

| Airtable asset | Drive file | ID | Bytes |
|---|---|---|---|
| `SHAKTI-SANKALPA-AUDIO-001` | `Shakti Sankalpa and the 40 Day Path.m4a` | `1BC3rkGO_TJYRXqrHrRr5qDpfQCFZXeNL` | 35,240,880 |
| `VOW-BENEATH-PATH-001` | `The Vow Beneath the Path.m4a` | `1lpyEk4oFkPq0zFJWureJ75cBBn-qyqgz` | 36,147,386 |
| `FULL-MOON-000` | `Full Moon — Philosophy.md` | `14nEOHO-entaWbok18hrp5cYvGP3hJZgf` | 3,388 |
| `FULL-MOON-001/04/06/07` | `Full Moon — Slide 01/04/06/07.png` | `1VVWnAJf…`, `1sPQi_Hxr…`, `1fWiyH2AK…`, `1pBm3qw6D…` | 51–69 KB each |
| `13-GODDESS-FOUNDER-SOURCE-001` | `Founder Source — 13 Goddess System.md` | `18s_xPfPiTkrW_ZYqQixo0twuiCtXShmF` | 108,982 |
| `DWD-CEREMONY-RHYTHM-001` | `Dancing with Durga — Offer & Nine-Night Rhythm.md` | `12RKn13B8bW0TYM4YacDSc1G0oIufLl8C` | 3,880 |
| `DWD-TEACHING-PILLARS-001` | `Dancing with Durga — Teaching & Message Pillars.md` | `1RwLDiZYVz5H6Qw471Za0lgr1TnQSMLGx` | 1,986 |
| `DWD-PROVENANCE-001` | `Dancing with Durga — Provenance.md` | `1lNDOVR7F-C4McNSiDSX8FE6V-O1RCj3O` | 1,582 |
| `KALI-WORKSHOP-002` | `Maa Kali — … Live Session.mp4` | `1PNb2vgzpe_CUMpoEhIOtpkQRTGXmP1Xz` | **shortcut, target unresolved** |

### Transcripts are NOT where the catalogue implies

Airtable carries `SHAKTI-SANKALPA-TRANSCRIPT-001` and
`VOW-BENEATH-PATH-TRANSCRIPT-001`, and marks both audio assets
"Transcript Generated". `03_AUDIO_REFLECTIONS` contains **only the two
.m4a files** on its first page — no transcript sits beside its audio.

Transcript material does exist, scattered outside the Library:

- `episode-04-transcript-shakti-sankalpa-40-day-path.md`, `1LKR-smSSCaIER…`,
  28,395 bytes, parent `1TkSjmVqOanMO39djtUbeHqyyYfHl9HqL`
- `The Vow Beneath the Path.txt`, 27,031 bytes, in **four** parents:
  `1BKrdkXiL7yV…`, `1GYStEfO5OPy…` (both intake), `1b-DE68LKAtq…`,
  `1s8OWCW3ZWWY…`

**Which copy is canonical has not been decided, and I did not decide it.**

---

## 5. Duplicate groups confirmed on Drive (distinct from the index's 306)

| Content | Size | Copies found | IDs |
|---|---|---|---|
| `The_Shakti_Sankalpa.pdf` | 17,360,084 | ≥3 | `1rWGMdzQYb0y…`, `15WtayFXCs-W…`, `11jsVOyyGzu-…` |
| `The Vow Beneath the Path.txt` | 27,031 | ≥4 | `1BKrdkXiL7yV…`, `1GYStEfO5OPy…`, `1b-DE68LKAtq…`, `1s8OWCW3ZWWY…` |
| `kali_chamber_1783418638784*.jpg` | 756,086 | ≥3 | `1F80rqeXdGTN…`, `1E0Y0XdiJ4qO…`, `12ST_aN7vFPJ…` |
| `Shakti_System_Foundation_Deck (1).pptx` | 247,079 | 2 | `1bYasvFmr_Nq…`, `1CT0G9Gef4dY…` |

Each pair matches on byte count, not on a verified hash — see §6.

---

## 6. What this pass could NOT establish, and why

State these as limits, not as absence of content.

1. **No content hashes from Drive.** The connector returns no `md5Checksum`
   or `sha256`. Every duplicate claim above rests on **identical byte count
   plus identical name**, which is strong evidence and not proof. Hash-level
   dedupe needs the Drive API directly, with a credential this session does
   not hold.
2. **Shortcut targets cannot be resolved.** `get_file_metadata` on the Kali
   shortcut returns no `shortcutDetails` and no `targetId`. **So the Maa Kali
   session's real file, its real owner and its real permissions are unknown.**
   This directly blocks secure delivery for every shortcut-backed asset, and
   it is why `KALI-WORKSHOP-002` cannot be approved on this evidence.
3. **Listings page at 5 results.** `pageSize` is not honoured. A complete
   recursion of the named folders would be several hundred calls. Branch
   contents above are **first pages**, so "2 files in 03" means *at least* 2.
   **Zero first-level files in a branch is not proof that the branch is
   empty**, exactly as Issue #41 warns.
4. **The file index was read to ~91%.** The final ~96 KB (roughly 170 rows)
   was truncated by the connector. Totals above are therefore lower bounds.
5. **The five DWD practice-night assets remain UNVERIFIED.** I did not find
   them and I did not establish that they are absent. That distinction holds.
6. **`Sheetal_Local_Archive_019.zip` was not opened.** Its 99 files are
   unexamined; only its existence and size are confirmed.

---

## 7. Required actions, in priority order

1. **Decide on the public-link exposure (Major + Sheetal, today).** Until
   the tree stops being `anyone: reader`, no Vault gate means anything. This
   needs an approved migration and verification plan because changing the
   root's sharing will break every existing link, including any Sheetal has
   already sent to clients. **That breakage is the point, and it must be a
   decision she makes knowingly, not a switch an agent flips.**
2. **Ask Sheetal about `ms.srijanidas00@gmail.com` holding `writer`** on her
   doctrine.
3. **Reconcile the index against the status note** before any asset is
   created from either. Right now they disagree and neither can be trusted.
4. **Resolve shortcut targets** with a direct Drive API credential, or
   replace the shortcuts with real files in the Library.
5. **Decide canonical copies** for the Sankalpa PDF, the Vow transcript and
   the Kali chamber image, then record the duplicate group on the Airtable
   row rather than deleting anything.
6. **Rescope hydration** to media and documents; exclude the `Shakti Portal`
   source tree.
7. **No new Airtable assets** until 3–5 are settled. The existing 22 already
   describe more than is verified.

**No Airtable record was created, changed or read-modified during this pass.
No file was moved. No permission was altered. Nothing was published.**
