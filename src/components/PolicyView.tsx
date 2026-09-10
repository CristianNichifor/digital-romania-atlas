import { CONTEXT, CRITERIA, GAINS, RISKS, VERDICT } from "../data/policy";
import { pick, useLang } from "../i18n";

export function PolicyView() {
  const { lang } = useLang();
  return (
    <div className="panel policy">
      <div className="panel-head">
        <h2>
          {lang === "ro"
            ? "Analiză de politică: arhitectura RO Wallet vs. propunerea noastră"
            : "Policy analysis: the RO Wallet architecture vs. our proposal"}
        </h2>
      </div>
      <p className="muted note">
        {lang === "ro"
          ? "Poziție de design, nu document oficial. Faptele „actuale” provin din documentația publică MAI (repo-ul GitHub) și din prezentarea MAI din iulie 2026."
          : "A design position, not an official document. The “current” facts come from the public MAI documentation (the GitHub repo) and the MAI presentation of July 2026."}
      </p>

      <div className="callout">
        <strong>{pick(VERDICT.heading, lang)}</strong>
        <p>{pick(VERDICT.text, lang)}</p>
      </div>

      <h3>{lang === "ro" ? "Ce propune arhitectura actuală" : "What the current architecture proposes"}</h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Construcție" : "Element"}</th>
              <th>{lang === "ro" ? "Sursă" : "Source"}</th>
            </tr>
          </thead>
          <tbody>
            {CONTEXT.map((c, i) => (
              <tr key={i}>
                <td>{pick(c.what, lang)}</td>
                <td className="dim">{pick(c.source, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{lang === "ro" ? "Cele 8 riscuri — și ce facem mai bine" : "The 8 risks — and what we do better"}</h3>
      <div className="risk-grid">
        {RISKS.map((r, i) => (
          <section key={i} className="risk-card">
            <h4>
              <span className="risk-num">{i + 1}</span> {pick(r.risk, lang)}
            </h4>
            <p className="risk-why">
              <strong>{lang === "ro" ? "Riscul: " : "Risk: "}</strong>
              {pick(r.why, lang)}
            </p>
            <p className="risk-fix">
              <strong>{lang === "ro" ? "Mai bine: " : "Better: "}</strong>
              {pick(r.fix, lang)}
            </p>
          </section>
        ))}
      </div>

      <h3>{lang === "ro" ? "De ce propunerea noastră este cea potrivită" : "Why our proposal is the right one"}</h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Criteriu" : "Criterion"}</th>
              <th>{lang === "ro" ? "Arhitectura actuală" : "Current architecture"}</th>
              <th>{lang === "ro" ? "Propunerea noastră" : "Our proposal"}</th>
            </tr>
          </thead>
          <tbody>
            {CRITERIA.map((c, i) => (
              <tr key={i}>
                <td className="dim">{pick(c.criterion, lang)}</td>
                <td>{pick(c.current, lang)}</td>
                <td>{pick(c.ours, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{lang === "ro" ? "Câștigurile concrete" : "The concrete gains"}</h3>
      <div className="grid-cards">
        {GAINS.map((g, i) => (
          <div key={i} className="card">
            <strong>{pick(g.gain, lang)}</strong>
            <p>{pick(g.value, lang)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
