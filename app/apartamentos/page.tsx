import type { Metadata } from "next";
import { BedDouble, Layers, Ruler, SquareParking } from "lucide-react";
import { PageHero, CtaContato } from "../components/Pecas";
import { ApartamentosSecao } from "../components/Secoes";
import { GaleriaApto, TipologiasResumo } from "../components/Blocos";
import Especificacoes from "../components/Especificacoes";

export const metadata: Metadata = {
  title: "Apartamentos",
  description:
    "Apartamentos de 2 e 3 dormitórios com suíte, sacada com churrasqueira, persianas automatizadas, fechadura eletrônica e todas as garagens cobertas.",
};

export default function Pagina() {
  return (
    <>
      <PageHero
        rotulo="Apartamentos"
        linhaUm="Ambientes feitos para"
        destaque="viver bem."
        texto="Apartamentos de 2 e 3 dormitórios com suíte, salas integradas, muita luz natural e sacada com churrasqueira."
        img="sala"
        alt="Sala de estar de um apartamento com vista para a serra"
        fatos={[
          { n: "2 e 3", l: "dormitórios, com suíte", icone: BedDouble },
          { n: "68 a 91 m²", l: "de área privativa", icone: Ruler },
          { n: "8", l: "apartamentos por andar", icone: Layers },
          { n: "100%", l: "das garagens cobertas", icone: SquareParking },
        ]}
      />
      <TipologiasResumo />
      <ApartamentosSecao cabecalho={false} />
      <GaleriaApto />
      <Especificacoes />
      <CtaContato />
    </>
  );
}
