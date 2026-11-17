import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";
import { caminho, locales } from "./lib/i18n";

const rotas = ["/", "/empreendimento", "/home-club", "/apartamentos", "/plantas", "/localizacao", "/andamento-da-obra", "/contato"];

// Uma entrada por idioma, cada uma apontando as versões equivalentes (hreflang).
export default function sitemap(): MetadataRoute.Sitemap {
  return rotas.flatMap((r) =>
    locales.map((lang) => ({
      url: SITE_URL + caminho(lang, r === "/" ? "/" : r).replace(/^\/$/, ""),
      lastModified: new Date(),
      changeFrequency: (r === "/andamento-da-obra" ? "weekly" : "monthly") as "weekly" | "monthly",
      priority: r === "/" ? 1 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          locales.map((l) => [l === "pt" ? "pt-BR" : l, SITE_URL + caminho(l, r).replace(/^\/$/, "")]),
        ),
      },
    })),
  );
}
