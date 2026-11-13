import type { Metadata } from "next";
import { PageHero, CtaContato } from "../components/Pecas";
import { LocalizacaoSecao } from "../components/Secoes";
import { ComoChegar, DestaquePrefeitura } from "../components/Blocos";

export const metadata: Metadata = {
  title: "Localização",
  description:
    "No bairro São Francisco de Assis, em Santo Amaro da Imperatriz, a cerca de 500 m da nova sede da Prefeitura e com acesso fácil pela BR-282.",
};

export default function Pagina() {
  return (
    <>
      <PageHero
        rotulo="Localização"
        linhaUm="Tudo o que você precisa,"
        destaque="perto de casa."
        texto="Em Santo Amaro da Imperatriz, cidade conhecida pelas águas termais e pela natureza da Grande Florianópolis, perto da nova prefeitura."
        img="fachada-10"
        alt="Vista das duas torres do Paraíso das Águas"
        fatos={[
          { n: "2 min", l: "da nova Prefeitura" },
          { n: "BR-282", l: "acesso à Grande Florianópolis" },
          { n: "Caldas", l: "da Imperatriz, águas termais" },
        ]}
      />
      <LocalizacaoSecao cabecalho={false} />
      <DestaquePrefeitura />
      <ComoChegar />
      <CtaContato />
    </>
  );
}
