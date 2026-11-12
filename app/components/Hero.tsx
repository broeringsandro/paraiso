"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "motion/react";
import { ChevronDown } from "lucide-react";
import Logo from "./Logo";
import WhatsappIcon from "./WhatsappIcon";

// Cortina de abertura 100% CSS: nunca bloqueia a página, mesmo sem JS.
function Intro() {
  return (
    <div className="intro" aria-hidden>
      <div className="intro-logo">
        <Logo className="w-56 md:w-80" />
      </div>
    </div>
  );
}

export default function Hero({ whatsapp }: { whatsapp: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], ["0%", "-25%"]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-end justify-center overflow-hidden bg-noite text-white">
      <Intro />

      <motion.div className="absolute inset-0 -z-10" style={{ y: bgY, scale: bgScale }}>
        <div className="hero-bg absolute inset-0">
          <Image src="/img/fachada-08.jpg" alt="Fachada das duas torres do Paraíso das Águas" fill priority sizes="100vw" className="object-cover" />
        </div>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-noite/60 via-noite/30 to-noite/95" aria-hidden />
      <div className="absolute inset-0 -z-10 [background:radial-gradient(ellipse_at_50%_70%,rgb(20_36_58/0.55)_0%,transparent_65%)]" aria-hidden />

      <motion.div
        style={{ opacity: fade, y: lift }}
        className="relative flex w-full max-w-4xl flex-col items-center gap-6 px-6 pb-36 text-center md:pb-40"
      >
        <p className="hero-in rotulo text-dourado" style={{ animationDelay: "2.3s" }}>
          Pré-lançamento · Santo Amaro da Imperatriz/SC
        </p>
        <h1 className="hero-in titulo" style={{ animationDelay: "2.5s" }}>
          O primeiro e maior <strong>home club</strong> de Santo Amaro da Imperatriz.
        </h1>
        <p className="hero-in max-w-xl text-base text-white/85 md:text-lg" style={{ animationDelay: "2.75s" }}>
          Um refúgio onde a água desacelera o tempo.
        </p>
        <div className="hero-in mt-2 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center" style={{ animationDelay: "3s" }}>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-dourado px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-noite transition hover:bg-white"
          >
            <WhatsappIcon size={18} /> Agende sua visita
          </a>
          <a
            href="#empreendimento"
            className="inline-flex items-center justify-center rounded-full bg-white/15 px-8 py-4 text-sm uppercase tracking-[0.15em] text-white backdrop-blur-md transition hover:bg-white/25"
          >
            Conheça o projeto
          </a>
        </div>
      </motion.div>

      <motion.div style={{ opacity: fade }} className="absolute inset-x-0 bottom-0 flex items-end justify-between px-5 pb-8 md:px-10">
        <div className="hero-in hidden gap-10 text-xs uppercase tracking-[0.2em] text-white/70 md:flex" style={{ animationDelay: "3.2s" }}>
          <span>2 torres</span>
          <span>112 apartamentos</span>
          <span>Home club completo</span>
        </div>
        <div className="hero-in mx-auto flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-white/70 md:mx-0" style={{ animationDelay: "3.3s" }}>
          Role
          <ChevronDown size={18} strokeWidth={1.5} className="animate-bounce" />
        </div>
      </motion.div>
    </section>
  );
}
