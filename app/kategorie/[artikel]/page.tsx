import Link from "next/link";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { Artikel, getWordsByArtikel } from "@/lib/words";
import { ArtikelPill } from "@/components/ArtikelPill";

const GUELTIGE: Artikel[] = ["der", "die", "das"];

const GESCHLECHT_NAME: Record<Artikel, string> = {
  der: "maskuline",
  die: "feminine",
  das: "neutrale",
};

export function generateStaticParams() {
  return GUELTIGE.map((artikel) => ({ artikel }));
}

export async function generateMetadata({ params }: { params: Promise<{ artikel: string }> }): Promise<Metadata> {
  const { artikel: artikelParam } = await params;
  const artikel = artikelParam as Artikel;
  if (!GUELTIGE.includes(artikel)) return {};
  const title = `Alle ${artikel}-Wörter – Liste ${GESCHLECHT_NAME[artikel]} Substantive`;
  const description = `Vollständige Liste deutscher Substantive mit dem Artikel "${artikel}". Finde schnell alle ${GESCHLECHT_NAME[artikel]} Wörter im Deutschen mit Beispielsätzen und Übersetzungen.`;
  return { title, description, alternates: { canonical: `/kategorie/${artikel}` } };
}

export default async function KategoriePage({ params }: { params: Promise<{ artikel: string }> }) {
  const { artikel: artikelParam } = await params;
  const artikel = artikelParam as Artikel;
  if (!GUELTIGE.includes(artikel)) notFound();

  const woerter = getWordsByArtikel(artikel);

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <nav className="text-xs mb-8 font-mono" style={{ color: "var(--ink-faint)" }}>
        <Link href="/" className="hover:underline">Start</Link> {" / "}
        <span style={{ color: "var(--ink)" }}>{artikel}-Wörter</span>
      </nav>

      <div className="mb-10">
        <ArtikelPill artikel={artikel} size="lg" />
        <h1 className="font-display text-3xl md:text-5xl mt-5 mb-4">
          Alle {artikel}-Wörter im Deutschen
        </h1>
        <p className="text-base md:text-lg max-w-2xl" style={{ color: "var(--ink-soft)" }}>
          Hier findest du {woerter.length} {GESCHLECHT_NAME[artikel]} Substantive mit dem Artikel „{artikel}“.
          Klicke auf ein Wort für Deklination, Beispielsätze, Übersetzungen und ein kurzes Quiz.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {woerter.map((w) => (
          <Link
            key={w.slug}
            href={`/artikel/${w.slug}`}
            className="flex items-center gap-3 rounded-xl border px-4 py-3 hover:shadow-sm transition-shadow"
            style={{ borderColor: "var(--border)", background: "var(--bg-raised)" }}
          >
            <ArtikelPill artikel={w.artikel} size="sm" />
            <span>{w.wort}</span>
          </Link>
        ))}
      </div>

      <div className="mt-12 flex gap-3">
        {GUELTIGE.filter((a) => a !== artikel).map((a) => (
          <Link
            key={a}
            href={`/kategorie/${a}`}
            className="text-sm underline underline-offset-4"
            style={{ color: "var(--gold)" }}
          >
            {a}-Wörter ansehen →
          </Link>
        ))}
      </div>
    </div>
  );
}
