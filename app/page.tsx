import Link from "next/link";
import { getAllWords } from "@/data/woerter";
import SearchBox from "@/components/SearchBox";
import WordCard from "@/components/WordCard";
import Faq from "@/components/Faq";
import ArticleBadge from "@/components/ArticleBadge";
import GrammarRulesTable from "@/components/GrammarRulesTable";
import AdSlot from "@/components/AdSlot";

export default function HomePage() {
  const woerter = getAllWords();
  const featured = woerter.slice(0, 6);
  const satzAnzahl = woerter.reduce((sum, w) => sum + w.beispielsaetze.length, 0);
  const kategorien = new Set(woerter.map((w) => w.kategorie)).size;

  return (
    <>
      {/* HERO — dunkel, mit Gradient-Glow */}
      <section
        style={{
          position: "relative",
          background: "var(--bg-dark)",
          overflow: "hidden",
          paddingBottom: 56,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: -220,
            right: -160,
            width: 560,
            height: 560,
            borderRadius: "50%",
            background: "var(--gradient)",
            opacity: 0.25,
            filter: "blur(90px)",
          }}
        />
        <div className="wrap" style={{ position: "relative", padding: "72px 24px 0" }}>
          <p className="eyebrow" style={{ color: "var(--ink-inverse-soft)", marginBottom: 16 }}>
            Deutsche Grammatik · Substantive · Artikel
          </p>
          <h1
            style={{
              fontSize: "clamp(38px, 6vw, 68px)",
              lineHeight: 1.05,
              marginBottom: 22,
              color: "var(--ink-inverse)",
            }}
          >
            <span className="tag-der">der</span>,{" "}
            <span className="tag-die">die</span> oder{" "}
            <span className="tag-das">das</span>?
          </h1>
          <p
            style={{
              fontSize: 19,
              color: "var(--ink-inverse-soft)",
              maxWidth: 620,
              marginBottom: 36,
            }}
          >
            Jedes deutsche Substantiv trägt eines von drei grammatischen
            Geschlechtern. Gib ein Wort ein und finde sofort den richtigen
            Artikel, die vollständige Deklination, Aussprache und passende
            Beispielsätze.
          </p>
          <SearchBox woerter={woerter} />

          <div
            style={{
              display: "flex",
              gap: 40,
              marginTop: 48,
              paddingTop: 32,
              borderTop: "1px solid var(--line-dark)",
              flexWrap: "wrap",
            }}
          >
            <Stat zahl={woerter.length} label="Substantive im Index" />
            <Stat zahl={satzAnzahl} label="Beispielsätze im Kontext" />
            <Stat zahl={kategorien} label="Wortkategorien" />
            <Stat zahl={3} label="Fälle: Nom · Akk · Dat + Gen" />
          </div>
        </div>
      </section>

      <div className="wrap" style={{ paddingTop: 32 }}>
        <AdSlot label="Anzeige · 728×90" height={90} variant="banner" />
      </div>

      {/* GENUS ÜBERSICHT */}
      <section className="wrap section">
        <p className="eyebrow" style={{ marginBottom: 10 }}>Grundlagen</p>
        <h2 style={{ fontSize: 30, marginBottom: 28, maxWidth: 560 }}>
          Die drei grammatischen Geschlechter auf einen Blick
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 16,
          }}
        >
          <GenusCard
            artikel="der"
            genus="maskulin"
            hinweis="z. B. -er, -ling, -ig, -ismus"
          />
          <GenusCard
            artikel="die"
            genus="feminin"
            hinweis="z. B. -e, -ung, -heit, -schaft"
          />
          <GenusCard
            artikel="das"
            genus="neutrum"
            hinweis="z. B. -chen, -lein, -um, -ment"
          />
        </div>
      </section>

      {/* WIE FUNKTIONIERT ES */}
      <section id="regeln" className="wrap section">
        <p className="eyebrow" style={{ marginBottom: 10 }}>So funktioniert Genus</p>
        <h2 style={{ fontSize: 30, marginBottom: 20, maxWidth: 640 }}>
          Wie erkennt man den Artikel eines Substantivs?
        </h2>
        <p style={{ color: "var(--ink-soft)", maxWidth: 680, marginBottom: 12 }}>
          Der bestimmte Artikel zeigt das grammatische Geschlecht (Genus)
          eines Substantivs an. Anders als im Türkischen oder Englischen muss
          man dieses Geschlecht bei fast jedem Wort einzeln lernen, da es
          selten mit der Bedeutung zusammenhängt. Es gibt jedoch einige
          Endungen, die verlässliche Hinweise geben:
        </p>
        <div style={{ marginTop: 24, marginBottom: 20 }}>
          <GrammarRulesTable />
        </div>
        <p style={{ color: "var(--ink-soft)", maxWidth: 680 }}>
          Zusätzlich verändert sich der Artikel je nach Fall (Kasus) im Satz –
          zum Beispiel wird aus <em>der Tisch</em> im Akkusativ{" "}
          <em>den Tisch</em>. Auf jeder Wortseite findest du deshalb die
          vollständige Deklination in Singular und Plural.
        </p>
      </section>

      {/* WARUM ARTIKEL-FINDER */}
      <section className="wrap section">
        <p className="eyebrow" style={{ marginBottom: 10 }}>Vorteile</p>
        <h2 style={{ fontSize: 30, marginBottom: 28, maxWidth: 560 }}>
          Alles, was du für ein Wort brauchst — an einem Ort
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: 16,
          }}
        >
          <FeatureCard
            titel="Vollständige Deklination"
            text="Nominativ, Akkusativ, Dativ und Genitiv — Singular und Plural, immer auf einen Blick."
          />
          <FeatureCard
            titel="8 Beispielsätze"
            text="Jedes Wort im echten Satzkontext, nicht nur isoliert als Vokabel."
          />
          <FeatureCard
            titel="Typische Fehler"
            text="Wir zeigen dir die häufigsten Stolperfallen bei Aussprache, Plural und Deklination."
          />
          <FeatureCard
            titel="Verwandte Wörter"
            text="Direkte Verlinkung zu thematisch passenden Substantiven zum Weiterlernen."
          />
        </div>
      </section>

      {/* AUSGEWÄHLTE WÖRTER */}
      <section className="wrap section">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 24,
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <div>
            <p className="eyebrow" style={{ marginBottom: 10 }}>Wörterbuch</p>
            <h2 style={{ fontSize: 30 }}>Ausgewählte Wörter</h2>
          </div>
          <Link href="/artikel" className="btn btn-primary">
            Alle Wörter ansehen →
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(230px, 1fr))",
            gap: 16,
          }}
        >
          {featured.map((w) => (
            <WordCard key={w.slug} wort={w} />
          ))}
        </div>
      </section>

      <div className="wrap" style={{ paddingBottom: 8 }}>
        <AdSlot label="Anzeige · Rechteck 336×280" height={140} variant="rectangle" />
      </div>

      {/* FAQ */}
      <section id="faq" className="wrap section" style={{ paddingBottom: 88 }}>
        <p className="eyebrow" style={{ marginBottom: 10 }}>FAQ</p>
        <h2 style={{ fontSize: 30, marginBottom: 24 }}>
          Häufig gestellte Fragen
        </h2>
        <Faq />
      </section>
    </>
  );
}

function Stat({ zahl, label }: { zahl: number; label: string }) {
  return (
    <div>
      <p
        style={{
          fontFamily: "var(--display)",
          fontSize: 32,
          fontWeight: 700,
          color: "var(--ink-inverse)",
        }}
      >
        {zahl}
      </p>
      <p
        style={{
          fontFamily: "var(--mono)",
          fontSize: 12.5,
          color: "var(--ink-inverse-soft)",
          maxWidth: 160,
        }}
      >
        {label}
      </p>
    </div>
  );
}

function GenusCard({
  artikel,
  genus,
  hinweis,
}: {
  artikel: "der" | "die" | "das";
  genus: string;
  hinweis: string;
}) {
  return (
    <div
      className={`card card-hover bg-${artikel}`}
      style={{
        padding: "22px 20px",
        borderLeft: `4px solid var(--${artikel})`,
      }}
    >
      <ArticleBadge artikel={artikel} />
      <p
        style={{
          margin: "14px 0 4px",
          fontWeight: 600,
          fontFamily: "var(--display)",
          fontSize: 19,
        }}
      >
        {genus}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: 13.5,
          fontFamily: "var(--mono)",
          color: "var(--ink-soft)",
        }}
      >
        {hinweis}
      </p>
    </div>
  );
}

function FeatureCard({ titel, text }: { titel: string; text: string }) {
  return (
    <div className="card card-hover" style={{ padding: "22px 20px" }}>
      <p style={{ fontFamily: "var(--display)", fontSize: 18, fontWeight: 600, marginBottom: 8 }}>
        {titel}
      </p>
      <p style={{ fontSize: 14.5, color: "var(--ink-soft)", lineHeight: 1.7 }}>{text}</p>
    </div>
  );
}
