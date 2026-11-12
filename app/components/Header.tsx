"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import WhatsappIcon from "./WhatsappIcon";

const nav = [
  ["O empreendimento", "#empreendimento"],
  ["Home club", "#home-club"],
  ["Apartamentos", "#apartamentos"],
  ["Plantas", "#plantas"],
  ["Localização", "#localizacao"],
  ["Contato", "#contato"],
] as const;

// Esconde ao descer, volta ao subir, ganha fundo depois do hero.
export default function Header({ whatsapp }: { whatsapp: string }) {
  const { scrollY } = useScroll();
  const [oculto, setOculto] = useState(false);
  const [solido, setSolido] = useState(false);
  const [aberto, setAberto] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setSolido(y > 60);
    setOculto(y > 400 && y > prev && !aberto);
  });

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: oculto ? -90 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.44, 0, 0.56, 1], delay: oculto ? 0 : 0.1 }}
        className={`fixed inset-x-0 top-0 z-50 text-white transition-colors duration-500 ${
          solido || aberto ? "bg-noite/80 backdrop-blur-md" : "bg-gradient-to-b from-noite/60 to-transparent"
        }`}
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-10">
          <a href="#topo" aria-label="ALE Empreendimentos, início">
            <Image src="/logo/ale-dourado.svg" alt="ALE Empreendimentos" width={119} height={52} priority className="h-auto w-24 md:w-28" />
          </a>
          <nav className="hidden gap-8 text-[13px] lg:flex" aria-label="Principal">
            {nav.map(([t, h]) => (
              <a key={h} href={h} className="group relative opacity-85 transition hover:opacity-100">
                {t}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-dourado transition-all duration-500 group-hover:w-full" />
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <a
              href={whatsapp}
              target="_blank"
              rel="noopener"
              className="inline-flex items-center gap-2 rounded-full border border-dourado px-4 py-2 text-xs font-medium uppercase tracking-[0.15em] text-dourado transition hover:bg-dourado hover:text-noite"
            >
              <WhatsappIcon size={16} />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
            <button
              type="button"
              onClick={() => setAberto((v) => !v)}
              aria-label={aberto ? "Fechar menu" : "Abrir menu"}
              aria-expanded={aberto}
              className="p-2 lg:hidden"
            >
              {aberto ? <X size={26} strokeWidth={1.5} /> : <Menu size={26} strokeWidth={1.5} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {aberto && (
          <motion.div
            key="menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center gap-6 bg-noite px-8 text-white lg:hidden"
          >
            {nav.map(([t, h], i) => (
              <motion.a
                key={h}
                href={h}
                onClick={() => setAberto(false)}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.25 + i * 0.06, duration: 0.6 } }}
                className="text-3xl font-light tracking-tight"
              >
                {t}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
