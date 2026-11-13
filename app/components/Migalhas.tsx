import JsonLd from "./JsonLd";
import { SITE_URL } from "../lib/site";

// BreadcrumbList (Início > página) para as subpáginas.
export default function Migalhas({ nome, rota }: { nome: string; rota: string }) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Início", item: SITE_URL + "/" },
          { "@type": "ListItem", position: 2, name: nome, item: SITE_URL + rota },
        ],
      }}
    />
  );
}
