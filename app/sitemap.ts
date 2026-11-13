import type { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site";

const rotas = ["", "/empreendimento", "/home-club", "/apartamentos", "/plantas", "/localizacao", "/andamento-da-obra", "/contato"];

export default function sitemap(): MetadataRoute.Sitemap {
  return rotas.map((r) => ({
    url: SITE_URL + r,
    lastModified: new Date(),
    changeFrequency: r === "/andamento-da-obra" ? "weekly" : "monthly",
    priority: r === "" ? 1 : 0.7,
  }));
}
