# Design screens

Target-state mockups for the five screens that matter most, drawn for the
2026-10-14 fleet UX review. Each `screens/NN-*.html` is self-contained (inline
CSS with civic-ui `neutral` token values, no scripts, no external requests)
and switches to its 390 px layout through a media query. The PNGs next to it
are the renders at 1440 and 390. `before/` holds the live site on
2026-10-14 for comparison (Comparație before-shot missing: the capture was
stopped when the laptop ran out of memory).

Guideline references are sections of [`docs/ux-guidelines.md`](../ux-guidelines.md)
(repo) and the fleet guideline in civic-ui `docs/ux-guidelines.md` (UX-n).

Shared across all screens (what changes vs today):

- Family bar with "← Proiecte civice", the registry name "Atlasul României
  digitale", the badge "Prototip" and the RO/EN switch (D-1, UX-1, UX-16).
- H1, one-line purpose and a "Date: sursă, an" provenance line under it,
  before any control (D-2, UX-3).
- Light civic-ui theme instead of the dark atlas tokens (D-3). The mockups
  record the light option; the dark map canvas can still be kept as a listed
  deviation if the owner prefers it.
- Grouped navigation with `aria-current`, ≥ 36 px targets on desktop and
  44 px on phones (§6).
- Reduced-motion and forced-colours rules (D-7, D-8).

## Index

| #   | Screen                      | User task                                                                                        | Guideline                    | Mockup                                                                                                                            | Before                                                                        |
| --- | --------------------------- | ------------------------------------------------------------------------------------------------ | ---------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------- |
| 01  | Rezumat                     | See in one sentence that this is a proposal, then go to the comparison or the flows              | §1, §2, §7; UX-2, UX-3, UX-9 | [html](screens/01-summary.html) · [1440](screens/01-summary-1440.png) · [390](screens/01-summary-390.png)                         | [1440](before/before-summary-1440.png) · [390](before/before-summary-390.png) |
| 02  | Hartă                       | Find an institution or a proposed data centre, filter by category, read the same data as a table | §4, §5; UX-8, UX-10          | [html](screens/02-map.html) · [1440](screens/02-map-1440.png) · [390](screens/02-map-390.png)                                     | [1440](before/before-map-1440.png) · [390](before/before-map-390.png)         |
| 03  | Fluxuri, mod Diferența      | See only the flows the proposal adds, with a list alternative                                    | §4 (D-4), §5 (D-6, D-11)     | [html](screens/03-flows-diff.html) · [1440](screens/03-flows-diff-1440.png) · [390](screens/03-flows-diff-390.png)                | [1440](before/before-flows-1440.png) · [390](before/before-flows-390.png)     |
| 04  | Comparație cu surse pe rând | Cite one row with its source                                                                     | §3, §4 (D-5); UX-3           | [html](screens/04-compare-sources.html) · [1440](screens/04-compare-sources-1440.png) · [390](screens/04-compare-sources-390.png) | —                                                                             |
| 05  | Navigare grupată pe mobil   | Reach any of the eleven views at 390 px without horizontal page scroll                           | §2, §6 (D-9); UX-11, UX-12   | [html](screens/05-mobile-nav.html) · [1440](screens/05-mobile-nav-1440.png) · [390](screens/05-mobile-nav-390.png)                | [390](before/before-summary-390.png)                                          |

## 01 Rezumat

What changes: the lead card carries the badge "Propunere" and the two primary
actions; the three columns ("Ce se întâmplă azi" / "Ce propunem în plus" / "De
ce contează") each carry a status badge and a source line; a row of three
counts links to the views they come from. States: staged loading, error with
retry.

Acceptance criteria (→ `tests/e2e/ia.spec.ts`, `tests/e2e/provenance.spec.ts`):

- The first text element under the nav is a badge "Propunere" followed by a
  paragraph starting with "Propunem:".
- A `.prov` line directly under the H1 contains "Date:" and a `<time datetime>`
  equal to `META.dataAsOf`.
- The counts equal `INSTITUTIONS.length` and `COMPARISON.length`; the third
  count is the number of proposed-only flows, computed, never typed.
- Family bar present with a link whose href is the hub URL.

## 02 Hartă

What changes: category chips carry a symbol + label (not colour only); the
legend sits inside the map frame with the dashed "Replicare propusă" entry;
the caption and source line sit under the frame; "Afișează ca tabel" opens a
table of the same institutions; every centre de date row is badged
"Propunere". States: short loading, staged loading (> 2 s, with progress),
error + retry, empty filter with reset.

Acceptance criteria (→ `tests/e2e/map.spec.ts`):

- Each chip has `aria-pressed` and a visible symbol element distinct per
  category (shape, not only colour).
- A `<details>` or button labelled "Afișează ca tabel" reveals a `<table>`
  whose row count equals the markers drawn for the current filter.
- After 2 s of loading the status text changes to a staged message and a
  progress element appears.
- A filter with no match renders `role="status"` text containing the category
  name and a reset button.
- No label overlaps a marker at 1440 or 390 (existing ATL-15 test).

## 03 Fluxuri, mod Diferența

What changes: the mode chips (Situația actuală / Propunere / Diferența) sit
above the type chips; the diff banner is a `role="status"` strip with the
computed count; the graph and a flow table sit side by side at 1440 and
stacked at 390; proposed flows are dashed and badged in the table (D-4).
States: staged loading, empty filter, error.

Acceptance criteria (→ `tests/e2e/flows.spec.ts`):

- The table lists every flow currently drawn, with its id, `label.ro`, kind
  and a badge "Propunere" or "Situația actuală"; counts match the SVG edges.
- The banner count equals the number of flows absent from the current-state
  set.
- At 390 px the table scrolls inside its container; `document.scrollingElement.scrollWidth`
  equals the viewport width.

## 04 Comparație cu surse pe rând

What changes: the "actual" column gets a footnote link per row (`[1]`,
`[1, 3]`, `—` when the published document is silent); the footnotes resolve
to an ordered list under the table whose entries are the matching items from
`src/data/sources.ts`; the status column uses "Extins" / "Adăugat de
propunere" / "Aliniat" badges with text, not colour only. Open PR #30 already
adds source footnotes; this mockup is the target it should converge on.

Acceptance criteria (→ `tests/e2e/compare-sources.spec.ts`, which already covers the footnote links and targets):

- Every row's "actual" cell ends with a `<sup><a href="#src-n">` or the text
  "—" and `aria-label="sursa …"`.
- Every `#src-n` target exists and its URL equals the `url` of a `SOURCES`
  entry.
- Rows with verdict `added` and no source show "—".

## 05 Navigare grupată pe mobil

What changes: at 390 px the four groups stack vertically, each group's list
scrolls horizontally with 44 px targets, the group label stays above its
list, the family bar wraps to two lines and the logo stays square.

Acceptance criteria (→ `tests/e2e/ia.spec.ts`, `tests/e2e/mobile.spec.ts`):

- At 390 px, for every hash route, `scrollWidth === clientWidth` on the
  document (D-9).
- Every nav link's bounding box height ≥ 44 px at 390 px and ≥ 36 px at 1440.
- The active link has `aria-current="page"` and is visible without scrolling
  its group list after navigation (`scrollIntoView` on route change).

## Implementation status (2026-10-14)

Opened the same day by the atlas session, from these criteria: 01 counts
(#39), 02 map table and empty filter (#41), 03 flow list (#36), 05 nav
targets (#42); shared items: family bar (#37), provenance line (#40),
reduced motion and forced colours (#34), staged map loading (#33). Check
`gh pr list` for what has merged since.

## Needs human review

Romanian copy written for these mockups that does not yet exist in
`src/locales/ro.ts`: page purposes, provenance lines, staged loading messages
("Se descarcă contururile județelor (1 din 2)…"), empty-state sentences, the
map category labels (placeholders for `CATEGORY_LABELS`), the verdict badges
"Extins" / "Adăugat de propunere" / "Aliniat", and the storage-blocked
notice. Data-centre coordinates in the map mockup are schematic.
