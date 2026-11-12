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
import Logo from "./components/Logo";
import Mapa from "./components/Mapa";
import Contato from "./components/Contato";
import { WHATSAPP } from "./lib/contato";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Smooth from "./components/Smooth";
import WhatsappIcon from "./components/WhatsappIcon";
import { Reveal, RevealWords } from "./components/Reveal";
import ScrollText from "./components/ScrollText";
import { ClipImage, Counter, ParallaxImage, SolarArc, WaveLine } from "./components/Visuals";
import { Carrossel, CardsEmpilhados, GaleriaHorizontal } from "./components/Galerias";
import Letreiro from "./components/Letreiro";

const WA_LINK = `https://wa.me/${WHATSAPP}`;

const ic = (I: LucideIcon, size = 22) => <I size={size} strokeWidth={1.5} />;

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
    titulo: "Ambientes feitos para viver bem.",
    texto:
      "Apartamentos de 2 e 3 dormitórios com salas integradas, muita luz natural, sacada com churrasqueira e acabamentos em porcelanato e gesso.",
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
  { t: "Espera completa para ar-condicionado split nos dormitórios e na sala de estar/jantar", icone: AirVent },
  { t: "Água com aquecimento a gás nos banheiros e na cozinha", icone: ShowerHead },
  { t: "Estrutura para futura instalação de ponto de carregador elétrico coletivo", icone: PlugZap },
  { t: "Massa corrida nas paredes", icone: PaintRoller },
  { t: "Todas as garagens são cobertas", icone: SquareParking },
];

// TODO: confirmar com o cliente a associação Tipo 02 / Tipo 03 às metragens e se os de 2 dormitórios têm suíte.
const tipos = [
  { nome: "Tipo 01", dorms: "3 dormitórios, sendo 1 suíte", area: "91,00", a: "02, 03, 06, 07", b: "12, 13, 16, 17" },
  { nome: "Tipo 02", dorms: "2 dormitórios, sendo 1 suíte", area: "74,29", a: "04, 05", b: "14, 15" },
  { nome: "Tipo 03", dorms: "2 dormitórios, sendo 1 suíte", area: "68,18", a: "01, 08", b: "11, 18" },
];

const destaquesLocal: { t: string; d: string; icone: LucideIcon }[] = [
  { t: "Águas termais", d: "Santo Amaro da Imperatriz é conhecida pelas fontes termais de Caldas da Imperatriz.", icone: Droplets },
  { t: "Natureza por perto", d: "Rios, trilhas e o verde da Serra do Tabuleiro como cenário do dia a dia.", icone: Trees },
  { t: "Acesso fácil", d: "Ligação pela BR-282 com a Grande Florianópolis e a serra catarinense.", icone: Route },
  { t: "Perto da nova prefeitura", d: "No São Francisco de Assis, bairro que cresce ao redor da nova prefeitura.", icone: Landmark },
];

function Rotulo({ n, children, claro = false }: { n: string; children: React.ReactNode; claro?: boolean }) {
  return (
    <p className={`rotulo mb-5 flex items-center gap-3 ${claro ? "text-dourado" : "text-mar"}`}>
      <span className="tabular-nums opacity-70">{n}</span>
      <span className="h-px w-8 bg-current opacity-50" />
      {children}
    </p>
  );
}

export default function Home() {
  return (
    <>
      <Smooth />
      <Header whatsapp={WA_LINK} />

      <main id="topo">
        <Hero whatsapp={WA_LINK} />
        <Letreiro />

        {/* 01 · O empreendimento */}
        <section id="empreendimento" className="relative overflow-hidden bg-nevoa py-28 md:py-44">
          <WaveLine className="pointer-events-none absolute -right-40 top-10 w-[1200px] max-w-none" />
          <div className="relative mx-auto max-w-6xl px-5 md:px-10">
            <Reveal>
              <Rotulo n="01">O empreendimento</Rotulo>
            </Reveal>
            <ScrollText
              className="titulo text-azul md:!text-[3.4rem]"
              text="O Paraíso das Águas é o primeiro e maior home club de Santo Amaro da Imperatriz: duas torres residenciais com lazer completo para viver, trabalhar, cuidar da saúde e se divertir sem sair de casa."
            />
          </div>

          <div className="relative mx-auto mt-24 grid max-w-6xl gap-14 px-5 md:px-10 lg:grid-cols-[1.1fr_1fr] lg:items-center lg:gap-20">
            <ClipImage nome="fachada-05" alt="Entrada do Paraíso das Águas" className="aspect-[4/5]" sizes="(min-width: 1024px) 55vw, 100vw" />
            <div>
              <Reveal>
                <span className="traco-dourado" />
                <p className="texto max-w-md text-grafite/85">
                  Apartamentos de 2 e 3 dormitórios com suíte e um clube completo dentro de casa: piscina, academia,
                  coworking, cinema, espaço gamer, brinquedoteca, playground e 4 salões de festas. Tudo com o cuidado
                  da ALE Empreendimentos em cada detalhe.
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
            </div>
          </div>
        </section>

        {/* 02 · Home club */}
        <section id="home-club" className="bg-noite text-white">
          <div className="mx-auto max-w-7xl px-5 pb-10 pt-28 md:px-10 md:pt-44">
            <Reveal>
              <Rotulo n="02" claro>
                Home club
              </Rotulo>
            </Reveal>
            <h2 className="titulo max-w-3xl">
              <RevealWords text="Um clube completo" /> <strong><RevealWords text="dentro do seu condomínio." delay={0.2} /></strong>
            </h2>
            <Reveal delay={0.2}>
              <p className="texto mt-6 max-w-xl text-ceu">Trabalhe, treine, celebre e relaxe sem sair de casa.</p>
            </Reveal>
          </div>

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
          </div>
        </section>

        {/* 03 · Destaques */}
        <section className="bg-nevoa">
          <div className="grid lg:grid-cols-2">
            <ParallaxImage nome="coworking-01" alt="Coworking do Paraíso das Águas" className="min-h-[460px] lg:min-h-[720px]" />
            <div className="flex items-center px-5 py-20 md:px-16 lg:py-28">
              <div className="max-w-md">
                <Reveal>
                  <span className="traco-dourado" />
                  <Rotulo n="03">Coworking + academia</Rotulo>
                  <h2 className="titulo text-azul">
                    Trabalhe e cuide <strong>da sua saúde</strong>.
                  </h2>
                </Reveal>
                <Reveal delay={0.15}>
                  <p className="texto mt-6 text-grafite/85">
                    Coworking e academia no mesmo clube: produtividade e bem-estar sem sair de casa. Feche o notebook,
                    desça um andar e comece o treino.
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
                  <Rotulo n="04">Para as crianças</Rotulo>
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

        {/* 05 · Apartamentos */}
        <section id="apartamentos" className="bg-nevoa pt-28 md:pt-44">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <Reveal>
              <Rotulo n="05">Apartamentos</Rotulo>
            </Reveal>
            <h2 className="titulo max-w-3xl text-azul">
              <RevealWords text="Ambientes feitos para" /> <strong><RevealWords text="viver bem." delay={0.2} /></strong>
            </h2>
          </div>

          <div className="mx-auto mt-16 max-w-7xl px-4 md:px-10">
            <CardsEmpilhados cards={cardsApto} />
          </div>

          <div className="pb-24 md:pb-36" />
        </section>


        {/* Diferenciais */}
        <section className="bg-ceu/30 py-24 md:py-36">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <Reveal>
              <Rotulo n="06">Diferenciais</Rotulo>
            </Reveal>
            <h2 className="titulo max-w-3xl text-azul">
              <RevealWords text="Pensado em" /> <strong><RevealWords text="cada detalhe." delay={0.2} /></strong>
            </h2>
            <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {diferenciais.map(({ t, icone: I }, i) => (
                <Reveal as="li" key={t} delay={(i % 3) * 0.1} className="flex flex-col gap-5 rounded-2xl bg-white/70 p-7 transition duration-500 hover:-translate-y-1 hover:bg-white">
                  <span className="flex items-center gap-4">
                    <span className="h-0.5 w-8 bg-dourado" />
                    <I size={22} strokeWidth={1.5} className="text-mar" />
                  </span>
                  <span className="texto text-azul">{t}</span>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* 06 · Plantas */}
        <section id="plantas" className="bg-bege py-28 md:py-44">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <Reveal>
              <Rotulo n="07">Plantas</Rotulo>
            </Reveal>
            <h2 className="titulo max-w-3xl text-azul">
              <RevealWords text="Três tipologias," /> <strong><RevealWords text="112 apartamentos." delay={0.2} /></strong>
            </h2>
            <Reveal delay={0.15}>
              <p className="texto mt-6 max-w-xl text-grafite/85">
                Oito apartamentos por andar em cada torre, com dois elevadores por torre. Torre A de 101 a 708, Torre B
                de 111 a 718.
              </p>
            </Reveal>

            {/* TODO: inserir as imagens das plantas novas (sem piso laminado) em /public/img e exibir em cada card. */}
            <div className="mt-16 grid gap-5 md:grid-cols-3">
              {tipos.map((t, i) => (
                <Reveal as="article" key={t.nome} delay={i * 0.15} className="flex flex-col rounded-2xl bg-nevoa p-8 transition duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_-28px_rgb(20_36_58/0.4)]">
                  <p className="rotulo text-mar">{t.nome}</p>
                  <p className="mt-6 text-5xl font-light text-azul">
                    {t.area}
                    <span className="ml-1 text-xl">m²</span>
                  </p>
                  <p className="mt-1 text-sm text-grafite/70">área privativa</p>
                  <p className="mt-6 text-azul">{t.dorms}</p>
                  <dl className="mt-8 grid gap-3 border-t border-azul/15 pt-6 text-sm">
                    <div className="flex justify-between gap-4">
                      <dt className="text-grafite/70">Finais Torre A</dt>
                      <dd className="text-azul">{t.a}</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                      <dt className="text-grafite/70">Finais Torre B</dt>
                      <dd className="text-azul">{t.b}</dd>
                    </div>
                  </dl>
                </Reveal>
              ))}
            </div>

            {/* Posição solar */}
            {/* TODO: confirmar a orientação do norte (aprox. 25° à direita do topo da planta térrea). */}
            <div className="mt-5 grid items-center gap-10 rounded-2xl bg-azul p-8 text-white md:grid-cols-2 md:p-14">
              <div>
                <Reveal>
                  <Rotulo n="08" claro>
                    Posição solar
                  </Rotulo>
                  <h3 className="text-2xl font-light leading-snug md:text-4xl">
                    Sol da manhã a leste, sol da tarde a oeste.
                  </h3>
                  <p className="texto mt-6 max-w-md text-sm text-ceu">
                    Consulte a implantação com seu corretor ou pelo WhatsApp para saber a orientação de cada final.
                  </p>
                </Reveal>
              </div>
              <SolarArc />
            </div>
          </div>
        </section>


        {/* 09 · Fachada */}
        <section className="overflow-hidden bg-nevoa py-24 md:py-36">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <Reveal>
              <Rotulo n="09">Fachada</Rotulo>
            </Reveal>
            <h2 className="titulo mb-12 max-w-3xl text-azul">
              <RevealWords text="Duas torres para" /> <strong><RevealWords text="viver bem." delay={0.2} /></strong>
            </h2>
          </div>
          <Carrossel
            itens={[
              { img: "fachada-05", alt: "Entrada do Paraíso das Águas" },
              { img: "fachada-06", alt: "Fachada do Paraíso das Águas" },
              { img: "fachada-07", alt: "Fachada do Paraíso das Águas" },
              { img: "fachada-09", alt: "Fachada do Paraíso das Águas" },
              { img: "fachada-08", alt: "Vista aérea das duas torres" },
            ]}
          />
        </section>

        {/* 08 · Localização */}
        <section id="localizacao" className="bg-nevoa py-28 md:py-44">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <Reveal>
              <Rotulo n="10">Localização</Rotulo>
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

            <Reveal className="mt-14" y={50} blur={4}>
              <Mapa />
              <p className="mt-4 flex items-start gap-2 text-sm text-grafite/70">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-mar" />
                Rua Major Soares do Nascimento, 400/520, São Francisco de Assis, Santo Amaro da Imperatriz/SC.
                Posição aproximada.
              </p>
            </Reveal>

            <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {destaquesLocal.map(({ t, d, icone: I }, i) => (
                <Reveal as="li" key={t} delay={i * 0.12}>
                  <I size={26} strokeWidth={1.5} className="text-mar" />
                  <h3 className="mt-4 text-lg text-azul">{t}</h3>
                  <p className="texto mt-2 text-sm text-grafite/80">{d}</p>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>

        {/* ALE */}
        <section className="relative overflow-hidden bg-azul py-28 text-white md:py-40">
          <WaveLine cor="#d6bf98" className="pointer-events-none absolute -left-40 bottom-0 w-[1200px] max-w-none opacity-60" />
          <div className="relative mx-auto grid max-w-7xl gap-12 px-5 md:px-10 lg:grid-cols-2">
            <div>
              <Reveal>
                <Image src="/logo/ale-dourado.svg" alt="ALE Empreendimentos" width={119} height={52} className="mb-10 h-auto w-32" />
              </Reveal>
              <h2 className="titulo">
                <RevealWords text="Construindo lugares" /> <strong><RevealWords text="para viver bem." delay={0.2} /></strong>
              </h2>
            </div>
            {/* TODO: substituir pelo texto real da história da ALE quando o cliente enviar. */}
            <Reveal delay={0.2} className="self-end">
              <p className="texto text-ceu lg:max-w-lg">
                A ALE Empreendimentos nasceu com um propósito simples: construir lugares onde as pessoas queiram viver
                por muitos anos. Cada projeto é pensado com atenção aos detalhes, transparência em todas as etapas e
                respeito ao sonho de quem confia na nossa assinatura.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="relative isolate overflow-hidden bg-noite py-28 text-white md:py-44">
          <ParallaxImage nome="fachada-09" alt="" className="absolute inset-0 -z-10 opacity-40" sizes="100vw" intensidade={8} />
          <div className="absolute inset-0 -z-10 bg-noite/70" aria-hidden />
          <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-10 lg:grid-cols-2 lg:gap-24">
            <div>
              <Reveal>
                <Rotulo n="11" claro>
                  Contato
                </Rotulo>
              </Reveal>
              <h2 className="titulo">
                <RevealWords text="Agende" /> <strong><RevealWords text="sua visita." delay={0.15} /></strong>
              </h2>
              <Reveal delay={0.2}>
                <p className="texto mt-6 max-w-md text-ceu">
                  WhatsApp (48) 9821-3130. Ou fale com o seu corretor de confiança.
                </p>
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener"
                  className="mt-10 inline-flex items-center gap-3 text-dourado underline-offset-8 hover:underline"
                >
                  <WhatsappIcon size={22} /> Chamar no WhatsApp
                </a>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="rounded-2xl bg-noite/60 p-6 backdrop-blur-md md:p-10">
              <Contato />
            </Reveal>
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="bg-noite px-5 pb-12 text-ceu md:px-10">
        <div className="mx-auto max-w-7xl border-t border-white/10 pt-14">
          <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
            <div>
              <Logo className="w-56" />
              <p className="mt-6 max-w-xs text-sm text-ceu/80">Um refúgio onde a água desacelera o tempo.</p>
            </div>
            <div>
              <p className="rotulo mb-5 text-dourado">Navegue</p>
              <ul className="grid gap-3 text-sm">
                {[
                  ["O empreendimento", "#empreendimento"],
                  ["Home club", "#home-club"],
                  ["Apartamentos", "#apartamentos"],
                  ["Plantas", "#plantas"],
                  ["Localização", "#localizacao"],
                ].map(([t, h]) => (
                  <li key={h}>
                    <a href={h} className="transition hover:text-white">
                      {t}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="rotulo mb-5 text-dourado">Atendimento</p>
              <ul className="grid gap-3 text-sm">
                <li>
                  <a href={WA_LINK} target="_blank" rel="noopener" className="inline-flex items-center gap-2 transition hover:text-white">
                    <WhatsappIcon size={16} /> (48) 9821-3130
                  </a>
                </li>
                <li>Rua Major Soares do Nascimento, 400/520, São Francisco de Assis, Santo Amaro da Imperatriz/SC</li>
              </ul>
            </div>
            <div>
              <p className="rotulo mb-5 text-dourado">Realização</p>
              <Image src="/logo/ale-dourado.svg" alt="ALE Empreendimentos" width={119} height={52} className="h-auto w-32" />
              <p className="mt-4 text-xs text-ceu/60">ALE Distribuição, Comércio e Serviços Ltda.</p>
            </div>
          </div>
          <p className="texto mt-14 max-w-4xl border-t border-white/10 pt-8 text-xs leading-relaxed text-ceu/70">
            Imagens meramente ilustrativas. Móveis, objetos e decoração não fazem parte do contrato. Alvará de
            construção nº 182/2026. Incorporação registrada sob o R-7 da matrícula nº 30.569 do Registro de Imóveis
            de Santo Amaro da Imperatriz/SC.
          </p>
        </div>
      </footer>

      {/* WhatsApp flutuante */}
      <a
        href={WA_LINK}
        target="_blank"
        rel="noopener"
        aria-label="Falar no WhatsApp"
        className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-dourado text-noite shadow-lg transition hover:scale-105"
      >
        <WhatsappIcon size={28} />
      </a>
    </>
  );
}
