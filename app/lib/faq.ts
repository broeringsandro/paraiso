export type Pergunta = { pergunta: string; resposta: string };

// Fonte única do FAQ: alimenta o accordion da página e o JSON-LD FAQPage.
export const faq: Pergunta[] = [
  {
    pergunta: "Onde fica o Paraíso das Águas?",
    resposta:
      "Na Rua Major Soares do Nascimento, 400/520, bairro São Francisco de Assis, em Santo Amaro da Imperatriz/SC, a cerca de 500 m da nova sede da Prefeitura.",
  },
  {
    pergunta: "Quantos apartamentos são?",
    resposta: "São 112 apartamentos em duas torres, com 8 apartamentos por andar em cada torre e 7 pavimentos tipo.",
  },
  {
    pergunta: "Quais são as metragens?",
    resposta:
      "As áreas privativas são de 68,18 m², 74,29 m² e 91,00 m², em apartamentos de 2 e 3 dormitórios, todos com suíte.",
  },
  {
    pergunta: "As garagens são cobertas?",
    resposta: "Sim. Todas as garagens são cobertas, no subsolo e no térreo.",
  },
  {
    pergunta: "O que tem no home club?",
    resposta:
      "Piscina com deck, academia, biblioteca e coworking, cinema, espaço gamer, sala de jogos, brinquedoteca, playground, 4 salões de festas, lounges, terraço externo e áreas verdes.",
  },
  {
    pergunta: "Como agendo uma visita?",
    resposta:
      "Pelo WhatsApp (48) 9821-3130 ou pelo formulário da página de contato. Se preferir, fale com o seu corretor de confiança.",
  },
  {
    pergunta: "Sou corretor. Como me cadastro?",
    resposta: "Procure a ALE pelo WhatsApp (48) 9821-3130. Ao procurar a ALE, você é cadastrado.",
  },
  // TODO: confirmar as respostas abaixo com o cliente antes de publicar. Ficam fora da página e do schema até lá.
];

// Perguntas extras de busca, aguardando resposta do cliente (não exibidas).
export const faqPendente = [
  "Qual a previsão de entrega?",
  "Aceita financiamento bancário e FGTS?",
  "Qual o valor estimado do condomínio?",
  "Qual a distância até as águas termais?",
  "O condomínio aceita pets?",
];
