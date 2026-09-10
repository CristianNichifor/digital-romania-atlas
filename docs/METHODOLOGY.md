# Methodology

How the atlas is built, where the numbers come from, and what they do and do
not claim. If you are citing this project in a public debate, read this first —
it is the counterpart to the [ERRATA.md](../ERRATA.md) policy.

## Two kinds of content, kept apart

- **“Current”** — factual claims about the RO EUDI Wallet architecture. Every
  claim traces to a public source: the MAI GitHub documentation
  (`Ministerul-Afacerilor-Interne/rowallet-documentation`, pinned to a specific
  commit) or the MAI presentation of July 2026. Where a source is pinned, the
  cited version is recorded in `src/data/sources.ts` so the claim can be
  re-checked later even if the source moves on.
- **“Proposed”** — the digital backbone design. These are design arguments by
  the author, not official documents. They carry no factual weight; they are
  stated to be contestable.

The UI keeps the two visually separate (green marking for proposals), and the
footer disclaimer repeats the distinction.

## Cost figures

All monetary figures (e.g. backbone capex 80–150M €, annual opex 25–45M €/an)
are **design estimates, not budgets**. Method:

- **Bands, not points.** Each estimate is a low–high range reflecting the
  uncertainty, not a prediction.
- **Anchored precedents.** Ranges are scaled from comparable public European
  programmes (French Gendarmerie open-source migration, Schleswig-Holstein,
  EU-wide EUDI estimates ≈ €4.5B capex) where a precedent exists; the note
  column names it.
- **Check rows.** Where an assumption could be wrong (greenfield DCs vs. reusing
  STS infrastructure, owned vs. colocated), the table carries an explicit
  “check” row with the alternative number.
- **UAT-derived figures** are computed live from the administrative-reform
  simulator rather than asserted by hand — see below.

The goal is **verifiability, not precision**: every row has a note so it can be
contested line by line. Corrections follow the [ERRATA.md](../ERRATA.md) policy.

## The administrative-reform bridge (UAT figures)

Figures that scale with the number of local units (L0 rollout, mini-servers,
UPS, HR rows) have three modes, chosen in this order:

1. **Locked scenario** — a URL like `?scenario=249` pins the unit count.
   Everyone opening that link sees identical figures; it never changes and is
   the citable form.
2. **Live bridge** — if the
   [administrative-reform map](https://cristiannichifor.github.io/romania-reforms/administrativ/)
   is open in another tab of the same browser, the atlas recomputes from the
   scenario that tab publishes (same-origin `localStorage`). Two readers with
   different maps open will see different numbers — the page says so.
3. **Snapshot fallback** — a locked default scenario bundled in
   `src/data/uatPlanSnapshot.ts`.

For a debate, share a `?scenario=` link (mode 1), never a screenshot without
its URL.

## Graph and map derivation

- The data-flow graphs are rendered from `src/data/flows.ts` (typed edges).
  Node positions are force-directed (non-deterministic layout); the _data_ is
  what carries meaning.
- Institution coordinates for national bodies are approximate (Bucharest area)
  and manually spread for readability — see “Known limitations” in the README.

## Versioning and dating

- The footer shows the site version and the **data as of** date
  (`src/data/meta.ts`). Cite both.
- `CHANGELOG.md` records content-affecting changes; `ERRATA.md` records
  corrections.
- Release tags are archived via Software Heritage (any public GitHub repo is
  crawlable at archive.softwareheritage.org) — use the version string as the
  retrieval key.
