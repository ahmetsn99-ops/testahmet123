import Link from "next/link";
import { SearchBox } from "./SearchBox";

export function Header() {
  return (
    <header className="border-b" style={{ borderColor: "var(--border)", background: "var(--bg-raised)" }}>
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 gap-4">
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="font-display font-semibold text-xl md:text-2xl" style={{ color: "var(--ink)" }}>
              Artikel<span style={{ color: "var(--gold)" }}>finder</span>
            </span>
          </Link>

          <div className="hidden md:block flex-1 max-w-sm">
            <SearchBox compact />
          </div>

          <nav className="hidden md:flex items-center gap-6 text-sm shrink-0" style={{ color: "var(--ink-soft)" }}>
            <Link href="/kategorie/der" className="hover:opacity-70">der</Link>
            <Link href="/kategorie/die" className="hover:opacity-70">die</Link>
            <Link href="/kategorie/das" className="hover:opacity-70">das</Link>
            <Link href="/ratgeber/der-die-das-regeln" className="hover:opacity-70">Regeln</Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
