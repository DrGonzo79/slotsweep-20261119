# Phased build prompts

1. **Validated ingestion:** Add a queued RSS importer for one host. Snapshot feed/episode hashes, reject SSRF/private addresses, cap files, expose progress/failure states, and test duplicate imports plus upstream timeout.
2. **Timestamp review:** Add speech-to-text behind an interface, deterministic fixture mode, time-coded candidate boundaries, waveform review, correction capture, cost/latency metrics, and an explicit no-auto-edit rule.
3. **Approval and QA:** Add authenticated owner roles, immutable approvals, idempotent host execution, before/after audio checks, feed polling, rollback/runbook, and alerts for publish mismatch.
4. **Agency operations:** Add multi-show tenancy, reseller branding, work queues, SLA metrics, billing only after evidence of repeat paid demand, and per-host reliability dashboards.
