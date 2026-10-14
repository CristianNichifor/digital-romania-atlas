import { readFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const readTs = (p) => {
  const raw = readFileSync(resolve(root, p), "utf8");
  return raw.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
};

const asciiRe = /[\u0080-\uFFFF]/;
const errors = [];

function findArray(code, name) {
  const idx = code.indexOf(name);
  if (idx === -1) {
    errors.push(`${name} not found`);
    return null;
  }
  return code.slice(idx);
}

function parseInstitutions(code) {
  const section = findArray(code, "export const INSTITUTIONS");
  if (!section) return [];
  const entries = [...section.matchAll(/\bid:\s*"([a-z0-9-]+)"/g)].map(
    (m) => m[1]
  );
  const scope = {};
  for (const m of section.matchAll(
    /\bid:\s*"([a-z0-9-]+)"[\s\S]{0,900}?scope:\s*"(current|proposed|both)"/g
  )) {
    scope[m[1]] = m[2];
  }
  return { ids: entries, scope };
}

function parseFlows(code) {
  const section = findArray(code, "export const FLOWS");
  if (!section) return [];
  const flows = [];
  for (const m of section.matchAll(
    /\bid:\s*"([a-z0-9-]+)"[\s\S]{0,700}?from:\s*"([a-z0-9-]+)"[\s\S]{0,700}?to:\s*"([a-z0-9-]+)"[\s\S]{0,700}?status:\s*"(current|proposed)"/g
  )) {
    flows.push({ id: m[1], from: m[2], to: m[3], status: m[4] });
  }
  return flows;
}

const instCode = readTs("src/data/institutions.ts");
const flowsCode = readTs("src/data/flows.ts");
const storiesCode = readTs("src/data/stories.ts");
const journeysCode = readTs("src/data/journeys.ts");
const euSystemsCode = readTs("src/data/euSystems.ts");
const sourcesCode = readTs("src/data/sources.ts");
const hrCode = readTs("src/data/hr.ts");

const inst = parseInstitutions(instCode);
const flows = parseFlows(flowsCode);

if (inst) {
  const unique = new Set(inst.ids);
  if (unique.size !== inst.ids.length) errors.push("duplicate institution ids");
  for (const f of flows) {
    if (!unique.has(f.from))
      errors.push(`flow ${f.id}: unknown from "${f.from}"`);
    if (!unique.has(f.to)) errors.push(`flow ${f.id}: unknown to "${f.to}"`);
  }
  const flowIds = flows.map((f) => f.id);
  if (new Set(flowIds).size !== flowIds.length)
    errors.push("duplicate flow ids");
}

const storySteps = [
  ...storiesCode.matchAll(
    /from:\s*"([a-z0-9-]+)"[\s\S]{0,500}?to:\s*"([a-z0-9-]+)"/g
  ),
];
if (inst) {
  for (const [, from, to] of storySteps) {
    if (!inst.ids.includes(from))
      errors.push(`story step: unknown from "${from}"`);
    if (!inst.ids.includes(to)) errors.push(`story step: unknown to "${to}"`);
  }
}

const journeySteps = [
  ...journeysCode.matchAll(
    /from:\s*"([a-z0-9-]+)"[\s\S]{0,500}?to:\s*"([a-z0-9-]+)"/g
  ),
];
if (inst) {
  for (const [, from, to] of journeySteps) {
    if (!inst.ids.includes(from))
      errors.push(`journey step: unknown from "${from}"`);
    if (!inst.ids.includes(to)) errors.push(`journey step: unknown to "${to}"`);
  }
}

const euSystems = [...euSystemsCode.matchAll(/\bkey:\s*"([a-z0-9-]+)"/g)].map(
  (m) => m[1]
);
const euRows = (euSystemsCode.match(/\bdimension:\s*\{/g) || []).length;
if (euSystems.length === 0) errors.push("euSystems: no systems defined");
if (euRows === 0) errors.push("euSystems: no matrix rows defined");
for (const k of euSystems) {
  const cells = (euSystemsCode.match(new RegExp(`\\b${k}:\\s*\\{`, "g")) || [])
    .length;
  if (cells !== euRows) {
    errors.push(
      `euSystems: system "${k}" has ${cells} cells for ${euRows} rows`
    );
  }
}

const hrTeams = (hrCode.match(/\bkey:\s*"([a-z0-9-]+)"/g) || []).length;
const payRows = (hrCode.match(/\broBand:\s*"/g) || []).length;
const payRowsEu = (hrCode.match(/\beuBand:\s*"/g) || []).length;
if (hrTeams === 0) errors.push("hr: no teams defined");
if (payRows === 0 || payRows !== payRowsEu) {
  errors.push(
    `hr: pay bands missing or ro/eu mismatch (${payRows} vs ${payRowsEu})`
  );
}

for (const [file, code] of [
  ["src/data/institutions.ts", instCode],
  ["src/data/flows.ts", flowsCode],
  ["src/data/stories.ts", storiesCode],
  ["src/data/journeys.ts", journeysCode],
  ["src/data/euSystems.ts", euSystemsCode],
  ["src/data/sources.ts", sourcesCode],
  ["src/data/hr.ts", hrCode],
]) {
  const roCount = (code.match(/ro:\s*"/g) || []).length;
  const enCount = (code.match(/en:\s*"/g) || []).length;
  if (roCount === 0) errors.push(`${file}: no Romanian strings`);
  if (roCount !== enCount)
    errors.push(`${file}: ro/en mismatch (${roCount} vs ${enCount})`);
}

for (const [file, code] of [
  ["src/data/institutions.ts", instCode],
  ["src/data/flows.ts", flowsCode],
]) {
  const withoutStrings = code.replace(/"(?:\\.|[^"\\])*"/g, '""');
  if (asciiRe.test(withoutStrings)) {
    errors.push(
      `${file}: identifiers/comments should be ASCII (diacritics allowed only inside string literals)`
    );
  }
}

// The site moved off GitHub Pages; only the dated history may name the old host.
const OLD_HOST = ["cristiannichifor", "github", "io"].join(".");
const HISTORY = new Set(["CHANGELOG.md", "ERRATA.md", "scripts/validate-data.mjs"]);
const tracked = execFileSync("git", ["ls-files"], { cwd: root, encoding: "utf8" })
  .split("\n")
  .filter((f) => f && !HISTORY.has(f) && !f.startsWith("docs/specs/"))
  .filter((f) => !/\.(png|jpe?g|webp|woff2?|ico|geojson)$|package-lock\.json$/.test(f));
for (const file of tracked) {
  let text;
  try {
    text = readFileSync(resolve(root, file), "utf8");
  } catch {
    continue;
  }
  if (text.toLowerCase().includes(OLD_HOST))
    errors.push(`${file}: still links ${OLD_HOST}; use projects.cristian-nichifor.com`);
}

const pkgVersion = JSON.parse(readFileSync(resolve(root, "package.json"), "utf8")).version;
const metaVersion = readTs("src/data/meta.ts").match(/version:\s*"([^"]+)"/)?.[1];
if (pkgVersion !== metaVersion)
  errors.push(`package.json version ${pkgVersion} differs from META.version ${metaVersion}`);

// Interface copy lives in src/locales; both languages carry the same keys.
const localeKeys = (lang) => {
  const code = readFileSync(resolve(root, `src/locales/${lang}.ts`), "utf8");
  const entries = new Map();
  for (const m of code.matchAll(/^\s*"([\w.-]+)":\s*"((?:[^"\\]|\\.)*)"/gm))
    entries.set(m[1], m[2]);
  // Values that prettier wraps onto the next line.
  for (const m of code.matchAll(/^\s*"([\w.-]+)":\s*\n\s*"((?:[^"\\]|\\.)*)"/gm))
    entries.set(m[1], m[2]);
  return entries;
};
const roUi = localeKeys("ro");
const enUi = localeKeys("en");
if (roUi.size === 0) errors.push("src/locales/ro.ts: no keys found");
for (const [a, b, name] of [
  [roUi, enUi, "en"],
  [enUi, roUi, "ro"],
]) {
  for (const key of a.keys())
    if (!b.has(key)) errors.push(`src/locales/${name}.ts: missing key "${key}"`);
}
for (const [name, entries] of [
  ["ro", roUi],
  ["en", enUi],
]) {
  for (const [key, value] of entries)
    if (!value.trim()) errors.push(`src/locales/${name}.ts: empty value for "${key}"`);
}
for (const file of ["src/App.tsx", "src/components/CompareView.tsx"]) {
  if (/lang === "ro"\s*\?\s*(\(|"[^"]{3,})/.test(readFileSync(resolve(root, file), "utf8")))
    errors.push(`${file}: interface copy belongs in src/locales, not inline`);
}

// Romanian copy translates the slogan instead of quoting English (ATL-18).
for (const file of ["src/data/flows.ts", "src/data/institutions.ts", "src/components/SummaryView.tsx"])
  if (/ro:\s*"[^"]*verify, don't trust|\? "[^"]*verify, don't trust/.test(readFileSync(resolve(root, file), "utf8")))
    errors.push(`${file}: Romanian copy quotes "verify, don't trust" in English`);

// County boundaries must come from an openly licensed source (ATL-1):
// GADM forbids redistribution, so none of its properties may remain.
const counties = JSON.parse(
  readFileSync(resolve(root, "public/data/ro-counties.geojson"), "utf8")
);
if (counties.features?.length !== 42)
  errors.push(`ro-counties.geojson: ${counties.features?.length} features, expected 42`);
const GADM_KEYS = ["ID_0", "NAME_0", "ID_1", "NAME_1", "ROU_adm1", "TYPE_1", "ENGTYPE_1"];
for (const f of counties.features ?? []) {
  const props = f.properties ?? {};
  const gadm = GADM_KEYS.filter((k) => k in props);
  if (gadm.length) {
    errors.push(`ro-counties.geojson: GADM properties ${gadm.join(", ")}`);
    break;
  }
  if (!props.name || !/^RO-[A-Z]{1,2}$/.test(props.iso ?? ""))
    errors.push(`ro-counties.geojson: feature without name/iso (${JSON.stringify(props)})`);
}

// Institution counties must use the GeoJSON names, diacritics included (ATL-14).
const countyNames = new Set((counties.features ?? []).map((f) => f.properties?.name));
for (const m of readTs("src/data/institutions.ts").matchAll(/\bcounty:\s*"([^"*]+)"/g))
  if (!countyNames.has(m[1]))
    errors.push(`src/data/institutions.ts: county "${m[1]}" is not a county name in ro-counties.geojson`);

// The footer's "data as of" date may not predate a source it relies on.
const dataAsOf = readTs("src/data/meta.ts").match(/dataAsOf:\s*"(\d{4}-\d{2}-\d{2})"/)?.[1];
const accessed = [...sourcesCode.matchAll(/\baccessed:\s*"([^"]*)"/g)].map((m) => m[1]);
for (const date of accessed)
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date))
    errors.push(`src/data/sources.ts: accessed "${date}" is not an ISO date`);
const newest = accessed.sort().at(-1);
if (!dataAsOf) errors.push("src/data/meta.ts: dataAsOf missing or not an ISO date");
else if (newest && dataAsOf < newest)
  errors.push(`META.dataAsOf ${dataAsOf} is older than the newest source access ${newest}`);

if (errors.length) {
  console.error("Data validation failed:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

console.log(
  `Data OK: ${inst.ids.length} institutions, ${flows.length} flows, ${storySteps.length} story steps, ${journeySteps.length} journey steps, ${euSystems.length} EU systems across ${euRows} dimensions, ${payRows} HR pay bands.`
);
