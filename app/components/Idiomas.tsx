"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useId } from "react";
import { trocarIdioma, type Locale } from "../lib/i18n";
import { useLang } from "./I18n";

function Bandeira({ lang }: { lang: Locale }) {
  const id = useId();
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden className="block h-5 w-5 sm:h-6 sm:w-6">
      <defs>
        <clipPath id={id}>
          <circle cx="12" cy="12" r="12" />
        </clipPath>
      </defs>
      <g clipPath={`url(#${id})`}>
        {lang === "es" && (
          <>
            <rect width="24" height="24" fill="#AA151B" />
            <rect y="6" width="24" height="12" fill="#F1BF00" />
          </>
        )}
        {lang === "en" && (
          <>
            <rect width="24" height="24" fill="#fff" />
            {[0, 2, 4, 6, 8, 10, 12].map((i) => (
              <rect key={i} y={(i * 24) / 13} width="24" height={24 / 13} fill="#B22234" />
            ))}
            <rect width="11" height="13" fill="#3C3B6E" />
            {[2.5, 5.5, 8.5].flatMap((x) => [2.5, 6, 9.5].map((y) => <circle key={`${x}-${y}`} cx={x} cy={y} r="0.6" fill="#fff" />))}
          </>
        )}
        {lang === "pt" && (
          <>
            <rect width="24" height="24" fill="#009C3B" />
            <path d="M12 4 21 12 12 20 3 12Z" fill="#FFDF00" />
            <circle cx="12" cy="12" r="4.2" fill="#002776" />
          </>
        )}
      </g>
    </svg>
  );
}

const rotulos: Record<Locale, string> = { pt: "Português", en: "English", es: "Español" };
const ordem: Locale[] = ["pt", "en", "es"];

// Troca de idioma: mantém a página atual e muda só o prefixo (/en, /es).
export default function Idiomas({ className = "" }: { className?: string }) {
  const atual = useLang();
  const pathname = usePathname();
  return (
    <div className={`flex items-center gap-1 sm:gap-1.5 ${className}`} role="group" aria-label="Idioma / Language / Idioma">
      {ordem.map((l) => {
        const ativo = l === atual;
        return (
          <Link
            key={l}
            href={trocarIdioma(pathname, l)}
            hrefLang={l === "pt" ? "pt-BR" : l}
            lang={l}
            aria-label={rotulos[l]}
            aria-current={ativo ? "true" : undefined}
            title={rotulos[l]}
            scroll={false}
            className={`flex h-7 w-7 items-center justify-center rounded-full transition sm:h-8 sm:w-8 ${
              ativo ? "ring-2 ring-dourado ring-offset-2 ring-offset-noite" : "opacity-60 hover:opacity-100"
            }`}
          >
            <Bandeira lang={l} />
          </Link>
        );
      })}
    </div>
  );
}
