"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useScroll, useTransform, type MotionValue } from "motion/react";
import { Rotulo } from "./Pecas";

export type ItemGaleria = { nome: string; icone: ReactNode; img: string; alt: string };

// Galeria horizontal fixada: o scroll vertical empurra os cards para o lado.
export function GaleriaHorizontal({ itens }: { itens: ItemGaleria[] }) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const [dist, setDist] = useState(0);
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -dist]);
  const barra = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  useEffect(() => {
    const medir = () => {
      if (!track.current) return;
      setDist(Math.max(0, track.current.scrollWidth - window.innerWidth));
    };
    medir();
    const ro = new ResizeObserver(medir);
    if (track.current) ro.observe(track.current);
    window.addEventListener("resize", medir);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", medir);
    };
  }, []);

  return (
    <div ref={outer} style={{ height: `calc(100svh + ${dist}px)` }} className="relative">
      <div className="sticky top-[76px] flex h-[calc(100svh-76px)] flex-col justify-start overflow-hidden pt-3 md:top-0 md:h-[100svh] md:justify-center md:pt-0">
        <motion.div ref={track} style={{ x }} className="flex w-max gap-5 px-5 md:gap-8 md:px-10">
          {itens.map((it, i) => (
            <CardGaleria key={it.nome} item={it} i={i} progress={scrollYProgress} total={itens.length} />
          ))}
        </motion.div>
        <div className="mx-5 mt-10 h-px bg-white/15 md:mx-10">
          <motion.div className="h-px bg-dourado" style={{ width: barra }} />
        </div>
      </div>
    </div>
  );
}

function CardGaleria({
  item,
  i,
  progress,
  total,
}: {
  item: ItemGaleria;
  i: number;
  progress: MotionValue<number>;
  total: number;
}) {
  // A foto desliza no sentido contrário ao do cartão (parallax lateral).
  const centro = i / (total - 1);
  const imgX = useTransform(progress, [centro - 0.35, centro + 0.35], ["8%", "-8%"]);
  return (
    <figure className="relative h-[56svh] w-[78vw] shrink-0 overflow-hidden rounded-sm bg-azul sm:w-[52vw] md:h-[68svh] md:w-[34vw]">
      <motion.div className="absolute inset-y-0 -inset-x-[12%]" style={{ x: imgX }}>
        <Image src={`/img/${item.img}.jpg`} alt={item.alt} fill sizes="(min-width: 768px) 45vw, 90vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 bg-gradient-to-t from-noite/90 via-noite/10 to-transparent" aria-hidden />
      <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
        <span className="flex items-center gap-3 text-xl font-light md:text-2xl">
          <span className="text-dourado">{item.icone}</span>
          {item.nome}
        </span>
      </figcaption>
    </figure>
  );
}

export type CardEmpilhado = {
  titulo: string;
  texto: string;
  img: string;
  alt: string;
  rotulo: string;
  icone: ReactNode;
};

// Sequência fixa: a cada trecho de scroll, a próxima foto se revela de baixo para cima e o texto troca com fade.
export function CardsEmpilhados({ cards }: { cards: CardEmpilhado[] }) {
  const n = cards.length;
  const outer = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const t = useTransform(scrollYProgress, (v) => v * (n - 1));
  const barra = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={outer} style={{ height: `${(n - 1) * 90 + 100}svh` }} className="relative">
      <div className="sticky top-0 mx-auto grid h-[100svh] max-w-7xl grid-rows-[1.1fr_1fr] gap-6 px-5 pb-8 pt-24 md:px-10 lg:grid-cols-[1.3fr_1fr] lg:grid-rows-1 lg:gap-14 lg:pb-12">
        <div className="relative overflow-hidden rounded-3xl bg-azul">
          {cards.map((c, i) => (
            <FotoCamada key={c.img} card={c} i={i} t={t} />
          ))}
        </div>

        <div className="relative flex flex-col justify-center">
          <div className="grid">
            {cards.map((c, i) => (
              <TextoCamada key={c.titulo} card={c} i={i} t={t} />
            ))}
          </div>
          <div className="mt-10 h-px w-full max-w-md bg-azul/15" aria-hidden>
            <motion.div className="h-px bg-dourado" style={{ width: barra }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function FotoCamada({ card, i, t }: { card: CardEmpilhado; i: number; t: MotionValue<number> }) {
  // A primeira foto já está visível; as seguintes sobem cobrindo a anterior.
  const topo = useTransform(t, [i - 0.9, i - 0.1], [100, 0], { clamp: true });
  const clip = useMotionTemplate`inset(${topo}% 0% 0% 0%)`;
  const zoom = useTransform(t, [i - 0.9, i], [1.22, 1], { clamp: true });
  return (
    <motion.div className="absolute inset-0" style={i === 0 ? undefined : { clipPath: clip }}>
      <motion.div className="absolute inset-0" style={{ scale: i === 0 ? 1 : zoom }}>
        <Image src={`/img/${card.img}.jpg`} alt={card.alt} fill sizes="(min-width: 1024px) 60vw, 100vw" className="object-cover" priority={i === 0} />
      </motion.div>
    </motion.div>
  );
}

function TextoCamada({ card, i, t }: { card: CardEmpilhado; i: number; t: MotionValue<number> }) {
  const opacity = useTransform(t, [i - 0.55, i - 0.2, i + 0.2, i + 0.55], [0, 1, 1, 0], { clamp: true });
  const y = useTransform(t, [i - 0.55, i, i + 0.55], [36, 0, -36], { clamp: true });
  const blur = useTransform(t, [i - 0.55, i - 0.2, i + 0.2, i + 0.55], [8, 0, 0, 8], { clamp: true });
  const filter = useMotionTemplate`blur(${blur}px)`;
  return (
    <motion.div className="col-start-1 row-start-1 flex flex-col justify-center gap-5" style={{ opacity, y, filter }}>
      <Rotulo icone={card.icone}>{card.rotulo}</Rotulo>
      <h3 className="text-3xl font-light leading-tight tracking-tight text-azul md:text-5xl">{card.titulo}</h3>
      <p className="texto max-w-md text-grafite/85">{card.texto}</p>
    </motion.div>
  );
}

export type ItemDiferencial = { t: string; icone: ReactNode; iconeGrande: ReactNode; img: string; alt: string };

// Sequência minimalista: fundo claro, uma foto limpa (sem degradês) e tipografia grande que troca com o scroll.
export function DiferenciaisImersivo({ itens }: { itens: ItemDiferencial[] }) {
  const n = itens.length;
  const outer = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const t = useTransform(scrollYProgress, (v) => v * (n - 1));
  const barra = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Clicar num ícone rola direto até aquele diferencial.
  function ir(i: number) {
    const el = outer.current;
    if (!el) return;
    const topo = el.getBoundingClientRect().top + window.scrollY;
    const alcance = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: topo + (i / (n - 1)) * alcance, behavior: "smooth" });
  }

  return (
    <div ref={outer} style={{ height: `${(n - 1) * 40 + 100}svh` }} className="relative">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-nevoa">
        <div className="mx-auto grid h-full max-w-7xl grid-rows-[auto_1fr] items-center gap-8 px-5 pb-10 pt-24 md:px-10 lg:grid-cols-[1.25fr_1fr] lg:grid-rows-1 lg:gap-24 lg:pb-12">
          <div className="order-2 flex flex-col justify-center lg:order-1">
            <div className="grid">
              {itens.map((it, i) => (
                <TextoDif key={it.t} it={it} i={i} t={t} />
              ))}
            </div>

            <div className="mt-10 flex items-center gap-1 md:mt-14">
              {itens.map((it, i) => (
                <DockIcone key={it.t} it={it} i={i} t={t} onSelect={() => ir(i)} />
              ))}
            </div>
            <div className="mt-6 h-px w-full max-w-md bg-azul/15" aria-hidden>
              <motion.div className="h-px bg-dourado" style={{ width: barra }} />
            </div>
          </div>

          <div className="relative order-1 mx-auto h-[36svh] w-full max-w-[420px] overflow-hidden rounded-[2rem] bg-ceu/40 lg:order-2 lg:h-auto lg:max-h-[72svh] lg:aspect-[4/5]">
            {itens.map((it, i) => (
              <FundoDif key={it.img + i} it={it} i={i} t={t} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function FundoDif({ it, i, t }: { it: ItemDiferencial; i: number; t: MotionValue<number> }) {
  const opacity = useTransform(t, [i - 0.6, i - 0.15], [0, 1], { clamp: true });
  const zoom = useTransform(t, [i - 0.6, i + 0.5], [1.12, 1], { clamp: true });
  return (
    <motion.div className="absolute inset-0" style={{ opacity: i === 0 ? 1 : opacity }}>
      <motion.div className="absolute inset-0" style={{ scale: zoom }}>
        <Image src={`/img/${it.img}.jpg`} alt={it.alt} fill sizes="(min-width: 1024px) 420px, 90vw" className="object-cover" priority={i === 0} />
      </motion.div>
    </motion.div>
  );
}

function TextoDif({ it, i, t }: { it: ItemDiferencial; i: number; t: MotionValue<number> }) {
  const opacity = useTransform(t, [i - 0.5, i - 0.2, i + 0.2, i + 0.5], [0, 1, 1, 0], { clamp: true });
  const y = useTransform(t, [i - 0.5, i, i + 0.5], [32, 0, -32], { clamp: true });
  const blurPx = useTransform(t, [i - 0.5, i - 0.2, i + 0.2, i + 0.5], [6, 0, 0, 6], { clamp: true });
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  return (
    <motion.div className="col-start-1 row-start-1 flex flex-col gap-6 text-azul" style={{ opacity, y, filter }}>
      <span className="text-mar">{it.iconeGrande}</span>
      <p className="max-w-xl text-balance text-3xl font-light leading-[1.14] tracking-tight md:text-5xl lg:text-[3.2rem]">{it.t}</p>
    </motion.div>
  );
}

function DockIcone({ it, i, t, onSelect }: { it: ItemDiferencial; i: number; t: MotionValue<number>; onSelect: () => void }) {
  const ativo = useTransform(t, [i - 0.5, i - 0.2, i + 0.2, i + 0.5], [0, 1, 1, 0], { clamp: true });
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-label={it.t}
      title={it.t}
      className="relative flex h-11 w-11 cursor-pointer items-center justify-center rounded-full text-azul/30 transition duration-300 hover:scale-110 hover:text-azul/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-mar"
    >
      {it.icone}
      <motion.span className="pointer-events-none absolute inset-0 flex items-center justify-center text-azul" style={{ opacity: ativo }}>
        {it.icone}
      </motion.span>
      <motion.span className="pointer-events-none absolute bottom-0.5 h-1 w-1 rounded-full bg-dourado" style={{ opacity: ativo }} />
    </button>
  );
}

export type Momento = { verbo: string; texto: string; img: string; alt: string };

// Painéis lado a lado: o scroll expande um de cada vez, os demais viram tiras estreitas.
export function SemSairDeCasa({ momentos }: { momentos: Momento[] }) {
  const n = momentos.length;
  const outer = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const t = useTransform(scrollYProgress, (v) => v * (n - 1));

  function ir(i: number) {
    const el = outer.current;
    if (!el) return;
    const topo = el.getBoundingClientRect().top + window.scrollY;
    const alcance = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: topo + (i / (n - 1)) * alcance, behavior: "smooth" });
  }

  return (
    <div ref={outer} style={{ height: `${(n - 1) * 45 + 100}svh` }} className="relative">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden bg-nevoa px-5 pb-6 pt-24 md:px-10">
        <div className="mx-auto flex h-[52svh] w-full max-w-7xl gap-2 md:h-[58svh] md:gap-3">
          {momentos.map((m, i) => (
            <PainelMomento key={m.verbo} m={m} i={i} t={t} onSelect={() => ir(i)} />
          ))}
        </div>

        <div className="mx-auto mt-8 grid w-full max-w-7xl md:mt-10 md:grid-cols-[1.2fr_1fr] md:items-end md:gap-10">
          <div className="grid">
            {momentos.map((m, i) => (
              <LegendaMomento key={m.verbo} m={m} i={i} t={t} />
            ))}
          </div>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 md:mt-0 md:justify-end">
            {momentos.map((m, i) => (
              <AbaMomento key={m.verbo} m={m} i={i} t={t} onSelect={() => ir(i)} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function useAtivacao(t: MotionValue<number>, i: number) {
  return useTransform(t, [i - 1, i, i + 1], [0, 1, 0], { clamp: true });
}

function PainelMomento({ m, i, t, onSelect }: { m: Momento; i: number; t: MotionValue<number>; onSelect: () => void }) {
  const a = useAtivacao(t, i);
  const grow = useTransform(a, [0, 1], [1, 5.5]);
  const zoom = useTransform(a, [0, 1], [1.25, 1.02]);
  return (
    <motion.button
      type="button"
      onClick={onSelect}
      aria-label={m.verbo}
      style={{ flexGrow: grow }}
      className="relative min-w-0 basis-0 cursor-pointer overflow-hidden rounded-2xl bg-ceu/40 md:rounded-3xl"
    >
      <motion.div className="absolute inset-0" style={{ scale: zoom }}>
        <Image src={`/img/${m.img}.jpg`} alt={m.alt} fill sizes="(min-width: 768px) 60vw, 80vw" className="object-cover" />
      </motion.div>
    </motion.button>
  );
}

function LegendaMomento({ m, i, t }: { m: Momento; i: number; t: MotionValue<number> }) {
  const a = useAtivacao(t, i);
  const opacity = useTransform(a, [0, 0.3, 0.7], [0, 0, 1]);
  const y = useTransform(a, [0, 1], [24, 0]);
  const blurPx = useTransform(a, [0, 0.3, 0.7], [8, 8, 0]);
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  return (
    <motion.div className="col-start-1 row-start-1" style={{ opacity, y, filter }}>
      <p className="text-5xl font-light tracking-tight text-azul md:text-7xl">{m.verbo}.</p>
      <p className="mt-3 max-w-md text-grafite/80">{m.texto}</p>
    </motion.div>
  );
}

function AbaMomento({ m, i, t, onSelect }: { m: Momento; i: number; t: MotionValue<number>; onSelect: () => void }) {
  const a = useAtivacao(t, i);
  const largura = useTransform(a, [0, 1], ["0%", "100%"]);
  return (
    <button type="button" onClick={onSelect} className="group cursor-pointer text-left text-sm uppercase tracking-[0.18em] text-azul/55 transition hover:text-azul">
      {m.verbo}
      <span className="mt-1 block h-px w-full bg-azul/15">
        <motion.span className="block h-px bg-dourado" style={{ width: largura }} />
      </span>
    </button>
  );
}
