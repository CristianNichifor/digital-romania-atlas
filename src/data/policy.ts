import type { Bi } from "../i18n";

export interface VerdictBlock {
  heading: Bi;
  text: Bi;
}

export const VERDICT: VerdictBlock = {
  heading: {
    ro: "Verdictul: respectăm obligația EUDI, dar nu arhitectura actuală ca stare finală",
    en: "Verdict: we honour the EUDI obligation, but not the current architecture as the end state",
  },
  text: {
    ro: "PID-ul și portofelul trebuie livrate până în decembrie 2026 — aceasta e o obligație legală (eIDAS 2.0, Reg. 2024/1183) și o respectăm. Dar documentația MAI descrie un portofel, nu o platformă națională: o interfață fără schimb de date, fără plăți, fără notificări, fără fallback offline, concentrată instituțional într-un singur minister. Livrăm EUDI conform cerințelor, dar îl livrăm pe fundația noastră — backbone de date, surse autentice, cutie poștală, plăți, reziliență 3+8+1+L0 — pentru că altfel portofelul devine un document frumos care nu rezolvă birocrația.",
    en: "The PID and the wallet must ship by December 2026 — that is a legal obligation (eIDAS 2.0, Reg. 2024/1183) and we honour it. But the MAI documentation describes a wallet, not a national platform: an interface with no data exchange, no payments, no notifications, no offline fallback, institutionally concentrated in one ministry. We deliver EUDI as required, but on our foundation — data backbone, authentic sources, digital postbox, payments, 3+8+1+L0 resilience — because otherwise the wallet becomes a beautiful document that does not solve the paperwork.",
  },
};

export interface ContextRow {
  what: Bi;
  source: Bi;
}

export const CONTEXT: ContextRow[] = [
  {
    what: {
      ro: "Un singur minister joacă 5 roluri simultan: emitent PID (DGEP), furnizor portofel (DGCTI), parte bazată, membru în comisia EUDI, supraveghere cibernetică internă (DGPI)",
      en: "One ministry plays 5 roles at once: PID issuer (DGEP), wallet provider (DGCTI), relying party, member of the EUDI commission, internal cyber oversight (DGPI)",
    },
    source: {
      ro: "Prezentarea MAI, iul. 2026 („5 roluri simultane”)",
      en: "MAI presentation, Jul 2026 (“5 simultaneous roles”)",
    },
  },
  {
    what: {
      ro: "Registrele naționale WRPRC/WRPAC (cine emite, cine verifică) sunt operate de STS; ADR rămâne QTSP/Trust Lists; guvernanța e MEDAT; DGPI face supravegherea cibernetică",
      en: "The national registries WRPRC/WRPAC (who issues, who verifies) are operated by STS; ADR stays QTSP/Trust Lists; governance is MEDAT; DGPI does the cyber oversight",
    },
    source: {
      ro: "Prezentarea MAI + documentația GitHub",
      en: "MAI presentation + GitHub documentation",
    },
  },
  {
    what: {
      ro: "Faza 1 (dec. 2026): PID + verificarea vârstei. Faza 2 (2027): subset PuB-EAA — mDL, adresă, vehicul, cazier. Din dec. 2027, băncile, telecomul, utilitățile și asigurătorii trebuie să accepte portofelul",
      en: "Phase 1 (Dec 2026): PID + age verification. Phase 2 (2027): PuB-EAA subset — mDL, address, vehicle, criminal record. From Dec 2027 banks, telecoms, utilities and insurers must accept the wallet",
    },
    source: {
      ro: "Documentația GitHub (phases.md) + prezentarea MAI",
      en: "GitHub documentation (phases.md) + MAI presentation",
    },
  },
  {
    what: {
      ro: "Portofelul este doar interfața: nicio sursă de date națională conectată la scară, niciun mecanism de plăți, nicio cutie poștală digitală, niciun fallback offline dincolo de ISO 18013-5",
      en: "The wallet is only the interface: no national data source connected at scale, no payment mechanism, no digital postbox, no offline fallback beyond ISO 18013-5",
    },
    source: {
      ro: "Analiza noastră a documentației (ceea ce NU apare în ea)",
      en: "Our analysis of the documentation (what is NOT in it)",
    },
  },
];

export interface RiskRow {
  risk: Bi;
  why: Bi;
  fix: Bi;
}

export const RISKS: RiskRow[] = [
  {
    risk: {
      ro: "Concentrare instituțională",
      en: "Institutional concentration",
    },
    why: {
      ro: "Emitentul de identitate, furnizorul portofelului și supravegherea cibernetică stau în același minister; MEDAT e un organism de guvernanță intern, nu o autoritate independentă. „Grefierul se legitimează singur” — nimeni din exterior nu verifică emitentul.",
      en: "The identity issuer, the wallet provider and the cyber oversight sit in the same ministry; MEDAT is an internal governance body, not an independent authority. “The clerk verifies himself” — no one outside checks the issuer.",
    },
    fix: {
      ro: "Separarea rolurilor (emitent ≠ operator portofel ≠ parte bazată) + autoritate civilă independentă de supraveghere (DNSC + ANSPDCP + audit extern); STS operează registrele sub contract, nu prin absorbție",
      en: "Role separation (issuer ≠ wallet operator ≠ relying party) + an independent civil oversight authority (DNSC + ANSPDCP + external audit); STS operates the registries under contract, not via absorption",
    },
  },
  {
    risk: {
      ro: "Dependență de furnizor în stratul de identitate",
      en: "Vendor dependence in the identity layer",
    },
    why: {
      ro: "DGCTI externalizează stack-ul portofelului. Un furnizor străin cu cod proprietar în PID-ul național = lock-in pe 20 de ani exact în stratul cel mai sensibil.",
      en: "DGCTI outsources the wallet stack. A foreign vendor with proprietary code inside the national PID = a 20-year lock-in in exactly the most sensitive layer.",
    },
    fix: {
      ro: "Cod deschis, auditabil, cu drept de reparare și de emigrare; SBOM + builds reproductibile; achiziție multi-furnizor pe standarde OCP",
      en: "Open, auditable code with the right to repair and to leave; SBOM + reproducible builds; multi-vendor OCP procurement",
    },
  },
  {
    risk: {
      ro: "Capacitate de supraveghere nedefinită",
      en: "Undefined surveillance capability",
    },
    why: {
      ro: "MPP (notificări push), MDVM (evenimente de ciclu de viață) și PNS pot deveni instrumente de urmărire centralizată dacă legea nu le limitează explicit. „Ceea ce se poate, se va face cândva” — arhitectura nu ar trebui să poată.",
      en: "MPP (push notifications), MDVM (lifecycle events) and PNS can become centralised tracking tools if the law does not explicitly bound them. “What can be done will one day be done” — the architecture should not be able to.",
    },
    fix: {
      ro: "Principiul date-la-sursă: statul nu colectează, doar rutează cu consimțământ; PNS limitat prin lege (scop, păstrare, audit); transparență verificabilă public",
      en: "The data-at-source principle: the state collects nothing, only routes with consent; PNS bounded by law (purpose, retention, audit); publicly verifiable transparency",
    },
  },
  {
    risk: { ro: "Trei identități paralele", en: "Three parallel identities" },
    why: {
      ro: "ROeID (notificat), eIdentity (nenotificată) și portofelul (nenotificat până 2027+) coexistă; RP-urile sunt obligate din dec. 2027 cu doar un an de experiență operațională a portofelului. Fragmentarea identității este exact problema pe care EUDI trebuia s-o rezolve.",
      en: "ROeID (notified), eIdentity (not notified) and the wallet (not notified until 2027+) coexist; RPs are mandated from Dec 2027 with only one year of wallet operating experience. Identity fragmentation is exactly the problem EUDI was meant to solve.",
    },
    fix: {
      ro: "Wallet-ul devine singura identitate de cetățean; eIdentity se retrage în 2027; ROeID rămâne doar ca backstop notificat; plan de migrare publicat",
      en: "The wallet becomes the only citizen identity; eIdentity retires in 2027; ROeID stays only as the notified backstop; a published migration plan",
    },
  },
  {
    risk: {
      ro: "Scop subțire: document, nu platformă",
      en: "Thin scope: a document, not a platform",
    },
    why: {
      ro: "PID + vârstă în 2026 și un subset PuB-EAA în 2027 nu ating fricțiunea reală: dosarul fiscal, dosarul medical, taloanele, notificările. Cetățeanul primește un portofel nou și aceeași birocrație veche.",
      en: "PID + age in 2026 and a PuB-EAA subset in 2027 do not touch the real friction: the tax file, the medical file, the coupons, the notifications. The citizen gets a new wallet and the same old bureaucracy.",
    },
    fix: {
      ro: "Backbone de date + once-only: portofelul devine cheia spre toate serviciile, nu doar spre identificare; cutie poștală digitală; plăți în aceeași interacțiune",
      en: "Data backbone + once-only: the wallet becomes the key to every service, not just identification; a digital postbox; payments in the same interaction",
    },
  },
  {
    risk: { ro: "Reziliență nepublicată", en: "Unpublished resilience" },
    why: {
      ro: "Documentația nu publică un model de redundanță, iar registrul STS este un punct unic de disponibilitate pentru emitere și revocare. Fără fallback offline pentru emitere, orice incident național oprește identitatea digitală.",
      en: "The documentation publishes no redundancy model, and the STS registry is a single availability point for issuance and revocation. With no offline issuance fallback, any national incident stops digital identity.",
    },
    fix: {
      ro: "3+8+1+L0: situri semi-active pe regiuni seismice diferite, micro-DC regionale cu energie proprie, vault subteran, L0 offline în fiecare comună",
      en: "3+8+1+L0: semi-active sites across seismic regions, self-powered regional micro-DCs, an underground vault, offline L0 in every commune",
    },
  },
  {
    risk: {
      ro: "Integrare per instituție, nu schimb de date",
      en: "Per-institution integration, not data exchange",
    },
    why: {
      ro: "Fiecare sursă de date se conectează individual la portofel; fără un bus național, fiecare serviciu nou repetă munca, iar „once-only” rămâne pe hârtie. Costul de integrare crește liniar cu numărul de servicii — vezi fragmentarea portalurilor de azi.",
      en: "Each data source connects to the wallet individually; without a national bus, every new service repeats the work and once-only stays on paper. Integration cost grows linearly with the number of services — see today's portal fragmentation.",
    },
    fix: {
      ro: "Backbone X-Road open source prin care toate sursele autentice expun datele o singură dată; orice serviciu nou e o configurare, nu un proiect",
      en: "An open-source X-Road backbone through which all authentic sources expose data once; every new service is configuration, not a project",
    },
  },
  {
    risk: {
      ro: "Calendar agresiv cu risc de execuție",
      en: "Aggressive timeline with execution risk",
    },
    why: {
      ro: "Dec. 2026 este mâine în termeni de achiziții publice, iar faza 2 din 2027 presupune în paralel mDL (DGPCI), cazier, stare civilă și vehicule. Un singur derapaj în lanțul DGCTI amână tot, iar sancțiunea EUDI se activează.",
      en: "Dec 2026 is tomorrow in public-procurement terms, and phase 2 in 2027 needs mDL (DGPCI), criminal record, civil status and vehicles in parallel. One slip in the DGCTI chain delays everything, and the EUDI sanction kicks in.",
    },
    fix: {
      ro: "Livrare pe două șine: EUDI obligatoriu pe calendarul legal, platforma națională pe module deja funcționale (HUB MAI, SNEP, RoEduNet) — fiecare modul aduce valoare independent",
      en: "Two-track delivery: mandatory EUDI on the legal timeline, the national platform on already-working modules (HUB MAI, SNEP, RoEduNet) — each module delivers value independently",
    },
  },
];

export interface CriterionRow {
  criterion: Bi;
  current: Bi;
  ours: Bi;
}

export const CRITERIA: CriterionRow[] = [
  {
    criterion: { ro: "Conformitate EUDI", en: "EUDI compliance" },
    current: {
      ro: "PID + vârstă, apoi subset PuB-EAA",
      en: "PID + age, then a PuB-EAA subset",
    },
    ours: {
      ro: "EUDI e un subcaz: aceleași obligații, plus platforma întreagă",
      en: "EUDI is a sub-case: the same obligations, plus the whole platform",
    },
  },
  {
    criterion: { ro: "Suveranitate", en: "Sovereignty" },
    current: {
      ro: "Risc de furnizor străin în stratul de identitate",
      en: "Foreign-vendor risk in the identity layer",
    },
    ours: {
      ro: "Open source, OCP, fără lock-in, ancore publice",
      en: "Open source, OCP, no lock-in, public anchors",
    },
  },
  {
    criterion: { ro: "Confidențialitate", en: "Privacy" },
    current: {
      ro: "Capacitate de urmărire nedefinită (MPP/MDVM/PNS)",
      en: "Undefined tracking capability (MPP/MDVM/PNS)",
    },
    ours: {
      ro: "Date la sursă, consimțământ, fără colectare centrală",
      en: "Data at source, consent, no central collection",
    },
  },
  {
    criterion: { ro: "Reziliență", en: "Resilience" },
    current: {
      ro: "Nepublicată; STS ca punct unic",
      en: "Unpublished; STS as the single point",
    },
    ours: {
      ro: "3+8+1+L0, energie proprie, offline-first, vault subteran",
      en: "3+8+1+L0, own power, offline-first, underground vault",
    },
  },
  {
    criterion: { ro: "Interoperabilitate", en: "Interoperability" },
    current: {
      ro: "Integrare per instituție",
      en: "Per-institution integration",
    },
    ours: {
      ro: "Backbone + once-only; serviciu nou = configurare",
      en: "Backbone + once-only; a new service = configuration",
    },
  },
  {
    criterion: { ro: "Viteză", en: "Speed" },
    current: {
      ro: "2 ani pentru PID, faze liniare",
      en: "2 years for the PID, linear phases",
    },
    ours: {
      ro: "Reutilizează ce funcționează (HUB MAI, SNEP, RoEduNet) — module în luni",
      en: "Reuses what works (HUB MAI, SNEP, RoEduNet) — modules in months",
    },
  },
  {
    criterion: { ro: "Cost", en: "Cost" },
    current: {
      ro: "Achiziții fragmentate per instituție",
      en: "Fragmented per-institution procurement",
    },
    ours: {
      ro: "~62M € / 5 ani, licențe zero, economii estimate incluse",
      en: "~€62M / 5 years, zero licences, estimated savings included",
    },
  },
  {
    criterion: { ro: "Încredere", en: "Trust" },
    current: {
      ro: "Supraveghere internă (DGPI) a propriului minister",
      en: "Internal oversight (DGPI) of the same ministry",
    },
    ours: {
      ro: "DNSC + ANSPDCP + audit extern + ancore publice + control civic",
      en: "DNSC + ANSPDCP + external audit + public anchors + civic oversight",
    },
  },
];

export interface GainRow {
  gain: Bi;
  value: Bi;
}

export const GAINS: GainRow[] = [
  {
    gain: {
      ro: "O identitate în loc de trei",
      en: "One identity instead of three",
    },
    value: {
      ro: "ROeID + eIdentity + wallet → un singur login de stat până în 2028; un singur canal de notificare",
      en: "ROeID + eIdentity + wallet → one state login by 2028; one notification channel",
    },
  },
  {
    gain: {
      ro: "Timp per tranzacție: zile → minute",
      en: "Time per transaction: days → minutes",
    },
    value: {
      ro: "Once-only + backbone: actele se cer o dată și se refolosesc la sursă (principiul belgian)",
      en: "Once-only + backbone: documents are asked once and reused at the source (the Belgian principle)",
    },
  },
  {
    gain: { ro: "Adopție", en: "Adoption" },
    value: {
      ro: "1 login + 1 cutie poștală + plăți integrate — de pe ultimul loc DESI spre media UE",
      en: "1 login + 1 postbox + integrated payments — from the last DESI rank towards the EU average",
    },
  },
  {
    gain: { ro: "Reziliență măsurabilă", en: "Measurable resilience" },
    value: {
      ro: "Fiecare sit își produce energia; L0 funcționează offline; exercițiu anual de failover real",
      en: "Every site generates its power; L0 runs offline; annual real failover drill",
    },
  },
  {
    gain: { ro: "Cost controlat", en: "Controlled cost" },
    value: {
      ro: "~62M €/5 ani (vs. fragmentare) + licențe zero + piață IT națională stimulată prin OSS",
      en: "~€62M/5 years (vs. fragmentation) + zero licences + a stimulated national IT market via OSS",
    },
  },
  {
    gain: { ro: "Suveranitate tehnică", en: "Technical sovereignty" },
    value: {
      ro: "Stack deschis, fără furnizor unic, ancore publice verificabile de oricine",
      en: "An open stack, no single vendor, public anchors verifiable by anyone",
    },
  },
  {
    gain: { ro: "Pipeline de talent", en: "Talent pipeline" },
    value: {
      ro: "Universitățile rulează oglinzile și exercițiile — reziliența formează generația care o va opera",
      en: "Universities run the mirrors and the drills — resilience trains the generation that will operate it",
    },
  },
];

export interface CounterRow {
  argument: Bi;
  response: Bi;
}

export const COUNTERS: CounterRow[] = [
  {
    argument: {
      ro: "Portofelul EUDI singur satisface obligația legală. Backbone-ul, plățile și cutia poștală adaugă costuri și risc de execuție la un termen deja strâns (dec. 2026).",
      en: "The EUDI wallet alone satisfies the legal obligation. The backbone, payments and postbox add cost and execution risk to an already tight deadline (Dec 2026).",
    },
    response: {
      ro: "Livrăm EUDI conform termenului, separat de rest. Piesele backbone-ului există deja (HUB MAI, SNEP/Ghiseul, RoEduNet) — le conectăm, nu le construim de la zero; fiecare modul livrează valoare independent.",
      en: "We deliver EUDI on the deadline, separately from the rest. The backbone pieces already exist (HUB MAI, SNEP/Ghiseul, RoEduNet) — we connect them, not build them from scratch; every module delivers value independently.",
    },
  },
  {
    argument: {
      ro: "Backbone-ul duplică infrastructura existentă: SIUI, SPV, REGES, RECOM au deja propriile canale. O nouă „autostradă” e refacerea a ceea ce funcționează.",
      en: "The backbone duplicates existing infrastructure: SIUI, SPV, REGES, RECOM already have their own channels. A new “highway” redoes what works.",
    },
    response: {
      ro: "Exact invers: „wrap, don't rewrite” — niciun sistem nu se rescrie, fiecare primește un conector și devine sursă autentică. Duplicarea de azi e interconectarea punct-la-punct (6+ frontend-uri ANAF); backbone-ul o elimină.",
      en: "Exactly backwards: “wrap, don't rewrite” — no system is rewritten, each gets a connector and becomes an authentic source. Today's duplication is point-to-point interconnection (6+ ANAF frontends); the backbone removes it.",
    },
  },
  {
    argument: {
      ro: "Concentrarea guvernanței în ADR/MEDAT mută doar problema de la MAI la alt minister — tot un singur punct de control.",
      en: "Concentrating governance in ADR/MEDAT just moves the problem from MAI to another ministry — still a single point of control.",
    },
    response: {
      ro: "Propunerea împarte rolurile pe instituții independente: STS rețea, BNR plăți, DNSC securitate, ANSPDCP date — plus audituri publice ancorate. Nu există un singur deținător; există mai multe, care se verifică între ele.",
      en: "The proposal splits roles across independent institutions: STS network, BNR payments, DNSC security, ANSPDCP data — plus anchored public audits. There is no single owner; there are several, checking each other.",
    },
  },
  {
    argument: {
      ro: "Cifrele de cost (80–150M €, 30–60M €/an) sunt estimări de design, nu bugete. O dezbatere publică nu poate lucra cu numere neauditate.",
      en: "The cost figures (€80–150M, €30–60M/yr) are design estimates, not budgets. A public debate can't work with unaudited numbers.",
    },
    response: {
      ro: "Corect — și de aceea fiecare rând are notă, metodologie publică și scară de comparație (precedente UE). Scopul e verificabilitatea, nu exactitatea: numerele sunt făcute să poată fi contestate linie cu linie.",
      en: "Correct — which is why every row has a note, a public methodology and EU precedents for scale. The goal is verifiability, not precision: the numbers are made to be contested line by line.",
    },
  },
  {
    argument: {
      ro: "Wallet-first presupune smartphone; pensionarii, persoanele fără dispozitiv sau diaspora fără acces rămân în urmă.",
      en: "Wallet-first assumes a smartphone; pensioners, people without a device or diaspora without access are left behind.",
    },
    response: {
      ro: "Portofelul nu înlocuiește ghișeul: asistare fizică la poștă și primării (plasa de siguranță), L0 offline-first, eliberare asistată la ghiseu. Digitalizarea e aditivă, nu exclusivă.",
      en: "The wallet does not replace the desk: assisted issuance at post offices and town halls (the physical safety net), offline-first L0, assisted issuance at the counter. Digitalisation is additive, not exclusive.",
    },
  },
  {
    argument: {
      ro: "Ancorarea pe blockchain e PR, nu securitate: nu protejează nicio dată, doar face zgomot tehnologic.",
      en: "Blockchain anchoring is PR, not security: it protects no data, it's just technological noise.",
    },
    response: {
      ro: "De acord că nu protejează date — nu acesta e rolul ei. Ancora publică nu permite modificări silențioase ale registrelor și rapoartelor: transformă „crede-mă pe cuvânt” în „verifică-te singur”. Transparență, nu confidențialitate.",
      en: "Agreed it protects no data — that is not its job. A public anchor makes silent edits to registries and reports impossible: it turns “take our word for it” into “verify it yourself”. Transparency, not confidentiality.",
    },
  },
];
