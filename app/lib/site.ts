import { WHATSAPP } from "./contato";

export const WA_LINK = `https://wa.me/${WHATSAPP}`;
export const TELEFONE = "(48) 9821-3130";
export const ENDERECO =
  "Rua Major Soares do Nascimento, 400/520, São Francisco de Assis, Santo Amaro da Imperatriz/SC";

// Uma página para cada item do menu.
export const paginas = [
  { label: "O empreendimento", href: "/empreendimento" },
  { label: "Home club", href: "/home-club" },
  { label: "Apartamentos", href: "/apartamentos" },
  { label: "Plantas", href: "/plantas" },
  { label: "Localização", href: "/localizacao" },
  { label: "Andamento da obra", href: "/andamento-da-obra" },
  { label: "Contato", href: "/contato" },
] as const;
