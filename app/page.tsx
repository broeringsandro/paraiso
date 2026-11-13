import Hero from "./components/Hero";
import Letreiro from "./components/Letreiro";
import {
  AleSecao,
  ApartamentosSecao,
  ContatoSecao,
  DestaquesSecao,
  DiferenciaisSecao,
  EmpreendimentoSecao,
  HomeClubSecao,
  LocalizacaoSecao,
  ObraSecao,
  PlantasSecao,
  SemSairSecao,
} from "./components/Secoes";
import JsonLd from "./components/JsonLd";
import { WA_LINK, SITE_URL, REDES, SITE_ALE, NOME_SITE, RESUMO } from "./lib/site";

const complexo = {
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",
  name: "Residencial " + NOME_SITE,
  description: RESUMO,
  url: SITE_URL,
  image: `${SITE_URL}/img/fachada-08.jpg`,
  numberOfAccommodationUnits: 112,
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Major Soares do Nascimento, 400/520",
    addressLocality: "Santo Amaro da Imperatriz",
    addressRegion: "SC",
    addressCountry: "BR",
  },
  amenityFeature: [
    "Piscina com deck",
    "Academia",
    "Coworking",
    "Biblioteca",
    "Cinema",
    "Espaço gamer",
    "Sala de jogos",
    "Brinquedoteca",
    "Playground",
    "Salões de festas",
  ].map((name) => ({ "@type": "LocationFeatureSpecification", name, value: true })),
  brand: {
    "@type": "Organization",
    name: "ALE Empreendimentos",
    ...(SITE_ALE ? { url: SITE_ALE } : {}),
    ...(REDES.length ? { sameAs: REDES } : {}),
  },
};

export default function Home() {
  return (
    <>
      <JsonLd data={complexo} />
      <Hero whatsapp={WA_LINK} />
      <Letreiro />
      <p className="mx-auto max-w-3xl bg-white px-5 py-8 text-center text-sm leading-relaxed text-grafite/70 md:py-10">
        O Residencial Paraíso das Águas é um condomínio da construtora ALE na Rua Major Soares do Nascimento, 400/520, bairro São Francisco de Assis, em Santo Amaro da Imperatriz/SC, com 2 torres e 112 apartamentos de 2 e 3 dormitórios com suíte.
      </p>
      <EmpreendimentoSecao verMais />
      <HomeClubSecao verMais />
      <DestaquesSecao />
      <ApartamentosSecao verMais />
      <DiferenciaisSecao />
      <PlantasSecao verMais />
      <SemSairSecao />
      <LocalizacaoSecao verMais />
      <ObraSecao verMais />
      <AleSecao />
      <ContatoSecao />
    </>
  );
}
