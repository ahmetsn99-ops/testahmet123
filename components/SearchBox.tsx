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
    return woerter.filter((w) => w.wort.toLowerCase().includes(q)).slice(0, 6);
  }, [query, woerter]);

  return (
    <div style={{ position: "relative", maxWidth: 560 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (treffer[0]) router.push(`/artikel/${treffer[0].slug}`);
        }}
        style={{
          display: "flex",
          background: "rgba(255,255,255,0.06)",
          border: "1px solid rgba(255,255,255,0.14)",
          backdropFilter: "blur(10px)",
          borderRadius: 100,
          padding: 6,
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
            background: "transparent",
            padding: "14px 20px",
            fontSize: 16.5,
            fontFamily: "var(--body)",
            outline: "none",
            color: "var(--ink-inverse)",
          }}
        />
        <button type="submit" className="btn btn-primary" style={{ borderRadius: 100 }}>
          Suchen
        </button>
      </form>

      {treffer.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            margin: "10px 0 0",
            padding: 6,
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            background: "var(--bg)",
            border: "1px solid var(--line)",
            borderRadius: "var(--radius)",
            zIndex: 10,
            boxShadow: "var(--shadow-lg)",
          }}
        >
          {treffer.map((w) => (
            <li key={w.slug}>
              <a
                href={`/artikel/${w.slug}`}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "12px 14px",
                  textDecoration: "none",
                  color: "var(--ink)",
                  fontFamily: "var(--mono)",
                  fontSize: 14,
                  borderRadius: "var(--radius-sm)",
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
