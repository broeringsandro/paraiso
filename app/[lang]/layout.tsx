import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import { Hanken_Grotesk } from "next/font/google";
import "../globals.css";
import Providers from "../components/Providers";
import Smooth from "../components/Smooth";
import Header from "../components/Header";
import Footer from "../components/Footer";
import WhatsappFlutuante from "../components/WhatsappFlutuante";
import { WA_LINK, SITE_URL, ALLOW_INDEX, NOME_SITE, RESUMO } from "../lib/site";
import { caminho, hasLocale, htmlLang, locales, ogLocale } from "../lib/i18n";
import { criarT } from "../i18n/traduzir";
import { alternativas } from "../lib/seo";

const hanken = Hanken_Grotesk({
  variable: "--font-hanken",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const t = criarT(lang);
  const titulo = t("Paraíso das Águas | Apartamentos com home club em Santo Amaro da Imperatriz");
  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t("Paraíso das Águas | O primeiro e maior home club de Santo Amaro da Imperatriz"),
      template: "%s | Paraíso das Águas",
    },
    description: t("Residencial com 2 torres e 112 apartamentos de 2 e 3 dormitórios com suíte e home club completo em Santo Amaro da Imperatriz/SC. Realização ALE."),
    alternates: alternativas(lang, "/"),
    robots: ALLOW_INDEX ? { index: true, follow: true } : { index: false, follow: false },
    openGraph: {
      title: titulo,
      description: t(RESUMO),
      url: caminho(lang, "/"),
      siteName: NOME_SITE,
      locale: ogLocale[lang],
      type: "website",
      images: ["/img/fachada-08.jpg"],
    },
    twitter: { card: "summary_large_image", title: titulo, description: t(RESUMO), images: ["/img/fachada-08.jpg"] },
  };
}

export const viewport: Viewport = {
  themeColor: "#14243a",
};

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html lang={htmlLang[lang]} className={`${hanken.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Providers lang={lang}>
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
