import type { Bi } from "../i18n";

export interface DcRow {
  id: string;
  name: Bi;
  location: Bi;
  region: Bi;
  role: Bi;
  seismic: Bi;
  energy: Bi;
  lon: number;
  lat: number;
}

export const DC_PLACEMENT: DcRow[] = [
  {
    id: "dc-a",
    name: { ro: "DC-A · Cluj", en: "DC-A · Cluj" },
    location: {
      ro: "Cluj-Napoca / regiunea Cluj",
      en: "Cluj-Napoca / Cluj region",
    },
    region: { ro: "Transilvania", en: "Transylvania" },
    role: {
      ro: "Sit suveran primar — emitere PID/EAA, registru STS (instanță primară)",
      en: "Primary sovereign site — PID/EAA issuance, STS registry (primary instance)",
    },
    seismic: {
      ro: "Risc seismic redus; în afara razei Vrancea",
      en: "Low seismic risk; outside the Vrancea radius",
    },
    energy: {
      ro: "Dublă alimentare; răcire liberă (climat rece), BESS local",
      en: "Dual feeds; free cooling (cold climate), local BESS",
    },
    lon: 23.6,
    lat: 46.77,
  },
  {
    id: "dc-b",
    name: { ro: "DC-B · București", en: "DC-B · Bucharest" },
    location: {
      ro: "București / zona metropolitană",
      en: "Bucharest / metro area",
    },
    region: { ro: "Muntenia", en: "Wallachia" },
    role: {
      ro: "Sit suveran secundar — continuitate operațională & proximitate instituțională",
      en: "Secondary sovereign site — operational continuity & institutional proximity",
    },
    seismic: {
      ro: "În raza Vrancea (cutremurul din 1977) — niciodată singurul sit activ",
      en: "Within the Vrancea radius (1977 earthquake) — never the only active site",
    },
    energy: {
      ro: "Dublă alimentare; răcire adiabatică; generatoare de rezervă",
      en: "Dual feeds; adiabatic cooling; backup generators",
    },
    lon: 26.1,
    lat: 44.43,
  },
  {
    id: "dc-c",
    name: { ro: "DC-C · Iași", en: "DC-C · Iași" },
    location: { ro: "Iași / regiunea Moldovei", en: "Iași / Moldova region" },
    region: { ro: "Moldova", en: "Moldova" },
    role: {
      ro: "Semi-activ — replici citite continuu, failover în minute; cutie de viteze offline",
      en: "Semi-active — continuously read replicas, failover in minutes; offline vault",
    },
    seismic: {
      ro: "Risc redus; la distanță maximă de Vrancea în interiorul țării",
      en: "Low risk; furthest inland distance from Vrancea",
    },
    energy: {
      ro: "Conectat la coridorul hidro; rezervă strategică de combustibil",
      en: "Connected to the hydro corridor; strategic fuel reserve",
    },
    lon: 27.59,
    lat: 47.16,
  },
  {
    id: "dc-u1",
    name: { ro: "DC-U1 · UBB Cluj", en: "DC-U1 · UBB Cluj" },
    location: {
      ro: "Universitatea Babeș-Bolyai",
      en: "Babeș-Bolyai University",
    },
    region: { ro: "Federație universitară", en: "University federation" },
    role: {
      ro: "Oglindă L3 + capacitate DR (RoEduNet)",
      en: "L3 mirror + DR capacity (RoEduNet)",
    },
    seismic: { ro: "Risc redus", en: "Low risk" },
    energy: {
      ro: "Infrastructură universitară existentă",
      en: "Existing university infrastructure",
    },
    lon: 23.58,
    lat: 46.77,
  },
  {
    id: "dc-u2",
    name: { ro: "DC-U2 · UPB București", en: "DC-U2 · UPB Bucharest" },
    location: {
      ro: "Universitatea Politehnica București",
      en: "Politehnica University Bucharest",
    },
    region: { ro: "Federație universitară", en: "University federation" },
    role: {
      ro: "Oglindă L3 + laborator de exerciții cibernetice",
      en: "L3 mirror + cyber-drill laboratory",
    },
    seismic: {
      ro: "Raza Vrancea — rol de oglindă, nu critic unic",
      en: "Vrancea radius — mirror role, not sole critical",
    },
    energy: {
      ro: "Infrastructură universitară existentă",
      en: "Existing university infrastructure",
    },
    lon: 26.05,
    lat: 44.43,
  },
  {
    id: "dc-u3",
    name: { ro: "DC-U3 · UAIC Iași", en: "DC-U3 · UAIC Iași" },
    location: {
      ro: "Universitatea Alexandru Ioan Cuza",
      en: "Alexandru Ioan Cuza University",
    },
    region: { ro: "Federație universitară", en: "University federation" },
    role: {
      ro: "Oglindă L3 + cale transfrontalieră RENAM (Moldova)",
      en: "L3 mirror + RENAM (Moldova) cross-border path",
    },
    seismic: { ro: "Risc redus", en: "Low risk" },
    energy: {
      ro: "Infrastructură universitară existentă",
      en: "Existing university infrastructure",
    },
    lon: 27.57,
    lat: 47.17,
  },
];

export interface DisasterRow {
  scenario: Bi;
  impact: Bi;
  response: Bi;
}

export const DISASTERS: DisasterRow[] = [
  {
    scenario: {
      ro: "Cutremur Vrancea (scenariu 1977)",
      en: "Vrancea earthquake (1977 scenario)",
    },
    impact: {
      ro: "DC-B degradat sau pierdut; fibră și energie regională întrerupte; București fără servicii",
      en: "DC-B degraded or lost; regional fibre and power cut; Bucharest without services",
    },
    response: {
      ro: "DC-A + DC-C preiau în RTO ≤ 30 min; DC-urile regionale preiau serviciile locale; DC mobile (containere) dislocate în 72h; L0 funcționează offline; vault-ul subteran păstrează arhivele",
      en: "DC-A + DC-C take over within RTO ≤ 30 min; regional DCs take over local services; container DCs deployed in 72h; L0 keeps running offline; the underground vault keeps the archives",
    },
  },
  {
    scenario: {
      ro: "Inundații Siret / Prut / Dunăre",
      en: "Siret / Prut / Danube floods",
    },
    impact: {
      ro: "Legături terestre tăiate; situri din zonele inundabile afectate; alimentare electrică instabilă",
      en: "Land links cut; sites in floodable areas affected; unstable power",
    },
    response: {
      ro: "Siturile sunt plasate deasupra zonelor inundabile (bazin 100 de ani); fiecare sit are generație proprie; rutare prin inelul național de fibră + microunde STS",
      en: "Sites placed above 100-year flood basins; every site has its own generation; routing via the national fibre ring + STS microwave",
    },
  },
  {
    scenario: {
      ro: "Pana de energie regională / iarnă severă",
      en: "Regional power outage / severe winter",
    },
    impact: {
      ro: "Oprire de durată a alimentării într-o regiune; presiune pe rețeaua națională",
      en: "Prolonged regional outage; pressure on the national grid",
    },
    response: {
      ro: "Fiecare sit își produce propria energie (gaz/biogaz + solar + BESS 8–24h); contracte pe termen lung cu nucleare (Cernavodă) și hidro (Porțile de Fier) ca alimentare de bază; UPS + flywheel pentru tranziție fără întrerupere",
      en: "Every site generates its own power (gas/biogas + solar + 8–24h BESS); long-term nuclear (Cernavodă) and hydro (Iron Gates) contracts as base feed; UPS + flywheel for seamless cutover",
    },
  },
  {
    scenario: {
      ro: "Tăierea cablurilor submarine din Marea Neagră",
      en: "Black Sea submarine cable cuts",
    },
    impact: {
      ro: "Trafic internațional degradat; dependență de rute străine",
      en: "Degraded international traffic; dependence on foreign routes",
    },
    response: {
      ro: "Rutare prin inelul intern + GÉANT/RoEduNet și pe cale terestră prin UE; serviciile interne continuă fără legătură externă; IRIS²/EU SATCOM ca rezervă, nu Starlink",
      en: "Routing via the internal ring + GÉANT/RoEduNet and overland EU paths; internal services keep running without external links; IRIS²/EU SATCOM as backup, not Starlink",
    },
  },
  {
    scenario: {
      ro: "Atac cibernetic la scară națională",
      en: "National-scale cyber attack",
    },
    impact: {
      ro: "DC-uri vizate simultan; cerere de răscumpărare; distrugere de date",
      en: "DCs targeted simultaneously; ransom; data destruction",
    },
    response: {
      ro: "Registre pe LTO tape WORM, air-gapped (3-2-1-1-0); vault-ul subteran păstrează a doua copie; HSMs în cuorum M-din-N; exerciții anuale de failover real",
      en: "Registries on WORM LTO tape, air-gapped (3-2-1-1-0); the underground vault keeps the second copy; M-of-N HSM quorum; annual real failover drills",
    },
  },
  {
    scenario: {
      ro: "Telefon pierdut / furat (incident de identitate)",
      en: "Lost / stolen phone (identity incident)",
    },
    impact: {
      ro: "Toate credențialele de pe dispozitiv (PID + atestări) pot fi folosite de deținător până la revocare; fără SMS-OTP nu există risc SIM-swap, dar fereastra offline rămâne",
      en: "All credentials on the device (PID + attestations) could be used by the holder until revocation; no SMS-OTP means no SIM-swap risk, but the offline window remains",
    },
    response: {
      ro: "Kill-switch unic (hotline/portal/ghișeu) suspendă tot deodată — țintă ≤ 15 min; revocarea apare în Status Lists la următoarea verificare (fereastra offline publicată, ≤ 24h); re-înrolare cu cheia de recuperare sau proofing asistat (≤ 48h); deblocarea biometrică a telefonului limitează fereastra înainte de raportare",
      en: "A single kill-switch (hotline/portal/desk) suspends everything at once — target ≤ 15 min; the revocation shows in the Status Lists at the next check (published offline window, ≤ 24h); re-enrolment with the recovery key or assisted proofing (≤ 48h); the phone's biometric lock shrinks the pre-report window",
    },
  },
];

export interface SovereigntyRow {
  layer: Bi;
  current: Bi;
  target: Bi;
}

export const HARDWARE_STACK: SovereigntyRow[] = [
  {
    layer: { ro: "Servere & rack-uri", en: "Servers & racks" },
    current: {
      ro: "Achiziții punctuale per instituție, blocaj pe 1–2 furnizori",
      en: "Per-institution purchases, lock-in on 1–2 vendors",
    },
    target: {
      ro: "Standarde OCP / OpenRack; achiziție multi-furnizor (asamblatori UE); drept la reparare; stoc național de piese 10%",
      en: "OCP / OpenRack standards; multi-vendor procurement (EU assemblers); right to repair; 10% national spares stockpile",
    },
  },
  {
    layer: {
      ro: "Arhitectura de procesor (ISA)",
      en: "Processor architecture (ISA)",
    },
    current: {
      ro: "Dependență exclusivă x86/ARM (licențe străine)",
      en: "Exclusive x86/ARM dependence (foreign licences)",
    },
    target: {
      ro: "Pilot RISC-V pe nodurile edge/UAT și posturi de administrare; OpenPOWER ca a doua opțiune; ISA deschis = poliță de asigurare",
      en: "RISC-V pilot on edge/UAT nodes and admin workstations; OpenPOWER as a second option; open ISA = insurance policy",
    },
  },
  {
    layer: { ro: "Firmware & BMC", en: "Firmware & BMC" },
    current: {
      ro: "BMC proprietare — canal de administrare la distanță fără control propriu",
      en: "Proprietary BMCs — a remote-management channel outside our control",
    },
    target: {
      ro: "OpenBMC + coreboot / LinuxBoot peste tot; fără BMC proprietar în DC-urile suverane",
      en: "OpenBMC + coreboot / LinuxBoot everywhere; no proprietary BMC in the sovereign DCs",
    },
  },
  {
    layer: { ro: "Stocare", en: "Storage" },
    current: {
      ro: "SAN-uri per instituție, replicare limitată",
      en: "Per-institution SANs, limited replication",
    },
    target: {
      ro: "Ceph multi-sit (3 copii geografic separate) + LTO tape WORM air-gapped pentru registre",
      en: "Multi-site Ceph (3 geo-separated copies) + air-gapped WORM LTO tape for registries",
    },
  },
  {
    layer: { ro: "Rețea", en: "Network" },
    current: {
      ro: "Fibră comercială, backbone unic efectiv",
      en: "Commercial fibre, effectively one backbone",
    },
    target: {
      ro: "Inel național propriu + microunde STS + RoEduNet ca a doua coloană; IXP-uri InterLAN/RoNIX; IRIS² ca rezervă satelitară",
      en: "Own national ring + STS microwave + RoEduNet as the second spine; InterLAN/RoNIX IXPs; IRIS² as satellite backup",
    },
  },
];

export const SOFTWARE_STACK: SovereigntyRow[] = [
  {
    layer: { ro: "Sistem de operare", en: "Operating system" },
    current: {
      ro: "Mix proprietar; imagini per instituție",
      en: "Proprietary mix; per-institution images",
    },
    target: {
      ro: "Linux standardizat (NixOS pentru reproducibilitate, Debian pentru servicii); imagini imutabile, builds reproductibile",
      en: "Standardised Linux (NixOS for reproducibility, Debian for services); immutable images, reproducible builds",
    },
  },
  {
    layer: { ro: "Platformă cloud", en: "Cloud platform" },
    current: {
      ro: "VM-uri disparate; tentația hyperscalerilor non-UE",
      en: "Disparate VMs; the lure of non-EU hyperscalers",
    },
    target: {
      ro: "Kubernetes + OpenStack on-prem pe cele 3 situri; Sovereign Cloud Stack / Gaia-X doar ca overflow DR; niciodată date de cetățean în cloud non-UE",
      en: "On-prem Kubernetes + OpenStack across the 3 sites; Sovereign Cloud Stack / Gaia-X only as DR overflow; never citizen data in non-EU clouds",
    },
  },
  {
    layer: { ro: "Baze de date", en: "Databases" },
    current: {
      ro: "Motor per sistem, multe licențe",
      en: "Per-system engines, many licences",
    },
    target: {
      ro: "PostgreSQL + Patroni (high availability) pentru registre; Ceph pentru obiecte; totul open source, fără taxe de licență",
      en: "PostgreSQL + Patroni (HA) for registries; Ceph for objects; all open source, no licence fees",
    },
  },
  {
    layer: { ro: "Identitate & acces", en: "Identity & access" },
    current: {
      ro: "Sisteme per portal, fără standard comun",
      en: "Per-portal systems, no common standard",
    },
    target: {
      ro: "Keycloak (open source) ca IAM intern; identitatea de cetățean rămâne exclusiv în wallet; HSM-uri calificate pentru chei",
      en: "Keycloak (open source) as internal IAM; citizen identity stays exclusively in the wallet; qualified HSMs for keys",
    },
  },
  {
    layer: {
      ro: "Lanț de aprovizionare software",
      en: "Software supply chain",
    },
    current: {
      ro: "Dependență de registre străine (npm/PyPI/crates) fără oglindă națională",
      en: "Dependence on foreign registries (npm/PyPI/crates) with no national mirror",
    },
    target: {
      ro: "Oglindă națională de artefacte + SBOM pentru fiecare componentă + builds reproductibile verificate",
      en: "National artefact mirror + SBOM per component + verified reproducible builds",
    },
  },
];

export interface EduRow {
  theme: Bi;
  what: Bi;
}

export const EDU_RESEARCH: EduRow[] = [
  {
    theme: { ro: "A doua coloană națională", en: "Second national spine" },
    what: {
      ro: "RoEduNet/RoNREN transportă trafic de stat alături de inelul propriu — reziliență pe fibră existentă, fără cost nou de construcție",
      en: "RoEduNet/RoNREN carries state traffic alongside the own ring — resilience on existing fibre, no new build cost",
    },
  },
  {
    theme: { ro: "Federația DC universitare", en: "University DC federation" },
    what: {
      ro: "UBB, UPB, UAIC (și apoi alte centre) devin oglinzi L3 + capacitate DR, conectate prin GÉANT și RENAM (cale transfrontalieră cu Moldova)",
      en: "UBB, UPB, UAIC (then other centres) become L3 mirrors + DR capacity, connected via GÉANT and RENAM (cross-border path with Moldova)",
    },
  },
  {
    theme: {
      ro: "Depozit național de cercetare",
      en: "National research repository",
    },
    what: {
      ro: "Repository open science suveran (alternativă Zenodo), cu ancore publice de integritate pe datele publicate",
      en: "A sovereign open-science repository (Zenodo alternative) with public integrity anchors on published data",
    },
  },
  {
    theme: { ro: "Exerciții cibernetice anuale", en: "Annual cyber drills" },
    what: {
      ro: "Echipe roșii studențești atacă infrastructura de test sub supravegherea DNSC/STS — exercițiul real, nu demonstrativ, inclusiv failover complet",
      en: "Student red teams attack the test infrastructure under DNSC/STS supervision — the real drill, including full failover, not a showcase",
    },
  },
  {
    theme: { ro: "Program OSS & curricula", en: "OSS programme & curricula" },
    what: {
      ro: "Teme de licență/master pe componentele reale (Keycloak, Postgres, K8s, Ceph); contribuții plătite pentru studenți; pipeline de internship → reținerea talentelor",
      en: "Bachelor/master theses on real components (Keycloak, Postgres, K8s, Ceph); paid student contributions; internship pipeline → talent retention",
    },
  },
  {
    theme: {
      ro: "Școli & administrație locală",
      en: "Schools & local administration",
    },
    what: {
      ro: "SIIIR pe backbone; fiecare școală/universitate primește un nod L0 offline — administrația continuă fără internet",
      en: "SIIIR on the backbone; every school/university gets an offline L0 node — administration keeps running without internet",
    },
  },
];

export const BACKUP_RULES: Bi[] = [
  {
    ro: "3-2-1-1-0 pentru registre: 3 copii, 2 medii diferite, 1 sit extern, 1 copie air-gapped (LTO WORM), 0 copii neverificate",
    en: "3-2-1-1-0 for registries: 3 copies, 2 different media, 1 off-site, 1 air-gapped copy (WORM LTO), 0 unverified copies",
  },
  {
    ro: "RPO/RTO per clasă: T0 offline total (ISO 18013-5), T1 RPO ≤ 5 min / RTO ≤ 30 min, T2 RTO ≤ 4h — vezi tab-ul Strategie",
    en: "RPO/RTO per class: T0 fully offline (ISO 18013-5), T1 RPO ≤ 5 min / RTO ≤ 30 min, T2 RTO ≤ 4h — see the Strategy tab",
  },
  {
    ro: "Exercițiu anual de failover complet: oprirea planificată a DC-A și rularea reală din DC-C timp de 24h",
    en: "Annual full failover drill: a planned shutdown of DC-A and real operation from DC-C for 24h",
  },
  {
    ro: "Chaos engineering lunar pe infrastructura de test: distrugerea aleatoare de noduri și legături, măsurat automat",
    en: "Monthly chaos engineering on the test infrastructure: random node and link destruction, measured automatically",
  },
];

export interface ResilCostRow {
  item: Bi;
  quantity: string;
  unitCost: string;
  total: string;
  dynamic?: "uat-ups";
}

export const RESILIENCE_COSTS: ResilCostRow[] = [
  {
    item: {
      ro: "8 micro-DC regionale (kit standardizat, container)",
      en: "8 regional micro-DCs (standardised container kit)",
    },
    quantity: "8",
    unitCost: "0,5–1,5M €",
    total: "4–12M €",
  },
  {
    item: {
      ro: "BESS + solar + genset per sit regional",
      en: "BESS + solar + genset per regional site",
    },
    quantity: "8 situri",
    unitCost: "0,3–0,5M €",
    total: "2,4–4M €",
  },
  {
    item: {
      ro: "Vault subteran în salină (adaptare, containere etanșe)",
      en: "Underground salt-mine vault (retrofit, sealed containers)",
    },
    quantity: "1–2",
    unitCost: "2–4M €",
    total: "2–8M €",
  },
  {
    item: {
      ro: "UPS + solar pentru nodurile L0 (unități locale/școli)",
      en: "UPS + solar for the L0 nodes (local units/schools)",
    },
    quantity: "≈{units}",
    unitCost: "300–500 €",
    total: "—",
    dynamic: "uat-ups",
  },
  {
    item: {
      ro: "DC mobile în containere (deploy 72h)",
      en: "Containerised mobile DCs (72h deployment)",
    },
    quantity: "2",
    unitCost: "0,75–1,5M €",
    total: "1,5–3M €",
  },
  {
    item: {
      ro: "Stoc național de piese de schimb (10%)",
      en: "National spares stockpile (10%)",
    },
    quantity: "—",
    unitCost: "—",
    total: "2–4M €",
  },
  {
    item: {
      ro: "Federația DC universitare (granturi, nu construcție)",
      en: "University DC federation (grants, not construction)",
    },
    quantity: "3 centre",
    unitCost: "0,3–0,5M €",
    total: "1–1,5M €",
  },
  {
    item: {
      ro: "Oglindă națională de artefacte + SBOM",
      en: "National artefact mirror + SBOM",
    },
    quantity: "1",
    unitCost: "0,2–0,3M €",
    total: "0,2–0,3M €",
  },
  {
    item: {
      ro: "Exercițiul anual de failover + chaos engineering",
      en: "Annual failover drill + chaos engineering",
    },
    quantity: "anual",
    unitCost: "0,1M €",
    total: "0,1M €/an",
  },
];

export interface RegionalDcRow {
  region: Bi;
  city: Bi;
  power: Bi;
  role: Bi;
  lon: number;
  lat: number;
}

export const REGIONAL_DCS: RegionalDcRow[] = [
  {
    region: { ro: "Nord-Vest", en: "North-West" },
    city: { ro: "Oradea", en: "Oradea" },
    power: {
      ro: "Solar 200–500 kWp + BESS 0,5–1 MWh + genset gaz",
      en: "200–500 kWp solar + 0.5–1 MWh BESS + gas genset",
    },
    role: {
      ro: "Servicii locale, oglindă L3, capacitate de citire regională",
      en: "Local services, L3 mirror, regional read capacity",
    },
    lon: 21.92,
    lat: 47.05,
  },
  {
    region: { ro: "Centru", en: "Centre" },
    city: { ro: "Sibiu", en: "Sibiu" },
    power: {
      ro: "Solar + BESS 0,5–1 MWh + genset gaz; răcire liberă",
      en: "Solar + 0.5–1 MWh BESS + gas genset; free cooling",
    },
    role: {
      ro: "Servicii locale, oglindă L3",
      en: "Local services, L3 mirror",
    },
    lon: 24.15,
    lat: 45.79,
  },
  {
    region: { ro: "Nord-Est", en: "North-East" },
    city: {
      ro: "Suceava (lângă salina Cacica)",
      en: "Suceava (near Cacica salt mine)",
    },
    power: {
      ro: "Solar + BESS + genset; acces la coridorul hidro nordic",
      en: "Solar + BESS + genset; access to the northern hydro corridor",
    },
    role: {
      ro: "Servicii locale + traseu de rezervă către vault-ul subteran",
      en: "Local services + backup route to the underground vault",
    },
    lon: 26.26,
    lat: 47.65,
  },
  {
    region: { ro: "Sud-Est", en: "South-East" },
    city: { ro: "Constanța", en: "Constanța" },
    power: {
      ro: "Solar (insolație mare) + BESS + genset; legătură la stațiile de racord subacvatice",
      en: "Solar (high insolation) + BESS + genset; link to the subsea landing stations",
    },
    role: {
      ro: "Servicii locale + rutare internațională de rezervă",
      en: "Local services + backup international routing",
    },
    lon: 28.65,
    lat: 44.17,
  },
  {
    region: { ro: "Sud-Muntenia", en: "South-Wallachia" },
    city: { ro: "Pitești", en: "Pitești" },
    power: {
      ro: "Solar + BESS + genset; legătură la nucleara Cernavodă",
      en: "Solar + BESS + genset; link to the Cernavodă nuclear line",
    },
    role: {
      ro: "Servicii locale, preluare rapidă pentru București în scenariu Vrancea",
      en: "Local services, fast take-over for Bucharest in a Vrancea scenario",
    },
    lon: 24.87,
    lat: 44.86,
  },
  {
    region: { ro: "București-Ilfov", en: "Bucharest-Ilfov" },
    city: { ro: "acoperit de DC-B", en: "covered by DC-B" },
    power: {
      ro: "—",
      en: "—",
    },
    role: {
      ro: "Regiunea e deservită direct de situl suveran secundar",
      en: "The region is served directly by the secondary sovereign site",
    },
    lon: 26.1,
    lat: 44.43,
  },
  {
    region: { ro: "Sud-Vest Oltenia", en: "South-West Oltenia" },
    city: { ro: "Craiova", en: "Craiova" },
    power: {
      ro: "Solar + BESS + genset; apropiere de Porțile de Fier",
      en: "Solar + BESS + genset; close to the Iron Gates",
    },
    role: {
      ro: "Servicii locale, oglindă L3",
      en: "Local services, L3 mirror",
    },
    lon: 23.8,
    lat: 44.32,
  },
  {
    region: { ro: "Vest", en: "West" },
    city: { ro: "Timișoara", en: "Timișoara" },
    power: {
      ro: "Solar + BESS + genset; rutare vestică terestră către UE",
      en: "Solar + BESS + genset; overland western routing towards the EU",
    },
    role: {
      ro: "Servicii locale + coridor vestic de rezervă (HU/AT)",
      en: "Local services + western backup corridor (HU/AT)",
    },
    lon: 21.23,
    lat: 45.75,
  },
];

export interface UndergroundRow {
  name: Bi;
  region: Bi;
  suitability: Bi;
  lon: number;
  lat: number;
}

export const UNDERGROUND_SITES: UndergroundRow[] = [
  {
    name: { ro: "Salina Cacica (Suceava)", en: "Cacica salt mine (Suceava)" },
    region: { ro: "Nord-Est", en: "North-East" },
    suitability: {
      ro: "Prima alegere: departe de Vrancea, temperatură stabilă, ecranare naturală EMP/incendiu",
      en: "Top pick: far from Vrancea, stable temperature, natural EMP/fire shielding",
    },
    lon: 25.99,
    lat: 47.63,
  },
  {
    name: {
      ro: "Salina Târgu Ocna (Bacău)",
      en: "Târgu Ocna salt mine (Bacău)",
    },
    region: { ro: "Nord-Est", en: "North-East" },
    suitability: {
      ro: "Alternativă: aceleași avantaje; galerii deja echipate parțial",
      en: "Alternative: same advantages; galleries partly equipped already",
    },
    lon: 26.62,
    lat: 46.28,
  },
  {
    name: { ro: "Salina Ocna Mureș (Alba)", en: "Ocna Mureș salt mine (Alba)" },
    region: { ro: "Centru", en: "Centre" },
    suitability: {
      ro: "Risc seismic redus; bună pentru a doua copie WORM",
      en: "Low seismic risk; good for the second WORM copy",
    },
    lon: 23.86,
    lat: 46.39,
  },
  {
    name: { ro: "Slănic Prahova", en: "Slănic Prahova" },
    region: { ro: "Muntenia", en: "Wallachia" },
    suitability: {
      ro: "De evitat pentru rol critic: în raza Vrancea; cutremurele de adâncime nu ocolesc galeriile",
      en: "Avoid for a critical role: within the Vrancea radius; deep quakes do not spare the galleries",
    },
    lon: 25.94,
    lat: 45.23,
  },
];

export interface EnergyRow {
  tier: Bi;
  site: Bi;
  generation: Bi;
  autonomy: Bi;
}

export const ENERGY_AUTONOMY: EnergyRow[] = [
  {
    tier: { ro: "T1 · nucleu", en: "T1 · core" },
    site: { ro: "3 situri suverane", en: "3 sovereign sites" },
    generation: {
      ro: "Rețea dublă + turbine gaz proprii + BESS 4–8 MWh + flywheel",
      en: "Dual grid + own gas turbines + 4–8 MWh BESS + flywheel",
    },
    autonomy: {
      ro: "4–8h pe baterii; nelimitat cu gaz propriu",
      en: "4–8h on batteries; unlimited with own gas",
    },
  },
  {
    tier: { ro: "T2 · regional", en: "T2 · regional" },
    site: { ro: "8 micro-DC regionale", en: "8 regional micro-DCs" },
    generation: {
      ro: "Solar 200–500 kWp + BESS 0,5–1 MWh + genset gaz/biogaz",
      en: "200–500 kWp solar + 0.5–1 MWh BESS + gas/biogas genset",
    },
    autonomy: {
      ro: "8–24h pe baterii, extins de solar; nelimitat cu genset",
      en: "8–24h on batteries, extended by solar; unlimited with the genset",
    },
  },
  {
    tier: { ro: "T3 · subteran", en: "T3 · underground" },
    site: {
      ro: "1–2 saline (vault + DC supraviețuitor)",
      en: "1–2 salt mines (vault + survivor DC)",
    },
    generation: {
      ro: "Rețeaua minei + genset + baterii; containere etanșe, presiune pozitivă (sarea e corozivă)",
      en: "Mine grid + genset + batteries; sealed containers, positive pressure (salt is corrosive)",
    },
    autonomy: {
      ro: "Zile — proiectat să funcționeze izolat",
      en: "Days — designed to run isolated",
    },
  },
  {
    tier: { ro: "L0 · margine", en: "L0 · edge" },
    site: {
      ro: "≈{units} unități locale (după reforma administrativă) + școli",
      en: "≈{units} local units (after the administrative reform) + schools",
    },
    generation: {
      ro: "UPS 2 kWh + panou solar 5 kW per nod",
      en: "2 kWh UPS + 5 kW solar panel per node",
    },
    autonomy: {
      ro: "2–8h + offline-first prin design",
      en: "2–8h + offline-first by design",
    },
  },
];

export const VRANCEA_EPICENTRE = { lon: 26.6, lat: 45.7 };
export const VRANCEA_RADII_KM = [50, 100, 200];
