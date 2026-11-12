"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

const EASE = [0.44, 0, 0.56, 1] as const;

// Entrada ao rolar: sobe, desfoca e aparece (mesmo ritmo do site de referência).
export function Reveal({
  children,
  delay = 0,
  y = 28,
  x = 0,
  blur = 8,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  blur?: number;
  className?: string;
  as?: "div" | "li" | "article" | "p" | "h2" | "h3" | "figure";
}) {
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, x, filter: `blur(${blur}px)` }}
      whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.9, delay, ease: EASE }}
    >
      {children}
    </Tag>
  );
}

// Título que revela palavra por palavra (o gatilho fica no wrapper, que não é cortado).
export function RevealWords({
  text,
  className = "",
  delay = 0,
}: {
  text: string;
  className?: string;
  delay?: number;
}) {
  const words = text.split(" ");
  return (
    <motion.span
      className={className}
      aria-label={text}
      initial="oculto"
      whileInView="visivel"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            variants={{
              oculto: { y: "110%" },
              visivel: { y: 0, transition: { duration: 0.9, delay: delay + i * 0.05, ease: EASE } },
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
