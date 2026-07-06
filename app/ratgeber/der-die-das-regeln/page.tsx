import Link from "next/link";
import { Metadata } from "next";
import { FAQ } from "@/components/FAQ";
import { ArtikelPill } from "@/components/ArtikelPill";

export const metadata: Metadata = {
  title: "der/die/das-Regeln – Genus im Deutschen erkennen",
  description:
    "Die wichtigsten Regeln, um den Artikel (der, die, das) deutscher Substantive zu erkennen: Endungsregeln, Bedeutungsgruppen und Ausnahmen, mit Beispielen und Tabellen.",
  alternates: { canonical: "/ratgeber/der-die-das-regeln" },
};

const endungenMaskulin = [
  { endung: "-er", beispiel: "der Lehrer", hinweis: "häufig bei Personen/Berufen" },
  { endung: "-ling", beispiel: "der Frühling", hinweis: "fast immer maskulin" },
  { endung: "-ismus", beispiel: "der Realismus", hinweis: "praktisch immer maskulin" },
  { endung: "-or", beispiel: "der Motor", hinweis: "meist maskulin" },
];

const endungenFeminin = [
  { endung: "-ung", beispiel: "die Zeitung", hinweis: "so gut wie immer feminin" },
  { endung: "-heit", beispiel: "die Freiheit", hinweis: "immer feminin" },
  { endung: "-keit", beispiel: "die Möglichkeit", hinweis: "immer feminin" },
  { endung: "-schaft", beispiel: "die Freundschaft", hinweis: "immer feminin" },
  { endung: "-ion", beispiel: "die Nation", hinweis: "praktisch immer feminin" },
  { endung: "-e", beispiel: "die Blume", hinweis: "sehr häufig feminin (mit Ausnahmen)" },
];

const endungenNeutrum = [
  { endung: "-chen", beispiel: "das Mädchen", hinweis: "immer neutrum (Verkleinerung)" },
  { endung: "-lein", beispiel: "das Fräulein", hinweis: "immer neutrum (Verkleinerung)" },
  { endung: "-um", beispiel: "das Museum", hinweis: "meist neutrum" },
  { endung: "-ment", beispiel: "das Dokument", hinweis: "meist neutrum" },
];

const faqItems = [
  {
    frage: "Gibt es eine Regel ohne Ausnahmen?",
    antwort:
      "Nur wenige: Verkleinerungsformen auf -chen und -lein sind ausnahmslos neutrum, unabhängig vom ursprünglichen Wort (z. B. \"die Frau\" → \"das Fräulein\"). Die meisten anderen Endungsregeln haben vereinzelte Ausnahmen.",
  },
  {
    frage: "Warum haben manche Wörter zwei mögliche Artikel?",
    antwort:
      "Einige deutsche Wörter haben je nach Bedeutung unterschiedliche Artikel, etwa \"der Moment\" (Zeitpunkt) und \"das Moment\" (Aspekt, Faktor). Das ist kein Fehler, sondern echte Bedeutungsunterscheidung durch das Genus.",
  },
  {
    frage: "Hilft die Übersetzung aus einer anderen Sprache beim Artikel?",
    antwort:
      "Nur selten, da grammatisches Geschlecht sprachspezifisch ist. \"Die Sonne\" ist im Deutschen feminin, im Spanischen (el sol) maskulin. Man sollte den Artikel deshalb pro Sprache einzeln lernen, nicht übersetzen.",
  },
];

export default function RatgeberPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <nav className="text-xs mb-8 font-mono" style={{ color: "var(--ink-faint)" }}>
        <Link href="/" className="hover:underline">Start</Link> {" / "}
        <span style={{ color: "var(--ink)" }}>der/die/das-Regeln</span>
      </nav>

      <h1 className="font-display text-3xl md:text-5xl mb-6">
        der, die, das: Regeln, um das Genus zu erkennen
      </h1>
      <p className="text-base md:text-lg mb-10" style={{ color: "var(--ink-soft)" }}>
        Das grammatische Geschlecht deutscher Substantive folgt selten der Bedeutung, aber oft der
        Wortendung. Diese Übersicht zeigt die zuverlässigsten Muster – mit dem Hinweis, dass
        Nachschlagen im Zweifel immer der sicherste Weg bleibt.
      </p>

      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <ArtikelPill artikel="der" />
          <h2 className="font-display text-xl md:text-2xl">Maskuline Endungen</h2>
        </div>
        <RegelTabelle rows={endungenMaskulin} />
      </section>

      <section className="mb-10">
        <div className="flex items-center gap-3 mb-4">
          <ArtikelPill artikel="die" />
          <h2 className="font-display text-xl md:text-2xl">Feminine Endungen</h2>
        </div>
        <RegelTabelle rows={endungenFeminin} />
      </section>

      <section className="mb-14">
        <div className="flex items-center gap-3 mb-4">
          <ArtikelPill artikel="das" />
          <h2 className="font-display text-xl md:text-2xl">Neutrale Endungen</h2>
        </div>
        <RegelTabelle rows={endungenNeutrum} />
      </section>

      <section className="mb-14 space-y-4 text-base leading-relaxed" style={{ color: "var(--ink-soft)" }}>
        <h2 className="font-display text-xl md:text-2xl mb-2" style={{ color: "var(--ink)" }}>
          Was tun, wenn keine Regel passt?
        </h2>
        <p>
          Für die meisten Substantive – vor allem kurze, alltägliche Wörter wie „Tisch“, „Haus“ oder
          „Katze“ – gibt es keine zuverlässige Endungsregel. In diesen Fällen hilft nur Nachschlagen
          oder das Wort von Anfang an zusammen mit seinem Artikel zu lernen (also nicht „Tisch“,
          sondern „der Tisch“).
        </p>
        <p>
          Genau dafür ist{" "}
          <Link href="/" className="underline" style={{ color: "var(--gold)" }}>
            Artikelfinder
          </Link>{" "}
          gedacht: Jedes Wort in unserer Datenbank zeigt dir sofort den richtigen Artikel, die
          Deklination und Beispielsätze.
        </p>
      </section>

      <FAQ items={faqItems} />
    </div>
  );
}

function RegelTabelle({ rows }: { rows: { endung: string; beispiel: string; hinweis: string }[] }) {
  return (
    <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--border)" }}>
      <table className="w-full text-sm md:text-base">
        <thead>
          <tr style={{ background: "var(--bg)" }}>
            <th className="text-left font-medium px-4 py-3 font-mono text-xs uppercase tracking-wider" style={{ color: "var(--ink-faint)" }}>
              Endung
            </th>
            <th className="text-left font-medium px-4 py-3">Beispiel</th>
            <th className="text-left font-medium px-4 py-3">Hinweis</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.endung} className={i !== rows.length - 1 ? "border-b" : ""} style={{ borderColor: "var(--border-soft)" }}>
              <td className="px-4 py-3 font-mono">{r.endung}</td>
              <td className="px-4 py-3">{r.beispiel}</td>
              <td className="px-4 py-3" style={{ color: "var(--ink-soft)" }}>{r.hinweis}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
