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
  Sunrise,
  Sunset,
  MessageCircle,
  MapPin,
  type LucideIcon,
} from "lucide-react";
import Logo from "./components/Logo";
import Mapa from "./components/Mapa";
import Contato, { WHATSAPP } from "./components/Contato";

const WA_LINK = `https://wa.me/${WHATSAPP}`;

const nav = [
  ["O empreendimento", "#empreendimento"],
  ["Home club", "#home-club"],
  ["Apartamentos", "#apartamentos"],
  ["Plantas", "#plantas"],
  ["Localização", "#localizacao"],
  ["Contato", "#contato"],
] as const;

type Area = { nome: string; icone: LucideIcon; img?: string; alt?: string };

const areasComFoto: Required<Area>[] = [
  { nome: "Piscina com deck", icone: Waves, img: "piscina", alt: "Piscina com deck do Paraíso das Águas" },
  { nome: "Academia", icone: Dumbbell, img: "academia", alt: "Academia" },
  { nome: "Biblioteca e coworking", icone: BookOpen, img: "coworking-02", alt: "Biblioteca e coworking no ático" },
  { nome: "Cinema", icone: Clapperboard, img: "cinema", alt: "Cinema no ático" },
  { nome: "Espaço gamer", icone: Gamepad2, img: "gamer", alt: "Espaço gamer no ático" },
  { nome: "Sala de jogos", icone: Dices, img: "jogos", alt: "Sala de jogos" },
  { nome: "Brinquedoteca e playground", icone: Blocks, img: "kids", alt: "Área Kids" },
  { nome: "4 salões de festas", icone: PartyPopper, img: "salao-02", alt: "Salão de festas" },
];

const outrasAreas: Area[] = [
  { nome: "Lounge coberto", icone: Sofa },
  { nome: "Lounge descoberto", icone: Sofa },
  { nome: "Terraço externo", icone: Sunset },
  { nome: "Áreas verdes e jardins", icone: Trees },
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

function Img({
  nome,
  alt,
  className = "",
  priority = false,
  sizes = "(min-width: 1024px) 50vw, 100vw",
}: {
  nome: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
}) {
  return (
    <Image
      src={`/img/${nome}.jpg`}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={`object-cover ${className}`}
    />
  );
}

function Rotulo({ children, claro = false }: { children: React.ReactNode; claro?: boolean }) {
  return <p className={`rotulo mb-5 ${claro ? "text-dourado" : "text-mar"}`}>{children}</p>;
}

export default function Home() {
  return (
    <>
      {/* Cabeçalho */}
      <header className="fixed inset-x-0 top-0 z-40 bg-gradient-to-b from-noite/80 to-transparent text-white">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 md:px-10">
          <a href="#topo" aria-label="Início">
            <Logo compacto />
          </a>
          <nav className="hidden gap-8 text-[13px] lg:flex" aria-label="Principal">
            {nav.map(([t, h]) => (
              <a key={h} href={h} className="opacity-85 transition hover:text-dourado hover:opacity-100">
                {t}
              </a>
            ))}
          </nav>
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener"
            className="rounded-full border border-dourado px-5 py-2 text-xs font-medium uppercase tracking-[0.15em] text-dourado transition hover:bg-dourado hover:text-noite"
          >
            WhatsApp
          </a>
        </div>
      </header>

      <main id="topo">
        {/* Hero */}
        <section className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-noite text-white">
          <Img nome="fachada-08" alt="Fachada das duas torres do Paraíso das Águas" priority sizes="100vw" />
          <div className="absolute inset-0 bg-gradient-to-t from-noite via-noite/45 to-noite/10" aria-hidden />
          <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 md:px-10 md:pb-24">
            <div className="revela max-w-3xl">
              <span className="traco-dourado" />
              <p className="rotulo mb-5 text-dourado">Pré-lançamento · Santo Amaro da Imperatriz/SC</p>
              <h1 className="titulo">
                O primeiro e maior <strong>home club</strong> de Santo Amaro da Imperatriz.
              </h1>
              <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">
                Um refúgio onde a água desacelera o tempo.
              </p>
              <div className="mt-10 flex flex-wrap items-center gap-4">
                <a
                  href={WA_LINK}
                  target="_blank"
                  rel="noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-dourado px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-noite transition hover:bg-white"
                >
                  <MessageCircle size={18} strokeWidth={1.5} /> Agende sua visita
                </a>
                <a href="#empreendimento" className="px-4 py-4 text-sm uppercase tracking-[0.15em] text-white/80 transition hover:text-dourado">
                  Conheça o projeto
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* O empreendimento */}
        <section id="empreendimento" className="bg-nevoa py-24 md:py-36">
          <div className="mx-auto grid max-w-7xl gap-14 px-5 md:px-10 lg:grid-cols-2 lg:items-center lg:gap-24">
            <div>
              <span className="traco-dourado" />
              <Rotulo>O empreendimento</Rotulo>
              <h2 className="titulo text-azul">
                Um refúgio onde a água <strong>desacelera o tempo</strong>.
              </h2>
              <p className="texto mt-8 max-w-xl text-grafite/85">
                O Paraíso das Águas é o primeiro e maior home club de Santo Amaro da Imperatriz: duas torres
                residenciais com lazer completo para viver, trabalhar, cuidar da saúde e se divertir sem sair de
                casa, com o cuidado da ALE Empreendimentos em cada detalhe.
              </p>
              <p className="texto mt-5 max-w-xl text-grafite/85">
                Apartamentos de 2 e 3 dormitórios com suíte e um clube completo dentro de casa: piscina, academia,
                coworking, cinema, espaço gamer, brinquedoteca, playground e 4 salões de festas.
              </p>
              <dl className="mt-12 grid max-w-xl grid-cols-3 gap-6 border-t border-azul/15 pt-10">
                {[
                  [Building2, "2", "torres"],
                  [Layers, "7", "pavimentos tipo"],
                  [KeyRound, "112", "apartamentos"],
                ].map(([Icone, n, l]) => {
                  const I = Icone as LucideIcon;
                  return (
                    <div key={l as string}>
                      <I size={22} strokeWidth={1.5} className="mb-3 text-mar" />
                      <dd className="text-4xl font-light text-azul md:text-5xl">{n as string}</dd>
                      <dt className="mt-1 text-sm text-grafite/70">{l as string}</dt>
                    </div>
                  );
                })}
              </dl>
            </div>
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
              <Img nome="fachada-05" alt="Entrada do Paraíso das Águas" />
            </div>
          </div>
        </section>

        {/* Home club */}
        <section id="home-club" className="bg-noite py-24 text-white md:py-36">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <div className="max-w-3xl">
              <span className="traco-dourado" />
              <Rotulo claro>Home club</Rotulo>
              <h2 className="titulo">
                Um clube completo <strong>dentro do seu condomínio</strong>.
              </h2>
              <p className="texto mt-6 max-w-xl text-ceu">Trabalhe, treine, celebre e relaxe sem sair de casa.</p>
            </div>

            <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {areasComFoto.map(({ nome, icone: I, img, alt }) => (
                <li key={nome} className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-azul">
                  <Img nome={img} alt={alt} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="transition duration-700 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-noite/90 via-noite/10 to-transparent" aria-hidden />
                  <div className="absolute inset-x-0 bottom-0 flex items-center gap-3 p-5">
                    <I size={22} strokeWidth={1.5} className="shrink-0 text-dourado" />
                    <span className="text-base font-light">{nome}</span>
                  </div>
                </li>
              ))}
            </ul>

            <ul className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-10 md:grid-cols-4">
              {outrasAreas.map(({ nome, icone: I }) => (
                <li key={nome} className="flex items-center gap-3 text-ceu">
                  <I size={20} strokeWidth={1.5} className="shrink-0 text-dourado" />
                  <span className="text-sm">{nome}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Destaques: coworking + academia e salão infantil */}
        <section className="bg-nevoa">
          <div className="grid lg:grid-cols-2">
            <div className="relative min-h-[420px] lg:min-h-[640px]">
              <Img nome="coworking-01" alt="Coworking do Paraíso das Águas" />
            </div>
            <div className="flex items-center px-5 py-20 md:px-16 lg:py-28">
              <div className="max-w-md">
                <span className="traco-dourado" />
                <Rotulo>Coworking + academia</Rotulo>
                <h2 className="titulo text-azul">
                  Trabalhe e cuide <strong>da sua saúde</strong>.
                </h2>
                <p className="texto mt-6 text-grafite/85">
                  Coworking e academia no mesmo clube: produtividade e bem-estar sem sair de casa. Feche o notebook,
                  desça um andar e comece o treino.
                </p>
                <div className="mt-8 flex gap-5 text-mar">
                  <BookOpen size={24} strokeWidth={1.5} />
                  <Dumbbell size={24} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          </div>
          <div className="grid lg:grid-cols-2">
            <div className="order-2 flex items-center px-5 py-20 md:px-16 lg:order-1 lg:py-28">
              <div className="max-w-md">
                <span className="traco-dourado" />
                <Rotulo>Para as crianças</Rotulo>
                <h2 className="titulo text-azul">
                  O primeiro condomínio da região com <strong>salão de festas temático infantil</strong>.
                </h2>
                <div className="mt-8 flex gap-5 text-mar">
                  <PartyPopper size={24} strokeWidth={1.5} />
                  <Blocks size={24} strokeWidth={1.5} />
                </div>
              </div>
            </div>
            {/* TODO: trocar pela foto do salão temático infantil quando o cliente indicar qual dos 4 salões é. */}
            <div className="relative order-1 min-h-[420px] lg:order-2 lg:min-h-[640px]">
              <Img nome="kids-rua" alt="Área kids do condomínio" />
            </div>
          </div>
        </section>

        {/* Apartamentos */}
        <section id="apartamentos" className="bg-nevoa py-24 md:py-36">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <div className="max-w-3xl">
              <span className="traco-dourado" />
              <Rotulo>Apartamentos</Rotulo>
              <h2 className="titulo text-azul">
                Ambientes feitos para <strong>viver bem</strong>.
              </h2>
              <p className="texto mt-6 max-w-xl text-grafite/85">
                Apartamentos de 2 e 3 dormitórios com salas integradas, muita luz natural, sacada com churrasqueira e
                acabamentos em porcelanato e gesso.
              </p>
            </div>

            <div className="mt-16 grid gap-4 md:grid-cols-12">
              <figure className="relative aspect-[4/3] overflow-hidden rounded-sm md:col-span-7">
                <Img nome="sala-cozinha" alt="Sala integrada à cozinha" sizes="(min-width: 768px) 58vw, 100vw" />
              </figure>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-sm md:col-span-5 md:aspect-auto">
                <Img nome="sacada" alt="Sacada com churrasqueira" sizes="(min-width: 768px) 42vw, 100vw" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-noite/85 to-transparent p-6 text-white">
                  <p className="text-xl font-light">Sacada para reunir quem você ama.</p>
                  <p className="mt-2 max-w-sm text-sm text-white/80">
                    Churrasqueira a carvão em alvenaria com exaustor, integrada ao living, para receber os amigos e
                    aproveitar o fim de tarde.
                  </p>
                </figcaption>
              </figure>
              <figure className="relative aspect-[4/3] overflow-hidden rounded-sm md:col-span-5">
                <Img nome="quarto-01" alt="Dormitório" sizes="(min-width: 768px) 42vw, 100vw" />
              </figure>
              <div className="flex flex-col justify-center rounded-sm bg-azul p-8 text-white md:col-span-7 md:p-12">
                <p className="text-2xl font-light md:text-3xl">Dormitórios aconchegantes.</p>
                <p className="texto mt-4 max-w-lg text-ceu">
                  Persianas automatizadas nos dormitórios, forro de gesso rebaixado e piso em porcelanato. Banheiros
                  com acabamento em cerâmica e água quente a gás.
                </p>
              </div>
            </div>

            <ul className="mt-20 grid gap-x-10 gap-y-8 border-t border-azul/15 pt-14 sm:grid-cols-2 lg:grid-cols-3">
              {diferenciais.map(({ t, icone: I }) => (
                <li key={t} className="flex gap-4">
                  <I size={24} strokeWidth={1.5} className="mt-0.5 shrink-0 text-mar" />
                  <span className="texto text-azul">{t}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Plantas */}
        <section id="plantas" className="bg-bege py-24 md:py-36">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <div className="max-w-3xl">
              <span className="traco-dourado" />
              <Rotulo>Plantas</Rotulo>
              <h2 className="titulo text-azul">
                Três tipologias, <strong>112 apartamentos</strong>.
              </h2>
              <p className="texto mt-6 max-w-xl text-grafite/85">
                Oito apartamentos por andar em cada torre, com dois elevadores por torre. Torre A de 101 a 708,
                Torre B de 111 a 718.
              </p>
            </div>

            {/* TODO: inserir as imagens das plantas novas (sem piso laminado) em /public/img e exibir em cada card. */}
            <div className="mt-16 grid gap-5 md:grid-cols-3">
              {tipos.map((t) => (
                <article key={t.nome} className="flex flex-col rounded-sm bg-nevoa p-8">
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
                </article>
              ))}
            </div>

            {/* Posição solar */}
            <div className="mt-5 grid items-center gap-10 rounded-sm bg-azul p-8 text-white md:grid-cols-[auto_1fr] md:p-12">
              {/* TODO: confirmar a orientação do norte (aprox. 25° à direita do topo da planta térrea). */}
              <svg viewBox="0 0 160 160" className="mx-auto h-40 w-40" role="img" aria-label="Rosa dos ventos com o norte inclinado 25 graus">
                <circle cx="80" cy="80" r="70" fill="none" stroke="#d6bf98" strokeOpacity="0.5" />
                <g transform="rotate(25 80 80)">
                  <path d="M80 18 L90 80 L80 72 L70 80 Z" fill="#d6bf98" />
                  <path d="M80 142 L90 80 L80 88 L70 80 Z" fill="#4c7396" />
                  <text x="80" y="12" textAnchor="middle" fontSize="11" fill="#d6bf98">N</text>
                </g>
              </svg>
              <div>
                <Rotulo claro>Posição solar</Rotulo>
                <h3 className="text-2xl font-light md:text-3xl">Sol da manhã a leste, sol da tarde a oeste.</h3>
                <div className="mt-6 flex flex-wrap gap-8 text-ceu">
                  <span className="flex items-center gap-3">
                    <Sunrise size={22} strokeWidth={1.5} className="text-dourado" /> Sol da manhã
                  </span>
                  <span className="flex items-center gap-3">
                    <Sunset size={22} strokeWidth={1.5} className="text-dourado" /> Sol da tarde
                  </span>
                </div>
                <p className="texto mt-6 max-w-lg text-sm text-ceu">
                  Consulte a implantação com seu corretor ou pelo WhatsApp para saber a orientação de cada final.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Localização */}
        <section id="localizacao" className="bg-nevoa py-24 md:py-36">
          <div className="mx-auto max-w-7xl px-5 md:px-10">
            <div className="max-w-3xl">
              <span className="traco-dourado" />
              <Rotulo>Localização</Rotulo>
              <h2 className="titulo text-azul">
                Tudo o que você precisa, <strong>perto de casa</strong>.
              </h2>
              <p className="texto mt-6 max-w-xl text-grafite/85">
                Em Santo Amaro da Imperatriz, cidade conhecida pelas águas termais e pela natureza da Grande
                Florianópolis, perto da nova prefeitura e de tudo o que o dia a dia pede.
              </p>
            </div>

            <div className="mt-14">
              <Mapa />
              <p className="mt-4 flex items-start gap-2 text-sm text-grafite/70">
                <MapPin size={16} strokeWidth={1.5} className="mt-0.5 shrink-0 text-mar" />
                Rua Major Soares do Nascimento, 400/520, São Francisco de Assis, Santo Amaro da Imperatriz/SC.
                Posição aproximada.
              </p>
            </div>

            <ul className="mt-16 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
              {destaquesLocal.map(({ t, d, icone: I }) => (
                <li key={t}>
                  <I size={26} strokeWidth={1.5} className="text-mar" />
                  <h3 className="mt-4 text-lg text-azul">{t}</h3>
                  <p className="texto mt-2 text-sm text-grafite/80">{d}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ALE */}
        <section className="relative isolate overflow-hidden bg-azul py-24 text-white md:py-32">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 md:px-10 lg:grid-cols-2">
            <div>
              <span className="traco-dourado" />
              <Rotulo claro>ALE Empreendimentos</Rotulo>
              <h2 className="titulo">
                Construindo lugares <strong>para viver bem</strong>.
              </h2>
            </div>
            {/* TODO: substituir pelo texto real da história da ALE quando o cliente enviar. */}
            <p className="texto self-end text-ceu lg:max-w-lg">
              A ALE Empreendimentos nasceu com um propósito simples: construir lugares onde as pessoas queiram viver
              por muitos anos. Cada projeto é pensado com atenção aos detalhes, transparência em todas as etapas e
              respeito ao sonho de quem confia na nossa assinatura.
            </p>
          </div>
        </section>

        {/* Contato */}
        <section id="contato" className="bg-noite py-24 text-white md:py-36">
          <div className="mx-auto grid max-w-7xl gap-16 px-5 md:px-10 lg:grid-cols-2 lg:gap-24">
            <div>
              <span className="traco-dourado" />
              <Rotulo claro>Contato</Rotulo>
              <h2 className="titulo">
                Agende <strong>sua visita</strong>.
              </h2>
              <p className="texto mt-6 max-w-md text-ceu">
                WhatsApp (48) 9821-3130. Ou fale com o seu corretor de confiança.
              </p>
              <a
                href={WA_LINK}
                target="_blank"
                rel="noopener"
                className="mt-10 inline-flex items-center gap-2 text-dourado underline-offset-8 hover:underline"
              >
                <MessageCircle size={20} strokeWidth={1.5} /> Chamar no WhatsApp
              </a>
            </div>
            <Contato />
          </div>
        </section>
      </main>

      {/* Rodapé */}
      <footer className="bg-noite px-5 pb-12 text-ceu md:px-10">
        <div className="mx-auto max-w-7xl border-t border-white/10 pt-12">
          <div className="flex flex-col gap-8 text-white md:flex-row md:items-center md:justify-between">
            <Logo />
            <div className="flex items-center gap-5 text-xs uppercase tracking-[0.2em] text-ceu">
              <span>Realização</span>
              <span className="h-8 w-px bg-white/20" />
              {/* TODO: trocar pelo logo oficial da ALE (SVG). */}
              <span className="text-base normal-case tracking-normal text-white">ALE Empreendimentos</span>
            </div>
          </div>
          <p className="texto mt-12 max-w-4xl text-xs leading-relaxed text-ceu/80">
            Imagens meramente ilustrativas. Móveis, objetos e decoração não fazem parte do contrato. Alvará de
            construção nº 182/2026. Incorporação registrada sob o R-7 da matrícula nº 30.569 do Registro de Imóveis
            de Santo Amaro da Imperatriz/SC.
          </p>
          <p className="mt-4 text-xs text-ceu/60">ALE Distribuição, Comércio e Serviços Ltda.</p>
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
        <MessageCircle size={26} strokeWidth={1.5} />
      </a>
    </>
  );
}
