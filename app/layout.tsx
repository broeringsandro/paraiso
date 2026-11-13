import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import "./globals.css";
import Providers from "./components/Providers";
import Smooth from "./components/Smooth";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsappFlutuante from "./components/WhatsappFlutuante";
import { WA_LINK, SITE_URL, ALLOW_INDEX, NOME_SITE, RESUMO } from "./lib/site";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Paraíso das Águas | O primeiro e maior home club de Santo Amaro da Imperatriz",
    template: "%s | Paraíso das Águas",
  },
  description:
    "Residencial com 2 torres e 112 apartamentos de 2 e 3 dormitórios com suíte e home club completo em Santo Amaro da Imperatriz/SC. Realização ALE.",
  alternates: { canonical: "/" },
  robots: ALLOW_INDEX ? { index: true, follow: true } : { index: false, follow: false },
  openGraph: {
    title: "Paraíso das Águas | Apartamentos com home club em Santo Amaro da Imperatriz",
    description: RESUMO,
    siteName: NOME_SITE,
    locale: "pt_BR",
    type: "website",
    images: ["/img/fachada-08.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paraíso das Águas | Apartamentos com home club em Santo Amaro da Imperatriz",
    description: RESUMO,
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
