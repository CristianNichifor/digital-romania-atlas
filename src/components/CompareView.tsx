import { COMPARISON, VERDICT_LABELS } from "../data/comparison";
import { pick, useLang } from "../i18n";
import { T } from "./T";

const VERDICT_CLASS: Record<string, string> = {
  aligned: "v-aligned",
  extended: "v-extended",
  added: "v-added",
};

export function CompareView() {
  const { lang } = useLang();
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>
          {lang === "ro"
            ? "Comparație: documentația publicată vs. propunerea noastră"
            : "Comparison: published documentation vs. our proposal"}
        </h2>
      </div>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Dimensiune" : "Dimension"}</th>
              <th>
                {lang === "ro"
                  ? "Propunerea actuală (RO Wallet docs + MAI)"
                  : "Current proposal (RO Wallet docs + MAI)"}
              </th>
              <th>{lang === "ro" ? "Propunerea noastră" : "Our proposal"}</th>
              <th>{lang === "ro" ? "Statut" : "Status"}</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row) => (
              <tr key={pick(row.dimension, "ro")}>
                <td className="dim"><T text={pick(row.dimension, lang)} /></td>
                <td><T text={pick(row.current, lang)} /></td>
                <td><T text={pick(row.proposed, lang)} /></td>
                <td>
                  <span className={`verdict ${VERDICT_CLASS[row.verdict]}`}>
                    {pick(VERDICT_LABELS[row.verdict], lang)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted note">
        {lang === "ro" ? (
          <>
            Sursa coloanei „actual”: documentația publicată în{" "}
            <code>Ministerul-Afacerilor-Interne/rowallet-documentation</code> (decompoziție,
            componente, fluxuri) și prezentarea MAI „Rolul MAI în ecosistemul național EUDIW”
            (iul. 2026). Acolo unde documentul tace (plăți, backbone, reziliență, incluziune),
            rândul este marcat ca „Adăugat de propunere”. Detalii în tabul Surse.
          </>
        ) : (
          <>
            Source of the “current” column: the published{" "}
            <code>Ministerul-Afacerilor-Interne/rowallet-documentation</code> (decomposition,
            components, flows) and the MAI presentation “MAI's role in the national EUDIW
            ecosystem” (Jul 2026). Where the document is silent (payments, backbone, resilience,
            inclusion), the row is marked “Added by proposal”. Details in the Sources tab.
          </>
        )}
      </p>
    </div>
  );
}
