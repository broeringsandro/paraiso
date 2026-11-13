"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { Maximize2, X } from "lucide-react";

type Imagem = { src: string; w: number; h: number; alt: string; legenda?: string };

type Planta = {
  id: string;
  aba: string;
  titulo: string;
  area?: string;
  texto: string;
  finais?: { a: string; b: string };
  imagens: Imagem[];
};

// TODO: confirmar com o cliente a associação Tipo 02 / Tipo 03 às metragens e se os de 2 dormitórios têm suíte.
const plantas: Planta[] = [
  {
    id: "tipo-01",
    aba: "Tipo 01",
    titulo: "Tipo 01",
    area: "91,00",
    texto: "3 dormitórios, sendo 1 suíte",
    finais: { a: "02, 03, 06, 07", b: "12, 13, 16, 17" },
    imagens: [{ src: "/plantas/tipo-01.png", w: 1277, h: 1017, alt: "Planta do apartamento Tipo 01, 3 dormitórios" }],
  },
  {
    id: "tipo-02",
    aba: "Tipo 02",
    titulo: "Tipo 02",
    area: "74,29",
    texto: "2 dormitórios, sendo 1 suíte",
    finais: { a: "04, 05", b: "14, 15" },
    imagens: [{ src: "/plantas/tipo-02.png", w: 1231, h: 1021, alt: "Planta do apartamento Tipo 02, 2 dormitórios" }],
  },
  {
    id: "tipo-03",
    aba: "Tipo 03",
    titulo: "Tipo 03",
    area: "68,18",
    texto: "2 dormitórios, sendo 1 suíte",
    finais: { a: "01, 08", b: "11, 18" },
    imagens: [{ src: "/plantas/tipo-03.png", w: 1286, h: 1001, alt: "Planta do apartamento Tipo 03, 2 dormitórios" }],
  },
  {
    id: "pavimento",
    aba: "Pavimento tipo",
    titulo: "Pavimento tipo",
    texto: "Torre A, de 101 a 708. Torre B, de 111 a 718.",
    imagens: [
      { src: "/plantas/pavimento-a.png", w: 1489, h: 673, alt: "Planta do pavimento tipo, decoração A", legenda: "Decoração A" },
      { src: "/plantas/pavimento-b.png", w: 1496, h: 672, alt: "Planta do pavimento tipo, decoração B", legenda: "Decoração B" },
    ],
  },
  {
    id: "terreo",
    aba: "Térreo",
    titulo: "Térreo",
    texto: "Home club e garagens cobertas.",
    imagens: [{ src: "/plantas/terreo.png", w: 1024, h: 1396, alt: "Planta do pavimento térreo com o home club" }],
  },
  {
    id: "subsolo",
    aba: "Subsolo",
    titulo: "Subsolo",
    texto: "Garagens cobertas.",
    imagens: [{ src: "/plantas/subsolo.png", w: 1230, h: 1227, alt: "Planta do subsolo com as garagens" }],
  },
  {
    id: "atico",
    aba: "Ático",
    titulo: "Ático",
    texto: "Biblioteca e coworking, cinema e espaço gamer.",
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
      <div role="tablist" aria-label="Plantas" className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 pb-2 md:mx-0 md:flex-wrap md:px-0">
        {plantas.map((pl, i) => (
          <button
            key={pl.id}
            role="tab"
            aria-selected={i === ativa}
            type="button"
            onClick={() => setAtiva(i)}
            className={`relative shrink-0 rounded-full px-5 py-2.5 text-sm transition-colors duration-300 ${
              i === ativa ? "text-white" : "text-azul/70 hover:text-azul"
            }`}
          >
            {i === ativa && (
              <motion.span layoutId="aba-planta" className="absolute inset-0 rounded-full bg-azul" transition={{ duration: 0.45, ease: EASE }} />
            )}
            <span className="relative">{pl.aba}</span>
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[0.75fr_1.6fr] lg:gap-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={p.id + "-info"}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.4, ease: EASE }}
            className="flex flex-col justify-center py-4 lg:py-10"
          >
            <p className="rotulo text-mar">{p.titulo}</p>
            {p.area ? (
              <p className="mt-5 text-6xl font-light tracking-tight text-azul md:text-7xl">
                {p.area}
                <span className="ml-1 text-2xl">m²</span>
              </p>
            ) : null}
            {p.area && <p className="mt-1 text-sm text-grafite/70">área privativa</p>}
            <p className={`${p.area ? "mt-6 text-lg" : "mt-5 text-2xl font-light leading-snug md:text-3xl"} text-azul`}>{p.texto}</p>

            {p.finais && (
              <dl className="mt-8 grid max-w-xs gap-3 border-t border-azul/15 pt-6 text-sm">
                <div className="flex justify-between gap-4">
                  <dt className="text-grafite/70">Finais Torre A</dt>
                  <dd className="text-azul">{p.finais.a}</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-grafite/70">Finais Torre B</dt>
                  <dd className="text-azul">{p.finais.b}</dd>
                </div>
              </dl>
            )}

            <p className="mt-10 hidden items-center gap-2 text-xs uppercase tracking-[0.18em] text-grafite/50 lg:flex">
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
            className="flex flex-col gap-4 rounded-3xl bg-white/55 p-5 md:p-10"
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
