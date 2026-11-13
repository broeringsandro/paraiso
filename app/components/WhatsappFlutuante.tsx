"use client";

import { useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import WhatsappIcon from "./WhatsappIcon";
import { WA_LINK } from "../lib/site";

// Aparece só depois de rolar um pouco: no topo, o header e a hero já têm botão de WhatsApp.
export default function WhatsappFlutuante() {
  const { scrollY } = useScroll();
  const [mostrar, setMostrar] = useState(false);
  useMotionValueEvent(scrollY, "change", (y) => setMostrar(y > 600));

  return (
    <AnimatePresence>
      {mostrar && (
        <motion.a
          href={WA_LINK}
          target="_blank"
          rel="noopener"
          aria-label="Falar no WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 20 }}
          transition={{ duration: 0.35, ease: [0.44, 0, 0.56, 1] }}
          className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whats text-white shadow-lg hover:bg-whats-escuro"
        >
          <WhatsappIcon size={28} />
        </motion.a>
      )}
    </AnimatePresence>
  );
}
