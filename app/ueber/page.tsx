import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Über uns",
  description: "Warum es Artikel-Finder gibt und wie die Seite funktioniert.",
};

export default function UeberPage() {
  return (
    <div className="wrap" style={{ padding: "48px 24px 88px", maxWidth: 720 }}>
      <p className="eyebrow" style={{ marginBottom: 10 }}>Über uns</p>
      <h1 style={{ fontSize: "clamp(30px, 5vw, 44px)", marginBottom: 20 }}>
        Über Artikel-Finder
      </h1>
      <p style={{ color: "var(--ink-soft)", marginBottom: 16, fontSize: 16.5 }}>
        Artikel-Finder hilft Deutschlernenden, den richtigen Artikel – der,
        die oder das – für deutsche Substantive zu finden. Zu jedem Wort
        gibt es eine einfache Erklärung, die vollständige Deklination,
        Aussprache, typische Fehler und acht Beispielsätze im Kontext.
      </p>
      <p style={{ color: "var(--ink-soft)", fontSize: 16.5 }}>
        Die Wörterliste wächst stetig weiter. Fehlt ein Wort, das du
        brauchst? Die Datenstruktur in{" "}
        <code style={{ fontFamily: "var(--mono)" }}>data/woerter.ts</code>{" "}
        lässt sich einfach um neue Einträge erweitern.
      </p>
    </div>
  );
}
