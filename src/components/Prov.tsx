import { META } from "../data/meta";
import { useT } from "../i18n";

/** Per-view provenance line: where the data comes from and how fresh it is. */
export function Prov() {
  const t = useT();
  return (
    <p className="prov muted">
      {t("prov.label")}{" "}
      <a href="#/sources" style={{ color: "#9db9f5" }}>
        {t("prov.sources")}
      </a>{" "}
      · {t("prov.updated")}{" "}
      <time dateTime={META.dataAsOf}>{META.dataAsOf}</time>
    </p>
  );
}
