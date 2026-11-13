import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Reveal, RevealWords } from "./Reveal";
import { ParallaxImage } from "./Visuals";
import WhatsappIcon from "./WhatsappIcon";
import { TELEFONE, WA_LINK } from "../lib/site";

export function Rotulo({ children, claro = false }: { children: React.ReactNode; claro?: boolean }) {
  return <p className={`rotulo mb-5 ${claro ? "text-dourado" : "text-mar"}`}>{children}</p>;
}

// Link para a subpágina da seção (usado na home).
export function VerMais({ href, label, claro = false }: { href: string; label: string; claro?: boolean }) {
  return (
    <Reveal>
      <Link
        href={href}
        className={`group inline-flex items-center gap-3 rounded-full border px-7 py-3.5 text-sm uppercase tracking-[0.15em] transition ${
          claro
            ? "border-white/30 text-white hover:border-dourado hover:text-dourado"
            : "border-azul/25 text-azul hover:border-azul hover:bg-azul hover:text-white"
        }`}
      >
        {label}
        <ArrowRight size={16} strokeWidth={1.8} className="transition group-hover:translate-x-1" />
      </Link>
    </Reveal>
  );
}

export type Fato = { n: string; l: string };

// Cabeçalho das subpáginas. Duas variações: foto larga abaixo do título ou foto alta ao lado.
export function PageHero({
  rotulo,
  linhaUm,
  destaque,
  texto,
  img,
  alt,
  fatos,
  variante = "abaixo",
}: {
  rotulo: string;
  linhaUm: string;
  destaque: string;
  texto: string;
  img: string;
  alt: string;
  fatos?: Fato[];
  variante?: "abaixo" | "lado";
}) {
  const migalhas = (
    <Reveal>
      <nav aria-label="Você está em" className="rotulo mb-8 flex items-center gap-3 text-mar">
        <Link href="/" className="transition hover:text-azul">
          Início
        </Link>
        <span aria-hidden>/</span>
        <span className="text-azul">{rotulo}</span>
      </nav>
    </Reveal>
  );

  const titulo = (
    <h1 className="titulo text-azul">
      <RevealWords text={linhaUm} /> <strong><RevealWords text={destaque} delay={0.2} /></strong>
    </h1>
  );

  const faixa = fatos && fatos.length > 0 && (
    <dl className={`mt-12 grid gap-x-6 gap-y-6 ${fatos.length > 3 ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3"}`}>
      {fatos.map((f, i) => (
        <Reveal key={f.l} delay={0.25 + i * 0.1} className="border-l border-azul/20 pl-5">
          <dd className="text-2xl font-light tracking-tight text-azul md:text-4xl">{f.n}</dd>
          <dt className="mt-1 text-xs text-grafite/70 md:text-sm">{f.l}</dt>
        </Reveal>
      ))}
    </dl>
  );

  if (variante === "lado") {
    return (
      <section className="bg-nevoa pb-16 pt-32 md:pb-24 md:pt-40">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <div>
            {migalhas}
            {titulo}
            <Reveal delay={0.2}>
              <p className="texto mt-7 max-w-md text-grafite/85">{texto}</p>
            </Reveal>
            {faixa}
          </div>
          <Reveal y={40} blur={4}>
            <ParallaxImage nome={img} alt={alt} className="h-[46svh] rounded-[2rem] lg:h-[72svh]" sizes="(min-width: 1024px) 45vw, 100vw" intensidade={9} />
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-nevoa pb-16 pt-32 md:pb-24 md:pt-44">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {migalhas}
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:gap-16">
          {titulo}
          <Reveal delay={0.2}>
            <p className="texto max-w-md text-grafite/85">{texto}</p>
          </Reveal>
        </div>
        {faixa}
        <Reveal y={40} blur={4} className="mt-12 md:mt-16">
          <ParallaxImage nome={img} alt={alt} className="h-[44svh] rounded-3xl md:h-[56svh]" sizes="100vw" intensidade={8} />
        </Reveal>
      </div>
    </section>
  );
}

// Título de seção reutilizável nas subpáginas.
export function TituloSecao({
  rotulo,
  linhaUm,
  destaque,
  texto,
  claro = false,
}: {
  rotulo: string;
  linhaUm: string;
  destaque: string;
  texto?: string;
  claro?: boolean;
}) {
  return (
    <div>
      <Reveal>
        <Rotulo claro={claro}>{rotulo}</Rotulo>
      </Reveal>
      <h2 className={`titulo max-w-3xl ${claro ? "text-white" : "text-azul"}`}>
        <RevealWords text={linhaUm} /> <strong><RevealWords text={destaque} delay={0.2} /></strong>
      </h2>
      {texto && (
        <Reveal delay={0.15}>
          <p className={`texto mt-6 max-w-xl ${claro ? "text-ceu" : "text-grafite/85"}`}>{texto}</p>
        </Reveal>
      )}
    </div>
  );
}

// Card azul de chamada para contato, usado no fim das páginas.
export function CtaContato({ solto = false }: { solto?: boolean }) {
  if (solto) return <CartaoContato />;
  return (
    <section className="bg-nevoa px-5 pb-24 md:px-10 md:pb-36">
      <div className="mx-auto max-w-7xl">
        <CartaoContato />
      </div>
    </section>
  );
}

function CartaoContato() {
  return (
    <Reveal y={40} blur={4}>
          <div className="grid items-center gap-10 rounded-3xl bg-azul p-8 text-white md:grid-cols-[1.2fr_1fr] md:p-14">
            <div>
              <Rotulo claro>Contato</Rotulo>
              <h2 className="titulo text-white md:!text-[2.8rem]">
                Agende <strong>sua visita</strong>.
              </h2>
              <p className="texto mt-5 max-w-md text-ceu">Ou fale com o seu corretor de confiança.</p>
            </div>
            <div className="flex flex-col items-start gap-5 md:items-end">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-3 rounded-full bg-dourado px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-noite transition hover:bg-white"
              >
                <WhatsappIcon size={20} /> Chamar no WhatsApp
                <ArrowRight size={16} strokeWidth={1.8} className="transition group-hover:translate-x-1" />
              </a>
              <p className="text-2xl font-light tracking-tight text-white/90 md:text-3xl">{TELEFONE}</p>
              <Link href="/contato" className="text-sm text-ceu underline-offset-8 transition hover:text-white hover:underline">
                Ou envie uma mensagem pelo formulário
              </Link>
            </div>
          </div>
    </Reveal>
  );
}
