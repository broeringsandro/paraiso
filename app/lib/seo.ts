import type { Metadata } from "next";
import { NOME_SITE } from "./site";

// Metadata completa de uma subpágina: título absoluto, canonical e Open Graph/Twitter próprios.
export function paginaMeta({
  rota,
  titulo,
  descricao,
  tituloSocial,
}: {
  rota: string;
  titulo: string;
  descricao: string;
  tituloSocial?: string;
}): Metadata {
  const social = tituloSocial ?? titulo;
  return {
    title: { absolute: titulo },
    description: descricao,
    alternates: { canonical: rota },
    openGraph: {
      title: social,
      description: descricao,
      url: rota,
      siteName: NOME_SITE,
      locale: "pt_BR",
      type: "website",
      images: ["/img/fachada-08.jpg"],
    },
    twitter: { card: "summary_large_image", title: social, description: descricao, images: ["/img/fachada-08.jpg"] },
  };
}
