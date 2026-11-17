import { lang } from "next/root-params";
import { hasLocale, type Locale } from "../lib/i18n";
import { criarT } from "./traduzir";

export async function getLang(): Promise<Locale> {
  const l = await lang();
  return hasLocale(l) ? l : "pt";
}

export async function getT() {
  return criarT(await getLang());
}
