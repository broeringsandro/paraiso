import JsonLd from "./JsonLd";
import { SITE_URL } from "../lib/site";
import { caminho } from "../lib/i18n";
import { getLang, getT } from "../i18n/server";

// BreadcrumbList (Início > página) para as subpáginas.
export default async function Migalhas({ nome, rota }: { nome: string; rota: string }) {
  const t = await getT();
  const lang = await getLang();
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: t("Início"), item: SITE_URL + caminho(lang, "/") },
          { "@type": "ListItem", position: 2, name: t(nome), item: SITE_URL + caminho(lang, rota) },
        ],
      }}
    />
  );
}
