import { createContext, useContext } from "react";
import { messages, type MessageKey } from "./locales";

export type Lang = "ro" | "en";

export interface Bi {
  ro: string;
  en: string;
}

export interface LangState {
  lang: Lang;
  setLang: (l: Lang) => void;
}

export const LangContext = createContext<LangState>({
  lang: "ro",
  setLang: () => {},
});

export const useLang = () => useContext(LangContext);

export const pick = (b: Bi, lang: Lang) => b[lang];

/** Interface copy for the current language, from src/locales. */
export const useT = () => {
  const { lang } = useLang();
  return (key: MessageKey) => messages[lang][key];
};
