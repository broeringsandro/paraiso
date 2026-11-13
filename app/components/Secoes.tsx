import Image from "next/image";
import Link from "next/link";
import {
  Building2,
  KeyRound,
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
  Droplets,
  Route,
  Landmark,
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

      <div className="bg-nevoa py-20 md:py-32">
        <div className="mx-auto max-w-7xl px-5 md:px-10">
          <div className="grid items-center gap-12 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <div>
              <Reveal>
                <Rotulo>O empreendimento</Rotulo>
              </Reveal>
              <h2 className="titulo text-azul md:!text-[3.4rem]">
                <RevealWords text="Apartamentos com um clube" /> <strong><RevealWords text="completo dentro de casa." delay={0.2} /></strong>
              </h2>
              <Reveal delay={0.15}>
                <p className="texto mt-7 max-w-md text-lg font-light text-grafite/80">
                  Piscina, academia, coworking, cinema, espaço gamer, brinquedoteca, playground e 4 salões de festas.
                  Tudo com o cuidado da ALE Empreendimentos em cada detalhe.
                </p>
                <div className="mt-9 flex flex-col items-start gap-3">
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener"
                    className="group inline-flex items-center gap-3 rounded-full bg-whats px-8 py-4 text-sm font-medium text-white transition hover:bg-whats-escuro"
                  >
                    <WhatsappIcon size={18} /> Agende sua visita
                  </a>
                  <Link
                    href={verMais ? "/empreendimento" : "/plantas"}
                    className="inline-flex items-center rounded-full border border-azul/20 bg-white/60 px-8 py-4 text-sm text-azul transition hover:border-azul hover:bg-white"
                  >
                    {verMais ? "Conheça o projeto" : "Ver as plantas"}
                  </Link>
                </div>
              </Reveal>
            </div>

            <Reveal y={40} blur={4}>
              <ParallaxImage
                nome="fachada-10"
                alt="Vista das duas torres do Paraíso das Águas"
                className="aspect-[5/4] rounded-3xl"
                sizes="(min-width: 1024px) 52vw, 100vw"
                intensidade={8}
              />
            </Reveal>
          </div>

          <dl className="mt-16 grid grid-cols-2 gap-3 md:mt-24 lg:grid-cols-4 lg:gap-4">
            {[
              { I: Building2, n: 2, l: "Torres residenciais" },
              { I: Layers, n: 7, l: "Pavimentos tipo" },
              { I: KeyRound, n: 112, l: "Apartamentos" },
              { I: SquareParking, n: "100%", l: "Garagens cobertas" },
            ].map(({ I, n, l }, i) => (
              <Reveal
                key={l}
                delay={i * 0.08}
                className="group rounded-2xl border border-azul/10 bg-white/60 p-5 transition duration-500 hover:-translate-y-1 hover:bg-white md:p-7"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-nevoa text-mar transition duration-500 group-hover:bg-dourado/30 group-hover:text-azul">
                  <I size={20} strokeWidth={1.4} />
                </span>
                <div className="mt-6 flex items-end justify-between gap-3 md:mt-8">
                  <dd className="text-4xl font-light leading-none tracking-tight text-azul md:text-5xl">
                    {typeof n === "number" ? <Counter to={n} /> : n}
                  </dd>
                  <dt className="max-w-[9ch] text-right text-xs leading-snug text-grafite/70 md:text-sm">{l}</dt>
                </div>
              </Reveal>
            ))}
          </dl>
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
        <div className="mx-auto max-w-7xl px-5 pb-12 pt-28 md:px-10 md:pb-16 md:pt-44">
          <Reveal>
            <Rotulo claro>Home club</Rotulo>
          </Reveal>
          <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr] lg:items-end lg:gap-20">
            <h2 className="titulo md:!text-[4.4rem]">
              <RevealWords text="Um clube completo" />{" "}
              <strong className="text-dourado">
                <RevealWords text="dentro do seu condomínio." delay={0.2} />
              </strong>
            </h2>
            <Reveal delay={0.25}>
              <p className="max-w-sm text-lg font-light leading-relaxed text-white/80 lg:pb-3">
                <span className="text-dourado">Trabalhe, treine, celebre e relaxe</span> sem sair de casa.
              </p>
            </Reveal>
          </div>
        </div>
      ) : (
        <div className="h-16 md:h-24" />
      )}

      <GaleriaHorizontal itens={galeria} />

      <div className="mx-auto max-w-7xl px-5 pb-24 pt-10 md:px-10 md:pb-36">
        {verMais && <VerMais href="/home-club" label="Conheça o home club" claro />}
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
          { verbo: "Relaxe", texto: "Piscina com deck para aproveitar o fim de tarde.", img: "piscina", alt: "Piscina com deck" },
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
              <Rotulo>A poucos minutos de</Rotulo>
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
          <p className="texto text-white/75 lg:max-w-lg">
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
        <WhatsappIcon size={20} className="mt-0.5 shrink-0 text-whats" />
        <div>
          <p className={pagina ? "text-azul" : "text-white"}>{TELEFONE}</p>
          <a href={WA_LINK} target="_blank" rel="noopener" className="font-medium text-whats underline-offset-4 hover:underline">
            Chamar no WhatsApp
          </a>
        </div>
      </li>
      <li className="flex items-start gap-3">
        <MapPin size={20} strokeWidth={1.5} className="mt-0.5 shrink-0 text-dourado" />
        <p className={pagina ? "max-w-xs text-grafite/80" : "max-w-xs text-white/75"}>{ENDERECO}</p>
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
            <p className="texto mt-6 max-w-md text-white/75">WhatsApp {TELEFONE}. Ou fale com o seu corretor de confiança.</p>
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
