"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";
import { Droplets, Dumbbell, Flame, MapPin, PartyPopper, SquareParking, Sunrise, Waves } from "lucide-react";

// Faixa que corre sozinha e acelera / inverte de sentido conforme a velocidade do scroll.
function Faixa({ base, children, className = "" }: { base: number; children: ReactNode; className?: string }) {
  const reduzir = useReducedMotion();
  const x = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocidade = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const fator = useTransform(velocidade, [0, 1000], [0, 5], { clamp: false });
  const sentido = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduzir) return;
    let passo = sentido.current * base * (delta / 1000);
    const f = fator.get();
    if (f < 0) sentido.current = -1;
    else if (f > 0) sentido.current = 1;
    passo += sentido.current * passo * f;
    x.set(x.get() + passo);
  });

  // Laço contínuo: o conteúdo aparece duplicado, então o ciclo é de 50%.
  const deslocamento = useTransform(x, (v) => `${(((v % 50) + 50) % 50) - 50}%`);

  return (
    <div
      className={`overflow-hidden [mask-image:linear-gradient(90deg,transparent,#000_6%,#000_94%,transparent)] ${className}`}
      aria-hidden
    >
      <motion.div className="flex w-max" style={{ x: deslocamento }}>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </motion.div>
    </div>
  );
}

const itens: { t: string; icone: ReactNode }[] = [
  { t: "Pré-lançamento", icone: <Sunrise size={18} strokeWidth={1.6} /> },
  { t: "O primeiro e maior home club da cidade", icone: <Waves size={18} strokeWidth={1.6} /> },
  { t: "Sacada com churrasqueira", icone: <Flame size={18} strokeWidth={1.6} /> },
  { t: "Todas as garagens são cobertas", icone: <SquareParking size={18} strokeWidth={1.6} /> },
  { t: "Coworking e academia", icone: <Dumbbell size={18} strokeWidth={1.6} /> },
  { t: "4 salões de festas", icone: <PartyPopper size={18} strokeWidth={1.6} /> },
  { t: "Santo Amaro da Imperatriz", icone: <MapPin size={18} strokeWidth={1.6} /> },
];

export default function Letreiro() {
  return (
    <div role="presentation" className="relative">
      <div className="bg-dourado py-5 text-noite">
        <Faixa base={-4.2}>
          {itens.map((it) => (
            <span key={it.t} className="flex items-center whitespace-nowrap">
              <span className="flex items-center gap-3 px-6">
                <span className="flex h-9 w-9 items-center justify-center rounded-full border border-noite/30">{it.icone}</span>
                <span className="text-sm font-medium uppercase tracking-[0.2em]">{it.t}</span>
              </span>
              <Droplets size={16} strokeWidth={1.6} className="mx-4 opacity-50" />
            </span>
          ))}
        </Faixa>
      </div>
    </div>
  );
}
