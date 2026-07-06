import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung von Artikelfinder.",
  alternates: { canonical: "/datenschutz" },
  robots: { index: true, follow: true },
};

export default function DatenschutzPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-8 text-sm leading-relaxed" style={{ color: "var(--ink-soft)" }}>
      <h1 className="font-display text-3xl md:text-5xl mb-4" style={{ color: "var(--ink)" }}>
        Datenschutzerklärung
      </h1>

      <p className="text-xs font-mono" style={{ color: "var(--ink-faint)" }}>
        HINWEIS: Dies ist ein Platzhaltertext zur Orientierung. Vor der Veröffentlichung sollte diese
        Seite von einer sachkundigen Person bzw. anhand eines aktuellen Datenschutz-Generators an die
        tatsächlich eingesetzten Dienste (z. B. Google AdSense, Analytics) und die DSGVO angepasst
        werden.
      </p>

      <section>
        <h2 className="font-display text-xl mb-2" style={{ color: "var(--ink)" }}>1. Verantwortlicher</h2>
        <p>
          Verantwortlich für die Datenverarbeitung auf dieser Website ist der im{" "}
          <a href="/impressum" className="underline" style={{ color: "var(--gold)" }}>Impressum</a>{" "}
          genannte Betreiber.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl mb-2" style={{ color: "var(--ink)" }}>2. Erhebung von Daten beim Besuch der Website</h2>
        <p>
          Beim Aufruf dieser Website erhebt unser Hosting-Anbieter automatisch Informationen in
          sogenannten Server-Logfiles, die dein Browser übermittelt (z. B. IP-Adresse, Datum und
          Uhrzeit der Anfrage, Browsertyp). Diese Daten sind nicht bestimmten Personen zuordenbar und
          werden nicht mit anderen Datenquellen zusammengeführt.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl mb-2" style={{ color: "var(--ink)" }}>3. Cookies und Werbung (Google AdSense)</h2>
        <p>
          Diese Website kann Werbung über den Dienst Google AdSense einbinden. Google kann dabei
          Cookies oder ähnliche Technologien einsetzen, um Anzeigen auf Basis früherer Besuche dieser
          oder anderer Websites auszuspielen. Du kannst personalisierte Werbung in den Einstellungen
          von Google (Anzeigeneinstellungen) deaktivieren. Weitere Informationen findest du in der
          Datenschutzerklärung von Google.
        </p>
      </section>

      <section>
        <h2 className="font-display text-xl mb-2" style={{ color: "var(--ink)" }}>4. Deine Rechte</h2>
        <p>
          Du hast jederzeit das Recht auf Auskunft über die zu deiner Person gespeicherten Daten,
          deren Herkunft, den Empfänger sowie den Zweck der Verarbeitung, außerdem ein Recht auf
          Berichtigung oder Löschung dieser Daten im Rahmen der geltenden gesetzlichen Bestimmungen.
        </p>
      </section>
    </div>
  );
}
