import { TIMELINE } from "../data/timeline";
import { pick, useLang } from "../i18n";
import { T } from "./T";

export function TimelineView() {
  const { lang } = useLang();
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>
          {lang === "ro"
            ? "Calendar: obligații UE vs. planul național vs. propunerea noastră"
            : "Calendar: EU obligations vs. national plan vs. our proposal"}
        </h2>
      </div>
      <div className="timeline">
        {TIMELINE.map((ev, i) => (
          <div key={i} className={`tl-item ${ev.owner}`}>
            <div className="tl-date">{ev.date}</div>
            <div className="tl-body">
              <strong><T text={pick(ev.title, lang)} /></strong>
              <p><T text={pick(ev.detail, lang)} /></p>
            </div>
          </div>
        ))}
      </div>
      <div className="legend">
        <span className="legend-chip" style={{ borderColor: "#7b5cff" }}>
          <span className="dot" style={{ background: "#7b5cff" }} />
          {lang === "ro" ? "Obligații UE" : "EU obligations"}
        </span>
        <span className="legend-chip" style={{ borderColor: "#4f8cff" }}>
          <span className="dot" style={{ background: "#4f8cff" }} />
          {lang === "ro" ? "Plan național / MAI" : "National plan / MAI"}
        </span>
        <span className="legend-chip" style={{ borderColor: "#2ecc71" }}>
          <span className="dot" style={{ background: "#2ecc71" }} />
          {lang === "ro" ? "Propunerea noastră" : "Our proposal"}
        </span>
      </div>
    </div>
  );
}
