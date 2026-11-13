"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Check, Plus } from "lucide-react";
import { TituloSecao } from "./Pecas";

const grupos = [
  {
    titulo: "Acabamentos",
    itens: [
      "Porcelanato nos ambientes internos e nas sacadas",
      "Forro de gesso rebaixado com pintura",
      "Massa corrida nas paredes",
      "Banheiros com acabamento em cerâmica",
    ],
  },
  {
    titulo: "Conforto e tecnologia",
    itens: [
      "Fechadura eletrônica com senha na porta de entrada",
      "Persianas automatizadas nos dormitórios",
      "Espera completa para ar‑condicionado split nos dormitórios e na sala de estar/jantar",
    ],
  },
  {
    titulo: "Instalações",
    itens: [
      "Água com aquecimento a gás nos banheiros e na cozinha",
      "Estrutura para futura instalação de ponto de carregador elétrico coletivo",
    ],
  },
  {
    titulo: "Sacada e garagem",
    itens: ["Sacada com churrasqueira a carvão em alvenaria, com exaustor", "Todas as garagens são cobertas"],
  },
];

const EASE = [0.44, 0, 0.56, 1] as const;

export default function Especificacoes() {
  const [aberto, setAberto] = useState<number | null>(0);

  return (
    <section className="fundo-nevoa py-14 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <TituloSecao rotulo="Especificações" linhaUm="O que vem" destaque="em cada apartamento." texto="Acabamentos e instalações pensados para o dia a dia." />
        <ul className="border-t border-azul/15">
          {grupos.map((g, i) => {
            const on = aberto === i;
            return (
              <li key={g.titulo} className="border-b border-azul/15">
                <button
                  type="button"
                  onClick={() => setAberto(on ? null : i)}
                  aria-expanded={on}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 py-7 text-left"
                >
                  <span className={`text-2xl font-light tracking-tight transition-colors md:text-3xl ${on ? "text-azul" : "text-azul/60"}`}>{g.titulo}</span>
                  <motion.span
                    animate={{ rotate: on ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full border transition-colors ${on ? "border-dourado bg-dourado text-noite" : "border-azul/25 text-azul"}`}
                  >
                    <Plus size={20} strokeWidth={1.5} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <ul className="grid gap-4 pb-8 pr-14">
                        {g.itens.map((it) => (
                          <li key={it} className="flex items-start gap-3 text-grafite/85">
                            <Check size={18} strokeWidth={1.8} className="mt-0.5 shrink-0 text-mar" />
                            <span className="texto">{it}</span>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
