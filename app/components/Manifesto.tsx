"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useMotionTemplate, useScroll, useTransform } from "motion/react";
import { Word } from "./ScrollText";

// Seção fixa: a foto abre de um quadro pequeno até a tela cheia e o texto acende palavra por palavra.
export default function Manifesto({ text, rotulo }: { text: string; rotulo: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const insetY = useTransform(p, [0, 0.3], [16, 0]);
  const insetX = useTransform(p, [0, 0.3], [28, 0]);
  const raio = useTransform(p, [0, 0.3], [36, 0]);
  const clip = useMotionTemplate`inset(${insetY}% ${insetX}% ${insetY}% ${insetX}% round ${raio}px)`;
  const zoom = useTransform(p, [0, 1], [1.3, 1]);
  const escurecer = useTransform(p, [0.1, 0.4], [0.25, 0.68]);
  const rotuloOp = useTransform(p, [0.22, 0.34], [0, 1]);

  const palavras = text.split(" ");
  const n = palavras.length;

  return (
    <div ref={ref} className="relative h-[330svh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <motion.div className="absolute inset-0" style={{ clipPath: clip }}>
          <motion.div className="absolute inset-0" style={{ scale: zoom }}>
            <Image src="/img/fachada-06.jpg" alt="" fill sizes="100vw" className="object-cover" />
          </motion.div>
          <motion.div className="absolute inset-0 bg-noite" style={{ opacity: escurecer }} aria-hidden />
          <div className="absolute inset-0 bg-gradient-to-t from-noite/70 via-transparent to-noite/40" aria-hidden />
        </motion.div>

        <div className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-5 text-white md:px-10">
          <motion.p style={{ opacity: rotuloOp }} className="rotulo mb-6 text-dourado">
            {rotulo}
          </motion.p>
          <motion.p style={{ opacity: rotuloOp }} className="titulo md:!text-[3.3rem]" aria-label={text}>
            {palavras.map((w, i) => {
              const ini = 0.28 + (i / n) * 0.58;
              return <Word key={i} word={w} range={[ini, ini + 0.58 / n]} progress={p} />;
            })}
          </motion.p>
        </div>
      </div>
    </div>
  );
}
