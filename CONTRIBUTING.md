# Ghid de contribuție / Contributing

Proiectul respectă regulile comunității [CivicTech România](https://civictechro.github.io/guidelines/)
(Open Source Guidelines) și standardele [Digital Services Playbook](https://civictechro.github.io/playbook/).
Cele mai importante, pentru acest repo:

- **Cod în engleză** — identificatori, mesaje de commit, comentarii.
- **Conținutul în română folosește diacritice.**
- **i18n obligatoriu**: fiecare câmp din `src/data/*.ts` este `{ ro, en }`. Când adaugi un flux,
  o instituție sau o poveste, completează ambele limbi.
- **Teste nelipsite**: `npm test` validează integritatea datelor (noduri/legături existente,
  echilibrul ro/en). Rularea testelor face parte din CI.
- **Licență** în fiecare fișier sursă preluat din altă parte (vezi Surse).

## Cum propui o schimbare

1. Deschide un issue — „corectează o dată”, „propune un flux nou”, „adaugă o poveste”.
2. Editează doar fișierele din `src/data/` pentru conținut; componentele doar dacă e necesar.
3. Rulează `npm test` și `npm run build` înainte de commit.
4. Deschide un pull request; explică sursa afirmației (vezi tab-ul Surse — fiecare rând are
   proveniență).

## Corecturi și dezbatere publică

- **Eroare factuală** (afirmații „actuale”, surse, cifre): deschide un issue cu șablonul
  **Correction** sau scrie autorului (vezi `AUTHORS.md`). Corecturile acceptate apar public în
  `ERRATA.md`, cu data și versiunea — niciodată pliate pe ascuns în date.
- **Dezacord cu propunerea**: nu e eroare; deschide un issue **Design discussion**. Cele mai
  serioase contra-argumente ajung în secțiunea „steelman” din tab-ul Analiză.
- **Metodologie**: `docs/METHODOLOGY.md` explică de unde vin cifrele și ce NU pretind ele
  (estimări de design, nu bugete).
- **Citare**: citează site-ul cu versiunea și data din subsol (ex. „v0.2.0, date la 2026-09-11”);
  pentru cifrele UAT folosește un link `?scenario=…` — vezi metodologia.

## Structura datelor

- `src/data/institutions.ts` — noduri (`{ ro, en }` pentru nume și rol)
- `src/data/flows.ts` — muchii (from/to = id-uri de instituții, kind, status current/proposed)
- `src/data/stories.ts` — povești de cetățean (pașii referă id-uri de instituții)
- `src/data/comparison.ts`, `timeline.ts`, `strategy.ts`, `sources.ts` — conținut bilingv
- `src/data/meta.ts` — versiunea, data „as of” și autorul (subsolul site-ului)
