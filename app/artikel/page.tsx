import type { Metadata } from "next";
import { getAllWords } from "@/data/woerter";
import WordCard from "@/components/WordCard";
import AdSlot from "@/components/AdSlot";

export const metadata: Metadata = {
  title: "Wörterliste – alle Substantive mit Artikel",
  description:
    "Alphabetische Liste aller Substantive im Artikel-Finder mit der, die oder das.",
};

export default function WoerterlistePage() {
  const woerter = [...getAllWords()].sort((a, b) => a.wort.localeCompare(b.wort, "de"));

  return (
    <div className="wrap" style={{ padding: "48px 24px 88px" }}>
      <p className="eyebrow" style={{ marginBottom: 10 }}>Wörterbuch</p>
      <h1 style={{ fontSize: "clamp(30px, 5vw, 44px)", marginBottom: 12 }}>Wörterliste</h1>
      <p style={{ color: "var(--ink-soft)", maxWidth: 600, marginBottom: 32 }}>
        {woerter.length} Substantive – alphabetisch sortiert. Klicke auf ein
        Wort für Artikel, Deklination, Aussprache und Beispielsätze.
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
          gap: 16,
          marginBottom: 40,
        }}
      >
        {woerter.map((w) => (
          <WordCard key={w.slug} wort={w} />
        ))}
      </div>

      <AdSlot label="Anzeige · 728×90" height={90} variant="banner" />
    </div>
  );
}
