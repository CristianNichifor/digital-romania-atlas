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
        label: {
          ro: "Emitere asistată la primărie",
          en: "Assisted issuance at the town hall",
        },
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
        label: {
          ro: "Prezentare la instituții",
          en: "Presentation to institutions",
        },
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
        label: {
          ro: "Cerere de plată / QR în wallet",
          en: "Payment request / QR in wallet",
        },
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
    title: {
      ro: "Atestatul medical pentru angajator",
      en: "Medical attestation for the employer",
    },
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
        label: {
          ro: "Date garantate la sursă",
          en: "Data guaranteed at source",
        },
        kind: "backbone",
      },
      {
        from: "citizen",
        to: "rp",
        label: {
          ro: "Atestare minimă livrată",
          en: "Minimal attestation delivered",
        },
        kind: "presentation",
      },
    ],
  },
  {
    id: "diaspora",
    persona: { ro: "Ioana, 27 ani — Spania", en: "Ioana, 27 — Spain" },
    title: {
      ro: "Diaspora: deschide cont bancar",
      en: "Diaspora: opening a bank account",
    },
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
        label: {
          ro: "Verificare identitate diaspora",
          en: "Diaspora identity verification",
        },
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
  {
    id: "facultate",
    persona: { ro: "Ștefan, 18 ani — liceu", en: "Ștefan, 18 — high school" },
    title: { ro: "Înscrierea la facultate", en: "University enrolment" },
    today: {
      ro: "Dosar cu copii legalizate după diplomă și buletin, trimis prin poștă sau depus fizic, la fiecare facultate în parte.",
      en: "A folder of certified copies of the diploma and ID, sent by post or filed in person, for each faculty separately.",
    },
    proposed: {
      ro: "Facultatea primește QEAA-ul diplomei și PID-ul direct, digital; datele se verifică la sursă (MEN/REGES). Zero hârtie, zero legalizări.",
      en: "The faculty receives the diploma QEAA and the PID digitally; data is verified at the source (MEN/REGES). Zero paper, zero certifications.",
    },
    steps: [
      {
        from: "citizen",
        to: "university",
        label: {
          ro: "Înscriere online cu QEAA + PID",
          en: "Online enrolment with QEAA + PID",
        },
        kind: "presentation",
      },
      {
        from: "university",
        to: "xroad",
        label: { ro: "Verificare la sursă", en: "Source verification" },
        kind: "backbone",
      },
      {
        from: "xroad",
        to: "men",
        label: {
          ro: "REGES / arhiva națională a diplomelor",
          en: "REGES / national diploma archive",
        },
        kind: "backbone",
      },
    ],
  },
  {
    id: "medical",
    persona: { ro: "Ana, 40 ani — angajată", en: "Ana, 40 — employee" },
    title: { ro: "Concediul medical", en: "Sick leave" },
    today: {
      ro: "Adeverințe pe hârtie între medic, angajator și CNAS; dosarul medical circulă prin copii fizice.",
      en: "Paper certificates between doctor, employer and CNAS; the medical file travels as physical copies.",
    },
    proposed: {
      ro: "Medicul emite atestarea electronică; angajatorul primește strictul necesar; dosarul medical nu părăsește CNAS.",
      en: "The doctor issues the electronic attestation; the employer receives the strict minimum; the medical file never leaves CNAS.",
    },
    steps: [
      {
        from: "citizen",
        to: "rp",
        label: {
          ro: "Prezintă atestarea medicală",
          en: "Presents the medical attestation",
        },
        kind: "presentation",
      },
      {
        from: "rp",
        to: "xroad",
        label: {
          ro: "Verificare cu consimțământ",
          en: "Verification with consent",
        },
        kind: "backbone",
      },
      {
        from: "xroad",
        to: "cnas",
        label: {
          ro: "Date garantate la sursă",
          en: "Data guaranteed at source",
        },
        kind: "backbone",
      },
    ],
  },
  {
    id: "masina",
    persona: { ro: "Radu, 35 ani", en: "Radu, 35" },
    title: { ro: "Cumpărarea unei mașini", en: "Buying a car" },
    today: {
      ro: "Drum la ghișee: contract, taxe, înmatriculare, cozi la mai multe instituții.",
      en: "A trip to the counters: contract, taxes, registration, queues at several institutions.",
    },
    proposed: {
      ro: "Certificatul de înmatriculare e în wallet, taxa se plătește instant din aplicație, înmatricularea se face online; chitanța ajunge în Cutia Digitală.",
      en: "The registration certificate lives in the wallet, the tax is paid instantly from the app, registration happens online; the receipt lands in the Digital Postbox.",
    },
    steps: [
      {
        from: "citizen",
        to: "hub-mai",
        label: {
          ro: "Înmatriculare online (mDL + certificat)",
          en: "Online registration (mDL + certificate)",
        },
        kind: "presentation",
      },
      {
        from: "citizen",
        to: "rp",
        label: { ro: "Taxe plătite instant", en: "Taxes paid instantly" },
        kind: "payment",
      },
      {
        from: "rp",
        to: "transfond",
        label: { ro: "SEPA Instant", en: "SEPA Instant" },
        kind: "payment",
      },
    ],
  },
  {
    id: "carte-funciara",
    persona: {
      ro: "Dana, 45 ani — cumpără apartament",
      en: "Dana, 45 — buying a flat",
    },
    title: { ro: "Extrasul de carte funciară", en: "The land book extract" },
    today: {
      ro: "Cerere la ghișeul ANCPI, timpi de eliberare, acte care expiră înainte de semnare.",
      en: "A request at the ANCPI counter, waiting times, documents expiring before the signing.",
    },
    proposed: {
      ro: "Notarul solicită extrasul prin backbone cu consimțământul tău; documentul ajunge digital, proaspăt, garantat la sursă.",
      en: "The notary requests the extract via the backbone with your consent; the document arrives digitally, fresh, guaranteed at source.",
    },
    steps: [
      {
        from: "citizen",
        to: "rp",
        label: {
          ro: "Notariat — consimțământ pentru extras",
          en: "Notary — consent for the extract",
        },
        kind: "presentation",
      },
      {
        from: "rp",
        to: "xroad",
        label: {
          ro: "Solicitare prin backbone",
          en: "Request via the backbone",
        },
        kind: "backbone",
      },
      {
        from: "xroad",
        to: "ancpi",
        label: { ro: "Carte funciară la sursă", en: "Land book at the source" },
        kind: "backbone",
      },
    ],
  },
  {
    id: "civic-verify",
    persona: { ro: "Corina, activist civic", en: "Corina, civic activist" },
    title: { ro: "ONG-ul verifică statul", en: "The NGO verifies the state" },
    today: {
      ro: "Cereri în baza Legii 544, rapoarte PDF neuniforme, răspunsuri în 30 de zile.",
      en: "FOIA requests, non-uniform PDF reports, replies within 30 days.",
    },
    proposed: {
      ro: "Portalul de transparență publică totul, iar ancorele criptografice fac imposibilă rescrierea istoriei. Verificarea durează minute, nu luni.",
      en: "The transparency portal publishes everything, and the cryptographic anchors make rewriting history impossible. Verification takes minutes, not months.",
    },
    steps: [
      {
        from: "civic",
        to: "transparency",
        label: {
          ro: "Verifică rapoartele publice",
          en: "Verifies the public reports",
        },
        kind: "oversight",
      },
      {
        from: "transparency",
        to: "anchor",
        label: { ro: "Rapoarte ancorate", en: "Anchored reports" },
        kind: "anchor",
      },
      {
        from: "civic",
        to: "anchor",
        label: {
          ro: "Verificare independentă on-chain",
          en: "Independent on-chain verification",
        },
        kind: "anchor",
      },
    ],
  },
  {
    id: "telefon-pierdut",
    persona: {
      ro: "Vlad, 34 ani — își pierde telefonul în vacanță",
      en: "Vlad, 34 — loses his phone on holiday",
    },
    title: {
      ro: "Ai pierdut telefonul — ce se întâmplă",
      en: "You lost your phone — what happens",
    },
    today: {
      ro: "Conturile online depind de parole și SMS-OTP: risc de SIM-swap, resetări de parole la fiecare serviciu, fără un comutator unic care să oprească totul.",
      en: "Online accounts depend on passwords and SMS-OTP: SIM-swap risk, password resets per service, no single switch to stop everything.",
    },
    proposed: {
      ro: "Un singur raport (hotline 24/7, portal sau ghișeu) suspendă toate credențialele în ≤ 15 minute. Pe noul telefon revii cu cheia de recuperare, fără proofing complet.",
      en: "A single report (24/7 hotline, portal or desk) suspends all credentials within 15 minutes. On the new phone you're back with the recovery key — no full proofing.",
    },
    steps: [
      {
        from: "citizen",
        to: "sts",
        label: {
          ro: "Raport pierdere — kill-switch unic",
          en: "Loss report — single kill-switch",
        },
        kind: "lifecycle",
      },
      {
        from: "sts",
        to: "rp",
        label: {
          ro: "Credențiale suspendate; revocarea apare în Status Lists",
          en: "Credentials suspended; revocation shows in the Status Lists",
        },
        kind: "trust",
      },
      {
        from: "citizen",
        to: "uat",
        label: {
          ro: "Re-înrolare asistată cu cheia de recuperare",
          en: "Assisted re-enrolment with the recovery key",
        },
        kind: "identity",
      },
      {
        from: "dgep",
        to: "citizen",
        label: {
          ro: "Credențiale noi pe noul dispozitiv",
          en: "Fresh credentials on the new device",
        },
        kind: "identity",
      },
      {
        from: "citizen",
        to: "rp",
        label: {
          ro: "Prezentare normală din prima zi",
          en: "Normal presentation from day one",
        },
        kind: "presentation",
      },
    ],
  },
  {
    id: "vot-parlament",
    persona: { ro: "Deputata Ioana, 47 ani", en: "MP Ioana, 47" },
    title: {
      ro: "Deputatul votează — vot ancorat",
      en: "The MP votes — anchored vote",
    },
    today: {
      ro: "Vot nominal pe hârtie sau tablete proprietare, numărare manuală, fără posibilitatea ca cetățeanul să verifice independent istoricul de vot.",
      en: "Roll-call votes on paper or proprietary tablets, manual tallies, no way for a citizen to independently verify the voting record.",
    },
    proposed: {
      ro: "Fiecare vot e semnat QES și ancorat: un istoric imposibil de modificat în liniște, verificabil de oricine — iar pentru voturile secrete, criptarea buletinului garantează că nimeni nu află cum a votat.",
      en: "Every vote is QES-signed and anchored: a history that cannot be silently edited, verifiable by anyone — and for secret votes, encrypted ballots guarantee nobody learns how someone voted.",
    },
    steps: [
      {
        from: "citizen",
        to: "parlament",
        label: {
          ro: "Autentificare PID + FIDO2 la votare",
          en: "PID + FIDO2 authentication at voting",
        },
        kind: "identity",
      },
      {
        from: "parlament",
        to: "sts",
        label: {
          ro: "Verificarea mandatului activ",
          en: "Active mandate check",
        },
        kind: "trust",
      },
      {
        from: "citizen",
        to: "parlament",
        label: { ro: "Vot semnat QES", en: "QES-signed vote" },
        kind: "lifecycle",
      },
      {
        from: "parlament",
        to: "anchor",
        label: {
          ro: "Lanț de voturi ancorat public",
          en: "Publicly anchored vote chain",
        },
        kind: "anchor",
      },
      {
        from: "civic",
        to: "anchor",
        label: {
          ro: "Verificare independentă a istoricului",
          en: "Independent verification of the record",
        },
        kind: "oversight",
      },
    ],
  },
  {
    id: "admin-firma",
    persona: {
      ro: "Cristian, 41 ani — administrator",
      en: "Cristian, 41 — administrator",
    },
    title: {
      ro: "Administratorul semnează pentru firmă",
      en: "The administrator signs for the company",
    },
    today: {
      ro: "Mandat dovedit cu certificat constatator ONRC, semnături olografe, ștampilă, cozi la registru pentru fiecare act.",
      en: "The mandate is proved with an ONRC certificate, wet signatures, stamps, registry queues for every document.",
    },
    proposed: {
      ro: "Mandatul e atestare în wallet, direct de la ONRC. Semnezi „ca firma” cu propriul QES; delegările pentru angajați se fac din wallet, cu revocare instantă.",
      en: "The mandate is an attestation in the wallet, straight from ONRC. You sign “as the company” with your own QES; employee delegations happen in the wallet, with instant revocation.",
    },
    steps: [
      {
        from: "onrc",
        to: "citizen",
        label: {
          ro: "Atestare de mandat în wallet",
          en: "Mandate attestation in the wallet",
        },
        kind: "identity",
      },
      {
        from: "citizen",
        to: "rp",
        label: {
          ro: "Semnează „ca firma”: PID + mandat",
          en: "Signs “as the company”: PID + mandate",
        },
        kind: "presentation",
      },
      {
        from: "rp",
        to: "onrc",
        label: {
          ro: "Verificarea lanțului de mandat",
          en: "Mandate chain verification",
        },
        kind: "backbone",
      },
      {
        from: "companie",
        to: "rp",
        label: {
          ro: "Firma acționează automat prin sigiliu electronic",
          en: "The company acts automatically via its electronic seal",
        },
        kind: "service",
      },
    ],
  },
];
