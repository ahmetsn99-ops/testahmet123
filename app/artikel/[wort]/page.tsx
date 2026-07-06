import { notFound } from "next/navigation";
import Link from "next/link";
import { Metadata } from "next";
import {
  getAllWordSlugs,
  getWord,
  getRelatedWords,
  KATEGORIE_LABELS,
  SPRACHEN,
} from "@/lib/words";
import { ArtikelTrio } from "@/components/ArtikelPill";
import { DeklinationTabelle } from "@/components/DeklinationTabelle";
import { ArtikelQuiz } from "@/components/ArtikelQuiz";
import { FAQ } from "@/components/FAQ";

export function generateStaticParams() {
  return getAllWordSlugs().map((slug) => ({ wort: slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ wort: string }> }): Promise<Metadata> {
  const { wort } = await params;
  const word = getWord(wort);
  if (!word) return {};
  const title = `${word.wort} – der, die oder das? | ${word.wort} Artikel`;
  const description = `Der richtige Artikel für "${word.wort}" ist ${word.artikel}. Deklination, ${word.saetze.length} Beispielsätze, Übersetzungen und Quiz zu "${word.artikel} ${word.wort}".`;
  return {
    title,
    description,
    alternates: { canonical: `/artikel/${word.slug}` },
    openGraph: { title, description },
  };
}

export default async function WordPage({ params }: { params: Promise<{ wort: string }> }) {
  const { wort } = await params;
  const word = getWord(wort);
  if (!word) notFound();

  const related = getRelatedWords(word);

  const jsonLdDefinedTerm = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: word.wort,
    description: `${word.artikel} ${word.wort} – Plural: ${word.plural !== "-" ? word.plural : "kein Plural"}.`,
    inDefinedTermSet: "https://www.artikelfinder.com",
  };

  const faqItems = [
    {
      frage: `Heißt es "${word.artikel} ${word.wort}"?`,
      antwort: `Ja, der korrekte Artikel für "${word.wort}" ist "${word.artikel}". Im Plural heißt es unabhängig vom Artikel immer "die ${word.plural !== "-" ? word.plural : word.wort}".`,
    },
    {
      frage: `Wie lautet die Mehrzahl von "${word.wort}"?`,
      antwort:
        word.plural !== "-"
          ? `Die Mehrzahl (Plural) von "${word.wort}" ist "${word.plural}", mit dem Artikel "die ${word.plural}".`
          : `"${word.wort}" wird in der Regel nicht im Plural verwendet.`,
    },
    {
      frage: `Wie dekliniert man "${word.artikel} ${word.wort}" im Satz?`,
      antwort: `Die vollständige Deklination von "${word.artikel} ${word.wort}" in allen vier Fällen (Nominativ, Akkusativ, Dativ, Genitiv) findest du in der Tabelle weiter oben auf dieser Seite.`,
    },
  ];

  const sprachenMitUebersetzung = SPRACHEN.filter((s) => word.uebersetzungen[s.code]);

  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdDefinedTerm) }} />

      <nav className="text-xs mb-8 font-mono" style={{ color: "var(--ink-faint)" }}>
        <Link href="/" className="hover:underline">Start</Link>
        {" / "}
        <Link href={`/kategorie/${word.artikel}`} className="hover:underline">{word.artikel}-Wörter</Link>
        {" / "}
        <span style={{ color: "var(--ink)" }}>{word.wort}</span>
      </nav>

      {/* HERO DES WORTES */}
      <div className="mb-10">
        <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: "var(--ink-faint)" }}>
          {KATEGORIE_LABELS[word.kategorie] ?? "Substantiv"}
        </p>
        <h1 className="font-display text-4xl md:text-5xl mb-5">
          <span style={{ color: "var(--gold)" }}>{word.artikel}</span> {word.wort}
        </h1>
        <ArtikelTrio aktiv={word.artikel} />
        <p className="mt-6 text-base md:text-lg" style={{ color: "var(--ink-soft)" }}>
          Der Artikel von <strong>{word.wort}</strong> ist <strong>{word.artikel}</strong>. Plural:{" "}
          {word.plural !== "-" ? `die ${word.plural}` : "in der Regel kein Plural"}.
        </p>
      </div>

      {/* DEKLINATIONSTABELLE */}
      <section className="mb-12">
        <h2 className="font-display text-xl md:text-2xl mb-4">Deklination von {word.wort}</h2>
        <DeklinationTabelle
          wort={word.wort}
          artikel={word.artikel}
          plural={word.plural}
          genitivSingular={word.genitiv_singular}
        />
      </section>

      {/* BEISPIELSAETZE */}
      <section className="mb-12">
        <h2 className="font-display text-xl md:text-2xl mb-4">10 Beispielsätze mit {word.wort}</h2>
        <ol className="space-y-2.5">
          {word.saetze.map((satz, i) => (
            <li key={i} className="flex gap-3 text-base" style={{ color: "var(--ink)" }}>
              <span className="font-mono text-xs mt-1 shrink-0" style={{ color: "var(--ink-faint)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{satz}</span>
            </li>
          ))}
        </ol>
      </section>

      {/* UEBERSETZUNGEN */}
      {sprachenMitUebersetzung.length > 0 && (
        <section className="mb-12">
          <h2 className="font-display text-xl md:text-2xl mb-4">
            {word.wort} in {sprachenMitUebersetzung.length} Sprachen
          </h2>
          <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--border)" }}>
            <table className="w-full text-sm md:text-base">
              <tbody>
                {sprachenMitUebersetzung.map((s, i) => (
                  <tr
                    key={s.code}
                    className={i !== sprachenMitUebersetzung.length - 1 ? "border-b" : ""}
                    style={{ borderColor: "var(--border-soft)" }}
                  >
                    <td className="px-4 py-2.5 font-medium w-40" style={{ color: "var(--ink-soft)" }}>
                      {s.name}
                    </td>
                    <td className="px-4 py-2.5">{word.uebersetzungen[s.code]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* QUIZ */}
      <section className="mb-14">
        <ArtikelQuiz quiz={word.quiz} wort={word.wort} />
      </section>

      <div className="mb-14">
        <FAQ items={faqItems} title={`Fragen zu "${word.wort}"`} />
      </div>

      {/* AEHNLICHE WOERTER */}
      {related.length > 0 && (
        <section>
          <h2 className="font-display text-xl md:text-2xl mb-4">Ähnliche Wörter</h2>
          <div className="flex flex-wrap gap-2">
            {related.map((r) => (
              <Link
                key={r.slug}
                href={`/artikel/${r.slug}`}
                className="text-sm px-3.5 py-1.5 rounded-full border hover:shadow-sm transition-shadow"
                style={{ borderColor: "var(--border)", background: "var(--bg-raised)" }}
              >
                {r.artikel} {r.wort}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
