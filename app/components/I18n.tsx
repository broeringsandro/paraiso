"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { criarT, type T } from "../i18n/traduzir";
import { caminho, type Locale } from "../lib/i18n";

const Ctx = createContext<{ lang: Locale; t: T }>({ lang: "pt", t: (s) => s });

export function I18nProvider({ lang, children }: { lang: Locale; children: ReactNode }) {
  const v = useMemo(() => ({ lang, t: criarT(lang) }), [lang]);
  return <Ctx.Provider value={v}>{children}</Ctx.Provider>;
}

export const useT = () => useContext(Ctx).t;
export const useLang = () => useContext(Ctx).lang;
// Caminho com o prefixo do idioma atual.
export function useCaminho() {
  const lang = useLang();
  return (path: string) => caminho(lang, path);
}
