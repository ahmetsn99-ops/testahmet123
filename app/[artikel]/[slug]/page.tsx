import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { Artikel, getAllWords, getWordBySlug, getRelatedWords, getWordsByArtikel } from "@/data/woerter";
import ArticleBadge from "@/components/ArticleBadge";
import DeclensionTable from "@/components/DeclensionTable";
import WordCard from "@/components/WordCard";
import CopyButton from "@/components/CopyButton";
import PronounceButton from "@/components/PronounceButton";
import QuizWidget from "@/components/QuizWidget";
import AdSlot from "@/components/AdSlot";
import { buildWortFaq } from "@/lib/wordFaq";
import { hebeWortHervor } from "@/lib/highlight";
import { buildAdjektivDeklination } from "@/lib/adjektiv";

const GUELTIGE_ARTIKEL: Artikel[] = ["der", "die", "das"];

export function generateStaticParams() {
  return getAllWords().map((w) => ({ artikel: w.artikel, slug: w.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { artikel: string; slug: string };
}): Metadata {
  const wort = getWordBySlug(params.slug);
  if (!wort || wort.artikel !== params.artikel) return {};
  return {
    title: `${wort.wort} Artikel: der, die oder das?`,
    description: `Heißt es der, die oder das ${wort.wort}? Der richtige Artikel, Deklination, Plural und ${wort.beispielsaetze.length} Beispielsätze — jetzt nachschlagen.`,
  };
}

export default function WortSeite({
  params,
}: {
  params: { artikel: string; slug: string };
}) {
  const wort = getWordBySlug(params.slug);
  if (!wort || !GUELTIGE_ARTIKEL.includes(params.artikel as Artikel) || wort.artikel !== params.artikel) {
    notFound();
  }

  const verwandt = getRelatedWords(wort);
  const faq = buildWortFaq(wort);
  const adjektiv = buildAdjektivDeklination(wort.deklinationSingular, wort.genus);

  const kategorieWoerter = [...getWordsByArtikel(wort.artikel)].sort((a, b) =>
    a.wort.localeCompare(b.wort, "de")
  );
  const index = kategorieWoerter.findIndex((w) => w.slug === wort.slug);
  const vorheriges = kategorieWoerter[(index - 1 + kategorieWoerter.length) % kategorieWoerter.length];
  const naechstes = kategorieWoerter[(index + 1) % kategorieWoerter.length];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: `${wort.artikel} ${wort.wort}`,
    description: wort.bedeutung,
    inDefinedTermSet: "Artikel Finder Wörterbuch",
  };

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.frage,
      acceptedAnswer: { "@type": "Answer", text: f.antwort },
    })),
  };

  return (
    <article className="wrap" style={{ padding: "36px 20px 80px" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <nav style={{ fontFamily: "var(--mono)", fontSize: 12, color: "var(--ink-soft)", marginBottom: 20 }}>
        <Link href="/" style={{ textDecoration: "none" }}>Start</Link>{" "}
        / <Link href={`/${wort.artikel}`} style={{ textDecoration: "none" }}>{wort.artikel}-Wörter</Link>{" "}
        / {wort.artikel} {wort.wort}
      </nav>

      <div className="word-detail-grid">
        <div>
          {/* KOPF */}
          <header style={{ marginBottom: 24 }}>
            <h1 style={{ fontSize: "clamp(26px, 4.5vw, 38px)", marginBottom: 12 }}>
              Heißt es der, die oder das {wort.wort}?
            </h1>
            <p style={{ fontSize: 17, color: "var(--ink-soft)", maxWidth: 620 }}>
              <strong style={{ color: "var(--ink)" }}>{wort.wort}</strong> ist ein {wort.genus}es
              Substantiv, deshalb lautet der richtige Artikel <strong className={`tag-${wort.artikel}`}>{wort.artikel}</strong>.
              Plural: die {wort.plural}. Englisch: {wort.englisch}.
            </p>
          </header>

          {/* WORTKARTE */}
          <div
            className="card"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: 16,
              padding: "20px 22px",
              marginBottom: 24,
              borderLeft: `4px solid var(--${wort.artikel})`,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <ArticleBadge artikel={wort.artikel} size="lg" />
              <div>
                <span style={{ fontSize: 26, fontWeight: 700 }}>{wort.wort}</span>
                <p style={{ fontFamily: "var(--mono)", fontSize: 13, color: "var(--ink-soft)" }}>
                  {wort.aussprache} · {wort.niveau} · {wort.englisch}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <PronounceButton text={`${wort.artikel} ${wort.wort}`} />
              <CopyButton text={`${wort.artikel} ${wort.wort}`} />
            </div>
          </div>

          {wort.merksatz && (
            <div
              className={`bg-${wort.artikel}`}
              style={{
                borderLeft: `4px solid var(--${wort.artikel})`,
                borderRadius: "var(--radius)",
                padding: "16px 20px",
                marginBottom: 28,
              }}
            >
              <p className="eyebrow" style={{ marginBottom: 6 }}>Merksatz</p>
              <p style={{ margin: 0, fontSize: 15 }}>{wort.merksatz}</p>
            </div>
          )}

          {/* DEKLINATION */}
          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 22, marginBottom: 14 }}>
              Deklination – Nominativ, Akkusativ, Dativ, Genitiv
            </h2>
            <DeclensionTable
              singular={wort.deklinationSingular}
              plural={wort.deklinationPlural}
              artikel={wort.artikel}
            />
          </section>

          {/* ADJEKTIVDEKLINATION */}
          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 22, marginBottom: 8 }}>
              Mit Adjektiv: „groß" + {wort.wort}
            </h2>
            <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 14 }}>
              So verändert sich die Endung des Adjektivs nach dem bestimmten Artikel:
            </p>
            <div className="card" style={{ padding: "14px 18px", display: "flex", flexDirection: "column", gap: 6 }}>
              <ZeileText label="Nominativ" value={adjektiv.nominativ} />
              <ZeileText label="Akkusativ" value={adjektiv.akkusativ} />
              <ZeileText label="Dativ" value={adjektiv.dativ} />
              <ZeileText label="Genitiv" value={adjektiv.genitiv} />
            </div>
          </section>

          {/* TYPISCHER FEHLER */}
          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 22, marginBottom: 14 }}>Typischer Fehler</h2>
            <div className="card" style={{ padding: "16px 20px", borderLeft: "4px solid var(--die)" }}>
              <p style={{ margin: 0, fontSize: 15, color: "var(--ink-soft)", lineHeight: 1.7 }}>
                {wort.haeufigerFehler}
              </p>
            </div>
          </section>

          {/* BEISPIELSÄTZE */}
          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 22, marginBottom: 14 }}>
              Beispielsätze mit {wort.wort} ({wort.beispielsaetze.length})
            </h2>
            <ol style={{ margin: 0, padding: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 8 }}>
              {wort.beispielsaetze.map((satz, i) => (
                <li key={i} className="card" style={{ display: "flex", gap: 14, padding: "13px 16px" }}>
                  <span style={{ fontFamily: "var(--mono)", color: "var(--der)", fontSize: 13, fontWeight: 700, minWidth: 18 }}>
                    {i + 1}
                  </span>
                  <span>{hebeWortHervor(satz, wort.wort)}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* REDEWENDUNGEN */}
          {wort.redewendungen && wort.redewendungen.length > 0 && (
            <section style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 22, marginBottom: 14 }}>
                Redewendungen mit {wort.wort}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {wort.redewendungen.map((r) => (
                  <div key={r.ausdruck} className="card" style={{ padding: "16px 18px" }}>
                    <p style={{ fontWeight: 700, marginBottom: 4 }}>{r.ausdruck}</p>
                    <p style={{ fontSize: 14.5, color: "var(--ink-soft)", marginBottom: 8 }}>{r.bedeutung}</p>
                    <p style={{ fontSize: 14.5, fontStyle: "italic" }}>„{r.beispiel}"</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* WORTFAMILIE */}
          {wort.wortfamilie && wort.wortfamilie.length > 0 && (
            <section style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 22, marginBottom: 14 }}>Wortfamilie: Komposita mit {wort.wort}</h2>
              <p style={{ fontSize: 14, color: "var(--ink-soft)", marginBottom: 14 }}>
                Zusammengesetzte Wörter richten ihren Artikel nach dem letzten Wortbestandteil.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 10 }}>
                {wort.wortfamilie.map((k) => (
                  <div key={k.wort} className="card" style={{ padding: "14px 16px" }}>
                    <span className={`tag-${k.artikel}`} style={{ fontFamily: "var(--mono)", fontWeight: 700 }}>
                      {k.artikel}
                    </span>{" "}
                    <strong>{k.wort}</strong>
                    <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 6 }}>{k.bedeutung}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          <div style={{ marginBottom: 36 }}>
            <AdSlot label="Anzeige · In-Content" height={120} variant="rectangle" />
          </div>

          {/* QUIZ */}
          <section style={{ marginBottom: 36 }}>
            <QuizWidget wort={wort.wort} artikel={wort.artikel} />
          </section>

          {/* FAQ */}
          <section style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: 22, marginBottom: 14 }}>FAQ zu {wort.wort}</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {faq.map((f) => (
                <details key={f.frage} className="card" style={{ padding: "14px 18px" }}>
                  <summary style={{ fontWeight: 600, cursor: "pointer", fontSize: 15.5 }}>{f.frage}</summary>
                  <p style={{ marginTop: 10, fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.7 }}>
                    {f.antwort}
                  </p>
                </details>
              ))}
            </div>
          </section>

          {/* VERWANDTE WÖRTER */}
          {verwandt.length > 0 && (
            <section style={{ marginBottom: 36 }}>
              <h2 style={{ fontSize: 22, marginBottom: 14 }}>Ähnliche Wörter</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 12 }}>
                {verwandt.map((w) => (
                  <WordCard key={w.slug} wort={w} />
                ))}
              </div>
            </section>
          )}

          {/* PREV/NEXT */}
          <nav style={{ display: "flex", justifyContent: "space-between", gap: 12, paddingTop: 20, borderTop: "1px solid var(--line)" }}>
            <Link href={`/${vorheriges.artikel}/${vorheriges.slug}`} style={{ textDecoration: "none", fontSize: 14.5, color: "var(--ink-soft)" }}>
              ← {vorheriges.wort}
            </Link>
            <Link href={`/${naechstes.artikel}/${naechstes.slug}`} style={{ textDecoration: "none", fontSize: 14.5, color: "var(--ink-soft)" }}>
              {naechstes.wort} →
            </Link>
          </nav>
        </div>

        {/* SIDEBAR */}
        <aside style={{ position: "sticky", top: 84, display: "flex", flexDirection: "column", gap: 16 }}>
          <div className="card" style={{ padding: 20 }}>
            <p className="eyebrow" style={{ marginBottom: 14 }}>Auf einen Blick</p>
            <Zeile label="Artikel" value={wort.artikel} />
            <Zeile label="Genus" value={wort.genus} />
            <Zeile label="Plural" value={`die ${wort.plural}`} />
            <Zeile label="Englisch" value={wort.englisch} />
            <Zeile label="Niveau" value={wort.niveau} />
            <Zeile label="Kategorie" value={wort.kategorie} />
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

function Zeile({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "7px 0", fontSize: 14.5 }}>
      <span style={{ color: "var(--ink-soft)" }}>{label}</span>
      <strong>{value}</strong>
    </div>
  );
}

function ZeileText({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", gap: 10, fontSize: 14.5 }}>
      <span style={{ color: "var(--ink-soft)", minWidth: 90, fontFamily: "var(--mono)", fontSize: 12.5, textTransform: "uppercase", paddingTop: 2 }}>
        {label}
      </span>
      <span>{value}</span>
    </div>
  );
}
