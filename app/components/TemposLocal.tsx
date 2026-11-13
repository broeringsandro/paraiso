import { MapPin } from "lucide-react";
import { Reveal } from "./Reveal";
import { Counter } from "./Visuals";
import { TEMPOS } from "../lib/localizacao";

// Lista "a X minutos de..." (referência: site da ALZ).
export default function TemposLocal() {
  return (
    <ul className="divide-y divide-azul/10 border-y border-azul/10">
      {TEMPOS.map((t, i) => (
        <Reveal as="li" key={t.local} delay={i * 0.1} className="flex items-center gap-5 py-5 md:gap-8 md:py-6">
          <p className="w-24 shrink-0 text-4xl font-light tracking-tight text-azul md:w-32 md:text-5xl">
            <Counter to={t.min} />
            <span className="ml-1 text-base text-mar">min</span>
          </p>
          <div>
            <p className="text-lg text-azul md:text-xl">{t.local}</p>
            <p className="mt-0.5 flex items-center gap-1.5 text-sm text-grafite/65">
              <MapPin size={14} strokeWidth={1.5} className="text-mar" /> {t.nota}
            </p>
          </div>
        </Reveal>
      ))}
    </ul>
  );
}
