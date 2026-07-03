import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://artikel-finder.example.de"),
  title: {
    default: "Artikel Finder – der, die oder das?",
    template: "%s | Artikel Finder",
  },
  description:
    "Finde den richtigen deutschen Artikel (der, die, das) für jedes Substantiv – mit Deklination, Erklärung und Beispielsätzen.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,600;9..144,700&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
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
        borderBottom: "2px solid var(--ink)",
        padding: "20px 0",
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontFamily: "var(--display)",
              fontSize: 24,
              fontWeight: 700,
              color: "var(--ink)",
            }}
          >
            Artikel<span style={{ color: "var(--der)" }}>·</span>Finder
          </span>
        </Link>
        <nav
          style={{
            display: "flex",
            gap: 20,
            fontFamily: "var(--mono)",
            fontSize: 13,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
          }}
        >
          <Link href="/artikel" style={{ textDecoration: "none" }}>
            Wörterliste
          </Link>
          <Link href="/#faq" style={{ textDecoration: "none" }}>
            FAQ
          </Link>
          <Link href="/ueber" style={{ textDecoration: "none" }}>
            Über uns
          </Link>
        </nav>
      </div>
    </header>
  );
}

function SiteFooter() {
  return (
    <footer
      style={{
        borderTop: "2px solid var(--ink)",
        marginTop: 80,
        padding: "28px 0",
        fontFamily: "var(--mono)",
        fontSize: 12,
        color: "var(--ink-soft)",
      }}
    >
      <div
        className="wrap"
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span>© {new Date().getFullYear()} Artikel-Finder</span>
        <span>der · die · das — für jedes Substantiv</span>
      </div>
    </footer>
  );
}
