import Image from "next/image";
import Link from "next/link";
import Logo from "./Logo";
import WhatsappIcon from "./WhatsappIcon";
import { ENDERECO, TELEFONE, WA_LINK, paginas } from "../lib/site";

export default function Footer() {
  return (
    <footer className="bg-noite px-5 pb-12 text-ceu md:px-10">
      <div className="mx-auto max-w-7xl border-t border-white/10 pt-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="Paraíso das Águas, início">
              <Logo className="w-56" />
            </Link>
            <p className="mt-6 max-w-xs text-sm text-ceu/80">Um refúgio onde a água desacelera o tempo.</p>
          </div>
          <div>
            <p className="rotulo mb-5 text-dourado">Navegue</p>
            <ul className="grid gap-3 text-sm">
              {paginas.map((p) => (
                <li key={p.href}>
                  <Link href={p.href} className="transition hover:text-white">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="rotulo mb-5 text-dourado">Atendimento</p>
            <ul className="grid gap-3 text-sm">
              <li>
                <a href={WA_LINK} target="_blank" rel="noopener" className="inline-flex items-center gap-2 transition hover:text-white">
                  <WhatsappIcon size={16} /> {TELEFONE}
                </a>
              </li>
              <li>{ENDERECO}</li>
            </ul>
          </div>
          <div>
            <p className="rotulo mb-5 text-dourado">Realização</p>
            <Image src="/logo/ale-branco.svg" alt="ALE Empreendimentos" width={830} height={364} className="h-auto w-32" />
            <p className="mt-4 text-xs text-ceu/60">ALE Distribuição, Comércio e Serviços Ltda.</p>
          </div>
        </div>
        <p className="texto mt-14 max-w-4xl border-t border-white/10 pt-8 text-xs leading-relaxed text-ceu/70">
          Imagens meramente ilustrativas. Móveis, objetos e decoração não fazem parte do contrato. Alvará de construção
          nº 182/2026. Incorporação registrada sob o R-7 da matrícula nº 30.569 do Registro de Imóveis de Santo Amaro da
          Imperatriz/SC.
        </p>
      </div>
    </footer>
  );
}
