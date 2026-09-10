import type { Bi } from "../i18n";

export type JourneyVariant = "standard" | "optional" | "fallback";

export interface JourneyStep {
  from: string;
  to: string;
  label: Bi;
  tech?: Bi;
  variant?: JourneyVariant;
}

export interface Journey {
  id: string;
  title: Bi;
  intro: Bi;
  steps: JourneyStep[];
}

export const JOURNEYS: Journey[] = [
  {
    id: "enroll",
    title: { ro: "Înrolarea portofelului", en: "Wallet enrollment" },
    intro: {
      ro: "Cum primește un cetățean PID-ul în wallet: ghișeul asistat ca traseu principal, identitate probată la sursă, chei generate pe dispozitiv.",
      en: "How a citizen gets the PID into their wallet: the assisted desk as the main path, identity proved at the source, keys generated on the device.",
    },
    steps: [
      {
        from: "citizen",
        to: "uat",
        label: {
          ro: "Te prezinți la ghișeul asistat (primărie/poștă) sau te înrolezi la distanță cu video",
          en: "You show up at the assisted desk (town hall/post office) or enrol remotely with video",
        },
        tech: {
          ro: "Proofing de identitate · LoA High",
          en: "Identity proofing · LoA High",
        },
      },
      {
        from: "uat",
        to: "dgep",
        label: {
          ro: "Cererea de emitere pleacă către DGEP (emitentul PID)",
          en: "The issuance request goes to DGEP (the PID issuer)",
        },
        tech: { ro: "OpenID4VCI", en: "OpenID4VCI" },
      },
      {
        from: "dgep",
        to: "citizen",
        label: {
          ro: "PID-ul e emis în wallet; cheile se generează pe dispozitiv (Secure Element), nu pe server",
          en: "The PID lands in the wallet; keys are generated on the device (Secure Element), not on a server",
        },
        tech: {
          ro: "SD-JWT · chei device-bound",
          en: "SD-JWT · device-bound keys",
        },
      },
      {
        from: "dgep",
        to: "sts",
        label: {
          ro: "PID-ul e înregistrat în registrele STS pentru verificare și revocare",
          en: "The PID is registered in the STS registries for verification and revocation",
        },
        tech: { ro: "Token Status List", en: "Token Status List" },
      },
      {
        from: "citizen",
        to: "rp",
        label: {
          ro: "Gata: prezinți PID-ul oricărui serviciu, online sau offline",
          en: "Done: you present the PID to any service, online or offline",
        },
        tech: { ro: "OpenID4VP · ISO 18013-5", en: "OpenID4VP · ISO 18013-5" },
      },
    ],
  },
  {
    id: "login",
    title: {
      ro: "Autentificarea la un serviciu",
      en: "Signing in to a service",
    },
    intro: {
      ro: "Fără parolă, fără OTP: o prezentare semnată, legată de sesiunea cerută — nu există nimic de furat și de reutilizat.",
      en: "No password, no OTP: a signed presentation bound to the requested session — there is nothing to steal and replay.",
    },
    steps: [
      {
        from: "citizen",
        to: "rp",
        label: {
          ro: "Deschizi serviciul și alegi „Intră cu portofelul”",
          en: "You open the service and choose “Sign in with the wallet”",
        },
      },
      {
        from: "rp",
        to: "citizen",
        label: {
          ro: "Serviciul afișează un QR live, legat de cererea lui (nu un cod generic)",
          en: "The service shows a live QR bound to its request (not a generic code)",
        },
        tech: { ro: "OpenID4VP cross-device", en: "OpenID4VP cross-device" },
      },
      {
        from: "citizen",
        to: "rwsca",
        label: {
          ro: "Scanezi QR-ul și aprobi: deblocare biometrică + semnarea prezentării cu cheile din Secure Element",
          en: "You scan the QR and approve: biometric unlock + signing the presentation with the Secure Element keys",
        },
        tech: {
          ro: "User verification · CTAP2",
          en: "User verification · CTAP2",
        },
      },
      {
        from: "rp",
        to: "sts",
        label: {
          ro: "Serviciul verifică valabilitatea PID-ului în Status List",
          en: "The service checks the PID against the Status List",
        },
        tech: { ro: "Token Status List", en: "Token Status List" },
      },
      {
        from: "rp",
        to: "citizen",
        label: {
          ro: "Ești autentificat — cu pseudonim pairwise, fără urme centrale",
          en: "You're in — under a pairwise pseudonym, with no central trail",
        },
        tech: { ro: "SD-JWT · nonce", en: "SD-JWT · nonce" },
      },
      {
        from: "citizen",
        to: "rp",
        label: {
          ro: "Opțional: pentru LoA High sau sume mari, prezența unei chei hardware (FIDO2) devine obligatorie",
          en: "Optional: for LoA High or large amounts, a hardware key (FIDO2) touch becomes mandatory",
        },
        tech: { ro: "CTAP2 · WebAuthn", en: "CTAP2 · WebAuthn" },
        variant: "optional",
      },
    ],
  },
  {
    id: "lost",
    title: { ro: "Ai pierdut telefonul", en: "Lost phone" },
    intro: {
      ro: "Incidentul real, nu teoretic: suspendare în minute, înlocuire în ore. Un singur comutator oprește toate credențialele deodată.",
      en: "The real incident, not a theoretical one: suspension in minutes, replacement in hours. One switch stops all credentials at once.",
    },
    steps: [
      {
        from: "citizen",
        to: "sts",
        label: {
          ro: "Raportezi pe orice canal: hotline 24/7, portal cetățean sau orice ghișeu asistat",
          en: "You report it on any channel: 24/7 hotline, citizen portal or any assisted desk",
        },
        tech: { ro: "Kill-switch unic", en: "Single kill-switch" },
      },
      {
        from: "sts",
        to: "rp",
        label: {
          ro: "Toate credențialele (PID + atestări) sunt suspendate deodată; verificatorii văd revocarea la următoarea verificare",
          en: "All credentials (PID + attestations) are suspended at once; verifiers see the revocation at their next check",
        },
        tech: {
          ro: "Revocare → Status Lists",
          en: "Revocation → Status Lists",
        },
      },
      {
        from: "citizen",
        to: "uat",
        label: {
          ro: "Pe telefonul nou, reactivezi portofelul cu cheia de recuperare pre-înrolată — fără proofing complet",
          en: "On the new phone you reactivate the wallet with the pre-enrolled recovery key — no full proofing",
        },
        tech: {
          ro: "Recovery key · re-enrolment",
          en: "Recovery key · re-enrolment",
        },
      },
      {
        from: "uat",
        to: "dgep",
        label: {
          ro: "Fără cheie de recuperare: proofing complet din nou la ghișeu (planul B, mereu disponibil)",
          en: "Without a recovery key: full proofing again at the desk (plan B, always available)",
        },
        tech: { ro: "Proofing asistat", en: "Assisted proofing" },
        variant: "fallback",
      },
      {
        from: "dgep",
        to: "citizen",
        label: {
          ro: "Credențiale noi emise pe noul dispozitiv; cele vechi rămân revocate definitiv",
          en: "Fresh credentials issued to the new device; the old ones stay revoked for good",
        },
        tech: { ro: "OpenID4VCI", en: "OpenID4VCI" },
      },
    ],
  },
  {
    id: "hardware",
    title: {
      ro: "Cheia hardware (opțional)",
      en: "The hardware key (optional)",
    },
    intro: {
      ro: "Pentru cine vrea mai mult: o cheie FIDO2 certificată decuplează identitatea de telefon și acoperă și cel mai rău scenariu.",
      en: "For those who want more: a certified FIDO2 key decouples identity from the phone and covers the worst case too.",
    },
    steps: [
      {
        from: "uat",
        to: "citizen",
        label: {
          ro: "Ridici o cheie FIDO2 certificată de la poștă/primărie (subvenționată, opțională)",
          en: "You pick up a certified FIDO2 key from the post office/town hall (subsidised, optional)",
        },
        tech: { ro: "CTAP2 · NFC", en: "CTAP2 · NFC" },
      },
      {
        from: "citizen",
        to: "wb",
        label: {
          ro: "O înrolezi ca factor suplimentar în wallet: aprobările LoA High și sumele mari cer atingerea cheii",
          en: "You enrol it as an extra factor in the wallet: LoA High approvals and large amounts require a key touch",
        },
        tech: { ro: "WebAuthn · step-up", en: "WebAuthn · step-up" },
      },
      {
        from: "citizen",
        to: "rp",
        label: {
          ro: "Varianta avansată: PID-ul încărcat pe cheie — prezentare directă din cheie prin NFC, fără telefon",
          en: "The advanced variant: the PID loaded on the key — present directly from the key over NFC, no phone involved",
        },
        tech: { ro: "OpenID4VP din cheie", en: "OpenID4VP from the key" },
        variant: "optional",
      },
      {
        from: "citizen",
        to: "uat",
        label: {
          ro: "Cheia de rezervă din sertar: dacă pierzi telefonul, re-înrolezi portofelul nou fără proofing complet",
          en: "The spare key in the drawer: lose the phone, re-enrol the new wallet without full proofing",
        },
        tech: { ro: "Recovery anchor", en: "Recovery anchor" },
      },
    ],
  },
  {
    id: "vote-open",
    title: {
      ro: "Votul deschis în Parlament",
      en: "The open vote in Parliament",
    },
    intro: {
      ro: "Votul nominal: semnătură calificată pe fiecare vot, lanț ancorat public — nimeni nu poate schimba un vot în liniște, oricine poate verifica.",
      en: "The roll-call vote: a qualified signature on every vote, the chain publicly anchored — nobody can change a vote silently, anyone can verify.",
    },
    steps: [
      {
        from: "citizen",
        to: "parlament",
        label: {
          ro: "Deputatul se autentifică cu PID (LoA High); pasul FIDO2 e obligatoriu pentru vot",
          en: "The MP authenticates with the PID (LoA High); the FIDO2 step is mandatory for voting",
        },
        tech: { ro: "OpenID4VP · CTAP2", en: "OpenID4VP · CTAP2" },
      },
      {
        from: "parlament",
        to: "sts",
        label: {
          ro: "Sistemul verifică mandatul activ în registrul STS — un deputat revocat nu mai poate vota",
          en: "The system checks the active mandate in the STS registry — a recalled MP can no longer vote",
        },
        tech: { ro: "Token Status List", en: "Token Status List" },
      },
      {
        from: "citizen",
        to: "parlament",
        label: {
          ro: "Votul = payload structurat (proiect, amendament, da/nu/abținere) semnat cu QES",
          en: "The vote = a structured payload (bill, amendment, yes/no/abstain) signed with QES",
        },
        tech: { ro: "QES · eIDAS art. 25", en: "QES · eIDAS art. 25" },
      },
      {
        from: "parlament",
        to: "anchor",
        label: {
          ro: "Fiecare vot intră în registrul parlamentar; lanțul de hash-uri e ancorat public (WORM + ledger)",
          en: "Every vote lands in the parliamentary registry; the hash chain is anchored publicly (WORM + ledger)",
        },
        tech: { ro: "Ancore de transparență", en: "Transparency anchors" },
      },
      {
        from: "civic",
        to: "anchor",
        label: {
          ro: "Cetățenii și ONG-urile verifică independent istoricul de vot al fiecărui parlamentar",
          en: "Citizens and NGOs independently verify every MP's voting record",
        },
        tech: { ro: "Verificare publică", en: "Public verification" },
      },
    ],
  },
  {
    id: "vote-secret",
    title: {
      ro: "Votul secret în Parlament",
      en: "The secret vote in Parliament",
    },
    intro: {
      ro: "Cazul greu, făcut cinstit: buletinul criptat, eligibilitate anonimă, numărătoare verificabilă — iar lanțul ancorează doar urne și totaluri, niciodată voturi.",
      en: "The hard case, done honestly: encrypted ballots, anonymous eligibility, a verifiable tally — and the chain anchors only ballot boxes and totals, never votes.",
    },
    steps: [
      {
        from: "parlament",
        to: "citizen",
        label: {
          ro: "Secretariatul emite o „credențială de vot” anonimizată, valabilă doar pentru această sesiune",
          en: "The secretariat issues an anonymised “voting credential”, valid only for this session",
        },
        tech: {
          ro: "Anonymous credentials (BBS+)",
          en: "Anonymous credentials (BBS+)",
        },
      },
      {
        from: "citizen",
        to: "parlament",
        label: {
          ro: "Deputatul dovedește eligibilitatea FĂRĂ să se dezvăluie: „sunt un deputat în mandat”, nu „sunt X”",
          en: "The MP proves eligibility WITHOUT revealing themselves: “I hold a current mandate”, not “I am X”",
        },
        tech: {
          ro: "ZK proof pe credențială",
          en: "ZK proof over the credential",
        },
      },
      {
        from: "citizen",
        to: "parlament",
        label: {
          ro: "Votul e criptat pentru urna electronică și trimis printr-un mixnet — fără chitanță (ca să nu poată fi vândut)",
          en: "The vote is encrypted to the ballot box and sent through a mixnet — no receipt (so it can't be sold)",
        },
        tech: {
          ro: "ElGamal · mixnet · receipt-free",
          en: "ElGamal · mixnet · receipt-free",
        },
      },
      {
        from: "parlament",
        to: "anchor",
        label: {
          ro: "Urna ancorează public hash-ul fiecărui buletin primit — integritate globală, buletinele rămân criptate",
          en: "The ballot box anchors the hash of every received ballot — global integrity, ballots stay encrypted",
        },
        tech: { ro: "Merkle commitments", en: "Merkle commitments" },
      },
      {
        from: "parlament",
        to: "sts",
        label: {
          ro: "Numărătoare homomorfă; decriptarea totalului doar prin cuorumul M-din-N al grupurilor parlamentare",
          en: "Homomorphic tally; the total is decrypted only by the M-of-N quorum of parliamentary groups",
        },
        tech: {
          ro: "Cuorum HSM · ZK decryption",
          en: "HSM quorum · ZK decryption",
        },
      },
      {
        from: "civic",
        to: "anchor",
        label: {
          ro: "Verificare end-to-end: „buletinul meu a intrat, numărătoarea e corectă” — dar nimeni nu vede cum a votat cineva",
          en: "End-to-end verification: “my ballot was included, the tally is right” — but nobody sees how anyone voted",
        },
        tech: { ro: "E2E-V", en: "E2E-V" },
      },
    ],
  },
  {
    id: "mandat",
    title: {
      ro: "Administratorul de companie",
      en: "The company administrator",
    },
    intro: {
      ro: "Reprezentarea persoanei: semnezi cu propriul QES, iar mandatul leagă actul de firmă — sursa e ONRC, nu o hârtie din sertar.",
      en: "Person representation: you sign with your own QES and the mandate binds the act to the company — the source is ONRC, not a paper in a drawer.",
    },
    steps: [
      {
        from: "onrc",
        to: "companie",
        label: {
          ro: "ONRC înregistrează cine e administrator și ce puteri are — sursa autentică a mandatului statutar",
          en: "ONRC registers who is the administrator and with what powers — the authentic source of the statutory mandate",
        },
        tech: { ro: "RECOM · registru", en: "RECOM · registry" },
      },
      {
        from: "onrc",
        to: "citizen",
        label: {
          ro: "Wallet-ul primește atestarea de mandat: „administrator al XYZ SRL, puteri X, până la Y”",
          en: "The wallet receives the mandate attestation: “administrator of XYZ SRL, powers X, until Y”",
        },
        tech: { ro: "QEAA · OpenID4VCI", en: "QEAA · OpenID4VCI" },
      },
      {
        from: "citizen",
        to: "rp",
        label: {
          ro: "La semnare alegi „semnez ca”: tu însuți, sau firma — prezentarea include PID + mandatul",
          en: "When signing you choose “sign as”: yourself, or the company — the presentation carries the PID + the mandate",
        },
        tech: { ro: "OpenID4VP · QES", en: "OpenID4VP · QES" },
      },
      {
        from: "rp",
        to: "onrc",
        label: {
          ro: "Partenerul (bancă, autoritate) verifică lanțul mandatului până la ONRC și statusul curent",
          en: "The counterparty (bank, authority) verifies the mandate chain up to ONRC and its current status",
        },
        tech: { ro: "Backbone · Status List", en: "Backbone · Status List" },
      },
      {
        from: "companie",
        to: "rp",
        label: {
          ro: "Firma însăși (facturi automate, depuneri în masă) nu folosește o persoană: folosește sigiliul electronic calificat",
          en: "The company itself (automated invoices, bulk filings) uses no person: it uses its qualified electronic seal",
        },
        tech: { ro: "QSealC · eIDAS art. 35", en: "QSealC · eIDAS art. 35" },
      },
    ],
  },
  {
    id: "delegare",
    title: { ro: "Delegarea unei puteri", en: "Delegating a power" },
    intro: {
      ro: "Administratorul nu poate semna tot: delegarea în lanț, cu puteri limitate, termen și revocare imediată — tot din wallet.",
      en: "The administrator can't sign everything: chained delegation, with limited powers, an expiry and instant revocation — all from the wallet.",
    },
    steps: [
      {
        from: "citizen",
        to: "companie",
        label: {
          ro: "Administratorul emite angajatului o delegare semnată QES: ce poate semna, până când, în ce plafon",
          en: "The administrator issues the employee a QES-signed delegation: what they may sign, until when, up to what limit",
        },
        tech: { ro: "QEAA delegare", en: "Delegation QEAA" },
      },
      {
        from: "companie",
        to: "rp",
        label: {
          ro: "Angajatul semnează „în numele firmei”; partenerul verifică lanțul: ONRC → administrator → delegare",
          en: "The employee signs “on behalf of the company”; the counterparty verifies the chain: ONRC → administrator → delegation",
        },
        tech: { ro: "Lanț de mandat", en: "Mandate chain" },
      },
      {
        from: "citizen",
        to: "onrc",
        label: {
          ro: "Revocare instantă: administratorul retrage delegarea, ONRC actualizează mandatul statutar — efect imediat peste tot",
          en: "Instant revocation: the administrator withdraws the delegation, ONRC updates the statutory mandate — immediate effect everywhere",
        },
        tech: { ro: "Status List", en: "Status List" },
      },
    ],
  },
];

export const VARIANT_LABEL: Record<JourneyVariant, Bi> = {
  optional: { ro: "Opțional", en: "Optional" },
  fallback: { ro: "Plan B", en: "Plan B" },
  standard: { ro: "", en: "" },
};
