import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Artikel, getWordsByArtikel } from "@/data/woerter";
import WordCard from "@/components/WordCard";
import AdSlot from "@/components/AdSlot";

const GUELTIGE_ARTIKEL: Artikel[] = ["der", "die", "das"];

const INFO: Record<
  Artikel,
  { genus: string; hinweis: string; endungen: { endung: string; beispiel: string }[] }
> = {
  der: {
    genus: "Maskulin",
    hinweis:
      "Männliche Personen, Wochentage, Monate, Jahreszeiten sowie viele Wörter auf -er, -ling, -ismus.",
    endungen: [
      { endung: "-er", beispiel: "der Lehrer" },
      { endung: "-ling", beispiel: "der Frühling" },
      { endung: "-ismus", beispiel: "der Tourismus" },
      { endung: "-or", beispiel: "der Motor" },
    ],
  },
  die: {
    genus: "Feminin",
    hinweis:
      "Weibliche Personen sowie fast alle Wörter auf -ung, -heit, -keit, -schaft, -ion und die meisten auf -e.",
    endungen: [
      { endung: "-ung", beispiel: "die Zeitung" },
      { endung: "-heit", beispiel: "die Freiheit" },
      { endung: "-schaft", beispiel: "die Freundschaft" },
      { endung: "-tion", beispiel: "die Nation" },
    ],
  },
  das: {
    genus: "Neutrum",
    hinweis:
      "Diminutive auf -chen und -lein, Nominalisierungen sowie viele Wörter auf -um und -ment.",
    endungen: [
      { endung: "-chen", beispiel: "das Mädchen" },
      { endung: "-lein", beispiel: "das Büchlein" },
      { endung: "-um", beispiel: "das Museum" },
      { endung: "-ment", beispiel: "das Dokument" },
    ],
  },
};

export function generateStaticParams() {
  return GUELTIGE_ARTIKEL.map((artikel) => ({ artikel }));
}

export function generateMetadata({
  params,
}: {
  params: { artikel: string };
}): Metadata {
  const artikel = params.artikel as Artikel;
  if (!GUELTIGE_ARTIKEL.includes(artikel)) return {};
  const anzahl = getWordsByArtikel(artikel).length;
  return {
    title: `${artikel}-Wörter: Nomen mit Artikel ${artikel}`,
    description: `${anzahl} deutsche Nomen mit Artikel ${artikel} — ${INFO[artikel].hinweis} Mit Deklination, Plural und Beispielsätzen.`,
  };
}

export default function ArtikelKategoriePage({
  params,
}: {
  params: { artikel: string };
}) {
  const artikel = params.artikel as Artikel;
  if (!GUELTIGE_ARTIKEL.includes(artikel)) notFound();

  const woerter = [...getWordsByArtikel(artikel)].sort((a, b) => a.wort.localeCompare(b.wort, "de"));
  const info = INFO[artikel];

  return (
    <div className="wrap" style={{ padding: "40px 20px 80px" }}>
      <nav style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-soft)", marginBottom: 20 }}>
        <Link href="/" style={{ textDecoration: "none" }}>Start</Link> / {artikel}-Wörter
      </nav>

      <span className={`badge bg-${artikel} tag-${artikel}`} style={{ padding: "5px 14px", fontSize: 14 }}>
        {info.genus}
      </span>
      <h1 style={{ fontSize: "clamp(28px, 5vw, 42px)", marginTop: 14, marginBottom: 10 }}>
        {artikel}-Wörter: Nomen mit Artikel {artikel}
      </h1>
      <p style={{ color: "var(--ink-soft)", maxWidth: 640, marginBottom: 32 }}>
        {woerter.length} Substantive mit dem Artikel «{artikel}» — {info.hinweis}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
          gap: 14,
          marginBottom: 40,
        }}
      >
        {woerter.map((w) => (
          <WordCard key={w.slug} wort={w} />
        ))}
      </div>

      <AdSlot label="Anzeige · 728×90" height={90} variant="banner" />

      <section style={{ marginTop: 48 }}>
        <h2 style={{ fontSize: 22, marginBottom: 16 }}>
          {artikel}-Endungen: Wie du {artikel}-Wörter erkennst
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 12 }}>
          {info.endungen.map((e) => (
            <div key={e.endung} className="card" style={{ padding: "16px 18px" }}>
              <span style={{ fontFamily: "var(--mono)", fontSize: 15, fontWeight: 700 }}>{e.endung}</span>
              <span style={{ color: "var(--ink-soft)" }}> → </span>
              <span className={`tag-${artikel}`} style={{ fontFamily: "var(--mono)" }}>{artikel}</span>
              <p style={{ marginTop: 8, fontSize: 14.5 }}>{e.beispiel}</p>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 48, display: "flex", gap: 12, flexWrap: "wrap" }}>
        {GUELTIGE_ARTIKEL.filter((a) => a !== artikel).map((a) => (
          <Link key={a} href={`/${a}`} className="chip">
            <span className={`tag-${a}`} style={{ fontFamily: "var(--mono)", fontWeight: 700 }}>{a}</span>
            -Wörter ansehen
          </Link>
        ))}
      </section>
    </div>
  );
}
