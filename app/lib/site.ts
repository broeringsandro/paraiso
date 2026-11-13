import { WHATSAPP } from "./contato";

export const WA_LINK = `https://wa.me/${WHATSAPP}`;
export const TELEFONE = "(48) 9821-3130";
export const ENDERECO =
  "Rua Major Soares do Nascimento, 400/520, São Francisco de Assis, Santo Amaro da Imperatriz/SC";

// TODO: coordenadas aproximadas da rua; confirmar o ponto exato do terreno com o cliente.
export const COORDENADAS = { lat: -27.67937, lng: -48.76879 };
export const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${COORDENADAS.lat},${COORDENADAS.lng}`;
export const WAZE_LINK = `https://waze.com/ul?ll=${COORDENADAS.lat},${COORDENADAS.lng}&navigate=yes`;

// Uma página para cada item do menu, com uma palavra só.
export const paginas = [
  { label: "Projeto", href: "/empreendimento" },
  { label: "Lazer", href: "/home-club" },
  { label: "Apartamentos", href: "/apartamentos" },
  { label: "Plantas", href: "/plantas" },
  { label: "Localização", href: "/localizacao" },
  { label: "Obra", href: "/andamento-da-obra" },
  { label: "Contato", href: "/contato" },
] as const;
