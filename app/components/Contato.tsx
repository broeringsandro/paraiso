"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Check } from "lucide-react";
import WhatsappIcon from "./WhatsappIcon";
import { WHATSAPP } from "../lib/contato";

const interesses = [
  "Quero conhecer o Paraíso das Águas",
  "Apartamento de 3 dormitórios (Tipo 01)",
  "Apartamento de 2 dormitórios (Tipo 02 ou 03)",
  "Sou corretor",
  "Outro assunto",
];

type Estado = "idle" | "enviando" | "ok" | "erro";

const campo =
  "w-full border-b border-azul/20 bg-transparent py-3 text-azul outline-none transition placeholder:text-grafite/40 focus:border-dourado";
const rotulo = "rotulo text-mar";

export default function Contato() {
  const [estado, setEstado] = useState<Estado>("idle");
  const [erro, setErro] = useState("");
  const [nome, setNome] = useState("");

  const msgWhats = (n: string) =>
    `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(`Olá! Meu nome é ${n || "[nome]"} e quero saber mais sobre o Paraíso das Águas.`)}`;

  async function enviar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    setEstado("enviando");
    setErro("");
    try {
      const r = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: f.get("nome"),
          whatsapp: f.get("whatsapp"),
          email: f.get("email"),
          interesse: f.get("interesse"),
          mensagem: f.get("mensagem"),
          consentimento: f.get("consentimento") === "on",
          site: f.get("site"),
        }),
      });
      const j = (await r.json().catch(() => ({}))) as { ok?: boolean; erro?: string };
      if (r.ok && j.ok) {
        setEstado("ok");
      } else {
        setErro(j.erro || "Não foi possível enviar agora.");
        setEstado("erro");
      }
    } catch {
      setErro("Não foi possível enviar agora.");
      setEstado("erro");
    }
  }

  return (
    <div className="rounded-3xl bg-white p-6 text-azul shadow-[0_30px_80px_-40px_rgb(20_36_58/0.45)] md:p-10">
      <AnimatePresence mode="wait" initial={false}>
        {estado === "ok" ? (
          <motion.div
            key="ok"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="flex min-h-[420px] flex-col items-start justify-center gap-5"
          >
            <span className="flex h-14 w-14 items-center justify-center rounded-full bg-dourado text-noite">
              <Check size={26} strokeWidth={1.8} />
            </span>
            <h3 className="titulo md:!text-[2.6rem]">
              Recebemos <strong>seu contato</strong>.
            </h3>
            <p className="texto max-w-sm text-grafite/80">Em breve alguém da ALE fala com você pelo WhatsApp.</p>
            <a
              href={msgWhats(nome)}
              target="_blank"
              rel="noopener"
              className="group mt-2 inline-flex items-center gap-3 rounded-full bg-azul px-7 py-3.5 text-sm uppercase tracking-[0.15em] text-white transition hover:bg-noite"
            >
              <WhatsappIcon size={18} /> Adiantar pelo WhatsApp
              <ArrowRight size={16} strokeWidth={1.8} className="transition group-hover:translate-x-1" />
            </a>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={enviar}
            noValidate={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid gap-6"
          >
            {/* Campo-armadilha contra robôs */}
            <input type="text" name="site" tabIndex={-1} autoComplete="off" aria-hidden className="absolute -left-[9999px] h-0 w-0 opacity-0" />

            <label className="grid gap-1">
              <span className={rotulo}>Nome</span>
              <input
                required
                name="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                className={campo}
                placeholder="Seu nome"
                autoComplete="name"
                minLength={2}
              />
            </label>

            <div className="grid gap-6 sm:grid-cols-2">
              <label className="grid gap-1">
                <span className={rotulo}>WhatsApp</span>
                <input
                  required
                  name="whatsapp"
                  type="tel"
                  inputMode="tel"
                  className={campo}
                  placeholder="(48) 90000-0000"
                  autoComplete="tel"
                  minLength={10}
                  title="Informe o WhatsApp com DDD"
                />
              </label>
              <label className="grid gap-1">
                <span className={rotulo}>E-mail (opcional)</span>
                <input name="email" type="email" className={campo} placeholder="voce@email.com" autoComplete="email" />
              </label>
            </div>

            <label className="grid gap-1">
              <span className={rotulo}>Interesse</span>
              <select name="interesse" className={`${campo} cursor-pointer`} defaultValue={interesses[0]}>
                {interesses.map((i) => (
                  <option key={i}>{i}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-1">
              <span className={rotulo}>Mensagem (opcional)</span>
              <textarea name="mensagem" rows={3} maxLength={1000} className={`${campo} resize-none`} placeholder="Como podemos ajudar?" />
            </label>

            <label className="flex cursor-pointer items-start gap-3 text-sm text-grafite/75">
              <input required type="checkbox" name="consentimento" className="mt-1 h-4 w-4 shrink-0 accent-[#1c3a57]" />
              <span>Concordo em ser contatado pela ALE Empreendimentos pelos dados informados.</span>
            </label>

            {estado === "erro" && (
              <p role="alert" className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-800">
                {erro} Você também pode falar direto pelo{" "}
                <a href={msgWhats(nome)} target="_blank" rel="noopener" className="underline underline-offset-4">
                  WhatsApp
                </a>
                .
              </p>
            )}

            <button
              type="submit"
              disabled={estado === "enviando"}
              className="group inline-flex items-center justify-center gap-3 rounded-full bg-azul px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition hover:bg-noite disabled:opacity-60"
            >
              {estado === "enviando" ? "Enviando..." : "Quero ser atendido"}
              <ArrowRight size={16} strokeWidth={1.8} className="transition group-hover:translate-x-1" />
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
