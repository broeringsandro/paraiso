"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { BookOpen, Building2, Sun, SquareParking, type LucideIcon } from "lucide-react";
import { Reveal } from "./Reveal";
import { TituloSecao } from "./Pecas";

type Nivel = { id: string; nome: string; titulo: string; texto: string; icone: LucideIcon };

const niveis: Nivel[] = [
  {
    id: "atico",
    nome: "Ático",
    titulo: "No topo, o lugar de trabalhar e de se divertir.",
    texto: "Biblioteca e coworking, cinema e espaço gamer, no alto de cada torre.",
    icone: BookOpen,
  },
  {
    id: "tipo",
    nome: "Pavimentos tipo",
    titulo: "Sete andares de apartamentos.",
    texto:
      "Oito apartamentos por andar em cada torre, com dois elevadores por torre. Apartamentos de 2 e 3 dormitórios com suíte.",
    icone: Building2,
  },
  {
    id: "terreo",
    nome: "Térreo",
    titulo: "O home club ao nível da rua.",
    texto:
      "Piscina com deck, academia, salões de festas, brinquedoteca, playground, lounges e áreas verdes. Garagens cobertas.",
    icone: Sun,
  },
  {
    id: "subsolo",
    nome: "Subsolo",
    titulo: "Garagens cobertas.",
    texto: "Todas as garagens do empreendimento são cobertas, no subsolo e no térreo.",
    icone: SquareParking,
  },
];

function ItemNivel({ n, i, aoVer }: { n: Nivel; i: number; aoVer: (i: number) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const noMeio = useInView(ref, { margin: "-42% 0px -42% 0px" });
  useEffect(() => {
    if (noMeio) aoVer(i);
  }, [noMeio, i, aoVer]);
  const I = n.icone;
  return (
    <div ref={ref} className="flex items-center py-10 lg:min-h-[62svh] lg:py-0">
      <Reveal>
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-white text-mar shadow-sm">
          <I size={26} strokeWidth={1.3} />
        </span>
        <p className="rotulo mb-4 mt-6 text-mar">{n.nome}</p>
        <h3 className="max-w-md text-3xl font-light leading-tight tracking-tight text-azul md:text-4xl">{n.titulo}</h3>
        <p className="texto mt-5 max-w-md text-grafite/80">{n.texto}</p>
      </Reveal>
    </div>
  );
}

// Corte esquemático do prédio: ao rolar, o nível descrito se acende no desenho.
export default function PredioCorte() {
  const [ativo, setAtivo] = useState(0);

  const bloco = (i: number) => `transition-colors duration-700 ${ativo === i ? "bg-dourado" : "bg-azul/15"}`;
  const rotulo = (i: number) =>
    `absolute -right-3 top-1/2 hidden -translate-y-1/2 translate-x-full whitespace-nowrap text-xs uppercase tracking-[0.18em] transition-colors duration-700 md:block ${ativo === i ? "text-azul" : "text-azul/30"}`;

  return (
    <section className="bg-nevoa py-24 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <TituloSecao rotulo="Anatomia do projeto" linhaUm="Do subsolo" destaque="ao ático." texto="Role para percorrer cada nível das torres." />

        <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="hidden lg:block">
            <div className="sticky top-32 flex h-[68svh] items-center justify-center">
              <div className="relative w-full max-w-[22rem]">
                {/* ático */}
                <div className="relative mx-auto w-[56%]">
                  <div className={`h-16 rounded-t-2xl ${bloco(0)}`} />
                  <span className={rotulo(0)}>Ático</span>
                </div>
                {/* pavimentos tipo */}
                <div className="relative mt-1">
                  <div className={`grid h-56 grid-rows-7 gap-1 rounded-lg p-1.5 ${bloco(1)}`}>
                    {Array.from({ length: 7 }).map((_, k) => (
                      <motion.span
                        key={k}
                        className="rounded-sm bg-nevoa/70"
                        animate={{ opacity: ativo === 1 ? 1 : 0.55 }}
                        transition={{ duration: 0.5, delay: ativo === 1 ? k * 0.05 : 0 }}
                      />
                    ))}
                  </div>
                  <span className={rotulo(1)}>7 pavimentos tipo</span>
                </div>
                {/* térreo */}
                <div className="relative mt-1">
                  <div className={`h-20 rounded-sm ${bloco(2)}`} />
                  <span className={rotulo(2)}>Térreo</span>
                </div>
                {/* nível do solo */}
                <div className="relative my-2 h-px w-[125%] -translate-x-[10%] border-t border-dashed border-azul/30" aria-hidden />
                {/* subsolo */}
                <div className="relative mx-auto w-[94%]">
                  <div className={`h-16 rounded-b-2xl ${bloco(3)}`} />
                  <span className={rotulo(3)}>Subsolo</span>
                </div>
              </div>
            </div>
          </div>

          <div>
            {niveis.map((n, i) => (
              <ItemNivel key={n.id} n={n} i={i} aoVer={setAtivo} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
