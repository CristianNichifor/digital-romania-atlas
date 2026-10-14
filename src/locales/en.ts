import type { MessageKey } from ".";

// Interface copy (en). Keys must match the other locale file exactly;
// scripts/validate-data.mjs checks the parity.

export const en: Record<MessageKey, string> = {
  "app.hub": "← All projects",
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
  "map.caption":
    "DC-A (Cluj), DC-B (Bucharest) and DC-C (Iași) are the proposed sovereign data centres. Dashed lines are proposed replication links between sites, not existing infrastructure.",
  "map.loadError":
    "The map could not be loaded. Check your connection and try again.",
  "map.retry": "Retry",
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
  "prov.label": "Data:",
  "prov.sources": "the sources in the Sources tab",
  "prov.updated": "updated",
  "privacy.contact": "Questions or requests:",
  "privacy.contactLink": "open a GitHub issue",
  "privacy.hosting":
    "The site is hosted on Cloudflare Pages, which receives the technical data of each request (such as the IP address) in order to serve it.",
  "privacy.operator": "Operator:",
  "privacy.storage":
    "This site sets no cookies, runs no analytics and loads nothing from third parties. Your language choice is kept only in your own browser (localStorage); if you opened the administrative-reform simulator in the same browser, the atlas reads its latest scenario from there.",
  "privacy.title": "Privacy",
  "sources.accessed": "Retrieved",
  // Views (ATL-21)
  "journeys.intro":
    "The four journeys that decide everything: enrollment, sign-in, a lost phone and the optional hardware key. Each step is a diagram — the actors are the real institutions in our architecture, and the orange lines mark optional or plan-B steps.",
  "journeys.title": "Citizen journeys — flow diagrams",
  "policy.better": "Better: ",
  "policy.countersIntro":
    "A proposal that does not know its opposition is not ready for debate. These are the arguments we take most seriously, stated fairly — with our response beside them.",
  "policy.countersTitle": "The strongest arguments against — and our responses",
  "policy.criterion": "Criterion",
  "policy.currentArchitecture": "Current architecture",
  "policy.currentProposes": "What the current architecture proposes",
  "policy.disclaimer":
    "A design position, not an official document. The “current” facts come from the public MAI documentation (the GitHub repo) and the MAI presentation of July 2026.",
  "policy.element": "Element",
  "policy.gainsTitle": "The concrete gains",
  "policy.ourProposal": "Our proposal",
  "policy.ourResponse": "Our response: ",
  "policy.risk": "Risk: ",
  "policy.risksTitle": "The 8 risks — and what we do better",
  "policy.source": "Source",
  "policy.title":
    "Policy analysis: the RO Wallet architecture vs. our proposal",
  "policy.whyTitle": "Why our proposal is the right one",
  "sources.downloadCsv": "Download CSV (flat table)",
  "sources.downloadJson": "Download JSON (full data)",
  "sources.intro.after":
    "— every accepted correction is logged publicly in ERRATA.",
  "sources.intro.before":
    "Everything marked “current” in the atlas comes from the sources below; everything marked “proposed” is a design argument. Follow the links and dispute our data — every row has provenance. Found an error?",
  "sources.intro.link": "File a correction",
  "sources.pressKit": "Press kit",
  "sources.title": "Sources and provenance",
  "stories.title": "Citizen stories — today vs. proposal",
  "stories.today": "Today",
  "stories.withProposal": "With the proposal",
  "timeline.euObligations": "EU obligations",
  "timeline.nationalPlan": "National plan / MAI",
  "timeline.ourProposal": "Our proposal",
  "timeline.title":
    "Calendar: EU obligations vs. national plan vs. our proposal",
  // Views, part 2 (ATL-22)
  "flows.dataFlowsBetweenParties": "Data flows between parties",
  "flows.emptyFilter": "No flow matches these filters: {filters}.",
  "flows.emptyReset": "Clear filters",
  "flows.flows": "Flows:",
  "flows.hoverANodeFor":
    "Hover a node for its full name and role; hover an edge for the data that flows. Drag nodes to rearrange. In “Diff” mode you see only what our proposal adds.",
  "flows.listData": "Data",
  "flows.listFrom": "From",
  "flows.listStatus": "Status",
  "flows.listSummary": "The flows as a list ({count})",
  "flows.listTo": "To",
  "flows.statusCurrent": "current",
  "flows.statusProposed": "proposed",
  "flows.institutions": "Institutions:",
  "map.emptyFilter":
    "No institution in the “{category}” category has a seat on the map.",
  "map.resetFilter": "Show all categories",
  "map.showTable": "Show as a table ({count})",
  "map.tableCategory": "Category",
  "map.tableCounty": "County",
  "map.tableInstitution": "Institution",
  "map.archiveCopyToThe": "Archive copy to the salt mine",
  "map.countyShadeInstitutionDensity": "County shade = institution density",
  "map.zoomIn": "Zoom in",
  "map.zoomOut": "Zoom out",
  "map.zoomReset": "Reset zoom",
  "map.ctrlWheelToZoom":
    "Ctrl + wheel to zoom (or the +/− buttons), drag to pan. Hover over symbols for details; lines show replication between sites, count badges group nearby dots — zoom in to see them separately.",
  "map.fibreRingBetweenThe": "Fibre ring between the sovereign DCs",
  "map.institutionalMapOfDigital": "Institutional map of digital Romania",
  "map.institutionsColourCategory": "Institutions (colour = category)",
  "map.l0SyncWhenZoomed": "L0 sync (when zoomed in)",
  "map.loadingSlow":
    "The map is taking longer than usual; the connection seems slow…",
  "map.loadingTheMap": "Loading the map…",
  "map.nInstitutionClusterZoom": "N = institution cluster (zoom in)",
  "map.nationalPresenceUatIn": "National presence (UAT) in every county",
  "map.regionalMicroDc": "Regional micro-DC",
  "map.regionalUplinkL3Mirror": "Regional uplink (L3 mirror)",
  "map.sovereignDc": "Sovereign DC",
  "map.undergroundSiteCandidate": "Underground site (candidate)",
  "map.vranceaSeismicZone50": "Vrancea seismic zone (50/100/200 km)",
  "resilience.assessment": "Assessment",
  "resilience.autonomy": "Autonomy",
  "resilience.backupTestingRules": "Backup & testing rules",
  "resilience.dataCentrePlacement3": "Data centre placement (3+3 university)",
  "resilience.disasterScenariosResponse": "Disaster scenarios & response",
  "resilience.energyAutonomyByTier": "Energy autonomy by tier",
  "resilience.hardwareIndependence": "Hardware independence",
  "resilience.impact": "Impact",
  "resilience.layer": "Layer",
  "resilience.location": "Location",
  "resilience.nothingDependsOnA":
    "Nothing depends on a single datacenter, vendor or network route. The 3+8+1+L0 model: three semi-active sovereign sites, eight regional micro-DCs with their own power generation, one underground salt-mine vault and the offline nodes in every commune. Read together with the RPO/RTO classes in the Strategy tab and the public anchoring in the Flows tab.",
  "resilience.onTheMapThe":
    "On the map: the Vrancea seismic-zone rings (50/100/200 km), yellow squares = the sovereign DC sites, cyan squares = the regional micro-DCs, purple triangles = the underground sites.",
  "resilience.ownGeneration": "Own generation",
  "resilience.ownPower": "Own power",
  "resilience.powerCooling": "Power & cooling",
  "resilience.region": "Region",
  "resilience.regionalMicroDcsOne":
    "Regional micro-DCs (one per development region)",
  "resilience.resilienceCostsEstimate": "Resilience costs (estimate)",
  "resilience.resilienceHardwareGeographyDisasters":
    "Resilience: hardware, geography, disasters & the academic community",
  "resilience.response": "Response",
  "resilience.role": "Role",
  "resilience.scenario": "Scenario",
  "resilience.schoolsUniversitiesResearchInside":
    "Schools, universities & research inside the infrastructure",
  "resilience.seismicRisk": "Seismic risk",
  "resilience.site": "Site",
  "resilience.sites": "Sites",
  "resilience.softwareIndependence": "Software independence",
  "resilience.target": "Target",
  "resilience.tier": "Tier",
  "resilience.today": "Today",
  "resilience.undergroundCandidatesSaltMines":
    "Underground candidates (salt mines & galleries)",
  "resilience.undergroundCaveatsSaltIs":
    "Underground caveats: salt is corrosive (sealed containers, positive pressure, humidity control), and deep Vrancea earthquakes shake galleries too — which is why the vault sits in the North-East, not in Wallachia.",
  "strategy.2028TargetKpis": "2028 target KPIs",
  "strategy.action": "Action",
  "strategy.actions": "Actions",
  "strategy.annualGrossToEmployer":
    "Annual gross-to-employer figures (total cost, contributions included), in k€. RO bands reflect the 2026 Romanian private market; EU bands are the same roles working remotely from Romania for foreign employers — the state's direct competition.",
  "strategy.basis": "Basis",
  "strategy.category": "Category",
  "strategy.class": "Class",
  "strategy.contents": "Contents",
  "strategy.destination": "Destination",
  "strategy.estimate": "Estimate",
  "strategy.estimatedSavings": "Estimated savings",
  "strategy.euInternationalRemote": "EU / international remote",
  "strategy.event": "Event",
  "strategy.examples": "Examples",
  "strategy.existingServices": "Existing services",
  "strategy.focus": "Focus",
  "strategy.fourGovernanceRules": "Four governance rules",
  "strategy.fte": "FTE",
  "strategy.humanResourcesHowThe": "Human resources — how the teams look",
  "strategy.humanResourcesPerInstitution": "Human resources — per institution",
  "strategy.institution": "Institution",
  "strategy.item": "Item",
  "strategy.layer": "Layer",
  "strategy.machinesEquipmentRequired": "Machines & equipment required",
  "strategy.mechanism": "Mechanism",
  "strategy.note": "Note",
  "strategy.operator": "Operator",
  "strategy.owner": "Owner",
  "strategy.payLevelsRomanianMarket":
    "Pay levels: Romanian market vs. international remote",
  "strategy.payNote": "Pay note",
  "strategy.period": "Period",
  "strategy.phase": "Phase",
  "strategy.principleLocalTalentFirst":
    "Principle: local talent first, a 10–20% top-up for rare skills (crypto, security) and a digital agency with its own pay grid that escapes public-sector pay caps. Each team is small, dedicated to one layer, with on-call and end-to-end ownership.",
  "strategy.quantity": "Quantity",
  "strategy.rationalisingTheExistingPortals":
    "Rationalising the existing portals",
  "strategy.redundancyByServiceClass": "Redundancy by service class",
  "strategy.resourcesCosts5Year": "Resources & costs (5-year estimate)",
  "strategy.role": "Role",
  "strategy.roles": "Roles",
  "strategy.romaniaTotalCost": "Romania (total cost)",
  "strategy.sector": "Sector",
  "strategy.status": "Status",
  "strategy.systems": "Systems",
  "strategy.target": "Target",
  "strategy.team": "Team",
  "strategy.the7LayerArchitecture": "The 7-layer architecture",
  "strategy.theFullStrategyFrom":
    "The full strategy — from the workstation to payments",
  "strategy.theIdentityLifecycleLosing":
    "The identity lifecycle — losing the phone, planned for",
  "strategy.theOutwardFacingPortals": "The outward-facing portals (14)",
  "strategy.theSixPillars": "The six pillars",
  "strategy.todaySInventoryAnd":
    "Today's inventory and each system's destination. Governing principle: “wrap, don't rewrite” — no legacy system is rewritten; each gets a connector and becomes an authentic source behind the backbone. HUB MAI proves the model already works at ministry scale.",
  "strategy.total": "Total",
  "strategy.unitCost": "Unit cost",
  "strategy.value": "Value",
  "strategy.whatTheCitizenDoes": "What the citizen does",
  "strategy.whatTheSystemDoes": "What the system does",
  "summary.badgeProposal": "Proposal",
  "summary.countDimensions": "{count} dimensions compared",
  "summary.countInstitutions": "{count} institutions on the map",
  "summary.countNewFlows": "{count} new flows proposed",
  "summary.digitalRomaniaIn30": "Digital Romania in 30 seconds",
  "summary.estimatedCost23":
    "Estimated cost: ~€2–3/citizen/year; licence savings: €30–60M/year.",
  "summary.exploreTheFlows": "Explore the flows",
  "summary.fromDec2027Banks":
    "From Dec 2027 banks, telecoms, utilities and insurers must accept the wallet",
  "summary.itKeepsWorkingWhen":
    "It keeps working when the network dies: offline presentations, physical desks as a safety net",
  "summary.openVerifiableCodeBuilds":
    "Open, verifiable code: builds and the registry are publicly anchored — verify, don't trust",
  "summary.roWalletEudiPid":
    "RO Wallet (EUDI) — PID + age verification by Dec 2026, under MAI; attestations (mDL, criminal record, civil status) in 2027",
  "summary.seeTheCitizensStories": "See the citizens' stories →",
  "summary.seeTheFullComparison": "See the full comparison",
  "summary.stsRegistryWhoMay":
    "STS registry — who may issue and who may verify (WRPRC/WRPAC)",
  "summary.weProposeTheState":
    "We propose: the state vouches for data at the source and routes it with your consent. It neither collects it nor tracks it. Nothing depends on a single vendor, a single datacenter or a single ministry.",
  "summary.whatHappensToday": "What happens today",
  "summary.whatWeProposeOn": "What we propose on top",
  "summary.whyItMatters": "Why it matters",
  "summary.youDecideWhatData":
    "You decide what data you reveal, to whom and for what purpose — no tracking, no profiling",
  // JSX fragments (ATL-23)
  "flows.newCount": "{count} new flows",
  "flows.newCountAfter":
    "added by the proposal (highlighted). The dimmed ones already exist in the documented ecosystem.",
  "map.countySuffix": " · county of {county}",
  "strategy.sovereignOs.after":
    ") as layers L0–L1: the “institutional” half of the same doctrine — nothing depends on a single vendor, a single DC or a single ministry, and the citizen and the clerk both keep working when the network dies. Figures are design estimates, not official documents.",
  "strategy.sovereignOs.before":
    "The synthesis includes the “sovereign operating system” proposal for public administration (Fedora Silverblue, WireGuard, FreeIPA, Matrix, Nextcloud, ONLYOFFICE —",
};
