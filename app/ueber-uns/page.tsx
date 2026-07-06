import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns",
  description: "Warum es Artikelfinder gibt und wie die Artikel-Datenbank aufgebaut ist.",
  alternates: { canonical: "/ueber-uns" },
};

export default function UeberUnsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-12 md:py-16 space-y-6 text-base leading-relaxed">
      <h1 className="font-display text-3xl md:text-5xl mb-6" style={{ color: "var(--ink)" }}>
        Über Artikelfinder
      </h1>
      <p style={{ color: "var(--ink-soft)" }}>
        Artikelfinder ist entstanden, weil der deutsche Artikel – der, die oder das – für Lernende
        und oft auch für Muttersprachler eine der hartnäckigsten Hürden der deutschen Grammatik ist.
        Anders als in vielen anderen Sprachen lässt sich das grammatische Geschlecht eines deutschen
        Substantivs selten aus seiner Bedeutung ableiten, weshalb schnelles, verlässliches
        Nachschlagen unverzichtbar ist.
      </p>
      <p style={{ color: "var(--ink-soft)" }}>
        Unsere Datenbank basiert auf realen Häufigkeitsdaten der deutschen Sprache, damit die am
        meisten gesuchten und gebrauchten Substantive zuerst verfügbar sind. Jeder Eintrag enthält
        den Artikel, die vollständige Deklination, Beispielsätze im Kontext sowie Übersetzungen, um
        das Lernen zu erleichtern.
      </p>
      <p style={{ color: "var(--ink-soft)" }}>
        Artikelfinder befindet sich im Aufbau: Die Wortdatenbank wird laufend erweitert. Hinweise zu
        fehlerhaften Einträgen nehmen wir über die{" "}
        <a href="/kontakt" className="underline" style={{ color: "var(--gold)" }}>
          Kontaktseite
        </a>{" "}
        gerne entgegen.
      </p>
    </div>
  );
}
