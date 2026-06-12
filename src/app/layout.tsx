import { JsonLd } from "@/components/JsonLd";
import { SITE_URL } from "@/lib/site";
import type { Metadata } from "next";
import { Cinzel, Josefin_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

const josefin = Josefin_Sans({
  subsets: ["latin"],
  variable: "--font-josefin",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "SUA ARQUITETA RECIFE - Arquitetura | Interiores",
  description:
    "Arquitetura a preço popular em Recife. Design de interiores. Alvará de Funcionamento. Móveis Planejados. Arquiteto e Arquiteta em Recife. Projeto de Iluminação. Memorial Descritivo.",
  keywords: ["arquiteto arquiteta recife"],
  authors: [{ name: "@DiegoFischer.dev" }],
  robots: "index, follow",
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Sua Arquiteta Recife",
    description:
      "Conheça Sua Arquiteta Agni Garcia. Projetos presenciais em Recife ou remoto para qualquer cidade do Brasil.",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sua Arquiteta Recife",
    description:
      "Conheça Sua Arquiteta Agni Garcia. Projetos presenciais em Recife ou remoto para qualquer cidade do Brasil.",
  },
  icons: {
    icon: [
      { url: "/assets/favicon/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/assets/favicon/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/assets/favicon/apple-touch-icon.png",
  },
  manifest: "/assets/favicon/site.webmanifest",
  other: {
    "msapplication-TileColor": "#3D3834",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${cinzel.variable} ${josefin.variable}`}>
      <head>
        <meta name="theme-color" content="#3D3834" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        <link
          rel="preload"
          as="image"
          href="/assets/images/imagem-final-mobile.webp"
          type="image/webp"
          fetchPriority="high"
          media="(max-width: 1023px)"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/images/imagem-inicial-mobile.webp"
          type="image/webp"
          media="(max-width: 1023px)"
        />
        <link
          rel="preload"
          as="image"
          href="/assets/images/imagem-inicial.webp"
          type="image/webp"
          fetchPriority="high"
          media="(min-width: 1024px)"
        />
        <JsonLd />
      </head>
      <body className="antialiased">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-Y9F57S1NXE"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-Y9F57S1NXE');
            gtag('config', 'AW-11070437917');
          `}
        </Script>
      </body>
    </html>
  );
}
