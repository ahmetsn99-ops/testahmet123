import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://artikel-finder.example.de"),
  title: {
    default: "Artikel Finder – der, die oder das? Deutsche Nomen nachschlagen",
    template: "%s | Artikel Finder",
  },
  description:
    "Finde den richtigen deutschen Artikel (der, die, das) für jedes Substantiv – mit Deklination, Aussprache, Synonymen, typischen Fehlern und Beispielsätzen. Kostenlos, ohne Anmeldung.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Artikel Finder",
  },
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body style={{ fontFamily: "var(--font-inter), system-ui, sans-serif" }}>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}

function SiteHeader() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.92)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
          padding: "14px 20px",
        }}
      >
        <Link href="/" style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              width: 28,
              height: 28,
              borderRadius: 7,
              background: "var(--brand)",
              display: "grid",
              placeItems: "center",
              fontWeight: 700,
              fontSize: 14,
              color: "#fff",
            }}
          >
            A
          </span>
          <span style={{ fontSize: 18, fontWeight: 700 }}>Artikel Finder</span>
        </Link>
        <nav style={{ display: "flex", alignItems: "center", gap: 22, fontSize: 14.5, fontWeight: 500 }}>
          <Link href="/der" style={{ textDecoration: "none", color: "var(--ink-soft)" }}>
            der
          </Link>
          <Link href="/die" style={{ textDecoration: "none", color: "var(--ink-soft)" }}>
            die
          </Link>
          <Link href="/das" style={{ textDecoration: "none", color: "var(--ink-soft)" }}>
            das
          </Link>
          <Link href="/#faq" style={{ textDecoration: "none", color: "var(--ink-soft)" }}>
            FAQ
          </Link>
          <Link href="/ueber" style={{ textDecoration: "none", color: "var(--ink-soft)" }}>
            Über uns
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer style={{ borderTop: "1px solid var(--line)", marginTop: 24, padding: "40px 0 28px" }}>
      <div className="wrap">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
            marginBottom: 20,
            fontSize: 14.5,
          }}
        >
          <div style={{ display: "flex", gap: 18, flexWrap: "wrap" }}>
            <Link href="/der" style={{ textDecoration: "none", color: "var(--ink-soft)" }}>der-Wörter</Link>
            <Link href="/die" style={{ textDecoration: "none", color: "var(--ink-soft)" }}>die-Wörter</Link>
            <Link href="/das" style={{ textDecoration: "none", color: "var(--ink-soft)" }}>das-Wörter</Link>
            <Link href="/ueber" style={{ textDecoration: "none", color: "var(--ink-soft)" }}>Über uns</Link>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            paddingTop: 16,
            borderTop: "1px solid var(--line)",
            fontSize: 13,
            fontFamily: "var(--mono)",
            color: "var(--ink-soft)",
          }}
        >
          <span>© {new Date().getFullYear()} Artikel Finder</span>
          <span>der · die · das — für jedes Substantiv</span>
        </div>
      </div>
    </footer>
  );
}
