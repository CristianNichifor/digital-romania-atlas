# Atlas source guidance

Keep current and proposed institutions/flows distinct; proposals are design
opinions, never official records. Edit bilingual content in src/data/ with both
ro/en values and Romanian diacritics. IDs must stay unique; flows and journey
steps must reference real institution IDs. Preserve sources.ts provenance,
CC-BY attribution, META dates/version and ERRATA.md correction history.
Read docs/METHODOLOGY.md before changing estimates or UAT scenarios.

Run `npm test` (scripts/validate-data.mjs), `npm run typecheck`, `npm run build`
and `npm run test:e2e`, or `npm run verify` from the repository root after npm ci
and Playwright Chromium setup. The validator is a source-text integrity check,
not evidence that factual claims are true; source changes need cited evidence.
Do not edit generated dist/ or tsbuildinfo. Agents never merge PRs or deploy.
See CONTRIBUTING.md for the credential-free workflow and pending root-guide PR #4.
