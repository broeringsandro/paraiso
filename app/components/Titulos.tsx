"use client";

import {
  Blocks,
  Building2,
  CalendarDays,
  Camera,
  CircleHelp,
  ClipboardList,
  Clock,
  Dumbbell,
  Gamepad2,
  Grid3x3,
  HardHat,
  KeyRound,
  Landmark,
  Laptop,
  Layers,
  LayoutGrid,
  ListChecks,
  Map,
  MapPin,
  Navigation,
  PartyPopper,
  Phone,
  Ruler,
  ShieldCheck,
  Sofa,
  Sparkles,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { Reveal, RevealWords } from "./Reveal";
import { useT } from "./I18n";

// Ícone de cada etiqueta de seção. Etiquetas sem ícone próprio usam o Sparkles.
const ICONES_ROTULO: Record<string, LucideIcon> = {
  "O empreendimento": Building2,
  "Home club": Waves,
  Apartamentos: KeyRound,
  Plantas: LayoutGrid,
  Localização: MapPin,
  "Andamento da obra": HardHat,
  Contato: Phone,
  "Fale com a gente": Phone,
  Diferenciais: Sparkles,
  "Coworking + academia": Laptop,
  "Para as crianças": Blocks,
  Transparência: ShieldCheck,
  "Ficha técnica": ClipboardList,
  "Anatomia do projeto": Layers,
  "Bem-estar": Dumbbell,
  Trabalho: Laptop,
  Diversão: Gamepad2,
  Família: Blocks,
  Celebração: PartyPopper,
  "Onde fica cada espaço": Map,
  Tipologias: Ruler,
  Ambientes: Sofa,
  Especificações: ListChecks,
  Finais: Grid3x3,
  Cronograma: CalendarDays,
  "Fotos da obra": Camera,
  "Perguntas frequentes": CircleHelp,
  "Como chegar": Navigation,
  "A poucos minutos de": Clock,
  "Nova sede da Prefeitura": Landmark,
};

// Etiqueta de seção: um único estilo (chip com ícone) em todo o site.
export function Rotulo({
  children,
  claro = false,
  icone,
}: {
  children: React.ReactNode;
  claro?: boolean;
  icone?: React.ReactNode;
}) {
  const t = useT();
  const Padrao = (typeof children === "string" && ICONES_ROTULO[children]) || Sparkles;
  return (
    <p className="mb-7">
      <span
        className={`inline-flex items-center gap-2.5 rounded-xl border px-4 py-2.5 text-sm ${
          claro ? "border-white/20 bg-white/10 text-white" : "border-azul/15 bg-cartao/70 text-azul"
        }`}
      >
        <span className={`flex shrink-0 items-center ${claro ? "text-dourado" : "text-mar"}`}>
          {icone ?? <Padrao size={18} strokeWidth={1.5} />}
        </span>
        {typeof children === "string" ? t(children) : children}
      </span>
    </p>
  );
}

// Título de seção reutilizável nas subpáginas.
export function TituloSecao({
  rotulo,
  linhaUm,
  destaque,
  texto,
  claro = false,
}: {
  rotulo: string;
  linhaUm: string;
  destaque: string;
  texto?: string;
  claro?: boolean;
}) {
  const t = useT();
  return (
    <div>
      <Reveal>
        <Rotulo claro={claro}>{rotulo}</Rotulo>
      </Reveal>
      <h2 className={`titulo max-w-3xl ${claro ? "text-white" : "text-azul"}`}>
        <RevealWords text={linhaUm} /> <strong><RevealWords text={destaque} delay={0.2} /></strong>
      </h2>
      {texto && (
        <Reveal delay={0.15}>
          <p className={`texto mt-6 max-w-xl ${claro ? "text-white/75" : "text-grafite/85"}`}>{t(texto)}</p>
        </Reveal>
      )}
    </div>
  );
}

