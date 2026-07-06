import Link from "next/link";
import { Metadata } from "next";
import { SearchBox } from "@/components/SearchBox";
import { ArtikelTrio, ArtikelPill } from "@/components/ArtikelPill";
import { FAQ } from "@/components/FAQ";
import { getAllWordsIndex, getWordsByArtikel } from "@/lib/words";

export const metadata: Metadata = {
  title: "Artikelfinder – der, die oder das? Der Artikel-Finder für Deutsch",
  description:
    "der, die oder das? Artikelfinder ist dein Artikel-Finder für deutsche Substantive: Artikel, Deklination, Beispielsätze, Quiz und Übersetzungen in 10 Sprachen – kostenlos und sofort.",
};

export default function HomePage() {
  const alle = getAllWordsIndex();
  const derWoerter = getWordsByArtikel("der").slice(0, 6);
  const dieWoerter = getWordsByArtikel("die").slice(0, 6);
  const dasWoerter = getWordsByArtikel("das").slice(0, 6);

  const faqItems = [
    {
      frage: "Was ist der Unterschied zwischen der, die und das?",
      antwort:
        "Der, die und das sind die bestimmten Artikel im Deutschen und zeigen das grammatische Geschlecht (Genus) eines Substantivs an: der für maskulin, die für feminin und das für neutrum. Anders als im Englischen oder Türkischen muss man das Genus bei jedem deutschen Substantiv einzeln lernen, da es selten aus der Bedeutung des Wortes folgt.",
    },
    {
      frage: "Wie finde ich den richtigen Artikel für ein deutsches Wort?",
      antwort:
        "Mit Artikelfinder gibst du das Wort einfach in die Suche ein und erhältst sofort den passenden Artikel, dazu die Deklination in allen vier Fällen, Beispielsätze und Übersetzungen. Es gibt zusätzlich einige Endungs-Regeln, etwa dass Wörter auf -ung, -heit oder -keit fast immer die-Wörter sind.",
    },
    {
      frage: "Gibt es Regeln, mit denen man das Genus vorhersagen kann?",
      antwort:
        "Ja, teilweise: Wortendungen geben oft Hinweise. Wörter auf -e sind häufig feminin (die Blume), Wörter auf -chen oder -lein sind immer neutrum (das Mädchen), und viele Wörter auf -er, die Personen oder Berufe bezeichnen, sind maskulin (der Lehrer). Diese Regeln haben jedoch Ausnahmen, deshalb bleibt Nachschlagen der sicherste Weg.",
    },
    {
      frage: "Warum ist der Artikel beim Deutschlernen so wichtig?",
      antwort:
        "Der Artikel bestimmt die Deklination des gesamten Satzes: Er verändert sich je nach Fall (Nominativ, Akkusativ, Dativ, Genitiv) und beeinflusst Adjektivendungen. Einen falschen Artikel zu verwenden, fällt Muttersprachlern sofort auf, selbst wenn der Rest des Satzes korrekt ist.",
    },
  ];

  return (
    <div>
      {/* HERO */}
      <section className="border-b" style={{ borderColor: "var(--border)" }}>
        <div className="max-w-5xl mx-auto px-4 md:px-6 pt-14 pb-16 md:pt-20 md:pb-24 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.2em] mb-5" style={{ color: "var(--ink-faint)" }}>
            Der Artikel-Finder für Deutsch
          </p>
          <h1 className="font-display text-4xl md:text-6xl leading-[1.1] mb-6">
            der, die oder das?
            <br />
            <span style={{ color: "var(--gold)" }}>Artikelfinder</span> weiß es.
          </h1>
          <p className="max-w-xl mx-auto mb-8 text-base md:text-lg" style={{ color: "var(--ink-soft)" }}>
            Gib ein deutsches Substantiv ein und erhalte sofort den richtigen Artikel, die Deklination,
            Beispielsätze und Übersetzungen in 10 Sprachen.
          </p>
          <div className="max-w-xl mx-auto mb-8">
            <SearchBox />
          </div>
          <div className="flex justify-center">
            <ArtikelTrio aktiv="der" />
          </div>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 md:px-6 py-16 md:py-20 space-y-20">
        {/* KATEGORIE KARTEN */}
        <section>
          <h2 className="font-display text-2xl md:text-3xl mb-2">Nach Artikel durchsuchen</h2>
          <p className="mb-8 text-sm" style={{ color: "var(--ink-soft)" }}>
            {alle.length} Substantive, sortiert nach ihrem grammatischen Geschlecht.
          </p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { art: "der" as const, list: derWoerter, desc: "Maskuline Substantive" },
              { art: "die" as const, list: dieWoerter, desc: "Feminine Substantive" },
              { art: "das" as const, list: dasWoerter, desc: "Neutrale Substantive" },
            ].map(({ art, list, desc }) => (
              <Link
                key={art}
                href={`/kategorie/${art}`}
                className="group rounded-2xl border p-6 block transition-shadow hover:shadow-md"
                style={{ borderColor: "var(--border)", background: "var(--bg-raised)" }}
              >
                <ArtikelPill artikel={art} size="lg" />
                <p className="mt-4 mb-4 text-sm" style={{ color: "var(--ink-soft)" }}>
                  {desc}
                </p>
                <ul className="space-y-1.5 text-sm">
                  {list.map((w) => (
                    <li key={w.slug} style={{ color: "var(--ink)" }}>
                      {w.wort}
                    </li>
                  ))}
                </ul>
                <span
                  className="mt-4 inline-block text-xs font-medium underline underline-offset-4"
                  style={{ color: "var(--gold)" }}
                >
                  Alle {art}-Wörter ansehen →
                </span>
              </Link>
            ))}
          </div>
        </section>

        {/* RATGEBER-INHALT (SEO-Text) */}
        <section className="prose-content max-w-3xl">
          <h2 className="font-display text-2xl md:text-3xl mb-5">
            Der, die, das – warum ist das im Deutschen so schwer?
          </h2>
          <div className="space-y-4 text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>
            <p>
              Im Deutschen hat jedes Substantiv ein grammatisches Geschlecht, das sogenannte Genus:
              maskulin (der), feminin (die) oder neutrum (das). Anders als etwa im Englischen, wo es
              nur einen bestimmten Artikel gibt, muss man sich im Deutschen zu jedem Wort auch den
              passenden Artikel merken. Das gilt selbst für Muttersprachler in der Grundschule und
              erst recht für alle, die Deutsch als Fremdsprache lernen.
            </p>
            <p>
              Artikelfinder wurde genau dafür gebaut: Statt in dicken Wörterbüchern zu blättern, gibst
              du das Wort ein und siehst sofort den Artikel, die Mehrzahl, die Deklination in allen vier
              Fällen sowie Beispielsätze, die den Gebrauch im Satz zeigen. Zusätzlich findest du zu
              vielen Wörtern Übersetzungen in zehn Sprachen, darunter Englisch, Türkisch und Arabisch.
            </p>
            <p>
              Wer die Systematik dahinter verstehen möchte, findet in unserem{" "}
              <Link href="/ratgeber/der-die-das-regeln" className="underline" style={{ color: "var(--gold)" }}>
                Ratgeber zu den der/die/das-Regeln
              </Link>{" "}
              eine ausführliche Übersicht der wichtigsten Endungs- und Bedeutungsregeln.
            </p>
          </div>
        </section>

        <FAQ items={faqItems} />
      </div>
    </div>
  );
}
