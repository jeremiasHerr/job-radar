# job-radar

A job posting scraper and analyzer for the Argentine and LATAM tech market.

Collects listings from job boards, stores them in PostgreSQL, and tracks how
technology demand evolves over time. Built to answer questions the existing
boards don't: which stacks actually appear in junior postings, how remote work
requirements differ from on-site ones, and how demand shifts month over month.

Currently ingests from [GetOnBrd](https://www.getonbrd.com/).

## Setup

```bash
python -m venv .venv
source .venv/Scripts/activate    # Linux/macOS: .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env             # add your PostgreSQL connection string
```

Create the schema:

```bash
psql $DATABASE_URL -f schema.sql
```

Run:

```bash
python main.py
```

The script is idempotent, running it repeatedly only adds postings that
weren't seen before.

## Data model

Some design decisions:

- **`raw` (JSONB) stores the complete original payload.** Any field not yet
  promoted to a column can still be queried and backfilled later without
  re-fetching from the API.
- **`captured_at` records when the posting was first seen**, which is what makes
  time-series analysis possible even though the API only exposes current listings.

## Normalization

Each source uses its own vocabulary, so values are mapped to a canonical one at
ingestion. Both the raw and normalized values are stored, so mappings can be
revised and reapplied retroactively.

### Seniority

`no_experience` · `junior` · `semi_senior` · `senior` · `expert` · `unknown`

### Remote modality

| Value | Meaning |
|---|---|
| `onsite` | No remote work |
| `hybrid` | Partially remote |
| `remote` | Fully remote, no geographic restriction |
| `remote_local` | Remote, but restricted to the company's country |
| `remote_unspecified` | Remote, source doesn't specify restrictions |
| `unknown` | Could not be mapped |

`remote_unspecified` exists for future sources that don't make the
`remote` / `remote_local` distinction.

## Source limitations

Documented quirks found in the GetOnBrd API:

- **`countries` mixes modality with geography.** Some postings list `"Remote"`
  as the country, so the actual location is lost.
- **`expand` returns HTTP 500** on `/search/jobs`, so related entities can't be
  fetched inline.
- **Tag IDs don't resolve.** Postings reference tags by numeric ID, but `/tags`
  returns slug-based IDs. Raw IDs are stored for later mapping.
- **No currency field.** Salary ranges have no declared currency; USD is
  inferred from the value ranges.
- **`lang` is unreliable.** Postings written entirely in Spanish are frequently
  marked as `"en"`.

## Roadmap

- [ ] Query multiple search terms and paginate beyond the first page
- [ ] Resolve company names via `/companies/{id}` with a local cache
- [ ] Extract technologies from posting text (`description`, `functions`, `desirable`)
- [ ] Normalize technology names and synonyms into a dedicated table
- [ ] Analytics queries: demand by stack, seniority, and modality over time
- [ ] Track posting lifespan via `ON CONFLICT DO UPDATE` on `updated_at`
- [ ] Add Argentine job boards as additional sources

## Stack

Python · PostgreSQL (Neon) · psycopg · requests · BeautifulSoup