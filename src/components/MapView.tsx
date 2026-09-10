import { useEffect, useMemo, useState } from "react";
import * as d3 from "d3";
import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  INSTITUTIONS,
  type Category,
  type Institution,
} from "../data/institutions";

interface Feature {
  type: string;
  properties: { NAME_1: string };
}

interface GeoCollection {
  type: string;
  features: Feature[];
}

const W = 960;
const H = 760;

function norm(s: string) {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

export function MapView() {
  const [geo, setGeo] = useState<GeoCollection | null>(null);
  const [hover, setHover] = useState<Institution | null>(null);
  const [hoverCounty, setHoverCounty] = useState<string | null>(null);
  const [filter, setFilter] = useState<Category | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/ro-counties.geojson`)
      .then((r) => r.json())
      .then(setGeo)
      .catch((e) => console.error(e));
  }, []);

  const projection = useMemo(() => {
    if (!geo) return null;
    return d3
      .geoMercator()
      .fitExtent(
        [
          [20, 20],
          [W - 20, H - 20],
        ],
        geo as unknown as GeoJSON.GeoJSON
      );
  }, [geo]);

  const counts = useMemo(() => {
    const c = new Map<string, number>();
    for (const inst of INSTITUTIONS) {
      if (inst.county && inst.county !== "*") {
        c.set(norm(inst.county), (c.get(norm(inst.county)) ?? 0) + 1);
      }
    }
    return c;
  }, []);

  const visible = (i: Institution) =>
    (i.county && i.county !== "*" && (!filter || i.category === filter)) ||
    i.county === "*";

  if (!geo || !projection) return <div className="loading">Se încarcă harta…</div>;

  const path = d3.geoPath(projection);
  const maxCount = Math.max(...counts.values(), 1);

  const markers = INSTITUTIONS.filter((i) => i.county && i.county !== "*" && i.lat != null && i.lon != null);

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>Harta instituțională a României digitale</h2>
        <div className="legend">
          {Object.entries(CATEGORY_LABELS).map(([cat, label]) => (
            <button
              key={cat}
              className={`legend-chip ${filter === cat ? "active" : ""}`}
              style={{ borderColor: CATEGORY_COLORS[cat as Category] }}
              onClick={() => setFilter(filter === cat ? null : (cat as Category))}
            >
              <span className="dot" style={{ background: CATEGORY_COLORS[cat as Category] }} />
              {label}
            </button>
          ))}
        </div>
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="map-svg">
        {geo.features.map((f, idx) => {
          const p = path(f as unknown as GeoJSON.Feature) ?? "";
          const count = counts.get(norm(f.properties.NAME_1)) ?? 0;
          const intensity = count / maxCount;
          return (
            <path
              key={idx}
              d={p}
              className="county"
              fill={
                count
                  ? d3.interpolateRgb("#0e1729", "#2a4d8f")(0.25 + intensity * 0.75)
                  : "#0a1120"
              }
              stroke="#233452"
            >
              <title>
                {f.properties.NAME_1}
                {count ? ` · ${count} instituție/instituții` : ""}
              </title>
            </path>
          );
        })}
        {geo.features.map((f, idx) => {
          const centroid = path.centroid(f as unknown as GeoJSON.Feature);
          return (
            <text key={`c-${idx}`} x={centroid[0]} y={centroid[1]} className="county-label">
              {f.properties.NAME_1}
            </text>
          );
        })}
        {INSTITUTIONS.filter((i) => i.county === "*" && (!filter || filter === "service")).map((i) =>
          geo.features.map((f, fi) => {
            const [x, y] = path.centroid(f as unknown as GeoJSON.Feature);
            return (
              <circle
                key={`${i.id}-${fi}`}
                cx={x}
                cy={y}
                r={3}
                fill={CATEGORY_COLORS[i.category]}
                opacity={0.85}
                onMouseEnter={() => {
                  setHover(i);
                  setHoverCounty(f.properties.NAME_1);
                }}
                onMouseLeave={() => {
                  setHover(null);
                  setHoverCounty(null);
                }}
              />
            );
          })
        )}
        {markers
          .filter((i) => visible(i))
          .map((i) => {
            const [x, y] = projection([i.lon!, i.lat!]) ?? [0, 0];
            const on = hover?.id === i.id || filter === i.category;
            return (
                <g
                  key={i.id}
                  transform={`translate(${x},${y})`}
                  className="marker"
                  onMouseEnter={() => {
                    setHover(i);
                    setHoverCounty(null);
                  }}
                  onMouseLeave={() => setHover(null)}
                >
                  <circle
                  r={on ? 7 : 5}
                  fill={CATEGORY_COLORS[i.category]}
                  opacity={filter && filter !== i.category ? 0.25 : 1}
                />
                {(on || filter === i.category) && (
                  <text x={9} y={4} className="marker-label">
                    {i.acronym}
                  </text>
                )}
              </g>
            );
          })}
      </svg>
      <div className="hover-bar">
        {hover ? (
          <span>
            <strong>{hover.acronym}</strong> — {hover.name} · {hover.role} ·{" "}
            {CATEGORY_LABELS[hover.category]}
            {hoverCounty ? ` · județul ${hoverCounty}` : ""}
          </span>
        ) : (
          <span className="muted">
            Trece cu mouse-ul peste un punct. Punctele mici din fiecare județ = primării (UAT) în
            propunere: emitere asistată și fallback fizic peste tot.
          </span>
        )}
      </div>
    </div>
  );
}
