"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { WordIndexEntry } from "@/lib/words";
import wordsIndex from "@/data/index/all-words.json";

export function SearchBox({ compact = false }: { compact?: boolean }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (query.trim().length < 1) return [];
    const q = query.trim().toLowerCase();
    return (wordsIndex as WordIndexEntry[])
      .filter((w) => w.wort.toLowerCase().includes(q))
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    function onClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  function goTo(slug: string) {
    setOpen(false);
    setQuery("");
    router.push(`/artikel/${slug}`);
  }

  return (
    <div ref={containerRef} className="relative w-full">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
        placeholder="Wort eingeben, z. B. Tisch …"
        aria-label="Deutsches Substantiv suchen"
        className={`w-full rounded-full border bg-white outline-none transition-shadow focus:shadow-md ${
          compact ? "px-4 py-2 text-sm" : "px-6 py-4 text-base md:text-lg"
        }`}
        style={{ borderColor: "var(--border)", color: "var(--ink)" }}
      />
      {open && results.length > 0 && (
        <ul
          className="absolute z-20 mt-2 w-full rounded-2xl border bg-white shadow-lg overflow-hidden"
          style={{ borderColor: "var(--border)" }}
        >
          {results.map((r) => (
            <li key={r.slug}>
              <button
                onClick={() => goTo(r.slug)}
                className="w-full text-left px-4 py-2.5 hover:bg-[var(--bg)] flex items-center gap-2 text-sm"
              >
                <span
                  className="font-mono text-xs px-2 py-0.5 rounded-full"
                  style={{
                    background:
                      r.artikel === "der" ? "var(--der-bg)" : r.artikel === "die" ? "var(--die-bg)" : "var(--das-bg)",
                    color: r.artikel === "der" ? "var(--der)" : r.artikel === "die" ? "var(--die)" : "var(--das)",
                  }}
                >
                  {r.artikel}
                </span>
                <span>{r.wort}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
