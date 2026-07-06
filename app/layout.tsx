import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.artikelfinder.com"),
  title: {
    default: "Artikelfinder – der, die oder das? Deutsche Artikel schnell finden",
    template: "%s | Artikelfinder",
  },
  description:
    "Artikelfinder zeigt dir sofort den richtigen deutschen Artikel (der, die, das) für tausende Substantive – mit Beispielsätzen, Deklination, Quiz und Übersetzungen in 10 Sprachen.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Artikelfinder",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
