import Link from "next/link";
import { Wort } from "@/data/woerter";
import ArticleBadge from "./ArticleBadge";

export default function WordCard({ wort }: { wort: Wort }) {
  return (
    <Link
      href={`/artikel/${wort.slug}`}
      style={{
        textDecoration: "none",
        color: "var(--ink)",
        display: "block",
        border: "1px solid var(--line)",
        borderLeft: `6px solid var(--${wort.artikel})`,
        borderRadius: "var(--radius)",
        padding: "16px 18px",
        background: "var(--paper)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontFamily: "var(--display)", fontSize: 20 }}>
          {wort.wort}
        </span>
        <ArticleBadge artikel={wort.artikel} size="sm" />
      </div>
      <p
        style={{
          margin: "8px 0 0",
          fontSize: 14,
          color: "var(--ink-soft)",
          fontFamily: "var(--mono)",
        }}
      >
        Plural: die {wort.plural} · {wort.kategorie}
      </p>
    </Link>
  );
}
