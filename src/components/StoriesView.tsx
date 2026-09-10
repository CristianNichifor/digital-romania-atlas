import { STORIES } from "../data/stories";
import { FLOW_COLORS } from "../data/flows";
import { INSTITUTIONS } from "../data/institutions";
import { pick, useLang } from "../i18n";

function acronym(id: string) {
  return INSTITUTIONS.find((i) => i.id === id)?.acronym ?? id;
}

export function StoriesView() {
  const { lang } = useLang();
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>
          {lang === "ro"
            ? "Cinci povești de cetățean — azi vs. propunere"
            : "Five citizen stories — today vs. proposal"}
        </h2>
      </div>
      <div className="stories">
        {STORIES.map((s) => (
          <article key={s.id} className="story">
            <div className="story-head">
              <h3>{pick(s.title, lang)}</h3>
              <span className="persona">{pick(s.persona, lang)}</span>
            </div>
            <div className="story-cols">
              <div className="story-col today-col">
                <h4>{lang === "ro" ? "Azi" : "Today"}</h4>
                <p>{pick(s.today, lang)}</p>
              </div>
              <div className="story-col proposed-col">
                <h4>{lang === "ro" ? "Cu propunerea" : "With the proposal"}</h4>
                <p>{pick(s.proposed, lang)}</p>
              </div>
            </div>
            <div className="story-steps">
              {s.steps.map((st, i) => (
                <div key={i} className="step">
                  <span className="step-node" style={{ borderColor: FLOW_COLORS[st.kind] }}>
                    {acronym(st.from)}
                  </span>
                  <span className="step-arrow" style={{ color: FLOW_COLORS[st.kind] }}>
                    →
                  </span>
                  <span className="step-node" style={{ borderColor: FLOW_COLORS[st.kind] }}>
                    {acronym(st.to)}
                  </span>
                  <span className="step-label">{pick(st.label, lang)}</span>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
