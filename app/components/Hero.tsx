"use client";

import { useRef } from "react";
import Image from "next/image";
import { PRECO_A_PARTIR } from "../lib/empreendimento";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, MapPin } from "lucide-react";
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

const stats = [
  { n: "2 e 3", l: "dormitórios, sendo 1 suíte" },
  { n: "68 a 91m²", l: "área privativa" },
  { n: "112", l: "apartamentos em 2 torres" },
  { n: PRECO_A_PARTIR, l: "unidades a partir de" },
];

export default function Hero({ whatsapp }: { whatsapp: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "22%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.18]);
  const fade = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  const lift = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  return (
    <section ref={ref} className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-noite text-white">
      <Intro />

      <motion.div className="absolute inset-0 -z-10" style={{ y: bgY, scale: bgScale }}>
        <div className="hero-bg absolute inset-0">
          <Image
            src="/img/fachada-08.jpg"
            alt="Fachada das duas torres do Paraíso das Águas"
            fill
            priority
            sizes="100vw"
            className="object-cover object-[50%_30%] brightness-[0.78]"
          />
        </div>
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-noite/65 via-transparent to-transparent" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-noite via-noite/85 via-30% to-transparent to-70%" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-noite/80 via-noite/35 to-transparent" aria-hidden />

      <motion.div
        style={{ opacity: fade, y: lift }}
        className="relative mx-auto flex w-full max-w-7xl flex-col items-start gap-5 px-5 pb-10 pt-32 md:px-10 md:pb-14"
      >
        <div className="hero-in flex flex-wrap items-center gap-3" style={{ animationDelay: "2.2s" }}>
          <span className="inline-flex items-center gap-2.5 rounded-full bg-dourado px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-noite">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-noite/60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-noite" />
            </span>
            Pré-lançamento
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.18em] text-white backdrop-blur-md">
            <MapPin size={14} strokeWidth={1.6} />
            Santo Amaro da Imperatriz / SC
          </span>
        </div>

        <h1 className="hero-in" style={{ animationDelay: "2.5s" }}>
          <Logo className="w-[min(78vw,560px)] brightness-0 invert drop-shadow-[0_6px_30px_rgb(20_36_58/0.65)]" />
          <span className="sr-only">Paraíso das Águas</span>
        </h1>

        <p
          className="hero-in max-w-2xl text-xl font-light leading-snug text-white/90 md:text-3xl [&_strong]:font-medium"
          style={{ animationDelay: "2.7s" }}
        >
          O primeiro e maior <strong>home club</strong> de Santo Amaro da Imperatriz.
        </p>

        <div className="hero-in mt-1 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center" style={{ animationDelay: "2.9s" }}>
          <a
            href={whatsapp}
            target="_blank"
            rel="noopener"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-dourado px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-noite transition hover:bg-white"
          >
            <WhatsappIcon size={18} /> Agende sua visita <ArrowRight size={16} strokeWidth={1.8} />
          </a>
          <a
            href="#home-club"
            className="inline-flex items-center justify-center rounded-full border border-white/40 px-8 py-4 text-sm uppercase tracking-[0.15em] text-white backdrop-blur-sm transition hover:border-dourado hover:text-dourado"
          >
            Ver o lazer
          </a>
        </div>

        <dl className="mt-8 grid w-full grid-cols-2 gap-x-6 gap-y-7 md:mt-10 md:grid-cols-4">
          {stats.map((st, i) => (
            <div key={st.l} className="hero-in border-l border-white/30 pl-5" style={{ animationDelay: `${3.1 + i * 0.12}s` }}>
              <dd className="text-2xl font-light tracking-tight md:text-5xl">{st.n}</dd>
              <dt className="mt-1 text-xs text-white/75 md:text-base">{st.l}</dt>
            </div>
          ))}
        </dl>
      </motion.div>
    </section>
  );
}
