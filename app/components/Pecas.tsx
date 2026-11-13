import Link from "next/link";
import {
  ArrowRight,
  Blocks,
  Building2,
  CalendarDays,
  Camera,
  CircleHelp,
  ClipboardList,
  Clock,
  Dumbbell,
  Gamepad2,
  Grid3x3,
  HardHat,
  KeyRound,
  Landmark,
  Laptop,
  Layers,
  LayoutGrid,
  ListChecks,
  Map,
  MapPin,
  Navigation,
  PartyPopper,
  Phone,
  Ruler,
  ShieldCheck,
  Sofa,
  Sparkles,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { Reveal, RevealWords } from "./Reveal";
import { ParallaxImage } from "./Visuals";
import WhatsappIcon from "./WhatsappIcon";
import { TELEFONE, WA_LINK } from "../lib/site";

// Ícone de cada etiqueta de seção. Etiquetas sem ícone próprio usam o Sparkles.
const ICONES_ROTULO: Record<string, LucideIcon> = {
  "O empreendimento": Building2,
  "Home club": Waves,
  Apartamentos: KeyRound,
  Plantas: LayoutGrid,
  Localização: MapPin,
  "Andamento da obra": HardHat,
  Contato: Phone,
  "Fale com a gente": Phone,
  Diferenciais: Sparkles,
  "Coworking + academia": Laptop,
  "Para as crianças": Blocks,
  Transparência: ShieldCheck,
  "Ficha técnica": ClipboardList,
  "Anatomia do projeto": Layers,
  "Bem-estar": Dumbbell,
  Trabalho: Laptop,
  Diversão: Gamepad2,
  Família: Blocks,
  Celebração: PartyPopper,
  "Onde fica cada espaço": Map,
  Tipologias: Ruler,
  Ambientes: Sofa,
  Especificações: ListChecks,
  Finais: Grid3x3,
  Cronograma: CalendarDays,
  "Fotos da obra": Camera,
  "Perguntas frequentes": CircleHelp,
  "Como chegar": Navigation,
  "A poucos minutos de": Clock,
  "Nova sede da Prefeitura": Landmark,
};

// Etiqueta de seção: um único estilo (chip com ícone) em todo o site.
export function Rotulo({
  children,
  claro = false,
  icone,
}: {
  children: React.ReactNode;
  claro?: boolean;
  icone?: React.ReactNode;
}) {
  const Padrao = (typeof children === "string" && ICONES_ROTULO[children]) || Sparkles;
  return (
    <p className="mb-7">
      <span
        className={`inline-flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm ${
          claro ? "border-white/20 bg-white/10 text-white" : "border-azul/15 bg-white/70 text-azul"
        }`}
      >
        <span className={`flex shrink-0 items-center ${claro ? "text-dourado" : "text-mar"}`}>
          {icone ?? <Padrao size={18} strokeWidth={1.5} />}
        </span>
        {children}
      </span>
    </p>
  );
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

export type Fato = { n: string; l: string; icone?: LucideIcon };

// Cabeçalho das subpáginas. Duas variações: foto larga abaixo do título ou foto alta ao lado.
export function PageHero({
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
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-azul/15 bg-white/70 text-mar md:h-12 md:w-12">
                <I size={20} strokeWidth={1.4} />
              </span>
            )}
            <div>
              <dd className="text-xl font-light leading-tight tracking-tight text-azul md:text-3xl">{f.n}</dd>
              <dt className="mt-0.5 text-xs leading-snug text-grafite/70 md:text-sm">{f.l}</dt>
            </div>
          </Reveal>
        );
      })}
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
        <div className={`grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:gap-16 ${apoio ? "lg:items-center" : "lg:items-end"}`}>
          {titulo}
          <div className="flex flex-col gap-6">
            {apoio && (
              <Reveal delay={0.15} y={30} blur={4}>
                <ParallaxImage
                  nome={apoio.img}
                  alt={apoio.alt}
                  className="aspect-[16/9] w-full max-w-md rounded-2xl"
                  sizes="(min-width: 1024px) 28vw, 90vw"
                  intensidade={6}
                />
              </Reveal>
            )}
            <Reveal delay={0.2}>
              <p className="texto max-w-md text-grafite/85">{texto}</p>
            </Reveal>
          </div>
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
          <p className={`texto mt-6 max-w-xl ${claro ? "text-white/75" : "text-grafite/85"}`}>{texto}</p>
        </Reveal>
      )}
    </div>
  );
}

// Card azul de chamada para contato, usado no fim das páginas.
export function CtaContato({ solto = false }: { solto?: boolean }) {
  if (solto) return <CartaoContato />;
  return (
    <section className="bg-nevoa px-5 pb-14 pt-16 md:px-10 md:pb-36 md:pt-28">
      <div className="mx-auto max-w-7xl">
        <CartaoContato />
      </div>
    </section>
  );
}

function CartaoContato() {
  return (
    <Reveal y={40} blur={4}>
          <div className="grid items-center gap-10 rounded-3xl bg-noite p-8 text-white md:grid-cols-[1.2fr_1fr] md:p-14">
            <div>
              <Rotulo claro>Contato</Rotulo>
              <h2 className="titulo text-white md:!text-[2.8rem]">
                Agende <strong>sua visita</strong>.
              </h2>
              <p className="texto mt-5 max-w-md text-white/75">Ou fale com o seu corretor de confiança.</p>
            </div>
            <div className="flex flex-col items-start gap-5 md:items-end">
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener"
                className="group inline-flex items-center gap-3 rounded-full bg-whats px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition hover:bg-whats-escuro"
              >
                <WhatsappIcon size={20} /> Chamar no WhatsApp
                <ArrowRight size={16} strokeWidth={1.8} className="transition group-hover:translate-x-1" />
              </a>
              <p className="text-2xl font-light tracking-tight text-white/90 md:text-3xl">{TELEFONE}</p>
              <Link href="/contato" className="text-sm text-white/75 underline-offset-8 transition hover:text-white hover:underline">
                Ou envie uma mensagem pelo formulário
              </Link>
            </div>
          </div>
    </Reveal>
  );
}
