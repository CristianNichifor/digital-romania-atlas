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
import { pick, useLang, type Bi, useT } from "../i18n";
import { T } from "./T";
import {
  UatPlanNote,
  uatMiniTotal,
  uatRollout,
  useUatPlan,
} from "../lib/uatPlan";
import { Prov } from "./Prov";

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
  const t = useT();
  const { plan, fill, fmtUnits } = useUatPlan();
  const tt = (b: Bi) => fill(pick(b, lang));
  return (
    <div className="panel strategy">
      <div className="panel-head">
        <h2>{t("strategy.theFullStrategyFrom")}</h2>
      </div>
      <Prov />

      <h3>{t("strategy.the7LayerArchitecture")}</h3>
      <div className="table-scroll">
        <table className="compare-table layer-table">
          <thead>
            <tr>
              <th>{t("strategy.layer")}</th>
              <th>{t("strategy.contents")}</th>
              <th>{t("strategy.owner")}</th>
              <th>{t("strategy.status")}</th>
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

      <h3>{t("strategy.theIdentityLifecycleLosing")}</h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t("strategy.event")}</th>
              <th>{t("strategy.whatTheCitizenDoes")}</th>
              <th>{t("strategy.whatTheSystemDoes")}</th>
              <th>{t("strategy.target")}</th>
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

      <h3>{t("strategy.theSixPillars")}</h3>
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

      <h3>{t("strategy.redundancyByServiceClass")}</h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t("strategy.class")}</th>
              <th>{t("strategy.examples")}</th>
              <th>{t("strategy.target")}</th>
              <th>{t("strategy.mechanism")}</th>
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

      <h3>{t("strategy.resourcesCosts5Year")}</h3>
      <UatPlanNote />
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t("strategy.item")}</th>
              <th>{t("strategy.estimate")}</th>
              <th>{t("strategy.note")}</th>
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

      <h3>{t("strategy.machinesEquipmentRequired")}</h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t("strategy.item")}</th>
              <th>{t("strategy.quantity")}</th>
              <th>{t("strategy.unitCost")}</th>
              <th>{t("strategy.total")}</th>
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

      <h3>{t("strategy.humanResourcesHowThe")}</h3>
      <p className="muted note">
        <T text={t("strategy.principleLocalTalentFirst")} />
      </p>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t("strategy.team")}</th>
              <th>{t("strategy.layer")}</th>
              <th>{t("strategy.fte")}</th>
              <th>{t("strategy.roles")}</th>
              <th>{t("strategy.note")}</th>
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

      <h3>{t("strategy.humanResourcesPerInstitution")}</h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t("strategy.institution")}</th>
              <th>{t("strategy.fte")}</th>
              <th>{t("strategy.focus")}</th>
              <th>{t("strategy.payNote")}</th>
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

      <h3>{t("strategy.payLevelsRomanianMarket")}</h3>
      <p className="muted note">
        <T text={t("strategy.annualGrossToEmployer")} />
      </p>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t("strategy.role")}</th>
              <th>{t("strategy.romaniaTotalCost")}</th>
              <th>{t("strategy.euInternationalRemote")}</th>
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

      <h3>{t("strategy.estimatedSavings")}</h3>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t("strategy.category")}</th>
              <th>{t("strategy.value")}</th>
              <th>{t("strategy.basis")}</th>
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

      <h3>{t("strategy.theOutwardFacingPortals")}</h3>
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

      <h3>{t("strategy.rationalisingTheExistingPortals")}</h3>
      <p className="muted note">
        <T text={t("strategy.todaySInventoryAnd")} />
      </p>
      <div className="table-scroll">
        <table className="compare-table">
          <thead>
            <tr>
              <th>{t("strategy.sector")}</th>
              <th>{t("strategy.existingServices")}</th>
              <th>{t("strategy.operator")}</th>
              <th>{t("strategy.note")}</th>
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
              <th>{t("strategy.action")}</th>
              <th>{t("strategy.systems")}</th>
              <th>{t("strategy.destination")}</th>
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
              <th>{t("strategy.phase")}</th>
              <th>{t("strategy.period")}</th>
              <th>{t("strategy.actions")}</th>
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
          <h4>{t("strategy.fourGovernanceRules")}</h4>
          <ul>
            {GOV_RULES.map((r, i) => (
              <li key={i}>
                <T text={tt(r)} />
              </li>
            ))}
          </ul>
        </section>
        <section className="pillar">
          <h4>{t("strategy.2028TargetKpis")}</h4>
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
        <>
          {t("strategy.sovereignOs.before")}{" "}
          <a
            href="https://danieltamas.com/blog/arhitectura-suverana"
            target="_blank"
            rel="noreferrer"
          >
            danieltamas.com/blog/arhitectura-suverana
          </a>
          {t("strategy.sovereignOs.after")}
        </>
      </p>
    </div>
  );
}
