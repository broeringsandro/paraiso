import type { Metadata } from "next";
import { BedDouble, Building2, KeyRound } from "lucide-react";
import { PageHero, CtaContato } from "../components/Pecas";
import { AleSecao, DestaquesSecao } from "../components/Secoes";
import { FichaTecnica, Transparencia } from "../components/Blocos";
import PredioCorte from "../components/PredioCorte";

export const metadata: Metadata = {
  title: "Projeto",
  description:
    "Duas torres, 112 apartamentos, subsolo, térreo, 7 pavimentos tipo e ático. Conheça a ficha técnica do Paraíso das Águas, em Santo Amaro da Imperatriz.",
};

export default function Pagina() {
  return (
    <>
      <PageHero
        variante="lado"
        rotulo="Projeto"
        linhaUm="Um refúgio onde a água"
        destaque="desacelera o tempo."
        texto="O Paraíso das Águas é o primeiro e maior home club de Santo Amaro da Imperatriz: duas torres residenciais com lazer completo para viver, trabalhar, cuidar da saúde e se divertir sem sair de casa."
        img="fachada-08"
        alt="Vista aérea das duas torres do Paraíso das Águas"
        fatos={[
          { n: "2", l: "torres", icone: Building2 },
          { n: "112", l: "apartamentos", icone: KeyRound },
          { n: "2 e 3", l: "dormitórios, com suíte", icone: BedDouble },
        ]}
      />
      <FichaTecnica />
      <PredioCorte />
      <DestaquesSecao />
      <Transparencia />
      <AleSecao />
      <CtaContato />
    </>
  );
}
