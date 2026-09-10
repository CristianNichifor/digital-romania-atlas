import { COMPARISON } from "../data/comparison";
import { META } from "../data/meta";
import { SOURCES } from "../data/sources";
import { TIMELINE } from "../data/timeline";

function download(filename: string, blob: Blob): void {
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
  requestAnimationFrame(() => URL.revokeObjectURL(link.href));
}

const csvCell = (value: string): string => `"${value.replace(/"/g, '""')}"`;

function toCsv(rows: string[][]): string {
  return rows.map((r) => r.map(csvCell).join(",")).join("\r\n");
}

/** Press-kit JSON: everything a journalist needs to reuse the figures. */
export function downloadPressJson(): void {
  const payload = {
    meta: META,
    generated: new Date().toISOString(),
    sources: SOURCES,
    comparison: COMPARISON,
    timeline: TIMELINE,
  };
  download(
    `digital-romania-atlas-${META.version}.json`,
    new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" })
  );
}

/** Press-kit CSV: one flat table of the provenance rows. */
export function downloadPressCsv(): void {
  const rows: string[][] = [
    ["section", "item_ro", "item_en", "detail_ro", "detail_en", "url"],
    ...SOURCES.map((s) => [
      "source",
      s.claim.ro,
      s.claim.en,
      `${s.kind.ro}${s.note ? ` — ${s.note.ro}` : ""}`,
      `${s.kind.en}${s.note ? ` — ${s.note.en}` : ""}`,
      s.url ?? "",
    ]),
    ...COMPARISON.map((c) => [
      "comparison",
      c.dimension.ro,
      c.dimension.en,
      `${c.current.ro} ||| ${c.proposed.ro}`,
      `${c.current.en} ||| ${c.proposed.en}`,
      "",
    ]),
    ...TIMELINE.map((t) => [
      "timeline",
      `${t.date} — ${t.title.ro}`,
      `${t.date} — ${t.title.en}`,
      t.detail.ro,
      t.detail.en,
      "",
    ]),
  ];
  download(
    `digital-romania-atlas-${META.version}.csv`,
    new Blob(["\uFEFF" + toCsv(rows)], { type: "text/csv;charset=utf-8" })
  );
}
