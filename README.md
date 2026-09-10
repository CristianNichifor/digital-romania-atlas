# Digital Romania Atlas

Interactive demo that maps the Romanian digital identity ecosystem and compares it with a
proposed "digital backbone" design: institutions plotted on a Romania map, force-directed
data-flow graphs between all parties, a side-by-side feature comparison, and a timeline.

**Live intent:** make the national EUDI Wallet plans (and the gaps) legible to developers,
journalists, and decision makers.

## What it shows

| View | Content |
|---|---|
| **Harta României** | County map with institutions as colored points (category-filterable). Small dots in every county = town halls (UAT) as assisted-enrollment / offline fallback points in the proposal. |
| **Fluxuri de date** | Two toggleable force-directed graphs. *"Propunerea actuală"* reproduces only what the published MAI GitHub documentation describes (PID issuance, presentation, wallet backend, MDVM, RWSCA, push, status lists). *"Propunerea noastră"* adds the data backbone, payments, digital postbox, diaspora, and independent oversight. Filter by flow type. |
| **Comparație** | 12-dimension table: published documentation vs. our proposal, with status (aligned / extended / added). |
| **Calendar** | EU obligations, the national plan, and our proposed additions side by side. |

## Data sources

The "current" model is grounded in public sources:

- [Ministerul-Afacerilor-Interne/rowallet-documentation](https://github.com/Ministerul-Afacerilor-Interne/rowallet-documentation)
  (CC-BY-4.0) — roles (PID Provider = DGEP, Wallet Provider = DGCTI), components (WB, MDVM,
  RWSCA/RWSCD, MQ, PNS), EUDI Reference Implementation, OpenID4VC/SD-JWT/ISO mdoc.
- MAI presentation *„Portofelul European de Identitate Digitală — Rolul MAI în ecosistemul
  național"* (July 2026): RO EUDIW Commission, STS registry (WRPRC/WRPAC), PuB-EAA portfolio,
  Phase 1 (Dec 2026, PID + age) / Phase 2 (2027), mandatory RP acceptance (Dec 2027).

The "proposed" model encodes the design discussed in this project: X-Road-style national data
backbone, SEPA Instant + Request-to-Pay in the wallet, digital postbox, geo-redundant
active-active infrastructure, pairwise pseudonyms, open-source mandate (EUPL), and independent
oversight (DNSC, ANSPDCP).

## Run it

```bash
npm install
npm run dev
```

Build: `npm run build` (type-checks and produces `dist/`). Fully client-side; the only fetched
asset is the bundled county GeoJSON in `public/data/`.

## Where the data lives

Everything is plain typed data — edit without touching components:

- `src/data/institutions.ts` — nodes: name, role, category, county, coordinates, scope
  (`current` | `proposed` | `both`)
- `src/data/flows.ts` — directed edges with kind (identity, presentation, payment, backbone…),
  label, protocol, status
- `src/data/comparison.ts` — the comparison table
- `src/data/timeline.ts` — the calendar
- `public/data/ro-counties.geojson` — Romania counties (42 features, incl. București)

County GeoJSON source: [GabrielRondelli/geojson](https://github.com/GabrielRondelli/geojson)
(GADM-derived, `romania-counties.geojson`).

## Known limitations

- Coordinates for national institutions are approximate (Bucharest area) and manually spread
  for readability.
- The MAI documentation marks several chapters (cryptography, wallet backend details, PID
  issuance/presentation flows) as *"Planned update"* — where it is silent, the comparison marks
  our side as "added", and the absence itself is the finding.
- Not affiliated with MAI or any institution; proposal content is design opinion, not policy.

## License

MIT (code and data authored here). The bundled county GeoJSON retains its upstream provenance.
