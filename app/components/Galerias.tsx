"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useScroll, useTransform, type MotionValue } from "motion/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
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
    <figure className="relative h-[62svh] w-[78vw] shrink-0 overflow-hidden rounded-sm bg-azul sm:w-[52vw] md:h-[68svh] md:w-[34vw]">
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
      <p className="rotulo flex items-center gap-3 text-mar">
        <span className="text-dourado">{card.icone}</span>
        {card.rotulo}
      </p>
      <h3 className="text-3xl font-light leading-tight tracking-tight text-azul md:text-5xl">{card.titulo}</h3>
      <p className="texto max-w-md text-grafite/85">{card.texto}</p>
    </motion.div>
  );
}

// Carrossel com setas (scroll-snap), como no site de referência.
export function Carrossel({ itens }: { itens: { img: string; alt: string }[] }) {
  const ref = useRef<HTMLDivElement>(null);
  const mover = (dir: 1 | -1) => ref.current?.scrollBy({ left: dir * Math.min(520, window.innerWidth * 0.8), behavior: "smooth" });
  const seta =
    "flex h-12 w-12 items-center justify-center rounded-full bg-noite text-white transition hover:bg-mar";
  return (
    <div>
      <div className="mb-6 flex justify-end gap-2 px-5 md:px-10">
        <button type="button" aria-label="Anterior" onClick={() => mover(-1)} className={seta}>
          <ChevronLeft size={22} strokeWidth={1.5} />
        </button>
        <button type="button" aria-label="Próxima" onClick={() => mover(1)} className={seta}>
          <ChevronRight size={22} strokeWidth={1.5} />
        </button>
      </div>
      <div ref={ref} data-lenis-prevent className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth px-5 md:gap-5 md:px-10">
        {itens.map((it) => (
          <figure key={it.img} className="relative aspect-[4/5] w-[78vw] shrink-0 snap-start overflow-hidden rounded-3xl bg-azul sm:w-[48vw] md:w-[420px]">
            <Image src={`/img/${it.img}.jpg`} alt={it.alt} fill sizes="(min-width: 768px) 420px, 80vw" className="object-cover" />
          </figure>
        ))}
      </div>
    </div>
  );
}

export type ItemDiferencial = { t: string; icone: ReactNode; iconeGrande: ReactNode; img: string; alt: string };

// Sequência imersiva: cada diferencial ocupa a tela, com foto de fundo, ícone, texto grande e painel lateral de ícones.
export function DiferenciaisImersivo({ itens }: { itens: ItemDiferencial[] }) {
  const n = itens.length;
  const outer = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  const t = useTransform(scrollYProgress, (v) => v * (n - 1));
  const barra = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div ref={outer} style={{ height: `${(n - 1) * 40 + 100}svh` }} className="relative">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-noite">
        {itens.map((it, i) => (
          <FundoDif key={it.img + i} it={it} i={i} t={t} />
        ))}
        <div className="absolute inset-0 bg-gradient-to-r from-noite/90 via-noite/60 to-noite/25" aria-hidden />
        <div className="absolute inset-0 bg-gradient-to-t from-noite/80 via-transparent to-noite/55" aria-hidden />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-5 pb-24 md:px-10 md:pb-0">
          <div className="grid w-full max-w-2xl lg:pr-24">
            {itens.map((it, i) => (
              <TextoDif key={it.t} it={it} i={i} t={t} />
            ))}
          </div>
        </div>

        {/* Painel de ícones */}
        <div className="absolute inset-x-0 bottom-14 z-10 flex flex-wrap justify-center gap-2 px-5 lg:inset-x-auto lg:bottom-auto lg:right-10 lg:top-1/2 lg:-translate-y-1/2 lg:flex-col lg:flex-nowrap lg:gap-3 lg:px-0">
          {itens.map((it, i) => (
            <DockIcone key={it.t} it={it} i={i} t={t} />
          ))}
        </div>

        <div className="absolute inset-x-5 bottom-6 z-10 h-px bg-white/15 md:inset-x-10" aria-hidden>
          <motion.div className="h-px bg-dourado" style={{ width: barra }} />
        </div>
      </div>
    </div>
  );
}

function FundoDif({ it, i, t }: { it: ItemDiferencial; i: number; t: MotionValue<number> }) {
  const opacity = useTransform(t, [i - 0.65, i - 0.2], [0, 1], { clamp: true });
  const zoom = useTransform(t, [i - 0.65, i + 0.4], [1.18, 1.04], { clamp: true });
  return (
    <motion.div className="absolute inset-0" style={{ opacity: i === 0 ? 1 : opacity }}>
      <motion.div className="absolute inset-0" style={{ scale: zoom }}>
        <Image src={`/img/${it.img}.jpg`} alt={it.alt} fill sizes="100vw" className="object-cover" priority={i === 0} />
      </motion.div>
    </motion.div>
  );
}

function TextoDif({ it, i, t }: { it: ItemDiferencial; i: number; t: MotionValue<number> }) {
  const opacity = useTransform(t, [i - 0.5, i - 0.2, i + 0.2, i + 0.5], [0, 1, 1, 0], { clamp: true });
  const y = useTransform(t, [i - 0.5, i, i + 0.5], [44, 0, -44], { clamp: true });
  const blurPx = useTransform(t, [i - 0.5, i - 0.2, i + 0.2, i + 0.5], [10, 0, 0, 10], { clamp: true });
  const filter = useMotionTemplate`blur(${blurPx}px)`;
  const escala = useTransform(t, [i - 0.5, i, i + 0.5], [0.6, 1, 0.6], { clamp: true });
  const giro = useTransform(t, [i - 0.5, i, i + 0.5], [-25, 0, 25], { clamp: true });
  return (
    <motion.div className="col-start-1 row-start-1 flex flex-col gap-7 text-white" style={{ opacity, y, filter }}>
      <motion.span
        className="flex h-20 w-20 items-center justify-center rounded-full border border-dourado/70 bg-noite/40 text-dourado backdrop-blur-md md:h-24 md:w-24"
        style={{ scale: escala, rotate: giro }}
      >
        {it.iconeGrande}
      </motion.span>
      <p className="text-3xl font-light leading-[1.15] tracking-tight md:text-5xl">{it.t}</p>
    </motion.div>
  );
}

function DockIcone({ it, i, t }: { it: ItemDiferencial; i: number; t: MotionValue<number> }) {
  const ativo = useTransform(t, [i - 0.5, i - 0.2, i + 0.2, i + 0.5], [0, 1, 1, 0], { clamp: true });
  const escala = useTransform(ativo, [0, 1], [1, 1.18]);
  return (
    <motion.span
      className="relative flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-noite/30 text-white/70 backdrop-blur-md"
      style={{ scale: escala }}
      aria-hidden
    >
      {it.icone}
      <motion.span className="absolute inset-0 flex items-center justify-center rounded-full bg-dourado text-noite" style={{ opacity: ativo }}>
        {it.icone}
      </motion.span>
    </motion.span>
  );
}
