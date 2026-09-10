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
import { pick, useLang, type Bi } from "../i18n";
import { UatPlanNote, uatUpsTotal, useUatPlan } from "../lib/uatPlan";
import { T } from "./T";

export function ResilienceView() {
  const { lang } = useLang();
  const { plan, fill, fmtUnits } = useUatPlan();
  const tt = (b: Bi) => fill(pick(b, lang));
  return (
    <div className="panel resilience">
      <div className="panel-head">
        <h2>
          {lang === "ro"
            ? "Reziliență: hardware, geografie, dezastre & comunitate academică"
            : "Resilience: hardware, geography, disasters & the academic community"}
        </h2>
      </div>
      <p className="muted note">
        <T
          text={
            lang === "ro"
              ? "Nimic nu depinde de un singur datacenter, un singur furnizor sau o singură rută de rețea. Modelul 3+8+1+L0: trei situri suverane semi-active, opt micro-DC regionale cu producție proprie de energie, un vault subteran în salină și nodurile offline din fiecare comună. Citește împreună cu clasele RPO/RTO din tab-ul Strategie și cu ancorarea publică din tab-ul Fluxuri."
              : "Nothing depends on a single datacenter, vendor or network route. The 3+8+1+L0 model: three semi-active sovereign sites, eight regional micro-DCs with their own power generation, one underground salt-mine vault and the offline nodes in every commune. Read together with the RPO/RTO classes in the Strategy tab and the public anchoring in the Flows tab."
          }
        />
      </p>

      <h3>
        {lang === "ro"
          ? "Plasamentul centrelor de date (3+3 universitare)"
          : "Data centre placement (3+3 university)"}
      </h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Sit" : "Site"}</th>
              <th>{lang === "ro" ? "Regiune" : "Region"}</th>
              <th>{lang === "ro" ? "Rol" : "Role"}</th>
              <th>{lang === "ro" ? "Risc seismic" : "Seismic risk"}</th>
              <th>{lang === "ro" ? "Energie & răcire" : "Power & cooling"}</th>
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
      <p className="muted note">
        {lang === "ro"
          ? "Pe hartă: inelele zonei seismice Vrancea (50/100/200 km), pătratele galbene = siturile DC suverane, pătratele albastre = micro-DC-urile regionale, triunghiurile mov = siturile subterane."
          : "On the map: the Vrancea seismic-zone rings (50/100/200 km), yellow squares = the sovereign DC sites, cyan squares = the regional micro-DCs, purple triangles = the underground sites."}
      </p>

      <h3>
        {lang === "ro"
          ? "Micro-DC regionale (câte unul per regiune de dezvoltare)"
          : "Regional micro-DCs (one per development region)"}
      </h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Regiune" : "Region"}</th>
              <th>{lang === "ro" ? "Locație" : "Location"}</th>
              <th>{lang === "ro" ? "Energie proprie" : "Own power"}</th>
              <th>{lang === "ro" ? "Rol" : "Role"}</th>
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

      <h3>
        {lang === "ro"
          ? "Autonomie energetică pe niveluri"
          : "Energy autonomy by tier"}
      </h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Nivel" : "Tier"}</th>
              <th>{lang === "ro" ? "Situri" : "Sites"}</th>
              <th>{lang === "ro" ? "Producție proprie" : "Own generation"}</th>
              <th>{lang === "ro" ? "Autonomie" : "Autonomy"}</th>
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

      <h3>
        {lang === "ro"
          ? "Candidați subterani (saline & galerii)"
          : "Underground candidates (salt mines & galleries)"}
      </h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Sit" : "Site"}</th>
              <th>{lang === "ro" ? "Regiune" : "Region"}</th>
              <th>{lang === "ro" ? "Evaluare" : "Assessment"}</th>
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
        <T
          text={
            lang === "ro"
              ? "Atenție la subteran: sarea e corozivă (containere etanșe, presiune pozitivă, control al umidității), iar cutremurele de adâncime Vrancea zguduie și galeriile — de aceea vault-ul stă în Nord-Est, nu în Muntenia."
              : "Underground caveats: salt is corrosive (sealed containers, positive pressure, humidity control), and deep Vrancea earthquakes shake galleries too — which is why the vault sits in the North-East, not in Wallachia."
          }
        />
      </p>

      <h3>
        {lang === "ro"
          ? "Scenarii de dezastru & răspuns"
          : "Disaster scenarios & response"}
      </h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Scenariu" : "Scenario"}</th>
              <th>{lang === "ro" ? "Impact" : "Impact"}</th>
              <th>{lang === "ro" ? "Răspuns" : "Response"}</th>
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

      <h3>
        {lang === "ro" ? "Independența hardware" : "Hardware independence"}
      </h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Strat" : "Layer"}</th>
              <th>{lang === "ro" ? "Azi" : "Today"}</th>
              <th>{lang === "ro" ? "Țintă" : "Target"}</th>
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

      <h3>
        {lang === "ro" ? "Independența software" : "Software independence"}
      </h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Strat" : "Layer"}</th>
              <th>{lang === "ro" ? "Azi" : "Today"}</th>
              <th>{lang === "ro" ? "Țintă" : "Target"}</th>
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

      <h3>
        {lang === "ro"
          ? "Școli, universități & cercetare în infrastructură"
          : "Schools, universities & research inside the infrastructure"}
      </h3>
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
          <h4>
            {lang === "ro"
              ? "Reguli de backup & testare"
              : "Backup & testing rules"}
          </h4>
          <ul>
            {BACKUP_RULES.map((r, i) => (
              <li key={i}>
                <T text={tt(r)} />
              </li>
            ))}
          </ul>
        </section>
        <section className="pillar">
          <h4>
            {lang === "ro"
              ? "Costuri de reziliență (estimare)"
              : "Resilience costs (estimate)"}
          </h4>
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
