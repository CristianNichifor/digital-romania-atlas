export interface ComparisonRow {
  dimension: string;
  current: string;
  proposed: string;
  verdict: "aligned" | "extended" | "added";
}

export const COMPARISON: ComparisonRow[] = [
  {
    dimension: "Identitate digitală",
    current: "PID prin RO Wallet (EUDI), LoA High, SD-JWT, ISO 18013-5",
    proposed: "Aceeași bază + politică de pseudonime pairwise per relying party",
    verdict: "extended",
  },
  {
    dimension: "Atestări (EAA)",
    current: "Portofoliu PuB-EAA MAI (mDL, cazier, stare civilă) + QEAA planificat",
    proposed: "Același + surse din toate sectoarele (sănătate, fiscal, educație) prin backbone",
    verdict: "extended",
  },
  {
    dimension: "Schimb de date instituțional",
    current: "HUB MAI – punct la punct, doar surse MAI",
    proposed: "Backbone național (X-Road/GovStack), toate registrele, consimțământ la gateway",
    verdict: "added",
  },
  {
    dimension: "Plăți",
    current: "Nu este acoperit",
    proposed: "SEPA Instant + Request-to-Pay în wallet, pregătit pentru euro digital",
    verdict: "added",
  },
  {
    dimension: "Comunicare cu cetățeanul",
    current: "Doar notificări push tehnice (PNS)",
    proposed: "Cutie poștală digitală legală + canale de încredere anti-phishing",
    verdict: "added",
  },
  {
    dimension: "Reziliență",
    current: "Nespecificat (WB unic, cluster HSM)",
    proposed: "Active-active geo-redundant, funcționare offline a wallet-ului, fallback fizic",
    verdict: "added",
  },
  {
    dimension: "Open source",
    current: "Documentație publică CC-BY-4.0; codul „la o etapă ulterioară”",
    proposed: "Cod EUPL: wallet, SDK-uri, relying parties de referință, build-uri reproducibile",
    verdict: "added",
  },
  {
    dimension: "Supraveghere",
    current: "DGPI (intern MAI) + certificare eIDAS obligatorie",
    proposed: "+ DNSC și ANSPDCP membri permanenți, audituri publice",
    verdict: "added",
  },
  {
    dimension: "Anti-corelare",
    current: "Divulgare selectivă (SD-JWT), atestare vârstă fără CNP",
    proposed: "+ pseudonime pairwise, fără jurnale centrale de prezentări",
    verdict: "extended",
  },
  {
    dimension: "Incluziune",
    current: "Nu este abordat",
    proposed: "Fluxuri asistate, diaspora prin consulate, accesibilitate WCAG",
    verdict: "added",
  },
  {
    dimension: "Semnătură calificată (QES)",
    current: "Prin QTSP, gratuit pentru uz non-profesional",
    proposed: "Identic",
    verdict: "aligned",
  },
  {
    dimension: "Registru de încredere",
    current: "STS – WRPRC/WRPAC, scheme naționale de atestare",
    proposed: "Același + interogabilitate publică și redundanță geo",
    verdict: "extended",
  },
  {
    dimension: "Transparență verificabilă",
    current: "Doar documentație publică (CC-BY-4.0)",
    proposed: "Ancore criptografice publice (lanț permisiv + EBSI) pentru registru, build-uri, ceremonii de chei, rapoarte SLA — doar hash-uri, niciodată date personale",
    verdict: "added",
  },
];

export const VERDICT_LABELS: Record<ComparisonRow["verdict"], string> = {
  aligned: "Aliniat",
  extended: "Extins de propunere",
  added: "Adăugat de propunere",
};
