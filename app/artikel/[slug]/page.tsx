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
import AdSlot from "@/components/AdSlot";

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
    <article className="wrap" style={{ padding: "40px 24px 88px" }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav
        style={{
          fontFamily: "var(--mono)",
          fontSize: 12,
          color: "var(--ink-soft)",
          marginBottom: 24,
        }}
      >
        <Link href="/" style={{ textDecoration: "none" }}>Start</Link>{" "}
        / <Link href="/artikel" style={{ textDecoration: "none" }}>Wörterliste</Link>{" "}
        / {wort.wort}
      </nav>

      <div className="word-detail-grid">
        <div>
          {/* KOPF */}
          <header style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap" }}>
              <ArticleBadge artikel={wort.artikel} size="lg" />
              <h1 style={{ fontSize: "clamp(32px, 5vw, 48px)" }}>{wort.wort}</h1>
              <span
                style={{
                  fontFamily: "var(--mono)",
                  fontSize: 13,
                  color: "var(--ink-soft)",
                }}
              >
                {wort.aussprache}
              </span>
            </div>
            <p style={{ marginTop: 14, fontSize: 18, color: "var(--ink-soft)", maxWidth: 640 }}>
              {wort.bedeutung}
            </p>
          </header>

          {wort.merksatz && (
            <div
              className={`bg-${wort.artikel}`}
              style={{
                borderLeft: `4px solid var(--${wort.artikel})`,
                borderRadius: "var(--radius)",
                padding: "18px 20px",
                marginBottom: 28,
              }}
            >
              <p className="eyebrow" style={{ marginBottom: 6 }}>Merksatz</p>
              <p style={{ margin: 0, fontSize: 15 }}>{wort.merksatz}</p>
            </div>
          )}

          {/* DEKLINATION */}
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 24, marginBottom: 16 }}>
              Deklination: Nominativ, Akkusativ, Dativ, Genitiv
            </h2>
            <DeclensionTable
              singular={wort.deklinationSingular}
              plural={wort.deklinationPlural}
              artikel={wort.artikel}
            />
            <p style={{ marginTop: 14, fontSize: 14, color: "var(--ink-soft)", maxWidth: 640 }}>
              <strong>Nominativ</strong> nennt das Subjekt des Satzes,{" "}
              <strong>Akkusativ</strong> das direkte Objekt,{" "}
              <strong>Dativ</strong> meist das indirekte Objekt, und{" "}
              <strong>Genitiv</strong> zeigt einen Besitz oder eine Zugehörigkeit an.
            </p>
          </section>

          {/* HÄUFIGER FEHLER */}
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 24, marginBottom: 16 }}>Typischer Fehler</h2>
            <div className="card" style={{ padding: "18px 20px", borderLeft: "4px solid var(--die)" }}>
              <p style={{ margin: 0, fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.7 }}>
                {wort.haeufigerFehler}
              </p>
            </div>
          </section>

          {/* BEISPIELSÄTZE */}
          <section style={{ marginBottom: 40 }}>
            <h2 style={{ fontSize: 24, marginBottom: 16 }}>
              8 Beispielsätze mit „{wort.wort}"
            </h2>
            <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {wort.beispielsaetze.map((satz, i) => (
                <li
                  key={i}
                  className="card"
                  style={{ display: "flex", gap: 14, padding: "14px 18px" }}
                >
                  <span
                    style={{
                      fontFamily: "var(--mono)",
                      color: "var(--der)",
                      fontSize: 13,
                      minWidth: 20,
                      fontWeight: 600,
                    }}
                  >
                    {i + 1}
                  </span>
                  <span>{satz}</span>
                </li>
              ))}
            </ol>
          </section>

          <div style={{ marginBottom: 40 }}>
            <AdSlot label="Anzeige · In-Content" height={120} variant="rectangle" />
          </div>

          {/* VERWANDTE WÖRTER */}
          {verwandt.length > 0 && (
            <section>
              <h2 style={{ fontSize: 24, marginBottom: 16 }}>Verwandte Wörter</h2>
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
        </div>

        {/* SIDEBAR */}
        <aside style={{ position: "sticky", top: 96, display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ padding: "20px" }}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>Schnellübersicht</p>
            <SidebarRow label="Genus" value={wort.genus} />
            <SidebarRow label="Plural" value={`die ${wort.plural}`} />
            <SidebarRow label="Niveau" value={wort.niveau} />
            <SidebarRow label="Kategorie" value={wort.kategorie} />
            {wort.synonyme.length > 0 && (
              <div style={{ marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--line)" }}>
                <p style={{ fontSize: 12.5, fontFamily: "var(--mono)", color: "var(--ink-soft)", marginBottom: 8 }}>
                  Synonyme / verwandte Begriffe
                </p>
                <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  {wort.synonyme.map((s) => (
                    <span key={s} style={{ fontSize: 14 }}>{s}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
          <AdSlot label="Anzeige · Sidebar 300×250" height={250} variant="sidebar" />
        </aside>
      </div>
    </article>
  );
}

function SidebarRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: 14.5 }}>
      <span style={{ color: "var(--ink-soft)" }}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}
