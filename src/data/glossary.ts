import type { Bi } from "../i18n";

export interface GlossaryEntry {
  term: string;
  text: Bi;
  detail?: Bi;
}

export const GLOSSARY: GlossaryEntry[] = [
  {
    term: "PID",
    text: {
      ro: "Personal Identification Data — date de identificare personală",
      en: "Personal Identification Data",
    },
  },
  {
    term: "LoA",
    text: {
      ro: "Level of Assurance — nivelul de încredere al unei identități electronice (Low, Substantial, High)",
      en: "Level of Assurance — the trust level of an electronic identity (Low, Substantial, High)",
    },
  },
  {
    term: "NIIS",
    text: {
      ro: "Nordic Institute for Interoperability Solutions — institutul care dezvoltă X-Road",
      en: "Nordic Institute for Interoperability Solutions — the institute that develops X-Road",
    },
  },
  {
    term: "QES",
    text: {
      ro: "Qualified Electronic Signature — semnătură electronică calificată",
      en: "Qualified Electronic Signature",
    },
  },
  {
    term: "QEAA",
    text: {
      ro: "Qualified Electronic Attestation of Attributes — atestare electronică calificată de atribute",
      en: "Qualified Electronic Attestation of Attributes",
    },
  },
  {
    term: "SRE",
    text: {
      ro: "Site Reliability Engineering — inginerie de fiabilitate (on-call, SLO-uri)",
      en: "Site Reliability Engineering (on-call, SLOs)",
    },
  },
  {
    term: "SOC",
    text: {
      ro: "Security Operations Center — centrul de operațiuni de securitate",
      en: "Security Operations Center",
    },
  },
  {
    term: "PKI",
    text: {
      ro: "Public Key Infrastructure — infrastructura de chei publice",
      en: "Public Key Infrastructure",
    },
  },
  {
    term: "DPO",
    text: {
      ro: "Data Protection Officer — responsabilul cu protecția datelor",
      en: "Data Protection Officer",
    },
  },
  {
    term: "CISO",
    text: {
      ro: "Chief Information Security Officer — responsabilul de securitate informațională",
      en: "Chief Information Security Officer",
    },
  },
  {
    term: "PM",
    text: { ro: "Product Manager — manager de produs", en: "Product Manager" },
  },
  {
    term: "UX",
    text: {
      ro: "User Experience — experiența utilizatorului",
      en: "User Experience",
    },
  },
  {
    term: "PSD2",
    text: {
      ro: "Payment Services Directive 2 — Directiva (UE) 2015/2366 privind serviciile de plată",
      en: "Payment Services Directive 2 — Directive (EU) 2015/2366",
    },
  },
  {
    term: "PNRR",
    text: {
      ro: "Planul Național de Redresare și Reziliență",
      en: "Romania's National Recovery and Resilience Plan",
    },
  },
  {
    term: "EUDI",
    text: {
      ro: "European Digital Identity — identitatea digitală europeană",
      en: "European Digital Identity",
    },
  },
  {
    term: "ARF",
    text: {
      ro: "Architecture and Reference Framework — arhitectura de referință EUDI",
      en: "Architecture and Reference Framework (EUDI)",
    },
  },
  {
    term: "PuB-EAA",
    text: {
      ro: "Public Body Electronic Attribute Attestations — atestări electronice de atribute de la organisme publice",
      en: "Public Body Electronic Attribute Attestations",
    },
    detail: {
      ro: "mDL, adresă, vehicul, cazier judiciar",
      en: "mDL, address, vehicle, criminal record",
    },
  },
  {
    term: "mDL",
    text: {
      ro: "mobile Driving Licence — permis de conducere mobil",
      en: "mobile Driving Licence",
    },
  },
  {
    term: "WI",
    text: {
      ro: "Wallet Instance — instanță de portofel",
      en: "Wallet Instance",
    },
  },
  {
    term: "WIA",
    text: {
      ro: "Wallet Instance Attestation — atestarea instanței de portofel",
      en: "Wallet Instance Attestation",
    },
  },
  {
    term: "RP",
    text: {
      ro: "Relying Party — parte bazată (cine acceptă portofelul)",
      en: "Relying Party (who accepts the wallet)",
    },
  },
  {
    term: "MDVM",
    text: {
      ro: "Mobile Document Validation Module — modul de validare a documentelor mobile",
      en: "Mobile Document Validation Module",
    },
  },
  {
    term: "RWSCA",
    text: {
      ro: "RO Wallet Secure Cryptographic Applet — componentă criptografică a portofelului",
      en: "RO Wallet Secure Cryptographic Applet",
    },
  },
  {
    term: "RWSCD",
    text: {
      ro: "RO Wallet Secure Cryptographic Device — componentă criptografică a portofelului",
      en: "RO Wallet Secure Cryptographic Device",
    },
  },
  {
    term: "WB",
    text: {
      ro: "Wallet Backend — serviciul central al portofelului",
      en: "Wallet Backend — the wallet's central service",
    },
  },
  {
    term: "HKS",
    text: {
      ro: "Hardware Key Store — depozit hardware de chei",
      en: "Hardware Key Store",
    },
  },
  {
    term: "MQ",
    text: { ro: "Message Queue — coadă de mesaje", en: "Message Queue" },
  },
  {
    term: "PNS",
    text: {
      ro: "Push Notification Service — serviciu de notificări push",
      en: "Push Notification Service",
    },
  },
  {
    term: "MPP",
    text: {
      ro: "Mobile Push Provider — furnizor de notificări push mobile",
      en: "Mobile Push Provider",
    },
  },
  {
    term: "SD-JWT",
    text: {
      ro: "Selective Disclosure JWT — JWT cu dezvăluire selectivă",
      en: "Selective Disclosure JWT",
    },
  },
  {
    term: "OpenID4VC",
    text: {
      ro: "OpenID for Verifiable Credentials — protocol de prezentare a credențialelor",
      en: "OpenID for Verifiable Credentials",
    },
  },
  {
    term: "ISO",
    text: {
      ro: "International Organization for Standardization",
      en: "International Organization for Standardization",
    },
    detail: {
      ro: "ISO 18013-5 = standardul mDL, verificare offline",
      en: "ISO 18013-5 = the mDL standard, offline verification",
    },
  },
  {
    term: "eIDAS",
    text: {
      ro: "electronic IDentification, Authentication and trust Services — regulamentul UE privind identitatea digitală",
      en: "electronic IDentification, Authentication and trust Services",
    },
  },
  {
    term: "QTSP",
    text: {
      ro: "Qualified Trust Service Provider — prestator calificat de servicii de încredere",
      en: "Qualified Trust Service Provider",
    },
  },
  {
    term: "WRPRC/WRPAC",
    text: {
      ro: "Registrele naționale STS: cine poate emite și cine poate verifica",
      en: "The national STS registries: who may issue and who may verify",
    },
  },
  {
    term: "RNEP",
    text: {
      ro: "Registrul Național de Evidență a Persoanelor",
      en: "The National Register of Persons",
    },
  },
  {
    term: "MEDAT",
    text: {
      ro: "Ministerul Economiei, Digitalizării, Antreprenoriatului și Turismului — găzduiește Comisia RO EUDIW",
      en: "Ministry of Economy, Digitalisation, Entrepreneurship and Tourism — hosts the RO EUDIW Commission",
    },
  },
  {
    term: "DGEP",
    text: {
      ro: "Direcția Generală pentru Evidența Persoanelor (MAI) — emitentul PID",
      en: "General Directorate for Persons' Records (MAI) — the PID issuer",
    },
  },
  {
    term: "DGCTI",
    text: {
      ro: "Direcția Generală pentru Comunicații și Tehnologia Informației (MAI) — furnizorul portofelului",
      en: "General Directorate for Communications and IT (MAI) — the wallet provider",
    },
  },
  {
    term: "DGPI",
    text: {
      ro: "Direcția Generală de Protecție Internă (MAI) — supraveghere cibernetică internă",
      en: "General Directorate for Internal Protection (MAI) — internal cyber oversight",
    },
  },
  {
    term: "MAI",
    text: {
      ro: "Ministerul Afacerilor Interne",
      en: "Ministry of Internal Affairs",
    },
  },
  {
    term: "STS",
    text: {
      ro: "Serviciul de Telecomunicații Speciale",
      en: "Special Telecommunications Service",
    },
  },
  {
    term: "ADR",
    text: {
      ro: "Autoritatea pentru Digitalizarea României",
      en: "Authority for the Digitalisation of Romania",
    },
  },
  {
    term: "DNSC",
    text: {
      ro: "Directoratul Național de Securitate Cibernetică",
      en: "National Cyber Security Directorate",
    },
  },
  {
    term: "ANSPDCP",
    text: {
      ro: "Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal",
      en: "National Supervisory Authority for Personal Data Processing",
    },
  },
  {
    term: "BNR",
    text: { ro: "Banca Națională a României", en: "National Bank of Romania" },
  },
  {
    term: "TransFonD",
    text: {
      ro: "TransFonD — operatorul național de decontare (plăți instant)",
      en: "TransFonD — the national settlement operator (instant payments)",
    },
  },
  {
    term: "SNEP",
    text: {
      ro: "Sistemul Național Electronic de Plăți (Ghiseul.ro)",
      en: "National Electronic Payment System (Ghiseul.ro)",
    },
  },
  {
    term: "PSP",
    text: {
      ro: "Payment Service Provider — prestator de servicii de plată",
      en: "Payment Service Provider",
    },
  },
  {
    term: "RTP",
    text: { ro: "Request-to-Pay — cerere de plată", en: "Request-to-Pay" },
  },
  {
    term: "SEPA",
    text: {
      ro: "Single Euro Payments Area — zona unică de plăți în euro",
      en: "Single Euro Payments Area",
    },
  },
  {
    term: "X-Road",
    text: {
      ro: "Bus național de schimb de date (modelul Estoniei, open source)",
      en: "National data-exchange bus (the Estonian model, open source)",
    },
  },
  {
    term: "OCP",
    text: {
      ro: "Open Compute Project — standarde hardware deschise",
      en: "Open Compute Project — open hardware standards",
    },
  },
  {
    term: "RISC-V",
    text: {
      ro: "Arhitectură de procesor cu ISA deschis",
      en: "Open-ISA processor architecture",
    },
  },
  {
    term: "OpenBMC",
    text: {
      ro: "Firmware deschis pentru managementul serverelor",
      en: "Open firmware for server management",
    },
  },
  {
    term: "BMC",
    text: {
      ro: "Baseboard Management Controller — canalul de administrare la distanță",
      en: "Baseboard Management Controller — the remote-management channel",
    },
  },
  {
    term: "HSM",
    text: {
      ro: "Hardware Security Module — modul hardware de securitate",
      en: "Hardware Security Module",
    },
  },
  {
    term: "BESS",
    text: {
      ro: "Battery Energy Storage System — sistem de stocare în baterii",
      en: "Battery Energy Storage System",
    },
  },
  {
    term: "UPS",
    text: {
      ro: "Uninterruptible Power Supply — sursă neîntreruptibilă",
      en: "Uninterruptible Power Supply",
    },
  },
  {
    term: "WORM",
    text: {
      ro: "Write Once Read Many — scriere unică, citire repetată",
      en: "Write Once Read Many",
    },
  },
  {
    term: "LTO",
    text: {
      ro: "Linear Tape-Open — format de bandă magnetică",
      en: "Linear Tape-Open — magnetic tape format",
    },
  },
  {
    term: "SBOM",
    text: {
      ro: "Software Bill of Materials — lista componentelor software",
      en: "Software Bill of Materials",
    },
  },
  {
    term: "OSS",
    text: {
      ro: "Open Source Software — software cu sursă deschisă",
      en: "Open Source Software",
    },
  },
  {
    term: "IAM",
    text: {
      ro: "Identity and Access Management — managementul identităților și accesului",
      en: "Identity and Access Management",
    },
  },
  {
    term: "K8s",
    text: {
      ro: "Kubernetes — orchestrare de containere",
      en: "Kubernetes — container orchestration",
    },
  },
  {
    term: "PTP",
    text: {
      ro: "Precision Time Protocol — sincronizare de timp prin rețea",
      en: "Precision Time Protocol",
    },
  },
  {
    term: "GNSS",
    text: {
      ro: "Global Navigation Satellite System — navigație prin satelit",
      en: "Global Navigation Satellite System",
    },
  },
  {
    term: "IXP",
    text: {
      ro: "Internet Exchange Point — punct de interschimb de trafic",
      en: "Internet Exchange Point",
    },
  },
  {
    term: "IRIS²",
    text: {
      ro: "Constelația satelitară a UE — Infrastructure for Resilience, Interconnectivity and Security by Satellite",
      en: "The EU satellite constellation — Infrastructure for Resilience, Interconnectivity and Security by Satellite",
    },
  },
  {
    term: "RoEduNet",
    text: {
      ro: "Rețeaua națională de cercetare și educație a României (RoNREN)",
      en: "The Romanian national research and education network (RoNREN)",
    },
  },
  {
    term: "GÉANT",
    text: {
      ro: "Rețeaua paneuropeană de cercetare și educație",
      en: "The pan-European research and education network",
    },
  },
  {
    term: "RENAM",
    text: {
      ro: "Rețeaua națională de cercetare a Republicii Moldova",
      en: "The national research network of the Republic of Moldova",
    },
  },
  {
    term: "DR",
    text: {
      ro: "Disaster Recovery — recuperare după dezastru",
      en: "Disaster Recovery",
    },
  },
  {
    term: "DC",
    text: { ro: "Data Center — centru de date", en: "Data Center" },
  },
  {
    term: "RPO",
    text: {
      ro: "Recovery Point Objective — pierderea de date acceptată",
      en: "Recovery Point Objective — the accepted data loss",
    },
  },
  {
    term: "RTO",
    text: {
      ro: "Recovery Time Objective — timpul acceptat de repornire",
      en: "Recovery Time Objective — the accepted restart time",
    },
  },
  {
    term: "DESI",
    text: {
      ro: "Digital Economy and Society Index — indicele UE de digitalizare",
      en: "Digital Economy and Society Index",
    },
  },
  {
    term: "UAT",
    text: {
      ro: "Unitate Administrativ-Teritorială — comună, oraș, municipiu",
      en: "Administrative-territorial unit — commune, town, city",
    },
  },
  {
    term: "SPV",
    text: {
      ro: "Spațiul Privat Virtual (ANAF) — corespondență și declarații fiscale",
      en: "Private Virtual Space (ANAF) — tax correspondence and filings",
    },
  },
  {
    term: "PSCID",
    text: {
      ro: "Punctul de Contact Unic electronic (edirect.e-guvernare.ro)",
      en: "The electronic Single Point of Contact (edirect.e-guvernare.ro)",
    },
  },
  {
    term: "CEAS",
    text: {
      ro: "Casa Electronică de Asigurări de Sănătate (CNAS)",
      en: "The electronic health-insurance office (CNAS)",
    },
  },
  {
    term: "DES",
    text: {
      ro: "Dosarul Electronic de Sănătate",
      en: "The Electronic Health File",
    },
  },
  {
    term: "SIUI",
    text: {
      ro: "Sistemul Informatic Unic Integrat (sănătate)",
      en: "The Unique Integrated IT System (health)",
    },
  },
  {
    term: "CNAS",
    text: {
      ro: "Casa Națională de Asigurări de Sănătate",
      en: "National Health Insurance House",
    },
  },
  {
    term: "CNPP",
    text: {
      ro: "Casa Națională de Pensii Publice",
      en: "National Public Pensions House",
    },
  },
  {
    term: "ANAF",
    text: {
      ro: "Agenția Națională de Administrare Fiscală",
      en: "National Agency for Fiscal Administration",
    },
  },
  {
    term: "ANOFM",
    text: {
      ro: "Agenția Națională pentru Ocuparea Forței de Muncă",
      en: "National Employment Agency",
    },
  },
  {
    term: "ANCPI",
    text: {
      ro: "Agenția Națională de Cadastru și Publicitate Imobiliară",
      en: "National Agency for Cadastre and Land Registration",
    },
  },
  {
    term: "ONRC",
    text: {
      ro: "Oficiul Național al Registrului Comerțului",
      en: "National Trade Register Office",
    },
  },
  {
    term: "RECOM",
    text: {
      ro: "Portalul Registrului Comerțului (ONRC)",
      en: "The Trade Register portal (ONRC)",
    },
  },
  {
    term: "SICAP",
    text: {
      ro: "Sistemul informatic colaborativ de achiziții publice (e-licitație)",
      en: "The collaborative public-procurement system (e-licitatie)",
    },
  },
  {
    term: "SEAP",
    text: {
      ro: "Sistemul Electronic de Achiziții Publice",
      en: "The Electronic Public Procurement System",
    },
  },
  {
    term: "SIIIR",
    text: {
      ro: "Sistemul Informatic Integrat al Învățământului din România",
      en: "The Integrated IT System of Romanian Education",
    },
  },
  {
    term: "REGES",
    text: {
      ro: "Registrul electronic al elevilor (baza SIIIR)",
      en: "The electronic student register (the SIIIR base)",
    },
  },
  {
    term: "ARN",
    text: {
      ro: "Registrul național al absolvenților",
      en: "The national register of graduates",
    },
  },
  {
    term: "ECRIS",
    text: {
      ro: "Sistemul electronic de evidență a cazierului judiciar",
      en: "The electronic criminal-record system",
    },
  },
  {
    term: "T0",
    text: {
      ro: "Clasa T0 — continuitate de identitate, 100% offline",
      en: "T0 class — identity continuity, 100% offline",
    },
  },
  {
    term: "T1",
    text: {
      ro: "Clasa T1 — emisie & ciclu de viață (RPO ≤ 5 min, RTO ≤ 30 min)",
      en: "T1 class — issuance & lifecycle (RPO ≤ 5 min, RTO ≤ 30 min)",
    },
  },
  {
    term: "T2",
    text: {
      ro: "Clasa T2 — conveniență (RTO ≤ 4h)",
      en: "T2 class — convenience (RTO ≤ 4h)",
    },
  },
  {
    term: "T3",
    text: {
      ro: "Nivelul T3 — sit subteran (vault + DC supraviețuitor)",
      en: "T3 tier — the underground site (vault + survivor DC)",
    },
  },
  {
    term: "L0",
    text: {
      ro: "Stratul L0 — puncte finale suverane, offline",
      en: "Layer L0 — sovereign endpoints, offline",
    },
  },
  {
    term: "L1",
    text: {
      ro: "Stratul L1 — nucleul de rețea și plăți",
      en: "Layer L1 — the network and payments core",
    },
  },
  {
    term: "L2",
    text: {
      ro: "Stratul L2 — identitatea digitală și infrastructura de încredere",
      en: "Layer L2 — digital identity and the trust infrastructure",
    },
  },
  {
    term: "L3",
    text: {
      ro: "Stratul L3 — sursele autentice și backbone-ul de date",
      en: "Layer L3 — authentic sources and the data backbone",
    },
  },
  {
    term: "L4",
    text: {
      ro: "Stratul L4 — serviciile și portalurile",
      en: "Layer L4 — services and portals",
    },
  },
  {
    term: "L5",
    text: {
      ro: "Stratul L5 — transparență publică",
      en: "Layer L5 — public transparency",
    },
  },
  {
    term: "L6",
    text: {
      ro: "Stratul L6 — supraveghere independentă",
      en: "Layer L6 — independent oversight",
    },
  },
  {
    term: "3+8+1+L0",
    text: {
      ro: "Modelul de reziliență: 3 situri suverane + 8 micro-DC regionale + 1 vault subteran + nodurile offline L0",
      en: "The resilience model: 3 sovereign sites + 8 regional micro-DCs + 1 underground vault + the offline L0 nodes",
    },
  },
  {
    term: "GDPR",
    text: {
      ro: "General Data Protection Regulation — Reg. (UE) 2016/679",
      en: "General Data Protection Regulation — Reg. (EU) 2016/679",
    },
  },
  {
    term: "NIS2",
    text: {
      ro: "Directiva NIS2 — (UE) 2022/2555, securitatea rețelelor și a sistemelor",
      en: "The NIS2 Directive — (EU) 2022/2555, network and information security",
    },
  },
  {
    term: "EBSI",
    text: {
      ro: "European Blockchain Services Infrastructure",
      en: "European Blockchain Services Infrastructure",
    },
  },
];
