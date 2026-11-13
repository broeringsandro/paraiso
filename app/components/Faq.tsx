"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { Plus } from "lucide-react";
import { TituloSecao } from "./Pecas";
import JsonLd from "./JsonLd";
import { faq } from "../lib/faq";

const EASE = [0.44, 0, 0.56, 1] as const;

export default function Faq() {
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <section className="bg-white py-14 md:py-32">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faq.map((f) => ({ "@type": "Question", name: f.pergunta, acceptedAnswer: { "@type": "Answer", text: f.resposta } })),
        }}
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <TituloSecao rotulo="Perguntas frequentes" linhaUm="Respostas para" destaque="o que mais importa." />
        <ul className="border-t border-azul/15">
          {faq.map((q, i) => {
            const on = aberto === i;
            return (
              <li key={q.pergunta} className="border-b border-azul/15">
                <button
                  type="button"
                  onClick={() => setAberto(on ? null : i)}
                  aria-expanded={on}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
                >
                  <span className={`text-lg transition-colors md:text-xl ${on ? "text-azul" : "text-azul/70"}`}>{q.pergunta}</span>
                  <motion.span
                    animate={{ rotate: on ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${on ? "border-dourado bg-dourado text-noite" : "border-azul/25 text-azul"}`}
                  >
                    <Plus size={18} strokeWidth={1.5} />
                  </motion.span>
                </button>
                <motion.div
                  initial={false}
                  animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className="overflow-hidden"
                  aria-hidden={!on}
                >
                  <p className="texto max-w-xl pb-7 pr-12 text-grafite/80">{q.resposta}</p>
                </motion.div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
