export const locales = ["pt", "en", "es"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

export const hasLocale = (l: string): l is Locale => (locales as readonly string[]).includes(l);

export const htmlLang: Record<Locale, string> = { pt: "pt-BR", en: "en", es: "es" };
export const ogLocale: Record<Locale, string> = { pt: "pt_BR", en: "en_US", es: "es_ES" };

// Português fica sem prefixo (URLs originais); inglês e espanhol usam /en e /es.
export function caminho(lang: Locale, path: string): string {
  if (lang === defaultLocale) return path;
  return path === "/" ? `/${lang}` : `/${lang}${path}`;
}

// Troca o idioma de um caminho já localizado. Ex.: /en/plantas -> /plantas
export function trocarIdioma(pathname: string, para: Locale): string {
  const sem = pathname.replace(/^\/(en|es)(?=\/|$)/, "") || "/";
  return caminho(para, sem);
}
