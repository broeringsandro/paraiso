"use client";

import { motion } from "motion/react";
import { Counter, ParallaxImage } from "./Visuals";
import { OBRA } from "../lib/obra";

const EASE = [0.44, 0, 0.56, 1] as const;
const R = 52;
const C = 2 * Math.PI * R;

function Anel({ valor }: { valor: number }) {
  return (
    <div className="relative h-32 w-32 shrink-0">
      <svg viewBox="0 0 120 120" className="h-full w-full -rotate-90" aria-hidden>
        <circle cx="60" cy="60" r={R} fill="none" stroke="#1c3a57" strokeOpacity="0.1" strokeWidth="5" />
        <motion.circle
          cx="60"
          cy="60"
          r={R}
          fill="none"
          stroke="#d6bf98"
          strokeWidth="5"
          strokeLinecap="round"
          strokeDasharray={C}
          initial={{ strokeDashoffset: C }}
          whileInView={{ strokeDashoffset: C * (1 - valor / 100) }}
          viewport={{ once: true, margin: "0px 0px -10% 0px" }}
          transition={{ duration: 1.6, ease: EASE }}
        />
      </svg>
      <p className="absolute inset-0 flex items-center justify-center text-3xl font-light text-azul">
        <Counter to={valor} />
        <span className="text-base">%</span>
      </p>
    </div>
  );
}

export default function ObraPainel() {
  return (
    <div className="grid overflow-hidden rounded-3xl bg-white shadow-[0_30px_80px_-50px_rgb(20_36_58/0.4)] lg:grid-cols-[0.9fr_1.1fr]">
      <div className="relative min-h-[320px] lg:min-h-full">
        {/* TODO: trocar pelas fotos reais da obra quando houver. */}
        <ParallaxImage nome="fachada-13" alt="Imagem ilustrativa do empreendimento" className="absolute inset-0" sizes="(min-width: 1024px) 45vw, 100vw" intensidade={8} />
        <p className="absolute bottom-4 left-5 rounded-full bg-white/85 px-3 py-1 text-[11px] uppercase tracking-[0.16em] text-azul backdrop-blur">
          Imagem ilustrativa
        </p>
      </div>

      <div className="p-7 md:p-12">
        <div className="flex items-center gap-6">
          <Anel valor={OBRA.geral} />
          <div>
            <p className="rotulo text-mar">Andamento geral</p>
            <p className="mt-2 text-2xl font-light text-azul md:text-3xl">Paraíso das Águas</p>
            <p className="mt-1 text-sm text-grafite/70">Santo Amaro da Imperatriz/SC</p>
          </div>
        </div>

        <dl className="mt-9 grid grid-cols-1 gap-6 border-y border-azul/10 py-7 sm:grid-cols-3">
          {[
            ["Fase atual", OBRA.fase],
            ["Entrega", OBRA.entrega],
            ["Última medição", OBRA.medicao],
          ].map(([t, v]) => (
            <div key={t}>
              <dt className="rotulo text-mar">{t}</dt>
              <dd className="mt-2 text-azul">{v}</dd>
            </div>
          ))}
        </dl>

        <ul className="mt-8 grid gap-5">
          {OBRA.etapas.map((e, i) => (
            <li key={e.nome}>
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <span className="text-azul">{e.nome}</span>
                <span className="tabular-nums text-grafite/70">{e.valor}%</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-azul/10">
                <motion.div
                  className="h-full rounded-full bg-dourado"
                  initial={{ width: 0 }}
                  whileInView={{ width: `${e.valor}%` }}
                  viewport={{ once: true, margin: "0px 0px -8% 0px" }}
                  transition={{ duration: 1.2, delay: 0.15 + i * 0.1, ease: EASE }}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
