import { useState } from "react";
import { MapView } from "./components/MapView";
import { FlowGraph } from "./components/FlowGraph";
import { CompareView } from "./components/CompareView";
import { TimelineView } from "./components/TimelineView";
import { StrategyView } from "./components/StrategyView";

type View = "map" | "flows" | "compare" | "timeline" | "strategy";

const VIEWS: { id: View; label: string }[] = [
  { id: "map", label: "Harta României" },
  { id: "flows", label: "Fluxuri de date" },
  { id: "compare", label: "Comparație" },
  { id: "timeline", label: "Calendar" },
  { id: "strategy", label: "Strategie" },
];

export default function App() {
  const [view, setView] = useState<View>("map");

  return (
    <div className="app">
      <header>
        <div className="title">
          <span className="logo">DR</span>
          <div>
            <h1>Digital Romania Atlas</h1>
            <p>
              Ecosistemul RO EUDI Wallet vs. propunerea de backbone digital — instituții, fluxuri,
              comparație
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
              {v.label}
            </button>
          ))}
        </nav>
      </header>
      <main>
        {view === "map" && <MapView />}
        {view === "flows" && <FlowGraph />}
        {view === "compare" && <CompareView />}
        {view === "timeline" && <TimelineView />}
        {view === "strategy" && <StrategyView />}
      </main>
      <footer>
        <p>
          Demonstrație open source — datele „actuale” provin din{" "}
          <code>Ministerul-Afacerilor-Interne/rowallet-documentation</code> (CC-BY-4.0) și din
          prezentările publice MAI. Propunerile marcate verde sunt de design, nu documente
          oficiale.
        </p>
      </footer>
    </div>
  );
}
