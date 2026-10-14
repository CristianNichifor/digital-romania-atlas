# Production readiness

Acceptance criteria for making the atlas safe to publish at
`https://projects.cristian-nichifor.com/digital-romania-atlas/`. Each item has
an ID, Given/When/Then criteria and the test that proves it. Status values:
`todo`, `done`, `blocked`, `needs-human`.

Items are grouped into three themes, each delivered as one pull request into
`dev`.

## Theme E: copy and information architecture

### ATL-17 Grouped navigation with stable routes — `done`

- Given eleven views in one flat row of tabs
- When the header renders
- Then the tabs are grouped as Înțelege (Rezumat, Povești, Pași cetățean),
  Explorează (Hartă, Fluxuri, Calendar), Argument (Comparație, Analiză,
  Strategie, Reziliență) and Surse, and every existing `#/<view>` hash still
  opens the same view.

Test: `tests/e2e/ia.spec.ts`, `tests/e2e/routing.spec.ts`.

### ATL-18 Summary lead and Romanian copy — `done`

- Given the summary view in Romanian
- When it renders
- Then its lead sentence starts with "Propunem:" (it is a proposal, not a
  description of today), and the Romanian copy translates "verify, don't
  trust" instead of leaving it in English (summary, flows, institutions).

Test: `tests/e2e/ia.spec.ts`; `scripts/validate-data.mjs` rejects the English
phrase in `ro:` strings.

### ATL-19 Logo keeps its shape on mobile — `done`

- Given a 390 px wide viewport
- When the header wraps
- Then the "DR" logo stays square.

Test: `tests/e2e/ia.spec.ts`.

### ATL-20 Flows open on the difference — `done`

- Given a visitor opening the data flows view
- When it first renders
- Then the "Diferența" mode and the Identity flow filter are selected
  (exposed with `aria-pressed`).

Test: `tests/e2e/ia.spec.ts`.

Needs human review: `nav.group.*`, the "Propunem:" lead (ro and en) and the
Romanian rendering "verifici, nu crezi pe cuvânt" are agent-written.

## Theme A: robustness and correctness

### ATL-2 Survive blocked storage — `done`

- Given a browser where every `localStorage` access throws (private mode,
  blocked site data)
- When the atlas loads, the language is toggled and views are switched
- Then the page renders, the language toggle works for the session and no
  uncaught error is reported.

Test: `tests/e2e/storage-blocked.spec.ts` (an init script makes
`localStorage` throw).

### ATL-5 Canonical public URLs — `done`

- Given the site moved from GitHub Pages to `projects.cristian-nichifor.com`
- When any file outside the `CHANGELOG.md` / `ERRATA.md` history refers to the
  site or a sibling project
- Then it uses `https://projects.cristian-nichifor.com/...` (og:image,
  `src/data/uatPlanSnapshot.ts`, `src/data/sources.ts`, `CITATION.cff`,
  README, SECURITY, CONTRIBUTING, `docs/METHODOLOGY.md`), and the
  romania-reforms administrative map is
  `https://projects.cristian-nichifor.com/romania-reforms/administrative-reform/`.

Test: `scripts/validate-data.mjs` fails on any `cristiannichifor.github.io`
reference outside `CHANGELOG.md` and `ERRATA.md`. Third-party `*.github.io`
sites (MAI, EUDI ARF, CivicTech România) are other organisations' canonical
URLs and stay.

### ATL-6 One version number — `done`

- Given `package.json` and `META.version` in `src/data/meta.ts`
- When the validator runs
- Then it fails unless both carry the same version.

Test: `scripts/validate-data.mjs` (version check).

### ATL-8 Lint in the verify gate — `done`

- Given the source tree
- When `npm run verify` runs
- Then `npm run lint` (oxlint) runs first and fails the gate on errors.

Test: `npm run lint` passes; `verify` invokes it. CI wiring is a workflow
change for the maintainer (see ATL-7).

### ATL-7 Node 22 everywhere in CI — `needs-human`

- Given `security.yml` still runs Node 20 (`deploy.yml` no longer runs Node
  since it only publishes the GitHub Pages redirect stub)
- When the maintainer applies the workflow diff listed in the pull request
- Then every workflow runs Node 22 and CI runs `npm run lint`.

Test: none in the repository; the agent cannot push workflow changes.

## Theme B: user experience

### ATL-3 Hash routing for views — `done`

- Given the atlas is open on any view
- When the user picks a view
- Then the URL becomes `#/<view>` (for example `#/compare`), Back and Forward
  move between views, opening a `#/<view>` URL starts on that view, an
  unknown hash falls back to the summary, and any `?scenario=` query string is
  kept.

Test: `tests/e2e/routing.spec.ts`.

### ATL-4 Accessible navigation — `done`

- Given any view, in either language
- When it is scanned with axe-core (WCAG 2.1 A/AA rules)
- Then there are no violations; the current view's nav link has
  `aria-current="page"`, the language toggle has an accessible name that
  includes its visible text, and keyboard focus is visible.

Test: `tests/e2e/a11y.spec.ts` (`@axe-core/playwright`).

### ATL-9 Interface copy in locale files — `done`

- Given interface copy that was written inline as `lang === "ro" ? … : …`
- When it moves into `src/locales/ro.ts` and `src/locales/en.ts`
- Then both files define exactly the same keys with non-empty values, and the
  app shell (header, navigation, footer, language toggle) and the Comparison
  view's takeaways read from them.

Test: `scripts/validate-data.mjs` (ro/en key parity). Scope note: the other
views still carry inline bilingual copy; moving it is follow-up work.
English and Romanian text moved verbatim; new strings written by the agent
are marked "needs human review" below.

### ATL-10 Self-hosted Inter — `done`

- Given the page loads
- When all of its requests are recorded
- Then none go to a third-party host (no Google Fonts), and Inter is served
  from the site itself.

Test: `tests/e2e/third-party.spec.ts`.

## Theme C: data licensing and privacy

### ATL-1 Openly licensed county boundaries — `done`

- Given `public/data/ro-counties.geojson` was GADM-derived, and GADM does not
  permit redistribution
- When it is replaced by geoBoundaries gbOpen ROU ADM1 (source: World Bank;
  licence CC BY 4.0, which permits redistribution with attribution)
- Then the file has 42 features, carries no GADM properties (`ID_0`,
  `NAME_0`, `NAME_1`, `ROU_adm1`), and its source, licence, changes and
  retrieval date are recorded in the Sources view and the README.

Test: `scripts/validate-data.mjs` (feature count and GADM properties);
`tests/e2e/smoke.spec.ts` renders the map.

### ATL-11 Data date not older than its sources — `done`

- Given `META.dataAsOf` and the `accessed` dates in `src/data/sources.ts`
- When the validator runs
- Then it fails if `dataAsOf` is older than the newest `accessed` date.

Test: `scripts/validate-data.mjs`.

### ATL-12 Privacy notice and security headers — `done`

- Given the site sets no cookies, runs no analytics and keeps only the
  language choice in the visitor's own browser
- When a visitor reads the footer
- Then a privacy notice states those facts, the operator (Cristian Nichifor),
  the hosting provider (Cloudflare Pages) and the contact (the repository's
  GitHub issues); and `public/_headers` sets a Content-Security-Policy and
  related headers that the app runs under without violations.

Test: `tests/e2e/privacy.spec.ts` (notice text and no CSP violations; the
preview server applies `public/_headers`). Deployment note: the Cloudflare
workflow stages the build under `/digital-romania-atlas/`, so `_headers` must
be moved to the site root; that is a workflow change for the maintainer.

## Theme D: map polish

### ATL-13 Map load failure is visible and retryable — `done`

- Given the county boundaries request fails
- When the map view opens
- Then an alert says the map could not be loaded and offers a retry button;
  retrying after the network recovers draws all 42 counties.

Test: `tests/e2e/map.spec.ts` (the first GeoJSON request is aborted).

### ATL-14 County names keep their diacritics — `done`

- Given the county names in `public/data/ro-counties.geojson` (Argeș, Bacău,
  București…)
- When an institution names its county
- Then the name matches a GeoJSON county name exactly (no ASCII fallbacks
  such as `Bucuresti`), so tooltips and density shading use the same name.

Test: `scripts/validate-data.mjs`.

### ATL-15 County labels do not collide with symbols — `done`

- Given the map at its default zoom
- When the county labels and the per-county UAT markers are drawn
- Then no label covers its county's marker, and "Vrancea" appears once (the
  seismic epicentre has a symbol and a tooltip, not a second red label).

Test: `tests/e2e/map.spec.ts`.

### ATL-16 Legend chips and caption — `done`

- Given the category filter chips and the map symbols
- When the map renders at any width
- Then each chip keeps its label on one line, and a caption names the
  proposed sovereign data centres (DC-A Cluj, DC-B București, DC-C Iași,
  from `src/data/resilience.ts`) and says the dashed lines are proposed
  replication links, not existing infrastructure.

Test: `tests/e2e/map.spec.ts`.

Needs human review: `map.loadError`, `map.retry` and `map.caption` (ro and
en) are new agent-written strings.

## Theme G: UX guidelines

### UXG-1 Written UX guideline with a conformance map — `done`

- Given the fleet UX review and the civic-ui guideline
- When a contributor changes a view
- Then `docs/ux-guidelines.md` states the users and first-screen job, page
  anatomy, content, data-viz, states, mobile/accessibility rules and status
  vocabulary, maps each rule to an existing test, and lists the known
  deviations (D-1…D-11) as backlog.

Test: the conformance table in `docs/ux-guidelines.md` names only existing
test files; rules without a test are listed as deviations.

Needs human review: the Romanian status labels and badge wording in the
guideline are agent-written.

## Needs human review

- Translations or new copy written by the agent (listed per item when added).
- ATL-4/ATL-9: `nav.langToggle` ("EN, switch to English" / "RO, comută în
  română", adapted from the old tooltip) and `compare.euRegion` ("Comparație cu
  sistemele UE" / "Comparison with EU systems") are new strings.
- ATL-1: `map.attribution`, `sources.accessed` and the geoBoundaries entry in
  `src/data/sources.ts` (ro and en) are new strings.
- ATL-12: the `privacy.*` strings (ro and en) are new and need review,
  including whether the hosting description is complete.
- ATL-12: `public/_headers` only takes effect once the Cloudflare workflow
  moves it to the staged site root (workflow diff in the theme C PR).
- ATL-5: `https://projects.cristian-nichifor.com/romania-reforms/administrative-reform/`
  replaced the brief's `/administrativ/` path, which returned 404 after the
  romania-reforms promotion.

## Theme F: remaining interface copy

### ATL-21 View copy in locale files — `done` (partial scope)

- Given the Journeys, Sources, Stories, Timeline and Policy views carried
  inline `lang === "ro" ? … : …` copy
- When it moves verbatim into `src/locales/ro.ts` and `src/locales/en.ts`
- Then those views read every interface string through `useT()`, both locale
  files keep exact key parity, and the validator fails if inline copy
  returns to them.

Test: `scripts/validate-data.mjs` (inline-copy check over these files, key
parity); `tests/e2e/a11y.spec.ts` and `smoke.spec.ts` render every view in
both languages. Text moved verbatim; no new translations.

Remaining: see ATL-22.

### ATL-22 Remaining view copy in locale files — `done` (partial scope)

- Given the Map, Flows, Summary, Strategy and Resilience views carried 122
  inline string pairs
- When the plain-string pairs move verbatim into the locale files
- Then those views read them through `useT()` with ro/en key parity, and the
  validator guards Summary and Resilience, which no longer carry inline copy.

Test: `scripts/validate-data.mjs`; `tests/e2e/a11y.spec.ts`, `smoke.spec.ts`
and `map.spec.ts` render the views in both languages.

Remaining: three JSX fragments with inline markup (Flows diff banner,
Strategy at the `lang === "ro" ? (` block, the Map hover bar's county
suffix) still switch on `lang`; Map, Flows and Strategy are therefore not yet
in the validator guard. Keys are derived from the English text.

### ATL-23 Inline-markup copy in locale files — `done`

- Given the last three `lang === "ro" ? (…)` JSX fragments (Flows diff
  banner, Strategy sovereign-OS note, Map hover-bar county suffix)
- When their text moves verbatim into the locale files, with `{count}` and
  `{county}` placeholders and the link kept in the component
- Then no view switches copy on `lang`, and the validator guards Map, Flows
  and Strategy too.

Test: `scripts/validate-data.mjs`; CI's Playwright suite renders the views.

## Theme G: UX backlog

### ATL-24 No horizontal page scroll on phones — `done`

- Given a 390 px wide viewport (UX backlog D-9)
- When any of the eleven views opens
- Then the page is no wider than the viewport; wide tables and the map
  scroll inside their own containers.

Test: `tests/e2e/no-hscroll.spec.ts`.

### ATL-25 Reduced motion and forced colours — `done`

- Given a user with `prefers-reduced-motion: reduce` or Windows high
  contrast (`forced-colors: active`)
- When any view renders
- Then the resilience link animation and the hover transitions stop, and
  chips, cards, buttons and the focus ring keep a visible border in forced
  colours.

Test: `scripts/validate-data.mjs` fails unless `src/styles.css` has a
`prefers-reduced-motion: reduce` block that disables animations and a
`forced-colors: active` block. Visual check in CI's Playwright run.
