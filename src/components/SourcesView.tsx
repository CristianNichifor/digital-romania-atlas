import { SOURCES } from "../data/sources";
import { META } from "../data/meta";
import { pick, useLang } from "../i18n";
import { downloadPressCsv, downloadPressJson } from "../lib/export";
import { T } from "./T";

export function SourcesView() {
  const { lang } = useLang();
  return (
    <div className="panel">
      <div className="panel-head">
        <h2>
          {lang === "ro" ? "Surse și proveniență" : "Sources and provenance"}
        </h2>
      </div>
      <p className="muted note">
        {lang === "ro" ? (
          <>
            Tot ce e marcat „actual” în atlas provine din sursele de mai jos;
            tot ce e marcat „propus” este argument de design. Urmăriți linkurile
            și contestați-ne datele — fiecare rând are proveniență. Găsiți o
            eroare?{" "}
            <a
              href={`${META.issues}/new?template=correction.yml`}
              target="_blank"
              rel="noreferrer"
            >
              Trimiteți o corectură
            </a>{" "}
            — fiecare corectură acceptată apare public în ERRATA.
          </>
        ) : (
          <>
            Everything marked “current” in the atlas comes from the sources
            below; everything marked “proposed” is a design argument. Follow the
            links and dispute our data — every row has provenance. Found an
            error?{" "}
            <a
              href={`${META.issues}/new?template=correction.yml`}
              target="_blank"
              rel="noreferrer"
            >
              File a correction
            </a>{" "}
            — every accepted correction is logged publicly in ERRATA.
          </>
        )}
      </p>
      <div className="press-kit">
        <span className="press-kit-label">
          {lang === "ro" ? "Kit de presă" : "Press kit"}
        </span>
        <button className="ghost small" onClick={downloadPressJson}>
          {lang === "ro"
            ? "Descarcă JSON (date complete)"
            : "Download JSON (full data)"}
        </button>
        <button className="ghost small" onClick={downloadPressCsv}>
          {lang === "ro"
            ? "Descarcă CSV (tabel plat)"
            : "Download CSV (flat table)"}
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
