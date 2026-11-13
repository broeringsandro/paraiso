import type { Metadata } from "next";
import { PageHero, CtaContato } from "../components/Pecas";
import { HomeClubSecao, SemSairSecao } from "../components/Secoes";

export const metadata: Metadata = {
  title: "Home club",
  description:
    "Piscina com deck, academia, coworking, cinema, espaço gamer, brinquedoteca, playground e 4 salões de festas dentro do seu condomínio.",
};

export default function Pagina() {
  return (
    <>
      <PageHero
        rotulo="Home club"
        linhaUm="Um clube completo"
        destaque="dentro do seu condomínio."
        texto="Trabalhe, treine, celebre e relaxe sem sair de casa."
        img="piscina"
        alt="Piscina com deck do Paraíso das Águas"
      />
      <HomeClubSecao cabecalho={false} />
      <SemSairSecao />
      <CtaContato />
    </>
  );
}
