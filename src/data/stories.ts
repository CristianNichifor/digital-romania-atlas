import type { Bi } from "../i18n";
import type { FlowKind } from "./flows";

export interface StoryStep {
  from: string;
  to: string;
  label: Bi;
  kind: FlowKind;
}

export interface Story {
  id: string;
  persona: Bi;
  title: Bi;
  today: Bi;
  proposed: Bi;
  steps: StoryStep[];
}

export const STORIES: Story[] = [
  {
    id: "buletin",
    persona: {
      ro: "Maria, 68 ani — comună rurală",
      en: "Maria, 68 — rural commune",
    },
    title: { ro: "Reînnoirea buletinului", en: "Renewing the ID card" },
    today: {
      ro: "Drum la evidența populației din reședința de județ, cozi, dosar cu șină, copii xerox, o zi pierdută.",
      en: "A trip to the county population office, queues, paper folders, photocopies, a day lost.",
    },
    proposed: {
      ro: "Merge la primărie; funcționarul o asistă: identitatea se verifică pe loc, PID-ul ajunge în wallet, documentele circulă digital — iar verificarea merge și offline.",
      en: "She goes to the town hall; a clerk assists her: identity is verified on the spot, the PID lands in her wallet, documents flow digitally — and verification works offline too.",
    },
    steps: [
      {
        from: "uat",
        to: "citizen",
        label: { ro: "Emitere asistată la primărie", en: "Assisted issuance at the town hall" },
        kind: "service",
      },
      {
        from: "dgep",
        to: "citizen",
        label: { ro: "PID emis în wallet", en: "PID issued to the wallet" },
        kind: "identity",
      },
      {
        from: "citizen",
        to: "rp",
        label: { ro: "Prezentare la instituții", en: "Presentation to institutions" },
        kind: "presentation",
      },
    ],
  },
  {
    id: "varsta",
    persona: { ro: "Andrei, 19 ani", en: "Andrei, 19" },
    title: { ro: "Dovada vârstei la bar", en: "Proof of age at the bar" },
    today: {
      ro: "Cartea de identitate pe masă — cu nume, CNP și adresă la vedere. Totul, ca să dovedească doar vârsta.",
      en: "ID card on the table — name, CNP and address exposed. All of it, just to prove age.",
    },
    proposed: {
      ro: "Wallet-ul arată doar „peste 18 ani” — fără CNP, fără dată de naștere, fără nume complet. Datele rămân pe telefon.",
      en: "The wallet shows only “over 18” — no CNP, no date of birth, no full name. The data stays on the phone.",
    },
    steps: [
      {
        from: "citizen",
        to: "rp",
        label: {
          ro: "Atestare vârstă, divulgare selectivă",
          en: "Age attestation, selective disclosure",
        },
        kind: "presentation",
      },
    ],
  },
  {
    id: "taxa",
    persona: { ro: "Elena, 42 ani — oraș", en: "Elena, 42 — city" },
    title: { ro: "Taxa locală", en: "Local tax" },
    today: {
      ro: "Ghișeu sau netbanking manual, chitanță pe hârtie, reconcilieri în zile.",
      en: "A counter visit or manual netbanking, paper receipt, reconciliation taking days.",
    },
    proposed: {
      ro: "Cererea de plată (RTP) apare direct în wallet; confirmă cu amprenta; plata instant SEPA; chitanța digitală ajunge în Cutia Digitală.",
      en: "The payment request (RTP) appears in the wallet; she confirms with a fingerprint; instant SEPA payment; the digital receipt lands in the Digital Postbox.",
    },
    steps: [
      {
        from: "citizen",
        to: "rp",
        label: { ro: "Cerere de plată / QR în wallet", en: "Payment request / QR in wallet" },
        kind: "payment",
      },
      {
        from: "rp",
        to: "transfond",
        label: { ro: "Plată instant SEPA", en: "Instant SEPA payment" },
        kind: "payment",
      },
      {
        from: "postbox",
        to: "citizen",
        label: { ro: "Chitanță digitală", en: "Digital receipt" },
        kind: "service",
      },
    ],
  },
  {
    id: "atestat",
    persona: { ro: "Vlad, 33 ani — angajator", en: "Vlad, 33 — employer" },
    title: { ro: "Atestatul medical pentru angajator", en: "Medical attestation for the employer" },
    today: {
      ro: "Copii după adeverințe, semnături, date medicale care circulă cine știe pe unde.",
      en: "Copies of certificates, signatures, medical data travelling who knows where.",
    },
    proposed: {
      ro: "Angajatorul cere doar „apt medical”. Cu consimțământul tău, backbone-ul interoghează CNAS și primește atestarea minimă. Dosarul medical nu părăsește CNAS.",
      en: "The employer asks only for “fit for work”. With your consent, the backbone queries CNAS and receives the minimal attestation. The medical file never leaves CNAS.",
    },
    steps: [
      {
        from: "rp",
        to: "xroad",
        label: {
          ro: "Interogare cu consimțământ, scop delimitat",
          en: "Consent-based query, bounded purpose",
        },
        kind: "backbone",
      },
      {
        from: "xroad",
        to: "cnas",
        label: { ro: "Date garantate la sursă", en: "Data guaranteed at source" },
        kind: "backbone",
      },
      {
        from: "citizen",
        to: "rp",
        label: { ro: "Atestare minimă livrată", en: "Minimal attestation delivered" },
        kind: "presentation",
      },
    ],
  },
  {
    id: "diaspora",
    persona: { ro: "Ioana, 27 ani — Spania", en: "Ioana, 27 — Spain" },
    title: { ro: "Diaspora: deschide cont bancar", en: "Diaspora: opening a bank account" },
    today: {
      ro: "Programare la consulat, drum de sute de km, apostile, traduceri legalizate.",
      en: "Consulate appointment, hundreds of km, apostilles, certified translations.",
    },
    proposed: {
      ro: "Verificarea identității la consulat (sau la distanță), PID în wallet, contul deschis online la orice bancă din UE — recunoscut în toate statele membre.",
      en: "Identity verified at the consulate (or remotely), PID in the wallet, the account opened online at any EU bank — recognised in every member state.",
    },
    steps: [
      {
        from: "consulate",
        to: "dgep",
        label: { ro: "Verificare identitate diaspora", en: "Diaspora identity verification" },
        kind: "identity",
      },
      {
        from: "dgep",
        to: "citizen",
        label: { ro: "PID în wallet", en: "PID in the wallet" },
        kind: "identity",
      },
      {
        from: "citizen",
        to: "rp",
        label: { ro: "Deschidere cont online", en: "Online account opening" },
        kind: "presentation",
      },
    ],
  },
];
