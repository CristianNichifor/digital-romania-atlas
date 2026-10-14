import {
  BACKUP_RULES,
  DC_PLACEMENT,
  DISASTERS,
  EDU_RESEARCH,
  ENERGY_AUTONOMY,
  HARDWARE_STACK,
  REGIONAL_DCS,
  RESILIENCE_COSTS,
  SOFTWARE_STACK,
  UNDERGROUND_SITES,
} from "../data/resilience";
import { pick, useLang, type Bi, useT } from "../i18n";
import { UatPlanNote, uatUpsTotal, useUatPlan } from "../lib/uatPlan";
import { T } from "./T";

export function ResilienceView() {
  const { lang } = useLang();
  const t = useT();
  const { plan, fill, fmtUnits } = useUatPlan();
  const tt = (b: Bi) => fill(pick(b, lang));
  return (
    <div className="panel resilience">
      <div className="panel-head">
        <h2>{t("resilience.resilienceHardwareGeographyDisasters")}</h2>
      </div>
      <p className="muted note">
        <T text={t("resilience.nothingDependsOnA")} />
      </p>

      <h3>{t("resilience.dataCentrePlacement3")}</h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t("resilience.site")}</th>
              <th>{t("resilience.region")}</th>
              <th>{t("resilience.role")}</th>
              <th>{t("resilience.seismicRisk")}</th>
              <th>{t("resilience.powerCooling")}</th>
            </tr>
          </thead>
          <tbody>
            {DC_PLACEMENT.map((d) => (
              <tr key={d.id}>
                <td className="dim">
                  <T text={tt(d.name)} />
                  <div className="sub">
                    <T text={tt(d.location)} />
                  </div>
                </td>
                <td>
                  <T text={tt(d.region)} />
                </td>
                <td>
                  <T text={tt(d.role)} />
                </td>
                <td>
                  <T text={tt(d.seismic)} />
                </td>
                <td>
                  <T text={tt(d.energy)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted note">{t("resilience.onTheMapThe")}</p>

      <h3>{t("resilience.regionalMicroDcsOne")}</h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t("resilience.region")}</th>
              <th>{t("resilience.location")}</th>
              <th>{t("resilience.ownPower")}</th>
              <th>{t("resilience.role")}</th>
            </tr>
          </thead>
          <tbody>
            {REGIONAL_DCS.map((r, i) => (
              <tr key={i}>
                <td className="dim">
                  <T text={tt(r.region)} />
                </td>
                <td>
                  <T text={tt(r.city)} />
                </td>
                <td>
                  <T text={tt(r.power)} />
                </td>
                <td>
                  <T text={tt(r.role)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{t("resilience.energyAutonomyByTier")}</h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t("resilience.tier")}</th>
              <th>{t("resilience.sites")}</th>
              <th>{t("resilience.ownGeneration")}</th>
              <th>{t("resilience.autonomy")}</th>
            </tr>
          </thead>
          <tbody>
            {ENERGY_AUTONOMY.map((e, i) => (
              <tr key={i}>
                <td className="dim">
                  <T text={tt(e.tier)} />
                </td>
                <td>
                  <T text={tt(e.site)} />
                </td>
                <td>
                  <T text={tt(e.generation)} />
                </td>
                <td>
                  <T text={tt(e.autonomy)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{t("resilience.undergroundCandidatesSaltMines")}</h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t("resilience.site")}</th>
              <th>{t("resilience.region")}</th>
              <th>{t("resilience.assessment")}</th>
            </tr>
          </thead>
          <tbody>
            {UNDERGROUND_SITES.map((u, i) => (
              <tr key={i}>
                <td className="dim">
                  <T text={tt(u.name)} />
                </td>
                <td>
                  <T text={tt(u.region)} />
                </td>
                <td>
                  <T text={tt(u.suitability)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted note">
        <T text={t("resilience.undergroundCaveatsSaltIs")} />
      </p>

      <h3>{t("resilience.disasterScenariosResponse")}</h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t("resilience.scenario")}</th>
              <th>{t("resilience.impact")}</th>
              <th>{t("resilience.response")}</th>
            </tr>
          </thead>
          <tbody>
            {DISASTERS.map((d, i) => (
              <tr key={i}>
                <td className="dim">
                  <T text={tt(d.scenario)} />
                </td>
                <td>
                  <T text={tt(d.impact)} />
                </td>
                <td>
                  <T text={tt(d.response)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{t("resilience.hardwareIndependence")}</h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t("resilience.layer")}</th>
              <th>{t("resilience.today")}</th>
              <th>{t("resilience.target")}</th>
            </tr>
          </thead>
          <tbody>
            {HARDWARE_STACK.map((r, i) => (
              <tr key={i}>
                <td className="dim">
                  <T text={tt(r.layer)} />
                </td>
                <td>
                  <T text={tt(r.current)} />
                </td>
                <td>
                  <T text={tt(r.target)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{t("resilience.softwareIndependence")}</h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t("resilience.layer")}</th>
              <th>{t("resilience.today")}</th>
              <th>{t("resilience.target")}</th>
            </tr>
          </thead>
          <tbody>
            {SOFTWARE_STACK.map((r, i) => (
              <tr key={i}>
                <td className="dim">
                  <T text={tt(r.layer)} />
                </td>
                <td>
                  <T text={tt(r.current)} />
                </td>
                <td>
                  <T text={tt(r.target)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{t("resilience.schoolsUniversitiesResearchInside")}</h3>
      <div className="grid-cards">
        {EDU_RESEARCH.map((e, i) => (
          <div key={i} className="card">
            <strong>
              <T text={tt(e.theme)} />
            </strong>
            <p>
              <T text={tt(e.what)} />
            </p>
          </div>
        ))}
      </div>

      <UatPlanNote />
      <div className="pillars" style={{ marginTop: 12 }}>
        <section className="pillar">
          <h4>{t("resilience.backupTestingRules")}</h4>
          <ul>
            {BACKUP_RULES.map((r, i) => (
              <li key={i}>
                <T text={tt(r)} />
              </li>
            ))}
          </ul>
        </section>
        <section className="pillar">
          <h4>{t("resilience.resilienceCostsEstimate")}</h4>
          <ul className="cost-list">
            {RESILIENCE_COSTS.map((c, i) => (
              <li key={i}>
                <span>
                  <T text={tt(c.item)} />
                </span>
                <em>
                  {c.dynamic === "uat-ups"
                    ? `≈${fmtUnits(plan.units)}`
                    : c.quantity}{" "}
                  · {c.unitCost} ={" "}
                  {c.dynamic === "uat-ups" ? uatUpsTotal(plan) : c.total}
                </em>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
