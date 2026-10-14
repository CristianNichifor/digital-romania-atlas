import type { MessageKey } from ".";

// Interface copy (en). Keys must match the other locale file exactly;
// scripts/validate-data.mjs checks the parity.

export const en: Record<MessageKey, string> = {
  "app.tagline":
    "The RO EUDI Wallet ecosystem vs. the digital backbone proposal — institutions, flows, comparison",
  "compare.adds1":
    "Nobody else joins the three: X-Road covers data exchange with no citizen identity, DigiD/itsme/MitID cover identity with no data backbone — the proposal combines both and adds payments.",
  "compare.adds2":
    "It stays 100% compatible with the EUDI framework (PID LoA High, selective disclosure, free QES), so it interoperates with every European wallet.",
  "compare.adds3":
    "It is the only design with an offline layer (L0) and an underground archive — continuity that the online-only systems do not have.",
  "compare.adds4":
    "Verifiable transparency (EUPL code + hash-only public anchors) where DigiD, itsme and MitID are closed — and further than X-Road (MIT), with cryptographic anchors for builds, registry and key ceremonies.",
  "compare.addsTitle": "What the proposal adds",
  "compare.adoptionNote":
    "Adoption figures are approximate (≈) and may already be exceeded by recent growth; full sources for each system are in the Sources tab. The “Verdict” column rates our proposal against the best of the rest, dimension by dimension.",
  "compare.currentColumn": "Current proposal (RO Wallet docs + MAI)",
  "compare.dimension": "Dimension",
  "compare.euIntro":
    "The EU's most mature identity and data-exchange systems each do one of the pieces; almost nobody combines them. Below, this atlas's proposal next to them.",
  "compare.euRegion": "Comparison with EU systems",
  "compare.euTitle": "Our proposal vs. other EU digital systems",
  "compare.euVerdict": "Verdict (us vs. rest)",
  "compare.ourColumn": "Our proposal",
  "compare.sourceNote.after":
    "(decomposition, components, flows) and the MAI presentation “MAI's role in the national EUDIW ecosystem” (Jul 2026). Where the document is silent (payments, backbone, resilience, inclusion), the row is marked “Added by proposal”. Details in the Sources tab.",
  "compare.sourceNote.before": "Source of the “current” column: the published",
  "compare.status": "Status",
  "compare.title": "Comparison: published documentation vs. our proposal",
  "footer.author": "Author:",
  "footer.corrections": "corrections policy",
  "footer.dataAsOf": "data as of {date} (v{version})",
  "footer.disclaimer.after":
    "(CC-BY-4.0) and public MAI presentations. Green-marked proposals are design opinions, not official documents.",
  "footer.disclaimer.before":
    "Open source demo — the “current” data comes from",
  "footer.foundError": "found an error?",
  "footer.report": "report it",
  "map.attribution":
    "County boundaries: geoBoundaries (William & Mary geoLab), from World Bank data, CC BY 4.0; simplified for display.",
  "nav.compare": "Comparison",
  "nav.flows": "Data flows",
  "nav.group.argue": "Argument",
  "nav.group.explore": "Explore",
  "nav.group.understand": "Understand",
  "nav.journeys": "Citizen journeys",
  "nav.langToggle": "RO, comută în română",
  "nav.map": "Map of Romania",
  "nav.policy": "Policy",
  "nav.resilience": "Resilience",
  "nav.sources": "Sources",
  "nav.stories": "Stories",
  "nav.strategy": "Strategy",
  "nav.summary": "Summary",
  "nav.timeline": "Calendar",
  "privacy.contact": "Questions or requests:",
  "privacy.contactLink": "open a GitHub issue",
  "privacy.hosting":
    "The site is hosted on Cloudflare Pages, which receives the technical data of each request (such as the IP address) in order to serve it.",
  "privacy.operator": "Operator:",
  "privacy.storage":
    "This site sets no cookies, runs no analytics and loads nothing from third parties. Your language choice is kept only in your own browser (localStorage); if you opened the administrative-reform simulator in the same browser, the atlas reads its latest scenario from there.",
  "privacy.title": "Privacy",
  "sources.accessed": "Retrieved",
};
