// Locked snapshot of the administrative-reform-simulator default scenario.
//
// Source (published): https://cristiannichifor.github.io/romania-reforms/administrativ/
// Repo: https://github.com/CristianNichifor/romania-reforms (simulators/administrativ)
// Scenario: default parameters — 3,186 UATs collapse to 682 regions (-78.6%).
//
// This is only the fallback: when the reform page is open in another tab of
// the same browser, it publishes every scenario result under
// localStorage["reforma-administrativa:scenario"] and the atlas recomputes
// its figures live (see src/lib/uatPlan.tsx).

export const UAT_SNAPSHOT = {
  baseline: 3186,
  units: 682,
  reductionPct: 78.6,
  source: "https://cristiannichifor.github.io/romania-reforms/administrativ/",
} as const;
