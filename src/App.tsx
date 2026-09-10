import { useEffect, useState } from "react";
import { MapView } from "./components/MapView";
import { FlowGraph } from "./components/FlowGraph";
import { CompareView } from "./components/CompareView";
import { PolicyView } from "./components/PolicyView";
import { TimelineView } from "./components/TimelineView";
import { StrategyView } from "./components/StrategyView";
import { ResilienceView } from "./components/ResilienceView";
import { SummaryView, type ViewId } from "./components/SummaryView";
import { StoriesView } from "./components/StoriesView";
import { SourcesView } from "./components/SourcesView";
import { LangContext, type Lang } from "./i18n";
import { UatPlanProvider } from "./lib/uatPlan";
import { initAcroTips } from "./lib/acroTip";
import { META } from "./data/meta";

const VIEWS: { id: ViewId; ro: string; en: string }[] = [
  { id: "summary", ro: "Rezumat", en: "Summary" },
  { id: "stories", ro: "Povești", en: "Stories" },
  { id: "map", ro: "Harta României", en: "Map of Romania" },
  { id: "flows", ro: "Fluxuri de date", en: "Data flows" },
  { id: "compare", ro: "Comparație", en: "Comparison" },
  { id: "policy", ro: "Analiză", en: "Policy" },
  { id: "timeline", ro: "Calendar", en: "Calendar" },
  { id: "strategy", ro: "Strategie", en: "Strategy" },
  { id: "resilience", ro: "Reziliență", en: "Resilience" },
  { id: "sources", ro: "Surse", en: "Sources" },
];

function initialLang(): Lang {
  const saved = localStorage.getItem("dra-lang");
  return saved === "en" ? "en" : "ro";
}

export default function App() {
  const [view, setView] = useState<ViewId>("summary");
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    localStorage.setItem("dra-lang", lang);
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
                <button
                  key={v.id}
                  className={view === v.id ? "active" : ""}
                  onClick={() => setView(v.id)}
                >
                  {lang === "ro" ? v.ro : v.en}
                </button>
              ))}
              <button
                className="lang-toggle"
                onClick={() => setLang(lang === "ro" ? "en" : "ro")}
                title={lang === "ro" ? "Switch to English" : "Comută în română"}
              >
                {lang === "ro" ? "EN" : "RO"}
              </button>
            </nav>
          </header>
          <main>
            {view === "summary" && <SummaryView onNavigate={setView} />}
            {view === "stories" && <StoriesView />}
            {view === "map" && <MapView />}
            {view === "flows" && <FlowGraph />}
            {view === "compare" && <CompareView />}
            {view === "policy" && <PolicyView />}
            {view === "timeline" && <TimelineView />}
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
