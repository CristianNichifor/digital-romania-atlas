import { COMPARISON, VERDICT_LABELS } from "../data/comparison";
import { SOURCES } from "../data/sources";
import { EU_EVAL_LABELS, EU_MATRIX, EU_SYSTEMS } from "../data/euSystems";
import { pick, useLang, useT } from "../i18n";
import { T } from "./T";

// 1-based Surse numbers, matching the numbered cards in SourcesView.
const SOURCE_NUMBER = new Map(
  SOURCES.flatMap((s, i) => (s.url ? [[s.url, i + 1] as const] : []))
);

function SourceRefs({ urls }: { urls?: string[] }) {
  const t = useT();
  const numbers = (urls ?? []).flatMap((u) => SOURCE_NUMBER.get(u) ?? []);
  if (numbers.length === 0) return null;
  return (
    <sup className="source-refs" aria-label={t("nav.sources")}>
      {numbers.map((n) => (
        <a key={n} href={`#/sources/${n}`}>
          {n}
        </a>
      ))}
    </sup>
  );
}

const VERDICT_CLASS: Record<string, string> = {
  aligned: "v-aligned",
  extended: "v-extended",
  added: "v-added",
};

export function CompareView() {
  const { lang } = useLang();
  const t = useT();
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>{t("compare.title")}</h2>
      </div>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t("compare.dimension")}</th>
              <th>{t("compare.currentColumn")}</th>
              <th>{t("compare.ourColumn")}</th>
              <th>{t("compare.status")}</th>
            </tr>
          </thead>
          <tbody>
            {COMPARISON.map((row) => (
              <tr key={pick(row.dimension, "ro")}>
                <td className="dim">
                  <T text={pick(row.dimension, lang)} />
                  <SourceRefs urls={row.sources} />
                </td>
                <td>
                  <T text={pick(row.current, lang)} />
                </td>
                <td>
                  <T text={pick(row.proposed, lang)} />
                </td>
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
        <>
          {t("compare.sourceNote.before")}{" "}
          <code>Ministerul-Afacerilor-Interne/rowallet-documentation</code>{" "}
          {t("compare.sourceNote.after")}
        </>
      </p>
      <div className="panel">
        <div className="panel-head">
          <h2>{t("compare.euTitle")}</h2>
        </div>
        <p className="muted">{t("compare.euIntro")}</p>
        <div
          className="table-scroll eu-wrap"
          role="region"
          aria-label={t("compare.euRegion")}
          tabIndex={0}
        >
          <table className="compare-table eu-table">
            <thead>
              <tr>
                <th>{t("compare.dimension")}</th>
                {EU_SYSTEMS.map((s) => (
                  <th key={s.key} className={s.ours ? "eu-ours" : ""}>
                    <div className="eu-name">{pick(s.name, lang)}</div>
                    <div className="eu-country">{pick(s.country, lang)}</div>
                  </th>
                ))}
                <th className="eu-eval-head">{t("compare.euVerdict")}</th>
              </tr>
            </thead>
            <tbody>
              {EU_MATRIX.map((row) => (
                <tr key={pick(row.dimension, "ro")}>
                  <td className="dim">
                    <T text={pick(row.dimension, lang)} />
                  </td>
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
        <h3 className="eu-sub">{t("compare.addsTitle")}</h3>
        <ul className="eu-takeaways">
          <li>{t("compare.adds1")}</li>
          <li>{t("compare.adds2")}</li>
          <li>{t("compare.adds3")}</li>
          <li>{t("compare.adds4")}</li>
        </ul>
        <p className="muted note">{t("compare.adoptionNote")}</p>
      </div>
    </div>
  );
}
