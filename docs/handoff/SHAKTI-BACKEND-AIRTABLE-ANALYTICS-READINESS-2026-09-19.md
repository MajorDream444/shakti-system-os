# Shakti Backend, Airtable, and Analytics Readiness

Date: 2026-09-19
Status: PARTIALLY READY
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

Request-signal replay protection is not yet proven because the destination
schema has no approved idempotency lookup field. Treat repeat submissions as a
known operational risk.

### Dancing with Durga

```text
View offerings & reserve -> public Stripe storefront (external; no site payment data)
Request details -> /begin?intent=community -> Begin handoff
```

`community_interest_submitted` is anonymous measurement only. The current
Airtable contract does not preserve the `community` query intent as a dedicated
CRM signal, so operational DWD/community routing remains a HOLD item.

### Retreat Interest

The Retreat room collects a local prototype name, nourishment preference, and
practice-experience selection. It does not call an API, does not create an
Airtable record, and explicitly tells the visitor that no application or
approval was created. `retreat_interest_submitted` measures the local action
without sending the entered values.

### Other Public Surfaces

No newsletter or general contact form was found. Reflection Pool, ritual state,
lamps, prayer flags, and Begin fallback state remain browser-local. The fallback
retains no email, phone, free text, or somatic response content and expires.

## Airtable Destination Map

| Submission | Destination | Status |
| --- | --- | --- |
| Consented Begin with contact | Seekers, Intake Responses, Progress | Implemented; live connectivity not verified |
| Guidance request after saved Begin | Seekers, Requests & Signals | Implemented; live connectivity not verified |
| DWD community intent | Begin records only; no dedicated signal | HOLD |
| Retreat prototype request | None | Local-only by design |
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

`AIRTABLE_TOKEN` is a legacy server-only fallback. Current HAMAL inspection
found the Production credential under a different, unsupported name; Preview
has no server credential. `BEGIN_WRITES_ENABLED` is absent in both environments
and therefore false. No `VITE_AIRTABLE_TOKEN` is configured.

No environment variable was added, removed, or changed during this pass.

## Airtable Verification

A server-side metadata-only request was attempted against the configured HAMAL
Production environment. It returned `404`, so the current base, table, field,
choice, and credential-scope contract could not be proven. No record contents
were requested or displayed.

Because reachability and schema compatibility were not proven, the synthetic
write proof was not run. This is the required safe outcome.

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

Vercel Web Analytics must be enabled in the HAMAL project dashboard before a
deployment can collect page views. The current script endpoint returns `404`,
so `VITE_VERCEL_ANALYTICS_ENABLED` remains false by default to avoid failed
browser requests. After the dashboard feature is enabled, set that public gate
to true and redeploy. Custom events also require a Vercel plan that supports
them. Sheetal's future team can view aggregate data in the project's Analytics
area; Airtable remains the place for consented seeker follow-up.

## Failure Points And Decision Rules

- Keep writes disabled when the credential, base, schema, or destination is ambiguous.
- Do not create duplicate credential names to conceal a mismatch.
- Never configure Airtable credentials under `VITE_*`.
- Do not treat an analytics event as proof of a CRM submission.
- Do not treat local retreat interest as an application or readiness decision.
- Do not enable general Preview writes for a QA test.
- Durable abuse protection and request-signal idempotency require a separate approved backend sprint.

## Safe QA Procedure

1. Use a clean Preview and confirm `BEGIN_WRITES_ENABLED=false`.
2. Verify page and custom events with synthetic labels only; inspect event names, not visitor identity.
3. For a future Airtable write proof, first confirm metadata access and exact schema compatibility.
4. Enable writes only in a bounded QA environment with an authorized server credential.
5. Submit one clearly fake record through the real endpoint, verify one record, test replay, then archive only that QA record if the workflow authorizes it.
6. Disable the write gate again and record the result without copying record contents into Git.

## Handoff And Team Training

- Operators review consented seekers and requests in Airtable.
- Operators review anonymous reach and engagement in Vercel Analytics.
- Operators do not combine anonymous analytics with seeker identities.
- Developers use GitHub as source truth, Vercel for functions/hosting, Airtable for operational records, Notion for human command-center work, and Graphify for context.
- Any new form must declare collected fields, consent, API, destination, retention, user-facing outcomes, idempotency, and a human owner before launch.

## Remaining Manual Actions

1. Correct the HAMAL server credential to `AIRTABLE_PERSONAL_ACCESS_TOKEN` in the intended non-production verification environment.
2. Confirm the configured base and credential can access Airtable metadata.
3. Re-run the schema audit before any write proof.
4. Enable Vercel Web Analytics for `shakti-system-os` in the HAMAL dashboard.
5. Set `VITE_VERCEL_ANALYTICS_ENABLED=true` in the intended environment and redeploy.
6. Confirm the HAMAL plan supports custom events.
7. Keep Preview writes disabled until a separate, explicitly authorized QA write window.
