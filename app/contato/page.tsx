import type { Metadata } from "next";
import { PageHero } from "../components/Pecas";
import { ContatoSecao } from "../components/Secoes";

export const metadata: Metadata = {
  title: "Contato",
  description: "Agende sua visita ao Paraíso das Águas pelo WhatsApp (48) 9821-3130 ou envie uma mensagem pelo formulário.",
};

export default function Pagina() {
  return (
    <>
      <PageHero
        rotulo="Contato"
        linhaUm="Agende"
        destaque="sua visita."
        texto="Deixe seus dados e a ALE entra em contato pelo WhatsApp. Ou fale com o seu corretor de confiança."
        img="fachada-09"
        alt="Fachada do Paraíso das Águas"
      />
      <ContatoSecao pagina />
    </>
  );
}
