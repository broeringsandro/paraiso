import type { Metadata } from "next";
import { NOME_SITE } from "./site";
import { caminho, locales, ogLocale, type Locale } from "./i18n";
import { criarT } from "../i18n/traduzir";

// Canonical do idioma atual + hreflang para os três idiomas.
export function alternativas(lang: Locale, rota: string) {
  return {
    canonical: caminho(lang, rota),
    languages: {
      ...Object.fromEntries(locales.map((l) => [l === "pt" ? "pt-BR" : l, caminho(l, rota)])),
      "x-default": caminho("pt", rota),
    },
  };
}

// Metadata completa de uma subpágina: título absoluto, canonical, hreflang e Open Graph/Twitter próprios.
// Os textos chegam em português e são traduzidos pelo dicionário.
export function paginaMeta({
  lang,
  rota,
  titulo,
  descricao,
  tituloSocial,
}: {
  lang: Locale;
  rota: string;
  titulo: string;
  descricao: string;
  tituloSocial?: string;
}): Metadata {
  const t = criarT(lang);
  const social = t(tituloSocial ?? titulo);
  const desc = t(descricao);
  return {
    title: { absolute: t(titulo) },
    description: desc,
    alternates: alternativas(lang, rota),
    openGraph: {
      title: social,
      description: desc,
      url: caminho(lang, rota),
      siteName: NOME_SITE,
      locale: ogLocale[lang],
      type: "website",
      images: ["/img/fachada-08.jpg"],
    },
    twitter: { card: "summary_large_image", title: social, description: desc, images: ["/img/fachada-08.jpg"] },
  };
}
