// TODO: trocar pelo SVG oficial do logo (Figma, página "Identidade Final").
// Este wordmark em texto é provisório e imita a estrutura da marca.
export default function Logo({
  className = "",
  compacto = false,
}: {
  className?: string;
  compacto?: boolean;
}) {
  return (
    <span
      className={`inline-flex flex-col items-center leading-none ${className}`}
      aria-label="Paraíso das Águas"
    >
      <span
        className={`font-light uppercase ${
          compacto ? "text-[17px] tracking-[0.42em]" : "text-3xl tracking-[0.5em] md:text-5xl"
        }`}
        style={{ marginRight: "-0.5em" }}
      >
        Paraíso
      </span>
      {!compacto && (
        <span className="mt-3 flex items-center gap-3 text-[10px] uppercase tracking-[0.4em] md:text-xs">
          <span className="h-px w-8 bg-current opacity-60" />
          Das Águas
          <span className="h-px w-8 bg-current opacity-60" />
        </span>
      )}
    </span>
  );
}
