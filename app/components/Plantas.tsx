"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import {
  BedDouble,
  BookOpen,
  Building2,
  Clapperboard,
  Gamepad2,
  LayoutGrid,
  Maximize2,
  Ruler,
  ShowerHead,
  SquareParking,
  Sunset,
  Trees,
  Waves,
  X,
  type LucideIcon,
} from "lucide-react";

type Imagem = { src: string; w: number; h: number; alt: string; legenda?: string };

type Item = { icone: LucideIcon; texto: string };

type Planta = {
  id: string;
  aba: string;
  icone: LucideIcon;
  titulo: string;
  itens: Item[];
  imagens: Imagem[];
};

// TODO: confirmar com o cliente a associação Tipo 02 / Tipo 03 às metragens e se os de 2 dormitórios têm suíte.
const plantas: Planta[] = [
  {
    id: "tipo-01",
    aba: "Tipo 01",
    icone: BedDouble,
    titulo: "Tipo 01",
    itens: [
      { icone: Ruler, texto: "91,00 m² privativos" },
      { icone: BedDouble, texto: "3 dormitórios" },
      { icone: ShowerHead, texto: "1 suíte" },
      { icone: Building2, texto: "Finais 02, 03, 06 e 07 na Torre A" },
      { icone: Building2, texto: "Finais 12, 13, 16 e 17 na Torre B" },
    ],
    imagens: [{ src: "/plantas/tipo-01.png", w: 1277, h: 1017, alt: "Planta do apartamento Tipo 01, 3 dormitórios" }],
  },
  {
    id: "tipo-02",
    aba: "Tipo 02",
    icone: BedDouble,
    titulo: "Tipo 02",
    itens: [
      { icone: Ruler, texto: "74,29 m² privativos" },
      { icone: BedDouble, texto: "2 dormitórios" },
      { icone: ShowerHead, texto: "1 suíte" },
      { icone: Building2, texto: "Finais 04 e 05 na Torre A" },
      { icone: Building2, texto: "Finais 14 e 15 na Torre B" },
    ],
    imagens: [{ src: "/plantas/tipo-02.png", w: 1231, h: 1021, alt: "Planta do apartamento Tipo 02, 2 dormitórios" }],
  },
  {
    id: "tipo-03",
    aba: "Tipo 03",
    icone: BedDouble,
    titulo: "Tipo 03",
    itens: [
      { icone: Ruler, texto: "68,18 m² privativos" },
      { icone: BedDouble, texto: "2 dormitórios" },
      { icone: ShowerHead, texto: "1 suíte" },
      { icone: Building2, texto: "Finais 01 e 08 na Torre A" },
      { icone: Building2, texto: "Finais 11 e 18 na Torre B" },
    ],
    imagens: [{ src: "/plantas/tipo-03.png", w: 1286, h: 1001, alt: "Planta do apartamento Tipo 03, 2 dormitórios" }],
  },
  {
    id: "pavimento",
    aba: "Pavimento tipo",
    icone: LayoutGrid,
    titulo: "Pavimento tipo",
    itens: [
      { icone: Building2, texto: "Torre A, de 101 a 708" },
      { icone: Building2, texto: "Torre B, de 111 a 718" },
    ],
    imagens: [
      { src: "/plantas/pavimento-a.png", w: 1489, h: 673, alt: "Planta do pavimento tipo, decoração A", legenda: "Decoração A" },
      { src: "/plantas/pavimento-b.png", w: 1496, h: 672, alt: "Planta do pavimento tipo, decoração B", legenda: "Decoração B" },
    ],
  },
  {
    id: "terreo",
    aba: "Térreo",
    icone: Trees,
    titulo: "Térreo",
    itens: [
      { icone: Waves, texto: "Home club" },
      { icone: SquareParking, texto: "Garagens cobertas" },
    ],
    imagens: [{ src: "/plantas/terreo.png", w: 1024, h: 1396, alt: "Planta do pavimento térreo com o home club" }],
  },
  {
    id: "subsolo",
    aba: "Subsolo",
    icone: SquareParking,
    titulo: "Subsolo",
    itens: [{ icone: SquareParking, texto: "Garagens cobertas" }],
    imagens: [{ src: "/plantas/subsolo.png", w: 1230, h: 1227, alt: "Planta do subsolo com as garagens" }],
  },
  {
    id: "atico",
    aba: "Ático",
    icone: Sunset,
    titulo: "Ático",
    itens: [
      { icone: BookOpen, texto: "Biblioteca e coworking" },
      { icone: Clapperboard, texto: "Cinema" },
      { icone: Gamepad2, texto: "Espaço gamer" },
    ],
    imagens: [{ src: "/plantas/atico.png", w: 1491, h: 784, alt: "Planta do ático com coworking, cinema e espaço gamer" }],
  },
];

const EASE = [0.44, 0, 0.56, 1] as const;

export default function Plantas() {
  const [ativa, setAtiva] = useState(0);
  const [zoom, setZoom] = useState<Imagem | null>(null);
  const p = plantas[ativa];

  // Fecha o zoom com ESC e trava a rolagem da página enquanto ele está aberto.
  useEffect(() => {
    if (!zoom) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && setZoom(null);
    window.addEventListener("keydown", esc);
    const anterior = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", esc);
      document.documentElement.style.overflow = anterior;
    };
  }, [zoom]);

  return (
    <div>
      <div role="tablist" aria-label="Plantas" className="flex flex-wrap gap-2">
        {plantas.map((pl, i) => {
          const Icone = pl.icone;
          return (
            <button
              key={pl.id}
              role="tab"
              aria-selected={i === ativa}
              type="button"
              onClick={() => setAtiva(i)}
              className={`relative inline-flex cursor-pointer items-center gap-2 rounded-full border px-4 py-2.5 text-[13px] transition-colors duration-300 md:px-5 md:py-3 md:text-sm ${
                i === ativa ? "border-azul text-white" : "border-azul/15 bg-nevoa text-azul hover:border-azul/50"
              }`}
            >
              {i === ativa && (
                <motion.span layoutId="aba-planta" className="absolute inset-0 rounded-full bg-azul" transition={{ duration: 0.45, ease: EASE }} />
              )}
              <Icone size={17} strokeWidth={1.5} className="relative shrink-0" />
              <span className="relative">{pl.aba}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.7fr_1.6fr] lg:gap-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.id + "-info"}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex flex-col justify-center lg:py-6"
          >
            <p className="text-3xl font-light tracking-tight text-azul md:text-4xl">{p.titulo}</p>
            <ul className="mt-7 grid gap-3">
              {p.itens.map((it) => {
                const Icone = it.icone;
                return (
                  <li key={it.texto} className="flex items-center gap-3.5 text-azul">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-nevoa text-mar">
                      <Icone size={20} strokeWidth={1.5} />
                    </span>
                    <span>{it.texto}</span>
                  </li>
                );
              })}
            </ul>

            <p className="mt-9 hidden items-center gap-2 text-xs text-grafite/55 lg:flex">
              <Maximize2 size={14} strokeWidth={1.5} /> Clique na planta para ampliar
            </p>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait">
          <motion.div
            key={p.id + "-img"}
            initial={{ opacity: 0, scale: 0.97, filter: "blur(6px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, scale: 1.02, filter: "blur(6px)" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="flex flex-col gap-4 rounded-3xl bg-nevoa p-5 md:p-10"
          >
            {p.imagens.map((im) => (
              <figure key={im.src}>
                <button
                  type="button"
                  onClick={() => setZoom(im)}
                  aria-label={`Ampliar: ${im.alt}`}
                  className="group relative block w-full cursor-zoom-in"
                >
                  <Image
                    src={im.src}
                    alt={im.alt}
                    width={im.w}
                    height={im.h}
                    sizes="(min-width: 1024px) 60vw, 92vw"
                    className="mx-auto h-auto max-h-[62svh] w-auto max-w-full object-contain transition duration-700 group-hover:scale-[1.02]"
                  />
                </button>
                {im.legenda && <figcaption className="mt-2 text-center text-xs uppercase tracking-[0.18em] text-grafite/55">{im.legenda}</figcaption>}
              </figure>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {zoom && (
          <motion.div
            key="zoom"
            data-lenis-prevent
            role="dialog"
            aria-modal="true"
            aria-label={zoom.alt}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setZoom(null)}
            className="fixed inset-0 z-[90] flex items-center justify-center bg-noite/92 p-4 backdrop-blur-sm md:p-10"
          >
            <button
              type="button"
              aria-label="Fechar"
              onClick={() => setZoom(null)}
              className="absolute right-5 top-5 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20"
            >
              <X size={22} strokeWidth={1.5} />
            </button>
            <motion.div
              initial={{ scale: 0.94, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.97, opacity: 0 }}
              transition={{ duration: 0.4, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-full max-w-full overflow-auto rounded-2xl bg-nevoa p-4 md:p-8"
            >
              <Image
                src={zoom.src}
                alt={zoom.alt}
                width={zoom.w}
                height={zoom.h}
                sizes="92vw"
                className="h-auto max-h-[84svh] w-auto max-w-full object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
