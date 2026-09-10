import type { Bi } from "../i18n";

export interface EuSystem {
  key: string;
  name: Bi;
  country: Bi;
  ours?: boolean;
}

export const EU_SYSTEMS: EuSystem[] = [
  {
    key: "xroad",
    name: { ro: "X-Road", en: "X-Road" },
    country: { ro: "Estonia (+ alte state)", en: "Estonia (+ other states)" },
  },
  {
    key: "digid",
    name: { ro: "DigiD", en: "DigiD" },
    country: { ro: "Țările de Jos", en: "Netherlands" },
  },
  {
    key: "itsme",
    name: { ro: "itsme", en: "itsme" },
    country: { ro: "Belgia", en: "Belgium" },
  },
  {
    key: "mitid",
    name: { ro: "MitID", en: "MitID" },
    country: { ro: "Danemarca", en: "Denmark" },
  },
  {
    key: "mobywatel",
    name: { ro: "mObywatel", en: "mObywatel" },
    country: { ro: "Polonia", en: "Poland" },
  },
  {
    key: "govgr",
    name: { ro: "Gov.gr Wallet", en: "Gov.gr Wallet" },
    country: { ro: "Grecia", en: "Greece" },
  },
  {
    key: "eudi",
    name: { ro: "EUDI Wallet", en: "EUDI Wallet" },
    country: { ro: "Uniunea Europeană (cadru)", en: "European Union (framework)" },
  },
  {
    key: "ours",
    name: { ro: "Propunerea noastră", en: "Our proposal" },
    country: { ro: "România (design)", en: "Romania (design)" },
    ours: true,
  },
];

export interface EuMatrixRow {
  dimension: Bi;
  cells: Record<string, Bi>;
}

export const EU_MATRIX: EuMatrixRow[] = [
  {
    dimension: { ro: "Scop principal", en: "Main purpose" },
    cells: {
      xroad: {
        ro: "Schimb de date între instituții, federat, fără depozit central",
        en: "Federated institution-to-institution data exchange, no central store",
      },
      digid: {
        ro: "Autentificare națională pentru serviciile publice",
        en: "National login for public services",
      },
      itsme: {
        ro: "Identitate mobilă: autentificare, confirmare, semnare",
        en: "Mobile identity: login, confirmation, signing",
      },
      mitid: {
        ro: "Autentificare națională + aprobări și semnătură",
        en: "National login + approvals and signature",
      },
      mobywatel: {
        ro: "Portofel cu documente oficiale + servicii publice",
        en: "Wallet with official documents + public services",
      },
      govgr: {
        ro: "Copii digitale ale documentelor de stat + autentificare",
        en: "Digital copies of state documents + login",
      },
      eudi: {
        ro: "Cadru european comun pentru portofelul de identitate",
        en: "Common European framework for the identity wallet",
      },
      ours: {
        ro: "Portofel EUDI + backbone național de date + plăți + strat offline",
        en: "EUDI wallet + national data backbone + payments + offline layer",
      },
    },
  },
  {
    dimension: { ro: "Arhitectură", en: "Architecture" },
    cells: {
      xroad: {
        ro: "Federată, peer-to-peer (security servers), niciun depozit central",
        en: "Federated, peer-to-peer (security servers), no central store",
      },
      digid: {
        ro: "Centralizată la nivel național (Logius)",
        en: "Centralised at national level (Logius)",
      },
      itsme: {
        ro: "Consorțiu privat (bănci + operatori), certificat de stat",
        en: "Private consortium (banks + telcos), state-certified",
      },
      mitid: {
        ro: "Centralizată (agenția de digitalizare + sectorul bancar)",
        en: "Centralised (digitisation agency + banking sector)",
      },
      mobywatel: {
        ro: "Portofel național centralizat (ministerul digitalizării)",
        en: "Centralised national wallet (digitalisation ministry)",
      },
      govgr: {
        ro: "Centralizată (ministerul guvernării digitale)",
        en: "Centralised (digital governance ministry)",
      },
      eudi: {
        ro: "Cadru descentralizat; fiecare stat își operează propriul portofel",
        en: "Decentralised framework; each state runs its own wallet",
      },
      ours: {
        ro: "Portofel descentralizat + backbone federat tip X-Road + 3+8+1+L0",
        en: "Decentralised wallet + X-Road-style federated backbone + 3+8+1+L0",
      },
    },
  },
  {
    dimension: {
      ro: "Identitate (nivel de asigurare)",
      en: "Identity (assurance level)",
    },
    cells: {
      xroad: {
        ro: "Fără identitate pentru cetățean; depinde de eID-ul național",
        en: "No citizen identity; relies on the national eID",
      },
      digid: {
        ro: "LoA Substantial și High, chei publice sau card",
        en: "LoA Substantial and High, keys or card",
      },
      itsme: {
        ro: "LoA High, notificat conform eIDAS",
        en: "LoA High, eIDAS-notified",
      },
      mitid: {
        ro: "LoA Substantial și High (aplicație + pașaport)",
        en: "LoA Substantial and High (app + passport)",
      },
      mobywatel: {
        ro: "LoA Substantial; mDowód (LoA High) în extindere",
        en: "LoA Substantial; mDowód (LoA High) rolling out",
      },
      govgr: {
        ro: "LoA Substantial+ prin credențiale TaxisNet",
        en: "LoA Substantial+ via TaxisNet credentials",
      },
      eudi: {
        ro: "PID obligatoriu la LoA High (SD-JWT/ISO 18013-5)",
        en: "PID mandatory at LoA High (SD-JWT/ISO 18013-5)",
      },
      ours: {
        ro: "PID LoA High + pseudonime pairwise pentru fiecare RP",
        en: "PID LoA High + pairwise pseudonyms per RP",
      },
    },
  },
  {
    dimension: {
      ro: "Schimb de date instituțional",
      en: "Institutional data exchange",
    },
    cells: {
      xroad: {
        ro: "Modelul de referință: ≈2.900 de instituții conectate în Estonia, milioane de interogări zilnice",
        en: "The reference model: ≈2,900 connected institutions in Estonia, millions of daily queries",
      },
      digid: {
        ro: "Nu este scopul; integrări punctuale",
        en: "Not its purpose; point integrations",
      },
      itsme: {
        ro: "Nu este scopul",
        en: "Not its purpose",
      },
      mitid: {
        ro: "Limitat (broker pentru instituții)",
        en: "Limited (broker for institutions)",
      },
      mobywatel: {
        ro: "Parțial (corespondență electronică e-Doręczenia)",
        en: "Partial (e-Doręczenia electronic delivery)",
      },
      govgr: {
        ro: "Parțial (interoperabilitatea registrelor, G-Cloud)",
        en: "Partial (registry interoperability, G-Cloud)",
      },
      eudi: {
        ro: "În afara cadrului; doar atestări către cetățean",
        en: "Out of scope; attestations to citizens only",
      },
      ours: {
        ro: "Backbone național: toate registrele, consimțământ la gateway, audit",
        en: "National backbone: all registries, gateway consent, audit",
      },
    },
  },
  {
    dimension: { ro: "Plăți publice", en: "Public payments" },
    cells: {
      xroad: { ro: "Nu", en: "No" },
      digid: { ro: "Nu (iDEAL separat)", en: "No (iDEAL is separate)" },
      itsme: {
        ro: "Confirmări de plată în banking; nu taxe publice",
        en: "Banking payment confirmations; not public fees",
      },
      mitid: {
        ro: "Aprobări de plată în banking; nu taxe publice",
        en: "Banking payment approvals; not public fees",
      },
      mobywatel: {
        ro: "Parțial (BLIK integrat, taxe selecte)",
        en: "Partial (integrated BLIK, selected fees)",
      },
      govgr: {
        ro: "Taxe de stat prin e-Paravolo (parțial)",
        en: "State fees via e-Paravolo (partial)",
      },
      eudi: {
        ro: "În afara cadrului; RTP nu este standardizat",
        en: "Out of scope; RTP not standardised",
      },
      ours: {
        ro: "SEPA Instant + RTP în portofel, pregătit pentru euro digital",
        en: "SEPA Instant + RTP in the wallet, digital-euro ready",
      },
    },
  },
  {
    dimension: { ro: "Funcționare offline", en: "Offline operation" },
    cells: {
      xroad: {
        ro: "Depinde de rețea; funcționează fără cloud public",
        en: "Network-dependent; no public cloud",
      },
      digid: { ro: "Doar online", en: "Online only" },
      itsme: { ro: "Doar online", en: "Online only" },
      mitid: { ro: "Doar online", en: "Online only" },
      mobywatel: {
        ro: "Documentele din portofel funcționează offline",
        en: "Wallet documents work offline",
      },
      govgr: {
        ro: "Documentele din portofel funcționează offline",
        en: "Wallet documents work offline",
      },
      eudi: {
        ro: "Atestările funcționează offline; emiterea cere rețea",
        en: "Attestations work offline; issuance needs the network",
      },
      ours: {
        ro: "Portofel offline + L0 sincronizat de 2×/an, funcțional fără internet",
        en: "Offline wallet + L0 synced twice a year, works without internet",
      },
    },
  },
  {
    dimension: { ro: "Reziliență / DR", en: "Resilience / DR" },
    cells: {
      xroad: {
        ro: "HA per nod; fiecare stat își operează infrastructura",
        en: "HA per node; each state runs its own infrastructure",
      },
      digid: {
        ro: "Redundanță națională (mai multe locații)",
        en: "National redundancy (multiple sites)",
      },
      itsme: {
        ro: "SLA-urile consorțiului; detalii limitate public",
        en: "Consortium SLAs; limited public detail",
      },
      mitid: {
        ro: "Redundanță națională",
        en: "National redundancy",
      },
      mobywatel: {
        ro: "Centralizat; DR declarat, fără detalii publice",
        en: "Centralised; DR declared, no public details",
      },
      govgr: {
        ro: "Centralizat; DR declarat, fără detalii publice",
        en: "Centralised; DR declared, no public details",
      },
      eudi: {
        ro: "Decide fiecare stat membru",
        en: "Each member state decides",
      },
      ours: {
        ro: "3 DC-uri active-active + 8 micro-DC + salină (arhivă) + L0",
        en: "3 active-active DCs + 8 micro-DCs + salt-mine archive + L0",
      },
    },
  },
  {
    dimension: {
      ro: "Confidențialitate / anti-corelare",
      en: "Privacy / anti-correlation",
    },
    cells: {
      xroad: {
        ro: "Jurnale de audit; temei legal obligatoriu per interogare",
        en: "Audit logs; a legal basis required per query",
      },
      digid: {
        ro: "Dezvăluire minimă pe serviciu",
        en: "Minimal disclosure per service",
      },
      itsme: {
        ro: "Fără profilare declarată; datele rămân în Belgia",
        en: "No profiling (declared); data stays in Belgium",
      },
      mitid: {
        ro: "Dezvăluire minimă",
        en: "Minimal disclosure",
      },
      mobywatel: {
        ro: "Datele în Polonia; istoric local, fără urmărire declarată",
        en: "Data in Poland; local history, no declared tracking",
      },
      govgr: {
        ro: "Fără urmărire declarată",
        en: "No declared tracking",
      },
      eudi: {
        ro: "Dezvăluire selectivă + interdicția profilării",
        en: "Selective disclosure + profiling ban",
      },
      ours: {
        ro: "Pseudonime pairwise, fără jurnale centrale de prezentare, ancore publice hash-only",
        en: "Pairwise pseudonyms, no central presentation logs, hash-only public anchors",
      },
    },
  },
  {
    dimension: { ro: "Open source", en: "Open source" },
    cells: {
      xroad: { ro: "Da, licență MIT (NIIS)", en: "Yes, MIT licence (NIIS)" },
      digid: { ro: "Nu", en: "No" },
      itsme: { ro: "Nu", en: "No" },
      mitid: {
        ro: "Nu (SDK public, nucleu închis)",
        en: "No (public SDK, closed core)",
      },
      mobywatel: {
        ro: "Parțial (componente publice)",
        en: "Partial (public components)",
      },
      govgr: { ro: "Nu", en: "No" },
      eudi: {
        ro: "Implementări de referință cu licență deschisă + ARF public",
        en: "Open-licensed reference implementations + public ARF",
      },
      ours: {
        ro: "Tot codul EUPL: portofel, SDK-uri, RP-uri de referință, build-uri reproducibile",
        en: "All code EUPL: wallet, SDKs, reference RPs, reproducible builds",
      },
    },
  },
  {
    dimension: {
      ro: "Semnătură calificată (QES)",
      en: "Qualified signature (QES)",
    },
    cells: {
      xroad: { ro: "Nu (în afara scopului)", en: "No (out of scope)" },
      digid: { ro: "Nu nativ", en: "Not native" },
      itsme: {
        ro: "Da, utilizată larg (itsme sign)",
        en: "Yes, widely used (itsme sign)",
      },
      mitid: {
        ro: "Da, prin furnizori (în special companii)",
        en: "Yes, via providers (mostly businesses)",
      },
      mobywatel: {
        ro: "Podpis Zaufany gratuit (non-QES); QES în extindere",
        en: "Free Podpis Zaufany (non-QES); QES rolling out",
      },
      govgr: {
        ro: "Da, prin furnizori autorizați",
        en: "Yes, via authorised providers",
      },
      eudi: {
        ro: "QES gratuită obligatorie pentru persoane fizice",
        en: "Free QES mandatory for natural persons",
      },
      ours: {
        ro: "QES gratuită (uz non-profesional) prin QTSP + ancore publice",
        en: "Free QES (non-professional) via QTSPs + public anchors",
      },
    },
  },
  {
    dimension: {
      ro: "Incluziune (fără smartphone)",
      en: "Inclusion (no smartphone)",
    },
    cells: {
      xroad: {
        ro: "N/A pentru cetățeni",
        en: "N/A for citizens",
      },
      digid: {
        ro: "Da: DigiD SMS/desktop, ghișeu",
        en: "Yes: DigiD SMS/desktop, counter",
      },
      itsme: {
        ro: "Necesită smartphone",
        en: "Smartphone required",
      },
      mitid: {
        ro: "Da: MitID code display, card",
        en: "Yes: MitID code display, card",
      },
      mobywatel: {
        ro: "Necesită smartphone",
        en: "Smartphone required",
      },
      govgr: {
        ro: "Web prin coduri TaxisNet; app pentru documente",
        en: "Web via TaxisNet codes; app for documents",
      },
      eudi: {
        ro: "Statele decid; ghiduri de incluziune la nivel UE",
        en: "Member states decide; EU inclusion guidance",
      },
      ours: {
        ro: "Fluxuri asistate, ghișeu, diaspora prin consulate, WCAG",
        en: "Assisted flows, counter, diaspora via consulates, WCAG",
      },
    },
  },
  {
    dimension: {
      ro: "Maturitate & adopție",
      en: "Maturity & adoption",
    },
    cells: {
      xroad: {
        ro: "În producție din 2001; folosit și de Finlanda, Islanda ș.a.",
        en: "In production since 2001; also used by Finland, Iceland and others",
      },
      digid: {
        ro: "Din 2003; ≈14 mil. de conturi",
        en: "Since 2003; ≈14M accounts",
      },
      itsme: {
        ro: "Din 2017; ≈7 mil. de utilizatori",
        en: "Since 2017; ≈7M users",
      },
      mitid: {
        ro: "Din 2021 (înlocuiește NemID); ≈5 mil. de utilizatori",
        en: "Since 2021 (replaces NemID); ≈5M users",
      },
      mobywatel: {
        ro: "Din 2017; >10 mil. de utilizatori",
        en: "Since 2017; >10M users",
      },
      govgr: {
        ro: "Din 2022; >4 mil. de utilizatori",
        en: "Since 2022; >4M users",
      },
      eudi: {
        ro: "Cadrul legal în vigoare din 2024; portofele în toate statele până la sfârșitul lui 2026",
        en: "Legal framework in force since 2024; wallets in all member states by end-2026",
      },
      ours: {
        ro: "Propunere (2026); faze de 12/24/36 de luni",
        en: "Proposal (2026); 12/24/36-month phases",
      },
    },
  },
];
