import {
  CONSOLIDATION,
  COSTS,
  CUTOVER,
  GOV_RULES,
  INVENTORY,
  KPIS,
  LAYERS,
  MACHINES,
  PILLARS,
  PORTALS,
  REDUNDANCY_TIERS,
  SAVINGS,
} from "../data/strategy";
import { pick, useLang } from "../i18n";
import { T } from "./T";

const STATUS_LABEL: Record<string, { ro: string; en: string }> = {
  "in-flight": { ro: "În curs", en: "In flight" },
  proposal: { ro: "Propunere", en: "Proposal" },
  partial: { ro: "Parțial", en: "Partial" },
};

const STATUS_CLASS: Record<string, string> = {
  "in-flight": "v-aligned",
  proposal: "v-added",
  partial: "v-extended",
};

export function StrategyView() {
  const { lang } = useLang();
  return (
    <div className="panel strategy">
      <div className="panel-head">
        <h2>
          {lang === "ro"
            ? "Strategia completă — de la stația de lucru la plăți"
            : "The full strategy — from the workstation to payments"}
        </h2>
      </div>

      <h3>{lang === "ro" ? "Arhitectura pe 7 straturi" : "The 7-layer architecture"}</h3>
      <div className="table-scroll">
        <table className="compare-table layer-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Strat" : "Layer"}</th>
              <th>{lang === "ro" ? "Conținut" : "Contents"}</th>
              <th>{lang === "ro" ? "Responsabil" : "Owner"}</th>
              <th>{lang === "ro" ? "Stare" : "Status"}</th>
            </tr>
          </thead>
          <tbody>
            {LAYERS.map((l) => (
              <tr key={l.id}>
                <td className="dim">
                  {l.id}
                  <br />
                  <span className="layer-name"><T text={pick(l.name, lang)} /></span>
                </td>
                <td><T text={pick(l.what, lang)} /></td>
                <td><T text={pick(l.owner, lang)} /></td>
                <td>
                  <span className={`verdict ${STATUS_CLASS[l.status]}`}>
                    {pick(STATUS_LABEL[l.status], lang)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{lang === "ro" ? "Cei șase piloni" : "The six pillars"}</h3>
      <div className="pillars">
        {PILLARS.map((p) => (
          <section key={pick(p.title, "ro")} className="pillar">
            <h4><T text={pick(p.title, lang)} /></h4>
            <ul>
              {p.items.map((it, i) => (
                <li key={i}><T text={pick(it, lang)} /></li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <h3>
        {lang === "ro"
          ? "Redundanță pe clase de serviciu"
          : "Redundancy by service class"}
      </h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Clasă" : "Class"}</th>
              <th>{lang === "ro" ? "Exemple" : "Examples"}</th>
              <th>{lang === "ro" ? "Țintă" : "Target"}</th>
              <th>{lang === "ro" ? "Mecanism" : "Mechanism"}</th>
            </tr>
          </thead>
          <tbody>
            {REDUNDANCY_TIERS.map((t) => (
              <tr key={t.tier}>
                <td className="dim">
                  {t.tier} — <T text={pick(t.name, lang)} />
                </td>
                <td><T text={pick(t.examples, lang)} /></td>
                <td>
                  <strong>{String(t.target)}</strong>
                </td>
                <td><T text={pick(t.mechanism, lang)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>
        {lang === "ro"
          ? "Resurse & costuri (estimare pe 5 ani)"
          : "Resources & costs (5-year estimate)"}
      </h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Element" : "Item"}</th>
              <th>{lang === "ro" ? "Estimare" : "Estimate"}</th>
              <th>{lang === "ro" ? "Notă" : "Note"}</th>
            </tr>
          </thead>
          <tbody>
            {COSTS.map((c) => (
              <tr key={pick(c.item, "ro")}>
                <td className="dim"><T text={pick(c.item, lang)} /></td>
                <td>
                  <strong>{c.estimate}</strong>
                </td>
                <td><T text={pick(c.notes, lang)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>
        {lang === "ro" ? "Mașini & echipamente necesare" : "Machines & equipment required"}
      </h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Element" : "Item"}</th>
              <th>{lang === "ro" ? "Cantitate" : "Quantity"}</th>
              <th>{lang === "ro" ? "Cost unitar" : "Unit cost"}</th>
              <th>{lang === "ro" ? "Total" : "Total"}</th>
            </tr>
          </thead>
          <tbody>
            {MACHINES.map((m) => (
              <tr key={pick(m.item, "ro")}>
                <td className="dim"><T text={pick(m.item, lang)} /></td>
                <td>{m.quantity}</td>
                <td>{m.unitCost}</td>
                <td>
                  <strong>{m.total}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{lang === "ro" ? "Economii estimate" : "Estimated savings"}</h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Categorie" : "Category"}</th>
              <th>{lang === "ro" ? "Valoare" : "Value"}</th>
              <th>{lang === "ro" ? "Bază de calcul" : "Basis"}</th>
            </tr>
          </thead>
          <tbody>
            {SAVINGS.map((s) => (
              <tr key={pick(s.item, "ro")}>
                <td className="dim"><T text={pick(s.item, lang)} /></td>
                <td>
                  <strong>{s.estimate}</strong>
                </td>
                <td><T text={pick(s.basis, lang)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>
        {lang === "ro"
          ? "Portalurile orientate către exterior (14)"
          : "The outward-facing portals (14)"}
      </h3>
      <div className="portals">
        {PORTALS.map((p) => (
          <div key={p.id} className="portal-card">
            <strong><T text={pick(p.name, lang)} /></strong>
            <p><T text={pick(p.what, lang)} /></p>
          </div>
        ))}
      </div>

      <h3>
        {lang === "ro"
          ? "Raționalizarea portalurilor existente"
          : "Rationalising the existing portals"}
      </h3>
      <p className="muted note">
        <T
          text={
            lang === "ro"
              ? "Inventarul de azi și destinația fiecărui sistem. Principiu director: „wrap, don't rewrite” — niciun sistem legacy nu se rescrie; fiecare primește un conector și devine sursă autentică în spatele backbone-ului. HUB MAI demonstrează că modelul funcționează deja la scară de minister."
              : "Today's inventory and each system's destination. Governing principle: “wrap, don't rewrite” — no legacy system is rewritten; each gets a connector and becomes an authentic source behind the backbone. HUB MAI proves the model already works at ministry scale."
          }
        />
      </p>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Sector" : "Sector"}</th>
              <th>{lang === "ro" ? "Servicii existente" : "Existing services"}</th>
              <th>{lang === "ro" ? "Operator" : "Operator"}</th>
              <th>{lang === "ro" ? "Notă" : "Note"}</th>
            </tr>
          </thead>
          <tbody>
            {INVENTORY.map((r) => (
              <tr key={pick(r.sector, "ro")}>
                <td className="dim"><T text={pick(r.sector, lang)} /></td>
                <td><T text={pick(r.services, lang)} /></td>
                <td><T text={pick(r.operator, lang)} /></td>
                <td><T text={pick(r.note, lang)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Acțiune" : "Action"}</th>
              <th>{lang === "ro" ? "Sisteme" : "Systems"}</th>
              <th>{lang === "ro" ? "Destinație" : "Destination"}</th>
            </tr>
          </thead>
          <tbody>
            {CONSOLIDATION.map((r) => (
              <tr key={pick(r.action, "ro")}>
                <td className="dim"><T text={pick(r.action, lang)} /></td>
                <td><T text={pick(r.systems, lang)} /></td>
                <td><T text={pick(r.destination, lang)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Fază" : "Phase"}</th>
              <th>{lang === "ro" ? "Perioadă" : "Period"}</th>
              <th>{lang === "ro" ? "Acțiuni" : "Actions"}</th>
            </tr>
          </thead>
          <tbody>
            {CUTOVER.map((c) => (
              <tr key={pick(c.phase, "ro")}>
                <td className="dim"><T text={pick(c.phase, lang)} /></td>
                <td><T text={pick(c.period, lang)} /></td>
                <td><T text={pick(c.actions, lang)} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pillars" style={{ marginTop: 12 }}>
        <section className="pillar">
          <h4>{lang === "ro" ? "Patru reguli de guvernanță" : "Four governance rules"}</h4>
          <ul>
            {GOV_RULES.map((r, i) => (
              <li key={i}><T text={pick(r, lang)} /></li>
            ))}
          </ul>
        </section>
        <section className="pillar">
          <h4>{lang === "ro" ? "KPI țintă 2028" : "2028 target KPIs"}</h4>
          <ul>
            {KPIS.map((k, i) => (
              <li key={i}><T text={pick(k, lang)} /></li>
            ))}
          </ul>
        </section>
      </div>

      <p className="muted note">
        {lang === "ro" ? (
          <>
            Sinteza include propunerea de „sistem de operare suveran” pentru administrația publică
            (Fedora Silverblue, WireGuard, FreeIPA, Matrix, Nextcloud, ONLYOFFICE —{" "}
            <a
              href="https://danieltamas.com/blog/arhitectura-suverana"
              target="_blank"
              rel="noreferrer"
            >
              danieltamas.com/blog/arhitectura-suverana
            </a>
            ) ca straturi L0–L1: partea „instituțională” a aceleiași doctrine — nimic nu depinde
            de un singur furnizor, un singur DC sau un singur minister, iar cetățeanul și
            funcționarul continuă să lucreze când rețeaua cade. Cifrele sunt estimări de design,
            nu documente oficiale.
          </>
        ) : (
          <>
            The synthesis includes the “sovereign operating system” proposal for public
            administration (Fedora Silverblue, WireGuard, FreeIPA, Matrix, Nextcloud, ONLYOFFICE —{" "}
            <a
              href="https://danieltamas.com/blog/arhitectura-suverana"
              target="_blank"
              rel="noreferrer"
            >
              danieltamas.com/blog/arhitectura-suverana
            </a>
            ) as layers L0–L1: the “institutional” half of the same doctrine — nothing depends on
            a single vendor, a single DC or a single ministry, and the citizen and the clerk both
            keep working when the network dies. Figures are design estimates, not official
            documents.
          </>
        )}
      </p>
    </div>
  );
}
