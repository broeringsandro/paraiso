import type { Metadata } from "next";
import { PageHero, CtaContato } from "../components/Pecas";
import { ObraSecao } from "../components/Secoes";
import { Cronograma, FotosObra } from "../components/Blocos";

export const metadata: Metadata = {
  title: "Obra",
  description: "Acompanhe a evolução da construção do Paraíso das Águas, etapa por etapa.",
};

export default function Pagina() {
  return (
    <>
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
