import { useLang } from "../i18n";

export type ViewId =
  | "summary"
  | "stories"
  | "map"
  | "flows"
  | "compare"
  | "timeline"
  | "strategy"
  | "resilience"
  | "sources";

const GAPS: { ro: string; en: string }[] = [
  { ro: "Schimb de date între instituții", en: "Inter-institution data exchange" },
  { ro: "Plăți instant în wallet", en: "Instant payments in the wallet" },
  { ro: "Cutia poștală digitală", en: "The digital postbox" },
  { ro: "Reziliență geografică & offline", en: "Geo-redundancy & offline operation" },
  { ro: "Transparență verificabilă public", en: "Publicly verifiable transparency" },
];

export function SummaryView({ onNavigate }: { onNavigate: (v: ViewId) => void }) {
  const { lang } = useLang();
  return (
    <div className="panel summary">
      <div className="summary-hero">
        <h2>
          {lang === "ro" ? "România digitală în 30 de secunde" : "Digital Romania in 30 seconds"}
        </h2>
        <p className="summary-sub">
          {lang === "ro"
            ? "Statul garantează datele la sursă și le rutează cu consimțământul tău. Nu le colectează, nu le urmărește. Nimic nu depinde de un singur furnizor, un singur datacenter sau un singur minister."
            : "The state vouches for data at the source and routes it with your consent. It neither collects it nor tracks it. Nothing depends on a single vendor, a single datacenter or a single ministry."}
        </p>
      </div>
      <div className="summary-cards">
        <section className="summary-card today">
          <h3>{lang === "ro" ? "Ce se întâmplă azi" : "What happens today"}</h3>
          <ul>
            <li>
              {lang === "ro" ? (
                <>
                  <strong>RO Wallet (EUDI)</strong> — PID + verificarea vârstei în dec. 2026, sub
                  MAI; atestări (mDL, cazier, stare civilă) în 2027
                </>
              ) : (
                <>
                  <strong>RO Wallet (EUDI)</strong> — PID + age verification by Dec 2026, under
                  MAI; attestations (mDL, criminal record, civil status) in 2027
                </>
              )}
            </li>
            <li>
              {lang === "ro" ? (
                <>
                  <strong>Registru STS</strong> — cine poate emite și cine poate verifica
                  (WRPRC/WRPAC)
                </>
              ) : (
                <>
                  <strong>STS registry</strong> — who may issue and who may verify (WRPRC/WRPAC)
                </>
              )}
            </li>
            <li>
              {lang === "ro"
                ? "De la dec. 2027, băncile, telecomul, utilitățile și asigurătorii trebuie să accepte portofelul"
                : "From Dec 2027 banks, telecoms, utilities and insurers must accept the wallet"}
            </li>
          </ul>
        </section>
        <section className="summary-card proposal">
          <h3>{lang === "ro" ? "Ce propunem în plus" : "What we propose on top"}</h3>
          <ul>
            {GAPS.map((g) => (
              <li key={g.ro}>{lang === "ro" ? g.ro : g.en}</li>
            ))}
          </ul>
          <p className="muted">
            {lang === "ro"
              ? "Cost estimat: ~2–3 €/cetățean/an; economii din licențe: 30–60M €/an."
              : "Estimated cost: ~€2–3/citizen/year; licence savings: €30–60M/year."}
          </p>
        </section>
        <section className="summary-card why">
          <h3>{lang === "ro" ? "De ce contează" : "Why it matters"}</h3>
          <ul>
            <li>
              {lang === "ro"
                ? "Tu decizi ce date dezvălui, cui și în ce scop — fără urmărire, fără profilare"
                : "You decide what data you reveal, to whom and for what purpose — no tracking, no profiling"}
            </li>
            <li>
              {lang === "ro"
                ? "Funcționează și când rețeaua cade: prezentări offline, ghișeu fizic ca plasă de siguranță"
                : "It keeps working when the network dies: offline presentations, physical desks as a safety net"}
            </li>
            <li>
              {lang === "ro"
                ? "Cod deschis, verificabil: build-urile și registrul sunt ancorate public — verify, don't trust"
                : "Open, verifiable code: builds and the registry are publicly anchored — verify, don't trust"}
            </li>
          </ul>
        </section>
      </div>
      <div className="summary-cta">
        <button className="cta" onClick={() => onNavigate("stories")}>
          {lang === "ro" ? "Vezi poveștile cetățenilor →" : "See the citizens' stories →"}
        </button>
        <button className="cta secondary" onClick={() => onNavigate("compare")}>
          {lang === "ro" ? "Vezi comparația completă" : "See the full comparison"}
        </button>
        <button className="cta secondary" onClick={() => onNavigate("flows")}>
          {lang === "ro" ? "Explorează fluxurile" : "Explore the flows"}
        </button>
      </div>
    </div>
  );
}
