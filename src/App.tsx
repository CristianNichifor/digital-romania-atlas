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
import { messages, type MessageKey } from "./locales";
import { UatPlanProvider } from "./lib/uatPlan";
import { initAcroTips } from "./lib/acroTip";
import { META } from "./data/meta";
import { readStorage, writeStorage } from "./lib/storage";

const VIEWS: ViewId[] = [
  "summary",
  "stories",
  "map",
  "flows",
  "compare",
  "policy",
  "timeline",
  "journeys",
  "strategy",
  "resilience",
  "sources",
];

function initialLang(): Lang {
  const saved = readStorage("dra-lang");
  return saved === "en" ? "en" : "ro";
}

const VIEW_IDS = new Set<string>(VIEWS);

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

  const t = (key: MessageKey) => messages[lang][key];

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <UatPlanProvider>
        <div className="app">
          <header>
            <div className="title">
              <span className="logo">DR</span>
              <div>
                <h1>Digital Romania Atlas</h1>
                <p>{messages[lang]["app.tagline"]}</p>
              </div>
            </div>
            <nav>
              {VIEWS.map((id) => (
                <a
                  key={id}
                  href={`#/${id}`}
                  aria-current={view === id ? "page" : undefined}
                >
                  {messages[lang][`nav.${id}`]}
                </a>
              ))}
              <button
                className="lang-toggle"
                onClick={() => setLang(lang === "ro" ? "en" : "ro")}
                aria-label={messages[lang]["nav.langToggle"]}
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
              <>
                {t("footer.disclaimer.before")}{" "}
                <code>
                  Ministerul-Afacerilor-Interne/rowallet-documentation
                </code>{" "}
                {t("footer.disclaimer.after")}
              </>
            </p>
            <p className="footer-meta">
              <>
                {t("footer.author")}{" "}
                <a href={`mailto:${META.author.email}`}>{META.author.name}</a>
                {" · "}
                {t("footer.dataAsOf")
                  .replace("{date}", META.dataAsOf)
                  .replace("{version}", META.version)}
                {" · "}
                <a
                  href={`${META.repo}/blob/main/ERRATA.md`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("footer.corrections")}
                </a>
                {" · "}
                {t("footer.foundError")}{" "}
                <a
                  href={`${META.issues}/new?template=correction.yml`}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t("footer.report")}
                </a>
              </>
            </p>
            <details className="privacy">
              <summary>{t("privacy.title")}</summary>
              <p>{t("privacy.storage")}</p>
              <p>{t("privacy.hosting")}</p>
              <p>
                {t("privacy.operator")} {META.author.name}.{" "}
                {t("privacy.contact")}{" "}
                <a href={META.issues} target="_blank" rel="noreferrer">
                  {t("privacy.contactLink")}
                </a>
                .
              </p>
            </details>
          </footer>
        </div>
      </UatPlanProvider>
    </LangContext.Provider>
  );
}
