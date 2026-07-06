import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Kontaktiere das Artikelfinder-Team bei Fragen, Feedback oder Fehlermeldungen.",
  alternates: { canonical: "/kontakt" },
};

export default function KontaktPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 md:px-6 py-12 md:py-16">
      <h1 className="font-display text-3xl md:text-5xl mb-6">Kontakt</h1>
      <p className="text-base md:text-lg mb-8" style={{ color: "var(--ink-soft)" }}>
        Du hast einen falschen Artikel gefunden, einen Verbesserungsvorschlag oder eine allgemeine
        Frage zu Artikelfinder? Schreib uns – wir freuen uns über jede Rückmeldung.
      </p>

      <div className="rounded-2xl border p-6" style={{ borderColor: "var(--border)", background: "var(--bg-raised)" }}>
        <p className="text-sm mb-1" style={{ color: "var(--ink-faint)" }}>
          E-Mail
        </p>
        <p className="text-lg font-medium mb-6">
          {/* PLACEHOLDER — gerçek e-posta adresinizi buraya yazın */}
          kontakt@artikelfinder.com
        </p>
        <p className="text-sm mb-1" style={{ color: "var(--ink-faint)" }}>
          Antwortzeit
        </p>
        <p className="text-lg font-medium">In der Regel innerhalb von 2–3 Werktagen</p>
      </div>
    </div>
  );
}
