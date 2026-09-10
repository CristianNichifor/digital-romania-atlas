import type { Bi } from "../i18n";

export interface Layer {
  id: string;
  name: Bi;
  what: Bi;
  owner: Bi;
  status: "in-flight" | "proposal" | "partial";
}

export const LAYERS: Layer[] = [
  {
    id: "L0",
    name: { ro: "Endpoint-uri suverane", en: "Sovereign endpoints" },
    what: {
      ro: "Desktop Linux imutabil, office, chat, email, AI cu guardrails (Fedora Silverblue, WireGuard, FreeIPA, Matrix, Nextcloud, ONLYOFFICE)",
      en: "Immutable Linux desktop, office, chat, email, guarded AI (Fedora Silverblue, WireGuard, FreeIPA, Matrix, Nextcloud, ONLYOFFICE)",
    },
    owner: {
      ro: "ADR + operațiuni per UAT",
      en: "ADR + per-UAT operations",
    },
    status: "proposal",
  },
  {
    id: "L1",
    name: { ro: "Rețea suverană", en: "Sovereign network" },
    what: {
      ro: "Mesh WireGuard, hub per instituție, segmentare est-vest, DNS/PKI intern (.gov.intern)",
      en: "WireGuard mesh, per-institution hub, east-west segmentation, internal DNS/PKI (.gov.intern)",
    },
    owner: { ro: "STS", en: "STS" },
    status: "proposal",
  },
  {
    id: "L2",
    name: { ro: "Identitate", en: "Identity" },
    what: {
      ro: "RO Wallet / EUDI — PID, QEAA, QES",
      en: "RO Wallet / EUDI — PID, QEAA, QES",
    },
    owner: { ro: "MAI (DGCTI/DGEP)", en: "MAI (DGCTI/DGEP)" },
    status: "in-flight",
  },
  {
    id: "L3",
    name: { ro: "Backbone de date", en: "Data backbone" },
    what: {
      ro: "Schimb securizat tip X-Road, gateway de consimțământ, catalog național de date",
      en: "X-Road-style secure exchange, consent gateway, national data catalogue",
    },
    owner: { ro: "STS / ADR", en: "STS / ADR" },
    status: "proposal",
  },
  {
    id: "L4",
    name: { ro: "Servicii & portaluri", en: "Services & portals" },
    what: {
      ro: "Portal cetățean, cutia poștală digitală, portal dezvoltatori",
      en: "Citizen portal, digital postbox, developer portal",
    },
    owner: { ro: "MEDAT / ADR", en: "MEDAT / ADR" },
    status: "partial",
  },
  {
    id: "L5",
    name: { ro: "Plăți", en: "Payments" },
    what: {
      ro: "SEPA Instant + Request-to-Pay în wallet, hub de plăți publice",
      en: "SEPA Instant + Request-to-Pay in wallet, public payment hub",
    },
    owner: { ro: "BNR + TRANSFOND + ADR", en: "BNR + TRANSFOND + ADR" },
    status: "proposal",
  },
  {
    id: "L6",
    name: { ro: "Supraveghere", en: "Oversight" },
    what: {
      ro: "SOC DNSC, ANSPDCP, audituri publice, portal de transparență",
      en: "DNSC SOC, ANSPDCP, public audits, transparency portal",
    },
    owner: { ro: "independent", en: "independent" },
    status: "partial",
  },
];

export interface CostRow {
  item: Bi;
  estimate: string;
  notes: Bi;
}

export const COSTS: CostRow[] = [
  {
    item: {
      ro: "Construcție backbone (L1–L5)",
      en: "Backbone build (L1–L5)",
    },
    estimate: "80–150M € capex",
    notes: {
      ro: "DC-uri, HSM, gateway, cutie poștală, portaluri",
      en: "DCs, HSM, gateway, postbox, portals",
    },
  },
  {
    item: {
      ro: "Integrare registre (CNAS, ANAF, ONRC, MEN…)",
      en: "Registry integration (CNAS, ANAF, ONRC, MEN…)",
    },
    estimate: "30–60M € capex",
    notes: {
      ro: "echipe conector per minister",
      en: "connector teams per ministry",
    },
  },
  {
    item: { ro: "Rollout endpoint L0", en: "L0 endpoint rollout" },
    estimate: "20–40M €",
    notes: {
      ro: "servicii și training; licențe ≈ 0",
      en: "services and training; licences ≈ 0",
    },
  },
  {
    item: { ro: "Opex anual", en: "Annual opex" },
    estimate: "25–45M €/an",
    notes: {
      ro: "infrastructură, operațiuni, securitate, suport",
      en: "infrastructure, operations, security, support",
    },
  },
  {
    item: { ro: "Echipă centrală", en: "Core team" },
    estimate: "150–250 FTE",
    notes: {
      ro: "SRE, securitate, inginerie, design, PM + echipe per instituție — detaliat în secțiunea Resurse umane de mai jos",
      en: "SRE, security, engineering, design, PM + per-institution squads — detailed in the Human resources section below",
    },
  },
  {
    item: {
      ro: "Securitate / audituri / bug bounty",
      en: "Security / audits / bug bounty",
    },
    estimate: "3–5M €/an",
    notes: {
      ro: "inclusiv certificare eIDAS",
      en: "including eIDAS certification",
    },
  },
  {
    item: { ro: "Cost per cetățean", en: "Cost per citizen" },
    estimate: "~2–3 €/an",
    notes: {
      ro: "comparabil cu estimările EUDI la nivel UE (~4,5 mld € capex)",
      en: "comparable with EU-wide EUDI estimates (~€4.5B capex)",
    },
  },
  {
    item: { ro: "Economii potențiale", en: "Potential savings" },
    estimate: "30–60M €/an",
    notes: {
      ro: "eliminarea a 250–400k licențe Windows/O365; precedent: Jandarmeria Franceză, Schleswig-Holstein",
      en: "removing 250–400k Windows/O365 licences; precedent: French Gendarmerie, Schleswig-Holstein",
    },
  },
];

export interface Portal {
  id: string;
  name: Bi;
  what: Bi;
}

export const PORTALS: Portal[] = [
  {
    id: "p1",
    name: {
      ro: "Portal cetățean unificat",
      en: "Unified citizen portal",
    },
    what: {
      ro: "Ghiseul.ro v2, evenimente de viață wallet-first",
      en: "Ghiseul.ro v2, wallet-first life events",
    },
  },
  {
    id: "p2",
    name: { ro: "Cutia Digitală", en: "Digital Postbox" },
    what: {
      ro: "Cutie poștală legală web + inbox în wallet",
      en: "Legal web mailbox + inbox in the wallet",
    },
  },
  {
    id: "p3",
    name: { ro: "Portal dezvoltatori", en: "Developer portal" },
    what: {
      ro: "Catalog API, sandbox, SDK-uri, documentație — developers.gov.ro",
      en: "API catalogue, sandbox, SDKs, docs — developers.gov.ro",
    },
  },
  {
    id: "p4",
    name: {
      ro: "Portal furnizori / RP",
      en: "Provider / RP portal",
    },
    what: {
      ro: "Registrul STS self-service: onboarding, KYC, WRPRC/WRPAC, scheme de atestare",
      en: "STS registry self-service: onboarding, KYC, WRPRC/WRPAC, attestation schemes",
    },
  },
  {
    id: "p5",
    name: { ro: "Portal instituții", en: "Institutions portal" },
    what: {
      ro: "Catalog de date, operațiuni de consimțământ, deploy conectori pentru registre",
      en: "Data catalogue, consent operations, registry connector deployment",
    },
  },
  {
    id: "p6",
    name: { ro: "Portal operațional", en: "Operational portal" },
    what: {
      ro: "Pagină publică de status, SLO-uri, incidente — status.gov.ro",
      en: "Public status page, SLOs, incidents — status.gov.ro",
    },
  },
  {
    id: "p7",
    name: { ro: "Portal transparență", en: "Transparency portal" },
    what: {
      ro: "Rapoarte de audit, uptime, cheltuieli, ceremonii de chei, rezultate bounty",
      en: "Audit reports, uptime, spending, key ceremonies, bounty results",
    },
  },
  {
    id: "p8",
    name: { ro: "Hub plăți publice", en: "Public payment hub" },
    what: {
      ro: "Reconciliere plăți sector public, e-mandat, QR EPC",
      en: "Public-sector payment reconciliation, e-mandate, EPC QR",
    },
  },
  {
    id: "p9",
    name: { ro: "Portal diaspora", en: "Diaspora portal" },
    what: {
      ro: "Servicii consulare, verificare identitate la distanță",
      en: "Consular services, remote identity verification",
    },
  },
  {
    id: "p10",
    name: { ro: "Portal business", en: "Business portal" },
    what: {
      ro: "Integrare ONRC / e-Factura prin backbone",
      en: "ONRC / e-Factura integration via the backbone",
    },
  },
  {
    id: "p11",
    name: {
      ro: "API liste de încredere + verificator",
      en: "Trust list API + verifier",
    },
    what: {
      ro: "Oricine poate verifica orice RP, offline",
      en: "Anyone can verify any RP, offline",
    },
  },
  {
    id: "p12",
    name: {
      ro: "Suport & puncte asistate",
      en: "Support & assisted points",
    },
    what: {
      ro: "Programări la poștă / primărie pentru emitere asistată — plasa de siguranță fizică",
      en: "Post office / town hall bookings for assisted issuance — the physical safety net",
    },
  },
  {
    id: "p13",
    name: {
      ro: "Portal educațional (REGES/universități)",
      en: "Education portal (REGES/universities)",
    },
    what: {
      ro: "Admitere și înscrieri cu QEAA diplome, verificare la sursă, dosarul electronic al studentului",
      en: "Admission and enrolment with diploma QEAAs, source verification, the student's e-record",
    },
  },
  {
    id: "p14",
    name: {
      ro: "Portal civic (ONG/CivicTech)",
      en: "Civic portal (NGO/CivicTech)",
    },
    what: {
      ro: "Acces structurat la date publice, rapoarte și ancore pentru verificare independentă",
      en: "Structured access to public data, reports and anchors for independent verification",
    },
  },
];

export interface TierRow {
  tier: string;
  name: Bi;
  examples: Bi;
  target: string;
  mechanism: Bi;
}

export const REDUNDANCY_TIERS: TierRow[] = [
  {
    tier: "T0",
    name: { ro: "Continuitate identitate", en: "Identity continuity" },
    examples: {
      ro: "Prezentări de PID / atestări",
      en: "PID / attestation presentations",
    },
    target: { ro: "100% offline", en: "100% offline" } as unknown as string,
    mechanism: {
      ro: "Date și chei pe dispozitiv; ISO 18013-5; verificare locală fără rețea",
      en: "Data and keys on device; ISO 18013-5; local verification with no network",
    },
  },
  {
    tier: "T1",
    name: { ro: "Emisie & ciclu de viață", en: "Issuance & lifecycle" },
    examples: {
      ro: "Emisie PID/EAA, revocare, registru STS",
      en: "PID/EAA issuance, revocation, STS registry",
    },
    target: {
      ro: "RPO ≤ 5 min · RTO ≤ 30 min",
      en: "RPO ≤ 5 min · RTO ≤ 30 min",
    } as unknown as string,
    mechanism: {
      ro: "2+1 situri: două DC active (zone seismice diferite) + un DR pasiv; replicare sincronă/asincronă; HSM cuorum M-din-N pe ≥2 situri",
      en: "2+1 sites: two active DCs (different seismic zones) + one passive DR; sync/async replication; M-of-N HSM quorum across ≥2 sites",
    },
  },
  {
    tier: "T2",
    name: { ro: "Conveniență", en: "Convenience" },
    examples: {
      ro: "Analytics, dashboard-uri, rapoarte",
      en: "Analytics, dashboards, reports",
    },
    target: { ro: "RTO ≤ 4h", en: "RTO ≤ 4h" } as unknown as string,
    mechanism: {
      ro: "Backup zilnic cross-sit, restore testat lunar, acceptare degradare temporară",
      en: "Daily cross-site backup, monthly tested restore, temporary degradation accepted",
    },
  },
];

export interface MachineRow {
  item: Bi;
  quantity: string;
  unitCost: string;
  total: string;
}

export const MACHINES: MachineRow[] = [
  {
    item: {
      ro: "Servere enterprise (gateway, backbone, registre)",
      en: "Enterprise servers (gateway, backbone, registries)",
    },
    quantity: "600–1.000",
    unitCost: "10–15k €",
    total: "6–15M €",
  },
  {
    item: {
      ro: "HSM calificate (cuorum, ≥2 situri)",
      en: "Qualified HSMs (quorum, ≥2 sites)",
    },
    quantity: "6–12",
    unitCost: "25–50k €",
    total: "0,5–1M €",
  },
  {
    item: {
      ro: "Noduri inferență AI (asistent L0, GPU)",
      en: "AI inference nodes (L0 assistant, GPU)",
    },
    quantity: "2–4",
    unitCost: "250–500k €",
    total: "1–2M €",
  },
  {
    item: {
      ro: "Mini-servere locale UAT (hub L0 per primărie)",
      en: "Local UAT mini-servers (L0 hub per town hall)",
    },
    quantity: "~3.200",
    unitCost: "1–1,5k € (sau PC-uri reutilizate)",
    total: "3–5M €",
  },
  {
    item: {
      ro: "Echipamente rețea & stocare (2+1 situri)",
      en: "Network & storage gear (2+1 sites)",
    },
    quantity: "—",
    unitCost: "—",
    total: "8–15M €",
  },
  {
    item: {
      ro: "Total mașini & echipamente",
      en: "Total machines & equipment",
    },
    quantity: "—",
    unitCost: "—",
    total: "18–38M €",
  },
];

export interface SavingRow {
  item: Bi;
  estimate: string;
  basis: Bi;
}

export const SAVINGS: SavingRow[] = [
  {
    item: { ro: "Licențe OS & office", en: "OS & office licences" },
    estimate: "30–60M €/an",
    basis: {
      ro: "250–400k stații × 150–250 €/an (Windows + O365 + AV). Precedente: Jandarmeria Franceză, Schleswig-Holstein (amortizare <1 an).",
      en: "250–400k workstations × €150–250/yr (Windows + O365 + AV). Precedents: French Gendarmerie, Schleswig-Holstein (payback <1 year).",
    },
  },
  {
    item: { ro: "Timpul cetățenilor", en: "Citizens' time" },
    estimate: "~200–400M €/an",
    basis: {
      ro: "19M adulți × 2–5 ore/an economisite (drumuri, cozi) × ~10 €/oră — doar fracțiunea monetizabilă.",
      en: "19M adults × 2–5 hours/year saved (trips, queues) × ~€10/hour — only the monetisable fraction.",
    },
  },
  {
    item: { ro: "Integritatea achizițiilor", en: "Procurement integrity" },
    estimate: "~50–200M €/an",
    basis: {
      ro: "0,5–1% din achizițiile publice (~20–25 mld €/an) prin transparență și monitorizare — estimare prudentă, bazată pe studiile de corupție în achiziții.",
      en: "0.5–1% of public procurement (~€20–25B/yr) via transparency and monitoring — a prudent estimate based on procurement-corruption studies.",
    },
  },
  {
    item: { ro: "Eficienta energetică DC", en: "DC energy efficiency" },
    estimate: "2–5M €/an",
    basis: {
      ro: "Consolidarea în 2+1 situri moderne (PUE ≤1,3) vs. serverele dispersate actuale; economie din virtualizare.",
      en: "Consolidation into 2+1 modern sites (PUE ≤1.3) vs. today's scattered servers; savings from virtualisation.",
    },
  },
];

export interface BulletGroup {
  title: Bi;
  items: Bi[];
}

export interface InventoryRow {
  sector: Bi;
  services: Bi;
  operator: Bi;
  note: Bi;
}

export const INVENTORY: InventoryRow[] = [
  {
    sector: { ro: "Plăți", en: "Payments" },
    services: {
      ro: "Ghiseul.ro (~2M+ conturi), SNEP (motorul de plăți)",
      en: "Ghiseul.ro (~2M+ accounts), SNEP (payment engine)",
    },
    operator: { ro: "ADR / STS", en: "ADR / STS" },
    note: {
      ro: "cel mai folosit serviciu public; card, nu RTP",
      en: "the most used public service; card, not RTP",
    },
  },
  {
    sector: { ro: "Fiscal", en: "Tax" },
    services: {
      ro: "SPV, e-Factura, e-Transport, e-TVA, SAF-T (D406), e-Case de marcat",
      en: "SPV, e-Factura, e-Transport, e-TVA, SAF-T (D406), e-Cash registers",
    },
    operator: { ro: "ANAF", en: "ANAF" },
    note: {
      ro: "6+ frontend-uri pentru același contribuabil",
      en: "6+ frontends for the same taxpayer",
    },
  },
  {
    sector: { ro: "Identitate", en: "Identity" },
    services: {
      ro: "ROeID (notificat eIDAS), eIdentity (CEI, NU notificată), RO Wallet (2026)",
      en: "ROeID (notified eIDAS), eIdentity (ID card, NOT notified), RO Wallet (2026)",
    },
    operator: { ro: "ADR / MAI", en: "ADR / MAI" },
    note: {
      ro: "3 identități digitale simultane",
      en: "3 simultaneous digital identities",
    },
  },
  {
    sector: { ro: "MAI", en: "MAI" },
    services: {
      ro: "HUB MAI: programări CEI, ePașaport, permise, înmatriculări, cazier online, apostile, eSAR",
      en: "HUB MAI: ID appointments, ePassport, licences, registrations, online criminal record, apostilles, eSAR",
    },
    operator: { ro: "MAI-DGCTI", en: "MAI-DGCTI" },
    note: {
      ro: "deja un mini-portal unificat — modelul de urmat",
      en: "already a unified mini-portal — the model to follow",
    },
  },
  {
    sector: { ro: "Sănătate", en: "Health" },
    services: {
      ro: "CEAS / PIAS, DES/e-rețetă, cardul de sănătate; SIUI în spate",
      en: "CEAS / PIAS, DES/e-prescription, health card; SIUI behind",
    },
    operator: { ro: "CNAS", en: "CNAS" },
    note: {
      ro: "mai multe interfețe peste același registru",
      en: "several interfaces over the same registry",
    },
  },
  {
    sector: { ro: "Pensii", en: "Pensions" },
    services: {
      ro: "Portal CNPP (e-cerere pensie, talon online)",
      en: "CNPP portal (e-pension request, online coupon)",
    },
    operator: { ro: "CNPP", en: "CNPP" },
    note: { ro: "—", en: "—" },
  },
  {
    sector: { ro: "Muncă", en: "Labour" },
    services: {
      ro: "ANOFM e-formular, Locuri de Muncă Vacante",
      en: "ANOFM e-form, Vacant Jobs",
    },
    operator: { ro: "ANOFM", en: "ANOFM" },
    note: { ro: "—", en: "—" },
  },
  {
    sector: { ro: "Firme", en: "Companies" },
    services: {
      ro: "ONRC RECOM + InfoCert, PSCID (edirect), SICAP / e-licitație.ro",
      en: "ONRC RECOM + InfoCert, PSCID (edirect), SICAP / e-licitatie.ro",
    },
    operator: { ro: "ONRC / ADR / ANAP", en: "ONRC / ADR / ANAP" },
    note: {
      ro: "e-licitația funcționează — B2B, se păstrează",
      en: "e-procurement works — B2B, kept as-is",
    },
  },
  {
    sector: { ro: "Cadastru", en: "Cadastre" },
    services: {
      ro: "e-Terra, servicii online ANCPI",
      en: "e-Terra, ANCPI online services",
    },
    operator: { ro: "ANCPI", en: "ANCPI" },
    note: { ro: "—", en: "—" },
  },
  {
    sector: { ro: "Educație", en: "Education" },
    services: {
      ro: "SIIIR/REGES, ARN (registrul absolvenților)",
      en: "SIIIR/REGES, ARN (graduates registry)",
    },
    operator: { ro: "MEN", en: "MEN" },
    note: {
      ro: "fără frontend unificat de cetățean",
      en: "no unified citizen frontend",
    },
  },
  {
    sector: { ro: "Justiție", en: "Justice" },
    services: {
      ro: "portal.just.ro (dosar electronic), ECRIS",
      en: "portal.just.ro (e-case file), ECRIS",
    },
    operator: { ro: "MJ", en: "MJ" },
    note: { ro: "—", en: "—" },
  },
  {
    sector: { ro: "Local", en: "Local" },
    services: {
      ro: "~3.200 site-uri UAT cu formulare proprii",
      en: "~3,200 UAT websites with bespoke forms",
    },
    operator: { ro: "fiecare primărie", en: "each town hall" },
    note: { ro: "zero standard", en: "zero standard" },
  },
  {
    sector: { ro: "Director", en: "Directory" },
    services: {
      ro: "e-guvernare.ro",
      en: "e-guvernare.ro",
    },
    operator: { ro: "ADR", en: "ADR" },
    note: {
      ro: "pagină de linkuri, nu serviciu",
      en: "a link page, not a service",
    },
  },
];

export interface ConsolidationRow {
  action: Bi;
  systems: Bi;
  destination: Bi;
}

export const CONSOLIDATION: ConsolidationRow[] = [
  {
    action: { ro: "Rămân surse autentice", en: "Stay as authentic sources" },
    systems: {
      ro: "SIUI, RNEP, backends ANAF, RCE/ONRC, SIIIR/REGES, ECRIS, e-Terra, baza SEAP",
      en: "SIUI, RNEP, ANAF backends, RCE/ONRC, SIIIR/REGES, ECRIS, e-Terra, SEAP DB",
    },
    destination: {
      ro: "în spatele backbone-ului (L3)",
      en: "behind the backbone (L3)",
    },
  },
  {
    action: {
      ro: "Se unifică în Portalul cetățean",
      en: "Merged into the Citizen Portal",
    },
    systems: {
      ro: "Ghiseul.ro v2 absoarbe PSCID + majoritatea tranzacțiilor",
      en: "Ghiseul.ro v2 absorbs PSCID + most transactions",
    },
    destination: { ro: "Portal p1", en: "Portal p1" },
  },
  {
    action: {
      ro: "Se unifică în Cutia Digitală",
      en: "Merged into the Digital Postbox",
    },
    systems: {
      ro: "SPV (corespondența), notificările HUB MAI",
      en: "SPV (correspondence), HUB MAI notifications",
    },
    destination: { ro: "Portal p2", en: "Portal p2" },
  },
  {
    action: {
      ro: "Cont fiscal unic (remake)",
      en: "Single tax account (remake)",
    },
    systems: {
      ro: "SPV + e-Factura + e-Transport + e-TVA + SAF-T + e-Case → o singură intrare per contribuabil",
      en: "SPV + e-Factura + e-Transport + e-TVA + SAF-T + e-Case → one entry per taxpayer",
    },
    destination: {
      ro: "backends separate, frontend unic",
      en: "separate backends, single frontend",
    },
  },
  {
    action: { ro: "„Sănătatea mea” (remake)", en: "“My Health” (remake)" },
    systems: {
      ro: "CEAS + DES/e-rețetă + dosarul electronic de sănătate → un singur frontend",
      en: "CEAS + DES/e-prescription + the electronic health file → one frontend",
    },
    destination: {
      ro: "SIUI rămâne sursa",
      en: "SIUI stays the source",
    },
  },
  {
    action: { ro: "Identitate unică", en: "Single identity" },
    systems: {
      ro: "RO Wallet devine singura identitate de cetățean; eIdentity se dezactivează (2027); ROeID rămâne backstop notificat",
      en: "RO Wallet becomes the only citizen identity; eIdentity is deactivated (2027); ROeID stays as the notified backstop",
    },
    destination: { ro: "converge în L2", en: "converges into L2" },
  },
  {
    action: { ro: "Plăți unice", en: "Single payments" },
    systems: {
      ro: "Toate taxele trec prin hub-ul național (SNEP + SEPA Instant + RTP); se desființează PSP-urile per portal",
      en: "All taxes flow through the national hub (SNEP + SEPA Instant + RTP); per-portal PSP contracts end",
    },
    destination: { ro: "Portal p8", en: "Portal p8" },
  },
  {
    action: { ro: "ONRC RECOM", en: "ONRC RECOM" },
    systems: {
      ro: "rămâne portal business, autentificarea migrează pe wallet",
      en: "stays the business portal, authentication moves to the wallet",
    },
    destination: { ro: "Portal p10", en: "Portal p10" },
  },
  {
    action: { ro: "Se păstrează", en: "Kept as-is" },
    systems: {
      ro: "e-licitație.ro / SICAP (B2B, obligatoriu UE, funcționează)",
      en: "e-licitatie.ro / SICAP (B2B, EU-mandated, works)",
    },
    destination: { ro: "neschimbat", en: "unchanged" },
  },
  {
    action: { ro: "Retragere", en: "Retirement" },
    systems: {
      ro: "e-guvernare.ro, portaluri de programări duplicate, eIdentity",
      en: "e-guvernare.ro, duplicate appointment portals, eIdentity",
    },
    destination: { ro: "dezafectare", en: "decommissioning" },
  },
  {
    action: { ro: "UAT-uri", en: "UATs" },
    systems: {
      ro: "~3.200 site-uri bespoke → o platformă unică cu șabloane (instanță per UAT pe hub-ul L0)",
      en: "~3,200 bespoke sites → one templated platform (instance per UAT on the L0 hub)",
    },
    destination: { ro: "Portal p12 + L0", en: "Portal p12 + L0" },
  },
];

export interface CutoverPhase {
  phase: Bi;
  period: Bi;
  actions: Bi;
}

export const CUTOVER: CutoverPhase[] = [
  {
    phase: { ro: "Faza 1", en: "Phase 1" },
    period: { ro: "2026–2027", en: "2026–2027" },
    actions: {
      ro: "RO Wallet live (PID + vârstă); conectori pentru Ghiseul.ro, SPV și HUB MAI; eIdentity devine read-only",
      en: "RO Wallet live (PID + age); connectors for Ghiseul.ro, SPV and HUB MAI; eIdentity goes read-only",
    },
  },
  {
    phase: { ro: "Faza 2", en: "Phase 2" },
    period: { ro: "2027–2028", en: "2027–2028" },
    actions: {
      ro: "Front-door-urile unificate (Portal cetățean, Cutia Digitală, cont fiscal unic, Sănătatea mea); auth wallet la RECOM; portalurile legacy intră read-only",
      en: "Unified front doors (Citizen Portal, Digital Postbox, single tax account, My Health); wallet auth on RECOM; legacy portals go read-only",
    },
  },
  {
    phase: { ro: "Faza 3", en: "Phase 3" },
    period: { ro: "2028–2030", en: "2028–2030" },
    actions: {
      ro: "Dezafectare (eIdentity, programări duplicate, e-guvernare.ro); platforma UAT cu șabloane la nivel național; verificarea KPI-urilor",
      en: "Decommissioning (eIdentity, duplicate appointments, e-guvernare.ro); UAT templated platform nationwide; KPI checkpoints",
    },
  },
];

export const GOV_RULES: Bi[] = [
  {
    ro: "Regula identității: un singur login de stat (wallet); login-urile vechi sunt backstop max. 2 ani.",
    en: "Identity rule: one state login (wallet); legacy logins are a backstop for max. 2 years.",
  },
  {
    ro: "Regula plăților: orice taxă plătibilă public trece prin hub; niciun portal nou fără RTP.",
    en: "Payments rule: every public tax flows through the hub; no new portal without RTP.",
  },
  {
    ro: "Regula notificărilor: nimic nu se trimite cetățeanului decât prin canale de încredere (Cutia Digitală).",
    en: "Notifications rule: nothing reaches the citizen except through trusted channels (Digital Postbox).",
  },
  {
    ro: "Regula datelor: „once-only” — datele se cer o dată și se refolosesc la sursă (principiul belgian).",
    en: "Data rule: once-only — data is asked once and reused at the source (the Belgian principle).",
  },
];

export const KPIS: Bi[] = [
  {
    ro: "Portaluri tranzacționale pentru cetățean: de la ~40+ la 3 front-doors + 6 sectoriale (țintă 2028)",
    en: "Transactional citizen portals: from ~40+ to 3 front doors + 6 sectoral (target 2028)",
  },
  {
    ro: "≥80% dintre servicii cu autentificare wallet",
    en: "≥80% of services with wallet authentication",
  },
  {
    ro: "100% dintre plățile publice prin hub-ul național",
    en: "100% of public payments through the national hub",
  },
  {
    ro: "Un singur canal de notificare (Cutia Digitală)",
    en: "A single notification channel (Digital Postbox)",
  },
];

export const PILLARS: BulletGroup[] = [
  {
    title: { ro: "Redundanță ultra", en: "Ultra redundancy" },
    items: [
      {
        ro: "Tier 0: prezentările funcționează cu zero conectivitate (ISO 18013-5, date pe dispozitiv)",
        en: "Tier 0: presentations work with zero connectivity (ISO 18013-5, data on device)",
      },
      {
        ro: "Tier 1: model 2+1 — două DC active (zone seismice diferite) + al treilea site DR pasiv; RPO ≤ 5 min, RTO ≤ 30 min",
        en: "Tier 1: 2+1 model — two active DCs (different seismic zones) + a third passive DR site; RPO ≤ 5 min, RTO ≤ 30 min",
      },
      {
        ro: "HSM în cuorum M-din-N pe ≥2 situri (extinderea clusterului RWSCD existent)",
        en: "M-of-N quorum HSMs across ≥2 sites (extending the existing RWSCD cluster)",
      },
      {
        ro: "BGP anycast, doi carrieri diverși, DNSSEC, scut DDoS național (DNSC)",
        en: "BGP anycast, two diverse carriers, DNSSEC, national DDoS shield (DNSC)",
      },
      {
        ro: "Arhivă imutabilă WORM pentru retenție legală 10–50 ani",
        en: "WORM immutable archive for 10–50 year legal retention",
      },
      {
        ro: "Drills de haos trimestriale + test DR complet anual, impus prin lege, cu rezultate publicate",
        en: "Quarterly chaos drills + a full annual DR test mandated by law, with published results",
      },
    ],
  },
  {
    title: {
      ro: "Open source & colaborare",
      en: "Open source & collaboration",
    },
    items: [
      {
        ro: "Politică „bani publici, cod public”: EUPL-1.2 obligatoriu pentru L0–L6, ancorat în Interoperable Europe Act (2024/903)",
        en: "“Public money, public code” policy: EUPL-1.2 mandatory for L0–L6, anchored in the Interoperable Europe Act (2024/903)",
      },
      {
        ro: "Upstream-first: contribuții la EUDI Reference Implementation, X-Road/NIIS, FreeIPA, Fedora/OSTree — nu fork-uri",
        en: "Upstream-first: contributions to the EUDI Reference Implementation, X-Road/NIIS, FreeIPA, Fedora/OSTree — no forks",
      },
      {
        ro: "Repo-uri publice din prima zi, roadmap public, proces RFC pentru schimbări de API",
        en: "Public repos from day one, public roadmap, RFC process for API changes",
      },
      {
        ro: "Comitet tehnic de conducere cu societate civilă și sector privat; rapoarte publice trimestriale",
        en: "Technical steering committee with civil society and the private sector; quarterly public reports",
      },
      {
        ro: "SBOM, build-uri reproducibile SLSA L3, bug bounty public (stil EU-FOSSA), disclosure 90 de zile",
        en: "SBOMs, SLSA L3 reproducible builds, public bug bounty (EU-FOSSA style), 90-day disclosure",
      },
      {
        ro: "Inner source între ministere — o singură cultură de cod, fără licitații duplicate",
        en: "Inner source across ministries — one code culture, no duplicate tenders",
      },
    ],
  },
  {
    title: { ro: "Securitate", en: "Security" },
    items: [
      {
        ro: "Registrele nu sunt niciodată accesibile din internet — doar prin servere de securitate X-Road sau hub-uri WireGuard",
        en: "Registries are never reachable from the internet — only via X-Road security servers or WireGuard hubs",
      },
      {
        ro: "Default-deny est-vest per instituție; cuorum + semnare hardware-backed pentru acțiuni naționale distructive",
        en: "Per-institution east-west default-deny; quorum + hardware-backed signing for destructive national actions",
      },
      {
        ro: "Post-cuantic: hibrid X25519+ML-KEM acum, PQ complet pentru secrete long-lived până în 2030",
        en: "Post-quantum: hybrid X25519+ML-KEM now, full PQ for long-lived secrets by 2030",
      },
      {
        ro: "Ceremonii de chei trimestriale, control dual, înregistrate, cu observatori",
        en: "Quarterly key ceremonies, dual control, recorded, with observers",
      },
      {
        ro: "SIEM/SOC NIS2 cu retenție 1 an și corelare inter-instituțională; red team de 2×/an; model de amenințare public",
        en: "NIS2 SIEM/SOC with 1-year retention and cross-institution correlation; red team 2×/year; public threat model",
      },
    ],
  },
  {
    title: { ro: "Scalabilitate", en: "Scalability" },
    items: [
      {
        ro: "Volum estimat: 19M cetățeni × 5–20 tranzacții/lună = 300M–2 mld prezentări/an",
        en: "Estimated volume: 19M citizens × 5–20 transactions/month = 300M–2B presentations/year",
      },
      {
        ro: "Vârfuri (termene fiscale, alegeri): 10–20× media → 2–10k req/s susținut, 50–100k vârf — banal pentru un gateway modern",
        en: "Peaks (tax deadlines, elections): 10–20× mean → 2–10k req/s sustained, 50–100k peak — trivial for a modern gateway",
      },
      {
        ro: "Atestările sunt KB; listele de status MB; jurnalele GB–TB/an (<100 TB total)",
        en: "Attestations are KB; status lists MB; logs GB–TB/year (<100 TB total)",
      },
      {
        ro: "Ce nu scalează e integrarea: ~3.200 UAT-uri și zeci de registre — conectori standard, înrolare în valuri",
        en: "What doesn't scale is integration: ~3,200 UATs and dozens of registries — standard connectors, wave-based enrollment",
      },
      {
        ro: "Rollout L0 ca în propunerea endpoint: instalare USB, cod de înrolare, migrare chat-first, 8 săptămâni per primărie",
        en: "L0 rollout as in the endpoint proposal: USB install, enrollment code, chat-first migration, 8 weeks per town hall",
      },
    ],
  },
  {
    title: {
      ro: "Ancore de transparență (blockchain)",
      en: "Transparency anchors (blockchain)",
    },
    items: [
      {
        ro: "Principiu: doar hash-uri ale artefactelor nep-personale merg pe lanț — niciodată date personale (GDPR art. 17, dreptul la ștergere)",
        en: "Principle: only hashes of non-personal artifacts go on-chain — never personal data (GDPR art. 17, right to erasure)",
      },
      {
        ro: "Registrul STS: starea WRPRC/WRPAC ancorată la fiecare modificare — nimeni nu poate edita silențios",
        en: "STS registry: WRPRC/WRPAC state anchored on every change — nobody can edit silently",
      },
      {
        ro: "Binary transparency: SBOM/SLSA pentru fiecare build al wallet-ului și fiecare imagine OSTree — „aplicația din store e codul din repo?”",
        en: "Binary transparency: SBOM/SLSA for every wallet build and OSTree image — “is the store app the repo code?”",
      },
      {
        ro: "Ceremonii de chei, rapoarte SLA/incidente/achiziții — minute ancorate, verificabile de oricine",
        en: "Key ceremonies, SLA/incident/procurement reports — anchored minutes, verifiable by anyone",
      },
      {
        ro: "Lanțul trebuie să fie în afara controlului statului: lanț permisiv (Ethereum L1) + EBSI/Europeum, dublă ancorare (~cenți/anchor)",
        en: "The chain must be outside state control: permissionless chain (Ethereum L1) + EBSI/Europeum, dual anchoring (~cents/anchor)",
      },
      {
        ro: "Ce NU face blockchain-ul aici: disponibilitate (CDN/DC), confidențialitate (SD-JWT), scalare (gateway), identitate (OpenID4VC + status lists)",
        en: "What blockchain does NOT do here: availability (CDN/DC), confidentiality (SD-JWT), scaling (gateway), identity (OpenID4VC + status lists)",
      },
    ],
  },
  {
    title: {
      ro: "Rețele educaționale & civice",
      en: "Educational & civic networks",
    },
    items: [
      {
        ro: "Educație: universitățile și școlile devin emitenți QEAA; admiterea și înscrierile se verifică la sursă (MEN/REGES); dosarul electronic al elevului/studentului merge peste backbone",
        en: "Education: universities and schools become QEAA issuers; admission and enrolment verified at source (MEN/REGES); the student's e-record rides the backbone",
      },
      {
        ro: "Civic: ONG-urile și CivicTech primesc acces structurat la date publice, rapoarte și ancore — rol constituțional de verificare, nu spectator",
        en: "Civic: NGOs and CivicTech get structured access to public data, reports and anchors — a constitutional verification role, not a spectator",
      },
      {
        ro: "Adoptăm standardele comunității: CivicTech România Digital Services Playbook + Open Source Guidelines (i18n obligatoriu, cod în engleză, teste nelipsite, licență, diacritice)",
        en: "We adopt the community standards: CivicTech România Digital Services Playbook + Open Source Guidelines (mandatory i18n, code in English, tests required, licence, diacritics)",
      },
      {
        ro: "Portal educațional (admitere, diplome) și portal civic (date publice, verificare) intră în setul de portaluri naționale",
        en: "An education portal (admission, diplomas) and a civic portal (public data, verification) join the national portal set",
      },
      {
        ro: "Guvernanța ecosistemului include un loc permanent pentru societatea civilă și mediul academic în comitetul tehnic",
        en: "Ecosystem governance reserves permanent seats for civil society and academia on the technical committee",
      },
    ],
  },
];
