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
      ro: "SRE, securitate, inginerie, design, PM + echipe per instituție",
      en: "SRE, security, engineering, design, PM + per-institution squads",
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
];

export interface BulletGroup {
  title: Bi;
  items: Bi[];
}

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
    title: { ro: "Open source & colaborare", en: "Open source & collaboration" },
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
];
