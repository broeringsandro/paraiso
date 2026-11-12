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

// Sol que percorre o arco leste-oeste e bússola com o norte a 25°.
export function SolarArc() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.9", "end 0.3"] });
  const theta = useTransform(scrollYProgress, [0, 1], [Math.PI, 0]);
  const cx = useTransform(theta, (t) => 160 + 140 * Math.cos(t));
  const cy = useTransform(theta, (t) => 160 - 140 * Math.sin(t));
  const rot = useTransform(scrollYProgress, [0, 1], [-40, 25]);
  const glow = useTransform(scrollYProgress, [0, 0.5, 1], [0.45, 1, 0.45]);
  return (
    <div ref={ref} className="relative mx-auto w-full max-w-md">
      <svg viewBox="0 0 320 190" className="w-full" role="img" aria-label="Arco solar: sol da manhã a leste, sol da tarde a oeste">
        <path d="M20 160 A140 140 0 0 1 300 160" fill="none" stroke="#d6bf98" strokeOpacity="0.35" strokeDasharray="3 6" />
        <line x1="10" y1="160" x2="310" y2="160" stroke="#a9bfd1" strokeOpacity="0.4" />
        <text x="20" y="182" fill="#a9bfd1" fontSize="9" letterSpacing="2" textAnchor="start">LESTE · MANHÃ</text>
        <text x="300" y="182" fill="#a9bfd1" fontSize="9" letterSpacing="2" textAnchor="end">OESTE · TARDE</text>
        <motion.circle cx={cx} cy={cy} r="9" fill="#d6bf98" style={{ opacity: glow, filter: "drop-shadow(0 0 10px rgb(214 191 152 / 0.9))" }} />
      </svg>
      <motion.svg viewBox="0 0 80 80" className="absolute right-0 top-0 h-14 w-14" style={{ rotate: rot }} aria-hidden>
        <circle cx="40" cy="40" r="36" fill="none" stroke="#d6bf98" strokeOpacity="0.5" />
        <path d="M40 8 L47 40 L40 35 L33 40 Z" fill="#d6bf98" />
        <path d="M40 72 L47 40 L40 45 L33 40 Z" fill="#4c7396" />
      </motion.svg>
    </div>
  );
}
