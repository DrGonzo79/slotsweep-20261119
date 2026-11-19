# Architecture

The frontend is a base-path-aware Next.js static export. It imports the same fictional JSON fixture as the local FastAPI service. `lib/analyze.ts` provides browser-safe deterministic scoring; `api/main.py` is the runnable backend contract. GitHub Pages hosts only the frontend.

API contract: `POST /analyze` accepts 1–500 episodes and CPM $1–$200, returning traffic-sorted findings. Invalid, empty, oversized, or out-of-range input returns FastAPI/Pydantic 422. A transcript with no markers returns an empty finding list, not an error. Production concerns deliberately deferred: authentication, persistence, job orchestration, RSS network failures, transcription timeouts, host tokens, idempotent edits, rollback, and observability.

Security: no secrets or uploads; bounded input fields; pinned Node/Next/Python dependencies; patched `source-map-js` and PostCSS overrides; certifi floor and lock; refreshed system CA stores in both Docker stages. A future transcript endpoint must reject private-feed SSRF targets, cap download size/duration, isolate media processing, encrypt host credentials, and audit every approval and mutation.
