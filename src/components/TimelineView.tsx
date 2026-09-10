import { TIMELINE } from "../data/timeline";

export function TimelineView() {
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Calendar: obligații UE vs. planul național vs. propunerea noastră</h2>
      </div>
      <div className="timeline">
        {TIMELINE.map((ev, i) => (
          <div key={i} className={`tl-item ${ev.owner}`}>
            <div className="tl-date">{ev.date}</div>
            <div className="tl-body">
              <strong>{ev.title}</strong>
              <p>{ev.detail}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="legend">
        <span className="legend-chip" style={{ borderColor: "#7b5cff" }}>
          <span className="dot" style={{ background: "#7b5cff" }} />
          Obligații UE
        </span>
        <span className="legend-chip" style={{ borderColor: "#4f8cff" }}>
          <span className="dot" style={{ background: "#4f8cff" }} />
          Plan național / MAI
        </span>
        <span className="legend-chip" style={{ borderColor: "#2ecc71" }}>
          <span className="dot" style={{ background: "#2ecc71" }} />
          Propunerea noastră
        </span>
      </div>
    </div>
  );
}
