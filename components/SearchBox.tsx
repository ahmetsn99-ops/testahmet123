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
    <div style={{ position: "relative", maxWidth: 540 }}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (treffer[0]) router.push(`/${treffer[0].artikel}/${treffer[0].slug}`);
        }}
        className="card"
        style={{ display: "flex", padding: 5, borderRadius: 10 }}
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
            padding: "13px 16px",
            fontSize: 16,
            outline: "none",
            color: "var(--ink)",
          }}
        />
        <button type="submit" className="btn btn-primary">
          Suchen
        </button>
      </form>

      {treffer.length > 0 && (
        <ul
          className="card"
          style={{
            listStyle: "none",
            margin: "8px 0 0",
            padding: 6,
            position: "absolute",
            top: "100%",
            left: 0,
            right: 0,
            zIndex: 10,
            boxShadow: "var(--shadow)",
          }}
        >
          {treffer.map((w) => (
            <li key={w.slug}>
              <a
                href={`/${w.artikel}/${w.slug}`}
                style={{
                  display: "block",
                  padding: "10px 12px",
                  textDecoration: "none",
                  color: "var(--ink)",
                  fontSize: 15,
                  borderRadius: "var(--radius-sm)",
                }}
              >
                {w.wort}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
