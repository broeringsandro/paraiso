import type { Metadata } from "next";
import { PageHero, CtaContato } from "../components/Pecas";
import { ApartamentosSecao, DiferenciaisSecao } from "../components/Secoes";

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
        img="sala-cozinha"
        alt="Sala integrada à cozinha de um apartamento"
      />
      <ApartamentosSecao cabecalho={false} />
      <DiferenciaisSecao />
      <CtaContato />
    </>
  );
}
