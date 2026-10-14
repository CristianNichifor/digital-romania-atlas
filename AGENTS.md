# Digital Romania Atlas

Bilingual browser atlas comparing Romania's current digital identity ecosystem
with proposed public-administration architecture. Proposals and design estimates
must remain clearly distinct from official facts.

## Setup and verification

Use Node 22 and npm. From this repository root:

```sh
npm ci
npx playwright install chromium
npm run verify
```

Local setup and PR correctness checks require no credentials, private handbook,
1Password, or access to production systems. `npm run dev` starts Vite.

`npm run verify` runs these actual package scripts in order:

| Command | Evidence |
| --- | --- |
| `npm test` | scripts/validate-data.mjs: IDs, references, bilingual content and matrix integrity |
| `npm run typecheck` | TypeScript project checks |
| `npm run build` | TypeScript and production Vite build |
| `npm run test:e2e` | Chromium: language persistence, data-flow SVG and source links |

There is no lint script. The source-text validator does not establish factual
accuracy: cite evidence for factual changes. CI's aggregate `verify` succeeds
only when its correctness job succeeds; remote branch rules are managed separately.

## Source boundaries

Read [CONTRIBUTING.md](CONTRIBUTING.md) and [src/AGENTS.md](src/AGENTS.md).
Content belongs in src/data/; preserve paired ro/en text, Romanian diacritics,
unique IDs and institution references. Keep current/proposed status explicit.
Preserve source attribution, licensing, META dates/version and ERRATA.md history.
Read docs/METHODOLOGY.md before changing estimates or UAT scenarios.
Do not hand-edit generated dist/, node_modules/, tsbuildinfo or browser reports.
Never modify vendored third-party sources or introduce real personal records.

## Review and authority

Fetch origin and branch from dev; open PRs against dev. Maintainers use
`wt new chore/my-change origin/dev` with worktrees at `<repo>/.worktrees/<name>`.
Contributors without wt can use a separate clone and
`git switch -c chore/my-change origin/dev`. Preserve existing user work.
Use scoped Conventional Commits: imperative lower-case subject, no trailing
period, at most 72 characters. Include acceptance criteria, provenance,
relevant test cases, exact verification results and limitations in the issue/PR.

Agents must never merge any PR, including into dev, or deploy, regardless of
administrator credentials or GitHub permissions. Production publishing is a
separate maintainer action; publishing credentials are not needed for development.

## Measured repository gates

Verified against GitHub's active branch rules on 2026-10-01. Recheck the
repository settings when changing the delivery workflow; this is a snapshot.

- `dev` is the default branch and PR target. Its combined rules require one
  approving review, dismiss stale approvals after new pushes, and block deletion
  and force-pushes.
- Required checks are `verify`, `Analyze (javascript-typescript)`, `npm audit`,
  `OSV scan`, and `gitleaks`. `verify` must come from GitHub Actions.
- `main` is production. Its update restriction allows repository administrators
  to bypass it. Credentials may therefore permit an action that these agent
  instructions prohibit: agents must never merge PRs or deploy.
- `.github/workflows/deploy.yml` publishes GitHub Pages on pushes to `main`
  and also exposes a manual `workflow_dispatch` trigger. Merging into `dev`
  does not automatically publish the site.
