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
            rețea. Modelul <strong>3+8+1+L0</strong>: trei situri suverane semi-active, opt
            micro-DC regionale cu producție proprie de energie, un vault subteran în salină și
            nodurile offline din fiecare comună. Citește împreună cu clasele RPO/RTO din tab-ul{" "}
            <em>Strategie</em> și cu ancorarea publică din tab-ul <em>Fluxuri</em>.
          </>
        ) : (
          <>
            Nothing depends on a single datacenter, vendor or network route. The{" "}
            <strong>3+8+1+L0</strong> model: three semi-active sovereign sites, eight regional
            micro-DCs with their own power generation, one underground salt-mine vault and the
            offline nodes in every commune. Read together with the RPO/RTO classes in the{" "}
            <em>Strategy</em> tab and the public anchoring in the <em>Flows</em> tab.
          </>
        )}
      </p>

      <h3>{lang === "ro" ? "Plasamentul centrelor de date (3+3 universitare)" : "Data centre placement (3+3 university)"}</h3>
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
          ? "Pe hartă: inelele zonei seismice Vrancea (50/100/200 km), pătratele galbene = siturile DC suverane, pătratele albastre = micro-DC-urile regionale, triunghiurile mov = siturile subterane."
          : "On the map: the Vrancea seismic-zone rings (50/100/200 km), yellow squares = the sovereign DC sites, cyan squares = the regional micro-DCs, purple triangles = the underground sites."}
      </p>

      <h3>{lang === "ro" ? "Micro-DC regionale (câte unul per regiune de dezvoltare)" : "Regional micro-DCs (one per development region)"}</h3>
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
                <td className="dim">{pick(r.region, lang)}</td>
                <td>{pick(r.city, lang)}</td>
                <td>{pick(r.power, lang)}</td>
                <td>{pick(r.role, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{lang === "ro" ? "Autonomie energetică pe niveluri" : "Energy autonomy by tier"}</h3>
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
                <td className="dim">{pick(e.tier, lang)}</td>
                <td>{pick(e.site, lang)}</td>
                <td>{pick(e.generation, lang)}</td>
                <td>{pick(e.autonomy, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{lang === "ro" ? "Candidați subterani (saline & galerii)" : "Underground candidates (salt mines & galleries)"}</h3>
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
                <td className="dim">{pick(u.name, lang)}</td>
                <td>{pick(u.region, lang)}</td>
                <td>{pick(u.suitability, lang)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted note">
        {lang === "ro"
          ? "Atenție la subteran: sarea e corozivă (containere etanșe, presiune pozitivă, control al umidității), iar cutremurele de adâncime Vrancea zguduie și galeriile — de aceea vault-ul stă în Nord-Est, nu în Muntenia."
          : "Underground caveats: salt is corrosive (sealed containers, positive pressure, humidity control), and deep Vrancea earthquakes shake galleries too — which is why the vault sits in the North-East, not in Wallachia."}
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
