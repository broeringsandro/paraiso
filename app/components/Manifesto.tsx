"use client";

import { useRef, useSyncExternalStore } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform, type MotionValue } from "motion/react";
import { Word } from "./ScrollText";
import { Rotulo } from "./Pecas";

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

// No celular só duas fotos aparecem (canto superior direito e inferior esquerdo), longe do texto.
const fotos: Foto[] = [
  { img: "fachada-05", alt: "Entrada do Paraíso das Águas", className: "left-[4%] top-[15%] hidden aspect-[4/5] w-[16vw] md:block", entra: 0.02, parallax: 90 },
  { img: "piscina", alt: "Piscina com deck", className: "right-5 top-[88px] aspect-[4/3] w-[38vw] md:right-[5%] md:top-[11%] md:aspect-square md:w-[19vw]", entra: 0.08, parallax: -70 },
  { img: "sala", alt: "Sala integrada de um apartamento", className: "bottom-[10%] left-[7%] hidden aspect-square w-[14vw] md:block", entra: 0.14, parallax: -100 },
  { img: "sacada", alt: "Sacada com churrasqueira", className: "bottom-6 left-5 aspect-[4/3] w-[38vw] md:bottom-[8%] md:left-auto md:right-[4%] md:aspect-[4/5] md:w-[17vw]", entra: 0.2, parallax: 70 },
];

function FotoFlutuante({ f, p, movel }: { f: Foto; p: MotionValue<number>; movel: boolean }) {
  const k = movel ? 0.2 : 1; // movimento bem menor no celular, para a foto não invadir o texto
  const opacity = useTransform(p, [f.entra, f.entra + 0.14], [0, 1], { clamp: true });
  const scale = useTransform(p, [f.entra, f.entra + 0.22], [0.7, 1], { clamp: true });
  const y = useTransform(p, [0, 1], [f.parallax * k, -f.parallax * k]);
  const raio = useTransform(p, [f.entra, f.entra + 0.22], [60, 20], { clamp: true });
  return (
    <motion.div className={`absolute overflow-hidden ${f.className}`} style={{ opacity, scale, y, borderRadius: raio }}>
      <Image src={`/img/${f.img}.jpg`} alt={f.alt} fill sizes="(min-width: 768px) 20vw, 40vw" className="object-cover" />
    </motion.div>
  );
}

// Seção fixa em fundo claro: o texto acende palavra por palavra enquanto fotos pequenas surgem e flutuam nas bordas.
export default function Manifesto({ text, rotulo }: { text: string; rotulo: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const movel = useSyncExternalStore(
    (aoMudar) => {
      const mq = window.matchMedia("(max-width: 767px)");
      mq.addEventListener("change", aoMudar);
      return () => mq.removeEventListener("change", aoMudar);
    },
    () => window.matchMedia("(max-width: 767px)").matches,
    () => false,
  );

  const palavras = text.split(" ");
  const n = palavras.length;

  return (
    <div ref={ref} className="relative h-[300svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden bg-white">
        {fotos.map((f) => (
          <FotoFlutuante key={f.img} f={f} p={p} movel={movel} />
        ))}

        <div className="relative z-10 mx-auto flex h-full max-w-3xl flex-col items-center justify-center px-6 py-44 text-center md:px-0 md:py-0">
          <Rotulo>{rotulo}</Rotulo>
          <p className="titulo !text-[1.6rem] sm:!text-[2rem] md:!text-[3rem] text-azul" aria-label={text}>
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
