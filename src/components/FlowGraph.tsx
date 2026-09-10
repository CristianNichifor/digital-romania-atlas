import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  INSTITUTIONS,
  type Category,
  type Institution,
} from "../data/institutions";
import { FLOWS, FLOW_COLORS, FLOW_LABELS, type FlowKind } from "../data/flows";

type Mode = "current" | "proposed";

interface GNode extends d3.SimulationNodeDatum {
  id: string;
  acronym: string;
  category: Category;
}

interface GLink extends d3.SimulationLinkDatum<GNode> {
  kind: FlowKind;
  label: string;
  tech?: string;
  status: "current" | "proposed";
}

const W = 960;
const H = 720;

export function FlowGraph() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [mode, setMode] = useState<Mode>("proposed");
  const [kindFilter, setKindFilter] = useState<FlowKind | null>(null);
  const [catFilter, setCatFilter] = useState<Category | null>(null);
  const [hoverInst, setHoverInst] = useState<Institution | null>(null);
  const [hoverFlow, setHoverFlow] = useState<string | null>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const svg = d3.select(el);
    svg.selectAll("*").remove();

    const nodes: GNode[] = INSTITUTIONS.filter(
      (i) =>
        (mode === "proposed" || i.scope !== "proposed") &&
        (!catFilter || i.category === catFilter)
    ).map((i) => ({
      id: i.id,
      acronym: i.acronym,
      category: i.category,
    }));

    const ids = new Set(nodes.map((n) => n.id));
    const links: GLink[] = FLOWS.filter(
      (f) =>
        ids.has(f.from) &&
        ids.has(f.to) &&
        (mode === "proposed" || f.status === "current") &&
        (!kindFilter || f.kind === kindFilter)
    ).map((f) => ({
      source: f.from,
      target: f.to,
      kind: f.kind,
      label: f.label,
      tech: f.tech,
      status: f.status,
    }));

    const g = svg.append("g");

    svg.call(
      d3
        .zoom<SVGSVGElement, unknown>()
        .scaleExtent([0.4, 3])
        .on("zoom", (ev) => g.attr("transform", ev.transform.toString()))
    );

    const defs = g
      .append("defs")
      .selectAll("marker")
      .data(Object.keys(FLOW_COLORS))
      .join("marker")
      .attr("id", (d) => `arrow-${d}`)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 26)
      .attr("refY", 0)
      .attr("markerWidth", 7)
      .attr("markerHeight", 7)
      .attr("orient", "auto");
    defs
      .append("path")
      .attr("d", "M0,-5L10,0L0,5")
      .attr("fill", (d) => FLOW_COLORS[d as FlowKind]);

    const link = g
      .append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", (d) => FLOW_COLORS[d.kind])
      .attr("stroke-opacity", (d) => (d.status === "proposed" ? 0.85 : 0.55))
      .attr("stroke-width", (d) => (d.kind === "payment" || d.kind === "backbone" ? 2.4 : 1.6))
      .attr("stroke-dasharray", (d) => (d.kind === "oversight" || d.kind === "governance" ? "5,4" : null))
      .attr("marker-end", (d) => `url(#arrow-${d.kind})`)
      .on("mouseenter", (_, d) => {
        setHoverFlow(`${d.label}${d.tech ? ` · ${d.tech}` : ""}`);
        setHoverInst(null);
      })
      .on("mouseleave", () => setHoverFlow(null));

    const node = g
      .append("g")
      .selectAll<SVGGElement, GNode>("g")
      .data(nodes)
      .join("g")
      .call(
        d3
          .drag<SVGGElement, GNode>()
          .on("start", (ev, d) => {
            if (!ev.active) sim.alphaTarget(0.25).restart();
            d.fx = d.x;
            d.fy = d.y;
          })
          .on("drag", (ev, d) => {
            d.fx = ev.x;
            d.fy = ev.y;
          })
          .on("end", (ev, d) => {
            if (!ev.active) sim.alphaTarget(0);
            d.fx = null;
            d.fy = null;
          })
      );

    node
      .append("circle")
      .attr("r", (d) => (d.category === "user" ? 14 : 9))
      .attr("fill", (d) => CATEGORY_COLORS[d.category])
      .attr("stroke", "#05070d")
      .attr("stroke-width", 2);

    node
      .append("text")
      .text((d) => d.acronym)
      .attr("x", 14)
      .attr("y", 4)
      .attr("class", "graph-label")
      .style("fill", (d) => CATEGORY_COLORS[d.category]);

    node
      .on("mouseenter", (ev, d) => {
        const sel = d3.select(ev.currentTarget as SVGGElement);
        const inst = INSTITUTIONS.find((i) => i.id === d.id);
        sel.select("circle").attr("r", (n) => ((n as GNode).category === "user" ? 17 : 12));
        sel
          .append("text")
          .attr("class", "graph-name")
          .attr("x", 14)
          .attr("y", -8)
          .text(inst?.name ?? d.acronym);
        sel
          .append("text")
          .attr("class", "graph-role")
          .attr("x", 14)
          .attr("y", 20)
          .text(inst ? `${inst.role} · ${CATEGORY_LABELS[inst.category]}` : "");
        setHoverInst(inst ?? null);
        setHoverFlow(null);
      })
      .on("mouseleave", (ev) => {
        const sel = d3.select(ev.currentTarget as SVGGElement);
        sel.selectAll("text.graph-name, text.graph-role").remove();
        sel.select("circle").attr("r", (n) => ((n as GNode).category === "user" ? 14 : 9));
        setHoverInst(null);
      });

    node.append("title").text((d) => {
      const inst = INSTITUTIONS.find((i) => i.id === d.id);
      return inst ? `${inst.acronym} — ${inst.name}\n${inst.role}` : d.acronym;
    });

    const sim = d3
      .forceSimulation<GNode>(nodes)
      .force(
        "link",
        d3
          .forceLink<GNode, GLink>(links)
          .id((d) => d.id)
          .distance((d) => (d.kind === "oversight" || d.kind === "governance" ? 150 : 90))
      )
      .force("charge", d3.forceManyBody().strength(-380))
      .force("center", d3.forceCenter(W / 2, H / 2))
      .force("collide", d3.forceCollide<GNode>().radius(30));

    sim.on("tick", () => {
      link
        .attr("x1", (d) => (d.source as GNode).x!)
        .attr("y1", (d) => (d.source as GNode).y!)
        .attr("x2", (d) => (d.target as GNode).x!)
        .attr("y2", (d) => (d.target as GNode).y!);
      node.attr("transform", (d) => `translate(${d.x},${d.y})`);
    });

    return () => {
      sim.stop();
    };
  }, [mode, kindFilter, catFilter]);

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Fluxuri de date între părți</h2>
        <div className="mode-toggle">
          <button
            className={mode === "current" ? "active" : ""}
            onClick={() => setMode("current")}
          >
            Propunerea actuală (doc GitHub MAI)
          </button>
          <button
            className={mode === "proposed" ? "active" : ""}
            onClick={() => setMode("proposed")}
          >
            Propunerea noastră (extinsă)
          </button>
        </div>
      </div>
      <div className="legend-row">
        <span className="legend-caption">Fluxuri:</span>
        <div className="legend">
          {Object.entries(FLOW_LABELS).map(([k, label]) => (
            <button
              key={k}
              className={`legend-chip ${kindFilter === k ? "active" : ""}`}
              style={{ borderColor: FLOW_COLORS[k as FlowKind] }}
              onClick={() => setKindFilter(kindFilter === k ? null : (k as FlowKind))}
            >
              <span className="dot" style={{ background: FLOW_COLORS[k as FlowKind] }} />
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="legend-row">
        <span className="legend-caption">Instituții:</span>
        <div className="legend">
          {Object.entries(CATEGORY_LABELS).map(([cat, label]) => (
            <button
              key={cat}
              className={`legend-chip ${catFilter === cat ? "active" : ""}`}
              style={{ borderColor: CATEGORY_COLORS[cat as Category] }}
              onClick={() => setCatFilter(catFilter === cat ? null : (cat as Category))}
            >
              <span className="dot" style={{ background: CATEGORY_COLORS[cat as Category] }} />
              {label}
            </button>
          ))}
        </div>
      </div>
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="graph-svg" />
      <div className="hover-bar">
        {hoverFlow ? (
          <span>
            <strong>{hoverFlow}</strong>
          </span>
        ) : hoverInst ? (
          <span>
            <strong>{hoverInst.acronym}</strong> — {hoverInst.name} ·{" "}
            <em>{hoverInst.role}</em> · {CATEGORY_LABELS[hoverInst.category]}
          </span>
        ) : (
          <span className="muted">
            Treci peste un nod pentru numele complet și rolul său; peste o linie pentru ce date
            circulă. Trage nodurile pentru a rearanja. În modul „actual” vezi doar ecosistemul
            din documentația publicată; în modul „propus” apar backbone-ul de date, plățile,
            cutia poștală digitală și supravegherea independentă.
          </span>
        )}
      </div>
    </div>
  );
}
