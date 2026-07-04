import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://artikel-finder.example.de"),
  title: {
    default: "Artikel Finder – der, die oder das? Deutsche Grammatik einfach erklärt",
    template: "%s | Artikel Finder",
  },
  description:
    "Finde den richtigen deutschen Artikel (der, die, das) für jedes Substantiv – mit Deklination, Aussprache, Synonymen, typischen Fehlern und Beispielsätzen.",
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
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
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600&display=swap"
          rel="stylesheet"
        />
        {/*
          AdSense-Verifizierung / Auto-Ads-Script hier einfügen, z. B.:
          <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXX" crossOrigin="anonymous" />
        */}
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
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(11, 14, 23, 0.85)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid var(--line-dark)",
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
          padding: "16px 24px",
        }}
      >
        <Link
          href="/"
          style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 8 }}
        >
          <span
            style={{
              width: 30,
              height: 30,
              borderRadius: 9,
              background: "var(--gradient)",
              display: "grid",
              placeItems: "center",
              fontFamily: "var(--display)",
              fontWeight: 700,
              fontSize: 14,
              color: "#fff",
            }}
          >
            A
          </span>
          <span
            style={{
              fontFamily: "var(--display)",
              fontSize: 19,
              fontWeight: 700,
              color: "var(--ink-inverse)",
            }}
          >
            Artikel Finder
          </span>
        </Link>
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 28,
            fontSize: 14.5,
            fontWeight: 500,
          }}
        >
          <Link
            href="/artikel"
            style={{ textDecoration: "none", color: "var(--ink-inverse-soft)" }}
          >
            Wörterliste
          </Link>
          <Link
            href="/#faq"
            style={{ textDecoration: "none", color: "var(--ink-inverse-soft)" }}
          >
            FAQ
          </Link>
          <Link
            href="/ueber"
            style={{ textDecoration: "none", color: "var(--ink-inverse-soft)" }}
          >
            Über uns
          </Link>
          <Link href="/artikel" className="btn btn-ghost" style={{ padding: "10px 20px", fontSize: 14 }}>
            Wort suchen
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
        background: "var(--bg-dark)",
        color: "var(--ink-inverse-soft)",
        marginTop: 0,
        padding: "56px 0 32px",
      }}
    >
      <div className="wrap">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.4fr 1fr 1fr",
            gap: 32,
            paddingBottom: 32,
            borderBottom: "1px solid var(--line-dark)",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--display)",
                fontSize: 20,
                fontWeight: 700,
                color: "var(--ink-inverse)",
              }}
            >
              Artikel Finder
            </span>
            <p style={{ marginTop: 10, fontSize: 14.5, maxWidth: 320, lineHeight: 1.7 }}>
              Die moderne Nachschlagehilfe für deutsche Artikel, Deklination
              und Grammatik – kostenlos und werbefinanziert.
            </p>
          </div>
          <FooterCol
            title="Navigation"
            links={[
              { href: "/", label: "Start" },
              { href: "/artikel", label: "Wörterliste" },
              { href: "/ueber", label: "Über uns" },
            ]}
          />
          <FooterCol
            title="Wissen"
            links={[
              { href: "/#faq", label: "Häufige Fragen" },
              { href: "/#regeln", label: "Genus-Regeln" },
            ]}
          />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 12,
            paddingTop: 20,
            fontSize: 13,
            fontFamily: "var(--mono)",
          }}
        >
          <span>© {new Date().getFullYear()} Artikel-Finder</span>
          <span>der · die · das — für jedes Substantiv</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { href: string; label: string }[];
}) {
  return (
    <div>
      <p
        style={{
          fontFamily: "var(--mono)",
          fontSize: 12,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          color: "var(--ink-inverse)",
          marginBottom: 14,
        }}
      >
        {title}
      </p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            style={{ fontSize: 14.5, textDecoration: "none", color: "var(--ink-inverse-soft)" }}
          >
            {l.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
