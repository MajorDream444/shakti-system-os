# CRM V1 — Google Sheets Architecture

## Overview

The Shakti System OS uses Google Sheets as its first CRM layer — a human-reviewed operating memory, not a marketing database. All seeker contact is mediated by Sheetal or the Shakti Shala team before any follow-up occurs.

Two entry flows feed into a shared human review queue.

---

## Entry Flows

### 1. Website Handoff (`site_handoff`)

**Source:** Start Your Shakti Path — deployed at `https://shakti-system-os.vercel.app/`

The seeker moves through eight screens of reflective discernment. At screen 8 (Handoff), they may optionally share:
- First name
- Email address
- WhatsApp (optional)

The app also captures:
- Pathway key (`CIRCLE`, `ONE_ON_ONE`, `CONTAINER`, `RETREAT`)
- Recommended pathway (human-readable)
- Longings (array of selections from screen 6)
- Reflection (free text from screen 6)
- Source URL and UTM parameters (if present)

This is a **short threshold capture**. The seeker has not been asked deep disclosure questions. The website is a doorway, not a form.

**Destination:** SEEKERS tab only.

---

### 2. Google Form Application (`google_form_sync`)

**Source:** Start Your Shakti Path Readiness Tracker — Google Form

The seeker completes a 12-question disclosure form. This is a real act of disclosure, not a survey. Questions include:
- Name and location
- How she spends her days
- What brought her to this form
- Previous practices and containers
- What has hit its limit
- What feels alive now
- Capacity and constraints
- Current therapeutic support
- Container preference
- Investment capacity (time and financial)
- Final note to Sheetal

This is a **deeper disclosure layer**. The form is not shown to the public as a primary entry point. It is reached from the PathReveal or Handoff screen via the "Begin with the Self-Audit" CTA, or linked directly.

**Destinations:** Self-Audit / Form Responses tab (raw) AND SEEKERS tab (normalized summary).

---

## Google Sheets Tab Structure

### SEEKERS (Human Review Queue)

One row per seeker, regardless of entry flow. Sheetal or the team reviews this tab to understand who has arrived and what they may need.

| Column | Description |
|---|---|
| Created Date | Timestamp of capture |
| First Name | |
| Last Name | |
| Email | |
| WhatsApp | Optional |
| City | From form; blank for site handoffs |
| Recommended Pathway | Human-readable pathway name |
| Reflection | Summary of longings + reflection, or form summary |
| Source | `Start Your Shakti Path — Website` or `Google Form — Self-Audit / Application` |
| Status | `New`, `New — Form Response`, or manually updated |
| Assigned To | Who is following up (filled by team) |
| Last Contact Date | Filled manually after outreach |
| Notes | UTM data, form timestamp, page URL; updated by team |

**This is the operating queue. No automation contacts seekers from this tab. Human review precedes any outreach.**

---

### Self-Audit / Form Responses (Raw Disclosure Archive)

One row per Google Form submission. Full verbatim responses stored here. This is Sheetal's reading material — not a pipeline view.

| Column | Description |
|---|---|
| Timestamp | When the form was submitted |
| Name | |
| Location | |
| Email | |
| How She Spends Her Days | Q3 |
| What Brought Her Here | Q4 |
| Practices / Paths Explored | Q5 |
| What Has Hit Its Limit | Q6 |
| What Feels Alive | Q7 |
| Capacity & Constraints | Q8 |
| Current Support | Q9 |
| Container Preference | Q10 |
| Investment Capacity | Q11 |
| Final Note | Q12 |

---

## Apps Script Endpoint

The Google Apps Script Web App URL is deployed from the same spreadsheet. It is not stored in the codebase. It lives in Vercel as an environment variable:

```
VITE_SHEET_ENDPOINT = <your deployed Web App URL>
```

The script handles:
- `POST type: "site_handoff"` → writes to SEEKERS
- `POST type: "google_form_sync"` → writes to Self-Audit / Form Responses and SEEKERS
- Installable trigger `onFormSubmit` → fires automatically when a Google Form response is submitted

The script file is: `apps/start-your-shakti-path/scripts/google-apps-script-seeker-capture.gs`

---

## What This Is Not

- This is not a marketing automation system.
- This is not a drip campaign tool.
- This is not a lead scoring pipeline.
- No seeker is contacted automatically.
- No data is sold, shared, or used outside of Sheetal's direct review.

---

*Last updated: 2026-06-10*
