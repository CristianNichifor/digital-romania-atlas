export interface Layer {
  id: string;
  name: string;
  what: string;
  owner: string;
  status: "in-flight" | "proposal" | "partial";
}

export const LAYERS: Layer[] = [
  {
    id: "L0",
    name: "Endpoint-uri suverane",
    what: "Desktop Linux imutabil, office, chat, email, AI cu guardrails (Fedora Silverblue, WireGuard, FreeIPA, Matrix, Nextcloud, ONLYOFFICE)",
    owner: "ADR + operațiuni per UAT",
    status: "proposal",
  },
  {
    id: "L1",
    name: "Rețea suverană",
    what: "Mesh WireGuard, hub per instituție, segmentare est-vest, DNS/PKI intern (.gov.intern)",
    owner: "STS",
    status: "proposal",
  },
  {
    id: "L2",
    name: "Identitate",
    what: "RO Wallet / EUDI — PID, QEAA, QES",
    owner: "MAI (DGCTI/DGEP)",
    status: "in-flight",
  },
  {
    id: "L3",
    name: "Backbone de date",
    what: "Schimb securizat tip X-Road, gateway de consimțământ, catalog național de date",
    owner: "STS / ADR",
    status: "proposal",
  },
  {
    id: "L4",
    name: "Servicii & portaluri",
    what: "Portal cetățean, cutia poștală digitală, portal dezvoltatori",
    owner: "MEDAT / ADR",
    status: "partial",
  },
  {
    id: "L5",
    name: "Plăți",
    what: "SEPA Instant + Request-to-Pay în wallet, hub de plăți publice",
    owner: "BNR + TRANSFOND + ADR",
    status: "proposal",
  },
  {
    id: "L6",
    name: "Supraveghere",
    what: "SOC DNSC, ANSPDCP, audituri publice, portal de transparență",
    owner: "independent",
    status: "partial",
  },
];

export interface CostRow {
  item: string;
  estimate: string;
  notes: string;
}

export const COSTS: CostRow[] = [
  {
    item: "Construcție backbone (L1–L5)",
    estimate: "80–150M € capex",
    notes: "DC-uri, HSM, gateway, cutie poștală, portaluri",
  },
  {
    item: "Integrare registre (CNAS, ANAF, ONRC, MEN…)",
    estimate: "30–60M € capex",
    notes: "echipe conector per minister",
  },
  {
    item: "Rollout endpoint L0",
    estimate: "20–40M €",
    notes: "servicii și training; licențe ≈ 0",
  },
  {
    item: "Opex anual",
    estimate: "25–45M €/an",
    notes: "infrastructură, operațiuni, securitate, suport",
  },
  {
    item: "Echipă centrală",
    estimate: "150–250 FTE",
    notes: "SRE, securitate, inginerie, design, PM + echipe per instituție",
  },
  {
    item: "Securitate / audituri / bug bounty",
    estimate: "3–5M €/an",
    notes: "inclusiv certificare eIDAS",
  },
  {
    item: "Cost per cetățean",
    estimate: "~2–3 €/an",
    notes: "comparabil cu estimările EUDI la nivel UE (~4,5 mld € capex)",
  },
  {
    item: "Economii potențiale",
    estimate: "30–60M €/an",
    notes: "eliminarea a 250–400k licențe Windows/O365; precedent: Jandarmeria Franceză, Schleswig-Holstein",
  },
];

export interface Portal {
  id: string;
  name: string;
  what: string;
}

export const PORTALS: Portal[] = [
  {
    id: "p1",
    name: "Portal cetățean unificat",
    what: "Ghiseul.ro v2, evenimente de viață wallet-first",
  },
  {
    id: "p2",
    name: "Cutia Digitală",
    what: "Cutie poștală legală web + inbox în wallet",
  },
  {
    id: "p3",
    name: "Portal dezvoltatori",
    what: "Catalog API, sandbox, SDK-uri, documentație — developers.gov.ro",
  },
  {
    id: "p4",
    name: "Portal furnizori / RP",
    what: "Registrul STS self-service: onboarding, KYC, WRPRC/WRPAC, scheme de atestare",
  },
  {
    id: "p5",
    name: "Portal instituții",
    what: "Catalog de date, operațiuni de consimțământ, deploy conectori pentru registre",
  },
  {
    id: "p6",
    name: "Portal operațional",
    what: "Pagină publică de status, SLO-uri, incidente — status.gov.ro",
  },
  {
    id: "p7",
    name: "Portal transparență",
    what: "Rapoarte de audit, uptime, cheltuieli, procese-verbale ceremonii chei, rezultate bounty",
  },
  {
    id: "p8",
    name: "Hub plăți publice",
    what: "Reconciliere plăți sector public, e-mandat, QR EPC",
  },
  {
    id: "p9",
    name: "Portal diaspora",
    what: "Servicii consulare, verificare identitate la distanță",
  },
  {
    id: "p10",
    name: "Portal business",
    what: "Integrare ONRC / e-Factura prin backbone",
  },
  {
    id: "p11",
    name: "API liste de încredere + verificator",
    what: "Oricine poate verifica orice RP, offline",
  },
  {
    id: "p12",
    name: "Suport & puncte asistate",
    what: "Programări la poștă / primărie pentru emitere asistată — plasa de siguranță fizică",
  },
];

export interface BulletGroup {
  title: string;
  items: string[];
}

export const PILLARS: BulletGroup[] = [
  {
    title: "Redundanță ultra",
    items: [
      "Tier 0: prezentările funcționează cu zero conectivitate (ISO 18013-5, date pe dispozitiv)",
      "Tier 1: model 2+1 — două DC active (zone seismice diferite) + al treilea site DR pasiv; RPO ≤ 5 min, RTO ≤ 30 min",
      "HSM în cuorum M-din-N pe ≥2 situri (extinderea clusterului RWSCD existent)",
      "BGP anycast, doi carrieri diverși, DNSSEC, scut DDoS național (DNSC)",
      "Arhivă imutabilă WORM pentru retenție legală 10–50 ani",
      "Drills de haos trimestriale + test DR complet anual, impus prin lege, cu rezultate publicate",
    ],
  },
  {
    title: "Open source & colaborare",
    items: [
      "Politică „bani publici, cod public”: EUPL-1.2 obligatoriu pentru L0–L6, ancorat în Interoperable Europe Act (2024/903)",
      "Upstream-first: contribuții la EUDI Reference Implementation, X-Road/NIIS, FreeIPA, Fedora/OSTree — nu fork-uri",
      "Repo-uri publice din prima zi, roadmap public, proces RFC pentru schimbări de API",
      "Comitet tehnic de conducere cu societate civilă și sector privat; rapoarte publice trimestriale",
      "SBOM, build-uri reproducibile SLSA L3, bug bounty public (stil EU-FOSSA), disclosure 90 de zile",
      "Inner source între ministere — o singură cultură de cod, fără licitații duplicate",
    ],
  },
  {
    title: "Securitate",
    items: [
      "Registrele nu sunt niciodată accesibile din internet — doar prin servere de securitate X-Road sau hub-uri WireGuard",
      "Default-deny est-vest per instituție; cuorum + semnare hardware-backed pentru acțiuni naționale distructive",
      "Post-cuantic: hibrid X25519+ML-KEM acum, PQ complet pentru secrete long-lived până în 2030",
      "Ceremonii de chei trimestriale, control dual, înregistrate, cu observatori",
      "SIEM/SOC NIS2 cu retenție 1 an și corelare inter-instituțională; red team de 2×/an; model de amenințare public",
    ],
  },
  {
    title: "Scalabilitate",
    items: [
      "Volum estimat: 19M cetățeni × 5–20 tranzacții/lună = 300M–2 mld prezentări/an",
      "Vârfuri (termene fiscale, alegeri): 10–20× media → 2–10k req/s susținut, 50–100k vârf — banal pentru un gateway modern",
      "Atestările sunt KB; listele de status MB; jurnalele GB–TB/an (<100 TB total)",
      "Ce nu scalează e integrarea: ~3.200 UAT-uri și zeci de registre — conectori standard, înrolare în valuri",
      "Rollout L0 ca în propunerea endpoint: instalare USB, cod de înrolare, migrare chat-first, 8 săptămâni per primărie",
    ],
  },
  {
    title: "Ancore de transparență (blockchain)",
    items: [
      "Principiu: doar hash-uri ale artefactelor nep-personale merg pe lanț — niciodată date personale (GDPR art. 17, dreptul la ștergere)",
      "Registrul STS: starea WRPRC/WRPAC ancorată la fiecare modificare — nimeni nu poate edita silențios",
      "Binary transparency: SBOM/SLSA pentru fiecare build al wallet-ului și fiecare imagine OSTree — „aplicația din store e codul din repo?”",
      "Ceremonii de chei, rapoarte SLA/incidente/achiziții — minute ancorate, verificabile de oricine",
      "Lanțul trebuie să fie în afara controlului statului: lanț permisiv (Ethereum L1) + EBSI/Europeum, dublă ancorare (~cenți/anchor)",
      "Ce NU face blockchain-ul aici: disponibilitate (CDN/DC), confidențialitate (SD-JWT), scalare (gateway), identitate (OpenID4VC + status lists)",
    ],
  },
];
