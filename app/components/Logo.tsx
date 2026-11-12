import Image from "next/image";

// Versões: completa (PARAÍSO + DAS ÁGUAS) ou reduzida (só PARAÍSO); dourado para fundos escuros, azul para claros.
export default function Logo({
  className = "",
  compacto = false,
  tom = "dourado",
}: {
  className?: string;
  compacto?: boolean;
  tom?: "dourado" | "azul";
}) {
  const arquivo = `/logo/paraiso${compacto ? "-reduzido" : ""}-${tom}.svg`;
  const [w, h] = compacto ? [880, 175] : [880, 277];
  return (
    <Image
      src={arquivo}
      alt="Paraíso das Águas"
      width={w}
      height={h}
      unoptimized
      className={`h-auto ${className}`}
    />
  );
}
