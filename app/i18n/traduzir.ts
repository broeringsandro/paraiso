import type { Locale } from "../lib/i18n";
import { en } from "./en";
import { es } from "./es";

const dicionarios: Record<Exclude<Locale, "pt">, Record<string, string>> = { en, es };

// Chave = texto original em português. Sem tradução, devolve o próprio texto.
export function criarT(lang: Locale) {
  if (lang === "pt") return (s: string) => s;
  const d = dicionarios[lang];
  return (s: string) => d[s] ?? s;
}
export type T = ReturnType<typeof criarT>;

// Marca textos de dados (arrays) para extração; a tradução acontece na renderização com t().
export const T = (s: string) => s;
