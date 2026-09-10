import type { Bi } from "../i18n";

export interface ComparisonRow {
  dimension: Bi;
  current: Bi;
  proposed: Bi;
  verdict: "aligned" | "extended" | "added";
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
    verdict: "added",
  },
  {
    dimension: { ro: "Plăți", en: "Payments" },
    current: { ro: "Nu este acoperit", en: "Not covered" },
    proposed: {
      ro: "SEPA Instant + Request-to-Pay în wallet, pregătit pentru euro digital",
      en: "SEPA Instant + Request-to-Pay in wallet, digital-euro ready",
    },
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
    verdict: "extended",
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
    verdict: "added",
  },
];

export const VERDICT_LABELS: Record<ComparisonRow["verdict"], Bi> = {
  aligned: { ro: "Aliniat", en: "Aligned" },
  extended: { ro: "Extins de propunere", en: "Extended by proposal" },
  added: { ro: "Adăugat de propunere", en: "Added by proposal" },
};
