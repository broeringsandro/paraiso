import type { Metadata } from "next";
import { paginaMeta } from "../lib/seo";
import Migalhas from "../components/Migalhas";
import { PageHero, CtaContato } from "../components/Pecas";
import { ObraSecao } from "../components/Secoes";
import { Cronograma, FotosObra } from "../components/Blocos";

export const metadata: Metadata = paginaMeta({
  rota: "/andamento-da-obra",
  titulo: "Andamento da Obra | Paraíso das Águas",
  tituloSocial: "Paraíso das Águas | Andamento da obra",
  descricao: "Acompanhe a evolução da construção do Paraíso das Águas, etapa por etapa.",
});

export default function Pagina() {
  return (
    <>
      <Migalhas nome="Obra" rota="/andamento-da-obra" />
      <PageHero
        variante="lado"
        rotulo="Obra"
        linhaUm="Acompanhe"
        destaque="a evolução."
        texto="Transparência em todas as etapas: veja em que fase está a construção do Paraíso das Águas."
        img="fachada-12"
        alt="Imagem ilustrativa da fachada do Paraíso das Águas"
      />
      <ObraSecao cabecalho={false} />
      <Cronograma />
      <FotosObra />
      <CtaContato />
    </>
  );
}
