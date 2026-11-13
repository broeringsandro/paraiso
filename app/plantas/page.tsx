import type { Metadata } from "next";
import { paginaMeta } from "../lib/seo";
import Migalhas from "../components/Migalhas";
import { KeyRound, Layers, LayoutGrid } from "lucide-react";
import { PageHero } from "../components/Pecas";
import { PlantasSecao } from "../components/Secoes";

export const metadata: Metadata = paginaMeta({
  rota: "/plantas",
  titulo: "Plantas de 2 e 3 dormitórios | Paraíso das Águas",
  tituloSocial: "Paraíso das Águas | Plantas de 2 e 3 dormitórios",
  descricao: "Plantas dos apartamentos Tipo 01, 02 e 03, do pavimento tipo, do térreo, do subsolo e do ático do Paraíso das Águas, com a distribuição dos finais nas duas torres.",
});

export default function Pagina() {
  return (
    <>
      <Migalhas nome="Plantas" rota="/plantas" />
      <PageHero
        variante="lado"
        rotulo="Plantas"
        linhaUm="Três tipologias,"
        destaque="112 apartamentos."
        texto="Oito apartamentos por andar em cada torre, com dois elevadores por torre. Descubra em quais finais fica cada planta e amplie os detalhes."
        img="sala"
        alt="Sala de um apartamento do Paraíso das Águas"
        fatos={[
          { n: "3", l: "tipologias", icone: LayoutGrid },
          { n: "8", l: "por andar", icone: Layers },
          { n: "112", l: "apartamentos", icone: KeyRound },
        ]}
      />
      <PlantasSecao cabecalho={false} />
    </>
  );
}
