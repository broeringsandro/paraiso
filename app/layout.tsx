import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Paraíso das Águas | O primeiro e maior home club de Santo Amaro da Imperatriz",
  description:
    "Residencial Paraíso das Águas: duas torres, 112 apartamentos de 2 e 3 dormitórios com suíte e home club completo em Santo Amaro da Imperatriz/SC. Realização ALE Empreendimentos.",
  openGraph: {
    title: "Paraíso das Águas",
    description: "Um refúgio onde a água desacelera o tempo.",
    locale: "pt_BR",
    type: "website",
    images: ["/img/fachada-08.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#14243a",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${hanken.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
