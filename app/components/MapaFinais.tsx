"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { TituloSecao } from "./Pecas";

type Tipo = "t1" | "t2" | "t3";

// TODO: confirmar com o cliente a associação Tipo 02 / Tipo 03 às metragens.
const tipos: Record<Tipo, { nome: string; area: string; dorms: string; cor: string; texto: string }> = {
  t1: { nome: "Tipo 01", area: "91,00", dorms: "3 dormitórios, sendo 1 suíte", cor: "bg-azul", texto: "text-white" },
  t2: { nome: "Tipo 02", area: "74,29", dorms: "2 dormitórios, sendo 1 suíte", cor: "bg-mar", texto: "text-white" },
  t3: { nome: "Tipo 03", area: "68,18", dorms: "2 dormitórios, sendo 1 suíte", cor: "bg-dourado", texto: "text-noite" },
};

// Finais de cada torre, na ordem do pavimento.
const torres: { nome: string; faixa: string; finais: [string, Tipo][] }[] = [
  {
    nome: "Torre A",
    faixa: "Apartamentos de 101 a 708",
    finais: [["01", "t3"], ["02", "t1"], ["03", "t1"], ["04", "t2"], ["05", "t2"], ["06", "t1"], ["07", "t1"], ["08", "t3"]],
  },
  {
    nome: "Torre B",
    faixa: "Apartamentos de 111 a 718",
    finais: [["11", "t3"], ["12", "t1"], ["13", "t1"], ["14", "t2"], ["15", "t2"], ["16", "t1"], ["17", "t1"], ["18", "t3"]],
  },
];

const EASE = [0.44, 0, 0.56, 1] as const;

export default function MapaFinais() {
  const [filtro, setFiltro] = useState<Tipo | null>(null);
  const info = filtro ? tipos[filtro] : null;

  return (
    <section className="bg-nevoa py-20 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <TituloSecao rotulo="Finais" linhaUm="Cada final," destaque="uma tipologia." texto="Escolha uma tipologia para ver em quais finais ela aparece, em cada torre." />

        <div className="mt-12 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setFiltro(null)}
            aria-pressed={filtro === null}
            className={`rounded-full border px-5 py-2.5 text-sm transition ${filtro === null ? "border-azul bg-azul text-white" : "border-azul/20 text-azul hover:border-azul"}`}
          >
            Todas
          </button>
          {(Object.keys(tipos) as Tipo[]).map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setFiltro(filtro === k ? null : k)}
              aria-pressed={filtro === k}
              className={`flex items-center gap-2.5 rounded-full border px-5 py-2.5 text-sm transition ${filtro === k ? "border-azul bg-azul text-white" : "border-azul/20 text-azul hover:border-azul"}`}
            >
              <span className={`h-3 w-3 rounded-full ${tipos[k].cor}`} />
              {tipos[k].nome}
            </button>
          ))}
        </div>

        <div className="mt-8 grid gap-5">
          {torres.map((t) => (
            <div key={t.nome} className="rounded-3xl bg-white p-6 md:p-9">
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-2xl font-light text-azul">{t.nome}</p>
                <p className="text-sm text-grafite/60">{t.faixa}</p>
              </div>
              <ul className="grid grid-cols-4 gap-2 md:grid-cols-8 md:gap-3">
                {t.finais.map(([final, tipo]) => {
                  const on = !filtro || filtro === tipo;
                  const d = tipos[tipo];
                  return (
                    <motion.li
                      key={final}
                      layout
                      animate={{ opacity: on ? 1 : 0.18, scale: on ? 1 : 0.94 }}
                      transition={{ duration: 0.45, ease: EASE }}
                      className={`flex aspect-square flex-col items-center justify-center rounded-2xl ${d.cor} ${d.texto}`}
                    >
                      <span className="text-2xl font-light md:text-3xl">{final}</span>
                      <span className="mt-1 text-[10px] uppercase tracking-[0.14em] opacity-80">{d.nome}</span>
                    </motion.li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-6 min-h-[64px]">
          <AnimatePresence mode="wait">
            <motion.p
              key={filtro ?? "todas"}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="text-azul"
            >
              {info ? (
                <>
                  <strong className="font-medium">{info.nome}</strong>: {info.area} m² de área privativa, {info.dorms}.
                </>
              ) : (
                <span className="text-grafite/65">Esquema ilustrativo de um pavimento tipo, sem escala.</span>
              )}
            </motion.p>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
