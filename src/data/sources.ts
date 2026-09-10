import type { Bi } from "../i18n";

export interface Source {
  claim: Bi;
  kind: Bi;
  url?: string;
  note?: Bi;
}

export const SOURCES: Source[] = [
  {
    claim: {
      ro: "Documentația arhitecturală RO Wallet — roluri, componente, fluxuri (PID, Wallet Backend, MDVM, RWSCA/RWSCD, MQ, PNS)",
      en: "RO Wallet architecture documentation — roles, components, flows (PID, Wallet Backend, MDVM, RWSCA/RWSCD, MQ, PNS)",
    },
    kind: { ro: "Repo public (MAI)", en: "Public repo (MAI)" },
    url: "https://github.com/Ministerul-Afacerilor-Interne/rowallet-documentation",
    note: {
      ro: "Versiune citată: commit 40ceede (31 aug. 2026)",
      en: "Cited version: commit 40ceede (31 Aug 2026)",
    },
  },
  {
    claim: {
      ro: "Varianta pentru citire a documentației",
      en: "Reading version of the documentation",
    },
    kind: { ro: "Site publicat", en: "Published site" },
    url: "https://ministerul-afacerilor-interne.github.io/rowallet-documentation/",
  },
  {
    claim: {
      ro: "Prezentarea MAI „Rolul MAI în ecosistemul național EUDIW” — rolurile MAI (5 simultan), Comisia RO EUDIW, STS (WRPRC/WRPAC), portofoliul PuB-EAA, etapele 2026/2027",
      en: "MAI presentation “MAI's role in the national EUDIW ecosystem” — MAI's 5 roles, the RO EUDIW Commission, STS (WRPRC/WRPAC), the PuB-EAA portfolio, the 2026/2027 phases",
    },
    kind: { ro: "Prezentare MAI, iul. 2026", en: "MAI presentation, Jul 2026" },
    note: {
      ro: "Document aflat în posesia autorului; datele „actuale” din atlas (roluri, etape, priorități) provin de aici.",
      en: "Document held by the author; the atlas “current” data (roles, phases, priorities) comes from it.",
    },
  },
  {
    claim: {
      ro: "Site-ul oficial RO Wallet",
      en: "Official RO Wallet website",
    },
    kind: { ro: "Site oficial", en: "Official website" },
    url: "https://rowallet.gov.ro/",
  },
  {
    claim: {
      ro: "eIDAS 2.0 — Reg. (UE) 2024/1183: obligații portofel EUDI, roluri, PuB-EAA",
      en: "eIDAS 2.0 — Reg. (EU) 2024/1183: EUDI wallet obligations, roles, PuB-EAA",
    },
    kind: { ro: "Legislație UE", en: "EU legislation" },
    url: "https://eur-lex.europa.eu/eli/reg/2024/1183/oj",
  },
  {
    claim: {
      ro: "Plăți instant SEPA — Reg. (UE) 2024/886",
      en: "SEPA instant payments — Reg. (EU) 2024/886",
    },
    kind: { ro: "Legislație UE", en: "EU legislation" },
    url: "https://eur-lex.europa.eu/eli/reg/2024/886/oj",
  },
  {
    claim: {
      ro: "Interoperable Europe Act — Reg. (UE) 2024/903 (prioritatea open source în achiziții)",
      en: "Interoperable Europe Act — Reg. (EU) 2024/903 (open source priority in procurement)",
    },
    kind: { ro: "Legislație UE", en: "EU legislation" },
    url: "https://eur-lex.europa.eu/eli/reg/2024/903/oj",
  },
  {
    claim: {
      ro: "Directiva NIS2 — (UE) 2022/2555",
      en: "NIS2 Directive — (EU) 2022/2555",
    },
    kind: { ro: "Legislație UE", en: "EU legislation" },
    url: "https://eur-lex.europa.eu/eli/dir/2022/2555/oj",
  },
  {
    claim: {
      ro: "GDPR art. 17 — dreptul la ștergere (de ce datele personale nu merg pe lanț)",
      en: "GDPR art. 17 — right to erasure (why personal data never goes on-chain)",
    },
    kind: { ro: "Legislație UE", en: "EU legislation" },
    url: "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
  },
  {
    claim: {
      ro: "EUDI Reference Implementation (OpenID4VC, SD-JWT, ISO mdoc) — baza tehnică a RO Wallet",
      en: "EUDI Reference Implementation (OpenID4VC, SD-JWT, ISO mdoc) — the technical base of RO Wallet",
    },
    kind: { ro: "Repo open source", en: "Open source repo" },
    url: "https://github.com/eu-digital-identity-wallet",
  },
  {
    claim: {
      ro: "Arhitectura de referință europeană (ARF) pentru portofelele EUDI",
      en: "European Architecture Reference Framework (ARF) for EUDI wallets",
    },
    kind: { ro: "Documentație UE", en: "EU documentation" },
    url: "https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/latest/arf/",
  },
  {
    claim: {
      ro: "X-Road — schimbul de date securizat, open source (NIIS)",
      en: "X-Road — secure data exchange, open source (NIIS)",
    },
    kind: { ro: "Proiect open source", en: "Open source project" },
    url: "https://x-road.global/",
  },
  {
    claim: {
      ro: "RFC 9277 — Token Status List (revocare privacy-preserving)",
      en: "RFC 9277 — Token Status List (privacy-preserving revocation)",
    },
    kind: { ro: "Standard IETF", en: "IETF standard" },
    url: "https://www.rfc-editor.org/rfc/rfc9277",
  },
  {
    claim: {
      ro: "ISO/IEC 18013-5 — permis de conducere mobil, prezentare offline (mDL)",
      en: "ISO/IEC 18013-5 — mobile driving licence, offline presentation (mDL)",
    },
    kind: { ro: "Standard ISO", en: "ISO standard" },
    url: "https://www.iso.org/standard/69084.html",
  },
  {
    claim: {
      ro: "EBSI / Europeum — infrastructura blockchain europeană (ancorare secundară)",
      en: "EBSI / Europeum — European blockchain infrastructure (secondary anchoring)",
    },
    kind: { ro: "Program UE", en: "EU programme" },
    url: "https://ec.europa.eu/digital-building-blocks/sites/display/EBSI/",
  },
  {
    claim: {
      ro: "„Arhitectura suverană digitală” — propunerea de sistem de operare suveran pentru administrația publică (straturile L0–L1)",
      en: "“Sovereign digital architecture” — the sovereign OS proposal for public administration (layers L0–L1)",
    },
    kind: { ro: "Articol", en: "Article" },
    url: "https://danieltamas.com/blog/arhitectura-suverana",
  },
  {
    claim: {
      ro: "GeoJSON județele României (hartă)",
      en: "Romania counties GeoJSON (map)",
    },
    kind: { ro: "Repo public", en: "Public repo" },
    url: "https://github.com/GabrielRondelli/geojson",
  },
  {
    claim: {
      ro: "CivicTech România — Digital Services Playbook (standarde adoptate pentru acest proiect)",
      en: "CivicTech România — Digital Services Playbook (standards adopted by this project)",
    },
    kind: { ro: "Comunitate civică", en: "Civic community" },
    url: "https://civictechro.github.io/playbook/",
  },
  {
    claim: {
      ro: "CivicTech România — Open Source Guidelines (reguli de repo: i18n, cod în engleză, teste)",
      en: "CivicTech România — Open Source Guidelines (repo rules: i18n, English code, tests)",
    },
    kind: { ro: "Comunitate civică", en: "Civic community" },
    url: "https://civictechro.github.io/guidelines/",
  },
  {
    claim: {
      ro: "CivicTech România — Cod de Conduită (adoptat de acest proiect)",
      en: "CivicTech România — Code of Conduct (adopted by this project)",
    },
    kind: { ro: "Comunitate civică", en: "Civic community" },
    url: "https://github.com/civicnet/code-of-conduct",
  },
  {
    claim: {
      ro: "civicnet/geojson-romania — alternativă comunitară pentru harta județelor",
      en: "civicnet/geojson-romania — community alternative for the county map",
    },
    kind: { ro: "Repo public", en: "Public repo" },
    url: "https://github.com/civicnet/geojson-romania",
  },
];
