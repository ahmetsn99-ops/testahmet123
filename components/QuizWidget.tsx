"use client";

import { useState } from "react";
import { Artikel } from "@/data/woerter";

const OPTIONEN: Artikel[] = ["der", "die", "das"];

export default function QuizWidget({ wort, artikel }: { wort: string; artikel: Artikel }) {
  const [auswahl, setAuswahl] = useState<Artikel | null>(null);

  const richtig = auswahl === artikel;

  return (
    <div className="card" style={{ padding: "20px 22px" }}>
      <p className="eyebrow" style={{ marginBottom: 10 }}>Teste dich</p>
      <p style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>
        Welcher Artikel gehört zu „{wort}"?
      </p>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        {OPTIONEN.map((opt) => {
          const istAusgewaehlt = auswahl === opt;
          const zeigeAlsRichtig = auswahl !== null && opt === artikel;
          const zeigeAlsFalsch = istAusgewaehlt && opt !== artikel;
          return (
            <button
              key={opt}
              onClick={() => setAuswahl(opt)}
              disabled={auswahl !== null}
              className="badge"
              style={{
                fontSize: 15,
                padding: "9px 20px",
                cursor: auswahl === null ? "pointer" : "default",
                border: "1px solid var(--line)",
                background: zeigeAlsRichtig
                  ? "var(--das-dim)"
                  : zeigeAlsFalsch
                  ? "var(--die-dim)"
                  : "var(--bg)",
                color: zeigeAlsRichtig ? "var(--das)" : zeigeAlsFalsch ? "var(--die)" : "var(--ink)",
              }}
            >
              {opt}
            </button>
          );
        })}
      </div>
      {auswahl !== null && (
        <p style={{ marginTop: 14, fontSize: 14.5, color: richtig ? "var(--das)" : "var(--die)" }}>
          {richtig
            ? "Richtig! 🎉"
            : `Nicht ganz — richtig ist „${artikel} ${wort}".`}
        </p>
      )}
    </div>
  );
}
