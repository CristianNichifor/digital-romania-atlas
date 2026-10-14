// Rebuilds public/data/ro-counties.geojson from geoBoundaries gbOpen ROU ADM1.
//
// Source: geoBoundaries (William & Mary geoLab), boundary ROU-ADM1-36066543,
// originally from the World Bank, licensed CC BY 4.0. The release is pinned
// to a commit so the output is reproducible. Changes made here: coordinates
// rounded to 3 decimals (about 100 m), repeated points dropped, rings rewound
// for d3-geo, and properties replaced by the county name with Romanian
// diacritics plus its ISO 3166-2 code.
//
// Usage: node scripts/build-counties.mjs

import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { geoArea } from "d3";

const SOURCE =
  "https://github.com/wmgeolab/geoBoundaries/raw/9469f09/releaseData/gbOpen/ROU/ADM1/geoBoundaries-ROU-ADM1_simplified.geojson";

const NAMES = {
  "RO-AB": "Alba",
  "RO-AR": "Arad",
  "RO-AG": "Argeș",
  "RO-BC": "Bacău",
  "RO-BH": "Bihor",
  "RO-BN": "Bistrița-Năsăud",
  "RO-BT": "Botoșani",
  "RO-BR": "Brăila",
  "RO-BV": "Brașov",
  "RO-B": "București",
  "RO-BZ": "Buzău",
  "RO-CL": "Călărași",
  "RO-CS": "Caraș-Severin",
  "RO-CJ": "Cluj",
  "RO-CT": "Constanța",
  "RO-CV": "Covasna",
  "RO-DB": "Dâmbovița",
  "RO-DJ": "Dolj",
  "RO-GL": "Galați",
  "RO-GR": "Giurgiu",
  "RO-GJ": "Gorj",
  "RO-HR": "Harghita",
  "RO-HD": "Hunedoara",
  "RO-IL": "Ialomița",
  "RO-IS": "Iași",
  "RO-IF": "Ilfov",
  "RO-MM": "Maramureș",
  "RO-MH": "Mehedinți",
  "RO-MS": "Mureș",
  "RO-NT": "Neamț",
  "RO-OT": "Olt",
  "RO-PH": "Prahova",
  "RO-SJ": "Sălaj",
  "RO-SM": "Satu Mare",
  "RO-SB": "Sibiu",
  "RO-SV": "Suceava",
  "RO-TR": "Teleorman",
  "RO-TM": "Timiș",
  "RO-TL": "Tulcea",
  "RO-VL": "Vâlcea",
  "RO-VS": "Vaslui",
  "RO-VN": "Vrancea",
};

const round = (n) => Math.round(n * 1000) / 1000;

function ring(points) {
  const out = [];
  for (const [x, y] of points) {
    const p = [round(x), round(y)];
    const last = out[out.length - 1];
    if (!last || last[0] !== p[0] || last[1] !== p[1]) out.push(p);
  }
  const [first] = out;
  const last = out[out.length - 1];
  if (first[0] !== last[0] || first[1] !== last[1]) out.push([...first]);
  return out;
}

// d3-geo wants exterior rings clockwise; a ring that encloses more than a
// hemisphere is wound the other way round.
function polygon(rings) {
  const fixed = rings.map(ring).filter((r) => r.length >= 4);
  if (geoArea({ type: "Polygon", coordinates: fixed }) > 2 * Math.PI)
    return fixed.map((r) => r.reverse());
  return fixed;
}

const response = await fetch(SOURCE);
if (!response.ok) throw new Error(`${SOURCE}: HTTP ${response.status}`);
const source = await response.json();

const features = source.features.map((f) => {
  const iso = f.properties.shapeISO;
  const name = NAMES[iso];
  if (!name) throw new Error(`unknown county ${iso}`);
  const { type, coordinates } = f.geometry;
  const geometry =
    type === "Polygon"
      ? { type, coordinates: polygon(coordinates) }
      : { type, coordinates: coordinates.map(polygon) };
  return { type: "Feature", properties: { name, iso }, geometry };
});
features.sort((a, b) => a.properties.iso.localeCompare(b.properties.iso));

if (features.length !== 42) throw new Error(`${features.length} counties`);

const out = resolve(
  dirname(fileURLToPath(import.meta.url)),
  "../public/data/ro-counties.geojson"
);
writeFileSync(
  out,
  JSON.stringify({ type: "FeatureCollection", features }) + "\n"
);
console.log(`wrote ${features.length} counties to ${out}`);
