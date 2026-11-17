import Hero from "../components/Hero";
import Letreiro from "../components/Letreiro";
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
} from "../components/Secoes";
import JsonLd from "../components/JsonLd";
import { WA_LINK, SITE_URL, REDES, SITE_ALE, NOME_SITE, RESUMO } from "../lib/site";
import { caminho, type Locale } from "../lib/i18n";
import { getLang, getT } from "../i18n/server";
import type { T } from "../i18n/traduzir";

function complexo(t: T, lang: Locale) {
  return {
  "@context": "https://schema.org",
  "@type": "ApartmentComplex",
  name: "Residencial " + NOME_SITE,
  description: t(RESUMO),
  url: SITE_URL + caminho(lang, "/"),
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
  ].map((name) => ({ "@type": "LocationFeatureSpecification", name: t(name), value: true })),
  brand: {
    "@type": "Organization",
    name: "ALE Empreendimentos",
    ...(SITE_ALE ? { url: SITE_ALE } : {}),
    ...(REDES.length ? { sameAs: REDES } : {}),
  },
  };
}

export default async function Home() {
  const t = await getT();
  const lang = await getLang();
  return (
    <>
      <JsonLd data={complexo(t, lang)} />
      <Hero whatsapp={WA_LINK} />
      <Letreiro />
      <p className="sr-only">
        {t(
          "O Residencial Paraíso das Águas é um condomínio da construtora ALE na Rua Major Soares do Nascimento, 400/520, bairro São Francisco de Assis, em Santo Amaro da Imperatriz/SC, com 2 torres e 112 apartamentos de 2 e 3 dormitórios com suíte.",
        )}
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
