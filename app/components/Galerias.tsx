"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";

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
        <span className="text-sm tabular-nums text-white/60">
          {String(i + 1).padStart(2, "0")}/{String(total).padStart(2, "0")}
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

// Cards que empilham (sticky) e encolhem quando o próximo chega por cima.
export function CardsEmpilhados({ cards }: { cards: CardEmpilhado[] }) {
  return (
    <div className="relative">
      {cards.map((c, i) => (
        <CardPilha key={c.titulo} card={c} i={i} />
      ))}
    </div>
  );
}

function CardPilha({ card, i }: { card: CardEmpilhado; i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);
  const dim = useTransform(scrollYProgress, [0, 1], [0, 0.45]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  return (
    <div ref={ref} className="h-[100svh]">
      <motion.article
        style={{ scale, top: `${88 + i * 14}px` }}
        className="sticky grid h-[calc(100svh-120px)] origin-top overflow-hidden rounded-2xl bg-white shadow-[0_30px_80px_-30px_rgb(20_36_58/0.35)] md:grid-cols-2"
      >
        <div className="relative min-h-[38svh] overflow-hidden md:min-h-0">
          <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
            <Image src={`/img/${card.img}.jpg`} alt={card.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
          </motion.div>
        </div>
        <div className="flex flex-col justify-center gap-5 p-7 md:p-14">
          <p className="rotulo flex items-center gap-3 text-mar">
            <span className="text-dourado">{card.icone}</span>
            {String(i + 1).padStart(2, "0")} · {card.rotulo}
          </p>
          <h3 className="text-3xl font-light leading-tight tracking-tight text-azul md:text-5xl">{card.titulo}</h3>
          <p className="texto max-w-md text-grafite/85">{card.texto}</p>
        </div>
        <motion.div className="pointer-events-none absolute inset-0 bg-noite" style={{ opacity: dim }} aria-hidden />
      </motion.article>
    </div>
  );
}
