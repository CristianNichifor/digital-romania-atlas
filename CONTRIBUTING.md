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

## Structura datelor

- `src/data/institutions.ts` — noduri (`{ ro, en }` pentru nume și rol)
- `src/data/flows.ts` — muchii (from/to = id-uri de instituții, kind, status current/proposed)
- `src/data/stories.ts` — povești de cetățean (pașii referă id-uri de instituții)
- `src/data/comparison.ts`, `timeline.ts`, `strategy.ts`, `sources.ts` — conținut bilingv
