import { TIMELINE } from "../data/timeline";
import { pick, useLang, useT } from "../i18n";
import { T } from "./T";
import { Prov } from "./Prov";

export function TimelineView() {
  const { lang } = useLang();
  const t = useT();
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>{t("timeline.title")}</h2>
      </div>
      <Prov />
      <div className="timeline">
        {TIMELINE.map((ev, i) => (
          <div key={i} className={`tl-item ${ev.owner}`}>
            <div className="tl-date">{ev.date}</div>
            <div className="tl-body">
              <strong>
                <T text={pick(ev.title, lang)} />
              </strong>
              <p>
                <T text={pick(ev.detail, lang)} />
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="legend">
        <span className="legend-chip" style={{ borderColor: "#7b5cff" }}>
          <span className="dot" style={{ background: "#7b5cff" }} />
          {t("timeline.euObligations")}
        </span>
        <span className="legend-chip" style={{ borderColor: "#4f8cff" }}>
          <span className="dot" style={{ background: "#4f8cff" }} />
          {t("timeline.nationalPlan")}
        </span>
        <span className="legend-chip" style={{ borderColor: "#2ecc71" }}>
          <span className="dot" style={{ background: "#2ecc71" }} />
          {t("timeline.ourProposal")}
        </span>
      </div>
    </div>
  );
}
