# Lead Routing Architecture

## Shakti System OS — V1

This document describes how seekers move from their first contact with the Shakti System to Sheetal's human review queue. There is no automated outreach. Every contact is mediated by a human before any response is sent.

---

## Entry Points

```
Website                          Google Form
(shakti-system-os.vercel.app)    (Google Forms link)
        │                                │
        ▼                                ▼
  8-screen discernment           12-question disclosure
  pathway reveal                 self-audit / application
        │                                │
        ▼                                │
   Handoff screen                        │
   (name, email, WhatsApp)               │
        │                                │
        ▼                                ▼
  POST → Apps Script ◄──── POST → Apps Script
  type: site_handoff         type: google_form_sync
        │                          │        │
        ▼                          ▼        ▼
    SEEKERS tab          Self-Audit /   SEEKERS tab
    (normalized)         Form Responses (normalized
                         (raw archive)   summary)
                                │
                                ▼
                         SEEKERS tab
                         (see above)
```

---

## Flow 1: Website Handoff

**Trigger:** Seeker completes the 8-screen discernment experience and submits the Handoff form.

**Data captured:**
- `type: "site_handoff"`
- Name, email, WhatsApp (optional)
- Pathway key (`CIRCLE`, `ONE_ON_ONE`, `CONTAINER`, `RETREAT`)
- Recommended pathway (human-readable)
- Longings (array from screen 6)
- Reflection (free text from screen 6)
- Source: `"Start Your Shakti Path"`
- Page URL, user agent
- UTM parameters (if present in URL)

**Written to:** SEEKERS tab only.

**SEEKERS status:** `New`

---

## Flow 2: Google Form Application

**Trigger:** Seeker completes the 12-question self-audit via Google Form.

**Data captured:** Full verbatim responses to all 12 questions (see `GOOGLE-FORM-QUESTION-SET.md`).

**Written to:**
1. Self-Audit / Form Responses tab — raw, verbatim, one column per question
2. SEEKERS tab — normalized summary row

**SEEKERS status:** `New — Form Response`

**SEEKERS Reflection column:** Multi-section summary: what brought her here, paths explored, what has hit its limit, what feels alive, constraints, support, investment capacity, final note.

**SEEKERS Recommended Pathway:** Mapped from Q10 (container preference) via `mapContainerToPathway_()`. Approximate — Sheetal has final discernment.

---

## Flow 3: Simultaneous Entry (Both Paths)

A seeker may complete both the website handoff and the Google Form. This results in two rows in SEEKERS — one from each entry flow. This is intentional. The team can identify the same person by email and merge their understanding manually.

No deduplication is applied automatically.

---

## SEEKERS Tab — Human Review Queue

The SEEKERS tab is Sheetal's operating dashboard for new arrivals. It is not a CRM automation queue. It is a list of people who have raised their hand and the context they've shared.

**Review process:**
1. Sheetal or team opens SEEKERS
2. Reads the Reflection and Recommended Pathway columns
3. For form responses: opens Self-Audit / Form Responses tab and reads full disclosure
4. Updates Status column: `Reviewed`, `In Conversation`, `Waitlisted`, `Not Ready Now`, etc.
5. Assigns to team member if applicable (Assigned To column)
6. Reaches out personally — no automated messages

**No seeker is contacted from any automated system. Human discernment precedes every response.**

---

## Environment Configuration

The Apps Script endpoint URL is never stored in the repository. It is set as a Vercel environment variable:

```
VITE_SHEET_ENDPOINT = https://script.google.com/macros/s/<deployment-id>/exec
```

The React app reads this at build time via `import.meta.env.VITE_SHEET_ENDPOINT`. If the variable is not set, the Handoff form still shows success — data is saved to `localStorage` as a fallback.

---

## Apps Script Deployments

The Apps Script Web App must be:
- Deployed as: **Web App**
- Execute as: **Me** (Sheetal's Google account)
- Who has access: **Anyone** (required for `mode: 'no-cors'` fetch from the React app)

The Google Form trigger must be:
- Function: `onFormSubmit`
- Event source: From spreadsheet
- Event type: On form submit
- Installed from: Sheetal's Google account

---

## What This Is Not

- This is not a marketing funnel.
- This is not a drip campaign.
- This is not a chatbot or automated onboarding sequence.
- The "doorway" language on the site reflects actual architecture: seekers enter, pathway is revealed, contact is optional, review is human.

---

*Last updated: 2026-06-10*
