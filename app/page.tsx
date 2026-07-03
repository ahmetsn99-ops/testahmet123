import Link from "next/link";
import { getAllWords } from "@/data/woerter";
import SearchBox from "@/components/SearchBox";
import WordCard from "@/components/WordCard";
import Faq from "@/components/Faq";
import ArticleBadge from "@/components/ArticleBadge";

export default function HomePage() {
  const woerter = getAllWords();
  const featured = woerter.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="wrap" style={{ padding: "64px 0 40px" }}>
        <p
          style={{
            fontFamily: "var(--mono)",
            fontSize: 13,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            color: "var(--ink-soft)",
            margin: "0 0 12px",
          }}
        >
          Deutsche Grammatik · Substantive · Artikel
        </p>
        <h1
          style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            lineHeight: 1.05,
            marginBottom: 20,
          }}
        >
          <span className="tag-der">der</span>,{" "}
          <span className="tag-die">die</span> oder{" "}
          <span className="tag-das">das</span>?
        </h1>
        <p
          style={{
            fontSize: 19,
            color: "var(--ink-soft)",
            maxWidth: 640,
            marginBottom: 32,
          }}
        >
          Jedes deutsche Substantiv trägt eines von drei grammatischen
          Geschlechtern. Gib ein Wort ein und finde sofort den richtigen
          Artikel, die Deklination und passende Beispielsätze.
        </p>
        <SearchBox woerter={woerter} />

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            marginTop: 36,
          }}
        >
          <GenusCard
            artikel="der"
            genus="maskulin"
            hinweis="z. B. -er, -ling, -ig"
          />
          <GenusCard
            artikel="die"
            genus="feminin"
            hinweis="z. B. -e, -ung, -heit"
          />
          <GenusCard
            artikel="das"
            genus="neutrum"
            hinweis="z. B. -chen, -lein, -um"
          />
        </div>
      </section>

      {/* WIE FUNKTIONIERT ES */}
      <section
        className="wrap"
        style={{
          padding: "40px 0",
          borderTop: "1px solid var(--line)",
        }}
      >
        <h2 style={{ fontSize: 28, marginBottom: 16 }}>
          Wie funktionieren Artikel im Deutschen?
        </h2>
        <p style={{ color: "var(--ink-soft)", maxWidth: 680, marginBottom: 12 }}>
          Der bestimmte Artikel zeigt das grammatische Geschlecht (Genus)
          eines Substantivs an. Anders als im Türkischen oder Englischen muss
          man dieses Geschlecht bei fast jedem Wort einzeln lernen, da es
          selten mit der Bedeutung zusammenhängt.
        </p>
        <p style={{ color: "var(--ink-soft)", maxWidth: 680 }}>
          Zusätzlich verändert sich der Artikel je nach Fall (Kasus) im Satz –
          zum Beispiel wird aus <em>der Tisch</em> im Akkusativ{" "}
          <em>den Tisch</em>. Auf jeder Wortseite findest du deshalb die
          vollständige Deklination in Singular und Plural.
        </p>
      </section>

      {/* AUSGEWÄHLTE WÖRTER */}
      <section
        className="wrap"
        style={{ padding: "40px 0", borderTop: "1px solid var(--line)" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 20,
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <h2 style={{ fontSize: 28 }}>Ausgewählte Wörter</h2>
          <Link
            href="/artikel"
            style={{
              fontFamily: "var(--mono)",
              fontSize: 13,
              textTransform: "uppercase",
              color: "var(--der)",
              textDecoration: "none",
            }}
          >
            Alle Wörter ansehen →
          </Link>
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 14,
          }}
        >
          {featured.map((w) => (
            <WordCard key={w.slug} wort={w} />
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        className="wrap"
        style={{ padding: "48px 0 80px", borderTop: "1px solid var(--line)" }}
      >
        <h2 style={{ fontSize: 28, marginBottom: 20 }}>
          Häufig gestellte Fragen
        </h2>
        <Faq />
      </section>
    </>
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
      className={`bg-${artikel}`}
      style={{
        borderRadius: "var(--radius)",
        padding: "18px 16px",
        borderLeft: `5px solid var(--${artikel})`,
      }}
    >
      <ArticleBadge artikel={artikel} />
      <p
        style={{
          margin: "10px 0 2px",
          fontWeight: 600,
          fontFamily: "var(--display)",
        }}
      >
        {genus}
      </p>
      <p
        style={{
          margin: 0,
          fontSize: 13,
          fontFamily: "var(--mono)",
          color: "var(--ink-soft)",
        }}
      >
        {hinweis}
      </p>
    </div>
  );
}
