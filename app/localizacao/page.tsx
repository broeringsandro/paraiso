import type { Metadata } from "next";
import { paginaMeta } from "../lib/seo";
import Migalhas from "../components/Migalhas";
import { Clock, Droplets, Route } from "lucide-react";
import { PageHero, CtaContato } from "../components/Pecas";
import { LocalizacaoSecao } from "../components/Secoes";
import { ComoChegar, DestaquePrefeitura } from "../components/Blocos";

export const metadata: Metadata = paginaMeta({
  rota: "/localizacao",
  titulo: "Localização em Santo Amaro da Imperatriz | Paraíso das Águas",
  tituloSocial: "Paraíso das Águas | Localização em Santo Amaro da Imperatriz",
  descricao: "No bairro São Francisco de Assis, em Santo Amaro da Imperatriz, a cerca de 500 m da nova sede da Prefeitura e com acesso fácil pela BR-282.",
});

export default function Pagina() {
  return (
    <>
      <Migalhas nome="Localização" rota="/localizacao" />
      <PageHero
        rotulo="Localização"
        linhaUm="Tudo o que você precisa,"
        destaque="perto de casa."
        texto="Em Santo Amaro da Imperatriz, cidade conhecida pelas águas termais e pela natureza da Grande Florianópolis, perto da nova prefeitura."
        img="fachada-10"
        alt="Vista das duas torres do Paraíso das Águas"
        apoio={{ img: "fachada-11", alt: "Entrada do Paraíso das Águas" }}
        fatos={[
          { n: "2 min", l: "da nova Prefeitura", icone: Clock },
          { n: "BR-282", l: "acesso à Grande Florianópolis", icone: Route },
          { n: "Caldas", l: "da Imperatriz, águas termais", icone: Droplets },
        ]}
      />
      <LocalizacaoSecao cabecalho={false} fundo="branco" />
      <DestaquePrefeitura />
      <ComoChegar />
      <CtaContato fundo="branco" />
    </>
  );
}
