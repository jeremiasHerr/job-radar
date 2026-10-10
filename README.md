# job-radar

**What does the LATAM tech job market actually ask for?**
job-radar collects job postings every day, extracts the technologies each one mentions, and
turns them into numbers you can check, instead of opinions on what to learn.

The frontend is published as **Pomelo Lab**.

## What it shows

From 942 tech postings captured from [GetOnBrd](https://www.getonbrd.com/) (Sept–Oct 2026):

- **5.7%** are aimed at junior profiles. **91.7%** ask for semi-senior or senior.
- **19.6%** are fully remote with no country restriction.
- Only **8 postings** are both junior and globally remote.
- Some skills scale with seniority, others don't. **AWS** goes from 17% of junior postings to
  32% of senior ones, and **CI/CD** from 15% to 36%. **Python** and **SQL** stay roughly flat
  across every level.

## How it works

```
GetOnBrd API ──► main.py ──► Postgres (Neon) ──► extract.py ──► export.py ──► static JSON ──► React
   (daily)       ingest       raw + normalized    tech matching    SQL → JSON                  frontend
```

A GitHub Action runs the whole pipeline every day and commits the updated data.

## Decisions

**Store raw, process later.** Every posting is saved with its full original payload (JSONB)
next to the normalized columns. If a mapping turns out to be wrong, it can be fixed and
reapplied without re-fetching anything. Postings are never deleted. Derived tables are
rebuilt from them.

**Normalize at the edge.** Each source has its own vocabulary for seniority and remote work.
It's translated into a canonical one at ingestion, so analysis code doesn't need to know
where a posting came from.

**Dictionary-based extraction, not an LLM (yet).** 270+ terms matched with word boundaries,
longest first, so `react native` isn't also counted as `react` and `go` isn't found inside
`google`. Covers 97% of postings. The trade-off is that it can't read context: "no Java
required" still counts as Java.

**Numbers are computed in SQL, once.** The frontend receives precomputed sections instead of
recalculating them in TypeScript.

**Static JSON, no backend.** No server to maintain, no database exposed to the internet, no
hosting cost. At this data size, filtering in the browser is instant.

**Small samples are labeled, not hidden.** Any slice under 30 postings is marked as such in
the UI. A ranking over 6 postings doesn't mean much, and the page says so.

**Daily capture is a requirement, not a convenience.** A posting published and closed between
two captures is lost for good. The time series is only as complete as the capture cadence.

## Limitations

- One source, mostly Chilean and product-company postings. No oil & gas, large consultancies,
  public sector or university job boards.
- Postings from before the first capture (Sept 6, 2026) are biased: they're the ones still
  open that day, which skews toward hard-to-fill roles.
- No capture between Sept 28 and Oct 9, 2026.

## Stack

Python · PostgreSQL (Neon) · psycopg · BeautifulSoup · GitHub Actions ·
React · TypeScript · Vite · Tailwind · Recharts

## Run it locally

```bash
python -m venv .venv && source .venv/bin/activate   # Windows: .venv/Scripts/activate
pip install -r requirements.txt
cp .env.example .env                                 # add DATABASE_URL
psql $DATABASE_URL -f schema.sql
bash data_setup.sh                                   # seed → capture → extract → export
cd frontend && npm install && npm run dev
```