import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const readTs = (p) => {
  const raw = readFileSync(resolve(root, p), "utf8");
  return raw.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
};

const asciiRe = /[^\x00-\x7F]/;
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

if (errors.length) {
  console.error("Data validation failed:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

console.log(
  `Data OK: ${inst.ids.length} institutions, ${flows.length} flows, ${storySteps.length} story steps, ${journeySteps.length} journey steps, ${euSystems.length} EU systems across ${euRows} dimensions, ${payRows} HR pay bands.`
);
