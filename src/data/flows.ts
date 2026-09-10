import type { Bi } from "../i18n";

export type FlowKind =
  | "identity"
  | "presentation"
  | "attestation"
  | "backbone"
  | "payment"
  | "lifecycle"
  | "security"
  | "notification"
  | "trust"
  | "oversight"
  | "governance"
  | "service"
  | "anchor";

export interface Flow {
  id: string;
  from: string;
  to: string;
  kind: FlowKind;
  label: Bi;
  tech?: Bi;
  status: "current" | "proposed";
}

export const FLOW_COLORS: Record<FlowKind, string> = {
  identity: "#4f8cff",
  presentation: "#7b5cff",
  attestation: "#2ac7a3",
  backbone: "#ffb020",
  payment: "#2ecc71",
  lifecycle: "#b8c4d4",
  security: "#ff6b6b",
  notification: "#ff8bd0",
  trust: "#ffd166",
  oversight: "#9aa7b8",
  governance: "#9aa7b8",
  service: "#53c1e8",
  anchor: "#22d3ee",
};

export const FLOW_LABELS: Record<FlowKind, Bi> = {
  identity: { ro: "Identitate", en: "Identity" },
  presentation: { ro: "Prezentare", en: "Presentation" },
  attestation: { ro: "Atestare", en: "Attestation" },
  backbone: { ro: "Backbone date", en: "Data backbone" },
  payment: { ro: "Plăți", en: "Payments" },
  lifecycle: { ro: "Ciclu de viață", en: "Lifecycle" },
  security: { ro: "Securitate", en: "Security" },
  notification: { ro: "Notificări", en: "Notifications" },
  trust: { ro: "Încredere", en: "Trust" },
  oversight: { ro: "Supraveghere", en: "Oversight" },
  governance: { ro: "Guvernanță", en: "Governance" },
  service: { ro: "Servicii", en: "Services" },
  anchor: { ro: "Ancoră publică", en: "Public anchor" },
};

export const FLOWS: Flow[] = [
  {
    id: "f-pid-issue",
    from: "dgep",
    to: "citizen",
    kind: "identity",
    label: {
      ro: "Emite PID (nume, CNP, cetățenie, foto)",
      en: "Issues PID (name, CNP, citizenship, photo)",
    },
    tech: { ro: "OpenID4VCI · LoA High", en: "OpenID4VCI · LoA High" },
    status: "current",
  },
  {
    id: "f-pid-present",
    from: "citizen",
    to: "rp",
    kind: "presentation",
    label: {
      ro: "Prezintă PID / atribute (divulgare selectivă)",
      en: "Presents PID / attributes (selective disclosure)",
    },
    tech: {
      ro: "OpenID4VP · SD-JWT / ISO 18013-5",
      en: "OpenID4VP · SD-JWT / ISO 18013-5",
    },
    status: "current",
  },
  {
    id: "f-rp-check",
    from: "rp",
    to: "dgep",
    kind: "identity",
    label: {
      ro: "Verifică valabilitate PID",
      en: "Verifies PID validity",
    },
    tech: {
      ro: "Token Status List (privacy-preserving)",
      en: "Token Status List (privacy-preserving)",
    },
    status: "current",
  },
  {
    id: "f-wb-lifecycle",
    from: "citizen",
    to: "wb",
    kind: "lifecycle",
    label: {
      ro: "Activare WI, atestări WIA, revocare",
      en: "WI activation, WIA attestations, revocation",
    },
    tech: { ro: "Wallet Backend API", en: "Wallet Backend API" },
    status: "current",
  },
  {
    id: "f-wb-status",
    from: "wb",
    to: "dgep",
    kind: "lifecycle",
    label: {
      ro: "Publică WIA status lists",
      en: "Publishes WIA status lists",
    },
    tech: { ro: "Status List Service", en: "Status List Service" },
    status: "current",
  },
  {
    id: "f-mdvm-token",
    from: "mdvm",
    to: "citizen",
    kind: "security",
    label: {
      ro: "Token vulnerabilitate dispozitiv → restricționează WI",
      en: "Device vulnerability token → restricts WI",
    },
    tech: { ro: "MDVM API", en: "MDVM API" },
    status: "current",
  },
  {
    id: "f-mpp-push",
    from: "mpp",
    to: "citizen",
    kind: "notification",
    label: {
      ro: "Notificări push către wallet",
      en: "Push notifications to the wallet",
    },
    tech: { ro: "APNs / FCM", en: "APNs / FCM" },
    status: "current",
  },
  {
    id: "f-mpp-attest",
    from: "mpp",
    to: "mdvm",
    kind: "security",
    label: {
      ro: "Atestări de platformă",
      en: "Platform attestations",
    },
    tech: {
      ro: "Play Integrity / App Attest",
      en: "Play Integrity / App Attest",
    },
    status: "current",
  },
  {
    id: "f-rwsca",
    from: "rwsca",
    to: "citizen",
    kind: "security",
    label: {
      ro: "Operații criptografice remote (chei critice)",
      en: "Remote cryptographic operations (critical keys)",
    },
    tech: { ro: "RWSCA API + HSM", en: "RWSCA API + HSM" },
    status: "current",
  },
  {
    id: "f-qtsp-qes",
    from: "qtsp",
    to: "citizen",
    kind: "identity",
    label: {
      ro: "QES gratuit (wallet-centric)",
      en: "Free QES (wallet-centric)",
    },
    tech: { ro: "Planificat – etapa 2", en: "Planned – phase 2" },
    status: "current",
  },
  {
    id: "f-rnep-source",
    from: "rnep",
    to: "dgep",
    kind: "identity",
    label: {
      ro: "Date de identitate garantate la sursă",
      en: "Identity data guaranteed at source",
    },
    tech: { ro: "Registru intern", en: "Internal registry" },
    status: "current",
  },
  {
    id: "f-hub-mai-rp",
    from: "citizen",
    to: "hub-mai",
    kind: "presentation",
    label: {
      ro: "Servicii MAI consumă atribute",
      en: "MAI services consume attributes",
    },
    tech: { ro: "HUB MAI ca relying party", en: "HUB MAI as relying party" },
    status: "current",
  },
  {
    id: "f-sts-cert",
    from: "sts",
    to: "rp",
    kind: "trust",
    label: {
      ro: "Certificat de acces WRPAC (înregistrare RP)",
      en: "WRPAC access certificate (RP registration)",
    },
    tech: { ro: "Registru național", en: "National registry" },
    status: "current",
  },
  {
    id: "f-sts-wallet",
    from: "sts",
    to: "dgcti",
    kind: "trust",
    label: {
      ro: "Certificat de înregistrare WRPRC (furnizor wallet)",
      en: "WRPRC registration certificate (wallet provider)",
    },
    tech: { ro: "Registru național", en: "National registry" },
    status: "current",
  },
  {
    id: "f-medat-gov",
    from: "medat",
    to: "dgcti",
    kind: "governance",
    label: {
      ro: "Guvernanță ecosistem, monitorizare",
      en: "Ecosystem governance, monitoring",
    },
    tech: { ro: "Comisia RO EUDIW", en: "RO EUDIW Commission" },
    status: "current",
  },
  {
    id: "f-adr-qtsp",
    from: "adr",
    to: "qtsp",
    kind: "oversight",
    label: {
      ro: "Supraveghere QTSP, Liste de Încredere",
      en: "QTSP supervision, Trust Lists",
    },
    tech: { ro: "eIDAS", en: "eIDAS" },
    status: "current",
  },
  {
    id: "f-dgpi-cyber",
    from: "dgpi",
    to: "dgcti",
    kind: "oversight",
    label: {
      ro: "Supervizare securitate cibernetică (internă MAI)",
      en: "Cybersecurity supervision (internal to MAI)",
    },
    tech: { ro: "—", en: "—" },
    status: "current",
  },
  {
    id: "p-xroad-rp",
    from: "rp",
    to: "xroad",
    kind: "backbone",
    label: {
      ro: "Interogări de atribute cu consimțământ, scop delimitat",
      en: "Consent-based attribute queries, bounded purpose",
    },
    tech: {
      ro: "X-Road REST · jurnale semnate",
      en: "X-Road REST · signed logs",
    },
    status: "proposed",
  },
  {
    id: "p-xroad-sources",
    from: "xroad",
    to: "cnas",
    kind: "backbone",
    label: {
      ro: "Schimb securizat cu registrele sursă",
      en: "Secure exchange with source registries",
    },
    tech: { ro: "X-Road / GovStack", en: "X-Road / GovStack" },
    status: "proposed",
  },
  {
    id: "p-xroad-anaf",
    from: "xroad",
    to: "anaf",
    kind: "backbone",
    label: {
      ro: "Schimb securizat cu registrele sursă",
      en: "Secure exchange with source registries",
    },
    tech: { ro: "X-Road / GovStack", en: "X-Road / GovStack" },
    status: "proposed",
  },
  {
    id: "p-xroad-onrc",
    from: "xroad",
    to: "onrc",
    kind: "backbone",
    label: {
      ro: "Schimb securizat cu registrele sursă",
      en: "Secure exchange with source registries",
    },
    tech: { ro: "X-Road / GovStack", en: "X-Road / GovStack" },
    status: "proposed",
  },
  {
    id: "p-xroad-men",
    from: "xroad",
    to: "men",
    kind: "backbone",
    label: {
      ro: "Schimb securizat cu registrele sursă",
      en: "Secure exchange with source registries",
    },
    tech: { ro: "X-Road / GovStack", en: "X-Road / GovStack" },
    status: "proposed",
  },
  {
    id: "p-rtp-request",
    from: "citizen",
    to: "rp",
    kind: "payment",
    label: {
      ro: "Cerere de plată / QR în wallet",
      en: "Payment request / QR in wallet",
    },
    tech: {
      ro: "SEPA Request-to-Pay · EPC QR",
      en: "SEPA Request-to-Pay · EPC QR",
    },
    status: "proposed",
  },
  {
    id: "p-sepa-settle",
    from: "rp",
    to: "transfond",
    kind: "payment",
    label: {
      ro: "Execută plată instant",
      en: "Executes instant payment",
    },
    tech: {
      ro: "SEPA Instant / TIPS / Alia",
      en: "SEPA Instant / TIPS / Alia",
    },
    status: "proposed",
  },
  {
    id: "p-bnr-over",
    from: "bnr",
    to: "transfond",
    kind: "oversight",
    label: {
      ro: "Supraveghere sisteme de plăți",
      en: "Payment systems oversight",
    },
    tech: { ro: "—", en: "—" },
    status: "proposed",
  },
  {
    id: "p-postbox",
    from: "xroad",
    to: "postbox",
    kind: "service",
    label: {
      ro: "Livrare documente cu valoare legală",
      en: "Delivery of legally binding documents",
    },
    tech: { ro: "Cutia Digitală", en: "Digital Postbox" },
    status: "proposed",
  },
  {
    id: "p-postbox-citizen",
    from: "postbox",
    to: "citizen",
    kind: "service",
    label: {
      ro: "Notificări prin canale de încredere (anti-phishing)",
      en: "Notifications via trusted channels (anti-phishing)",
    },
    tech: {
      ro: "Push / email / SMS verificat",
      en: "Push / verified email / SMS",
    },
    status: "proposed",
  },
  {
    id: "p-consulate",
    from: "consulate",
    to: "dgep",
    kind: "identity",
    label: {
      ro: "Verificare identitate diaspora",
      en: "Diaspora identity verification",
    },
    tech: { ro: "OpenID4VCI la distanță", en: "Remote OpenID4VCI" },
    status: "proposed",
  },
  {
    id: "p-uat",
    from: "uat",
    to: "citizen",
    kind: "service",
    label: {
      ro: "Emitere asistată, ghișeu fizic, fallback offline",
      en: "Assisted issuance, physical desk, offline fallback",
    },
    tech: { ro: "ISO 18013-5", en: "ISO 18013-5" },
    status: "proposed",
  },
  {
    id: "p-dnsc",
    from: "dnsc",
    to: "xroad",
    kind: "oversight",
    label: {
      ro: "Monitorizare incidente, SOC național",
      en: "Incident monitoring, national SOC",
    },
    tech: { ro: "—", en: "—" },
    status: "proposed",
  },
  {
    id: "p-dpa",
    from: "anspdcp",
    to: "xroad",
    kind: "oversight",
    label: {
      ro: "Supraveghere protecția datelor, DPIA",
      en: "Data protection supervision, DPIA",
    },
    tech: { ro: "—", en: "—" },
    status: "proposed",
  },
  {
    id: "p-a-sts",
    from: "sts",
    to: "anchor",
    kind: "anchor",
    label: {
      ro: "Ancorează starea registrului WRPRC/WRPAC + minutele ceremoniilor de chei",
      en: "Anchors WRPRC/WRPAC registry state + key ceremony minutes",
    },
    tech: {
      ro: "root hash-uri · lanț permisiv + EBSI",
      en: "root hashes · permissionless chain + EBSI",
    },
    status: "proposed",
  },
  {
    id: "p-a-build",
    from: "dgcti",
    to: "anchor",
    kind: "anchor",
    label: {
      ro: "Ancorează hash-urile fiecărui build al wallet-ului (SBOM/SLSA)",
      en: "Anchors every wallet build hash (SBOM/SLSA)",
    },
    tech: {
      ro: "build-uri reproducibile",
      en: "reproducible builds",
    },
    status: "proposed",
  },
  {
    id: "p-a-ostree",
    from: "hub-l0",
    to: "anchor",
    kind: "anchor",
    label: {
      ro: "Ancorează hash-urile imaginilor OSTree",
      en: "Anchors OSTree image hashes",
    },
    tech: { ro: "commit OSTree", en: "OSTree commit" },
    status: "proposed",
  },
  {
    id: "p-a-report",
    from: "transparency",
    to: "anchor",
    kind: "anchor",
    label: {
      ro: "Ancorează rapoarte SLA, incidente, achiziții",
      en: "Anchors SLA, incident, procurement reports",
    },
    tech: { ro: "minute ancorate", en: "anchored minutes" },
    status: "proposed",
  },
  {
    id: "p-a-verify",
    from: "citizen",
    to: "transparency",
    kind: "service",
    label: {
      ro: "Verifică public orice artefact — verify, don't trust",
      en: "Publicly verifies any artifact — verify, don't trust",
    },
    tech: { ro: "portal public", en: "public portal" },
    status: "proposed",
  },
  {
    id: "p-edu-xroad",
    from: "university",
    to: "xroad",
    kind: "backbone",
    label: {
      ro: "Verifică diplome și admiterea prin backbone",
      en: "Verifies diplomas and admission via the backbone",
    },
    tech: { ro: "X-Road · QEAA", en: "X-Road · QEAA" },
    status: "proposed",
  },
  {
    id: "p-edu-men",
    from: "xroad",
    to: "men",
    kind: "backbone",
    label: {
      ro: "Sursă autentică studii (REGES/arn)",
      en: "Education authentic source (REGES/ARN)",
    },
    tech: { ro: "X-Road / GovStack", en: "X-Road / GovStack" },
    status: "proposed",
  },
  {
    id: "p-edu-present",
    from: "citizen",
    to: "university",
    kind: "presentation",
    label: {
      ro: "Înscriere la facultate cu QEAA diplomă + PID",
      en: "University enrolment with diploma QEAA + PID",
    },
    tech: { ro: "OpenID4VP", en: "OpenID4VP" },
    status: "proposed",
  },
  {
    id: "p-ancpi-xroad",
    from: "xroad",
    to: "ancpi",
    kind: "backbone",
    label: {
      ro: "Extras de carte funciară la cerere, cu consimțământ",
      en: "Land book extract on request, with consent",
    },
    tech: { ro: "X-Road / GovStack", en: "X-Road / GovStack" },
    status: "proposed",
  },
  {
    id: "p-civic-transp",
    from: "civic",
    to: "transparency",
    kind: "oversight",
    label: {
      ro: "ONG-urile verifică rapoartele statului",
      en: "NGOs verify the state's reports",
    },
    tech: { ro: "portal public", en: "public portal" },
    status: "proposed",
  },
  {
    id: "p-civic-anchor",
    from: "civic",
    to: "anchor",
    kind: "anchor",
    label: {
      ro: "Verifică independent ancorele publice",
      en: "Independently verifies the public anchors",
    },
    tech: { ro: "verificare on-chain", en: "on-chain verification" },
    status: "proposed",
  },
];
