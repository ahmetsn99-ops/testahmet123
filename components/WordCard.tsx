import Link from "next/link";
import { Wort } from "@/data/woerter";
import ArticleBadge from "./ArticleBadge";

export default function WordCard({ wort }: { wort: Wort }) {
  return (
    <Link
      href={`/artikel/${wort.slug}`}
      className="card card-hover"
      style={{
        textDecoration: "none",
        color: "var(--ink)",
        display: "block",
        padding: "20px 20px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span
        className={`bg-${wort.artikel}`}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: 4,
          background: `var(--${wort.artikel})`,
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span style={{ fontFamily: "var(--display)", fontSize: 21, fontWeight: 600 }}>
          {wort.wort}
        </span>
        <ArticleBadge artikel={wort.artikel} size="sm" />
      </div>
      <p
        style={{
          margin: "10px 0 0",
          fontSize: 13.5,
          color: "var(--ink-soft)",
          fontFamily: "var(--mono)",
        }}
      >
        Plural: die {wort.plural} · {wort.niveau}
      </p>
      <p
        style={{
          margin: "8px 0 0",
          fontSize: 13.5,
          color: "var(--ink-soft)",
        }}
      >
        {wort.kategorie}
      </p>
    </Link>
  );
}
