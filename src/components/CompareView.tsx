import { COMPARISON, VERDICT_LABELS } from "../data/comparison";

const VERDICT_CLASS: Record<string, string> = {
  aligned: "v-aligned",
  extended: "v-extended",
  added: "v-added",
};

export function CompareView() {
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Comparație: documentația publicată vs. propunerea noastră</h2>
      </div>
      <table className="compare-table">
        <thead>
          <tr>
            <th>Dimensiune</th>
            <th>Propunerea actuală (RO Wallet docs + MAI)</th>
            <th>Propunerea noastră</th>
            <th>Statut</th>
          </tr>
        </thead>
        <tbody>
          {COMPARISON.map((row) => (
            <tr key={row.dimension}>
              <td className="dim">{row.dimension}</td>
              <td>{row.current}</td>
              <td>{row.proposed}</td>
              <td>
                <span className={`verdict ${VERDICT_CLASS[row.verdict]}`}>
                  {VERDICT_LABELS[row.verdict]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="muted note">
        Sursa coloanei „actual”: documentația publicată în{" "}
        <code>Ministerul-Afacerilor-Interne/rowallet-documentation</code> (decompoziție, componente,
        fluxuri) și prezentarea MAI „Rolul MAI în ecosistemul național EUDIW” (iul. 2026). Acolo
        unde documentul tace (plăți, backbone, reziliență, incluziune), rândul este marcat ca
        „Adăugat de propunere”.
      </p>
    </div>
  );
}
