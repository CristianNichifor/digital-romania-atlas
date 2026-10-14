import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  INSTITUTIONS,
  type Category,
  type Institution,
} from "../data/institutions";
import { FLOWS, FLOW_COLORS, FLOW_LABELS, type FlowKind } from "../data/flows";
import { pick, useLang, useT } from "../i18n";
import { useUatPlan } from "../lib/uatPlan";
import { Prov } from "./Prov";

type Mode = "current" | "proposed" | "diff";

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

const ACRONYM = new Map(INSTITUTIONS.map((i) => [i.id, i.acronym]));

const W = 960;
const H = 720;

const MODE_LABELS: { id: Mode; ro: string; en: string }[] = [
  {
    id: "current",
    ro: "Propunerea actuală (doc GitHub MAI)",
    en: "Current proposal (MAI GitHub docs)",
  },
  {
    id: "proposed",
    ro: "Propunerea noastră (extinsă)",
    en: "Our proposal (extended)",
  },
  {
    id: "diff",
    ro: "Diferența (doar ce adăugăm)",
    en: "Diff (only what we add)",
  },
];

export function FlowGraph() {
  const { lang } = useLang();
  const t = useT();
  const { fill } = useUatPlan();
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [mode, setMode] = useState<Mode>("diff");
  const [kindFilter, setKindFilter] = useState<FlowKind | null>("identity");
  const [catFilter, setCatFilter] = useState<Category | null>(null);
  const [hoverInst, setHoverInst] = useState<Institution | null>(null);
  const [hoverFlow, setHoverFlow] = useState<string | null>(null);
  // Text alternative to the graph: the same flows the current filters draw.
  const listed = useMemo(() => {
    const ids = new Set(
      INSTITUTIONS.filter(
        (i) =>
          (mode !== "current" || i.scope !== "proposed") &&
          (!catFilter || i.category === catFilter)
      ).map((i) => i.id)
    );
    return FLOWS.filter(
      (f) =>
        ids.has(f.from) &&
        ids.has(f.to) &&
        (mode !== "current" || f.status === "current") &&
        (mode !== "diff" || f.status === "proposed") &&
        (!kindFilter || f.kind === kindFilter)
    );
  }, [mode, kindFilter, catFilter]);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;
    const svg = d3.select(el);
    svg.selectAll("*").remove();

    const nodes: GNode[] = INSTITUTIONS.filter(
      (i) =>
        (mode !== "current" || i.scope !== "proposed") &&
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
        (mode !== "current" || f.status === "current") &&
        (!kindFilter || f.kind === kindFilter)
    ).map((f) => ({
      source: f.from,
      target: f.to,
      kind: f.kind,
      label: fill(pick(f.label, lang)),
      tech: f.tech ? fill(pick(f.tech, lang)) : undefined,
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
      .attr("stroke-opacity", (d) => {
        if (mode === "diff") return d.status === "proposed" ? 0.9 : 0.1;
        return d.status === "proposed" ? 0.85 : 0.55;
      })
      .attr("stroke-width", (d) =>
        d.kind === "payment" || d.kind === "backbone" ? 2.4 : 1.6
      )
      .attr("stroke-dasharray", (d) =>
        d.kind === "oversight" || d.kind === "governance" ? "5,4" : null
      )
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
        sel
          .select("circle")
          .attr("r", (n) => ((n as GNode).category === "user" ? 17 : 12));
        sel
          .append("text")
          .attr("class", "graph-name")
          .attr("x", 16)
          .attr("y", -18)
          .text(inst ? pick(inst.name, lang) : d.acronym);
        sel
          .append("text")
          .attr("class", "graph-role")
          .attr("x", 16)
          .attr("y", 30)
          .text(
            inst
              ? `${pick(inst.role, lang)} · ${pick(CATEGORY_LABELS[inst.category], lang)}`
              : ""
          );
        setHoverInst(inst ?? null);
        setHoverFlow(null);
      })
      .on("mouseleave", (ev) => {
        const sel = d3.select(ev.currentTarget as SVGGElement);
        sel.selectAll("text.graph-name, text.graph-role").remove();
        sel
          .select("circle")
          .attr("r", (n) => ((n as GNode).category === "user" ? 14 : 9));
        setHoverInst(null);
      });

    const sim = d3
      .forceSimulation<GNode>(nodes)
      .force(
        "link",
        d3
          .forceLink<GNode, GLink>(links)
          .id((d) => d.id)
          .distance((d) =>
            d.kind === "oversight" || d.kind === "governance" ? 150 : 90
          )
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
  }, [mode, kindFilter, catFilter, lang, fill]);

  const newCount = useMemo(
    () =>
      mode === "diff" ? FLOWS.filter((f) => f.status === "proposed").length : 0,
    [mode]
  );

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>{t("flows.dataFlowsBetweenParties")}</h2>
        <div className="mode-toggle">
          {MODE_LABELS.map((m) => (
            <button
              key={m.id}
              className={mode === m.id ? "active" : ""}
              aria-pressed={mode === m.id}
              onClick={() => setMode(m.id)}
            >
              {lang === "ro" ? m.ro : m.en}
            </button>
          ))}
        </div>
      </div>
      <Prov />
      {mode === "diff" && (
        <div className="diff-banner" role="status">
          <>
            <strong>
              {t("flows.newCount").replace("{count}", String(newCount))}
            </strong>{" "}
            {t("flows.newCountAfter")}
          </>
        </div>
      )}
      <div className="legend-row">
        <span className="legend-caption">{t("flows.flows")}</span>
        <div className="legend">
          {Object.entries(FLOW_LABELS).map(([k, label]) => (
            <button
              key={k}
              className={`legend-chip ${kindFilter === k ? "active" : ""}`}
              aria-pressed={kindFilter === k}
              style={{ borderColor: FLOW_COLORS[k as FlowKind] }}
              onClick={() =>
                setKindFilter(kindFilter === k ? null : (k as FlowKind))
              }
            >
              <span
                className="dot"
                style={{ background: FLOW_COLORS[k as FlowKind] }}
              />
              {pick(label, lang)}
            </button>
          ))}
        </div>
      </div>
      <div className="legend-row">
        <span className="legend-caption">{t("flows.institutions")}</span>
        <div className="legend">
          {Object.entries(CATEGORY_LABELS).map(([cat, label]) => (
            <button
              key={cat}
              className={`legend-chip ${catFilter === cat ? "active" : ""}`}
              aria-pressed={catFilter === cat}
              style={{ borderColor: CATEGORY_COLORS[cat as Category] }}
              onClick={() =>
                setCatFilter(catFilter === cat ? null : (cat as Category))
              }
            >
              <span
                className="dot"
                style={{ background: CATEGORY_COLORS[cat as Category] }}
              />
              {pick(label, lang)}
            </button>
          ))}
        </div>
      </div>
      {listed.length === 0 && (kindFilter || catFilter) && (
        <div className="flows-empty" role="status">
          {t("flows.emptyFilter").replace(
            "{filters}",
            [
              kindFilter && pick(FLOW_LABELS[kindFilter], lang),
              catFilter && pick(CATEGORY_LABELS[catFilter], lang),
            ]
              .filter(Boolean)
              .join(" + ")
          )}{" "}
          <button
            onClick={() => {
              setKindFilter(null);
              setCatFilter(null);
            }}
          >
            {t("flows.emptyReset")}
          </button>
        </div>
      )}
      <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="graph-svg" />
      <details className="flow-list">
        <summary>
          {t("flows.listSummary").replace("{count}", String(listed.length))}
        </summary>
        <div className="table-scroll">
          <table className="compare-table">
            <thead>
              <tr>
                <th>{t("flows.listFrom")}</th>
                <th>{t("flows.listTo")}</th>
                <th>{t("flows.listData")}</th>
                <th>{t("flows.listStatus")}</th>
              </tr>
            </thead>
            <tbody>
              {listed.map((f) => (
                <tr key={f.id}>
                  <td>{ACRONYM.get(f.from) ?? f.from}</td>
                  <td>{ACRONYM.get(f.to) ?? f.to}</td>
                  <td>
                    {pick(FLOW_LABELS[f.kind], lang)}:{" "}
                    {fill(pick(f.label, lang))}
                  </td>
                  <td>
                    {t(
                      f.status === "proposed"
                        ? "flows.statusProposed"
                        : "flows.statusCurrent"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
      <div className="hover-bar">
        {hoverFlow ? (
          <span>
            <strong>{hoverFlow}</strong>
          </span>
        ) : hoverInst ? (
          <span>
            <strong>{hoverInst.acronym}</strong> — {pick(hoverInst.name, lang)}{" "}
            · <em>{pick(hoverInst.role, lang)}</em> ·{" "}
            {pick(CATEGORY_LABELS[hoverInst.category], lang)}
          </span>
        ) : (
          <span className="muted">{t("flows.hoverANodeFor")}</span>
        )}
      </div>
    </div>
  );
}
