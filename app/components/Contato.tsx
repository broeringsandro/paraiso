"use client";

import { useState } from "react";
import WhatsappIcon from "./WhatsappIcon";

import { WHATSAPP } from "../lib/contato";

export default function Contato() {
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [interesse, setInteresse] = useState("Quero conhecer o Paraíso das Águas");

  function enviar(e: React.FormEvent) {
    e.preventDefault();
    const msg = `Olá! Meu nome é ${nome}. ${interesse}. Meu telefone: ${telefone}.`;
    window.open(`https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`, "_blank", "noopener");
  }

  const campo =
    "w-full border-b border-ceu/40 bg-transparent py-3 text-white placeholder:text-ceu/70 outline-none transition focus:border-dourado";

  return (
    <form onSubmit={enviar} className="grid gap-6">
      <label className="grid gap-1">
        <span className="rotulo text-dourado">Nome</span>
        <input required value={nome} onChange={(e) => setNome(e.target.value)} className={campo} placeholder="Seu nome" autoComplete="name" />
      </label>
      <label className="grid gap-1">
        <span className="rotulo text-dourado">Telefone</span>
        <input required value={telefone} onChange={(e) => setTelefone(e.target.value)} className={campo} placeholder="(48) 90000-0000" inputMode="tel" autoComplete="tel" />
      </label>
      <label className="grid gap-1">
        <span className="rotulo text-dourado">Interesse</span>
        <select value={interesse} onChange={(e) => setInteresse(e.target.value)} className={`${campo} [&>option]:text-grafite`}>
          <option>Quero conhecer o Paraíso das Águas</option>
          <option>Tenho interesse no apartamento de 3 dormitórios</option>
          <option>Tenho interesse no apartamento de 2 dormitórios</option>
          <option>Sou corretor</option>
        </select>
      </label>
      <button
        type="submit"
        className="mt-2 inline-flex items-center justify-center gap-2 rounded-full bg-dourado px-8 py-4 text-sm font-medium uppercase tracking-[0.15em] text-noite transition hover:bg-white"
      >
        <WhatsappIcon size={18} /> Enviar pelo WhatsApp
      </button>
    </form>
  );
}
