import type { Metadata } from "next";
import { PageHero, CtaContato } from "../components/Pecas";
import { ObraSecao } from "../components/Secoes";

export const metadata: Metadata = {
  title: "Andamento da obra",
  description: "Acompanhe a evolução da construção do Paraíso das Águas, etapa por etapa.",
};

export default function Pagina() {
  return (
    <>
      <PageHero
        rotulo="Andamento da obra"
        linhaUm="Acompanhe"
        destaque="a evolução."
        texto="Transparência em todas as etapas: veja em que fase está a construção do Paraíso das Águas."
        img="fachada-06"
        alt="Imagem ilustrativa da fachada do Paraíso das Águas"
      />
      <ObraSecao cabecalho={false} />
      <CtaContato />
    </>
  );
}
