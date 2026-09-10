import { useEffect, useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import {
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  INSTITUTIONS,
  type Category,
  type Institution,
} from "../data/institutions";
import {
  DC_PLACEMENT,
  REGIONAL_DCS,
  UNDERGROUND_SITES,
  VRANCEA_EPICENTRE,
  VRANCEA_RADII_KM,
} from "../data/resilience";
import { pick, useLang, type Bi } from "../i18n";
import { T } from "./T";

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
  const { lang } = useLang();
  const [geo, setGeo] = useState<GeoCollection | null>(null);
  const [hover, setHover] = useState<Institution | null>(null);
  const [hoverCounty, setHoverCounty] = useState<string | null>(null);
  const [siteHover, setSiteHover] = useState<{ title: Bi; detail: Bi } | null>(null);
  const [filter, setFilter] = useState<Category | null>(null);
  const [zoom, setZoom] = useState({ x: 0, y: 0, k: 1 });
  const svgRef = useRef<SVGSVGElement | null>(null);
  const zoomRef = useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/ro-counties.geojson`)
      .then((r) => r.json())
      .then(setGeo)
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;
    const behavior = d3
      .zoom<SVGSVGElement, unknown>()
      .scaleExtent([1, 12])
      .translateExtent([
        [-W, -H],
        [W * 2, H * 2],
      ])
      .touchable(() => false)
      .filter((event) => {
        if (event.type === "wheel") return event.ctrlKey || event.metaKey;
        return !event.button;
      })
      .on("zoom", (event) =>
        setZoom({ x: event.transform.x, y: event.transform.y, k: event.transform.k })
      );
    d3.select(svg).call(behavior);
    zoomRef.current = behavior;
    return () => {
      d3.select(svg).on(".zoom", null);
    };
  }, [geo]);

  const zoomBy = (factor: number) => {
    const svg = svgRef.current;
    const z = zoomRef.current;
    if (!svg || !z) return;
    d3.select(svg).transition().duration(200).call(z.scaleBy, factor);
  };

  const resetZoom = () => {
    const svg = svgRef.current;
    const z = zoomRef.current;
    if (!svg || !z) return;
    d3.select(svg).transition().duration(200).call(z.transform, d3.zoomIdentity);
  };

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

  if (!geo || !projection)
    return (
      <div className="loading">
        {lang === "ro" ? "Se încarcă harta…" : "Loading the map…"}
      </div>
    );

  const path = d3.geoPath(projection);
  const maxCount = Math.max(...counts.values(), 1);

  const markers = INSTITUTIONS.filter(
    (i) => i.county && i.county !== "*" && i.lat != null && i.lon != null
  );

  const sovereignDcs = DC_PLACEMENT.filter((d) => ["dc-a", "dc-b", "dc-c"].includes(d.id));
  const regionalDcs = REGIONAL_DCS.filter(
    (r) => !/covered by DC-B|acoperit de DC-B/.test(pick(r.city, "en"))
  );
  const underground = UNDERGROUND_SITES;
  const [vx, vy] = projection([VRANCEA_EPICENTRE.lon, VRANCEA_EPICENTRE.lat]) ?? [0, 0];

  return (
    <div className="panel">
      <div className="panel-head">
        <h2>
          {lang === "ro"
            ? "Harta instituțională a României digitale"
            : "Institutional map of digital Romania"}
        </h2>
        <div className="legend">
          {Object.entries(CATEGORY_LABELS).map(([cat, label]) => (
            <button
              key={cat}
              className={`legend-chip ${filter === cat ? "active" : ""}`}
              style={{ borderColor: CATEGORY_COLORS[cat as Category] }}
              onClick={() => setFilter(filter === cat ? null : (cat as Category))}
            >
              <span className="dot" style={{ background: CATEGORY_COLORS[cat as Category] }} />
              <T text={pick(label, lang)} />
            </button>
          ))}
        </div>
      </div>
      <div className="map-wrap">
        <div className="map-controls">
          <button onClick={() => zoomBy(1.5)} title="Zoom in" aria-label="Zoom in">
            +
          </button>
          <button onClick={() => zoomBy(1 / 1.5)} title="Zoom out" aria-label="Zoom out">
            −
          </button>
          <button onClick={resetZoom} title="Reset" aria-label="Reset zoom">
            ⟲
          </button>
        </div>
        <svg ref={svgRef} viewBox={`0 0 ${W} ${H}`} className="map-svg">
          <g transform={`translate(${zoom.x},${zoom.y}) scale(${zoom.k})`}>
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
                    {count
                      ? lang === "ro"
                        ? ` · ${count} instituție/instituții`
                        : ` · ${count} institution(s)`
                      : ""}
                  </title>
                </path>
              );
            })}
            {VRANCEA_RADII_KM.map((km) => {
              const ring = d3
                .geoCircle()
                .center([VRANCEA_EPICENTRE.lon, VRANCEA_EPICENTRE.lat])
                .radius(km / 6371);
              const d = path(ring() as unknown as GeoJSON.GeoJSON) ?? "";
              return <path key={km} d={d} className="vrancea-ring" />;
            })}
            <g className="vrancea-epicentre" transform={`translate(${vx},${vy})`}>
              <circle r={3.5} fill="#e5484d" />
              <text x={0} y={-8} textAnchor="middle" className="vrancea-label">
                Vrancea
              </text>
            </g>
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
                    r={4}
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
                      r={on ? 8 : 6}
                      fill={CATEGORY_COLORS[i.category]}
                      opacity={filter && filter !== i.category ? 0.25 : 1}
                    />
                    {(zoom.k >= 3 || on || filter === i.category) && (
                      <text x={10} y={4} className="marker-label">
                        {i.acronym}
                      </text>
                    )}
                  </g>
                );
              })}
            {sovereignDcs.map((d) => {
              const [x, y] = projection([d.lon, d.lat]) ?? [0, 0];
              return (
                <g
                  key={d.id}
                  transform={`translate(${x},${y})`}
                  className="dc-marker"
                  onMouseEnter={() =>
                    setSiteHover({
                      title: d.name,
                      detail: { ro: `${d.role.ro} · ${d.seismic.ro}`, en: `${d.role.en} · ${d.seismic.en}` },
                    })
                  }
                  onMouseLeave={() => setSiteHover(null)}
                >
                  <rect
                    x={-5.5}
                    y={-5.5}
                    width={11}
                    height={11}
                    transform="rotate(45)"
                    fill="#ffd166"
                    stroke="#0e1729"
                    strokeWidth={1.5}
                  />
                  <text x={0} y={-10} textAnchor="middle" className="dc-label">
                    {d.id.toUpperCase()}
                  </text>
                </g>
              );
            })}
            {regionalDcs.map((r) => {
              const [x, y] = projection([r.lon, r.lat]) ?? [0, 0];
              return (
                <g
                  key={`r-${pick(r.region, "ro")}`}
                  transform={`translate(${x},${y})`}
                  className="dc-marker regional"
                  onMouseEnter={() =>
                    setSiteHover({
                      title: { ro: `Micro-DC ${r.region.ro}`, en: `${r.region.en} micro-DC` },
                      detail: r.power,
                    })
                  }
                  onMouseLeave={() => setSiteHover(null)}
                >
                  <rect
                    x={-4}
                    y={-4}
                    width={8}
                    height={8}
                    transform="rotate(45)"
                    fill="#53c1e8"
                    stroke="#0e1729"
                    strokeWidth={1.5}
                  />
                </g>
              );
            })}
            {underground.map((u) => {
              const [x, y] = projection([u.lon, u.lat]) ?? [0, 0];
              return (
                <g
                  key={`u-${pick(u.name, "ro")}`}
                  transform={`translate(${x},${y})`}
                  className="dc-marker underground"
                  onMouseEnter={() => setSiteHover({ title: u.name, detail: u.suitability })}
                  onMouseLeave={() => setSiteHover(null)}
                >
                  <path d="M0,-5 L4.5,4 L-4.5,4 Z" fill="#a479e2" stroke="#0e1729" strokeWidth={1.5} />
                </g>
              );
            })}
          </g>
        </svg>
      </div>
      <div className="hover-bar">
        {siteHover ? (
          <span>
            <strong><T text={pick(siteHover.title, lang)} /></strong> — <T text={pick(siteHover.detail, lang)} />
          </span>
        ) : hover ? (
          <span>
            <strong>{hover.acronym}</strong> — <T text={pick(hover.name, lang)} /> · <T text={pick(hover.role, lang)} /> ·{" "}
            {pick(CATEGORY_LABELS[hover.category], lang)}
            {hoverCounty
              ? lang === "ro"
                ? ` · județul ${hoverCounty}`
                : ` · county of ${hoverCounty}`
              : ""}
          </span>
        ) : (
          <span className="muted">
            {lang === "ro"
              ? "Ctrl + rotiță pentru zoom (sau butoanele +/−), trage cu mouse-ul pentru panoramare — derularea paginii nu e blocată. Punctele mici = primării (UAT); pătrate galbene = DC suverane; pătrate albastre = micro-DC regionale; triunghiuri mov = situri subterane; inelele roșii = zona seismică Vrancea (50/100/200 km)."
              : "Ctrl + wheel to zoom (or the +/− buttons), drag to pan — page scrolling is never trapped. Small dots = town halls (UAT); yellow squares = sovereign DCs; cyan squares = regional micro-DCs; purple triangles = underground sites; red rings = the Vrancea seismic zone (50/100/200 km)."}
          </span>
        )}
      </div>
    </div>
  );
}
