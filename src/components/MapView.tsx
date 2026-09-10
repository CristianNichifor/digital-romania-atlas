import { useEffect, useMemo, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
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

interface TipContent {
  title: Bi;
  detail: Bi;
}

const TIP_CELL = 12;

export function MapView() {
  const { lang } = useLang();
  const [geo, setGeo] = useState<GeoCollection | null>(null);
  const [hover, setHover] = useState<Institution | null>(null);
  const [hoverCounty, setHoverCounty] = useState<string | null>(null);
  const [siteHover, setSiteHover] = useState<{ title: Bi; detail: Bi } | null>(null);
  const [filter, setFilter] = useState<Category | null>(null);
  const [zoom, setZoom] = useState({ x: 0, y: 0, k: 1 });
  const [tip, setTip] = useState<TipContent | null>(null);
  const [tipPos, setTipPos] = useState({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
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
      .scaleExtent([1, 20])
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
  const k = zoom.k;

  const moveTip = (e: ReactMouseEvent) => {
    const r = wrapRef.current?.getBoundingClientRect();
    if (!r) return;
    setTipPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  };

  const showTip = (content: TipContent, e: ReactMouseEvent) => {
    setTip(content);
    moveTip(e);
  };

  const markers = INSTITUTIONS.filter(
    (i) => i.county && i.county !== "*" && i.lat != null && i.lon != null
  );
  const visibleMarkers = markers.filter((i) => visible(i));
  const uat = INSTITUTIONS.find((i) => i.county === "*");
  const uatVisible = !!uat && (!filter || filter === "service");

  // Collision spreading: group points that land in the same screen cell and
  // fan them out so they stay distinguishable at any zoom level.
  const pts: { id: string; key: string; x: number; y: number }[] = [];
  for (const i of visibleMarkers) {
    const [px, py] = projection([i.lon!, i.lat!]) ?? [0, 0];
    pts.push({ id: i.id, key: i.id, x: zoom.x + px * k, y: zoom.y + py * k });
  }
  if (uatVisible) {
    geo.features.forEach((f, fi) => {
      const [cx, cy] = path.centroid(f as unknown as GeoJSON.Feature);
      pts.push({ id: `uat-${fi}`, key: `uat-${fi}`, x: zoom.x + cx * k, y: zoom.y + cy * k });
    });
  }
  const groups = new Map<string, typeof pts>();
  for (const p of pts) {
    const gk = `${Math.floor(p.x / TIP_CELL)}:${Math.floor(p.y / TIP_CELL)}`;
    const arr = groups.get(gk) ?? [];
    arr.push(p);
    groups.set(gk, arr);
  }
  const offsets = new Map<string, { ox: number; oy: number }>();
  const groupSizes = new Map<string, number>();
  for (const [gk, members] of groups) {
    members.sort((a, b) => a.key.localeCompare(b.key));
    const n = members.length;
    const phase = [...gk].reduce((s, ch) => s + ch.charCodeAt(0), 0) * 1.7;
    members.forEach((m, i) => {
      if (n === 1) {
        offsets.set(m.id, { ox: 0, oy: 0 });
      } else {
        const r = Math.min(6 + 2.6 * Math.sqrt(n), 22);
        const a = phase + (i * 2 * Math.PI) / n;
        offsets.set(m.id, { ox: Math.cos(a) * r, oy: Math.sin(a) * r });
      }
      groupSizes.set(m.id, n);
    });
  }

  const sovereignDcs = DC_PLACEMENT.filter((d) => ["dc-a", "dc-b", "dc-c"].includes(d.id));
  const regionalDcs = REGIONAL_DCS.filter(
    (r) => !/covered by DC-B|acoperit de DC-B/.test(pick(r.city, "en"))
  );
  const underground = UNDERGROUND_SITES;
  const [vx, vy] = projection([VRANCEA_EPICENTRE.lon, VRANCEA_EPICENTRE.lat]) ?? [0, 0];

  const tipClampX = (x: number) => {
    const w = wrapRef.current?.clientWidth ?? 900;
    return Math.max(4, Math.min(x, w - 250));
  };

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
      <div
        className="map-wrap"
        ref={wrapRef}
        onMouseMove={(e) => {
          if (tip) moveTip(e);
        }}
        onMouseLeave={() => setTip(null)}
      >
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
                  strokeWidth={0.6 / k}
                  onMouseEnter={(e) =>
                    showTip(
                      {
                        title: {
                          ro: f.properties.NAME_1,
                          en: f.properties.NAME_1,
                        },
                        detail: {
                          ro: count ? `${count} instituție/instituții` : "Fără instituții centralizate",
                          en: count ? `${count} institution(s)` : "No central institutions",
                        },
                      },
                      e
                    )
                  }
                  onMouseLeave={() => setTip(null)}
                />
              );
            })}
            {VRANCEA_RADII_KM.map((km) => {
              const ring = d3
                .geoCircle()
                .center([VRANCEA_EPICENTRE.lon, VRANCEA_EPICENTRE.lat])
                .radius(km / 6371);
              const d = path(ring() as unknown as GeoJSON.GeoJSON) ?? "";
              return (
                <path
                  key={km}
                  d={d}
                  className="vrancea-ring"
                  strokeWidth={1.2 / k}
                  strokeDasharray={`${6 / k} ${5 / k}`}
                  onMouseEnter={(e) =>
                    showTip(
                      {
                        title: {
                          ro: "Zona seismică Vrancea",
                          en: "Vrancea seismic zone",
                        },
                        detail: {
                          ro: `Rază de ${km} km față de epicentru`,
                          en: `${km} km radius from the epicentre`,
                        },
                      },
                      e
                    )
                  }
                  onMouseLeave={() => setTip(null)}
                />
              );
            })}
            <g
              className="vrancea-epicentre"
              transform={`translate(${vx},${vy}) scale(${1 / k})`}
              onMouseEnter={(e) =>
                showTip(
                  {
                    title: {
                      ro: "Epicentrul seismic Vrancea",
                      en: "Vrancea seismic epicentre",
                    },
                    detail: {
                      ro: "Inel interior 50 km · mediu 100 km · exterior 200 km",
                      en: "Inner ring 50 km · middle 100 km · outer 200 km",
                    },
                  },
                  e
                )
              }
              onMouseLeave={() => setTip(null)}
            >
              <circle r={4} fill="#e5484d" stroke="#05070d" strokeWidth={1} />
              <text x={0} y={-10} textAnchor="middle" className="vrancea-label">
                Vrancea
              </text>
            </g>
            {geo.features.map((f, idx) => {
              const centroid = path.centroid(f as unknown as GeoJSON.Feature);
              return (
                <g key={`c-${idx}`} transform={`translate(${centroid[0]},${centroid[1]}) scale(${1 / k})`}>
                  <text x={0} y={0} className="county-label">
                    {f.properties.NAME_1}
                  </text>
                </g>
              );
            })}
            {uatVisible &&
              geo.features.map((f, fi) => {
                const [cx, cy] = path.centroid(f as unknown as GeoJSON.Feature);
                const off = offsets.get(`uat-${fi}`) ?? { ox: 0, oy: 0 };
                return (
                  <g
                    key={`uat-${fi}`}
                    transform={`translate(${cx + off.ox / k},${cy + off.oy / k}) scale(${1 / k})`}
                    className="marker"
                    onMouseEnter={(e) => {
                      setHover(uat!);
                      setHoverCounty(f.properties.NAME_1);
                      showTip(
                        {
                          title: uat!.name,
                          detail: {
                            ro: `${uat!.role.ro} · județul ${f.properties.NAME_1}`,
                            en: `${uat!.role.en} · ${f.properties.NAME_1} county`,
                          },
                        },
                        e
                      );
                    }}
                    onMouseLeave={() => {
                      setHover(null);
                      setHoverCounty(null);
                      setTip(null);
                    }}
                  >
                    <circle
                      r={4}
                      fill={CATEGORY_COLORS[uat!.category]}
                      opacity={0.85}
                      stroke="#05070d"
                      strokeWidth={0.8}
                    />
                  </g>
                );
              })}
            {visibleMarkers.map((i) => {
              const [px, py] = projection([i.lon!, i.lat!]) ?? [0, 0];
              const off = offsets.get(i.id) ?? { ox: 0, oy: 0 };
              const on = hover?.id === i.id;
              const label = (k >= 2.5 && groupSizes.get(i.id) === 1) || on;
              return (
                <g
                  key={i.id}
                  transform={`translate(${px + off.ox / k},${py + off.oy / k}) scale(${1 / k})`}
                  className="marker"
                  onMouseEnter={(e) => {
                    setHover(i);
                    setHoverCounty(null);
                    showTip(
                      {
                        title: { ro: `${i.acronym} — ${i.name.ro}`, en: `${i.acronym} — ${i.name.en}` },
                        detail: {
                          ro: `${i.role.ro} · ${CATEGORY_LABELS[i.category].ro}${
                            i.county ? ` · județul ${i.county}` : ""
                          }`,
                          en: `${i.role.en} · ${CATEGORY_LABELS[i.category].en}${
                            i.county ? ` · ${i.county} county` : ""
                          }`,
                        },
                      },
                      e
                    );
                  }}
                  onMouseLeave={() => {
                    setHover(null);
                    setTip(null);
                  }}
                >
                  <circle
                    r={on ? 7.5 : 5.5}
                    fill={CATEGORY_COLORS[i.category]}
                    opacity={filter && filter !== i.category ? 0.25 : 1}
                    stroke="#05070d"
                    strokeWidth={1}
                  />
                  {label && (
                    <text x={9} y={3.5} className="marker-label">
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
                  transform={`translate(${x},${y}) scale(${1 / k})`}
                  className="dc-marker"
                  onMouseEnter={(e) => {
                    const content = {
                      title: d.name,
                      detail: { ro: `${d.role.ro} · ${d.seismic.ro}`, en: `${d.role.en} · ${d.seismic.en}` },
                    };
                    setSiteHover(content);
                    showTip(content, e);
                  }}
                  onMouseLeave={() => {
                    setSiteHover(null);
                    setTip(null);
                  }}
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
                  transform={`translate(${x},${y}) scale(${1 / k})`}
                  className="dc-marker regional"
                  onMouseEnter={(e) => {
                    const content = {
                      title: { ro: `Micro-DC ${r.region.ro}`, en: `${r.region.en} micro-DC` },
                      detail: r.power,
                    };
                    setSiteHover(content);
                    showTip(content, e);
                  }}
                  onMouseLeave={() => {
                    setSiteHover(null);
                    setTip(null);
                  }}
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
                  transform={`translate(${x},${y}) scale(${1 / k})`}
                  className="dc-marker underground"
                  onMouseEnter={(e) => {
                    const content = { title: u.name, detail: u.suitability };
                    setSiteHover(content);
                    showTip(content, e);
                  }}
                  onMouseLeave={() => {
                    setSiteHover(null);
                    setTip(null);
                  }}
                >
                  <path d="M0,-5 L4.5,4 L-4.5,4 Z" fill="#a479e2" stroke="#0e1729" strokeWidth={1.5} />
                </g>
              );
            })}
          </g>
        </svg>
        {tip && (
          <div
            className="map-tip"
            style={{ left: tipClampX(tipPos.x + 14), top: Math.max(tipPos.y - 58, 4) }}
          >
            <strong>
              <T text={pick(tip.title, lang)} />
            </strong>
            <div>
              <T text={pick(tip.detail, lang)} />
            </div>
          </div>
        )}
      </div>
      <div className="symbol-legend">
        <span className="sl-item">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <circle cx="6" cy="6" r="4.5" fill="#4f8cff" stroke="#05070d" />
          </svg>
          {lang === "ro" ? "Instituții (culoarea = categoria)" : "Institutions (colour = category)"}
        </span>
        <span className="sl-item">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <circle cx="6" cy="6" r="3" fill="#53c1e8" stroke="#05070d" />
          </svg>
          {lang === "ro"
            ? "Prezență națională (UAT) în fiecare județ"
            : "National presence (UAT) in every county"}
        </span>
        <span className="sl-item">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect x="2.6" y="2.6" width="6.8" height="6.8" transform="rotate(45 6 6)" fill="#ffd166" stroke="#0e1729" />
          </svg>
          {lang === "ro" ? "DC suverană" : "Sovereign DC"}
        </span>
        <span className="sl-item">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect x="3.2" y="3.2" width="5.6" height="5.6" transform="rotate(45 6 6)" fill="#53c1e8" stroke="#0e1729" />
          </svg>
          {lang === "ro" ? "Micro-DC regional" : "Regional micro-DC"}
        </span>
        <span className="sl-item">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <path d="M6,1.5 L10.5,10 L1.5,10 Z" fill="#a479e2" stroke="#0e1729" />
          </svg>
          {lang === "ro" ? "Sit subteran (candidat)" : "Underground site (candidate)"}
        </span>
        <span className="sl-item">
          <svg width="14" height="12" viewBox="0 0 14 12">
            <circle cx="7" cy="6" r="4.5" fill="none" stroke="#e5484d" strokeDasharray="2.5 2" />
          </svg>
          {lang === "ro"
            ? "Zona seismică Vrancea (50/100/200 km)"
            : "Vrancea seismic zone (50/100/200 km)"}
        </span>
        <span className="sl-item">
          <svg width="12" height="12" viewBox="0 0 12 12">
            <rect x="1.5" y="1.5" width="9" height="9" fill="#1a2c4e" stroke="#2a4d8f" />
          </svg>
          {lang === "ro"
            ? "Nuanța județului = densitatea instituțiilor"
            : "County shade = institution density"}
        </span>
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
              ? "Ctrl + rotiță pentru zoom (sau butoanele +/−), trage cu mouse-ul pentru panoramare. Treci cu mouse-ul peste simboluri pentru detalii; punctele suprapuse se despart automat când mărești zoom-ul."
              : "Ctrl + wheel to zoom (or the +/− buttons), drag to pan. Hover over symbols for details; overlapping dots spread apart as you zoom in."}
          </span>
        )}
      </div>
    </div>
  );
}
