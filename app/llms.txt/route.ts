import { SITE_URL, ENDERECO, TELEFONE } from "../lib/site";

// Resumo factual para buscadores de IA. As URLs seguem NEXT_PUBLIC_SITE_URL.
export function GET() {
  const corpo = `# Residencial Paraíso das Águas
> Condomínio residencial da construtora ALE em Santo Amaro da Imperatriz/SC, com 2 torres, 112 apartamentos de 2 e 3 dormitórios com suíte e home club completo.

## Informações
- Endereço: ${ENDERECO}
- Unidades: 112 apartamentos em 2 torres, 8 por andar em cada torre, 7 pavimentos tipo
- Tipologias: Tipo 01 (91,00 m², 3 dormitórios, sendo 1 suíte), Tipo 02 (74,29 m², 2 dormitórios, sendo 1 suíte) e Tipo 03 (68,18 m², 2 dormitórios, sendo 1 suíte). Áreas privativas.
- Garagens: todas cobertas, no subsolo e no térreo
- Home club: piscina com deck, academia, biblioteca e coworking, cinema, espaço gamer, sala de jogos, brinquedoteca, playground, 4 salões de festas, lounges, terraço externo e áreas verdes
- Localização: a cerca de 500 m da nova sede da Prefeitura de Santo Amaro da Imperatriz, com acesso pela BR-282
- Previsão de entrega: a confirmar
- Contato: WhatsApp ${TELEFONE}

## Páginas
- [O Projeto](${SITE_URL}/empreendimento)
- [Home Club](${SITE_URL}/home-club)
- [Apartamentos](${SITE_URL}/apartamentos)
- [Plantas](${SITE_URL}/plantas)
- [Localização](${SITE_URL}/localizacao)
- [Andamento da obra](${SITE_URL}/andamento-da-obra)
- [Contato](${SITE_URL}/contato)
`;
  return new Response(corpo, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
