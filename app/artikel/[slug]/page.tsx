import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import {
  getAllWords,
  getWordBySlug,
  getRelatedWords,
} from "@/data/woerter";
import ArticleBadge from "@/components/ArticleBadge";
import DeclensionTable from "@/components/DeclensionTable";
import WordCard from "@/components/WordCard";

export function generateStaticParams() {
  return getAllWords().map((w) => ({ slug: w.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Metadata {
  const wort = getWordBySlug(params.slug);
  if (!wort) return {};
  return {
    title: `${wort.artikel} ${wort.wort} – Artikel, Deklination & Beispiele`,
    description: `${wort.bedeutung} Alles zu Genus, Nominativ, Akkusativ, Dativ, Genitiv und 8 Beispielsätzen mit "${wort.wort}".`,
  };
}

export default function WortSeite({ params }: { params: { slug: string } }) {
  const wort = getWordBySlug(params.slug);
  if (!wort) notFound();

  const verwandt = getRelatedWords(wort);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: `${wort.artikel} ${wort.wort}`,
    description: wort.bedeutung,
    inDefinedTermSet: "Artikel-Finder Wörterbuch",
  };

  return (
    <article className="wrap" style={{ padding: "48px 0 80px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        style={{
          fontFamily: "var(--mono)",
          fontSize: 12,
          color: "var(--ink-soft)",
          marginBottom: 20,
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>
          Start
        </Link>{" "}
        /{" "}
        <Link href="/artikel" style={{ textDecoration: "none" }}>
          Wörterliste
        </Link>{" "}
        / {wort.wort}
      </nav>

      {/* KOPF */}
      <header style={{ marginBottom: 32 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <ArticleBadge artikel={wort.artikel} size="lg" />
          <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)" }}>{wort.wort}</h1>
        </div>
        <p
          style={{
            marginTop: 14,
            fontSize: 18,
            color: "var(--ink-soft)",
            maxWidth: 640,
          }}
        >
          {wort.bedeutung}
        </p>
        <div
          style={{
            display: "flex",
            gap: 20,
            marginTop: 16,
            fontFamily: "var(--mono)",
            fontSize: 13,
            color: "var(--ink-soft)",
            flexWrap: "wrap",
          }}
        >
          <span>
            Genus: <strong style={{ color: "var(--ink)" }}>{wort.genus}</strong>
          </span>
          <span>
            Plural:{" "}
            <strong style={{ color: "var(--ink)" }}>die {wort.plural}</strong>
          </span>
          <span>
            Kategorie:{" "}
            <strong style={{ color: "var(--ink)" }}>{wort.kategorie}</strong>
          </span>
        </div>
      </header>

      {wort.merksatz && (
        <div
          className={`bg-${wort.artikel}`}
          style={{
            borderLeft: `5px solid var(--${wort.artikel})`,
            borderRadius: "var(--radius)",
            padding: "16px 18px",
            marginBottom: 36,
          }}
        >
          <p
            style={{
              margin: 0,
              fontSize: 14,
              fontFamily: "var(--mono)",
              textTransform: "uppercase",
              letterSpacing: "0.04em",
              marginBottom: 6,
            }}
          >
            Merksatz
          </p>
          <p style={{ margin: 0, fontSize: 15 }}>{wort.merksatz}</p>
        </div>
      )}

      {/* DEKLINATION */}
      <section style={{ marginBottom: 44 }}>
        <h2 style={{ fontSize: 24, marginBottom: 16 }}>
          Deklination: Nominativ, Akkusativ, Dativ, Genitiv
        </h2>
        <DeclensionTable
          singular={wort.deklinationSingular}
          plural={wort.deklinationPlural}
          artikel={wort.artikel}
        />
        <p
          style={{
            marginTop: 14,
            fontSize: 14,
            color: "var(--ink-soft)",
            maxWidth: 640,
          }}
        >
          <strong>Nominativ</strong> nennt das Subjekt des Satzes,{" "}
          <strong>Akkusativ</strong> das direkte Objekt,{" "}
          <strong>Dativ</strong> meist das indirekte Objekt, und{" "}
          <strong>Genitiv</strong> zeigt einen Besitz oder eine Zugehörigkeit
          an.
        </p>
      </section>

      {/* BEISPIELSÄTZE */}
      <section style={{ marginBottom: 44 }}>
        <h2 style={{ fontSize: 24, marginBottom: 16 }}>
          8 Beispielsätze mit „{wort.wort}“
        </h2>
        <ol
          style={{
            margin: 0,
            padding: 0,
            listStyle: "none",
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {wort.beispielsaetze.map((satz, i) => (
            <li
              key={i}
              style={{
                display: "flex",
                gap: 14,
                padding: "12px 16px",
                border: "1px solid var(--line)",
                borderRadius: "var(--radius)",
                background: i % 2 === 0 ? "var(--paper)" : "var(--paper-dim)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--mono)",
                  color: "var(--ink-soft)",
                  fontSize: 13,
                  minWidth: 18,
                }}
              >
                {i + 1}
              </span>
              <span>{satz}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* VERWANDTE WÖRTER — internal linking */}
      {verwandt.length > 0 && (
        <section>
          <h2 style={{ fontSize: 24, marginBottom: 16 }}>
            Verwandte Wörter
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: 14,
            }}
          >
            {verwandt.map((w) => (
              <WordCard key={w.slug} wort={w} />
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
