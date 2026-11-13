"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Word } from "./ScrollText";

type Foto = {
  img: string;
  alt: string;
  /** posição e tamanho (Tailwind) */
  className: string;
  /** quando a foto começa a aparecer (0 a 1 do scroll da seção) */
  entra: number;
  /** deslocamento vertical em px ao longo do scroll (parallax) */
  parallax: number;
};

const fotos: Foto[] = [
  { img: "fachada-05", alt: "Entrada do Paraíso das Águas", className: "left-[4%] top-[15%] hidden aspect-[4/5] w-[16vw] md:block", entra: 0.02, parallax: 90 },
  { img: "piscina", alt: "Piscina com deck", className: "right-5 top-24 aspect-square w-[27vw] md:right-[5%] md:top-[11%] md:w-[19vw]", entra: 0.08, parallax: -70 },
  { img: "sala", alt: "Sala integrada de um apartamento", className: "bottom-[10%] left-[7%] hidden aspect-square w-[14vw] md:block", entra: 0.14, parallax: -100 },
  { img: "sacada", alt: "Sacada com churrasqueira", className: "bottom-8 right-5 aspect-[4/5] w-[28vw] md:bottom-[8%] md:right-[4%] md:w-[17vw]", entra: 0.2, parallax: 70 },
];

function FotoFlutuante({ f, p }: { f: Foto; p: MotionValue<number> }) {
  const opacity = useTransform(p, [f.entra, f.entra + 0.14], [0, 1], { clamp: true });
  const scale = useTransform(p, [f.entra, f.entra + 0.22], [0.7, 1], { clamp: true });
  const y = useTransform(p, [0, 1], [f.parallax, -f.parallax]);
  const raio = useTransform(p, [f.entra, f.entra + 0.22], [60, 20], { clamp: true });
  return (
    <motion.div className={`absolute overflow-hidden ${f.className}`} style={{ opacity, scale, y, borderRadius: raio }}>
      <Image src={`/img/${f.img}.jpg`} alt={f.alt} fill sizes="(min-width: 768px) 20vw, 30vw" className="object-cover" />
    </motion.div>
  );
}

// Seção fixa em fundo claro: o texto acende palavra por palavra enquanto fotos pequenas surgem e flutuam nas bordas.
export default function Manifesto({ text, rotulo }: { text: string; rotulo: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const palavras = text.split(" ");
  const n = palavras.length;

  return (
    <div ref={ref} className="relative h-[300svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-nevoa">
        {fotos.map((f) => (
          <FotoFlutuante key={f.img} f={f} p={p} />
        ))}

        <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 text-center md:px-0">
          <p className="rotulo mb-7 text-mar">{rotulo}</p>
          <p className="titulo text-azul md:!text-[3rem]" aria-label={text}>
            {palavras.map((w, i) => {
              const ini = 0.1 + (i / n) * 0.72;
              return <Word key={i} word={w} range={[ini, ini + 0.72 / n]} progress={p} />;
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
