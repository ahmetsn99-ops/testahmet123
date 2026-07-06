"use client";

import { useState } from "react";
import { Artikel, Quiz } from "@/lib/words";
import { ArtikelPill } from "./ArtikelPill";

export function ArtikelQuiz({ quiz, wort }: { quiz: Quiz; wort: string }) {
  const [selected, setSelected] = useState<Artikel | null>(null);

  const isCorrect = selected === quiz.richtig;

  return (
    <div className="rounded-2xl border p-6 md:p-8" style={{ borderColor: "var(--border)", background: "var(--bg-raised)" }}>
      <p className="text-xs uppercase tracking-wider font-mono mb-3" style={{ color: "var(--ink-faint)" }}>
        Mini-Quiz
      </p>
      <h3 className="font-display text-xl md:text-2xl mb-5">{quiz.frage}</h3>
      <div className="flex gap-3 flex-wrap">
        {quiz.optionen.map((opt) => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              onClick={() => setSelected(opt)}
              disabled={selected !== null}
              className="transition-transform disabled:cursor-default"
              style={{ transform: isSelected ? "scale(1.05)" : undefined }}
            >
              <ArtikelPill artikel={opt} active={selected === null || isSelected} size="lg" />
            </button>
          );
        })}
      </div>
      {selected && (
        <p
          className="mt-5 text-sm font-medium"
          style={{ color: isCorrect ? "var(--das)" : "var(--die)" }}
        >
          {isCorrect
            ? `Richtig! Es heißt „${quiz.richtig} ${wort}“.`
            : `Nicht ganz. Richtig ist „${quiz.richtig} ${wort}“.`}
        </p>
      )}
    </div>
  );
}
