"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { Menu, X } from "lucide-react";
import WhatsappIcon from "./WhatsappIcon";
import { paginas } from "../lib/site";

// Barra azul sólida. Esconde ao descer e volta ao subir.
export default function Header({ whatsapp }: { whatsapp: string }) {
  const { scrollY } = useScroll();
  const pathname = usePathname();
  const [oculto, setOculto] = useState(false);
  const [aberto, setAberto] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setOculto(y > 400 && y > prev && !aberto);
  });

  return (
    <>
      <motion.header
        initial={{ y: -90, opacity: 0 }}
        animate={{ y: oculto ? -90 : 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.44, 0, 0.56, 1], delay: oculto ? 0 : 0.1 }}
        className="fixed inset-x-0 top-0 z-50 border-b border-white/5 bg-noite text-white"
      >
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-10">
          <Link href="/" aria-label="Paraíso das Águas, página inicial" onClick={() => setAberto(false)}>
            <Image src="/logo/ale-dourado.svg" alt="ALE Empreendimentos" width={119} height={52} priority className="h-auto w-24 md:w-28" />
          </Link>
          <nav className="hidden gap-7 text-[13px] xl:flex" aria-label="Principal">
            {paginas.map((p) => {
              const ativo = pathname === p.href;
              return (
                <Link
                  key={p.href}
                  href={p.href}
                  aria-current={ativo ? "page" : undefined}
                  className={`group relative whitespace-nowrap transition ${ativo ? "text-dourado" : "opacity-85 hover:opacity-100"}`}
                >
                  {p.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-px bg-dourado transition-all duration-500 ${ativo ? "w-full" : "w-0 group-hover:w-full"}`}
                  />
                </Link>
              );
            })}
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
              className="p-2 xl:hidden"
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
            className="fixed inset-0 z-40 flex flex-col justify-center gap-5 bg-noite px-8 text-white xl:hidden"
          >
            {paginas.map((p, i) => (
              <motion.div
                key={p.href}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0, transition: { delay: 0.25 + i * 0.06, duration: 0.6 } }}
              >
                <Link
                  href={p.href}
                  onClick={() => setAberto(false)}
                  className={`text-3xl font-light tracking-tight ${pathname === p.href ? "text-dourado" : ""}`}
                >
                  {p.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
