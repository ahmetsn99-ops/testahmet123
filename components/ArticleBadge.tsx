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
    sm: { font: 13, pad: "4px 12px" },
    md: { font: 15, pad: "7px 16px" },
    lg: { font: 20, pad: "10px 22px" },
  }[size];

  return (
    <span
      className={`badge tag-${artikel} bg-${artikel}`}
      style={{
        fontSize: dims.font,
        padding: dims.pad,
      }}
      title={GENUS_LABEL[artikel]}
    >
      {artikel}
    </span>
  );
}
