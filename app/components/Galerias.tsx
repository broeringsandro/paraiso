"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useTransform, type MotionValue } from "motion/react";
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

// Lista numerada + painel de imagem. O scroll troca o item ativo; clicar no item rola até ele.
export function LazerLista({ itens, cabecalho }: { itens: ItemGaleria[]; cabecalho?: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(0);
  const { scrollYProgress } = useScroll({ target: outer, offset: ["start start", "end end"] });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setAtivo(Math.max(0, Math.min(itens.length - 1, Math.floor(v * itens.length))));
  });

  function ir(i: number) {
    const el = outer.current;
    if (!el) return;
    const topo = el.getBoundingClientRect().top + window.scrollY;
    const alcance = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: topo + ((i + 0.5) / itens.length) * alcance, behavior: "smooth" });
  }

  return (
    <div ref={outer} style={{ height: `calc(100svh + ${itens.length * 42}svh)` }} className="relative">
      <div className="sticky top-0 mx-auto grid h-[100svh] max-w-7xl grid-rows-[auto_1fr] gap-5 px-5 pb-6 pt-24 md:px-10 lg:grid-cols-[1fr_1.3fr] lg:grid-rows-1 lg:gap-14 lg:pb-10">
        <div className="order-2 flex min-h-0 flex-col justify-center lg:order-1">
        {cabecalho && <div className="mb-6 hidden lg:block">{cabecalho}</div>}
        <ol className="flex flex-col">
          {itens.map((it, i) => (
            <li key={it.nome}>
              <button
                type="button"
                onClick={() => ir(i)}
                aria-current={i === ativo}
                className={`group flex w-full items-center gap-4 border-t border-white/15 py-2.5 text-left transition-all duration-500 md:gap-6 md:py-3 ${
                  i === ativo ? "text-white" : "text-ceu/55 hover:text-ceu"
                }`}
              >
                <span className={`w-6 text-xs tabular-nums transition-colors ${i === ativo ? "text-dourado" : ""}`}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className={`text-lg font-light transition-all duration-500 md:text-2xl ${i === ativo ? "translate-x-1" : ""}`}>
                  {it.nome}
                </span>
                <span className={`ml-auto transition-opacity duration-500 ${i === ativo ? "text-dourado opacity-100" : "opacity-0"}`}>
                  {it.icone}
                </span>
              </button>
            </li>
          ))}
          <li className="border-t border-white/15" aria-hidden />
        </ol>
        </div>

        <div className="relative order-1 min-h-0 overflow-hidden rounded-3xl bg-azul lg:order-2">
          {itens.map((it, i) => (
            <motion.div
              key={it.img}
              className="absolute inset-0"
              initial={false}
              animate={{ opacity: i === ativo ? 1 : 0, scale: i === ativo ? 1 : 1.08 }}
              transition={{ duration: 0.9, ease: [0.44, 0, 0.56, 1] }}
            >
              <Image src={`/img/${it.img}.jpg`} alt={it.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" priority={i === 0} />
            </motion.div>
          ))}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-noite/70 via-transparent to-transparent" aria-hidden />
          <p className="absolute bottom-5 left-6 text-sm tabular-nums text-white/80">
            {String(ativo + 1).padStart(2, "0")} / {String(itens.length).padStart(2, "0")}
          </p>
        </div>
      </div>
    </div>
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
