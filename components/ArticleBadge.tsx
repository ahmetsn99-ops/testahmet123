import { Artikel } from "@/data/woerter";

const GENUS_LABEL: Record<Artikel, string> = {
  der: "maskulin",
  die: "feminin",
  das: "neutrum",
};

export default function ArticleBadge({
  artikel,
  size = "md",
}: {
  artikel: Artikel;
  size?: "sm" | "md" | "lg";
}) {
  const dims = {
    sm: { font: 14, pad: "4px 10px" },
    md: { font: 16, pad: "6px 14px" },
    lg: { font: 22, pad: "10px 20px" },
  }[size];

  return (
    <span
      className={`tag-${artikel} bg-${artikel}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 6,
        fontFamily: "var(--mono)",
        fontWeight: 600,
        fontSize: dims.font,
        padding: dims.pad,
        borderRadius: "var(--radius)",
        textTransform: "lowercase",
      }}
      title={GENUS_LABEL[artikel]}
    >
      {artikel}
    </span>
  );
}
