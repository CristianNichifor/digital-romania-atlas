import type { Bi } from "../i18n";

export interface HrTeam {
  key: string;
  team: Bi;
  layer: Bi;
  fte: string;
  roles: Bi;
  notes: Bi;
}

export const HR_TEAMS: HrTeam[] = [
  {
    key: "platform",
    team: { ro: "Platformă & infrastructură", en: "Platform & infrastructure" },
    layer: { ro: "L1–L3", en: "L1–L3" },
    fte: "20–35",
    roles: {
      ro: "Tech lead ×1, SRE ×6–10, backend ×6–10, ingineri date ×2–4, rețea ×3–4, QA ×2, tech writer ×1",
      en: "Tech lead ×1, SRE ×6–10, backend ×6–10, data engineers ×2–4, network ×3–4, QA ×2, tech writer ×1",
    },
    notes: {
      ro: "Echipa care construiește backbone-ul, gateway-ul de consimțământ și portalurile; on-call 24/7 în ture.",
      en: "The team that builds the backbone, the consent gateway and the portals; 24/7 on-call rotation.",
    },
  },
  {
    key: "identity",
    team: { ro: "Identitate & portofel", en: "Identity & wallet" },
    layer: { ro: "L2 (MAI)", en: "L2 (MAI)" },
    fte: "25–45",
    roles: {
      ro: "Mobile iOS/Android ×6–8, backend portofel ×6–8, crypto/HSM ×3–5, PKI/QES ×2–3, integrări emitent ×3–5, QA/security ×2",
      en: "Mobile iOS/Android ×6–8, wallet backend ×6–8, crypto/HSM ×3–5, PKI/QES ×2–3, issuer integrations ×3–5, QA/security ×2",
    },
    notes: {
      ro: "Cea mai sensibilă echipă: ceremonii de chei, certificare eIDAS, corectitudine criptografică verificabilă.",
      en: "The most sensitive team: key ceremonies, eIDAS certification, verifiable cryptographic correctness.",
    },
  },
  {
    key: "backbone",
    team: { ro: "Backbone & registre", en: "Backbone & registries" },
    layer: { ro: "L3 (STS / ADR)", en: "L3 (STS / ADR)" },
    fte: "15–25",
    roles: {
      ro: "X-Road/security servers ×4–6, ingineri conectori ×4–6, catalog de date ×2, monitorizare ×2",
      en: "X-Road/security servers ×4–6, connector engineers ×4–6, data catalogue ×2, monitoring ×2",
    },
    notes: {
      ro: "Nucleul restrâns; conectorii per minister se finanțează separat, în valuri de înrolare.",
      en: "A small core; per-ministry connectors are funded separately, in enrolment waves.",
    },
  },
  {
    key: "payments",
    team: { ro: "Plăți", en: "Payments" },
    layer: { ro: "L5 (BNR / TransFonD)", en: "L5 (BNR / TransFonD)" },
    fte: "8–12",
    roles: {
      ro: "Arhitecți de plăți ×2–3, SEPA/RTP ×3–4, reconciliere ×2, conformitate PSD2 ×1",
      en: "Payments architects ×2–3, SEPA/RTP ×3–4, reconciliation ×2, PSD2 compliance ×1",
    },
    notes: {
      ro: "Echipă mică, dar cu exigență bancară: toleranță zero la erori de decontare.",
      en: "A small team, but with banking-grade rigour: zero tolerance for settlement errors.",
    },
  },
  {
    key: "security",
    team: { ro: "Securitate & SOC", en: "Security & SOC" },
    layer: { ro: "L6 (DNSC)", en: "L6 (DNSC)" },
    fte: "12–20",
    roles: {
      ro: "SOC L1/L2 ×6–10, red team ×2–3, forensică ×2, threat intel ×1–2, inginerie de securitate ×2–3",
      en: "SOC L1/L2 ×6–10, red team ×2–3, forensics ×2, threat intel ×1–2, security engineering ×2–3",
    },
    notes: {
      ro: "Scut DDoS, SIEM inter-instituțional, red team de 2×/an, model de amenințare public.",
      en: "DDoS shield, cross-institution SIEM, red team 2×/year, public threat model.",
    },
  },
  {
    key: "oversight",
    team: { ro: "Supraveghere & audit", en: "Oversight & audit" },
    layer: { ro: "L6 (independent)", en: "L6 (independent)" },
    fte: "4–8",
    roles: {
      ro: "DPO ×1–2, auditori ×2–3, verificare ancore publice ×1",
      en: "DPO ×1–2, auditors ×2–3, public-anchor verification ×1",
    },
    notes: {
      ro: "Audituri publice anuale; rapoartele merg în portalul de transparență.",
      en: "Public annual audits; reports go to the transparency portal.",
    },
  },
  {
    key: "field",
    team: { ro: "L0 & suport de teren", en: "L0 & field support" },
    layer: { ro: "Unități locale (≈{units})", en: "Local units (≈{units})" },
    fte: "20–35",
    roles: {
      ro: "1–2 tehnicieni per județ (42), helpdesk central ×8–12, traineri ×2–3",
      en: "1–2 technicians per county (42), central helpdesk ×8–12, trainers ×2–3",
    },
    notes: {
      ro: "Înrolare în valuri: 8 săptămâni per unitate administrativă, migrare chat-first, plasa de siguranță fizică.",
      en: "Wave-based enrolment: 8 weeks per administrative unit, chat-first migration, the physical safety net.",
    },
  },
  {
    key: "product",
    team: {
      ro: "Produs, design & cercetare",
      en: "Product, design & research",
    },
    layer: { ro: "transversal", en: "cross-cutting" },
    fte: "8–12",
    roles: {
      ro: "PM ×3–4, UX/design ×3–4, cercetare utilizatori ×1–2, tech writer ×1–2",
      en: "PM ×3–4, UX/design ×3–4, user research ×1–2, tech writer ×1–2",
    },
    notes: {
      ro: "Accesibilitate WCAG, testare cu seniori și diaspora, evenimente de viață wallet-first.",
      en: "WCAG accessibility, testing with seniors and the diaspora, wallet-first life events.",
    },
  },
  {
    key: "mgmt",
    team: {
      ro: "Management, PMO, juridic, achiziții",
      en: "Management, PMO, legal, procurement",
    },
    layer: { ro: "transversal", en: "cross-cutting" },
    fte: "8–12",
    roles: {
      ro: "Directori de program ×2, PMO ×2–3, juridic/DPO ×2, achiziții ×2–3",
      en: "Programme directors ×2, PMO ×2–3, legal/DPO ×2, procurement ×2–3",
    },
    notes: {
      ro: "Inclusiv licitațiile pentru HSM, DC-uri și audituri externe — transparență ancorată.",
      en: "Including tenders for HSMs, DCs and external audits — anchored transparency.",
    },
  },
];

export interface HrInstitution {
  key: string;
  institution: Bi;
  fte: string;
  focus: Bi;
  pay: Bi;
}

export const HR_INSTITUTIONS: HrInstitution[] = [
  {
    key: "mai",
    institution: { ro: "MAI (DGCTI / DGEP)", en: "MAI (DGCTI / DGEP)" },
    fte: "30–50",
    focus: {
      ro: "Furnizor portofel + emitent PID/PuB-EAA + HUB MAI; mobile, backend, crypto",
      en: "Wallet provider + PID/PuB-EAA issuer + HUB MAI; mobile, backend, crypto",
    },
    pay: {
      ro: "Grilă specială: competențe crypto/HSM rare — top-up 10–20% peste piață",
      en: "Special grid: rare crypto/HSM skills — 10–20% market top-up",
    },
  },
  {
    key: "sts",
    institution: { ro: "STS", en: "STS" },
    fte: "15–25",
    focus: {
      ro: "Rețea națională, WRPRC/WRPAC, ceremonii de chei, operațiuni backbone, IXP",
      en: "National network, WRPRC/WRPAC, key ceremonies, backbone operations, IXP",
    },
    pay: {
      ro: "Experți rețea certificați (CCIE echiv.), bonus de retenție per ceremonie",
      en: "Certified network experts (CCIE-equiv.), retention bonus per ceremony",
    },
  },
  {
    key: "adr",
    institution: { ro: "ADR", en: "ADR" },
    fte: "20–30",
    focus: {
      ro: "Portal cetățean, Ghiseul.ro v2, catalog de date, standarde, dezvoltatori",
      en: "Citizen portal, Ghiseul.ro v2, data catalogue, standards, developers",
    },
    pay: {
      ro: "Grila agenției digitale (propunere): nivel piață privată, nu grila bugetară",
      en: "Digital-agency grid (proposal): private-market level, not the public grid",
    },
  },
  {
    key: "medat",
    institution: { ro: "MEDAT", en: "MEDAT" },
    fte: "5–10",
    focus: {
      ro: "Comisia RO EUDIW, coordonare interministerială, fonduri PNRR/UE",
      en: "RO EUDIW Commission, inter-ministerial coordination, PNRR/EU funds",
    },
    pay: {
      ro: "Funcție publică; detașări posibile pentru roluri tehnice",
      en: "Civil service; secondments possible for technical roles",
    },
  },
  {
    key: "bnr",
    institution: { ro: "BNR + TransFonD", en: "BNR + TransFonD" },
    fte: "8–12",
    focus: {
      ro: "Hub de plăți publice, decontare instant, reconciliere, e-mandat",
      en: "Public payment hub, instant settlement, reconciliation, e-mandate",
    },
    pay: {
      ro: "Grila bancară — mai generoasă decât administrația; atrage de la PSP-uri",
      en: "Banking grid — richer than public administration; attracts from PSPs",
    },
  },
  {
    key: "dnsc",
    institution: { ro: "DNSC", en: "DNSC" },
    fte: "12–20",
    focus: {
      ro: "SOC, scut DDoS, red team, cooperare NIS2, coordonare incidente",
      en: "SOC, DDoS shield, red team, NIS2 cooperation, incident coordination",
    },
    pay: {
      ro: "Top-up de securitate: analiști SOC concurați direct de sectorul privat",
      en: "Security top-up: SOC analysts are directly poached by the private sector",
    },
  },
  {
    key: "anspdcp",
    institution: { ro: "ANSPDCP", en: "ANSPDCP" },
    fte: "3–5",
    focus: {
      ro: "DPO instituțional, audituri de confidențialitate, consimțământ la gateway",
      en: "Institutional DPO, privacy audits, consent at the gateway",
    },
    pay: {
      ro: "Funcție publică; parteneriat cu mediul academic pentru cercetare GDPR",
      en: "Civil service; academia partnership for GDPR research",
    },
  },
  {
    key: "anaf",
    institution: { ro: "ANAF", en: "ANAF" },
    fte: "6–12",
    focus: {
      ro: "Conectori SPV/e-Factura/e-TVA, cont fiscal unic, „once-only” fiscal",
      en: "SPV/e-Factura/e-TVA connectors, single tax account, tax once-only",
    },
    pay: {
      ro: "Detasări mixte: angajați ANAF + contractorii agenției digitale",
      en: "Mixed secondments: ANAF staff + digital-agency contractors",
    },
  },
  {
    key: "cnas",
    institution: { ro: "CNAS", en: "CNAS" },
    fte: "4–8",
    focus: {
      ro: "Conectori DES/e-rețetă, frontend „Sănătatea mea”, SIUI ca sursă",
      en: "DES/e-prescription connectors, “My Health” frontend, SIUI as the source",
    },
    pay: {
      ro: "Echipe mixte clinico-tehnice; informaticieni medicali scumpi și rari",
      en: "Mixed clinical-technical teams; medical informaticians are scarce and pricey",
    },
  },
  {
    key: "onrc",
    institution: { ro: "ONRC", en: "ONRC" },
    fte: "4–8",
    focus: {
      ro: "RECOM cu autentificare wallet, portal business, e-Factura prin backbone",
      en: "RECOM with wallet auth, business portal, e-Factura via the backbone",
    },
    pay: {
      ro: "Echipă de produs compactă; contractare framework pe 4 ani",
      en: "A compact product team; 4-year framework contracting",
    },
  },
  {
    key: "men",
    institution: { ro: "MEN", en: "MEN" },
    fte: "4–8",
    focus: {
      ro: "REGES/SIIIR, ARN, QEAA diplome, admitere verificată la sursă",
      en: "REGES/SIIIR, ARN, diploma QEAAs, admission verified at source",
    },
    pay: {
      ro: "Parteneriate cu universitățile — emitenții QEAA sunt în afara statului central",
      en: "Partnerships with universities — QEAA issuers sit outside central government",
    },
  },
  {
    key: "ancpi",
    institution: { ro: "ANCPI", en: "ANCPI" },
    fte: "3–5",
    focus: {
      ro: "Conector e-Terra/carte funciară, servicii cadastru în portal",
      en: "e-Terra/land-book connector, cadastre services in the portal",
    },
    pay: {
      ro: "Conector standard — costurile de integrare sunt per înregistru, nu per angajat",
      en: "Standard connector — integration costs are per registry, not per employee",
    },
  },
  {
    key: "uat",
    institution: {
      ro: "Unități locale (≈{units} după reforma administrativă)",
      en: "Local units (≈{units} after the administrative reform)",
    },
    fte: "1 per unitate (valuri)",
    focus: {
      ro: "Hub L0 local, suport asistat, emitere asistată la poștă/sediul unității",
      en: "Local L0 hub, assisted support, assisted issuance at post/unit office",
    },
    pay: {
      ro: "Grila locală + formare plătită; jumătate de normă inițial, apoi full",
      en: "Local grid + paid training; part-time at first, then full-time",
    },
  },
  {
    key: "edu-civic",
    institution: {
      ro: "Universități & societate civilă",
      en: "Universities & civil society",
    },
    fte: "2–4 per partener",
    focus: {
      ro: "Emiți QEAA (diplome), verificare independentă a ancorelor, CivicTech",
      en: "QEAA issuers (diplomas), independent anchor verification, CivicTech",
    },
    pay: {
      ro: "Granturi deschise, nu salarii de stat — independență contractuală",
      en: "Open grants, not state salaries — contractual independence",
    },
  },
];

export interface PayRow {
  key: string;
  role: Bi;
  roBand: string;
  euBand: string;
}

export const PAY_ROWS: PayRow[] = [
  {
    key: "sre",
    role: { ro: "SRE senior", en: "Senior SRE" },
    roBand: "45–70 k€",
    euBand: "90–140 k€",
  },
  {
    key: "eng-senior",
    role: { ro: "Inginer software senior", en: "Senior software engineer" },
    roBand: "35–60 k€",
    euBand: "75–120 k€",
  },
  {
    key: "eng-mid",
    role: { ro: "Inginer software (mid)", en: "Mid software engineer" },
    roBand: "22–38 k€",
    euBand: "50–75 k€",
  },
  {
    key: "mobile",
    role: {
      ro: "Dezvoltator mobil (iOS/Android)",
      en: "Mobile developer (iOS/Android)",
    },
    roBand: "30–55 k€",
    euBand: "70–110 k€",
  },
  {
    key: "sec",
    role: { ro: "Inginer de securitate", en: "Security engineer" },
    roBand: "40–65 k€",
    euBand: "80–130 k€",
  },
  {
    key: "soc",
    role: { ro: "Analist SOC", en: "SOC analyst" },
    roBand: "20–38 k€",
    euBand: "45–75 k€",
  },
  {
    key: "crypto",
    role: { ro: "Specialist crypto/HSM/PKI", en: "Crypto/HSM/PKI specialist" },
    roBand: "45–75 k€",
    euBand: "90–150 k€",
  },
  {
    key: "data",
    role: { ro: "Inginer date", en: "Data engineer" },
    roBand: "30–55 k€",
    euBand: "70–110 k€",
  },
  {
    key: "net",
    role: { ro: "Inginer rețea senior", en: "Senior network engineer" },
    roBand: "30–50 k€",
    euBand: "65–100 k€",
  },
  {
    key: "pm",
    role: { ro: "Product manager", en: "Product manager" },
    roBand: "25–45 k€",
    euBand: "60–95 k€",
  },
  {
    key: "ux",
    role: { ro: "UX / designer", en: "UX / designer" },
    roBand: "20–38 k€",
    euBand: "45–85 k€",
  },
  {
    key: "writer",
    role: { ro: "Tech writer", en: "Tech writer" },
    roBand: "18–32 k€",
    euBand: "40–65 k€",
  },
  {
    key: "support",
    role: { ro: "Suport / helpdesk", en: "Support / helpdesk" },
    roBand: "15–25 k€",
    euBand: "30–45 k€",
  },
  {
    key: "field",
    role: { ro: "Tehnician de teren (UAT)", en: "Field technician (UAT)" },
    roBand: "12–20 k€",
    euBand: "28–40 k€",
  },
  {
    key: "em",
    role: { ro: "Engineering manager", en: "Engineering manager" },
    roBand: "55–80 k€",
    euBand: "100–150 k€",
  },
  {
    key: "ciso",
    role: { ro: "CISO / lead securitate", en: "CISO / security lead" },
    roBand: "60–90 k€",
    euBand: "120–180 k€",
  },
];

export const HR_PAYROLL: Bi = {
  ro: "Total salarial estimat: 8–12M €/an (100–170 FTE central + 20–40 conectori + valuri de teren) — consistent cu opex-ul de 25–45M €/an de mai sus.",
  en: "Estimated payroll: €8–12M/year (100–170 central FTE + 20–40 connectors + field waves) — consistent with the €25–45M/year opex above.",
};
