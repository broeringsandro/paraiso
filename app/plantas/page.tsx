import type { Metadata } from "next";
import { PageHero } from "../components/Pecas";
import { PlantasSecao } from "../components/Secoes";

export const metadata: Metadata = {
  title: "Plantas",
  description:
    "Plantas dos apartamentos Tipo 01, 02 e 03, do pavimento tipo, do térreo, do subsolo e do ático do Paraíso das Águas.",
};

export default function Pagina() {
  return (
    <>
      <PageHero
        rotulo="Plantas"
        linhaUm="Três tipologias,"
        destaque="112 apartamentos."
        texto="Oito apartamentos por andar em cada torre, com dois elevadores por torre. Escolha uma planta para ver os detalhes e ampliar."
        img="sala"
        alt="Sala de um apartamento do Paraíso das Águas"
      />
      <PlantasSecao cabecalho={false} />
    </>
  );
}
