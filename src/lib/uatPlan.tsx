import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { UAT_SNAPSHOT } from "../data/uatPlanSnapshot";
import { useLang } from "../i18n";

export interface UatPlan {
  units: number;
  baseline: number;
  live: boolean;
  url?: string;
}

export interface UatPlanCtx {
  plan: UatPlan;
  /** Replace {units} / {baseline} placeholders in a data string. */
  fill: (text: string) => string;
  /** Locale-formatted integer (ro: 3.186 · en: 3,186). */
  fmtUnits: (n: number) => string;
}

export const LIVE_KEY = "reforma-administrativa:scenario";

const Ctx = createContext<UatPlanCtx | null>(null);

function parseLive(raw: string | null): UatPlan | null {
  if (!raw) return null;
  try {
    const d = JSON.parse(raw) as {
      units?: unknown;
      baseline?: unknown;
      url?: unknown;
    };
    const units = Number(d.units);
    if (!Number.isFinite(units) || units <= 0) return null;
    const baseline = Number(d.baseline);
    return {
      units: Math.round(units),
      baseline:
        Number.isFinite(baseline) && baseline > 0
          ? Math.round(baseline)
          : UAT_SNAPSHOT.baseline,
      live: true,
      url: typeof d.url === "string" ? d.url : undefined,
    };
  } catch {
    return null;
  }
}

function readPlan(): UatPlan {
  if (typeof localStorage !== "undefined") {
    const live = parseLive(localStorage.getItem(LIVE_KEY));
    if (live) return live;
  }
  return {
    units: UAT_SNAPSHOT.units,
    baseline: UAT_SNAPSHOT.baseline,
    live: false,
  };
}

export function UatPlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<UatPlan>(() => readPlan());
  const { lang } = useLang();

  useEffect(() => {
    const sync = () => setPlan(readPlan());
    window.addEventListener("storage", sync);
    const id = window.setInterval(sync, 1500);
    return () => {
      window.removeEventListener("storage", sync);
      window.clearInterval(id);
    };
  }, []);

  const value = useMemo<UatPlanCtx>(() => {
    const fmtUnits = (n: number) =>
      n.toLocaleString(lang === "ro" ? "ro-RO" : "en-US");
    return {
      plan,
      fmtUnits,
      fill: (text: string) =>
        text
          .split("{units}")
          .join(fmtUnits(plan.units))
          .split("{baseline}")
          .join(fmtUnits(plan.baseline)),
    };
  }, [plan, lang]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useUatPlan(): UatPlanCtx {
  const v = useContext(Ctx);
  if (!v) throw new Error("useUatPlan must be used inside UatPlanProvider");
  return v;
}

/** Millions with a comma decimal, dropping a trailing zero: 0.682 -> "0,7". */
const mStr = (v: number): string => {
  const s = v.toFixed(1);
  return (s.endsWith(".0") ? s.slice(0, -2) : s).replace(".", ",");
};

/** L0 rollout: 8 weeks per unit, 1.5–2.75 k€/week in services + training. */
export const uatRollout = (p: UatPlan): string =>
  `${mStr((p.units * 12000) / 1e6)}–${mStr((p.units * 22000) / 1e6)}M €`;

/** L0 mini-servers: 1–1,5 k€ per unit. */
export const uatMiniTotal = (p: UatPlan): string =>
  `${mStr((p.units * 1000) / 1e6)}–${mStr((p.units * 1500) / 1e6)}M €`;

/** L0 UPS + solar: 300–500 € per unit. */
export const uatUpsTotal = (p: UatPlan): string =>
  `${mStr((p.units * 300) / 1e6)}–${mStr((p.units * 500) / 1e6)}M €`;

export function UatPlanNote() {
  const { lang } = useLang();
  const { plan, fmtUnits } = useUatPlan();
  const source = UAT_SNAPSHOT.source;
  return (
    <p className={`muted note uat-note${plan.live ? " live" : ""}`}>
      {lang === "ro" ? (
        plan.live ? (
          <>
            Conectat la harta reformei administrative: ≈{fmtUnits(plan.units)}{" "}
            unități (de la ≈{fmtUnits(plan.baseline)}) — cifrele de pe această
            pagină se recalculează automat când ajustezi harta în celălalt tab.{" "}
            <a href={source} target="_blank" rel="noreferrer">
              Deschide harta reformei
            </a>
            .
          </>
        ) : (
          <>
            Plan UAT: scenariul implicit (blocat) al reformei administrative — ≈
            {fmtUnits(plan.units)} unități, de la ≈{fmtUnits(plan.baseline)}.
            Deschide{" "}
            <a href={source} target="_blank" rel="noreferrer">
              harta reformei
            </a>{" "}
            în alt tab și ajustează parametrii: toate cifrele de aici se
            actualizează automat.
          </>
        )
      ) : plan.live ? (
        <>
          Connected to the administrative-reform map: ≈{fmtUnits(plan.units)}{" "}
          units (from ≈{fmtUnits(plan.baseline)}) — the figures on this page
          recompute automatically as you adjust the map in the other tab.{" "}
          <a href={source} target="_blank" rel="noreferrer">
            Open the reform map
          </a>
          .
        </>
      ) : (
        <>
          UAT plan: the default (locked) administrative-reform scenario — ≈
          {fmtUnits(plan.units)} units, down from ≈{fmtUnits(plan.baseline)}.
          Open the{" "}
          <a href={source} target="_blank" rel="noreferrer">
            reform map
          </a>{" "}
          in another tab and adjust the parameters: every figure here updates
          automatically.
        </>
      )}
    </p>
  );
}
