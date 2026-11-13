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
import { WA_LINK } from "./lib/site";

export default function Home() {
  return (
    <>
      <Hero whatsapp={WA_LINK} />
      <Letreiro />
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
