import { SOURCES } from "../data/sources";
import { pick, useLang } from "../i18n";

export function SourcesView() {
  const { lang } = useLang();
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>{lang === "ro" ? "Surse și proveniență" : "Sources and provenance"}</h2>
      </div>
      <p className="muted note">
        {lang === "ro" ? (
          <>
            Tot ce e marcat „actual” în atlas provine din sursele de mai jos; tot ce e marcat
            „propus” este argument de design. Urmăriți linkurile și contestați-ne datele — fiecare
            rând are proveniență.
          </>
        ) : (
          <>
            Everything marked “current” in the atlas comes from the sources below; everything
            marked “proposed” is a design argument. Follow the links and dispute our data — every
            row has provenance.
          </>
        )}
      </p>
      <div className="sources">
        {SOURCES.map((s, i) => (
          <div key={i} className="source-card">
            <div className="source-kind">{pick(s.kind, lang)}</div>
            <p>{pick(s.claim, lang)}</p>
            {s.note && <p className="muted source-note">{pick(s.note, lang)}</p>}
            {s.url && (
              <a href={s.url} target="_blank" rel="noreferrer">
                {s.url.replace(/^https?:\/\//, "")}
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
