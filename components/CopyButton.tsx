"use client";

import { useState } from "react";

export default function CopyButton({ text }: { text: string }) {
  const [kopiert, setKopiert] = useState(false);

  return (
    <button
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(text);
          setKopiert(true);
          setTimeout(() => setKopiert(false), 1500);
        } catch {
          // Zwischenablage nicht verfügbar – kein Fehler nötig.
        }
      }}
      aria-label={`${text} kopieren`}
      style={{
        border: "1px solid var(--line)",
        background: "var(--bg)",
        borderRadius: 8,
        padding: "6px 12px",
        fontSize: 13,
        fontFamily: "var(--mono)",
        cursor: "pointer",
        color: "var(--ink-soft)",
      }}
    >
      {kopiert ? "Kopiert ✓" : "Kopieren"}
    </button>
  );
}
