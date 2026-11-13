import type { Metadata } from "next";
import { PageHero } from "../components/Pecas";
import { PlantasSecao } from "../components/Secoes";
import MapaFinais from "../components/MapaFinais";

export const metadata: Metadata = {
  title: "Plantas",
  description:
    "Plantas dos apartamentos Tipo 01, 02 e 03, do pavimento tipo, do térreo, do subsolo e do ático do Paraíso das Águas, com a distribuição dos finais nas duas torres.",
};

export default function Pagina() {
  return (
    <>
      <PageHero
        variante="lado"
        rotulo="Plantas"
        linhaUm="Três tipologias,"
        destaque="112 apartamentos."
        texto="Oito apartamentos por andar em cada torre, com dois elevadores por torre. Descubra em quais finais fica cada planta e amplie os detalhes."
        img="sala"
        alt="Sala de um apartamento do Paraíso das Águas"
        fatos={[
          { n: "3", l: "tipologias" },
          { n: "8", l: "por andar" },
          { n: "112", l: "apartamentos" },
        ]}
      />
      <MapaFinais />
      <PlantasSecao cabecalho={false} />
    </>
  );
}
