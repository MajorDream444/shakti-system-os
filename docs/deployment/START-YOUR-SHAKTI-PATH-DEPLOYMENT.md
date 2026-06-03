# Deployment: Start Your Shakti Path

## What This Is

The first public-access prototype of the Shakti System OS front-door experience. A seeker enters, moves through eight screens of reflective discernment, receives a pathway result, and optionally shares contact details for follow-up. No login. No paywall. No manipulation.

---

## Deployment Path

**Repository:** `MajorDream444/shakti-system-os`
**App directory:** `apps/start-your-shakti-path/`
**Build output:** `apps/start-your-shakti-path/dist/`
**Deployment target:** Vercel

---

## Vercel Setup

### First Deploy

1. Go to [vercel.com](https://vercel.com) and connect the GitHub repository.
2. During project setup, set **Root Directory** to:
   ```
   apps/start-your-shakti-path
   ```
3. Vercel will detect Vite automatically. Confirm:
   - Framework: **Vite**
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`

The `vercel.json` inside `apps/start-your-shakti-path/` encodes these settings and will be applied automatically.

### Subsequent Deploys

Push to `main` (or the designated production branch). Vercel will redeploy automatically.

---

## Environment Variables

**This prototype requires no environment variables.**

The `@google/genai` package was present in the original Google AI Studio export but is not used in the application. It has been removed from this deployment's `package.json`.

### Future Variables (not yet needed)

| Variable | Purpose | When to Add |
|---|---|---|
| `VITE_AIRTABLE_API_KEY` | Lead capture to Airtable CRM | When Airtable integration is built |
| `VITE_AIRTABLE_BASE_ID` | Airtable base identifier | Same |
| `VITE_TELEGRAM_BOT_TOKEN` | WhatsApp/Telegram handoff | When messaging integration is built |
| `VITE_GEMINI_API_KEY` | AI-assisted reflection (optional) | Only if added to a future screen |

**Note:** All client-side Vite env vars must be prefixed `VITE_`. Never expose secret keys in the frontend bundle.

---

## Known Limitations (Prototype)

- **Lead capture is not wired.** The Handoff screen collects name, email, and optional WhatsApp number but saves only to `localStorage`. No data reaches any CRM, email system, or Sheetal's dashboard.
- **No email confirmation sent.** The "we'll send your path" language is intentional UI copy — the email trigger does not yet exist.
- **No analytics.** No event tracking is active. Page views are not recorded.
- **No auth.** This is a fully public app. Anyone with the URL can access it.
- **Static hosting only.** There is no backend server. This is a client-side SPA.

---

## Future Production Tasks

### Priority 1 — Lead Capture
- Wire Handoff form submission to Airtable `Leads` table
- Store: name, email, WhatsApp, pathway result, reflection text, longing selections, timestamp
- Send confirmation email via Resend, SendGrid, or similar (server function or Edge Function)

### Priority 2 — CRM Readiness Tagging
- Tag each lead record with their revealed pathway (CIRCLE / ONE_ON_ONE / CONTAINER / RETREAT)
- Store longing selections as multi-select CRM field
- Enable Sheetal to filter and review leads by pathway alignment

### Priority 3 — Email / WhatsApp Handoff
- Automated follow-up email with pathway summary and next step link
- Optional WhatsApp onboarding message via Twilio or similar
- These should feel warm and personal, not automated — use thoughtful copy and a delay

### Priority 4 — Self-Audit Integration
- Link "Begin with the Self-Audit" CTA to a real self-audit form (Typeform, Notion form, or custom)
- Self-audit responses feed back into Airtable for readiness scoring

### Priority 5 — Analytics
- Add privacy-respecting analytics (Plausible or Fathom preferred over Google Analytics)
- Track: pathway completion rate, result distribution, form submission rate
- Share weekly summary with Sheetal, not raw surveillance data

### Priority 6 — Sheetal Review Loop
- Simple Airtable interface for Sheetal to review new leads
- Flag for follow-up, set readiness status, add notes
- Do not automate the decision — preserve human discernment at the intake point

---

## Doctrine Reminder

This app is structure around the medicine. It is not the medicine itself.

- Do not add urgency, scarcity, or pressure mechanics
- Do not capture contact before revealing the result
- Do not automate intimacy
- Preserve Sheetal's review and approval at every intake gateway
- Keep the experience calm, sovereign, and honest

---

*Last updated: 2026-06-03*
*Deployment branch: `claude/epic-cray-ICKrI` → merge to `main` when Sheetal approves*
