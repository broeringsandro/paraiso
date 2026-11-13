import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  Camera,
  Check,
  FileCheck2,
  Layers,
  Navigation,
  ScrollText as IconeDoc,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "./Reveal";
import { Counter, ParallaxImage } from "./Visuals";
import { Rotulo, TituloSecao } from "./Pecas";
import WhatsappIcon from "./WhatsappIcon";
import { OBRA } from "../lib/obra";
import { ENDERECO, MAPS_LINK, TELEFONE, WAZE_LINK, WA_LINK } from "../lib/site";

/* ------------------------------ PROJETO ------------------------------ */

const ficha: { n: string | number; u?: string; l: string }[] = [
  { n: "3.266,17", u: "m²", l: "de terreno" },
  { n: "15.663,47", u: "m²", l: "de área construída" },
  { n: 2, l: "torres: A e B" },
  { n: 112, l: "apartamentos" },
  { n: 8, l: "apartamentos por andar, em cada torre" },
  { n: 7, l: "pavimentos tipo" },
  { n: 2, l: "elevadores por torre" },
  { n: "100%", l: "das garagens cobertas" },
];

export function FichaTecnica() {
  return (
    <section className="bg-nevoa py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <TituloSecao rotulo="Ficha técnica" linhaUm="O projeto" destaque="em números." texto="Subsolo, térreo, 7 pavimentos tipo e ático, distribuídos em duas torres residenciais." />
        <dl className="mt-16 grid grid-cols-2 border-l border-t border-azul/15 lg:grid-cols-4">
          {ficha.map((f, i) => (
            <Reveal key={f.l} delay={(i % 4) * 0.08} className="border-b border-r border-azul/15 p-6 md:p-9">
              <dd className="text-3xl font-light tracking-tight text-azul md:text-5xl">
                {typeof f.n === "number" ? <Counter to={f.n} /> : f.n}
                {f.u && <span className="ml-1 text-lg text-mar md:text-2xl">{f.u}</span>}
              </dd>
              <dt className="mt-3 max-w-[16ch] text-sm leading-snug text-grafite/70">{f.l}</dt>
            </Reveal>
          ))}
        </dl>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[
            { t: "Torre A", d: "Apartamentos de 101 a 708, com finais de 01 a 08." },
            { t: "Torre B", d: "Apartamentos de 111 a 718, com finais de 11 a 18." },
          ].map((t, i) => (
            <Reveal key={t.t} delay={i * 0.12} className="flex items-center gap-6 rounded-2xl bg-white p-7">
              <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-nevoa text-mar">
                <Building2 size={26} strokeWidth={1.4} />
              </span>
              <div>
                <p className="text-xl text-azul">{t.t}</p>
                <p className="mt-1 text-sm text-grafite/75">{t.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const docs: { icone: LucideIcon; t: string; d: string }[] = [
  { icone: FileCheck2, t: "Alvará de construção", d: "Nº 182/2026." },
  {
    icone: IconeDoc,
    t: "Incorporação registrada",
    d: "R-7 da matrícula nº 30.569 do Registro de Imóveis de Santo Amaro da Imperatriz/SC.",
  },
  { icone: ShieldCheck, t: "Realização", d: "ALE Empreendimentos (ALE Distribuição, Comércio e Serviços Ltda.)." },
];

export function Transparencia() {
  return (
    <section className="bg-bege py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <TituloSecao rotulo="Transparência" linhaUm="Tudo documentado," destaque="em cada etapa." texto="Respeito ao sonho de quem confia na nossa assinatura começa pela documentação em dia." />
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {docs.map(({ icone: I, t, d }, i) => (
            <Reveal as="li" key={t} delay={i * 0.12} className="rounded-3xl bg-white/70 p-8 transition duration-500 hover:-translate-y-1 hover:bg-white">
              <I size={28} strokeWidth={1.3} className="text-mar" />
              <h3 className="mt-6 text-xl text-azul">{t}</h3>
              <p className="texto mt-2 text-sm text-grafite/80">{d}</p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------- LAZER ------------------------------- */

type Categoria = {
  rotulo: string;
  linhaUm: string;
  destaque: string;
  texto: string;
  itens: { icone: LucideIcon; nome: string }[];
  imagens: { img: string; alt: string }[];
};

function MosaicoFotos({ imagens }: { imagens: Categoria["imagens"] }) {
  if (imagens.length === 1) {
    return <ParallaxImage nome={imagens[0].img} alt={imagens[0].alt} className="aspect-[4/5] rounded-3xl" intensidade={9} />;
  }
  if (imagens.length === 2) {
    return (
      <div className="grid grid-cols-[1.4fr_1fr] items-end gap-3 md:gap-4">
        <ParallaxImage nome={imagens[0].img} alt={imagens[0].alt} className="aspect-[3/4] rounded-3xl" intensidade={9} />
        <ParallaxImage nome={imagens[1].img} alt={imagens[1].alt} className="mb-10 aspect-[3/4] rounded-3xl md:mb-16" intensidade={12} />
      </div>
    );
  }
  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4">
      {imagens.map((im, i) => (
        <ParallaxImage
          key={im.img}
          nome={im.img}
          alt={im.alt}
          className={`aspect-square rounded-3xl ${i % 2 === 1 ? "mt-8 md:mt-14" : ""}`}
          intensidade={8 + (i % 3) * 3}
        />
      ))}
    </div>
  );
}

export function CategoriaLazer({ c, invertido = false, fundo = "nevoa" }: { c: Categoria; invertido?: boolean; fundo?: "nevoa" | "branco" }) {
  return (
    <section className={`${fundo === "branco" ? "bg-white" : "bg-nevoa"} py-20 md:py-32`}>
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-2 lg:gap-24">
        <div className={invertido ? "lg:order-2" : ""}>
          <Reveal y={40} blur={4}>
            <MosaicoFotos imagens={c.imagens} />
          </Reveal>
        </div>
        <div className={invertido ? "lg:order-1" : ""}>
          <TituloSecao rotulo={c.rotulo} linhaUm={c.linhaUm} destaque={c.destaque} texto={c.texto} />
          <ul className="mt-10 grid gap-4 border-t border-azul/10 pt-8 sm:grid-cols-2">
            {c.itens.map(({ icone: I, nome }, i) => (
              <Reveal as="li" key={nome} delay={i * 0.08} className="flex items-center gap-3 text-azul">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-mar shadow-sm">
                  <I size={20} strokeWidth={1.4} />
                </span>
                <span className="text-sm md:text-base">{nome}</span>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export function PlantasDoLazer() {
  const cards = [
    { img: "/plantas/terreo.png", w: 1024, h: 1396, t: "Térreo", d: "Piscina com deck, academia, salões de festas, brinquedoteca, playground, lounges e áreas verdes." },
    { img: "/plantas/atico.png", w: 1491, h: 784, t: "Ático", d: "Biblioteca e coworking, cinema e espaço gamer, no topo de cada torre." },
  ];
  return (
    <section className="bg-bege py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <TituloSecao rotulo="Onde fica cada espaço" linhaUm="O home club" destaque="visto de cima." />
        <div className="mt-14 grid gap-5 lg:grid-cols-[0.8fr_1.2fr]">
          {cards.map((c, i) => (
            <Reveal key={c.t} delay={i * 0.15} className="flex flex-col rounded-3xl bg-white/60 p-6 md:p-9">
              <div className="flex flex-1 items-center justify-center py-4">
                <Image src={c.img} alt={`Planta do ${c.t}`} width={c.w} height={c.h} sizes="(min-width: 1024px) 45vw, 90vw" className="h-auto max-h-[52svh] w-auto max-w-full object-contain" />
              </div>
              <div className="mt-6 border-t border-azul/10 pt-5">
                <p className="text-xl text-azul">{c.t}</p>
                <p className="texto mt-1 text-sm text-grafite/75">{c.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <div className="mt-10">
          <Reveal>
            <Link href="/plantas" className="group inline-flex items-center gap-3 text-sm uppercase tracking-[0.15em] text-azul">
              Veja todas as plantas
              <ArrowRight size={16} strokeWidth={1.8} className="transition group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------- APARTAMENTOS --------------------------- */

const tipologias = [
  { n: "Tipo 01", area: "91,00", d: "3 dormitórios, sendo 1 suíte", finais: "Finais 02, 03, 06 e 07 (Torre A) e 12, 13, 16 e 17 (Torre B)" },
  { n: "Tipo 02", area: "74,29", d: "2 dormitórios, sendo 1 suíte", finais: "Finais 04 e 05 (Torre A) e 14 e 15 (Torre B)" },
  { n: "Tipo 03", area: "68,18", d: "2 dormitórios, sendo 1 suíte", finais: "Finais 01 e 08 (Torre A) e 11 e 18 (Torre B)" },
];

export function TipologiasResumo() {
  return (
    <section className="bg-nevoa py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <TituloSecao rotulo="Tipologias" linhaUm="Três jeitos de" destaque="morar bem." texto="Todos com sacada com churrasqueira, todos com suíte." />
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {tipologias.map((t, i) => (
            <Reveal key={t.n} delay={i * 0.12}>
              <Link href="/plantas" className="group flex h-full flex-col rounded-3xl bg-white p-8 transition duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_-35px_rgb(20_36_58/0.45)]">
                <p className="rotulo text-mar">{t.n}</p>
                <p className="mt-6 text-6xl font-light tracking-tight text-azul">
                  {t.area}
                  <span className="ml-1 text-xl text-mar">m²</span>
                </p>
                <p className="mt-1 text-sm text-grafite/65">área privativa</p>
                <p className="mt-6 text-lg text-azul">{t.d}</p>
                <p className="texto mt-3 text-sm text-grafite/70">{t.finais}</p>
                <span className="mt-auto flex items-center gap-2 pt-8 text-sm uppercase tracking-[0.15em] text-azul/70 transition group-hover:text-azul">
                  Ver planta <ArrowRight size={15} strokeWidth={1.8} className="transition group-hover:translate-x-1" />
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GaleriaApto() {
  const fotos: { img: string; alt: string; cls: string }[] = [
    { img: "quarto-02", alt: "Dormitório", cls: "col-span-2 row-span-2 aspect-[4/3] md:aspect-auto" },
    { img: "sacada-vazia", alt: "Sacada com churrasqueira", cls: "aspect-[4/5]" },
    { img: "hall", alt: "Hall de entrada", cls: "aspect-[4/5]" },
    { img: "sacada-02", alt: "Sacada para receber amigos", cls: "col-span-2 md:col-span-4 aspect-[16/9] md:aspect-[21/8]" },
  ];
  return (
    <section className="bg-white py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <TituloSecao rotulo="Ambientes" linhaUm="Por dentro," destaque="sem pressa." />
        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {fotos.map((f, i) => (
            <Reveal key={f.img + i} delay={(i % 4) * 0.08} y={30} blur={4} className={f.cls}>
              <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-3xl">
                <Image src={`/img/${f.img}.jpg`} alt={f.alt} fill sizes="(min-width: 768px) 30vw, 50vw" className="object-cover transition duration-700 hover:scale-[1.04]" />
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- LOCALIZAÇÃO --------------------------- */

export function ComoChegar() {
  return (
    <section className="bg-nevoa pb-8 pt-16 md:pb-12 md:pt-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <div className="grid items-center gap-8 rounded-3xl bg-white p-8 md:grid-cols-[1.3fr_1fr] md:p-12">
            <div>
              <Rotulo>Como chegar</Rotulo>
              <p className="text-2xl font-light leading-snug text-azul md:text-3xl">{ENDERECO}</p>
              <p className="mt-3 text-sm text-grafite/60">Posição aproximada. O ponto exato do terreno será confirmado.</p>
            </div>
            <div className="flex flex-col gap-3">
              <a href={MAPS_LINK} target="_blank" rel="noopener" className="group flex items-center justify-between gap-4 rounded-full bg-azul px-7 py-4 text-sm uppercase tracking-[0.15em] text-white transition hover:bg-noite">
                <span className="flex items-center gap-3"><Navigation size={18} strokeWidth={1.6} /> Abrir no Google Maps</span>
                <ArrowRight size={16} strokeWidth={1.8} className="transition group-hover:translate-x-1" />
              </a>
              <a href={WAZE_LINK} target="_blank" rel="noopener" className="group flex items-center justify-between gap-4 rounded-full border border-azul/25 px-7 py-4 text-sm uppercase tracking-[0.15em] text-azul transition hover:border-azul">
                <span className="flex items-center gap-3"><Navigation size={18} strokeWidth={1.6} /> Traçar rota no Waze</span>
                <ArrowRight size={16} strokeWidth={1.8} className="transition group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function DestaquePrefeitura() {
  return (
    <section className="bg-azul py-24 text-white md:py-36">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 md:px-10 lg:grid-cols-[1fr_1.1fr] lg:gap-24">
        <Reveal>
          <div className="flex items-end gap-4">
            <p className="text-[6.5rem] font-light leading-none tracking-tighter md:text-[11rem]">
              <Counter to={500} />
            </p>
            <p className="pb-3 text-3xl font-light text-dourado md:pb-6 md:text-5xl">m</p>
          </div>
        </Reveal>
        <div>
          <Reveal delay={0.1}>
            <Rotulo claro>Nova sede da Prefeitura</Rotulo>
            <h2 className="titulo text-white md:!text-[2.8rem]">
              Perto de tudo o que o <strong>dia a dia pede</strong>.
            </h2>
            <p className="texto mt-6 max-w-md text-white/75">
              O São Francisco de Assis é o bairro que cresce ao redor da nova prefeitura de Santo Amaro da Imperatriz, a
              cerca de 500 m do Paraíso das Águas.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- OBRA ------------------------------- */

export function Cronograma() {
  const itens = OBRA.etapas.map((e) => ({
    ...e,
    estado: e.valor >= 100 ? "Concluída" : e.valor > 0 ? "Em andamento" : "Próxima etapa",
  }));
  return (
    <section className="bg-nevoa py-24 md:py-36">
      <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <TituloSecao rotulo="Cronograma" linhaUm="Etapa por etapa," destaque="até a entrega." texto="A obra avança em seis grandes etapas. Aqui você vê em qual delas estamos." />
        <ol className="relative">
          <span aria-hidden className="absolute bottom-3 left-[11px] top-3 w-px bg-azul/15" />
          {itens.map((e, i) => {
            const ativo = e.estado === "Em andamento";
            const feita = e.estado === "Concluída";
            return (
              <Reveal as="li" key={e.nome} delay={i * 0.07} className="relative flex gap-6 pb-9 last:pb-0">
                <span
                  className={`relative z-10 mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                    feita ? "border-dourado bg-dourado text-noite" : ativo ? "border-dourado bg-nevoa" : "border-azul/20 bg-nevoa"
                  }`}
                >
                  {feita ? <Check size={13} strokeWidth={2.4} /> : ativo ? <span className="h-2 w-2 animate-pulse rounded-full bg-dourado" /> : null}
                </span>
                <div className="flex-1 border-b border-azul/10 pb-7">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className={`text-xl ${ativo || feita ? "text-azul" : "text-azul/55"}`}>{e.nome}</p>
                    <span
                      className={`rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.16em] ${
                        ativo ? "bg-dourado text-noite" : feita ? "bg-azul text-white" : "bg-azul/5 text-grafite/55"
                      }`}
                    >
                      {e.estado}
                    </span>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

export function FotosObra() {
  return (
    <section className="bg-white py-24 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-10 lg:grid-cols-[1fr_1fr] lg:gap-20">
        <Reveal>
          <div className="flex aspect-[5/3] flex-col items-center justify-center gap-4 rounded-3xl border border-dashed border-azul/25 bg-nevoa text-center">
            <Camera size={34} strokeWidth={1.2} className="text-mar" />
            <p className="max-w-xs text-azul">As primeiras fotos da obra serão publicadas aqui.</p>
          </div>
        </Reveal>
        <div>
          <TituloSecao rotulo="Fotos da obra" linhaUm="Receba cada" destaque="atualização." texto="Quer ser avisado quando houver novidades da obra? Fale com a ALE e peça para entrar na lista." />
          <Reveal delay={0.2}>
            <a href={`${WA_LINK}?text=${encodeURIComponent("Olá! Quero receber as atualizações da obra do Paraíso das Águas.")}`} target="_blank" rel="noopener" className="group mt-9 inline-flex items-center gap-3 rounded-full bg-whats px-8 py-4 text-sm uppercase tracking-[0.15em] text-white transition hover:bg-whats-escuro">
              <WhatsappIcon size={19} /> Receber atualizações
              <ArrowRight size={16} strokeWidth={1.8} className="transition group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- CONTATO ----------------------------- */

export function Corretores() {
  return (
    <section className="bg-nevoa pb-20 md:pb-28">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <Reveal>
          <div className="grid items-center gap-8 rounded-3xl bg-noite p-8 text-white md:grid-cols-[1.4fr_1fr] md:p-12">
            <div>
              <Layers size={28} strokeWidth={1.3} className="text-dourado" />
              <h2 className="titulo mt-5 text-white md:!text-[2.4rem]">
                Você é <strong>corretor</strong>?
              </h2>
              <p className="texto mt-4 max-w-lg text-white/75">
                Procure a ALE pelo WhatsApp e seja cadastrado para atender seus clientes no Paraíso das Águas.
              </p>
            </div>
            <div className="md:justify-self-end">
              <a href={`${WA_LINK}?text=${encodeURIComponent("Olá! Sou corretor e quero me cadastrar para o Paraíso das Águas.")}`} target="_blank" rel="noopener" className="group inline-flex items-center gap-3 rounded-full bg-whats px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition hover:bg-whats-escuro">
                <WhatsappIcon size={19} /> Falar com a ALE
                <ArrowRight size={16} strokeWidth={1.8} className="transition group-hover:translate-x-1" />
              </a>
              <p className="mt-4 text-sm text-white/75 md:text-right">{TELEFONE}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
