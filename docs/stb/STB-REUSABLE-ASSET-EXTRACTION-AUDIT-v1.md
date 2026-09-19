# STB Reusable Asset Extraction Audit v1

Prepared: 2026-08-24  
Scope: Shakti System OS as Client Zero for the Stop the Bleed reusable build system  
Status: Audit only, human review required

## Core Rule

```text
CLIENT-SPECIFIC TRUTH stays inside the client instance.
REUSABLE METHOD belongs in STB documentation, templates, skills, tests, scripts, agents, or product modules.
AGENT BEHAVIOR may become a reusable skill.
DETERMINISTIC CHECK should become a test, script, or automation rather than prose when possible.
```

This audit extracts the method, not the medicine.

Do not copy Sheetal doctrine, sacred language, client data, imagery, founder claims, offer copy, access wording, or brand-specific implementation into reusable STB assets. The reusable layer should preserve the operating patterns that made the Shakti build safer and more intelligible.

## Evidence Reviewed

Repo evidence:

- `graphify-out/GRAPH_REPORT.md` as the standing context map. It is readable but stale relative to current Sprint 11-12 work.
- `docs/handoff/FIRST-LIVING-SEEKER-IMPLEMENTATION-REPORT-v1.md`
- `docs/handoff/FIRST-LIVING-SEEKER-PREVIEW-GATE-REPORT-v1.md`
- `docs/handoff/FIRST-LIVING-SEEKER-ENABLED-WRITE-ADDENDUM-v1.md`
- `docs/handoff/RELEASE-0.4-FIRST-LIVING-SEEKER-CANDIDATE.md`
- `docs/handoff/SPRINT-12B-EXPERIENCE-EVIDENCE-PASS.md`
- `docs/handoff/SPRINT-12C-LIVING-FRONT-DOOR-IMPLEMENTATION-REPORT.md`
- `docs/handoff/SPRINT-12E-LEGIBILITY-SACRED-PRESENCE-REPORT.md`
- `docs/handoff/SPRINT-12F-SHEETAL-ACCEPTANCE-OFFER-PATH-REPORT.md`
- `docs/handoff/SHEETAL-ACCEPTANCE-REVIEW-2026-08-22.md`
- `docs/handoff/HANDOVER-2026-08-19-CLAUDE-TO-CODEX.md`
- `docs/handoff/GRAPHIFY-REFRESH-BLOCKER.md`
- `docs/architecture/SHAKTI-SYSTEM-AIRTABLE-LIVE-BASE.md`
- `docs/architecture/APP_ARCHITECTURE.md`
- `docs/architecture/VAULT_ARCHITECTURE.md`
- `docs/pipeline/DOCTRINE-EXTRACTION-CHECKLIST.md`
- `docs/pipeline/DOCTRINE-PASSPORT-STANDARD.md`
- `docs/pipeline/LIVING-DOCTRINE-PIPELINE.md`
- `docs/research/SHEETAL-PUBLIC-SOURCE-REGISTER.md`
- `apps/web/e2e/sprint12c-living-front-door.spec.ts`
- `apps/web/e2e/sprint12d-luminous-art-direction.spec.ts`
- `apps/web/e2e/sprint12f-founder-acceptance.spec.ts`
- `apps/web/src/checks/beginWriteChecks.ts`
- `api/begin/complete.ts`
- `api/request-signal.ts`

## Proposed STB Asset Directory

```text
stb/
  README.md
  skills/
    source-of-truth-reconciliation/
    doctrine-vocabulary-extraction/
    founder-truth-verification/
    stranger-clarity-review/
    offer-path-clarity-audit/
    design-intention-playwright-qa/
    client-acceptance-review/
    preview-production-governance/
    privacy-memory-boundary/
    secure-write-boundary/
    feedback-implementation-loop/
    launch-evidence-reporting/
  templates/
    launch-readiness-audit.md
    tester-review-guide.md
    founder-acceptance-register.md
    offer-commerce-contract.md
    source-register.md
    data-contract.md
    privacy-memory-boundary.md
    secure-write-boundary-design.md
    client-handoff-report.md
    launch-evidence-report.md
    you-said-we-changed-ready-for-review.md
  agents/
    client-reconciliation-agent.md
    acceptance-review-agent.md
    deployment-governance-agent.md
    doctrine-archivist-agent.md
  scripts/
    scan-prohibited-language.ts
    verify-preview-routes.ts
    inspect-env-scope.ts
    scan-browser-bundle-for-secrets.ts
    check-secure-write-boundary.ts
    collect-playwright-evidence.ts
  tests/
    playwright/
      stranger-clarity.spec.ts
      offer-path-clarity.spec.ts
      founder-acceptance.spec.ts
      deployment-boundary.spec.ts
  playbooks/
    client-build-handoff.md
    first-preview-proof.md
    human-review-queue-operations.md
    release-candidate-prep.md
  product-modules/
    living-front-door/
    client-intelligence-readiness-map/
    human-in-loop-commerce/
    intake-secure-write/
    launch-evidence-dashboard/
```

## Asset Classification Matrix

| Candidate | Classification | Extractable method | Keep client-specific |
|---|---|---|---|
| 1. Website launch readiness audit | REUSABLE TEMPLATE, REUSABLE SKILL, AUTOMATED TEST | A launch gate that checks clarity, route health, evidence, environment boundaries, human review status, and release recommendation. | Client launch date, brand criteria, route names, offers, copy, imagery, approval owners. |
| 2. Stranger clarity test | REUSABLE TEMPLATE, REUSABLE SKILL, AUTOMATED TEST | A first-time visitor rubric: who is this, what is offered, where do I begin, can I recover, does mobile preserve hierarchy. | Client positioning, founder language, client-specific thresholds and labels. |
| 3. Offer-path clarity | REUSABLE SKILL, AUTOMATED TEST, STB PRODUCT MODULE | A structured audit for direct offer discovery versus guided discernment, with no fake checkout or invented pricing. | Offer names, pricing, payment rules, access states, promise language. |
| 4. Founder truth verification | REUSABLE TEMPLATE, REUSABLE SKILL, AGENT | Source-register workflow for biography, credentials, claims, quotes, and founder corrections. | Founder biography, credentials, lineage/training, personal story, exact claims. |
| 5. Client acceptance review | REUSABLE TEMPLATE, REUSABLE SKILL, AGENT | A register that converts founder/client feedback into FIX BEFORE LAUNCH, POLISH, FUTURE, with acceptance tests and owners. | Client review language, founder preferences, brand-specific taste decisions. |
| 6. Design-intention Playwright QA | REUSABLE SKILL, AUTOMATED TEST, SCRIPT/CLI | Browser-based evidence capture that answers subjective rubrics with screenshots and DOM/UI citations. | Client art direction, brand vocabulary, sacred or cultural symbolism. |
| 7. Living front-door pattern | STB PRODUCT MODULE, REUSABLE TEMPLATE | Public front door pattern that separates "I know what I want" from "help me discern what I need." | Client method, offer taxonomy, visual system, journey names. |
| 8. Client intelligence readiness mapping | STB PRODUCT MODULE, REUSABLE TEMPLATE | Map from experience nodes to data readiness, systems of record, human gates, and automation boundaries. | Client data model, exact tables, private operational states. |
| 9. Human-in-the-loop commerce | STB PRODUCT MODULE, REUSABLE TEMPLATE, AUTOMATED TEST | Commerce model where request, review, readiness, payment, and access are separate states. | Prices, eligibility, approval rules, payment provider, legal language. |
| 10. Client build handoff/playbook | REUSABLE TEMPLATE, AGENT | Cross-agent handoff format that records corrections, source confidence, local constraints, branch hazards, and next gates. | Client incidents, private context, specific screenshots, sensitive credentials. |
| 11. Doctrine/vocabulary extraction | REUSABLE SKILL, SCRIPT/CLI, REUSABLE TEMPLATE | Source-led language extraction, term frequency, prohibited phrase scans, source confidence, and review flags. | Doctrine itself, sacred terms, exact vocabulary, lineage interpretation. |
| 12. Source-of-truth reconciliation | REUSABLE SKILL, PLUGIN/CONNECTOR WORKFLOW, REUSABLE TEMPLATE | Reconcile GitHub, graph map, Airtable/CRM, Drive assets, docs, and design contracts before edits. | Client system names, exact hierarchy, source IDs, private files. |
| 13. Preview-vs-production deployment governance | REUSABLE SKILL, SCRIPT/CLI, AUTOMATED TEST, PLUGIN/CONNECTOR WORKFLOW | Deployment-source verification, env scope review, Preview proof, no Production activation without explicit approval. | Project IDs, domains, team names, credential values. |
| 14. Privacy/memory boundary | REUSABLE TEMPLATE, REUSABLE SKILL, AUTOMATED TEST, STB PRODUCT MODULE | Define intentional memory, no passive exhaust, local fallback retention, consent, and deletion behavior. | Client sensitivity model, exact consent copy, retention policy details. |
| 15. Secure-write boundary | REUSABLE TEMPLATE, REUSABLE SKILL, SCRIPT/CLI, AUTOMATED TEST, STB PRODUCT MODULE | Server-only credentials, payload validation, allowlisted fields, idempotency, rate limiting, safe logging, fail-closed config. | Tables, field IDs, domain decisions, actual scoring/business rules. |
| 16. Client feedback -> implementation loop | REUSABLE TEMPLATE, REUSABLE SKILL, AGENT | Convert user/founder/tester feedback into classified findings, implementation boundaries, proof, and review report. | Feedback content, founder preferences, client voice. |
| 17. "You Said -> We Changed -> Ready for Review" transparency model | REUSABLE TEMPLATE, STB PRODUCT MODULE | A client-facing review artifact that ties feedback to visible changes and open decisions. | Actual client feedback, screenshots, client promises. |
| 18. Launch evidence/reporting standard | REUSABLE TEMPLATE, SCRIPT/CLI, AGENT | Standard report including SHA, deployment URL, route/API proof, screenshots, security scan, known limitations, rollback. | Client release name, exact URLs, evidence files, team decision language. |

## Reusable Skill Candidates

### 1. `stb-source-of-truth-reconciliation`

Triggering conditions:

- Before implementation in an existing client repo.
- When a prompt references multiple sources such as GitHub, Graphify, CRM, Drive, Notion, design artifacts, or handoff docs.
- When prior chat/handoff claims may be stale.

Problem it solves:

- Prevents agents from building from outdated design notes, stale branches, or assumed schemas.

Reusable:

- Confirmation order: branch, origin/main, worktree, graph/context map, docs, live operational systems, then source files.
- Contradiction register and status taxonomy.
- Rule that no architectural conclusion is made from handoff text without repo verification.

Client-specific:

- Source hierarchy names, branch names, schema IDs, business rules, client docs.

Dependencies:

- Git CLI, GitHub, Graphify when available, optional Airtable/Drive/Notion connectors.

Inputs:

- Repo path, canonical branch, source hierarchy, artifacts to reconcile, protected boundaries.

Outputs:

- Reconciliation report with EXISTS, EXTEND, PLACEHOLDER, NEW, HUMAN-APPROVAL-REQUIRED, FUTURE or equivalent client-approved statuses.

Likely failure modes:

- Treating stale Graphify as current truth.
- Merging stale branches wholesale.
- Resolving contradictions silently.
- Inventing missing schema or field IDs.

Test scenarios:

- Stale local branch with unique docs.
- Graph report built from old commit.
- Design contract conflicts with current main.
- Live CRM table exists under a different name.

Recommended location:

- `stb/skills/source-of-truth-reconciliation/`

### 2. `stb-doctrine-vocabulary-extraction`

Triggering conditions:

- When building a client whose language, teaching, expertise, or cultural context must stay founder-led.
- Before public copy, content repurposing, AI-generated summaries, or offer language.

Problem it solves:

- Stops generic brand language from overwriting the client's own terminology and source meaning.

Reusable:

- Source register, authority tiers, term-frequency review, prohibited phrase scan, review flags, provenance passport.
- "Do not silently promote historical language into current doctrine" pattern.

Client-specific:

- Actual doctrine, sacred language, founder terms, prohibited phrases, quotes, source excerpts, cultural/lineage interpretations.

Dependencies:

- Source docs/transcripts, social exports if approved, Drive references, optional Graphify.

Inputs:

- Source files, source confidence rules, confidentiality level, target output type.

Outputs:

- Vocabulary register, source register, doctrine extraction note, review flags, public-safe language guidance.

Likely failure modes:

- Treating scraped or third-party language as founder authority.
- Publishing credential or lineage claims without direct confirmation.
- Converting doctrine into generic marketing copy.

Test scenarios:

- Source frequency contradicts existing site vocabulary.
- Historical biography claim lacks current confirmation.
- A prohibited phrase appears in app copy.

Recommended location:

- `stb/skills/doctrine-vocabulary-extraction/`

### 3. `stb-founder-truth-verification`

Triggering conditions:

- Before publishing founder bio, credentials, claims, testimonials, teaching lineage, or "why this founder" positioning.

Problem it solves:

- Separates trustworthy founder presence from unsupported authority claims.

Reusable:

- Source confidence ledger, blocked-claim register, founder acceptance script, exact-claim approval gate.

Client-specific:

- Founder identity, credentials, training, story, personal imagery, testimonials.

Dependencies:

- Source register, founder review notes, public profiles, client approval.

Inputs:

- Proposed founder claims and source evidence.

Outputs:

- Approved, needs-source, blocked, or historical-only founder claim register.

Likely failure modes:

- Publishing credentials from chat summaries.
- Over-sanitizing a founder until the page feels generic.
- Inventing a one-line positioning answer before founder approval.

Test scenarios:

- Credential appears in copy without source.
- Founder quote is direct but transcript is machine-generated.
- Current profile conflicts with historical article.

Recommended location:

- `stb/skills/founder-truth-verification/`

### 4. `stb-stranger-clarity-review`

Triggering conditions:

- Before launch, after a major homepage/offering/navigation change, or after tester feedback says the site feels unclear.

Problem it solves:

- Tests whether someone who does not know the client can understand the core work quickly.

Reusable:

- Three-second clarity rubric.
- "What is this, who is it for, why this person, where do I begin, what can I receive" review.
- Distinction between objective failure and taste judgment.

Client-specific:

- Client's method, offers, audience, visual tone, founder explanation.

Dependencies:

- Browser preview, Playwright screenshots, optional tester guide.

Inputs:

- Routes to review, target audience assumption, launch-critical questions.

Outputs:

- YES/WATCH/NO rubric, P0-P3 findings, screenshots, recommended next action.

Likely failure modes:

- Passing because the builder already understands the site.
- Treating "lots of depth" as equivalent to clarity.
- Over-cutting copy instead of using progressive disclosure.

Test scenarios:

- First viewport lacks core proposition.
- Primary CTA is visible but the offer is not.
- Mobile hides founder/offer clarity below too much interface.

Recommended location:

- `stb/skills/stranger-clarity-review/`

### 5. `stb-offer-path-clarity-audit`

Triggering conditions:

- When a client site has many experiences but visitors cannot tell what can be bought, joined, requested, or started for free.

Problem it solves:

- Separates direct offer discovery from guided discernment and prevents hidden commerce paths.

Reusable:

- Offer-path map, route proof, "know what I want" vs "help me decide" pattern, checkout/payment deferral register.

Client-specific:

- Offer categories, pricing, payment rules, enrollment process, approval requirements.

Dependencies:

- Current app routes, offer docs, founder/team approval.

Inputs:

- List of approved offers, commerce state, no-invention boundaries.

Outputs:

- Offer clarity report, route or component recommendations, commerce contract gaps.

Likely failure modes:

- Inventing prices or checkout.
- Conflating interest with readiness.
- Making a generic ecommerce page that violates client tone.

Test scenarios:

- A visitor cannot find direct work within two clicks.
- Free entry point is hidden.
- Paid path implies instant access when human review is required.

Recommended location:

- `stb/skills/offer-path-clarity-audit/`

### 6. `stb-design-intention-playwright-qa`

Triggering conditions:

- After visual/UX sprints, before founder/client visual review, or when design intent must be evidenced in browser.

Problem it solves:

- Turns Playwright from route testing into design-intention evidence without pretending automation can approve taste.

Reusable:

- Screenshot capture across desktop/mobile.
- Rubric attachments with YES/WATCH/NO, DOM evidence, objective-vs-aesthetic classification.
- P0/P1 auto-fix boundary and P2/P3 human-review boundary.

Client-specific:

- Rubric wording, art direction, imagery rules, brand tone.

Dependencies:

- Playwright, local preview server, route map, acceptance rubric.

Inputs:

- Route list, viewport list, rubric items, prohibited public language.

Outputs:

- Screenshots, markdown rubric attachments, prioritized findings report.

Likely failure modes:

- Auto-fixing subjective WATCH items.
- Capturing transitional states instead of settled UI.
- Testing DOM presence but missing visual hierarchy failure.

Test scenarios:

- Mobile CTA clipped.
- Founder image present but below the meaningful threshold.
- Visual direction "passes" text checks but screenshots still look unchanged.

Recommended location:

- `stb/skills/design-intention-playwright-qa/`

### 7. `stb-client-acceptance-review`

Triggering conditions:

- After founder/client feedback, before merge, before launch, or after a Preview is sent for review.

Problem it solves:

- Converts subjective feedback into a clear review register without flattening the client's taste or truth.

Reusable:

- Feedback classifications: fix before launch, polish, future.
- Acceptance script, owner/dependency fields, and "do not auto-fix polish" rule.

Client-specific:

- Exact feedback, founder preferences, brand-specific acceptance language.

Dependencies:

- Preview URL, feedback notes, route/component map, current PR.

Inputs:

- Client feedback, screenshots, repo state.

Outputs:

- Acceptance review register, implementation status, tests, open decisions.

Likely failure modes:

- Treating all feedback as implementation orders.
- Ignoring contradictions with source truth.
- Making taste calls when the client asked for review evidence.

Test scenarios:

- Founder rejects a symbol or claim.
- Tester says site is beautiful but unclear.
- Client asks for something that conflicts with privacy or approval gates.

Recommended location:

- `stb/skills/client-acceptance-review/`

### 8. `stb-preview-production-governance`

Triggering conditions:

- Before or after any deployment involving credentials, CRM writes, payments, or production promotion.

Problem it solves:

- Prevents Preview proof from accidentally becoming Production activation.

Reusable:

- Verify source commit, branch, Vercel project, API inclusion, env scopes, static bundle secret scan, deployment target, rollback steps.

Client-specific:

- Project IDs, environment names, domains, branch policy, approved activation decision.

Dependencies:

- Vercel CLI or connector, GitHub, optional deployment protection/bypass flow.

Inputs:

- Required env states, project name, branch/commit, deployment target.

Outputs:

- Deployment boundary report with URL, deployment ID, source SHA, env-scope confirmation, release recommendation.

Likely failure modes:

- PAT/secret scoped to Production when only Preview is approved.
- Testing an uncommitted local build and calling it canonical.
- Redeploying or promoting Production without explicit approval.

Test scenarios:

- Preview env has write flag true; Production must remain false/missing.
- Deployment source SHA differs from PR head.
- Browser bundle contains a server-only variable name or secret-like value.

Recommended location:

- `stb/skills/preview-production-governance/`

### 9. `stb-secure-write-boundary`

Triggering conditions:

- When a browser experience needs to persist user/customer/client data into Airtable, CRM, database, or forms.

Problem it solves:

- Establishes safe server-side writes without exposing privileged credentials or allowing the client to grant itself state.

Reusable:

- Server-only credentials, feature flag default-off, schema validation, allowlisted fields, normalization, idempotency, rate limiting, safe logs, graceful fallback.

Client-specific:

- Tables, fields, scoring rules, user-facing states, consent language, data retention policy.

Dependencies:

- Serverless/API runtime, validation library or equivalent, destination adapter, tests.

Inputs:

- Data contract, destination schema, allowed writes, prohibited writes, consent requirements.

Outputs:

- Secure-write design, adapter contract, route tests, no-secret scan, failure-mode proof.

Likely failure modes:

- Browser receives privileged token.
- Client-submitted computed state is persisted as authoritative.
- Duplicate submissions create duplicate operational records.
- Failure UI claims success or human review when no write occurred.

Test scenarios:

- No consent creates zero writes.
- Consent without stable contact remains local-only.
- Mismatched client/server computed value persists server result.
- Duplicate idempotency key does not duplicate records.
- Destination failure preserves private continuation.

Recommended location:

- `stb/skills/secure-write-boundary/`

### 10. `stb-privacy-memory-boundary`

Triggering conditions:

- Before storing journey state, reflections, intake, behavioral data, or personalization memory.

Problem it solves:

- Defines minimum necessary memory so client systems remember responsibly instead of surveilling passively.

Reusable:

- Intentional-memory classification, consent gates, local-only fallback, sensitive retention expiry, delete/reset controls, no passive telemetry rule.

Client-specific:

- Specific sensitivity categories, retention duration, consent text, legal requirements.

Dependencies:

- Data contract, local storage/service layer, privacy review.

Inputs:

- Proposed data points, purpose, storage location, human access model.

Outputs:

- Privacy/memory boundary contract and test checklist.

Likely failure modes:

- Indefinite local PII retention.
- Treating private reflections as analyzable by default.
- Capturing behavioral exhaust because it is technically easy.

Test scenarios:

- Local fallback strips email/phone/free text.
- Pending sensitive data expires.
- Delete-local-journey clears stored continuity.
- No passive analytics events are emitted.

Recommended location:

- `stb/skills/privacy-memory-boundary/`

### 11. `stb-feedback-to-implementation-loop`

Triggering conditions:

- When tester, founder, or stakeholder feedback arrives after a preview.

Problem it solves:

- Turns feedback into bounded implementation without overcorrecting, redesigning, or ignoring launch-critical signals.

Reusable:

- Feedback classification, root distinction, implementation boundary, test updates, report back in "what changed" language.

Client-specific:

- Feedback content, client priorities, brand meaning, user segment.

Dependencies:

- Preview evidence, current branch, acceptance criteria.

Inputs:

- Feedback, route screenshots, current sprint boundary.

Outputs:

- Findings, proposed bounded sprint, code-change scope if approved, transparency report.

Likely failure modes:

- Treating one tester's taste as universal truth.
- Fixing wording volume by deleting necessary clarity.
- Adding features instead of clarifying core proposition.

Test scenarios:

- Tester says "too much wording" and "unclear offering."
- Founder says a symbol is wrong.
- Reviewer praises interaction but cannot understand business value.

Recommended location:

- `stb/skills/feedback-implementation-loop/`

### 12. `stb-launch-evidence-reporting`

Triggering conditions:

- At release candidate, preview proof, launch readiness, or post-sprint handoff.

Problem it solves:

- Creates a repeatable evidence artifact so a client build can be reviewed, reproduced, rolled back, and handed off.

Reusable:

- Report sections: SHA, branch, included/excluded changes, environment boundary, tests, screenshots, data proof, security scan, known limitations, rollback, release recommendation.

Client-specific:

- Exact evidence files, URLs, record IDs, launch decision language.

Dependencies:

- Git, test scripts, Playwright, deployment metadata, optional CRM checks.

Inputs:

- Commit, PR, deployment URL, verification command results, screenshots, operational records.

Outputs:

- Release or sprint report ready for human review.

Likely failure modes:

- Reporting "passed" without record IDs or screenshots.
- Hiding blocked operational tasks.
- Confusing architecture approval with production activation.

Test scenarios:

- Preview proof passes but code is uncommitted.
- Production write flag remains disabled.
- Manual review queue is not created yet.

Recommended location:

- `stb/skills/launch-evidence-reporting/`

## Automated Test And Script Candidates

Prioritize deterministic checks over prose where possible.

| Candidate | Best asset type | Test/script behavior |
|---|---|---|
| Public forbidden language scan | SCRIPT/CLI, AUTOMATED TEST | Scan public app text/build output for internal terms, unsupported phrases, or client-prohibited language. |
| Browser secret scan | SCRIPT/CLI, AUTOMATED TEST | Scan `dist` and client chunks for PAT patterns, server-only env names, and forbidden browser env names. |
| Route and CTA clarity | AUTOMATED TEST | Verify public routes render and required primary/secondary CTAs are visible on desktop/mobile. |
| Offer-path proof | AUTOMATED TEST | Confirm direct offer route, free entry, guided path, and no fake pricing/checkout claims. |
| Founder trust proof | AUTOMATED TEST | Confirm founder route/section exposes name, approved image alt, approved safe bio, and no blocked credentials. |
| Design evidence capture | SCRIPT/CLI | Capture screenshot set and attach rubric markdown for each route/viewport. |
| Secure-write boundary check | SCRIPT/CLI, AUTOMATED TEST | Exercise no-consent, no-contact, disabled writes, failure fallback, server-derived computed state, idempotency, and prohibited writes. |
| Deployment source check | SCRIPT/CLI | Compare local HEAD, PR head, deployment source SHA, and target environment. |
| Vercel env-scope check | SCRIPT/CLI, PLUGIN/CONNECTOR WORKFLOW | Verify secrets are scoped only to approved environments without printing values. |
| CRM/Airtable schema audit | SCRIPT/CLI, PLUGIN/CONNECTOR WORKFLOW | Read live tables/fields/views, classify exists/create/extend/defer/conflict, and record IDs. |

## Agent Candidates

| Agent | Purpose | Boundaries |
|---|---|---|
| Client Reconciliation Agent | Reads source hierarchy and reconciles repo, graph, design, CRM, docs, and handoffs before implementation. | May not resolve contradictions silently. |
| Acceptance Review Agent | Converts founder/tester feedback into prioritized review registers and testable acceptance criteria. | May not implement P2/P3 without approval. |
| Deployment Governance Agent | Verifies Preview/Production separation, source SHA, env scopes, route/API proof, and release status. | May not promote Production without explicit approval. |
| Doctrine Archivist Agent | Builds source registers, doctrine extraction notes, vocabulary scans, and review flags. | May not approve doctrine, lineage, credentials, or publication. |

## Plugin And Connector Workflow Candidates

| Workflow | Connectors | Reusable value | Boundary |
|---|---|---|---|
| GitHub canonicalization | GitHub, local Git | Confirms main/default branch, PR state, unique branch work, and release branch cleanliness. | Do not force-push or merge stale branches wholesale. |
| Vercel Preview proof | Vercel | Deploys or verifies Preview, inspects source SHA, route/API status, and env scopes. | Do not deploy Production or expose secrets. Upgrade Vercel CLI when outdated. |
| Airtable live schema reconciliation | Airtable | Reads real tables/fields/views and prevents duplicate structures. | Do not mutate live schema during audit unless approved. |
| Google Drive source vault | Google Drive | Confirms source assets and media provenance. | Do not expose private browsing, raw credentials, or unapproved private assets. |
| Notion SOP handoff | Notion | Stores human operating docs, decisions, and review playbooks. | Not an operational system of record unless explicitly chosen. |
| Graphify context refresh | Graphify | Maintains relationship map and cross-file context. | Context only, not runtime dependency; bounded attempts if refresh hangs. |

## STB Product Module Candidates

### Living Front Door

Reusable product pattern:

- Public front door separates direct offer selection from guided discernment.
- The page answers: what is the work, why this founder/team, what can I receive, where do I begin.
- Depth is progressive rather than dumped at the threshold.

Do not generalize:

- Client-specific visual system, symbols, founder story, method language, and offers.

### Client Intelligence Readiness Map

Reusable product pattern:

- Experience nodes map to operational data, source of truth, read/write direction, access requirements, human approval gates, fallback behavior, and risks.

Do not generalize:

- Actual client schemas, field IDs, private operational queues, protected access logic.

### Human-In-The-Loop Commerce

Reusable product pattern:

- Commerce is not just checkout. Separate interest, request, readiness, human review, payment state, access grant, and fulfillment.

Do not generalize:

- Prices, eligibility, approval rules, spiritual/professional authority, legal claims.

### Intake Secure Write

Reusable product pattern:

- Browser collects only approved inputs.
- Server validates, normalizes, derives authoritative state, writes to operational system, and falls back safely.

Do not generalize:

- Domain-specific scoring, client data retention, sensitive content categories, access states.

### Launch Evidence Dashboard

Reusable product pattern:

- A release candidate is represented by evidence: commit SHA, Preview URL, screenshots, tests, data proof, security proof, open decisions, release recommendation.

Do not generalize:

- Client URLs, screenshots, records, review decisions.

## Do Not Generalize

Do not extract these into generic STB assets:

- Sheetal's doctrine, teaching language, sacred terms, practice names, lineage language, symbols, or modality claims.
- Sheetal's biography, credentials, founder story, quotes, or testimonials.
- Shakti/Shala room names, sanctuary copy, visual palette, photography, or brand world.
- Airtable table IDs, field IDs, record IDs, base IDs, or live schemas as reusable defaults.
- Client-specific access labels or approval language unless re-approved for another client.
- Any private reflection, seeker data, test record content, or operational queue data.
- Any fake sacred geometry, invented credentials, invented prices, invented testimonials, or unsupported source claims.

## Recommended Extraction Order

1. Create `stb/templates/launch-evidence-report.md` and `stb/templates/client-handoff-report.md`.
2. Create `stb/skills/source-of-truth-reconciliation/`.
3. Create `stb/skills/design-intention-playwright-qa/` plus `stb/scripts/collect-playwright-evidence.ts`.
4. Create `stb/skills/stranger-clarity-review/` and `stb/skills/offer-path-clarity-audit/`.
5. Create `stb/skills/preview-production-governance/` and browser secret/env-scope scripts.
6. Create `stb/skills/secure-write-boundary/` and `stb/skills/privacy-memory-boundary/`.
7. Create doctrine/founder verification templates only after scrubbing all Shakti-specific terms from examples.
8. Package `living-front-door`, `intake-secure-write`, and `human-in-loop-commerce` as STB product modules after at least one non-Shakti client validates the abstractions.

## Human Review Questions

1. Should STB skills live inside this repo first as `docs/stb/` drafts, or in a separate STB/MAIM reusable-method repository?
2. Which assets should become installable Codex skills first: reconciliation, Playwright QA, secure-write boundary, or launch evidence reporting?
3. Should STB define a generic CRM schema vocabulary, or only a schema-reconciliation process per client?
4. What is the minimum evidence package required before a client preview is considered ready for founder review?
5. Who owns the reusable STB product module library, and who approves when a Client Zero pattern is abstract enough to reuse?

## Audit Recommendation

Extract the operating methods first, not the product modules.

The strongest immediate reusable assets are:

```text
1. source-of-truth reconciliation
2. design-intention Playwright QA
3. stranger clarity + offer-path clarity
4. secure-write boundary
5. preview-vs-production governance
6. launch evidence reporting
```

These can improve the next client build without carrying Shakti-specific content into STB.

The product modules should remain provisional until another client proves the patterns outside Client Zero.
