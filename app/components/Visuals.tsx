"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionTemplate,
  useMotionValue,
  useScroll,
  useTransform,
} from "motion/react";

// Imagem com parallax interno (a foto se move dentro do quadro).
export function ParallaxImage({
  nome,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
  intensidade = 12,
}: {
  nome: string;
  alt: string;
  className?: string;
  sizes?: string;
  intensidade?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${intensidade}%`, `${intensidade}%`]);
  return (
    <div ref={ref} className={`${className.includes("absolute") ? "" : "relative"} overflow-hidden ${className}`}>
      <motion.div className="absolute inset-[-14%]" style={{ y }}>
        <Image src={`/img/${nome}.jpg`} alt={alt} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </div>
  );
}

// Quadro que se abre (clip-path) conforme entra na tela, com a foto desacelerando por dentro.
export function ClipImage({
  nome,
  alt,
  className = "",
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  nome: string;
  alt: string;
  className?: string;
  sizes?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.95", "start 0.25"] });
  const inset = useTransform(scrollYProgress, [0, 1], [18, 0]);
  const clip = useMotionTemplate`inset(${inset}% ${inset}% ${inset}% ${inset}% round 28px)`;
  const scale = useTransform(scrollYProgress, [0, 1], [1.3, 1.02]);
  return (
    <motion.div ref={ref} className={`relative overflow-hidden ${className}`} style={{ clipPath: clip }}>
      <motion.div className="absolute inset-0" style={{ scale }}>
        <Image src={`/img/${nome}.jpg`} alt={alt} fill sizes={sizes} className="object-cover" />
      </motion.div>
    </motion.div>
  );
}

// Número que conta de 0 até o valor quando aparece.
export function Counter({ to, className = "" }: { to: number; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const v = useMotionValue(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(v, to, { duration: 2, ease: [0.22, 1, 0.36, 1] });
    const unsub = v.on("change", (n) => {
      if (ref.current) ref.current.textContent = String(Math.round(n));
    });
    return () => {
      controls.stop();
      unsub();
    };
  }, [inView, to, v]);
  return (
    <span ref={ref} className={className}>
      {to}
    </span>
  );
}
