import type { Metadata } from "next";
import { paginaMeta } from "../../lib/seo";
import type { Locale } from "../../lib/i18n";
import Migalhas from "../../components/Migalhas";
import { MapPin } from "lucide-react";
import { PageHero } from "../../components/Pecas";
import { ContatoSecao } from "../../components/Secoes";
import { Corretores } from "../../components/Blocos";
import Faq from "../../components/Faq";
import Mapa from "../../components/Mapa";
import { Reveal } from "../../components/Reveal";
import { ENDERECO } from "../../lib/site";
import { getT } from "../../i18n/server";

export async function generateMetadata({ params }: PageProps<"/[lang]/contato">): Promise<Metadata> {
  const { lang } = await params;
  return paginaMeta({
    lang: lang as Locale,
    rota: "/contato",
    titulo: "Agende sua Visita | Paraíso das Águas",
    tituloSocial: "Paraíso das Águas | Agende sua visita",
    descricao: "Agende sua visita ao Paraíso das Águas pelo WhatsApp (48) 9821-3130 ou envie uma mensagem pelo formulário.",
  });
}

export default async function Pagina() {
  const t = await getT();
  return (
    <>
      <Migalhas nome="Contato" rota="/contato" />
      <PageHero
        variante="lado"
        rotulo="Contato"
        linhaUm="Agende"
        destaque="sua visita."
        texto="Deixe seus dados e a ALE entra em contato pelo WhatsApp. Ou fale com o seu corretor de confiança."
        img="hall"
        alt="Hall de entrada do Paraíso das Águas"
      />
      <ContatoSecao pagina />
      <Corretores />
      <section className="fundo-branco pb-14 pt-14 md:pb-28 md:pt-28">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal y={40} blur={4}>
            <Mapa />
            <p className="mt-4 flex items-start gap-2 text-sm text-grafite/70">
              <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-mar" />
              {ENDERECO}. {t("Posição aproximada.")}
            </p>
          </Reveal>
        </div>
      </section>
      <Faq />
    </>
  );
}
