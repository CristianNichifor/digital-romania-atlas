import {
  CONTEXT,
  COUNTERS,
  CRITERIA,
  GAINS,
  RISKS,
  VERDICT,
} from "../data/policy";
import { pick, useLang, useT } from "../i18n";
import { T } from "./T";

export function PolicyView() {
  const { lang } = useLang();
  const t = useT();
  return (
    <div className="panel policy">
      <div className="panel-head">
        <h2>{t("policy.title")}</h2>
      </div>
      <p className="muted note">
        <T text={t("policy.disclaimer")} />
      </p>

      <div className="callout">
        <strong>
          <T text={pick(VERDICT.heading, lang)} />
        </strong>
        <p>
          <T text={pick(VERDICT.text, lang)} />
        </p>
      </div>

      <h3>{t("policy.currentProposes")}</h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t("policy.element")}</th>
              <th>{t("policy.source")}</th>
            </tr>
          </thead>
          <tbody>
            {CONTEXT.map((c, i) => (
              <tr key={i}>
                <td>
                  <T text={pick(c.what, lang)} />
                </td>
                <td className="dim">
                  <T text={pick(c.source, lang)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{t("policy.risksTitle")}</h3>
      <div className="risk-grid">
        {RISKS.map((r, i) => (
          <section key={i} className="risk-card">
            <h4>
              <span className="risk-num">{i + 1}</span>{" "}
              <T text={pick(r.risk, lang)} />
            </h4>
            <p className="risk-why">
              <strong>{t("policy.risk")}</strong>
              <T text={pick(r.why, lang)} />
            </p>
            <p className="risk-fix">
              <strong>{t("policy.better")}</strong>
              <T text={pick(r.fix, lang)} />
            </p>
          </section>
        ))}
      </div>

      <h3>{t("policy.whyTitle")}</h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t("policy.criterion")}</th>
              <th>{t("policy.currentArchitecture")}</th>
              <th>{t("policy.ourProposal")}</th>
            </tr>
          </thead>
          <tbody>
            {CRITERIA.map((c, i) => (
              <tr key={i}>
                <td className="dim">
                  <T text={pick(c.criterion, lang)} />
                </td>
                <td>
                  <T text={pick(c.current, lang)} />
                </td>
                <td>
                  <T text={pick(c.ours, lang)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{t("policy.gainsTitle")}</h3>
      <div className="grid-cards">
        {GAINS.map((g, i) => (
          <div key={i} className="card">
            <strong>
              <T text={pick(g.gain, lang)} />
            </strong>
            <p>
              <T text={pick(g.value, lang)} />
            </p>
          </div>
        ))}
      </div>

      <h3>{t("policy.countersTitle")}</h3>
      <p className="muted note">{t("policy.countersIntro")}</p>
      <div className="counter-grid">
        {COUNTERS.map((c, i) => (
          <section key={i} className="counter-card">
            <p className="counter-arg">
              <strong>
                «<T text={pick(c.argument, lang)} />»
              </strong>
            </p>
            <p className="counter-resp">
              <strong>{t("policy.ourResponse")}</strong>
              <T text={pick(c.response, lang)} />
            </p>
          </section>
        ))}
      </div>
    </div>
  );
}
