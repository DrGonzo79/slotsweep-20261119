# CEO review

**Mode: scope reduction.** The plan spans transcript analysis, audio operations, host integrations, and a service business; the only justified build is the smallest trust-producing evidence packet.

## Nuclear challenge and alternatives

The premise is not “podcasters need AI.” The business outcome is safely reopened inventory. Doing nothing is rational for low-traffic archives. Current host tools already solve mutation; rebuild none of them. The 12-month ideal is a trusted cross-host operations layer, but today's plan must produce paid evidence first.

- **Minimal viable:** concierge traffic-ranked report; S effort/low risk; reuses public RSS and native host tools. **Chosen.**
- **Self-serve scanner:** M/medium; scalable acquisition but weak trust and easy host-feature displacement.
- **Ideal cross-host control plane:** XL/high; strong audit/QA trajectory but credential, integration, and destructive-edit risk.

`CURRENT: manual neglect → THIS BUILD: transparent candidate/approval queue → IDEAL: audited cross-host execution + QA`

## 1. Architecture

Keep detection pure and deterministic, UI static, API separately runnable. The production state machine must be `discovered → reviewed → approved → executed → QA passed|failed → rolled back`; no direct detector-to-host path.

## 2. Error and rescue map

Empty selection and invalid CPM are named UI errors. Pydantic returns 422 for invalid/oversized API input; clean transcripts return an empty success. Deferred errors are explicit: `FeedFetchTimeout`, `PrivateAddressRejected`, `TranscriptionFailed`, `HostAuthExpired`, `PublishMismatch`, and `RollbackFailed`, each requiring a visible operator state and retry/runbook before production.

## 3. Security and threat model

Public demo has no secrets, fetches, or uploads. Production threats are RSS SSRF, malicious media, prompt/transcript injection, tenant leakage, stolen host tokens, and unauthorized destructive edits. Require egress allow/deny policy, media sandboxing, tenant isolation, encrypted scoped tokens, approval RBAC, immutable audit logs, and two-person approval for bulk operations.

## 4. Data and interaction edge cases

Nil/empty input is rejected; clean input is a valid empty state; huge fields are bounded; duplicate markers are deduplicated. Double scan is disabled during loading. Approval is reversible in-demo. Production must also handle stale traffic data, duplicate RSS GUIDs, encoding, partial transcript, owner navigation mid-job, concurrent approval, and host API timeout.

## 5. Code quality

Pure analysis functions and explicit types keep the slice small. Mirrored TypeScript/Python logic can drift; production needs shared contract fixtures and parity tests before either becomes authoritative.

## 6. Tests

Playwright covers scan, ranking, evidence modal, validation, approval, and mobile overflow. Python covers health, detection/value, clean empty state, and invalid input. Missing by design: real RSS/audio/host tests; they are prohibited until a validated pilot requires them.

## 7. Observability

Production needs import success/latency, transcription cost and failure, candidates/hour, correction rate, approval rate, host mutation success, publish-QA mismatch, rollback success, and revenue-recovered-to-service-fee. Alerts must fire on any approved job lacking QA completion.

## 8. Database and state

No database in the demo. Production requires immutable source hashes and approvals, unique `(show, episode_guid, feed_version)` constraints, tenant-scoped indexes, and append-only execution/QA events. Avoid mutable “current status” as the only audit evidence.

## 9. API contract

The bounded `/analyze` contract is version-zero and local only. Before exposure: auth, tenancy, rate limits, idempotency keys, stable error codes, pagination/jobs for large archives, and schema versioning.

## 10. Performance and scale

The demo is O(episodes × patterns) and capped at 500 episodes. At 10×, audio download/transcription dominate; queue with per-show concurrency. At 100×, content-addressed caching, backpressure, spend ceilings, and host-specific rate-limit budgets are mandatory.

## 11. Design and UX

Hierarchy leads with archive selection, then value-ranked evidence, then approval. Loading, error, empty, responsive, keyboard focus, and fictional-data labels exist. Confidence must never look like verified accuracy; revenue estimates always show CPM assumptions.

## Decision

Accepted: deterministic report, evidence inspection, value ordering, reversible approval, tested API. Deferred: RSS ingestion, speech models, host credentials, audio mutation, billing, multi-tenancy. **Not in scope:** autonomous edits or claims of recovered revenue. Strongest risks are lack of payment proof, host feature displacement, and false confidence. Ship the prototype only as a paid-pilot conversation tool.
