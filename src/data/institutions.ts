import type { Bi } from "../i18n";

export type Category =
  | "user"
  | "identity"
  | "source"
  | "trust"
  | "infra"
  | "oversight"
  | "governance"
  | "service"
  | "backbone"
  | "payment"
  | "anchor"
  | "external";

export type Scope = "current" | "proposed" | "both";

export interface Institution {
  id: string;
  name: Bi;
  acronym: string;
  role: Bi;
  category: Category;
  county: string | "*" | "";
  lat?: number;
  lon?: number;
  scope: Scope;
}

export const CATEGORY_COLORS: Record<Category, string> = {
  user: "#e8edf4",
  identity: "#4f8cff",
  source: "#2ac7a3",
  trust: "#ffd166",
  infra: "#7d8aa0",
  oversight: "#ff6b6b",
  governance: "#b48cff",
  service: "#53c1e8",
  backbone: "#ffb020",
  payment: "#2ecc71",
  anchor: "#22d3ee",
  external: "#6b7a90",
};

export const CATEGORY_LABELS: Record<Category, Bi> = {
  user: { ro: "Cetățean / Wallet", en: "Citizen / Wallet" },
  identity: { ro: "Identitate", en: "Identity" },
  source: { ro: "Sursă autentică", en: "Authentic source" },
  trust: { ro: "Încredere / PKI", en: "Trust / PKI" },
  infra: { ro: "Infrastructură wallet", en: "Wallet infrastructure" },
  oversight: { ro: "Supraveghere", en: "Oversight" },
  governance: { ro: "Guvernanță", en: "Governance" },
  service: { ro: "Servicii", en: "Services" },
  backbone: { ro: "Backbone de date", en: "Data backbone" },
  payment: { ro: "Plăți", en: "Payments" },
  anchor: { ro: "Ancoră publică", en: "Public anchor" },
  external: { ro: "Extern (hărți/consulate)", en: "External (maps/consulates)" },
};

export const INSTITUTIONS: Institution[] = [
  {
    id: "citizen",
    name: { ro: "Cetățean + RO Wallet", en: "Citizen + RO Wallet" },
    acronym: "WI",
    role: {
      ro: "User / Wallet Instance pe dispozitiv",
      en: "User / Wallet Instance on device",
    },
    category: "user",
    county: "",
    scope: "both",
  },
  {
    id: "dgcti",
    name: { ro: "MAI – DGCTI", en: "MAI – DGCTI" },
    acronym: "DGCTI",
    role: {
      ro: "Wallet Provider (soluția tehnică, ciclu de viață)",
      en: "Wallet Provider (technical solution, lifecycle)",
    },
    category: "identity",
    county: "Bucuresti",
    lat: 44.444,
    lon: 26.12,
    scope: "both",
  },
  {
    id: "dgep",
    name: { ro: "MAI – DGEP", en: "MAI – DGEP" },
    acronym: "DGEP",
    role: {
      ro: "PID Provider (verifică identitatea, emite PID)",
      en: "PID Provider (verifies identity, issues PID)",
    },
    category: "identity",
    county: "Bucuresti",
    lat: 44.432,
    lon: 26.09,
    scope: "both",
  },
  {
    id: "rnep",
    name: {
      ro: "Registrul Național de Evidență a Persoanelor",
      en: "National Population Registry (RNEP)",
    },
    acronym: "RNEP",
    role: {
      ro: "Sursă autentică – identitate, adresă, stare civilă",
      en: "Authentic source – identity, address, civil status",
    },
    category: "source",
    county: "Bucuresti",
    lat: 44.421,
    lon: 26.105,
    scope: "both",
  },
  {
    id: "hub-mai",
    name: { ro: "HUB MAI", en: "HUB MAI" },
    acronym: "HUBMAI",
    role: {
      ro: "Servicii electronice MAI – relying party",
      en: "MAI e-services – relying party",
    },
    category: "service",
    county: "Bucuresti",
    lat: 44.435,
    lon: 26.115,
    scope: "both",
  },
  {
    id: "sts",
    name: {
      ro: "Serviciul de Telecomunicații Speciale",
      en: "Special Telecommunications Service (STS)",
    },
    acronym: "STS",
    role: {
      ro: "Registru național furnizori/RP, WRPRC/WRPAC, scheme de atestare",
      en: "National registry of providers/RPs, WRPRC/WRPAC, attestation schemes",
    },
    category: "trust",
    county: "Bucuresti",
    lat: 44.428,
    lon: 26.13,
    scope: "both",
  },
  {
    id: "medat",
    name: {
      ro: "Ministerul Economiei și Digitalizării",
      en: "Ministry of Economy and Digitalisation (MEDAT)",
    },
    acronym: "MEDAT",
    role: {
      ro: "Guvernanță ecosistem, punct unic de contact cu CE",
      en: "Ecosystem governance, single point of contact with the EC",
    },
    category: "governance",
    county: "Bucuresti",
    lat: 44.44,
    lon: 26.135,
    scope: "both",
  },
  {
    id: "adr",
    name: {
      ro: "Autoritatea pentru Digitalizarea României",
      en: "Authority for the Digitalisation of Romania (ADR)",
    },
    acronym: "ADR",
    role: {
      ro: "Supraveghere QTSP, Liste de Încredere",
      en: "QTSP supervision, Trust Lists",
    },
    category: "oversight",
    county: "Bucuresti",
    lat: 44.415,
    lon: 26.095,
    scope: "both",
  },
  {
    id: "dgpi",
    name: { ro: "MAI – DGPI", en: "MAI – DGPI" },
    acronym: "DGPI",
    role: {
      ro: "Supervizare securitate cibernetică wallet (intern MAI)",
      en: "Wallet cybersecurity supervision (internal to MAI)",
    },
    category: "oversight",
    county: "Bucuresti",
    lat: 44.448,
    lon: 26.08,
    scope: "both",
  },
  {
    id: "wb",
    name: { ro: "Wallet Provider Backend", en: "Wallet Provider Backend" },
    acronym: "WB",
    role: {
      ro: "Revocare WI, atestări WIA, status lists, HSM",
      en: "WI revocation, WIA attestations, status lists, HSM",
    },
    category: "infra",
    county: "Bucuresti",
    lat: 44.405,
    lon: 26.11,
    scope: "both",
  },
  {
    id: "mdvm",
    name: {
      ro: "Mobile Device Vulnerability Mgmt",
      en: "Mobile Device Vulnerability Mgmt",
    },
    acronym: "MDVM",
    role: {
      ro: "Atestări platformă, clase de dispozitive, tokenuri vulnerabilitate",
      en: "Platform attestations, device classes, vulnerability tokens",
    },
    category: "infra",
    county: "Bucuresti",
    lat: 44.397,
    lon: 26.09,
    scope: "both",
  },
  {
    id: "rwsca",
    name: { ro: "Remote WSCA / WSCD (HSM)", en: "Remote WSCA / WSCD (HSM)" },
    acronym: "RWSCA",
    role: {
      ro: "Chei critice ale wallet-ului în HSM remote",
      en: "Critical wallet keys in remote HSM",
    },
    category: "infra",
    county: "Bucuresti",
    lat: 44.411,
    lon: 26.125,
    scope: "both",
  },
  {
    id: "mpp",
    name: { ro: "Mobile Platform Providers", en: "Mobile Platform Providers" },
    acronym: "MPP",
    role: {
      ro: "Apple / Google – push și atestări de platformă",
      en: "Apple / Google – push and platform attestations",
    },
    category: "external",
    county: "",
    scope: "both",
  },
  {
    id: "qtsp",
    name: {
      ro: "QTSP (furnizori calificați)",
      en: "QTSPs (qualified trust providers)",
    },
    acronym: "QTSP",
    role: {
      ro: "QES gratuit pentru uz non-profesional + servicii comerciale",
      en: "Free QES for non-professional use + commercial services",
    },
    category: "trust",
    county: "Bucuresti",
    lat: 44.452,
    lon: 26.115,
    scope: "both",
  },
  {
    id: "rp",
    name: { ro: "Relying Parties", en: "Relying Parties" },
    acronym: "RP",
    role: {
      ro: "Bănci, telecom, utilități, asigurători, instituții",
      en: "Banks, telecoms, utilities, insurers, institutions",
    },
    category: "service",
    county: "Bucuresti",
    lat: 44.438,
    lon: 26.062,
    scope: "both",
  },
  {
    id: "xroad",
    name: {
      ro: "Backbone național de date (X-Road)",
      en: "National data backbone (X-Road)",
    },
    acronym: "XROAD",
    role: {
      ro: "Schimb securizat de date între registre, cu consimțământ",
      en: "Secure inter-registry data exchange, consent-based",
    },
    category: "backbone",
    county: "Bucuresti",
    lat: 44.4268,
    lon: 26.1025,
    scope: "proposed",
  },
  {
    id: "cnas",
    name: { ro: "CNAS", en: "CNAS (health insurance)" },
    acronym: "CNAS",
    role: {
      ro: "Sursă autentică sănătate – atestări medicale",
      en: "Health authentic source – medical attestations",
    },
    category: "source",
    county: "Bucuresti",
    lat: 44.412,
    lon: 26.142,
    scope: "proposed",
  },
  {
    id: "anaf",
    name: { ro: "ANAF", en: "ANAF (tax agency)" },
    acronym: "ANAF",
    role: { ro: "Sursă autentică fiscală", en: "Tax authentic source" },
    category: "source",
    county: "Bucuresti",
    lat: 44.456,
    lon: 26.055,
    scope: "proposed",
  },
  {
    id: "onrc",
    name: { ro: "ONRC", en: "ONRC (trade registry)" },
    acronym: "ONRC",
    role: {
      ro: "Sursă autentică firme",
      en: "Companies registry authentic source",
    },
    category: "source",
    county: "Bucuresti",
    lat: 44.415,
    lon: 26.148,
    scope: "proposed",
  },
  {
    id: "men",
    name: {
      ro: "Ministerul Educației",
      en: "Ministry of Education (MEN)",
    },
    acronym: "MEN",
    role: {
      ro: "Sursă autentică studii – QEAA diplome",
      en: "Education authentic source – diploma QEAA",
    },
    category: "source",
    county: "Bucuresti",
    lat: 44.438,
    lon: 26.155,
    scope: "proposed",
  },
  {
    id: "postbox",
    name: { ro: "Cutia Digitală", en: "Digital Postbox" },
    acronym: "POSTBOX",
    role: {
      ro: "Cutie poștală legală a cetățeanului",
      en: "The citizen's legal mailbox",
    },
    category: "service",
    county: "Bucuresti",
    lat: 44.452,
    lon: 26.098,
    scope: "proposed",
  },
  {
    id: "bnr",
    name: { ro: "BNR", en: "National Bank of Romania (BNR)" },
    acronym: "BNR",
    role: {
      ro: "Supraveghere sisteme de plăți",
      en: "Payment systems oversight",
    },
    category: "oversight",
    county: "Bucuresti",
    lat: 44.4335,
    lon: 26.0993,
    scope: "proposed",
  },
  {
    id: "transfond",
    name: { ro: "TRANSFOND / PSP", en: "TRANSFOND / PSPs" },
    acronym: "PSP",
    role: {
      ro: "SEPA Instant, Alia, Request-to-Pay",
      en: "SEPA Instant, Alia, Request-to-Pay",
    },
    category: "payment",
    county: "Bucuresti",
    lat: 44.419,
    lon: 26.067,
    scope: "proposed",
  },
  {
    id: "dnsc",
    name: { ro: "DNSC", en: "DNSC (national CERT)" },
    acronym: "DNSC",
    role: {
      ro: "CERT național, SOC, coordonare incidente",
      en: "National CERT, SOC, incident coordination",
    },
    category: "oversight",
    county: "Bucuresti",
    lat: 44.401,
    lon: 26.135,
    scope: "proposed",
  },
  {
    id: "anspdcp",
    name: { ro: "ANSPDCP", en: "ANSPDCP (data protection)" },
    acronym: "DPA",
    role: {
      ro: "Supraveghere protecția datelor, DPIA",
      en: "Data protection supervision, DPIA",
    },
    category: "oversight",
    county: "Bucuresti",
    lat: 44.46,
    lon: 26.09,
    scope: "proposed",
  },
  {
    id: "uat",
    name: {
      ro: "Primării / consilii județene",
      en: "Town halls / county councils",
    },
    acronym: "UAT",
    role: {
      ro: "Emitere asistată, ghișeu fizic, fallback offline",
      en: "Assisted issuance, physical desk, offline fallback",
    },
    category: "service",
    county: "*",
    scope: "proposed",
  },
  {
    id: "consulate",
    name: { ro: "Consulate", en: "Consulates" },
    acronym: "CONS",
    role: {
      ro: "Onboarding diaspora, verificare identitate la distanță",
      en: "Diaspora onboarding, remote identity verification",
    },
    category: "external",
    county: "",
    scope: "proposed",
  },
  {
    id: "anchor",
    name: {
      ro: "Ancoră publică de transparență (lanț permisiv + EBSI)",
      en: "Public transparency anchor (permissionless chain + EBSI)",
    },
    acronym: "ANCORĂ",
    role: {
      ro: "Doar hash-uri de artefacte nep-personale: registru, build-uri, ceremonii, SLA",
      en: "Only hashes of non-personal artifacts: registry, builds, ceremonies, SLAs",
    },
    category: "anchor",
    county: "",
    scope: "proposed",
  },
  {
    id: "hub-l0",
    name: {
      ro: "Hub suveran L0 (endpoint-uri)",
      en: "Sovereign L0 hub (endpoints)",
    },
    acronym: "HUBL0",
    role: {
      ro: "OSTree, FreeIPA, Matrix, WireGuard – infrastructura stațiilor de lucru",
      en: "OSTree, FreeIPA, Matrix, WireGuard – workstation infrastructure",
    },
    category: "infra",
    county: "Bucuresti",
    lat: 44.391,
    lon: 26.12,
    scope: "proposed",
  },
  {
    id: "transparency",
    name: {
      ro: "Portal de transparență",
      en: "Transparency portal",
    },
    acronym: "TRANSP",
    role: {
      ro: "Rapoarte publice: audituri, uptime, ceremonii de chei, achiziții",
      en: "Public reports: audits, uptime, key ceremonies, procurement",
    },
    category: "service",
    county: "Bucuresti",
    lat: 44.466,
    lon: 26.075,
    scope: "proposed",
  },
];
