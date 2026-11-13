import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import Smooth from "./components/Smooth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsappFlutuante from "./components/WhatsappFlutuante";
import { WA_LINK } from "./lib/site";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Paraíso das Águas | O primeiro e maior home club de Santo Amaro da Imperatriz",
    template: "%s | Paraíso das Águas",
  },
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
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers>
          <Smooth />
          <Header whatsapp={WA_LINK} />
          <main id="topo">{children}</main>
          <Footer />
          <WhatsappFlutuante />
        </Providers>
      </body>
    </html>
  );
}
