import { useMemo } from "react";
import { GLOSSARY } from "../data/glossary";
import { useLang } from "../i18n";

const INDEX = new Map<string, { text: string; textEn: string; tip: (lang: "ro" | "en") => string }>();
for (const g of GLOSSARY) {
  INDEX.set(g.term, {
    text: g.text.ro,
    textEn: g.text.en,
    tip: (lang) =>
      (lang === "ro" ? g.text.ro : g.text.en) +
      (g.detail ? " — " + (lang === "ro" ? g.detail.ro : g.detail.en) : ""),
  });
}
const TERMS = [...INDEX.keys()].sort((a, b) => b.length - a.length);

type Part = string | { t: string; term: string };

function classify(token: string): Part {
  const lower = token.toLowerCase();
  for (const term of TERMS) {
    if (!lower.startsWith(term.toLowerCase())) continue;
    const next = token[term.length];
    if (next !== undefined && /[A-Za-z0-9\u00C0-\u024F]/.test(next)) continue;
    return { t: token.slice(0, term.length), term };
  }
  return token;
}

function tokenize(text: string): Part[] {
  const out: Part[] = [];
  const re = /\S+/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    out.push(classify(m[0]));
    last = m.index + m[0].length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function T({ text }: { text: string }) {
  const { lang } = useLang();
  const parts = useMemo(() => tokenize(text), [text]);
  return (
    <>
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <span key={i}>{p}</span>
        ) : (
          <span key={i} className="acro" data-tip={INDEX.get(p.term)!.tip(lang)}>
            {p.t}
          </span>
        )
      )}
    </>
  );
}
