import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum von Artikelfinder gemäß § 5 TMG.",
  alternates: { canonical: "/impressum" },
};

export default function ImpressumPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-6 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
      <h1 className="font-display text-3xl md:text-5xl mb-4" style={{ color: "var(--ink)" }}>
        Impressum
      </h1>

      <p className="text-xs font-mono" style={{ color: "var(--ink-faint)" }}>
        HINWEIS: Platzhalter. In Deutschland ist ein Impressum nach § 5 TMG gesetzlich verpflichtend
        und muss echten Namen, ladungsfähige Anschrift und Kontaktdaten des Betreibers enthalten –
        bitte vor Veröffentlichung durch die echten Angaben ersetzen.
      </p>

      <section className="space-y-1">
        <h2 className="font-display text-xl mb-2" style={{ color: "var(--ink)" }}>Angaben gemäß § 5 TMG</h2>
        <p>[Vor- und Nachname bzw. Firmenname]</p>
        <p>[Straße und Hausnummer]</p>
        <p>[PLZ und Ort]</p>
        <p>[Land]</p>
      </section>

      <section className="space-y-1">
        <h2 className="font-display text-xl mb-2" style={{ color: "var(--ink)" }}>Kontakt</h2>
        <p>E-Mail: kontakt@artikelfinder.com</p>
      </section>

      <section className="space-y-1">
        <h2 className="font-display text-xl mb-2" style={{ color: "var(--ink)" }}>Haftungshinweis</h2>
        <p>
          Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die Richtigkeit,
          Vollständigkeit und Aktualität der Artikel-Angaben. Für Inhalte externer Links sind
          ausschließlich deren Betreiber verantwortlich.
        </p>
      </section>
    </div>
  );
}
