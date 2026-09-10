import { COSTS, LAYERS, PILLARS, PORTALS } from "../data/strategy";

const STATUS_LABEL: Record<string, string> = {
  "in-flight": "În curs",
  proposal: "Propunere",
  partial: "Parțial",
};

const STATUS_CLASS: Record<string, string> = {
  "in-flight": "v-aligned",
  proposal: "v-added",
  partial: "v-extended",
};

export function StrategyView() {
  return (
    <div className="panel strategy">
      <div className="panel-head">
        <h2>Strategia completă — de la stația de lucru la plăți</h2>
      </div>

      <h3>Arhitectura pe 7 straturi</h3>
      <table className="compare-table layer-table">
        <thead>
          <tr>
            <th>Strat</th>
            <th>Conținut</th>
            <th>Responsabil</th>
            <th>Stare</th>
          </tr>
        </thead>
        <tbody>
          {LAYERS.map((l) => (
            <tr key={l.id}>
              <td className="dim">
                {l.id}
                <br />
                <span className="layer-name">{l.name}</span>
              </td>
              <td>{l.what}</td>
              <td>{l.owner}</td>
              <td>
                <span className={`verdict ${STATUS_CLASS[l.status]}`}>
                  {STATUS_LABEL[l.status]}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Cei patru piloni</h3>
      <div className="pillars">
        {PILLARS.map((p) => (
          <section key={p.title} className="pillar">
            <h4>{p.title}</h4>
            <ul>
              {p.items.map((it, i) => (
                <li key={i}>{it}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <h3>Resurse & costuri (estimare pe 5 ani)</h3>
      <table className="compare-table">
        <thead>
          <tr>
            <th>Element</th>
            <th>Estimare</th>
            <th>Notă</th>
          </tr>
        </thead>
        <tbody>
          {COSTS.map((c) => (
            <tr key={c.item}>
              <td className="dim">{c.item}</td>
              <td>
                <strong>{c.estimate}</strong>
              </td>
              <td>{c.notes}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>Portalurile orientate către exterior (12)</h3>
      <div className="portals">
        {PORTALS.map((p) => (
          <div key={p.id} className="portal-card">
            <strong>{p.name}</strong>
            <p>{p.what}</p>
          </div>
        ))}
      </div>

      <p className="muted note">
        Sinteza include propunerea de „sistem de operare suveran” pentru administrația publică
        (Fedora Silverblue, WireGuard, FreeIPA, Matrix, Nextcloud, ONLYOFFICE —{" "}
        <a href="https://danieltamas.com/blog/arhitectura-suverana" target="_blank" rel="noreferrer">
          danieltamas.com/blog/arhitectura-suverana
        </a>
        ) ca straturi L0–L1: partea „instituțională” a aceleiași doctrine — nimic nu depinde de un
        singur furnizor, un singur DC sau un singur minister, iar cetățeanul și funcționarul
        continuă să lucreze când rețeaua cade. Cifrele sunt estimări de design, nu documente
        oficiale.
      </p>
    </div>
  );
}
