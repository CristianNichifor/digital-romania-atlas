import { SOURCES } from "../data/sources";
import { META } from "../data/meta";
import { pick, useLang, useT } from "../i18n";
import { downloadPressCsv, downloadPressJson } from "../lib/export";
import { T } from "./T";

export function SourcesView() {
  const { lang } = useLang();
  const t = useT();
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>{t("sources.title")}</h2>
      </div>
      <p className="muted note">
        {t("sources.intro.before")}{" "}
        <a
          href={`${META.issues}/new?template=correction.yml`}
          target="_blank"
          rel="noreferrer"
        >
          {t("sources.intro.link")}
        </a>{" "}
        {t("sources.intro.after")}
      </p>
      <div className="press-kit">
        <span className="press-kit-label">{t("sources.pressKit")}</span>
        <button className="ghost small" onClick={downloadPressJson}>
          {t("sources.downloadJson")}
        </button>
        <button className="ghost small" onClick={downloadPressCsv}>
          {t("sources.downloadCsv")}
        </button>
      </div>
      <div className="sources">
        {SOURCES.map((s, i) => (
          <div key={i} className="source-card">
            <div className="source-kind">
              <T text={pick(s.kind, lang)} />
            </div>
            <p>
              <T text={pick(s.claim, lang)} />
            </p>
            {s.note && (
              <p className="muted source-note">
                <T text={pick(s.note, lang)} />
              </p>
            )}
            {s.accessed && (
              <p className="muted source-note">
                {t("sources.accessed")} {s.accessed}
              </p>
            )}
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
