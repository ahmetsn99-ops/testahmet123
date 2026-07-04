import Link from "next/link";
import { Wort } from "@/data/woerter";
import ArticleBadge from "./ArticleBadge";

export default function WordCard({ wort }: { wort: Wort }) {
  return (
    <Link
      href={`/${wort.artikel}/${wort.slug}`}
      className="card card-hover"
      style={{
        textDecoration: "none",
        color: "var(--ink)",
        display: "block",
        padding: "16px 18px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <span
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          bottom: 0,
          width: 3,
          background: `var(--${wort.artikel})`,
        }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: 19, fontWeight: 700 }}>{wort.wort}</span>
        <ArticleBadge artikel={wort.artikel} size="sm" />
      </div>
      <p style={{ margin: "8px 0 0", fontSize: 13, color: "var(--ink-soft)", fontFamily: "var(--mono)" }}>
        die {wort.plural} · {wort.niveau}
      </p>
    </Link>
  );
}
