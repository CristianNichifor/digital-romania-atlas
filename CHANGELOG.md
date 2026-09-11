# Changelog

All notable changes to this project are documented here. Content (data) changes
that shift the factual claims are listed too — cite the site together with its
version (shown in the page footer) so a citation stays verifiable.

## [Unreleased]

- Responsive design: the header navigation becomes a single horizontally
  scrollable row on mobile, journey/counter grids collapse to one column and
  the press-kit buttons go full-width on small screens.

## [0.3.0] — 2026-09-11

### Added

- Eight citizen-journey flow diagrams (Pași cetățean view): wallet enrollment,
  signing in, the lost phone, the optional hardware key, the open and the
  secret parliamentary vote, the company mandate, and delegated powers.
- Parliamentary voting model: QES-signed and publicly anchored open votes;
  anonymous credentials, encrypted ballots, mixnet, homomorphic tally with an
  HSM quorum and end-to-end verification for secret votes.
- Company representation model: ONRC mandate attestations, delegation chains
  and the qualified electronic seal (QSealC).
- Identity-loss planning: lost-device scenario in Reziliență, identity
  lifecycle table in Strategie, hardware-key row in Comparație, lost-phone
  story in Povești.
- Hover tooltips on every actor acronym in stories and journeys.
- Parliament and Company nodes on the institutions map.
- Glossary entries for the new terms (FIDO2, CTAP2, WebAuthn, BBS+, ZK, E2E-V,
  mixnet, ElGamal, QSealC, Merkle, OpenID4VP).

## [0.2.0] — 2026-09-11

- Debate-readiness batch: named author and contact, data "as of" dating, press
  kit (JSON/CSV export), corrections policy with public errata, methodology
  document, steelman section (strongest counter-arguments with responses),
  locked-scenario URLs (`?scenario=…`) for deterministic, citable pages.
- Live UAT bridge with the administrative-reform simulator; every UAT-derived
  figure recomputes from the map in the other tab.

## [0.1.0] — 2026-09-10

- Initial atlas: summary, stories, institutions map, data-flow graphs,
  comparison matrix, policy brief, calendar, strategy, resilience, sources.
- CI hardening: pinned actions, CodeQL, OSV-Scanner, gitleaks, npm audit gate,
  OSSF Scorecard, SLSA provenance, Dependabot groups.
