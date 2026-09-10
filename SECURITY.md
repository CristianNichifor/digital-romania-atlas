# Security Policy

## Supported versions

Only the latest commit on `main` (published at
https://cristiannichifor.github.io/digital-romania-atlas/) is supported.
This is a static demonstration site: there is no backend, no database and
no runtime processing of user data.

## Scope

The realistic attack surface is:

- **Supply chain** — the npm dependency tree and the GitHub Actions used
  to build and deploy the site.
- **CI/CD integrity** — tampering with workflows, tags or artifacts.
- **Content** — incorrect or misleading data in the atlas itself.

Please report anything in those areas. Reports about styling, typos or
feature ideas are better placed as regular issues.

## Reporting a vulnerability

Use GitHub's **private vulnerability reporting** on the
[Security tab](../../security) of this repository. Do not open a public
issue for security findings.

Please include:

- affected file, endpoint or workflow;
- a minimal description of the vulnerability and its impact;
- steps to reproduce, if you have them.

You can expect:

- an acknowledgement within **72 hours**;
- a first assessment within **7 days**;
- a fix or a documented "won't fix" (with reasoning) within **30 days**.

We are a volunteer project — no bug bounties, but credit is given in the
release notes when you agree.

## Safe harbour

Good-faith security research against this repository is authorised. We will
not pursue legal action and will support you if a third party does, as long
as you act in good faith, avoid data destruction, and give us a reasonable
window before public disclosure.

## Practices enforced in this repository

- **Pinned GitHub Actions**: every action is pinned to a full commit SHA.
- **Dependency scanning**: `npm audit --audit-level=high` gates every
  build; Dependabot opens weekly dependency PRs; OSV-Scanner runs on
  every push and PR.
- **Static analysis**: CodeQL runs on every push, PR and weekly.
- **Supply-chain posture**: OSSF Scorecard runs weekly and results are
  published; builds are attested with SLSA provenance.
- **Least privilege**: workflows start from `contents: read` and only the
  deploy job can write to GitHub Pages.
- **Secrets**: none are needed by this project. If you find one committed,
  treat it as compromised and report it immediately.
