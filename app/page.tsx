import Link from "next/link";
import { getAllWords, getWordsByArtikel, Artikel } from "@/data/woerter";
import SearchBox from "@/components/SearchBox";
import Faq from "@/components/Faq";
import GrammarRulesTable from "@/components/GrammarRulesTable";
import AdSlot from "@/components/AdSlot";

const KATEGORIE_INFO: Record<Artikel, { titel: string; hinweis: string }> = {
  der: { titel: "Maskulin", hinweis: "-er, -ling, -ismus, -or" },
  die: { titel: "Feminin", hinweis: "-e, -ung, -heit, -schaft" },
  das: { titel: "Neutrum", hinweis: "-chen, -lein, -um, -ment" },
};

export default function HomePage() {
  const woerter = getAllWords();
  const beliebte = woerter.slice(0, 6);

  return (
    <>
      {/* HERO */}
      <section className="wrap" style={{ padding: "88px 20px 48px", textAlign: "center" }}>
        <h1
          style={{
            fontSize: "clamp(34px, 6vw, 56px)",
            marginBottom: 18,
            maxWidth: 720,
            marginLeft: "auto",
            marginRight: "auto",
          }}
        >
          Der, die oder das?
        </h1>
        <p
          style={{
            fontSize: 18,
            color: "var(--ink-soft)",
            maxWidth: 520,
            margin: "0 auto 32px",
          }}
        >
          Gib ein deutsches Substantiv ein und finde sofort den richtigen
          Artikel, die Deklination und Beispielsätze.
        </p>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <SearchBox woerter={woerter} />
        </div>

        <div style={{ display: "flex", justifyContent: "center", flexWrap: "wrap", gap: 8, marginTop: 22 }}>
          {beliebte.map((w) => (
            <Link key={w.slug} href={`/${w.artikel}/${w.slug}`} className="chip">
              {w.wort}
            </Link>
          ))}
        </div>
      </section>

      {/* KATEGORIEN */}
      <section className="wrap section" style={{ paddingTop: 48 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 14,
          }}
        >
          {(["der", "die", "das"] as Artikel[]).map((artikel) => {
            const anzahl = getWordsByArtikel(artikel).length;
            const info = KATEGORIE_INFO[artikel];
            return (
              <Link
                key={artikel}
                href={`/${artikel}`}
                className="card card-hover"
                style={{
                  display: "block",
                  padding: "26px 22px",
                  textDecoration: "none",
                  color: "var(--ink)",
                }}
              >
                <span className={`tag-${artikel}`} style={{ fontSize: 22, fontWeight: 700 }}>
                  {artikel}
                </span>
                <p style={{ marginTop: 8, fontSize: 15, color: "var(--ink-soft)" }}>
                  {info.titel} · {anzahl} Wörter
                </p>
                <p style={{ fontSize: 13, marginTop: 6, color: "var(--ink-soft)", fontFamily: "var(--mono)" }}>
                  {info.hinweis}
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      <div className="wrap">
        <AdSlot label="Anzeige · 728×90" height={90} variant="banner" />
      </div>

      {/* REGELN */}
      <section id="regeln" className="wrap section">
        <h2 style={{ fontSize: 24, marginBottom: 14 }}>
          Wichtige Endungen und ihre Artikel
        </h2>
        <p style={{ color: "var(--ink-soft)", maxWidth: 600, marginBottom: 22 }}>
          Keine hundertprozentige Regel, aber diese Endungen treffen meistens zu:
        </p>
        <GrammarRulesTable />
      </section>

      {/* FAQ */}
      <section id="faq" className="wrap section" style={{ paddingBottom: 72 }}>
        <h2 style={{ fontSize: 24, marginBottom: 22 }}>Häufig gestellte Fragen</h2>
        <Faq />
      </section>
    </>
  );
}
