# Shakti Backend, Airtable, and Analytics Readiness

Date: 2026-09-19
Status: PREVIEW VERIFICATION PENDING
Scope: public seeker intake, server write boundary, operational CRM, and anonymous aggregate analytics

## Purpose

Make the seeker-data boundary explicit and measurable without identifying
anonymous visitors or exposing Airtable credentials to the browser.

```text
Anonymous visit -> aggregate analytics only
Voluntary submission -> server API -> validation -> Airtable -> human review
```

## Operating Contract

| Item | Contract |
| --- | --- |
| Owner | Major / authorized Sri Shakti Shala operator |
| Trigger | Public journey use, voluntary form submission, or an approved QA verification |
| Inputs | Anonymous page/action events; consented Begin contact and choices |
| Outputs | Aggregate Vercel analytics; operational Airtable records when writes are explicitly enabled |
| Tools | Vercel Web Analytics, Vercel Functions, Airtable, Playwright, Graphify |
| Decision rule | Anonymous behavior never enters Airtable; PII never enters analytics |
| Maintenance | Monthly event review; quarterly form/schema review; pre-release environment-name check |

## Public Data-Flow Inventory

### Start Your Shakti Path / `/begin` / `/begin/review`

```text
Visitor
-> Begin journey (three choice responses, optional longing/reflection kept local)
-> Handoff (first name; optional email; optional WhatsApp; consent; optional guidance request/note)
-> BeginWriteClient
-> POST /api/begin/complete
-> strict allowlist validation + contact/consent gate + instance rate limit
-> Seekers + Intake Responses + Progress
-> saved, local-only, write-disabled, invalid, rate-limited, or error response
-> clear saved/local/error copy; private journey may continue
```

The server derives the pathway. Progress idempotency prevents duplicate Begin
completion writes for the same journey key. Existing Seekers are matched by
normalized email or phone.

If personal guidance is selected after a successful Begin save:

```text
Handoff
-> POST /api/request-signal
-> strict validation + consent/contact gate + instance rate limit
-> Seeker upsert + Requests & Signals
-> Needs Review / human review required
```

Request-signal replay protection derives a stable Signal ID from the submitted
idempotency key and checks Requests & Signals before writing. Live proof remains
pending until the bounded Preview QA run succeeds.

### Dancing with Durga

```text
View offerings & reserve -> public Stripe storefront (external; no site payment data)
Request details -> /begin?intent=community -> Begin handoff
```

`community_interest_submitted` remains anonymous measurement only. After a
consented Begin save with usable contact, the community intent creates a
`Support Request` in Requests & Signals with source `/dancing-with-durga` and
node `request-details`. It does not create access or promise enrollment.

### Retreat Interest

The Retreat room collects a name, email or WhatsApp, nourishment preference,
practice-experience selection, and explicit consent. It calls
`/api/request-signal` and reports success only after the server confirms a saved
`Support Request` with source `/shala/retreat` and node `retreat-room`. It never
creates an application, readiness decision, approval, or Access Grant.

### Other Public Surfaces

No newsletter or general contact form was found. Reflection Pool, ritual state,
lamps, prayer flags, and Begin fallback state remain browser-local. The fallback
retains no email, phone, free text, or somatic response content and expires.

## Airtable Destination Map

| Submission | Destination | Status |
| --- | --- | --- |
| Consented Begin with contact | Seekers, Intake Responses, Progress | Implemented; Preview proof pending |
| Guidance request after saved Begin | Seekers, Requests & Signals | Implemented; Preview proof pending |
| DWD community intent | Seekers, Requests & Signals after saved Begin | Implemented; Preview proof pending |
| Retreat conversation request | Seekers, Requests & Signals | Implemented; Preview proof pending |
| Anonymous analytics | None | Never send to Airtable |

Access Grants are never created by these endpoints. Readiness, access, retreat
approval, and intimate discernment remain human decisions.

## Environment Findings

Canonical server names:

```text
AIRTABLE_BASE_ID
AIRTABLE_PERSONAL_ACCESS_TOKEN
BEGIN_WRITES_ENABLED
```

`AIRTABLE_TOKEN` is a legacy server-only fallback. Preview now holds the
canonical credential as a Vercel Sensitive value; it cannot be pulled back into
the local shell for inspection. Production intentionally has no canonical PAT.
`BEGIN_WRITES_ENABLED` remains absent or false outside the bounded QA operation,
and no `VITE_AIRTABLE_TOKEN` is configured.

## Airtable Verification

The prior local metadata request could not test the real Vercel Sensitive value.
The definitive proof is therefore a one-time Preview build that authenticates,
checks the intended base and exact table/field IDs, creates uniquely labelled
synthetic Begin/DWD/retreat records, verifies replay identity, and removes only
those records. Until that build passes, live Airtable readiness remains pending.

## Analytics Foundation

Provider: Vercel Web Analytics, using its first-party script protocol.

Page analytics can provide anonymous aggregate visits, unique-visitor estimates,
pages, referrers, device/browser/OS, and approximate geography. This first pass
redacts all query strings, so custom UTM reporting is not enabled. It does not
identify visitors by name and should not be described as exact person-level
behavior or exact time-on-site.

Custom event dictionary:

| Event | Trigger |
| --- | --- |
| `start_path_viewed` | Begin route loads |
| `self_audit_started` | Begin reaches the first choice station |
| `self_audit_completed` | Begin reaches pathway reveal |
| `request_details_clicked` | DWD secondary CTA click |
| `stripe_storefront_clicked` | DWD Stripe storefront click |
| `community_interest_submitted` | Community-intent Begin handoff submits |
| `retreat_interest_submitted` | Local retreat prototype request submits |

The analytics API accepts an allowlisted event name only. It has no property
argument, so names, email addresses, phone numbers, free text, answers, pathway
scores, and retreat-form values cannot enter the event payload. Query strings
and fragments are removed from page-view URLs before transmission.

Vercel Web Analytics is enabled for the HAMAL project. A deployment must set
`VITE_VERCEL_ANALYTICS_ENABLED=true` before the first-party page-view script is
loaded. The HAMAL team is currently on Hobby: anonymous page analytics are
available, while Vercel custom events are not a supported plan feature. The
allowlisted event vocabulary remains privacy-bounded and ready for a future
supported plan, but it must not be reported as dashboard data today. Authorized
operators can view aggregate data in the project's Analytics area; Airtable
remains the place for consented seeker follow-up.

## Failure Points And Decision Rules

- Keep writes disabled when the credential, base, schema, or destination is ambiguous.
- Do not create duplicate credential names to conceal a mismatch.
- Never configure Airtable credentials under `VITE_*`.
- Do not treat an analytics event as proof of a CRM submission.
- Do not treat retreat interest as an application or readiness decision.
- Do not enable general Preview writes for a QA test.
- Durable abuse protection and request-signal idempotency require a separate approved backend sprint.

## Safe QA Procedure

1. Export the exact committed release to a clean temporary deployment snapshot.
2. Confirm public `BEGIN_WRITES_ENABLED=false`.
3. Set `AIRTABLE_QA_VERIFY=true` only for the Preview build step.
4. Let the guarded script verify metadata, synthetic writes, replay, and cleanup with generated labels.
5. Fail the build if any authentication, schema, write, replay, or cleanup assertion fails.
6. Remove the temporary duplicate credential name only after the canonical name passes.
7. Record status without copying record contents, IDs, or credential values into Git.

## Handoff And Team Training

- Operators review consented seekers and requests in Airtable.
- Operators review anonymous reach and engagement in Vercel Analytics.
- Operators do not combine anonymous analytics with seeker identities.
- Developers use GitHub as source truth, Vercel for functions/hosting, Airtable for operational records, Notion for human command-center work, and Graphify for context.
- Any new form must declare collected fields, consent, API, destination, retention, user-facing outcomes, idempotency, and a human owner before launch.

## Remaining Manual Actions

1. Run the bounded HAMAL Preview build and capture its pass/fail status.
2. If successful, remove the obsolete duplicate Preview credential name.
3. Set `VITE_VERCEL_ANALYTICS_ENABLED=true` in the intended deployment and verify the page-view request.
4. Treat custom events as unavailable while the HAMAL team remains on Hobby; do not upgrade the plan without separate authorization.
5. Keep public Preview writes disabled after QA and keep Production writes disabled until separately authorized.
