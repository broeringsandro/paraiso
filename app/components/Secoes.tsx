import Image from "next/image";
import {
  Waves,
  Dumbbell,
  BookOpen,
  Clapperboard,
  Gamepad2,
  Dices,
  Blocks,
  PartyPopper,
  Sofa,
  Trees,
  Flame,
  LockKeyhole,
  Blinds,
  Layers,
  AirVent,
  ShowerHead,
  PlugZap,
  PaintRoller,
  SquareParking,
  Building2,
  KeyRound,
  Droplets,
  Route,
  Landmark,
  Sunset,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import Mapa from "./Mapa";
import Contato from "./Contato";
import WhatsappIcon from "./WhatsappIcon";
import Manifesto from "./Manifesto";
import Plantas from "./Plantas";
import ObraPainel from "./ObraPainel";
import TemposLocal from "./TemposLocal";
import { Reveal, RevealWords } from "./Reveal";
import { Counter, ParallaxImage } from "./Visuals";
import { CardsEmpilhados, DiferenciaisImersivo, GaleriaHorizontal, SemSairDeCasa } from "./Galerias";
import { CtaContato, Rotulo, VerMais } from "./Pecas";
import { ENDERECO, TELEFONE, WA_LINK } from "../lib/site";

const ic = (I: LucideIcon, size = 22) => <I size={size} strokeWidth={1.5} />;

/* ------------------------------ dados ------------------------------ */

const galeria = [
  { nome: "Piscina com deck", icone: ic(Waves, 26), img: "piscina", alt: "Piscina com deck do Paraíso das Águas" },
  { nome: "Academia", icone: ic(Dumbbell, 26), img: "academia", alt: "Academia" },
  { nome: "Biblioteca e coworking", icone: ic(BookOpen, 26), img: "coworking-02", alt: "Biblioteca e coworking no ático" },
  { nome: "Cinema", icone: ic(Clapperboard, 26), img: "cinema", alt: "Cinema no ático" },
  { nome: "Espaço gamer", icone: ic(Gamepad2, 26), img: "gamer", alt: "Espaço gamer no ático" },
  { nome: "Sala de jogos", icone: ic(Dices, 26), img: "jogos", alt: "Sala de jogos" },
  { nome: "Brinquedoteca e playground", icone: ic(Blocks, 26), img: "kids", alt: "Área Kids" },
  { nome: "4 salões de festas", icone: ic(PartyPopper, 26), img: "salao-02", alt: "Salão de festas" },
];

const outrasAreas: { nome: string; icone: LucideIcon }[] = [
  { nome: "Lounge coberto", icone: Sofa },
  { nome: "Lounge descoberto", icone: Sofa },
  { nome: "Terraço externo", icone: Sunset },
  { nome: "Áreas verdes e jardins", icone: Trees },
];

const cardsApto = [
  {
    rotulo: "Living",
    titulo: "Salas integradas e com muita luz natural.",
    texto: "Apartamentos de 2 e 3 dormitórios, sacada com churrasqueira e acabamentos em porcelanato e gesso.",
    img: "sala-cozinha",
    alt: "Sala integrada à cozinha",
    icone: ic(Sofa, 18),
  },
  {
    rotulo: "Sacada",
    titulo: "Sacada para reunir quem você ama.",
    texto:
      "Churrasqueira a carvão em alvenaria com exaustor, integrada ao living, para receber os amigos e aproveitar o fim de tarde.",
    img: "sacada",
    alt: "Sacada com churrasqueira",
    icone: ic(Flame, 18),
  },
  {
    rotulo: "Dormitórios",
    titulo: "Dormitórios aconchegantes.",
    texto:
      "Persianas automatizadas nos dormitórios, forro de gesso rebaixado e piso em porcelanato. Banheiros com acabamento em cerâmica e água quente a gás.",
    img: "quarto-01",
    alt: "Dormitório",
    icone: ic(Blinds, 18),
  },
];

const diferenciais: { t: string; icone: LucideIcon }[] = [
  { t: "Sacada com churrasqueira a carvão em alvenaria, com exaustor", icone: Flame },
  { t: "Fechadura eletrônica com senha na porta de entrada", icone: LockKeyhole },
  { t: "Persianas automatizadas nos dormitórios", icone: Blinds },
  { t: "Porcelanato nos ambientes internos e sacadas, e forro de gesso rebaixado com pintura", icone: Layers },
  { t: "Espera completa para ar‑condicionado split nos dormitórios e na sala de estar/jantar", icone: AirVent },
  { t: "Água com aquecimento a gás nos banheiros e na cozinha", icone: ShowerHead },
  { t: "Estrutura para futura instalação de ponto de carregador elétrico coletivo", icone: PlugZap },
  { t: "Massa corrida nas paredes", icone: PaintRoller },
  { t: "Todas as garagens são cobertas", icone: SquareParking },
];

// Foto de fundo de cada diferencial (mesma ordem da lista acima).
const fotosDif = [
  { img: "sacada", alt: "Sacada com churrasqueira" },
  { img: "hall", alt: "Hall de entrada" },
  { img: "quarto-01", alt: "Dormitório com persianas" },
  { img: "sala", alt: "Sala com porcelanato" },
  { img: "quarto-02", alt: "Dormitório" },
  { img: "sala-cozinha", alt: "Cozinha integrada" },
  { img: "fachada-07", alt: "Fachada" },
  { img: "sala-cozinha", alt: "Ambientes com massa corrida" },
  { img: "fachada-05", alt: "Entrada do condomínio" },
];
const diferenciaisImersivos = diferenciais.map(({ t, icone: I }, i) => ({
  t,
  icone: <I size={20} strokeWidth={1.5} />,
  iconeGrande: <I size={32} strokeWidth={1.3} />,
  ...fotosDif[i],
}));

const destaquesLocal: { t: string; d: string; icone: LucideIcon }[] = [
  { t: "Águas termais", d: "Santo Amaro da Imperatriz é conhecida pelas fontes termais de Caldas da Imperatriz.", icone: Droplets },
  { t: "Natureza por perto", d: "Rios, trilhas e o verde da Serra do Tabuleiro como cenário do dia a dia.", icone: Trees },
  { t: "Acesso fácil", d: "Ligação pela BR-282 com a Grande Florianópolis e a serra catarinense.", icone: Route },
  { t: "Perto da nova prefeitura", d: "No São Francisco de Assis, bairro que cresce ao redor da nova prefeitura.", icone: Landmark },
];

/* ----------------------------- seções ------------------------------ */

export function EmpreendimentoSecao({ verMais = false }: { verMais?: boolean }) {
  return (
    <section id="empreendimento" className="bg-nevoa">
      <Manifesto
        rotulo="O empreendimento"
        text="O Paraíso das Águas é o primeiro e maior home club de Santo Amaro da Imperatriz: duas torres residenciais com lazer completo para viver, trabalhar, cuidar da saúde e se divertir sem sair de casa."
      />

      <div className="bg-nevoa">
        <div className="relative mx-auto grid max-w-6xl gap-14 px-5 py-24 md:px-10 md:py-40 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
          <Reveal y={40} blur={4}>
            <ParallaxImage nome="fachada-05" alt="Entrada do Paraíso das Águas" className="aspect-[4/5] rounded-3xl" sizes="(min-width: 1024px) 55vw, 100vw" intensidade={8} />
          </Reveal>
          <div>
            <Reveal>
              <span className="traco-dourado" />
              <p className="texto max-w-md text-grafite/85">
                Apartamentos de 2 e 3 dormitórios com suíte e um clube completo dentro de casa: piscina, academia,
                coworking, cinema, espaço gamer, brinquedoteca, playground e 4 salões de festas. Tudo com o cuidado da
                ALE Empreendimentos em cada detalhe.
              </p>
            </Reveal>
            <dl className="mt-14 grid grid-cols-3 gap-6 border-t border-azul/15 pt-10">
              {[
                { I: Building2, n: 2, l: "torres" },
                { I: Layers, n: 7, l: "pavimentos tipo" },
                { I: KeyRound, n: 112, l: "apartamentos" },
              ].map(({ I, n, l }, i) => (
                <Reveal key={l} delay={i * 0.12}>
                  <I size={22} strokeWidth={1.5} className="mb-3 text-mar" />
                  <dd className="text-4xl font-light text-azul md:text-5xl">
                    <Counter to={n} />
                  </dd>
                  <dt className="mt-1 text-sm text-grafite/70">{l}</dt>
                </Reveal>
              ))}
            </dl>
            {verMais && (
              <div className="mt-12">
                <VerMais href="/empreendimento" label="Conheça o empreendimento" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function DestaquesSecao() {
  return (
    <section className="bg-nevoa">
      <div className="grid lg:grid-cols-2">
        <ParallaxImage nome="coworking-01" alt="Coworking do Paraíso das Águas" className="min-h-[460px] lg:min-h-[720px]" />
        <div className="flex items-center px-5 py-20 md:px-16 lg:py-28">
          <div className="max-w-md">
            <Reveal>
              <span className="traco-dourado" />
              <Rotulo>Coworking + academia</Rotulo>
              <h2 className="titulo text-azul">
                Trabalhe e cuide <strong>da sua saúde</strong>.
              </h2>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="texto mt-6 text-grafite/85">
                Coworking e academia no mesmo clube: produtividade e bem-estar sem sair de casa. Feche o notebook, desça
                um andar e comece o treino.
              </p>
              <div className="mt-8 flex gap-5 text-mar">
                {ic(BookOpen, 24)}
                {ic(Dumbbell, 24)}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
      <div className="grid lg:grid-cols-2">
        <div className="order-2 flex items-center px-5 py-20 md:px-16 lg:order-1 lg:py-28">
          <div className="max-w-md">
            <Reveal>
              <span className="traco-dourado" />
              <Rotulo>Para as crianças</Rotulo>
              <h2 className="titulo text-azul">
                O primeiro condomínio da região com <strong>salão de festas temático infantil</strong>.
              </h2>
              <div className="mt-8 flex gap-5 text-mar">
                {ic(PartyPopper, 24)}
                {ic(Blocks, 24)}
              </div>
            </Reveal>
          </div>
        </div>
        {/* TODO: trocar pela foto do salão temático infantil quando o cliente indicar qual dos 4 salões é. */}
        <ParallaxImage nome="kids-rua" alt="Área kids do condomínio" className="order-1 min-h-[460px] lg:order-2 lg:min-h-[720px]" />
      </div>
    </section>
  );
}

export function HomeClubSecao({ cabecalho = true, verMais = false }: { cabecalho?: boolean; verMais?: boolean }) {
  return (
    <section id="home-club" className="bg-noite text-white">
      {cabecalho ? (
        <div className="mx-auto max-w-7xl px-5 pb-10 pt-28 md:px-10 md:pt-44">
          <Reveal>
            <Rotulo claro>Home club</Rotulo>
          </Reveal>
          <h2 className="titulo max-w-3xl">
            <RevealWords text="Um clube completo" /> <strong><RevealWords text="dentro do seu condomínio." delay={0.2} /></strong>
          </h2>
          <Reveal delay={0.2}>
            <p className="texto mt-6 max-w-xl text-ceu">Trabalhe, treine, celebre e relaxe sem sair de casa.</p>
          </Reveal>
        </div>
      ) : (
        <div className="h-16 md:h-24" />
      )}

      <GaleriaHorizontal itens={galeria} />

      <div className="mx-auto max-w-7xl px-5 pb-28 pt-6 md:px-10 md:pb-40">
        <ul className="grid grid-cols-2 gap-6 border-t border-white/10 pt-10 md:grid-cols-4">
          {outrasAreas.map(({ nome, icone: I }, i) => (
            <Reveal as="li" key={nome} delay={i * 0.1} className="flex items-center gap-3 text-ceu">
              <I size={20} strokeWidth={1.5} className="shrink-0 text-dourado" />
              <span className="text-sm">{nome}</span>
            </Reveal>
          ))}
        </ul>
        {verMais && (
          <div className="mt-12">
            <VerMais href="/home-club" label="Conheça o home club" claro />
          </div>
        )}
      </div>
    </section>
  );
}

export function SemSairSecao() {
  return (
    <section className="bg-nevoa">
      <SemSairDeCasa
        momentos={[
          { verbo: "Trabalhe", texto: "Coworking e biblioteca no ático, a um andar de casa.", img: "coworking-01", alt: "Coworking" },
          { verbo: "Treine", texto: "Academia completa dentro do condomínio.", img: "academia", alt: "Academia" },
          { verbo: "Celebre", texto: "4 salões de festas, um deles temático infantil.", img: "salao-03", alt: "Salão de festas" },
          { verbo: "Relaxe", texto: "Piscina com deck e lounges para o fim de tarde.", img: "piscina", alt: "Piscina com deck" },
        ]}
      />
    </section>
  );
}

export function ApartamentosSecao({ cabecalho = true, verMais = false }: { cabecalho?: boolean; verMais?: boolean }) {
  return (
    <section id="apartamentos" className={`bg-nevoa ${cabecalho ? "pt-28 md:pt-44" : "pt-6"}`}>
      {cabecalho && (
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <Reveal>
            <Rotulo>Apartamentos</Rotulo>
          </Reveal>
          <h2 className="titulo max-w-3xl text-azul">
            <RevealWords text="Ambientes feitos para" /> <strong><RevealWords text="viver bem." delay={0.2} /></strong>
          </h2>
        </div>
      )}
      <CardsEmpilhados cards={cardsApto} />
      <div className="pb-24 md:pb-36">
        {verMais && (
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <VerMais href="/apartamentos" label="Conheça os apartamentos" />
          </div>
        )}
      </div>
    </section>
  );
}

export function DiferenciaisSecao() {
  return (
    <section className="bg-nevoa">
      <div className="mx-auto max-w-7xl px-5 pb-6 pt-20 md:px-10 md:pt-32">
        <Reveal>
          <Rotulo>Diferenciais</Rotulo>
        </Reveal>
        <h2 className="titulo max-w-3xl text-azul">
          <RevealWords text="Pensado em" /> <strong><RevealWords text="cada detalhe." delay={0.2} /></strong>
        </h2>
      </div>
      <DiferenciaisImersivo itens={diferenciaisImersivos} />
    </section>
  );
}

export function PlantasSecao({ cabecalho = true, verMais = false }: { cabecalho?: boolean; verMais?: boolean }) {
  return (
    <section id="plantas" className={`bg-bege ${cabecalho ? "py-28 md:py-44" : "py-16 md:py-24"}`}>
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {cabecalho && (
          <>
            <Reveal>
              <Rotulo>Plantas</Rotulo>
            </Reveal>
            <h2 className="titulo max-w-3xl text-azul">
              <RevealWords text="Três tipologias," /> <strong><RevealWords text="112 apartamentos." delay={0.2} /></strong>
            </h2>
            <Reveal delay={0.15}>
              <p className="texto mt-6 max-w-xl text-grafite/85">
                Oito apartamentos por andar em cada torre, com dois elevadores por torre. Escolha uma planta para ver os
                detalhes e ampliar.
              </p>
            </Reveal>
          </>
        )}

        <div className={cabecalho ? "mt-14" : ""}>
          <Plantas />
        </div>

        <div className="mt-12 md:mt-20">
          <CtaContato solto />
        </div>

        {verMais && (
          <div className="mt-12">
            <VerMais href="/plantas" label="Veja todas as plantas" />
          </div>
        )}
      </div>
    </section>
  );
}

export function LocalizacaoSecao({ cabecalho = true, verMais = false }: { cabecalho?: boolean; verMais?: boolean }) {
  return (
    <section id="localizacao" className={`bg-nevoa ${cabecalho ? "py-28 md:py-44" : "py-16 md:py-24"}`}>
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {cabecalho && (
          <>
            <Reveal>
              <Rotulo>Localização</Rotulo>
            </Reveal>
            <h2 className="titulo max-w-3xl text-azul">
              <RevealWords text="Tudo o que você precisa," /> <strong><RevealWords text="perto de casa." delay={0.25} /></strong>
            </h2>
            <Reveal delay={0.15}>
              <p className="texto mt-6 max-w-xl text-grafite/85">
                Em Santo Amaro da Imperatriz, cidade conhecida pelas águas termais e pela natureza da Grande
                Florianópolis, perto da nova prefeitura e de tudo o que o dia a dia pede.
              </p>
            </Reveal>
          </>
        )}

        <div className={`${cabecalho ? "mt-14" : ""} grid gap-10 lg:grid-cols-[0.9fr_1.3fr] lg:gap-16`}>
          <div className="self-center">
            <Reveal>
              <p className="rotulo mb-6 text-mar">A poucos minutos de</p>
            </Reveal>
            <TemposLocal />
            <Reveal delay={0.2}>
              <p className="mt-5 text-xs text-grafite/55">Tempos aproximados de carro.</p>
            </Reveal>
          </div>
          <Reveal y={50} blur={4}>
            <Mapa />
            <p className="mt-4 flex items-start gap-2 text-sm text-grafite/70">
              <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-mar" />
              {ENDERECO}. Posição aproximada.
            </p>
          </Reveal>
        </div>

        <ul className={`mt-20 grid gap-10 sm:grid-cols-2 ${cabecalho ? "lg:grid-cols-4" : "lg:grid-cols-3"}`}>
          {destaquesLocal.filter((x) => cabecalho || x.t !== "Perto da nova prefeitura").map(({ t, d, icone: I }, i) => (
            <Reveal as="li" key={t} delay={i * 0.12}>
              <I size={26} strokeWidth={1.5} className="text-mar" />
              <h3 className="mt-4 text-lg text-azul">{t}</h3>
              <p className="texto mt-2 text-sm text-grafite/80">{d}</p>
            </Reveal>
          ))}
        </ul>

        {verMais && (
          <div className="mt-14">
            <VerMais href="/localizacao" label="Veja a localização" />
          </div>
        )}
      </div>
    </section>
  );
}

export function ObraSecao({ cabecalho = true, verMais = false }: { cabecalho?: boolean; verMais?: boolean }) {
  return (
    <section id="andamento-da-obra" className={`bg-bege ${cabecalho ? "py-28 md:py-44" : "py-16 md:py-24"}`}>
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {cabecalho && (
          <div className="mb-14">
            <Reveal>
              <Rotulo>Andamento da obra</Rotulo>
            </Reveal>
            <h2 className="titulo max-w-3xl text-azul">
              <RevealWords text="Acompanhe" /> <strong><RevealWords text="a evolução." delay={0.2} /></strong>
            </h2>
            <Reveal delay={0.15}>
              <p className="texto mt-6 max-w-xl text-grafite/85">
                Transparência em todas as etapas: veja em que fase está a construção do Paraíso das Águas.
              </p>
            </Reveal>
          </div>
        )}
        <Reveal y={40} blur={4}>
          <ObraPainel />
        </Reveal>
        {verMais && (
          <div className="mt-12">
            <VerMais href="/andamento-da-obra" label="Ver andamento da obra" />
          </div>
        )}
      </div>
    </section>
  );
}

export function AleSecao() {
  return (
    <section className="relative overflow-hidden bg-azul py-28 text-white md:py-40">
      <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-2">
        <div>
          <Reveal>
            <Image src="/logo/ale-branco.svg" alt="ALE Empreendimentos" width={830} height={364} className="mb-10 h-auto w-32" />
          </Reveal>
          <h2 className="titulo">
            <RevealWords text="Construindo lugares" /> <strong><RevealWords text="para viver bem." delay={0.2} /></strong>
          </h2>
        </div>
        {/* TODO: substituir pelo texto real da história da ALE quando o cliente enviar. */}
        <Reveal delay={0.2} className="self-end">
          <p className="texto text-ceu lg:max-w-lg">
            A ALE Empreendimentos nasceu com um propósito simples: construir lugares onde as pessoas queiram viver por
            muitos anos. Cada projeto é pensado com atenção aos detalhes, transparência em todas as etapas e respeito ao
            sonho de quem confia na nossa assinatura.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

// Contato: na home com foto ao fundo; na página própria em fundo claro, com os dados ao lado.
export function ContatoSecao({ pagina = false }: { pagina?: boolean }) {
  const dados = (
    <ul className="mt-10 grid gap-6 text-sm">
      <li className="flex items-start gap-3">
        <WhatsappIcon size={20} className="mt-0.5 shrink-0 text-dourado" />
        <div>
          <p className={pagina ? "text-azul" : "text-white"}>{TELEFONE}</p>
          <a href={WA_LINK} target="_blank" rel="noopener" className="text-dourado underline-offset-4 hover:underline">
            Chamar no WhatsApp
          </a>
        </div>
      </li>
      <li className="flex items-start gap-3">
        <MapPin size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-dourado" />
        <p className={pagina ? "max-w-xs text-grafite/80" : "max-w-xs text-ceu"}>{ENDERECO}</p>
      </li>
    </ul>
  );

  if (pagina) {
    return (
      <section id="contato" className="bg-nevoa pb-24 md:pb-36">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <Reveal>
              <Rotulo>Fale com a gente</Rotulo>
              <p className="texto max-w-sm text-grafite/85">Prefere conversar agora? Chame a ALE no WhatsApp.</p>
              {dados}
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <Contato />
          </Reveal>
        </div>
      </section>
    );
  }

  return (
    <section id="contato" className="relative isolate overflow-hidden bg-noite py-28 text-white md:py-44">
      <ParallaxImage nome="fachada-09" alt="" className="absolute inset-0 -z-10 opacity-40" sizes="100vw" intensidade={8} />
      <div className="absolute inset-0 -z-10 bg-noite/70" aria-hidden />
      <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-10 lg:grid-cols-2 lg:gap-24">
        <div>
          <Reveal>
            <Rotulo claro>Contato</Rotulo>
          </Reveal>
          <h2 className="titulo">
            <RevealWords text="Agende" /> <strong><RevealWords text="sua visita." delay={0.15} /></strong>
          </h2>
          <Reveal delay={0.2}>
            <p className="texto mt-6 max-w-md text-ceu">WhatsApp {TELEFONE}. Ou fale com o seu corretor de confiança.</p>
            {dados}
          </Reveal>
        </div>
        <Reveal delay={0.2}>
          <Contato />
        </Reveal>
      </div>
    </section>
  );
}
