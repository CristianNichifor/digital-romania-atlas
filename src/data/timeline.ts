export type TimelineOwner = "eu" | "current" | "proposed";

export interface TimelineEvent {
  date: string;
  title: string;
  detail: string;
  owner: TimelineOwner;
}

export const TIMELINE: TimelineEvent[] = [
  {
    date: "mai 2024",
    title: "eIDAS 2.0 intră în vigoare",
    detail: "Reg. (UE) 2024/1183 – obligația statelor membre de a emite portofel EUDI.",
    owner: "eu",
  },
  {
    date: "dec. 2025",
    title: "eIdentity (CEI dematerializată)",
    detail: "MAI lansează serviciul online; NU este eID notificat eIDAS.",
    owner: "current",
  },
  {
    date: "mai 2026",
    title: "HG – Comisia RO EUDIW",
    detail: "Prezidată de viceprim-ministru; membri: MAI, MEDAT, STS. Cadru legal în pregătire.",
    owner: "current",
  },
  {
    date: "dec. 2026",
    title: "Etapa 1: RO Wallet – doar PID + vârstă",
    detail: "Prima versiune: PID și verificarea vârstei. Pilot european WE BUILD.",
    owner: "current",
  },
  {
    date: "dec. 2026",
    title: "(Propunere) Hub de plăți SEPA Instant",
    detail: "Ghiseul.ro + Request-to-Pay gata de integrare în wallet.",
    owner: "proposed",
  },
  {
    date: "2027",
    title: "Etapa 2: atestări PuB-EAA",
    detail: "Priorități MAI: mDL, adeverință domiciliu, certificat înmatriculare, cazier.",
    owner: "current",
  },
  {
    date: "dec. 2027",
    title: "Acceptare obligatorie",
    detail: "Financiar, telecom, utilități, asigurări – trebuie să accepte EUDI Wallet.",
    owner: "eu",
  },
  {
    date: "2027",
    title: "(Propunere) Backbone X-Road + Cutia Digitală",
    detail: "Schimb de date între toate registrele; cutie poștală legală a cetățeanului.",
    owner: "proposed",
  },
  {
    date: "2028",
    title: "(Propunere) Plăți complete în wallet",
    detail: "RTP C2C/C2B, servicii diaspora, QES generalizat.",
    owner: "proposed",
  },
  {
    date: "2028+",
    title: "(Propunere) Euro digital + post-cuantic",
    detail: "Interoperare cu euro digitalul, migrare PQ, mesh transfrontalier EU.",
    owner: "proposed",
  },
];
