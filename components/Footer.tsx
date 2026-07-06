import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t" style={{ borderColor: "var(--border)", background: "var(--bg-raised)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
          <div>
            <p className="font-display font-semibold mb-3">Artikelfinder</p>
            <p style={{ color: "var(--ink-soft)" }}>
              Der richtige Artikel für jedes deutsche Substantiv – schnell, verlässlich, kostenlos.
            </p>
          </div>
          <div>
            <p className="font-medium mb-3">Kategorien</p>
            <ul className="space-y-2" style={{ color: "var(--ink-soft)" }}>
              <li><Link href="/kategorie/der" className="hover:underline">der-Wörter</Link></li>
              <li><Link href="/kategorie/die" className="hover:underline">die-Wörter</Link></li>
              <li><Link href="/kategorie/das" className="hover:underline">das-Wörter</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-3">Ratgeber</p>
            <ul className="space-y-2" style={{ color: "var(--ink-soft)" }}>
              <li><Link href="/ratgeber/der-die-das-regeln" className="hover:underline">der/die/das-Regeln</Link></li>
              <li><Link href="/ueber-uns" className="hover:underline">Über uns</Link></li>
            </ul>
          </div>
          <div>
            <p className="font-medium mb-3">Rechtliches</p>
            <ul className="space-y-2" style={{ color: "var(--ink-soft)" }}>
              <li><Link href="/datenschutz" className="hover:underline">Datenschutz</Link></li>
              <li><Link href="/impressum" className="hover:underline">Impressum</Link></li>
              <li><Link href="/kontakt" className="hover:underline">Kontakt</Link></li>
            </ul>
          </div>
        </div>
        <p className="mt-10 text-xs" style={{ color: "var(--ink-faint)" }}>
          © {new Date().getFullYear()} Artikelfinder. Alle Angaben ohne Gewähr.
        </p>
      </div>
    </footer>
  );
}
