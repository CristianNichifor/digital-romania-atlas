import { useEffect, useState } from "react";
import { MapView } from "./components/MapView";
import { FlowGraph } from "./components/FlowGraph";
import { CompareView } from "./components/CompareView";
import { PolicyView } from "./components/PolicyView";
import { TimelineView } from "./components/TimelineView";
import { JourneysView } from "./components/JourneysView";
import { StrategyView } from "./components/StrategyView";
import { ResilienceView } from "./components/ResilienceView";
import { SummaryView, type ViewId } from "./components/SummaryView";
import { StoriesView } from "./components/StoriesView";
import { SourcesView } from "./components/SourcesView";
import { LangContext, type Lang } from "./i18n";
import { UatPlanProvider } from "./lib/uatPlan";
import { initAcroTips } from "./lib/acroTip";
import { META } from "./data/meta";
import { readStorage, writeStorage } from "./lib/storage";

const VIEWS: { id: ViewId; ro: string; en: string }[] = [
  { id: "summary", ro: "Rezumat", en: "Summary" },
  { id: "stories", ro: "Povești", en: "Stories" },
  { id: "map", ro: "Harta României", en: "Map of Romania" },
  { id: "flows", ro: "Fluxuri de date", en: "Data flows" },
  { id: "compare", ro: "Comparație", en: "Comparison" },
  { id: "policy", ro: "Analiză", en: "Policy" },
  { id: "timeline", ro: "Calendar", en: "Calendar" },
  { id: "journeys", ro: "Pași cetățean", en: "Citizen journeys" },
  { id: "strategy", ro: "Strategie", en: "Strategy" },
  { id: "resilience", ro: "Reziliență", en: "Resilience" },
  { id: "sources", ro: "Surse", en: "Sources" },
];

function initialLang(): Lang {
  const saved = readStorage("dra-lang");
  return saved === "en" ? "en" : "ro";
}

const VIEW_IDS = new Set<string>(VIEWS.map((v) => v.id));

// Views live in the hash (#/compare) so links are shareable, Back/Forward
// work, and the ?scenario= query string is left untouched.
function viewFromHash(hash: string): ViewId {
  const id = hash.replace(/^#\/?/, "");
  return VIEW_IDS.has(id) ? (id as ViewId) : "summary";
}

const navigate = (v: ViewId) => {
  window.location.hash = `/${v}`;
};

export default function App() {
  const [view, setView] = useState<ViewId>(() =>
    viewFromHash(window.location.hash)
  );

  useEffect(() => {
    const sync = () => setView(viewFromHash(window.location.hash));
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    writeStorage("dra-lang", lang);
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => initAcroTips(), []);

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <UatPlanProvider>
        <div className="app">
          <header>
            <div className="title">
              <span className="logo">DR</span>
              <div>
                <h1>Digital Romania Atlas</h1>
                <p>
                  {lang === "ro"
                    ? "Ecosistemul RO EUDI Wallet vs. propunerea de backbone digital — instituții, fluxuri, comparație"
                    : "The RO EUDI Wallet ecosystem vs. the digital backbone proposal — institutions, flows, comparison"}
                </p>
              </div>
            </div>
            <nav>
              {VIEWS.map((v) => (
                <a
                  key={v.id}
                  href={`#/${v.id}`}
                  aria-current={view === v.id ? "page" : undefined}
                >
                  {lang === "ro" ? v.ro : v.en}
                </a>
              ))}
              <button
                className="lang-toggle"
                onClick={() => setLang(lang === "ro" ? "en" : "ro")}
                aria-label={
                  lang === "ro" ? "EN, switch to English" : "RO, comută în română"
                }
                lang={lang === "ro" ? "en" : "ro"}
              >
                {lang === "ro" ? "EN" : "RO"}
              </button>
            </nav>
          </header>
          <main>
            {view === "summary" && <SummaryView onNavigate={navigate} />}
            {view === "stories" && <StoriesView />}
            {view === "map" && <MapView />}
            {view === "flows" && <FlowGraph />}
            {view === "compare" && <CompareView />}
            {view === "policy" && <PolicyView />}
            {view === "timeline" && <TimelineView />}
            {view === "journeys" && <JourneysView />}
            {view === "strategy" && <StrategyView />}
            {view === "resilience" && <ResilienceView />}
            {view === "sources" && <SourcesView />}
          </main>
          <footer>
            <p>
              {lang === "ro" ? (
                <>
                  Demonstrație open source — datele „actuale” provin din{" "}
                  <code>
                    Ministerul-Afacerilor-Interne/rowallet-documentation
                  </code>{" "}
                  (CC-BY-4.0) și din prezentările publice MAI. Propunerile
                  marcate verde sunt de design, nu documente oficiale.
                </>
              ) : (
                <>
                  Open source demo — the “current” data comes from{" "}
                  <code>
                    Ministerul-Afacerilor-Interne/rowallet-documentation
                  </code>{" "}
                  (CC-BY-4.0) and public MAI presentations. Green-marked
                  proposals are design opinions, not official documents.
                </>
              )}
            </p>
            <p className="footer-meta">
              {lang === "ro" ? (
                <>
                  Autor:{" "}
                  <a href={`mailto:${META.author.email}`}>{META.author.name}</a>
                  {" · "}date actualizate la {META.dataAsOf} (v{META.version})
                  {" · "}
                  <a
                    href={`${META.repo}/blob/main/ERRATA.md`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    politica de corecturi
                  </a>
                  {" · "}găsiți o eroare?{" "}
                  <a
                    href={`${META.issues}/new?template=correction.yml`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    raportați-o
                  </a>
                </>
              ) : (
                <>
                  Author:{" "}
                  <a href={`mailto:${META.author.email}`}>{META.author.name}</a>
                  {" · "}data as of {META.dataAsOf} (v{META.version}){" · "}
                  <a
                    href={`${META.repo}/blob/main/ERRATA.md`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    corrections policy
                  </a>
                  {" · "}found an error?{" "}
                  <a
                    href={`${META.issues}/new?template=correction.yml`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    report it
                  </a>
                </>
              )}
            </p>
          </footer>
        </div>
      </UatPlanProvider>
    </LangContext.Provider>
  );
}
