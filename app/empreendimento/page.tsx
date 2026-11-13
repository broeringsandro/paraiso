import type { Metadata } from "next";
import { PageHero, CtaContato } from "../components/Pecas";
import { AleSecao, DestaquesSecao, EmpreendimentoSecao } from "../components/Secoes";

export const metadata: Metadata = {
  title: "O empreendimento",
  description:
    "Paraíso das Águas: duas torres, 112 apartamentos de 2 e 3 dormitórios com suíte e o primeiro e maior home club de Santo Amaro da Imperatriz.",
};

export default function Pagina() {
  return (
    <>
      <PageHero
        rotulo="O empreendimento"
        linhaUm="Um refúgio onde a água"
        destaque="desacelera o tempo."
        texto="Duas torres residenciais com lazer completo para viver, trabalhar, cuidar da saúde e se divertir sem sair de casa."
        img="fachada-08"
        alt="Vista das duas torres do Paraíso das Águas"
      />
      <EmpreendimentoSecao />
      <DestaquesSecao />
      <AleSecao />
      <CtaContato />
    </>
  );
}
