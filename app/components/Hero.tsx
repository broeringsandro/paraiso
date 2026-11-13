"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "motion/react";
import { ArrowRight, ArrowUpRight, HardHat, KeyRound, LayoutGrid, MapPin, Waves } from "lucide-react";
import Logo from "./Logo";
import WhatsappIcon from "./WhatsappIcon";
import { PRECO_A_PARTIR } from "../lib/empreendimento";

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

const atalhos = [
  { t: "Lazer", href: "/home-club", icone: Waves },
  { t: "Apartamentos", href: "/apartamentos", icone: KeyRound },
  { t: "Plantas", href: "/plantas", icone: LayoutGrid },
  { t: "Localização", href: "/localizacao", icone: MapPin },
  { t: "Obra", href: "/andamento-da-obra", icone: HardHat },
];

export default function Hero({ whatsapp }: { whatsapp: string }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);

  return (
    <section ref={ref} className="bg-nevoa px-3 pb-3 pt-[88px] md:px-5 md:pb-5 md:pt-[92px]">
      <Intro />

      <div className="relative isolate min-h-[max(760px,calc(100svh-104px))] overflow-hidden rounded-[1.75rem] bg-noite text-white md:min-h-[max(780px,calc(100svh-116px))] md:rounded-[2.25rem]">
        <motion.div className="absolute inset-0 -z-10" style={{ y: bgY, scale: bgScale }}>
          <div className="hero-bg absolute inset-0">
            <Image
              src="/img/fachada-13.jpg"
              alt="Fachada do Paraíso das Águas"
              fill
              priority
              sizes="100vw"
              className="object-cover object-[65%_40%]"
            />
          </div>
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-noite/80 via-noite/35 to-transparent" aria-hidden />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-noite/55 via-transparent to-noite/30" aria-hidden />

        <div className="flex min-h-[inherit] flex-col p-5 md:p-10">
          {/* selos dos cantos */}
          <div className="hero-in flex items-start justify-end gap-3" style={{ animationDelay: "2.2s" }}>
            <span className="hidden rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.16em] backdrop-blur-md sm:inline-flex">
              Santo Amaro da Imperatriz / SC
            </span>
          </div>

          {/* texto principal: etiqueta, logo e título compartilham o mesmo alinhamento à esquerda */}
          <div className="flex flex-1 items-center py-10 md:py-12">
            <div className="max-w-2xl pl-3 md:pl-12 lg:pl-20">
              <div className="hero-in" style={{ animationDelay: "2.25s" }}>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-[11px] uppercase tracking-[0.16em] backdrop-blur-md">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-dourado/70" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-dourado" />
                  </span>
                  Pré-lançamento
                </span>
              </div>
              <div className="hero-in mt-8" style={{ animationDelay: "2.35s" }}>
                <Logo className="mb-2 w-40 brightness-0 invert md:w-52" />
              </div>
              <h1 className="hero-in titulo mt-6 md:mt-8" style={{ animationDelay: "2.5s" }}>
                O primeiro e maior <strong>home club</strong> de Santo Amaro da Imperatriz.
              </h1>
              <p className="hero-in mt-5 max-w-md text-base text-white/85 md:text-lg" style={{ animationDelay: "2.7s" }}>
                Um refúgio onde a água desacelera o tempo.
              </p>
              <div className="hero-in mt-8 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center" style={{ animationDelay: "2.9s" }}>
                <a
                  href={whatsapp}
                  target="_blank"
                  rel="noopener"
                  className="group inline-flex items-center justify-center gap-3 rounded-full bg-whats px-7 py-4 text-sm font-medium uppercase tracking-[0.14em] text-white transition hover:bg-whats-escuro"
                >
                  <WhatsappIcon size={18} /> Agende sua visita
                  <ArrowRight size={16} strokeWidth={1.8} className="transition group-hover:translate-x-1" />
                </a>
                <Link
                  href="/home-club"
                  className="inline-flex items-center justify-center rounded-full border border-white/40 px-7 py-4 text-sm uppercase tracking-[0.14em] backdrop-blur-sm transition hover:border-dourado hover:text-dourado"
                >
                  Ver o lazer
                </Link>
              </div>
            </div>
          </div>

          {/* rodapé do cartão: atalhos e card do empreendimento */}
          <div className="flex items-end justify-between gap-6">
            <ul
              className="hero-in no-scrollbar -mx-5 flex max-w-full gap-2 overflow-x-auto px-5 md:mx-0 md:px-0"
              style={{ animationDelay: "3.1s" }}
            >
              {atalhos.map(({ t, href, icone: I }, i) => (
                <li key={t} className="shrink-0">
                  <Link
                    href={href}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-sm transition ${
                      i === 0
                        ? "bg-white text-azul hover:bg-dourado"
                        : "border border-white/25 bg-white/10 backdrop-blur-md hover:bg-white/25"
                    }`}
                  >
                    <I size={16} strokeWidth={1.5} />
                    {t}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/apartamentos"
              className="hero-in group mb-14 hidden w-[370px] shrink-0 items-center gap-4 rounded-2xl bg-white/95 p-3 text-azul shadow-[0_24px_60px_-24px_rgb(20_36_58/0.6)] backdrop-blur transition hover:-translate-y-1 lg:flex"
              style={{ animationDelay: "3.2s" }}
            >
              <span className="relative h-[72px] w-[72px] shrink-0 overflow-hidden rounded-xl">
                <Image src="/img/sala.jpg" alt="" fill sizes="72px" className="object-cover" />
              </span>
              <span className="flex-1">
                <span className="block text-sm font-medium">Apartamentos de 2 e 3 dormitórios</span>
                <span className="mt-0.5 block text-xs text-grafite/60">68 a 91 m² · com suíte · 112 unidades</span>
                <span className="mt-1.5 block text-base font-medium">A partir de {PRECO_A_PARTIR}</span>
              </span>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-dourado/80 text-noite transition group-hover:bg-dourado">
                <ArrowUpRight size={18} strokeWidth={1.6} />
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
