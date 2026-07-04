import Link from "next/link";
import { getAllWords, getWordsByArtikel, Artikel } from "@/data/woerter";
import SearchBox from "@/components/SearchBox";
import Faq from "@/components/Faq";
import GrammarRulesTable from "@/components/GrammarRulesTable";
import AdSlot from "@/components/AdSlot";

const KATEGORIE_INFO: Record<Artikel, { titel: string; hinweis: string }> = {
  der: { titel: "Maskulin", hinweis: "Wörter auf -er, -ling, -ismus, -or" },
  die: { titel: "Feminin", hinweis: "Wörter auf -e, -ung, -heit, -schaft" },
  das: { titel: "Neutrum", hinweis: "Wörter auf -chen, -lein, -um, -ment" },
};

export default function HomePage() {
  const woerter = getAllWords();
  const beliebte = woerter.slice(0, 8);

  return (
    <>
      {/* HERO */}
      <section className="wrap" style={{ padding: "56px 20px 40px" }}>
        <p className="eyebrow" style={{ marginBottom: 14 }}>
          Deutsche Grammatik · Substantive
        </p>
        <h1 style={{ fontSize: "clamp(32px, 5.5vw, 52px)", marginBottom: 18, maxWidth: 680 }}>
          Der, die oder das? Finde jeden deutschen Artikel
        </h1>
        <p style={{ fontSize: 18, color: "var(--ink-soft)", maxWidth: 600, marginBottom: 28 }}>
          Suche ein deutsches Substantiv und erhalte sofort den richtigen
          Artikel, die vollständige Deklination, Aussprache und
          Beispielsätze. Kostenlos, ohne Anmeldung.
        </p>
        <SearchBox woerter={woerter} />

        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 24 }}>
          {beliebte.map((w) => (
            <Link key={w.slug} href={`/${w.artikel}/${w.slug}`} className="chip">
              <span className={`tag-${w.artikel}`} style={{ fontFamily: "var(--mono)", fontWeight: 700 }}>
                {w.artikel}
              </span>{" "}
              {w.wort}
            </Link>
          ))}
        </div>
      </section>

      <div className="wrap">
        <AdSlot label="Anzeige · 728×90" height={90} variant="banner" />
      </div>

      {/* KATEGORIEN */}
      <section className="wrap section">
        <h2 style={{ fontSize: 26, marginBottom: 20 }}>
          Die drei grammatischen Geschlechter
        </h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: 14,
          }}
        >
          {(["der", "die", "das"] as Artikel[]).map((artikel) => {
            const anzahl = getWordsByArtikel(artikel).length;
            const beispiele = getWordsByArtikel(artikel).slice(0, 3);
            const info = KATEGORIE_INFO[artikel];
            return (
              <Link
                key={artikel}
                href={`/${artikel}`}
                className="card card-hover"
                style={{
                  display: "block",
                  padding: "22px 20px",
                  textDecoration: "none",
                  color: "var(--ink)",
                  borderTop: `3px solid var(--${artikel})`,
                }}
              >
                <span className={`badge bg-${artikel} tag-${artikel}`} style={{ padding: "5px 14px", fontSize: 14 }}>
                  {artikel}
                </span>
                <p style={{ marginTop: 12, fontSize: 19, fontWeight: 700 }}>{info.titel}</p>
                <p style={{ fontSize: 13.5, color: "var(--ink-soft)", marginTop: 4 }}>
                  {anzahl} Wörter · {info.hinweis}
                </p>
                <p style={{ fontSize: 14, marginTop: 12, color: "var(--ink-soft)" }}>
                  {beispiele.map((w) => w.wort).join(" · ")}
                </p>
                <p style={{ fontSize: 13.5, marginTop: 14, fontWeight: 600 }}>
                  Alle {artikel}-Wörter →
                </p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* REGELN */}
      <section id="regeln" className="wrap section">
        <h2 style={{ fontSize: 26, marginBottom: 14 }}>
          Wichtige Endungen und ihre Artikel
        </h2>
        <p style={{ color: "var(--ink-soft)", maxWidth: 640, marginBottom: 22 }}>
          Es gibt keine hundertprozentige Regel, aber diese Endungen treffen
          in den meisten Fällen zu:
        </p>
        <GrammarRulesTable />
      </section>

      {/* SO FUNKTIONIERT ES */}
      <section className="wrap section">
        <h2 style={{ fontSize: 26, marginBottom: 24 }}>
          So findest du jeden Artikel in 3 Schritten
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
          <Schritt nummer={1} titel="Wort eingeben" text="Tippe ein deutsches Substantiv in die Suchleiste ein." />
          <Schritt nummer={2} titel="Artikel & Deklination sehen" text="Erfahre sofort den richtigen Artikel und alle vier Fälle." />
          <Schritt nummer={3} titel="Mit Beispielen lernen" text="Lerne das Wort im Kontext mit 8 Beispielsätzen und Merktipps." />
        </div>
      </section>

      <div className="wrap">
        <AdSlot label="Anzeige · Rechteck 336×280" height={140} variant="rectangle" />
      </div>

      {/* FAQ */}
      <section id="faq" className="wrap section" style={{ paddingBottom: 72 }}>
        <h2 style={{ fontSize: 26, marginBottom: 22 }}>Häufig gestellte Fragen</h2>
        <Faq />
      </section>
    </>
  );
}

function Schritt({ nummer, titel, text }: { nummer: number; titel: string; text: string }) {
  return (
    <div>
      <span
        style={{
          display: "inline-flex",
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "var(--brand-dim)",
          color: "var(--brand)",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "var(--mono)",
          fontWeight: 700,
          fontSize: 14,
          marginBottom: 12,
        }}
      >
        {nummer}
      </span>
      <p style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{titel}</p>
      <p style={{ fontSize: 14.5, color: "var(--ink-soft)" }}>{text}</p>
    </div>
  );
}
