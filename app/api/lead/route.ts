import { NextResponse } from "next/server";

// Recebe os dados do formulário e repassa para um webhook (LEAD_WEBHOOK_URL).
// Ex.: Zapier, Make, n8n, planilha do Google, CRM da ALE.
// Sem webhook configurado em produção, responde 503 para o site mostrar o WhatsApp
// em vez de avisar "recebemos" por engano.

type Lead = {
  nome: string;
  whatsapp: string;
  email?: string;
  interesse?: string;
  mensagem?: string;
};

function validar(b: unknown): { ok: true; lead: Lead } | { ok: false; erro: string } {
  if (typeof b !== "object" || b === null) return { ok: false, erro: "Dados inválidos." };
  const d = b as Record<string, unknown>;
  const nome = typeof d.nome === "string" ? d.nome.trim() : "";
  const whatsapp = typeof d.whatsapp === "string" ? d.whatsapp.replace(/\D/g, "") : "";
  const email = typeof d.email === "string" ? d.email.trim() : "";
  const interesse = typeof d.interesse === "string" ? d.interesse.trim().slice(0, 120) : "";
  const mensagem = typeof d.mensagem === "string" ? d.mensagem.trim().slice(0, 1000) : "";

  if (nome.length < 2 || nome.length > 120) return { ok: false, erro: "Informe seu nome." };
  if (whatsapp.length < 10 || whatsapp.length > 13) return { ok: false, erro: "Informe um WhatsApp válido com DDD." };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return { ok: false, erro: "E-mail inválido." };
  if (d.consentimento !== true) return { ok: false, erro: "É preciso aceitar o contato para enviar." };

  return { ok: true, lead: { nome, whatsapp, email: email || undefined, interesse: interesse || undefined, mensagem: mensagem || undefined } };
}

export async function POST(req: Request) {
  let corpo: unknown;
  try {
    corpo = await req.json();
  } catch {
    return NextResponse.json({ ok: false, erro: "Dados inválidos." }, { status: 400 });
  }

  // Campo-armadilha para robôs: se vier preenchido, finge sucesso e descarta.
  if (typeof corpo === "object" && corpo !== null && (corpo as Record<string, unknown>).site) {
    return NextResponse.json({ ok: true });
  }

  const v = validar(corpo);
  if (!v.ok) return NextResponse.json({ ok: false, erro: v.erro }, { status: 400 });

  const payload = { ...v.lead, origem: "site paraiso-das-aguas", recebidoEm: new Date().toISOString() };
  const webhook = process.env.LEAD_WEBHOOK_URL;

  if (!webhook) {
    if (process.env.NODE_ENV !== "production") {
      console.info("[lead] (LEAD_WEBHOOK_URL não configurada, só em desenvolvimento)", payload);
      return NextResponse.json({ ok: true });
    }
    return NextResponse.json({ ok: false, erro: "Envio indisponível no momento." }, { status: 503 });
  }

  try {
    const r = await fetch(webhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!r.ok) return NextResponse.json({ ok: false, erro: "Falha ao enviar." }, { status: 502 });
  } catch {
    return NextResponse.json({ ok: false, erro: "Falha ao enviar." }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
