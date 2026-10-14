import { useT } from "../i18n";
import type { MessageKey } from "../locales";
import { INSTITUTIONS } from "../data/institutions";
import { COMPARISON } from "../data/comparison";
import { FLOWS } from "../data/flows";
import { T } from "./T";
import { Prov } from "./Prov";

export type ViewId =
  | "summary"
  | "stories"
  | "map"
  | "flows"
  | "compare"
  | "policy"
  | "timeline"
  | "journeys"
  | "strategy"
  | "resilience"
  | "sources";

const GAPS: MessageKey[] = [
  "summary.gapExchange",
  "summary.gapPayments",
  "summary.gapPostbox",
  "summary.gapResilience",
  "summary.gapTransparency",
];

const COUNTS = [
  {
    key: "summary.countInstitutions",
    value: INSTITUTIONS.length,
    view: "map",
  },
  {
    key: "summary.countDimensions",
    value: COMPARISON.length,
    view: "compare",
  },
  {
    key: "summary.countNewFlows",
    value: FLOWS.filter((f) => f.status === "proposed").length,
    view: "flows",
  },
] as const;

export function SummaryView({
  onNavigate,
}: {
  onNavigate: (v: ViewId) => void;
}) {
  const t = useT();
  return (
    <div className="panel summary">
      <div className="summary-hero">
        <h2>{t("summary.digitalRomaniaIn30")}</h2>
        <span
          className="legend-chip badge-proposal"
          style={{ borderColor: "#2ecc71" }}
        >
          {t("summary.badgeProposal")}
        </span>
        <p className="summary-sub">
          <T text={t("summary.weProposeTheState")} />
        </p>
        <Prov />
      </div>
      <div className="summary-cards">
        <section className="summary-card today">
          <h3>{t("summary.whatHappensToday")}</h3>
          <ul>
            <li>
              <T text={t("summary.roWalletEudiPid")} />
            </li>
            <li>
              <T text={t("summary.stsRegistryWhoMay")} />
            </li>
            <li>{t("summary.fromDec2027Banks")}</li>
          </ul>
        </section>
        <section className="summary-card proposal">
          <h3>{t("summary.whatWeProposeOn")}</h3>
          <ul>
            {GAPS.map((key) => (
              <li key={key}>
                <T text={t(key)} />
              </li>
            ))}
          </ul>
          <p className="muted">{t("summary.estimatedCost23")}</p>
        </section>
        <section className="summary-card why">
          <h3>{t("summary.whyItMatters")}</h3>
          <ul>
            <li>{t("summary.youDecideWhatData")}</li>
            <li>{t("summary.itKeepsWorkingWhen")}</li>
            <li>{t("summary.openVerifiableCodeBuilds")}</li>
          </ul>
        </section>
      </div>
      {/* Counts are computed from the data, never typed (design screen 01). */}
      <div className="summary-cta summary-counts">
        {COUNTS.map((c) => (
          <button
            key={c.view}
            className="cta secondary"
            data-count={c.value}
            onClick={() => onNavigate(c.view)}
          >
            {t(c.key).replace("{count}", String(c.value))}
          </button>
        ))}
      </div>
      <div className="summary-cta">
        <button className="cta" onClick={() => onNavigate("stories")}>
          {t("summary.seeTheCitizensStories")}
        </button>
        <button className="cta secondary" onClick={() => onNavigate("compare")}>
          {t("summary.seeTheFullComparison")}
        </button>
        <button className="cta secondary" onClick={() => onNavigate("flows")}>
          {t("summary.exploreTheFlows")}
        </button>
      </div>
    </div>
  );
}
