import { COSTS, LAYERS, PILLARS, PORTALS } from "../data/strategy";
import { pick, useLang } from "../i18n";

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
                <span className="layer-name">{pick(l.name, lang)}</span>
              </td>
              <td>{pick(l.what, lang)}</td>
              <td>{pick(l.owner, lang)}</td>
              <td>
                <span className={`verdict ${STATUS_CLASS[l.status]}`}>
                  {pick(STATUS_LABEL[l.status], lang)}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>{lang === "ro" ? "Cei cinci piloni" : "The five pillars"}</h3>
      <div className="pillars">
        {PILLARS.map((p) => (
          <section key={pick(p.title, "ro")} className="pillar">
            <h4>{pick(p.title, lang)}</h4>
            <ul>
              {p.items.map((it, i) => (
                <li key={i}>{pick(it, lang)}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <h3>
        {lang === "ro"
          ? "Resurse & costuri (estimare pe 5 ani)"
          : "Resources & costs (5-year estimate)"}
      </h3>
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
            <tr key={c.estimate}>
              <td className="dim">{pick(c.item, lang)}</td>
              <td>
                <strong>{c.estimate}</strong>
              </td>
              <td>{pick(c.notes, lang)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3>
        {lang === "ro"
          ? "Portalurile orientate către exterior (12)"
          : "The outward-facing portals (12)"}
      </h3>
      <div className="portals">
        {PORTALS.map((p) => (
          <div key={p.id} className="portal-card">
            <strong>{pick(p.name, lang)}</strong>
            <p>{pick(p.what, lang)}</p>
          </div>
        ))}
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
