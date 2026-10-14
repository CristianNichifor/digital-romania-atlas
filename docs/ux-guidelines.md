# UX guidelines

Short and enforceable: the rules every view of the Digital Romania Atlas
follows. This file refines the fleet guideline (civic-ui
`docs/ux-guidelines.md`) for this repo; where they differ, this repo's
deviation is listed in [§9](#9-known-deviations-backlog). Content rules for
data live in [src/AGENTS.md](../src/AGENTS.md) and
[METHODOLOGY.md](METHODOLOGY.md); this file does not repeat them.

## 1. Users and top tasks

| User                        | Top task                                                     |
| --------------------------- | ------------------------------------------------------------ |
| Policy staff, MPs' advisers | See how the proposal differs from today, with sources        |
| Journalists, researchers    | Cite one fact or one proposal and link to it (`#/<view>`)    |
| Engineers in public IT      | Read the data flows and the resilience design                |
| Citizens                    | Understand what changes for them (stories, citizen journeys) |

**One job of the first screen (`#/summary`):** say, in one sentence, that
this is a _proposal_ ("Propunem: …") and contrast it with the current
ecosystem, then lead into the grouped views. Facts and proposals must never
look alike (src/AGENTS.md).

## 2. Page anatomy

Every view, top to bottom:

1. Family bar (civic-ui `FamilyBar`) linking back to the hub — **missing,
   see D-1**.
2. Header: `h1` "Digital Romania Atlas" + `app.tagline` one-line purpose,
   language toggle, grouped navigation (Înțelege · Explorează · Argument ·
   Surse, ATL-17).
3. Provenance line "Date: sursă, an" for the view — today only in the
   footer (`footer.dataAsOf`), **see D-2**.
4. Primary task of the view (map, flow graph, comparison table …).
5. Secondary views and filters (chips, modes with `aria-pressed`).
6. Footer: disclaimer, author, data date + version (`META.dataAsOf`,
   `META.version`), ERRATA link, correction report, privacy notice.

Routes are hash routes (`#/summary`, `#/map`, …); a new view gets a hash
route and a place in one nav group.

## 3. Content rules

- Romanian first; every UI string exists in `src/locales/ro.ts` and
  `src/locales/en.ts` (ATL-9). No hard-coded strings in components.
- Diacritics: comma-below `ș ț Ș Ț`, never cedilla `ş ţ`; county names
  exactly as in `public/data/ro-counties.geojson` (ATL-14).
- Numbers: `toLocaleString("ro-RO")` / `"en-US"` (as in
  `src/lib/uatPlan.tsx`). Romanian: `1.234,5`; English: `1,234.5`.
- Dates: ISO `YYYY-MM-DD` in data and META; in prose `14 octombrie 2026` /
  `14 October 2026`.
- Currency: `lei` / `RON` after the number (`12,5 mil. lei`), `€` for EU
  comparisons; abbreviations `mil.` / `mld.` (ro), `m` / `bn` (en).
- Tone: plain, second person for citizens, no marketing. Proposals say
  "propunem", facts cite a source.
- Banned in the UI: internal IDs (`ATL-*`, `DC-A` without its city),
  untranslated English in `ro:` strings (validator rejects "verify, don't
  trust"), "TBD", "lorem", component or file names.
- Acronyms get a tooltip on first use (`src/lib/acroTip.ts`).

## 4. Data-viz rules

- Colours: the atlas palette in `src/styles.css`; move to the civic-ui
  colour-blind-safe viz palette when civic-ui is adopted (D-3). Never encode
  meaning by colour alone: map categories also differ by symbol and chip
  label (ATL-16); current vs proposed by line style (dashed = proposed).
- Labels on the marks (county names, node names), legends as text chips,
  no dual axes.
- Every chart or map has a text alternative: a caption saying what is shown
  and a table or list view (map → institution list; flows → flow list,
  D-4).
- As-of date and source on every chart/map (attribution under the map,
  ATL-1); per-row sources in Comparație (D-5).
- Badges: "Propunere" vs "Situația actuală" on anything that could be
  mistaken for fact.

## 5. States

| State           | Rule                                      | Where today                                        |
| --------------- | ----------------------------------------- | -------------------------------------------------- |
| Loading         | Text + spinner; staged message if > 2 s   | `MapView` "Se încarcă harta…"                      |
| Error           | `role="alert"`, plain cause, retry button | `MapView` (ATL-13)                                 |
| Empty           | Say why and how to reset filters          | filters in Map/Flows (D-6)                         |
| Blocked storage | Works with defaults                       | ATL-2                                              |
| Demo data       | Badge "Date demonstrative"                | not used: all data is sourced or labelled proposal |

## 6. Mobile, accessibility, motion

- 390 px: no horizontal page scroll; header wraps, logo stays square
  (ATL-19); tables scroll inside their container; chips wrap, label on one
  line (ATL-16).
- Touch targets ≥ 24 × 24 px, 44 px preferred for nav and chips.
- WCAG 2.1 AA: axe 0 violations on all 11 views in both languages.
- Keyboard: all controls reachable, visible focus ring; `aria-current` on
  the active view; `aria-pressed` on toggles.
- Reduced motion: honour `prefers-reduced-motion` (D-7). Forced colours:
  borders and focus stay visible (D-8).
- No third-party requests; Inter is self-hosted (ATL-10).

## 7. Status vocabulary

Use exactly one, in both languages, from civic-ui's list: **Live data /
Date reale**, **Demo data / Date demonstrative**, **Prototype / Prototip**,
**Archived / Arhivat**. "Prototip" describes the app, never the data. The atlas is a **Prototype**: sourced current-state data plus
design proposals. Separately, each item is labelled **current** or
**proposed** (src/AGENTS.md).

## 8. Conformance checklist

| Rule                                             | Test                                                |
| ------------------------------------------------ | --------------------------------------------------- |
| Grouped nav, stable hash routes                  | `tests/e2e/ia.spec.ts`, `tests/e2e/routing.spec.ts` |
| Summary lead is a proposal; ro copy translated   | `tests/e2e/ia.spec.ts`, `scripts/validate-data.mjs` |
| Logo square at 390 px                            | `tests/e2e/ia.spec.ts`                              |
| Paired ro/en text, diacritics, unique IDs        | `scripts/validate-data.mjs`                         |
| County names with diacritics                     | `scripts/validate-data.mjs`                         |
| Map error + retry; labels clear; chips + caption | `tests/e2e/map.spec.ts`                             |
| All 42 counties drawn; bilingual nav             | `tests/e2e/smoke.spec.ts`                           |
| axe WCAG 2.1 A/AA, 11 views × 2 languages        | `tests/e2e/a11y.spec.ts`                            |
| Language toggle name; visible focus              | `tests/e2e/a11y.spec.ts`                            |
| Works with blocked storage                       | `tests/e2e/storage-blocked.spec.ts`                 |
| No third-party loads; Inter self-hosted          | `tests/e2e/third-party.spec.ts`                     |
| Privacy notice; CSP without violations           | `tests/e2e/privacy.spec.ts`                         |
| Data date not older than sources                 | `scripts/validate-data.mjs` (ATL-11)                |
| Provenance line per view                         | none yet (D-2)                                      |
| 390 px no horizontal scroll, all views           | none yet (D-9)                                      |

## 9. Known deviations backlog

From the 2026-10-14 fleet UX review and a source audit. Not fixed here: the
atlas session is moving view copy into the locale files (ATL-21/22).

- **D-1** Fixed (minimal): a family bar above the header links to the hub
  (`META.hub`); civic-ui `FamilyBar` styling is still to adopt
  (`tests/e2e/family-bar.spec.ts`).
- **D-2** Fixed for Comparație, Analiză, Strategie, Reziliență, Calendar,
  Pași and Povești: a `.prov` line under the view heading links to Surse
  and shows `META.dataAsOf` in `<time datetime>`
  (`tests/e2e/provenance.spec.ts`). Rezumat, Hartă and Fluxuri follow once
  their open PRs land.
- **D-3** Dark-only theme with its own tokens (`--bg #05070d`); the fleet
  default is light (civic-ui tokens). Decide: adopt light, or record the
  dark map canvas as an allowed deviation.
- **D-4** Fixed: under the graph, a "Fluxurile ca listă" disclosure lists
  the flows the current mode and filters draw (from, to, data, status); in
  "Diferența" it lists only the proposed flows
  (`tests/e2e/flows-list.spec.ts`).
- **D-5** Comparație cites sources in a note, not per row.
- **D-6** Empty-state copy for filters that match nothing is not checked.
- **D-7** Fixed: under `prefers-reduced-motion: reduce` animations and
  transitions stop (`tests/e2e/motion-contrast.spec.ts`).
- **D-8** Fixed: under `forced-colors: active` chips and tabs keep a
  `ButtonText` border, the active one and focus get a `Highlight` outline
  (`tests/e2e/motion-contrast.spec.ts`).
- **D-9** Fixed: `tests/e2e/no-hscroll.spec.ts` (ATL-24).
- **D-10** Fixed: all view copy is in `src/locales` (ATL-21 to ATL-23).
- **D-11** Fixed for the map (ATL-25); the map is the only view that loads data.
