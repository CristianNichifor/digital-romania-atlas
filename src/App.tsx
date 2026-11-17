import { useEffect, useRef, useState } from "react";
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

// Grouped tabs; the ids are the hash routes and must not change.
const NAV_GROUPS: { label: MessageKey | null; views: ViewId[] }[] = [
  { label: "nav.group.understand", views: ["summary", "stories", "journeys"] },
  { label: "nav.group.explore", views: ["map", "flows", "timeline"] },
  {
    label: "nav.group.argue",
    views: ["compare", "policy", "strategy", "resilience"],
  },
  { label: null, views: ["sources"] },
];

const VIEWS: ViewId[] = NAV_GROUPS.flatMap((g) => g.views);

function initialLang(): Lang {
  const saved = readStorage("dra-lang");
  return saved === "en" ? "en" : "ro";
}

const VIEW_IDS = new Set<string>(VIEWS);

// Views live in the hash (#/compare) so links are shareable, Back/Forward
// work, and the ?scenario= query string is left untouched.
function viewFromHash(hash: string): ViewId {
  // A trailing segment (#/sources/3) addresses an item inside the view.
  const id = hash.replace(/^#\/?/, "").split("/")[0];
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
  // On a phone the nav is one horizontal strip; keep the current tab on screen.
  // Scroll the strip itself: scrollIntoView() would also move the browser's
  // sequential focus starting point, so the first Tab would skip the header.
  useEffect(() => {
    const nav = document.querySelector<HTMLElement>("header nav");
    const link = nav?.querySelector<HTMLElement>('a[aria-current="page"]');
    if (!nav || !link || nav.scrollWidth <= nav.clientWidth) return;
    const pad = 36;
    const box = link.getBoundingClientRect();
    const left = box.left - nav.getBoundingClientRect().left + nav.scrollLeft;
    const right = left + box.width;
    if (left - pad < nav.scrollLeft) nav.scrollLeft = left - pad;
    else if (right + pad > nav.scrollLeft + nav.clientWidth)
      nav.scrollLeft = right + pad - nav.clientWidth;
  }, [view]);
  const [lang, setLang] = useState<Lang>(initialLang);
  // Fade the edge of the tab strip where more tabs are scrolled out of view.
  const navRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    const sync = () => {
      const max = nav.scrollWidth - nav.clientWidth;
      nav.classList.toggle("more-before", nav.scrollLeft > 4);
      nav.classList.toggle("more-after", nav.scrollLeft < max - 4);
    };
    sync();
    nav.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync);
    return () => {
      nav.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [lang]);

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
          <div className="family-bar">
            <a href={META.hub}>{t("app.hub")}</a>
          </div>
          <header>
            <div className="title">
              <span className="logo">DR</span>
              <div>
                <h1>Digital Romania Atlas</h1>
                <p>{messages[lang]["app.tagline"]}</p>
              </div>
            </div>
            <button
              className="lang-toggle"
              onClick={() => setLang(lang === "ro" ? "en" : "ro")}
              aria-label={messages[lang]["nav.langToggle"]}
              lang={lang === "ro" ? "en" : "ro"}
            >
              {lang === "ro" ? "EN" : "RO"}
            </button>
            <nav ref={navRef}>
              {NAV_GROUPS.map((g) => (
                <div
                  key={g.views[0]}
                  className="nav-group"
                  role={g.label ? "group" : undefined}
                  aria-labelledby={g.label ? `nav-${g.views[0]}` : undefined}
                >
                  {g.label && (
                    <span className="nav-group-label" id={`nav-${g.views[0]}`}>
                      {t(g.label)}
                    </span>
                  )}
                  {g.views.map((id) => (
                    <a
                      key={id}
                      href={`#/${id}`}
                      aria-current={view === id ? "page" : undefined}
                    >
                      {messages[lang][`nav.${id}`]}
                    </a>
                  ))}
                </div>
              ))}
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
