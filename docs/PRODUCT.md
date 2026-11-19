# Product plan

## ICP and job

An independent evergreen podcast owner or production agency managing 100+ episodes, meaningful recent archive downloads, removable baked-in reads, a DAI-capable host, and active sponsor access. When old episodes still carry expired offers, they need to locate and approve the highest-value swaps without replaying the whole catalog, so they can protect sponsor trust and reopen inventory.

## MVP

The shipped slice uses shared fictional fixtures to: select archive episodes, vary assumed CPM, deterministically detect stale-ad phrases, rank candidates by recent traffic, inspect the evidence, and approve/undo a slot. The FastAPI service performs the same bounded analysis with validation. It does not fetch RSS, transcribe audio, change a feed, or claim AI certainty.

## Data model

- `Episode`: id, title, published date, duration, 90-day downloads, transcript.
- `Finding`: episode, evidence markers, heuristic confidence, estimated monthly slot value, review status.
- Production additions: `Show`, `FeedSnapshot`, `AudioAsset`, timestamped `Segment`, `Approval`, `HostExecution`, and immutable `QaCheck`.

## Architecture and model strategy

Static Next.js App Router UI runs the deterministic TypeScript analyzer for the public demo; FastAPI exposes the equivalent domain operation for local/CI use. Production should ingest public RSS asynchronously, store immutable source hashes, run speech-to-text, use rules first and a model only for segment classification, then require human timestamps and approvals before a host adapter acts. Never let a model directly mutate audio or feeds.

```text
Public RSS → immutable episode snapshot → transcript → candidate detector
                                                     ↓
Owner/producer ← evidence + traffic-ranked queue ← valuation
      ↓ explicit approval
host-native edit → published-feed QA → audit receipt
```

## Economics and validation

The report's ladder is $0 scan → $400/10-episode pilot → $600/month/20 episodes → $1,500 migration cleanup. At $24 CPM, a show needs substantial replay volume or repeated fill to justify the fee; the demo exposes this arithmetic rather than hiding it. Validate 20 qualified conversations, 5 feed shares, 3 observed report sessions, and 2 paid-pilot commitments before building ingestion. Track feed-share rate, report-open-to-evidence rate, explicit pilot acceptance, estimated value/fee ratio, false-positive rate, and minutes of human QA per episode.

## Moat and GTM

The scan is not a moat. The compounding assets are cross-host execution playbooks, timestamp correction data, QA reliability, approval/audit history, agency distribution, and outcome benchmarks. Initial GTM is personalized Podnews migration outreach and agency resale—not SEO or paid search. Every message leads with a show-specific leak report.

## Roadmap

- **0–30 days:** concierge reports, observation, paid pilot test, one host workflow.
- **31–60 days:** public RSS ingestion, timestamp review, approval receipts, measured QA.
- **61–90 days:** second host adapter, agency workspace, migration cleanup playbook; stop if pilots do not attach to retainers.
