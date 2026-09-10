import { JOURNEYS, VARIANT_LABEL, type JourneyStep } from "../data/journeys";
import { INSTITUTIONS } from "../data/institutions";
import { pick, useLang } from "../i18n";
import { T } from "./T";

function acronym(id: string): string {
  return INSTITUTIONS.find((i) => i.id === id)?.acronym ?? id;
}

function tipFor(id: string, lang: "ro" | "en"): string {
  const inst = INSTITUTIONS.find((i) => i.id === id);
  if (!inst) return id;
  return `${pick(inst.name, lang)} — ${pick(inst.role, lang)}`;
}

function StepRow({ step, index }: { step: JourneyStep; index: number }) {
  const { lang } = useLang();
  const variant = step.variant ?? "standard";
  return (
    <div className={`journey-step v-${variant}`}>
      <span className="journey-num">{index + 1}</span>
      <div className="journey-step-body">
        <div className="journey-step-actors">
          <span className="step-node" data-tip={tipFor(step.from, lang)}>
            {acronym(step.from)}
          </span>
          <span className="step-arrow">→</span>
          <span className="step-node" data-tip={tipFor(step.to, lang)}>
            {acronym(step.to)}
          </span>
          {variant !== "standard" && (
            <span className={`journey-badge v-${variant}`}>
              <T text={pick(VARIANT_LABEL[variant], lang)} />
            </span>
          )}
        </div>
        <p className="journey-step-label">
          <T text={pick(step.label, lang)} />
        </p>
        {step.tech && (
          <p className="journey-step-tech muted">
            <T text={pick(step.tech, lang)} />
          </p>
        )}
      </div>
    </div>
  );
}

export function JourneysView() {
  const { lang } = useLang();
  return (
    <div className="panel journeys">
      <div className="panel-head">
        <h2>
          {lang === "ro"
            ? "Pașii cetățeanului — diagrame de flux"
            : "Citizen journeys — flow diagrams"}
        </h2>
      </div>
      <p className="muted note">
        {lang === "ro" ? (
          <>
            Cele patru trasee care decid totul: înrolare, autentificare,
            pierderea telefonului și cheia hardware opțională. Fiecare pas e o
            diagramă — actorii sunt instituțiile reale din arhitectura noastră,
            iar liniile portocalii marchează pașii opționali sau planul B.
          </>
        ) : (
          <>
            The four journeys that decide everything: enrollment, sign-in, a
            lost phone and the optional hardware key. Each step is a diagram —
            the actors are the real institutions in our architecture, and the
            orange lines mark optional or plan-B steps.
          </>
        )}
      </p>
      <div className="journey-grid">
        {JOURNEYS.map((j) => (
          <article key={j.id} className="journey">
            <div className="journey-head">
              <h3>
                <T text={pick(j.title, lang)} />
              </h3>
              <p className="muted">
                <T text={pick(j.intro, lang)} />
              </p>
            </div>
            <div className="journey-steps">
              {j.steps.map((st, i) => (
                <StepRow key={i} step={st} index={i} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
