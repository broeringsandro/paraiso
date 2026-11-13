"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Plus } from "lucide-react";
import { TituloSecao } from "./Pecas";

const perguntas = [
  {
    p: "Onde fica o Paraíso das Águas?",
    r: "Na Rua Major Soares do Nascimento, 400/520, bairro São Francisco de Assis, em Santo Amaro da Imperatriz/SC, a cerca de 500 m da nova sede da Prefeitura.",
  },
  {
    p: "Quantos apartamentos são?",
    r: "São 112 apartamentos em duas torres, com 8 apartamentos por andar em cada torre e 7 pavimentos tipo.",
  },
  {
    p: "Quais são as metragens?",
    r: "As áreas privativas são de 68,18 m², 74,29 m² e 91,00 m², em apartamentos de 2 e 3 dormitórios, todos com suíte.",
  },
  {
    p: "As garagens são cobertas?",
    r: "Sim. Todas as garagens são cobertas, no subsolo e no térreo.",
  },
  {
    p: "O que tem no home club?",
    r: "Piscina com deck, academia, biblioteca e coworking, cinema, espaço gamer, sala de jogos, brinquedoteca, playground, 4 salões de festas, lounges, terraço externo e áreas verdes.",
  },
  {
    p: "Como agendo uma visita?",
    r: "Pelo WhatsApp (48) 9821-3130 ou pelo formulário desta página. Se preferir, fale com o seu corretor de confiança.",
  },
  {
    p: "Sou corretor. Como me cadastro?",
    r: "Procure a ALE pelo WhatsApp (48) 9821-3130. Ao procurar a ALE, você é cadastrado.",
  },
];

const EASE = [0.44, 0, 0.56, 1] as const;

export default function Faq() {
  const [aberto, setAberto] = useState<number | null>(null);

  return (
    <section className="bg-white py-20 md:py-32">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
        <TituloSecao rotulo="Perguntas frequentes" linhaUm="Respostas para" destaque="o que mais importa." />
        <ul className="border-t border-azul/15">
          {perguntas.map((q, i) => {
            const on = aberto === i;
            return (
              <li key={q.p} className="border-b border-azul/15">
                <button
                  type="button"
                  onClick={() => setAberto(on ? null : i)}
                  aria-expanded={on}
                  className="flex w-full cursor-pointer items-center justify-between gap-6 py-6 text-left"
                >
                  <span className={`text-lg transition-colors md:text-xl ${on ? "text-azul" : "text-azul/70"}`}>{q.p}</span>
                  <motion.span
                    animate={{ rotate: on ? 45 : 0 }}
                    transition={{ duration: 0.35, ease: EASE }}
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${on ? "border-dourado bg-dourado text-noite" : "border-azul/25 text-azul"}`}
                  >
                    <Plus size={18} strokeWidth={1.5} />
                  </motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {on && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: EASE }}
                      className="overflow-hidden"
                    >
                      <p className="texto max-w-xl pb-7 pr-12 text-grafite/80">{q.r}</p>
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
