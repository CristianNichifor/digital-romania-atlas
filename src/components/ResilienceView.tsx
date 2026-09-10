import {
  BACKUP_RULES,
  DC_PLACEMENT,
  DISASTERS,
  EDU_RESEARCH,
  HARDWARE_STACK,
  RESILIENCE_COSTS,
  SOFTWARE_STACK,
} from "../data/resilience";
import { pick, useLang } from "../i18n";

export function ResilienceView() {
  const { lang } = useLang();
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
        {lang === "ro" ? (
          <>
            Nimic nu depinde de un singur datacenter, un singur furnizor sau o singură rută de
            rețea. Modelul <strong>3+3</strong>: trei situri suverane + trei centre universitare
            federate. Citește împreună cu clasele RPO/RTO din tab-ul <em>Strategie</em> și cu
            ancorarea publică din tab-ul <em>Fluxuri</em>.
          </>
        ) : (
          <>
            Nothing depends on a single datacenter, vendor or network route. The{" "}
            <strong>3+3</strong> model: three sovereign sites + three federated university centres.
            Read together with the RPO/RTO classes in the <em>Strategy</em> tab and the public
            anchoring in the <em>Flows</em> tab.
          </>
        )}
      </p>

      <h3>{lang === "ro" ? "Plasamentul centrelor de date (3+3)" : "Data centre placement (3+3)"}</h3>
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
                  {pick(d.name, lang)}
                  <div className="sub">{pick(d.location, lang)}</div>
                </td>
                <td>{pick(d.region, lang)}</td>
                <td>{pick(d.role, lang)}</td>
                <td>{pick(d.seismic, lang)}</td>
                <td>{pick(d.energy, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted note">
        {lang === "ro"
          ? "Pe hartă: inelele zonei seismice Vrancea (50/100/200 km) și pătratele galbene = siturile DC suverane."
          : "On the map: the Vrancea seismic-zone rings (50/100/200 km) and the yellow squares = the sovereign DC sites."}
      </p>

      <h3>{lang === "ro" ? "Scenarii de dezastru & răspuns" : "Disaster scenarios & response"}</h3>
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
                <td className="dim">{pick(d.scenario, lang)}</td>
                <td>{pick(d.impact, lang)}</td>
                <td>{pick(d.response, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{lang === "ro" ? "Independența hardware" : "Hardware independence"}</h3>
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
                <td className="dim">{pick(r.layer, lang)}</td>
                <td>{pick(r.current, lang)}</td>
                <td>{pick(r.target, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{lang === "ro" ? "Independența software" : "Software independence"}</h3>
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
                <td className="dim">{pick(r.layer, lang)}</td>
                <td>{pick(r.current, lang)}</td>
                <td>{pick(r.target, lang)}</td>
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
            <strong>{pick(e.theme, lang)}</strong>
            <p>{pick(e.what, lang)}</p>
          </div>
        ))}
      </div>

      <div className="pillars" style={{ marginTop: 12 }}>
        <section className="pillar">
          <h4>{lang === "ro" ? "Reguli de backup & testare" : "Backup & testing rules"}</h4>
          <ul>
            {BACKUP_RULES.map((r, i) => (
              <li key={i}>{pick(r, lang)}</li>
            ))}
          </ul>
        </section>
        <section className="pillar">
          <h4>{lang === "ro" ? "Costuri de reziliență (estimare)" : "Resilience costs (estimate)"}</h4>
          <ul className="cost-list">
            {RESILIENCE_COSTS.map((c, i) => (
              <li key={i}>
                <span>{pick(c.item, lang)}</span>
                <em>
                  {c.quantity} · {c.unitCost} = {c.total}
                </em>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
