"use client";

import { useState } from "react";

interface FaqItem {
  frage: string;
  antwort: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    frage: "Warum gibt es im Deutschen drei Artikel?",
    antwort:
      "Das Deutsche unterscheidet drei grammatische Geschlechter (Genus): maskulin (der), feminin (die) und neutrum (das). Jedes Substantiv gehört zu genau einem Genus, das man beim Wort mitlernen muss – es hat oft nichts mit dem biologischen Geschlecht zu tun.",
  },
  {
    frage: "Gibt es Regeln, um das Genus vorherzusagen?",
    antwort:
      "Es gibt hilfreiche Tendenzen, aber keine hundertprozentige Regel. Wörter auf -e, -ung, -heit, -keit oder -schaft sind meist feminin. Wörter auf -chen oder -lein sind immer neutrum. Wörter auf -er, die eine Person bezeichnen, sind meist maskulin. Am sichersten ist es, den Artikel direkt mit dem Wort zu lernen.",
  },
  {
    frage: "Was ist der Unterschied zwischen bestimmtem und unbestimmtem Artikel?",
    antwort:
      "Der bestimmte Artikel (der, die, das) bezeichnet etwas Bekanntes oder bereits Erwähntes. Der unbestimmte Artikel (ein, eine, ein) bezeichnet etwas Neues oder Unbestimmtes, zum Beispiel: 'Das ist ein Tisch. Der Tisch ist braun.'",
  },
  {
    frage: "Was bedeuten Nominativ und Akkusativ?",
    antwort:
      "Der Nominativ ist der Fall des Subjekts im Satz und beantwortet die Frage 'Wer oder was?'. Der Akkusativ ist der Fall des direkten Objekts und beantwortet die Frage 'Wen oder was?'. Bei maskulinen Wörtern ändert sich der Artikel dabei von 'der' zu 'den'.",
  },
  {
    frage: "Wie lerne ich Artikel am besten auswendig?",
    antwort:
      "Am effektivsten ist es, jedes neue Substantiv immer zusammen mit seinem Artikel zu lernen, zum Beispiel als 'der Tisch' statt nur 'Tisch'. Farbcodierung hilft vielen Lernenden: Blau für der, Rot für die, Grün für das. Auch Beispielsätze und Wiederholung im Kontext festigen das Gelernte.",
  },
  {
    frage: "Ändert sich der Artikel im Plural?",
    antwort:
      "Ja – im Plural verwendet man unabhängig vom Genus immer 'die', zum Beispiel 'der Tisch' wird zu 'die Tische' und 'das Buch' wird zu 'die Bücher'. Der Unterschied zwischen den drei Artikeln existiert also nur im Singular.",
  },
];

export default function Faq() {
  const [offenerIndex, setOffenerIndex] = useState<number | null>(0);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      {FAQ_ITEMS.map((item, i) => {
        const offen = offenerIndex === i;
        return (
          <div
            key={item.frage}
            style={{
              border: "1px solid var(--line)",
              borderRadius: "var(--radius)",
              background: offen ? "var(--paper-dim)" : "var(--paper)",
            }}
          >
            <button
              onClick={() => setOffenerIndex(offen ? null : i)}
              aria-expanded={offen}
              style={{
                width: "100%",
                textAlign: "left",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "16px 18px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                gap: 12,
                fontFamily: "var(--body)",
                fontSize: 16,
                fontWeight: 600,
                color: "var(--ink)",
              }}
            >
              {item.frage}
              <span
                style={{
                  fontFamily: "var(--mono)",
                  color: "var(--der)",
                  flexShrink: 0,
                }}
              >
                {offen ? "–" : "+"}
              </span>
            </button>
            {offen && (
              <p
                style={{
                  margin: 0,
                  padding: "0 18px 18px",
                  color: "var(--ink-soft)",
                  fontSize: 15,
                  lineHeight: 1.7,
                }}
              >
                {item.antwort}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
