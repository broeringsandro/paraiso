import Link from "next/link";
import { ArrowRight, type LucideIcon } from "lucide-react";
import { Reveal, RevealWords } from "./Reveal";
import { Rotulo, TituloSecao } from "./Titulos";
import { getLang, getT } from "../i18n/server";
import { caminho } from "../lib/i18n";
import { ParallaxImage } from "./Visuals";
import WhatsappIcon from "./WhatsappIcon";
import { TELEFONE, WA_LINK } from "../lib/site";

export { Rotulo, TituloSecao };

// Link para a subpágina da seção (usado na home).
export async function VerMais({ href, label, claro = false }: { href: string; label: string; claro?: boolean }) {
  const t = await getT();
  const lang = await getLang();
  return (
    <Reveal>
      <Link
        href={caminho(lang, href)}
        className={`group inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-sm uppercase tracking-[0.15em] transition ${
          claro
            ? "border-white/30 text-white hover:border-dourado hover:text-dourado"
            : "border-azul/25 text-azul hover:border-azul hover:bg-azul hover:text-white"
        }`}
      >
        {t(label)}
        <ArrowRight size={16} strokeWidth={1.8} className="transition group-hover:translate-x-1" />
      </Link>
    </Reveal>
  );
}

export type Fato = { n: string; l: string; icone?: LucideIcon };

// Cabeçalho das subpáginas. Duas variações: foto larga abaixo do título ou foto alta ao lado.
export async function PageHero({
  rotulo,
  linhaUm,
  destaque,
  texto,
  img,
  alt,
  fatos,
  apoio,
  variante = "abaixo",
}: {
  rotulo: string;
  linhaUm: string;
  destaque: string;
  texto: string;
  img: string;
  alt: string;
  fatos?: Fato[];
  /** foto pequena que preenche a coluna do texto, na variante "abaixo" */
  apoio?: { img: string; alt: string };
  variante?: "abaixo" | "lado";
}) {
  const t = await getT();
  const lang = await getLang();
  const migalhas = (
    <Reveal>
      <nav aria-label={t("Você está em")} className="rotulo mb-8 flex items-center gap-3 text-mar">
        <Link href={caminho(lang, "/")} className="transition hover:text-azul">
          {t("Início")}
        </Link>
        <span aria-hidden>/</span>
        <span className="text-azul">{t(rotulo)}</span>
      </nav>
    </Reveal>
  );

  const titulo = (
    <h1 className="titulo text-azul">
      <RevealWords text={linhaUm} /> <strong><RevealWords text={destaque} delay={0.2} /></strong>
    </h1>
  );

  const faixa = fatos && fatos.length > 0 && (
    <dl
      className={`mt-10 grid gap-x-6 gap-y-7 border-t border-azul/10 pt-8 md:mt-12 ${
        fatos.length > 3 ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-3"
      }`}
    >
      {fatos.map((f, i) => {
        const I = f.icone;
        return (
          <Reveal key={f.l} delay={0.25 + i * 0.1} className="flex items-start gap-3.5 md:gap-4">
            {I && (
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-azul/15 bg-cartao/70 text-mar md:h-12 md:w-12">
                <I size={20} strokeWidth={1.4} />
              </span>
            )}
            <div>
              <dd className="text-xl font-light leading-tight tracking-tight text-azul md:text-3xl">{t(f.n)}</dd>
              <dt className="mt-0.5 text-xs leading-snug text-grafite/70 md:text-sm">{t(f.l)}</dt>
            </div>
          </Reveal>
        );
      })}
    </dl>
  );

  if (variante === "lado") {
    return (
      <section className="fundo-nevoa pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            {migalhas}
            {titulo}
            <Reveal delay={0.2}>
              <p className="texto mt-7 max-w-md text-grafite/85">{t(texto)}</p>
            </Reveal>
            {faixa}
          </div>
          <Reveal y={40} blur={4}>
            <ParallaxImage nome={img} alt={t(alt)} className="h-[46svh] rounded-[2rem] lg:h-[72svh]" sizes="(min-width: 1024px) 45vw, 100vw" intensidade={9} />
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="fundo-nevoa pb-16 pt-32 md:pb-24 md:pt-44">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {migalhas}
        <div className={`grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-16 ${apoio ? "lg:items-center" : "lg:items-end"}`}>
          {titulo}
          <div className="flex flex-col gap-6">
            {apoio && (
              <Reveal delay={0.15} y={30} blur={4}>
                <ParallaxImage
                  nome={apoio.img}
                  alt={t(apoio.alt)}
                  className="aspect-[16/9] w-full max-w-md rounded-2xl"
                  sizes="(min-width: 1024px) 28vw, 90vw"
                  intensidade={6}
                />
              </Reveal>
            )}
            <Reveal delay={0.2}>
              <p className="texto max-w-md text-grafite/85">{t(texto)}</p>
            </Reveal>
          </div>
        </div>
        {faixa}
        <Reveal y={40} blur={4} className="mt-12 md:mt-16">
          <ParallaxImage nome={img} alt={t(alt)} className="h-[44svh] rounded-3xl md:h-[56svh]" sizes="100vw" intensidade={8} />
        </Reveal>
      </div>
    </section>
  );
}

// Card azul de chamada para contato, usado no fim das páginas.
export async function CtaContato({ solto = false, fundo = "nevoa" }: { solto?: boolean; fundo?: "nevoa" | "branco" }) {
  if (solto) return <CartaoContato />;
  return (
    <section className={`${fundo === "branco" ? "fundo-branco" : "fundo-nevoa"} px-5 pb-14 pt-16 md:px-10 md:pb-36 md:pt-28`}>
      <div className="mx-auto max-w-7xl">
        <CartaoContato />
      </div>
    </section>
  );
}

async function CartaoContato() {
  const t = await getT();
  const lang = await getLang();
  return (
    <Reveal y={40} blur={4}>
          <div className="grid items-center gap-10 rounded-3xl bg-noite p-8 text-white md:grid-cols-[1.2fr_1fr] md:p-14">
            <div>
              <Rotulo claro>Contato</Rotulo>
              <h2 className="titulo text-white md:!text-[2.8rem]">
                {t("Agende")} <strong>{t("sua visita")}</strong>.
              </h2>
              <p className="texto mt-5 max-w-md text-white/75">{t("Ou fale com o seu corretor de confiança.")}</p>
            </div>
            <div className="flex flex-col items-start gap-5 md:items-end">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-2.5 whitespace-nowrap rounded-full bg-whats px-6 py-4 text-[13px] font-medium uppercase tracking-[0.1em] md:gap-3 md:px-8 md:text-sm md:tracking-[0.15em] text-white transition hover:bg-whats-escuro"
              >
                <WhatsappIcon size={20} /> {t("Chamar no WhatsApp")}
                <ArrowRight size={16} strokeWidth={1.8} className="transition group-hover:translate-x-1" />
              </a>
              <p className="text-2xl font-light tracking-tight text-white/90 md:text-3xl">{TELEFONE}</p>
              <Link href={caminho(lang, "/contato")} className="text-sm text-white/75 underline-offset-8 transition hover:text-white hover:underline">
                {t("Ou envie uma mensagem pelo formulário")}
              </Link>
            </div>
          </div>
    </Reveal>
  );
}
