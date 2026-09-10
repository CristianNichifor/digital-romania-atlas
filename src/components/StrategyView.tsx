import {
  CONSOLIDATION,
  COSTS,
  CUTOVER,
  GOV_RULES,
  IDENTITY_LIFECYCLE,
  INVENTORY,
  KPIS,
  LAYERS,
  MACHINES,
  PILLARS,
  PORTALS,
  REDUNDANCY_TIERS,
  SAVINGS,
} from "../data/strategy";
import { HR_INSTITUTIONS, HR_PAYROLL, HR_TEAMS, PAY_ROWS } from "../data/hr";
import { pick, useLang, type Bi } from "../i18n";
import { T } from "./T";
import {
  UatPlanNote,
  uatMiniTotal,
  uatRollout,
  useUatPlan,
} from "../lib/uatPlan";

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
  const { plan, fill, fmtUnits } = useUatPlan();
  const tt = (b: Bi) => fill(pick(b, lang));
  return (
    <div className="panel strategy">
      <div className="panel-head">
        <h2>
          {lang === "ro"
            ? "Strategia completă — de la stația de lucru la plăți"
            : "The full strategy — from the workstation to payments"}
        </h2>
      </div>

      <h3>
        {lang === "ro"
          ? "Arhitectura pe 7 straturi"
          : "The 7-layer architecture"}
      </h3>
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
                  <span className="layer-name">
                    <T text={tt(l.name)} />
                  </span>
                </td>
                <td>
                  <T text={tt(l.what)} />
                </td>
                <td>
                  <T text={tt(l.owner)} />
                </td>
                <td>
                  <span className={`verdict ${STATUS_CLASS[l.status]}`}>
                    {tt(STATUS_LABEL[l.status])}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>
        {lang === "ro"
          ? "Ciclul de viață al identității — pierderea telefonului planificată"
          : "The identity lifecycle — losing the phone, planned for"}
      </h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Eveniment" : "Event"}</th>
              <th>
                {lang === "ro" ? "Ce face cetățeanul" : "What the citizen does"}
              </th>
              <th>
                {lang === "ro" ? "Ce face sistemul" : "What the system does"}
              </th>
              <th>{lang === "ro" ? "Țintă" : "Target"}</th>
            </tr>
          </thead>
          <tbody>
            {IDENTITY_LIFECYCLE.map((r) => (
              <tr key={tt(r.event)}>
                <td className="dim">
                  <T text={tt(r.event)} />
                </td>
                <td>
                  <T text={tt(r.citizen)} />
                </td>
                <td>
                  <T text={tt(r.system)} />
                </td>
                <td>
                  <strong>
                    <T text={tt(r.target)} />
                  </strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>{lang === "ro" ? "Cei șase piloni" : "The six pillars"}</h3>
      <div className="pillars">
        {PILLARS.map((p) => (
          <section key={tt(p.title)} className="pillar">
            <h4>
              <T text={tt(p.title)} />
            </h4>
            <ul>
              {p.items.map((it, i) => (
                <li key={i}>
                  <T text={tt(it)} />
                </li>
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
                  {t.tier} — <T text={tt(t.name)} />
                </td>
                <td>
                  <T text={tt(t.examples)} />
                </td>
                <td>
                  <strong>{String(t.target)}</strong>
                </td>
                <td>
                  <T text={tt(t.mechanism)} />
                </td>
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
      <UatPlanNote />
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
              <tr key={tt(c.item)}>
                <td className="dim">
                  <T text={tt(c.item)} />
                </td>
                <td>
                  <strong>
                    {c.dynamic === "uat-rollout"
                      ? uatRollout(plan)
                      : c.estimate}
                  </strong>
                </td>
                <td>
                  <T text={tt(c.notes)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>
        {lang === "ro"
          ? "Mașini & echipamente necesare"
          : "Machines & equipment required"}
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
              <tr key={tt(m.item)}>
                <td className="dim">
                  <T text={tt(m.item)} />
                </td>
                <td>
                  {m.dynamic === "uat-mini"
                    ? `≈${fmtUnits(plan.units)}`
                    : m.quantity}
                </td>
                <td>{m.unitCost}</td>
                <td>
                  <strong>
                    {m.dynamic === "uat-mini" ? uatMiniTotal(plan) : m.total}
                  </strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>
        {lang === "ro"
          ? "Resurse umane — cum arată echipele"
          : "Human resources — how the teams look"}
      </h3>
      <p className="muted note">
        <T
          text={
            lang === "ro"
              ? "Principiu: talent local în primul rând, top-up de 10–20% pentru competențe rare (crypto, securitate) și o agenție digitală cu grilă proprie, care scapă de plafoanele de salarizare bugetară. Fiecare echipă este mică, dedicată unui strat, cu on-call și responsabilitate de capăt la capăt."
              : "Principle: local talent first, a 10–20% top-up for rare skills (crypto, security) and a digital agency with its own pay grid that escapes public-sector pay caps. Each team is small, dedicated to one layer, with on-call and end-to-end ownership."
          }
        />
      </p>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Echipă" : "Team"}</th>
              <th>{lang === "ro" ? "Strat" : "Layer"}</th>
              <th>{lang === "ro" ? "FTE" : "FTE"}</th>
              <th>{lang === "ro" ? "Roluri" : "Roles"}</th>
              <th>{lang === "ro" ? "Notă" : "Note"}</th>
            </tr>
          </thead>
          <tbody>
            {HR_TEAMS.map((t) => (
              <tr key={t.key}>
                <td className="dim">
                  <T text={tt(t.team)} />
                </td>
                <td>
                  <T text={tt(t.layer)} />
                </td>
                <td>
                  <strong>{t.fte}</strong>
                </td>
                <td>
                  <T text={tt(t.roles)} />
                </td>
                <td>
                  <T text={tt(t.notes)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>
        {lang === "ro"
          ? "Resurse umane — pe instituție"
          : "Human resources — per institution"}
      </h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Instituție" : "Institution"}</th>
              <th>{lang === "ro" ? "FTE" : "FTE"}</th>
              <th>{lang === "ro" ? "Focus" : "Focus"}</th>
              <th>{lang === "ro" ? "Notă salarizare" : "Pay note"}</th>
            </tr>
          </thead>
          <tbody>
            {HR_INSTITUTIONS.map((h) => (
              <tr key={h.key}>
                <td className="dim">
                  <T text={tt(h.institution)} />
                </td>
                <td>
                  <strong>{h.fte}</strong>
                </td>
                <td>
                  <T text={tt(h.focus)} />
                </td>
                <td>
                  <T text={tt(h.pay)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>
        {lang === "ro"
          ? "Niveluri salariale: piața românească vs. remote internațional"
          : "Pay levels: Romanian market vs. international remote"}
      </h3>
      <p className="muted note">
        <T
          text={
            lang === "ro"
              ? "Cifre anuale brute angajator (cost total, inclusiv contribuții), în k€. Benzile RO reflectă piața privată românească din 2026; benzile EU sunt pentru aceleași roluri lucrate remote din România pentru angajatori externi — competiția directă a statului."
              : "Annual gross-to-employer figures (total cost, contributions included), in k€. RO bands reflect the 2026 Romanian private market; EU bands are the same roles working remotely from Romania for foreign employers — the state's direct competition."
          }
        />
      </p>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{lang === "ro" ? "Rol" : "Role"}</th>
              <th>
                {lang === "ro"
                  ? "România (brut angajator)"
                  : "Romania (total cost)"}
              </th>
              <th>
                {lang === "ro"
                  ? "Remote UE / internațional"
                  : "EU / international remote"}
              </th>
            </tr>
          </thead>
          <tbody>
            {PAY_ROWS.map((p) => (
              <tr key={p.key}>
                <td className="dim">
                  <T text={tt(p.role)} />
                </td>
                <td>
                  <strong>{p.roBand}</strong> /an
                </td>
                <td>
                  <strong>{p.euBand}</strong> /an
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted note">
        <T text={tt(HR_PAYROLL)} />
      </p>

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
              <tr key={tt(s.item)}>
                <td className="dim">
                  <T text={tt(s.item)} />
                </td>
                <td>
                  <strong>{s.estimate}</strong>
                </td>
                <td>
                  <T text={tt(s.basis)} />
                </td>
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
            <strong>
              <T text={tt(p.name)} />
            </strong>
            <p>
              <T text={tt(p.what)} />
            </p>
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
              <th>
                {lang === "ro" ? "Servicii existente" : "Existing services"}
              </th>
              <th>{lang === "ro" ? "Operator" : "Operator"}</th>
              <th>{lang === "ro" ? "Notă" : "Note"}</th>
            </tr>
          </thead>
          <tbody>
            {INVENTORY.map((r) => (
              <tr key={tt(r.sector)}>
                <td className="dim">
                  <T text={tt(r.sector)} />
                </td>
                <td>
                  <T text={tt(r.services)} />
                </td>
                <td>
                  <T text={tt(r.operator)} />
                </td>
                <td>
                  <T text={tt(r.note)} />
                </td>
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
              <tr key={tt(r.action)}>
                <td className="dim">
                  <T text={tt(r.action)} />
                </td>
                <td>
                  <T text={tt(r.systems)} />
                </td>
                <td>
                  <T text={tt(r.destination)} />
                </td>
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
              <tr key={tt(c.phase)}>
                <td className="dim">
                  <T text={tt(c.phase)} />
                </td>
                <td>
                  <T text={tt(c.period)} />
                </td>
                <td>
                  <T text={tt(c.actions)} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pillars" style={{ marginTop: 12 }}>
        <section className="pillar">
          <h4>
            {lang === "ro"
              ? "Patru reguli de guvernanță"
              : "Four governance rules"}
          </h4>
          <ul>
            {GOV_RULES.map((r, i) => (
              <li key={i}>
                <T text={tt(r)} />
              </li>
            ))}
          </ul>
        </section>
        <section className="pillar">
          <h4>{lang === "ro" ? "KPI țintă 2028" : "2028 target KPIs"}</h4>
          <ul>
            {KPIS.map((k, i) => (
              <li key={i}>
                <T text={tt(k)} />
              </li>
            ))}
          </ul>
        </section>
      </div>

      <p className="muted note">
        {lang === "ro" ? (
          <>
            Sinteza include propunerea de „sistem de operare suveran” pentru
            administrația publică (Fedora Silverblue, WireGuard, FreeIPA,
            Matrix, Nextcloud, ONLYOFFICE —{" "}
            <a
              href="https://danieltamas.com/blog/arhitectura-suverana"
              target="_blank"
              rel="noreferrer"
            >
              danieltamas.com/blog/arhitectura-suverana
            </a>
            ) ca straturi L0–L1: partea „instituțională” a aceleiași doctrine —
            nimic nu depinde de un singur furnizor, un singur DC sau un singur
            minister, iar cetățeanul și funcționarul continuă să lucreze când
            rețeaua cade. Cifrele sunt estimări de design, nu documente
            oficiale.
          </>
        ) : (
          <>
            The synthesis includes the “sovereign operating system” proposal for
            public administration (Fedora Silverblue, WireGuard, FreeIPA,
            Matrix, Nextcloud, ONLYOFFICE —{" "}
            <a
              href="https://danieltamas.com/blog/arhitectura-suverana"
              target="_blank"
              rel="noreferrer"
            >
              danieltamas.com/blog/arhitectura-suverana
            </a>
            ) as layers L0–L1: the “institutional” half of the same doctrine —
            nothing depends on a single vendor, a single DC or a single
            ministry, and the citizen and the clerk both keep working when the
            network dies. Figures are design estimates, not official documents.
          </>
        )}
      </p>
    </div>
  );
}
