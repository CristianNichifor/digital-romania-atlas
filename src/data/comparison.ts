import type { Bi } from "../i18n";

export interface ComparisonRow {
  dimension: Bi;
  current: Bi;
  proposed: Bi;
  verdict: "aligned" | "extended" | "added";
  /** URLs of the Surse entries (src/data/sources.ts) behind this row. */
  sources?: string[];
}

export const COMPARISON: ComparisonRow[] = [
  {
    dimension: { ro: "Identitate digitală", en: "Digital identity" },
    current: {
      ro: "PID prin RO Wallet (EUDI), LoA High, SD-JWT, ISO 18013-5",
      en: "PID via RO Wallet (EUDI), LoA High, SD-JWT, ISO 18013-5",
    },
    proposed: {
      ro: "Aceeași bază + politică de pseudonime pairwise per relying party",
      en: "Same base + pairwise pseudonym policy per relying party",
    },
    sources: [
      "https://github.com/Ministerul-Afacerilor-Interne/rowallet-documentation",
      "https://eur-lex.europa.eu/eli/reg/2024/1183/oj",
      "https://www.iso.org/standard/69084.html",
    ],
    verdict: "extended",
  },
  {
    dimension: { ro: "Atestări (EAA)", en: "Attestations (EAA)" },
    current: {
      ro: "Portofoliu PuB-EAA MAI (mDL, cazier, stare civilă) + QEAA planificat",
      en: "MAI PuB-EAA portfolio (mDL, criminal record, civil status) + QEAA planned",
    },
    proposed: {
      ro: "Același + surse din toate sectoarele (sănătate, fiscal, educație) prin backbone",
      en: "Same + sources from all sectors (health, tax, education) via the backbone",
    },
    sources: [
      "https://github.com/Ministerul-Afacerilor-Interne/rowallet-documentation",
      "https://eur-lex.europa.eu/eli/reg/2024/1183/oj",
    ],
    verdict: "extended",
  },
  {
    dimension: {
      ro: "Schimb de date instituțional",
      en: "Institutional data exchange",
    },
    current: {
      ro: "HUB MAI – punct la punct, doar surse MAI",
      en: "HUB MAI – point-to-point, MAI sources only",
    },
    proposed: {
      ro: "Backbone național (X-Road/GovStack), toate registrele, consimțământ la gateway",
      en: "National backbone (X-Road/GovStack), all registries, consent at the gateway",
    },
    sources: [
      "https://hub.mai.gov.ro/",
      "https://x-road.global/",
    ],
    verdict: "added",
  },
  {
    dimension: { ro: "Plăți", en: "Payments" },
    current: { ro: "Nu este acoperit", en: "Not covered" },
    proposed: {
      ro: "SEPA Instant + Request-to-Pay în wallet, pregătit pentru euro digital",
      en: "SEPA Instant + Request-to-Pay in wallet, digital-euro ready",
    },
    sources: [
      "https://eur-lex.europa.eu/eli/reg/2024/886/oj",
    ],
    verdict: "added",
  },
  {
    dimension: {
      ro: "Comunicare cu cetățeanul",
      en: "Citizen communication",
    },
    current: {
      ro: "Doar notificări push tehnice (PNS)",
      en: "Only technical push notifications (PNS)",
    },
    proposed: {
      ro: "Cutie poștală digitală legală + canale de încredere anti-phishing",
      en: "Legal digital postbox + trusted anti-phishing channels",
    },
    sources: [
      "https://github.com/Ministerul-Afacerilor-Interne/rowallet-documentation",
    ],
    verdict: "added",
  },
  {
    dimension: { ro: "Reziliență", en: "Resilience" },
    current: {
      ro: "Nespecificat (WB unic, cluster HSM)",
      en: "Unspecified (single WB, HSM cluster)",
    },
    proposed: {
      ro: "Active-active geo-redundant, funcționare offline a wallet-ului, fallback fizic",
      en: "Active-active geo-redundancy, offline wallet operation, physical fallback",
    },
    sources: [
      "https://github.com/Ministerul-Afacerilor-Interne/rowallet-documentation",
    ],
    verdict: "added",
  },
  {
    dimension: { ro: "Open source", en: "Open source" },
    current: {
      ro: "Documentație publică CC-BY-4.0; codul „la o etapă ulterioară”",
      en: "Public docs CC-BY-4.0; code “at a later stage”",
    },
    proposed: {
      ro: "Cod EUPL: wallet, SDK-uri, relying parties de referință, build-uri reproducibile",
      en: "EUPL code: wallet, SDKs, reference relying parties, reproducible builds",
    },
    sources: [
      "https://github.com/Ministerul-Afacerilor-Interne/rowallet-documentation",
      "https://eur-lex.europa.eu/eli/reg/2024/903/oj",
    ],
    verdict: "added",
  },
  {
    dimension: { ro: "Supraveghere", en: "Oversight" },
    current: {
      ro: "DGPI (intern MAI) + certificare eIDAS obligatorie",
      en: "DGPI (internal to MAI) + mandatory eIDAS certification",
    },
    proposed: {
      ro: "+ DNSC și ANSPDCP membri permanenți, audituri publice",
      en: "+ DNSC and ANSPDCP as permanent members, public audits",
    },
    sources: [
      "https://eur-lex.europa.eu/eli/reg/2024/1183/oj",
      "https://eur-lex.europa.eu/eli/dir/2022/2555/oj",
    ],
    verdict: "added",
  },
  {
    dimension: { ro: "Anti-corelare", en: "Anti-correlation" },
    current: {
      ro: "Divulgare selectivă (SD-JWT), atestare vârstă fără CNP",
      en: "Selective disclosure (SD-JWT), age attestation without CNP",
    },
    proposed: {
      ro: "+ pseudonime pairwise, fără jurnale centrale de prezentări",
      en: "+ pairwise pseudonyms, no central presentation logs",
    },
    sources: [
      "https://github.com/Ministerul-Afacerilor-Interne/rowallet-documentation",
      "https://github.com/eu-digital-identity-wallet",
    ],
    verdict: "extended",
  },
  {
    dimension: {
      ro: "Factor de securitate hardware",
      en: "Hardware security factor",
    },
    current: {
      ro: "Chei în Secure Element / TPM al telefonului; MDVM monitorizează dispozitivul",
      en: "Keys in the phone's Secure Element / TPM; MDVM monitors the device",
    },
    proposed: {
      ro: "+ cheie FIDO2 (CTAP2) opțională: step-up pentru LoA High și sume mari, PID pe cheie prin NFC, ancoră de recuperare în caz de telefon pierdut",
      en: "+ optional FIDO2 (CTAP2) key: step-up for LoA High and large amounts, PID on the key over NFC, recovery anchor for a lost phone",
    },
    sources: [
      "https://github.com/Ministerul-Afacerilor-Interne/rowallet-documentation",
    ],
    verdict: "added",
  },
  {
    dimension: { ro: "Incluziune", en: "Inclusion" },
    current: { ro: "Nu este abordat", en: "Not addressed" },
    proposed: {
      ro: "Fluxuri asistate, diaspora prin consulate, accesibilitate WCAG",
      en: "Assisted flows, diaspora via consulates, WCAG accessibility",
    },
    verdict: "added",
  },
  {
    dimension: {
      ro: "Semnătură calificată (QES)",
      en: "Qualified signature (QES)",
    },
    current: {
      ro: "Prin QTSP, gratuit pentru uz non-profesional",
      en: "Via QTSPs, free for non-professional use",
    },
    proposed: { ro: "Identic", en: "Identical" },
    sources: [
      "https://eur-lex.europa.eu/eli/reg/2024/1183/oj",
    ],
    verdict: "aligned",
  },
  {
    dimension: {
      ro: "Registru de încredere",
      en: "Trust registry",
    },
    current: {
      ro: "STS – WRPRC/WRPAC, scheme naționale de atestare",
      en: "STS – WRPRC/WRPAC, national attestation schemes",
    },
    proposed: {
      ro: "Același + interogabilitate publică și redundanță geo",
      en: "Same + public queryability and geo-redundancy",
    },
    sources: [
      "https://github.com/Ministerul-Afacerilor-Interne/rowallet-documentation",
      "https://eu-digital-identity-wallet.github.io/eudi-doc-architecture-and-reference-framework/latest/arf/",
    ],
    verdict: "extended",
  },
  {
    dimension: {
      ro: "Transparență verificabilă",
      en: "Verifiable transparency",
    },
    current: {
      ro: "Doar documentație publică (CC-BY-4.0)",
      en: "Public documentation only (CC-BY-4.0)",
    },
    proposed: {
      ro: "Ancore criptografice publice (lanț permisiv + EBSI) pentru registru, build-uri, ceremonii de chei, rapoarte SLA — doar hash-uri, niciodată date personale",
      en: "Public cryptographic anchors (permissionless chain + EBSI) for the registry, builds, key ceremonies, SLA reports — hashes only, never personal data",
    },
    sources: [
      "https://github.com/Ministerul-Afacerilor-Interne/rowallet-documentation",
      "https://ec.europa.eu/digital-building-blocks/sites/display/EBSI/",
      "https://eur-lex.europa.eu/eli/reg/2016/679/oj",
    ],
    verdict: "added",
  },
];

export const VERDICT_LABELS: Record<ComparisonRow["verdict"], Bi> = {
  aligned: { ro: "Aliniat", en: "Aligned" },
  extended: { ro: "Extins de propunere", en: "Extended by proposal" },
  added: { ro: "Adăugat de propunere", en: "Added by proposal" },
};
