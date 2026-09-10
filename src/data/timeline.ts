import type { Bi } from "../i18n";

export type TimelineOwner = "eu" | "current" | "proposed";

export interface TimelineEvent {
  date: string;
  title: Bi;
  detail: Bi;
  owner: TimelineOwner;
}

export const TIMELINE: TimelineEvent[] = [
  {
    date: "mai 2024",
    title: {
      ro: "eIDAS 2.0 intră în vigoare",
      en: "eIDAS 2.0 enters into force",
    },
    detail: {
      ro: "Reg. (UE) 2024/1183 – obligația statelor membre de a emite portofel EUDI.",
      en: "Reg. (EU) 2024/1183 – member states must issue an EUDI wallet.",
    },
    owner: "eu",
  },
  {
    date: "dec. 2025",
    title: {
      ro: "eIdentity (CEI dematerializată)",
      en: "eIdentity (dematerialised ID card)",
    },
    detail: {
      ro: "MAI lansează serviciul online; NU este eID notificat eIDAS.",
      en: "MAI launches the online service; NOT an eIDAS-notified eID.",
    },
    owner: "current",
  },
  {
    date: "mai 2026",
    title: {
      ro: "HG – Comisia RO EUDIW",
      en: "Gov. Decision – RO EUDIW Commission",
    },
    detail: {
      ro: "Prezidată de viceprim-ministru; membri: MAI, MEDAT, STS. Cadru legal în pregătire.",
      en: "Chaired by the deputy PM; members: MAI, MEDAT, STS. Legal framework in preparation.",
    },
    owner: "current",
  },
  {
    date: "dec. 2026",
    title: {
      ro: "Etapa 1: RO Wallet – doar PID + vârstă",
      en: "Phase 1: RO Wallet – PID + age only",
    },
    detail: {
      ro: "Prima versiune: PID și verificarea vârstei. Pilot european WE BUILD.",
      en: "First version: PID and age verification. WE BUILD European pilot.",
    },
    owner: "current",
  },
  {
    date: "dec. 2026",
    title: {
      ro: "(Propunere) Hub de plăți SEPA Instant",
      en: "(Proposal) SEPA Instant payment hub",
    },
    detail: {
      ro: "Ghiseul.ro + Request-to-Pay gata de integrare în wallet.",
      en: "Ghiseul.ro + Request-to-Pay ready for wallet integration.",
    },
    owner: "proposed",
  },
  {
    date: "2027",
    title: {
      ro: "Etapa 2: atestări PuB-EAA",
      en: "Phase 2: PuB-EAA attestations",
    },
    detail: {
      ro: "Priorități MAI: mDL, adeverință domiciliu, certificat înmatriculare, cazier.",
      en: "MAI priorities: mDL, address attestation, vehicle registration, criminal record.",
    },
    owner: "current",
  },
  {
    date: "dec. 2027",
    title: {
      ro: "Acceptare obligatorie",
      en: "Mandatory acceptance",
    },
    detail: {
      ro: "Financiar, telecom, utilități, asigurări – trebuie să accepte EUDI Wallet.",
      en: "Finance, telecoms, utilities, insurers must accept the EUDI Wallet.",
    },
    owner: "eu",
  },
  {
    date: "2027",
    title: {
      ro: "(Propunere) Backbone X-Road + Cutia Digitală",
      en: "(Proposal) X-Road backbone + Digital Postbox",
    },
    detail: {
      ro: "Schimb de date între toate registrele; cutie poștală legală a cetățeanului.",
      en: "Data exchange between all registries; the citizen's legal mailbox.",
    },
    owner: "proposed",
  },
  {
    date: "2028",
    title: {
      ro: "(Propunere) Plăți complete în wallet",
      en: "(Proposal) Full payments in the wallet",
    },
    detail: {
      ro: "RTP C2C/C2B, servicii diaspora, QES generalizat.",
      en: "C2C/C2B RTP, diaspora services, generalised QES.",
    },
    owner: "proposed",
  },
  {
    date: "2028+",
    title: {
      ro: "(Propunere) Euro digital + post-cuantic",
      en: "(Proposal) Digital euro + post-quantum",
    },
    detail: {
      ro: "Interoperare cu euro digitalul, migrare PQ, mesh transfrontalier EU.",
      en: "Digital euro interoperability, PQ migration, EU cross-border mesh.",
    },
    owner: "proposed",
  },
];
