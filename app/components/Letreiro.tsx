// Faixa em movimento sob o hero (referência: site da ALZ).
const itens = [
  "Pré-lançamento",
  "O primeiro e maior home club da cidade",
  "Sacada com churrasqueira",
  "Todas as garagens são cobertas",
  "Piscina com deck",
  "Coworking e academia",
  "Santo Amaro da Imperatriz",
  "4 salões de festas",
];

export default function Letreiro() {
  const linha = (
    <div className="flex shrink-0 items-center" aria-hidden>
      {itens.map((t) => (
        <span key={t} className="flex items-center whitespace-nowrap text-xs font-medium uppercase tracking-[0.2em]">
          <span className="px-8">{t}</span>
          <span className="h-1.5 w-1.5 rounded-full bg-noite/50" />
        </span>
      ))}
    </div>
  );
  return (
    <div className="letreiro overflow-hidden bg-dourado py-4 text-noite" role="presentation">
      <div className="letreiro-trilha">
        {linha}
        {linha}
      </div>
    </div>
  );
}
