import { COMPARISON, VERDICT_LABELS } from "../data/comparison";
import { EU_EVAL_LABELS, EU_MATRIX, EU_SYSTEMS } from "../data/euSystems";
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
      <div className="panel">
        <div className="panel-head">
          <h2>
            {lang === "ro"
              ? "Propunerea noastră vs. sistemele digitale din UE"
              : "Our proposal vs. other EU digital systems"}
          </h2>
        </div>
        <p className="muted">
          {lang === "ro"
            ? "Cele mai mature sisteme de identitate și schimb de date din UE fac fiecare câte una dintre bucăți; aproape nimeni nu le combină. Mai jos, propunerea din acest atlas pusă lângă ele."
            : "The EU's most mature identity and data-exchange systems each do one of the pieces; almost nobody combines them. Below, this atlas's proposal next to them."}
        </p>
        <div className="table-scroll eu-wrap">
          <table className="compare-table eu-table">
            <thead>
              <tr>
                <th>{lang === "ro" ? "Dimensiune" : "Dimension"}</th>
                {EU_SYSTEMS.map((s) => (
                  <th key={s.key} className={s.ours ? "eu-ours" : ""}>
                    <div className="eu-name">{pick(s.name, lang)}</div>
                    <div className="eu-country">{pick(s.country, lang)}</div>
                  </th>
                ))}
                <th className="eu-eval-head">
                  {lang === "ro" ? "Evaluare (noi vs. restul)" : "Verdict (us vs. rest)"}
                </th>
              </tr>
            </thead>
            <tbody>
              {EU_MATRIX.map((row) => (
                <tr key={pick(row.dimension, "ro")}>
                  <td className="dim"><T text={pick(row.dimension, lang)} /></td>
                  {EU_SYSTEMS.map((s) => (
                    <td key={s.key} className={s.ours ? "eu-ours" : ""}>
                      <T text={pick(row.cells[s.key], lang)} />
                    </td>
                  ))}
                  <td className="eu-eval-cell">
                    <span className={`verdict v-${row.eval}`}>
                      {pick(EU_EVAL_LABELS[row.eval], lang)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <h3 className="eu-sub">
          {lang === "ro" ? "Ce aduce propunerea în plus" : "What the proposal adds"}
        </h3>
        <ul className="eu-takeaways">
          <li>
            {lang === "ro"
              ? "Nimeni altcineva nu leagă cele trei: X-Road acoperă schimbul de date fără identitate pentru cetățeni, DigiD/itsme/MitID acoperă identitatea fără un backbone de date — propunerea le combină pe ambele și adaugă plăți."
              : "Nobody else joins the three: X-Road covers data exchange with no citizen identity, DigiD/itsme/MitID cover identity with no data backbone — the proposal combines both and adds payments."}
          </li>
          <li>
            {lang === "ro"
              ? "Rămâne 100% compatibilă cu cadrul EUDI (PID LoA High, dezvăluire selectivă, QES gratuită), deci interoperabilă cu toate portofelele europene."
              : "It stays 100% compatible with the EUDI framework (PID LoA High, selective disclosure, free QES), so it interoperates with every European wallet."}
          </li>
          <li>
            {lang === "ro"
              ? "Este singurul design cu strat offline (L0) și arhivă subterană — continuitate pe care sistemele „doar online” nu o au."
              : "It is the only design with an offline layer (L0) and an underground archive — continuity that the online-only systems do not have."}
          </li>
          <li>
            {lang === "ro"
              ? "Transparență verificabilă (cod EUPL + ancore publice hash-only) acolo unde DigiD, itsme sau MitID sunt închise — și mai departe decât X-Road (MIT), cu ancore criptografice pentru build-uri, registru și ceremonii de chei."
              : "Verifiable transparency (EUPL code + hash-only public anchors) where DigiD, itsme and MitID are closed — and further than X-Road (MIT), with cryptographic anchors for builds, registry and key ceremonies."}
          </li>
        </ul>
        <p className="muted note">
          {lang === "ro" ? (
            <>
              Cifrele de adopție sunt aproximative (≈) și pot fi depășite de acumularea recentă;
              sursele complete pentru fiecare sistem sunt în tabul Surse. Coloana „Evaluare” compară
              propunerea noastră cu ce e mai bun în restul tabelului, dimensiune cu dimensiune.
            </>
          ) : (
            <>
              Adoption figures are approximate (≈) and may already be exceeded by recent growth;
              full sources for each system are in the Sources tab. The “Verdict” column rates our
              proposal against the best of the rest, dimension by dimension.
            </>
          )}
        </p>
      </div>
    </div>
  );
}
