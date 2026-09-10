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
];

export const VARIANT_LABEL: Record<JourneyVariant, Bi> = {
  optional: { ro: "Opțional", en: "Optional" },
  fallback: { ro: "Plan B", en: "Plan B" },
  standard: { ro: "", en: "" },
};
