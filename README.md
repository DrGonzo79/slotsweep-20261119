# SlotSweep

Interactive, fictional prototype for a traffic-ranked podcast archive leak report. It finds stale sponsor-language candidates, shows evidence, estimates slot value, and requires explicit human approval. It does **not** upload audio, modify feeds, or deploy the Python backend.

## Run

Requires Node 26.13.1 and Python 3.12+.

```bash
npm ci
npm run dev
uv sync --directory api --frozen
uv run --directory api pytest
uv run --directory api uvicorn main:app --reload
```

## Verify

```bash
npm run typecheck
npm run test:e2e
npm run build
npm audit --audit-level=high
uv run --directory api pip-audit
```

GitHub Pages serves the static frontend under the repository base path. The FastAPI backend remains tested source for local execution and CI only.
