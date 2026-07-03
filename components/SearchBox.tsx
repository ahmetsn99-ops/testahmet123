"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Wort } from "@/data/woerter";

export default function SearchBox({ woerter }: { woerter: Wort[] }) {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const treffer = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.trim().toLowerCase();
    return woerter
      .filter((w) => w.wort.toLowerCase().includes(q))
      .slice(0, 6);
  }, [query, woerter]);

  return (
    <div style={{ position: "relative" }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (treffer[0]) router.push(`/artikel/${treffer[0].slug}`);
        }}
        style={{
          display: "flex",
          border: "2px solid var(--ink)",
          borderRadius: "var(--radius)",
          overflow: "hidden",
        }}
      >
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="z. B. Tisch, Katze, Haus …"
          aria-label="Substantiv suchen"
          style={{
            flex: 1,
            border: "none",
            padding: "16px 18px",
            fontSize: 17,
            fontFamily: "var(--body)",
            outline: "none",
          }}
        />
        <button
          type="submit"
          style={{
            border: "none",
            background: "var(--ink)",
            color: "var(--paper)",
            padding: "0 24px",
            fontFamily: "var(--mono)",
            fontSize: 14,
            textTransform: "uppercase",
            letterSpacing: "0.04em",
            cursor: "pointer",
          }}
        >
          Suchen
        </button>
      </form>

      {treffer.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            margin: "6px 0 0",
            padding: 0,
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "var(--paper)",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius)",
            zIndex: 10,
            boxShadow: "0 8px 24px rgba(28,27,41,0.08)",
          }}
        >
          {treffer.map((w) => (
            <li key={w.slug}>
              <a
                href={`/artikel/${w.slug}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 16px",
                  textDecoration: "none",
                  color: "var(--ink)",
                  fontFamily: "var(--mono)",
                  fontSize: 14,
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <span>{w.wort}</span>
                <span className={`tag-${w.artikel}`}>{w.artikel}</span>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
