import type { Metadata } from "next";
import { paginaMeta } from "../lib/seo";
import Migalhas from "../components/Migalhas";
import { BookOpen, Blocks, Building2, Clapperboard, Dices, Dumbbell, Gamepad2, Laptop, PartyPopper, Sofa, Sunset, Waves } from "lucide-react";
import { PageHero, CtaContato } from "../components/Pecas";
import { CategoriaLazer, PlantasDoLazer } from "../components/Blocos";

export const metadata: Metadata = paginaMeta({
  rota: "/home-club",
  titulo: "Home Club e Lazer | Paraíso das Águas",
  tituloSocial: "Paraíso das Águas | Home club completo em Santo Amaro da Imperatriz",
  descricao: "Piscina com deck, academia, coworking, cinema, espaço gamer, brinquedoteca, playground e 4 salões de festas: o primeiro e maior home club de Santo Amaro da Imperatriz.",
});

export default function Pagina() {
  return (
    <>
      <Migalhas nome="Lazer" rota="/home-club" />
      <PageHero
        rotulo="Lazer"
        linhaUm="Um clube completo"
        destaque="dentro do seu condomínio."
        texto="Trabalhe, treine, celebre e relaxe sem sair de casa."
        img="piscina"
        alt="Piscina com deck do Paraíso das Águas"
        apoio={{ img: "cinema", alt: "Cinema do Paraíso das Águas" }}
        fatos={[
          { n: "4", l: "salões de festas", icone: PartyPopper },
          { n: "3", l: "espaços no ático", icone: Building2 },
          { n: "2", l: "lounges, coberto e descoberto", icone: Sofa },
        ]}
      />

      <CategoriaLazer
        c={{
          rotulo: "Bem-estar",
          linhaUm: "Cuide da saúde",
          destaque: "sem sair de casa.",
          texto: "Piscina com deck e academia no mesmo clube, com lounges coberto e descoberto e terraço externo para aproveitar o fim de tarde.",
          itens: [
            { icone: Waves, nome: "Piscina com deck" },
            { icone: Dumbbell, nome: "Academia" },
            { icone: Sofa, nome: "Lounge coberto" },
            { icone: Sofa, nome: "Lounge descoberto" },
            { icone: Sunset, nome: "Terraço externo" },
          ],
          imagens: [{ img: "academia", alt: "Academia" }],
        }}
      />

      <CategoriaLazer
        invertido
        fundo="branco"
        c={{
          rotulo: "Trabalho",
          linhaUm: "Trabalhe",
          destaque: "a um andar de casa.",
          texto: "Coworking e academia no mesmo clube: produtividade e bem-estar sem sair de casa. Feche o notebook, desça um andar e comece o treino.",
          itens: [
            { icone: Laptop, nome: "Coworking" },
            { icone: BookOpen, nome: "Biblioteca" },
          ],
          imagens: [
            { img: "coworking-01", alt: "Coworking" },
            { img: "coworking-02", alt: "Biblioteca e coworking" },
          ],
        }}
      />

      <CategoriaLazer
        c={{
          rotulo: "Diversão",
          linhaUm: "Cinema, games",
          destaque: "e jogos.",
          texto: "Cinema e espaço gamer no ático, e uma sala de jogos para reunir a turma.",
          itens: [
            { icone: Clapperboard, nome: "Cinema" },
            { icone: Gamepad2, nome: "Espaço gamer" },
            { icone: Dices, nome: "Sala de jogos" },
          ],
          imagens: [
            { img: "cinema", alt: "Cinema" },
            { img: "gamer", alt: "Espaço gamer" },
            { img: "jogos", alt: "Sala de jogos" },
          ],
        }}
      />

      <CategoriaLazer
        invertido
        fundo="branco"
        c={{
          rotulo: "Família",
          linhaUm: "Espaço para",
          destaque: "as crianças.",
          texto: "O primeiro condomínio da região com salão de festas temático infantil, além de brinquedoteca e playground.",
          itens: [
            { icone: Blocks, nome: "Brinquedoteca" },
            { icone: Blocks, nome: "Playground" },
            { icone: PartyPopper, nome: "Salão temático infantil" },
          ],
          imagens: [
            { img: "kids", alt: "Área kids" },
            { img: "kids-rua", alt: "Playground" },
          ],
        }}
      />

      <CategoriaLazer
        c={{
          rotulo: "Celebração",
          linhaUm: "Celebre",
          destaque: "do seu jeito.",
          texto: "Quatro salões de festas dentro do condomínio, para reunir a família e os amigos.",
          itens: [
            { icone: PartyPopper, nome: "4 salões de festas" },
            { icone: Blocks, nome: "Um deles temático infantil" },
          ],
          imagens: [
            { img: "salao-01", alt: "Salão de festas" },
            { img: "salao-02", alt: "Salão de festas" },
            { img: "salao-03", alt: "Salão de festas" },
            { img: "salao-04", alt: "Salão de festas" },
          ],
        }}
      />

      <PlantasDoLazer />
      <CtaContato />
    </>
  );
}
