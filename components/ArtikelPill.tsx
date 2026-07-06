import { Artikel } from "@/lib/words";

const STYLES: Record<Artikel, { bg: string; color: string; border: string }> = {
  der: { bg: "var(--der-bg)", color: "var(--der)", border: "var(--der)" },
  die: { bg: "var(--die-bg)", color: "var(--die)", border: "var(--die)" },
  das: { bg: "var(--das-bg)", color: "var(--das)", border: "var(--das)" },
};

export function ArtikelPill({
  artikel,
  active = true,
  size = "md",
}: {
  artikel: Artikel;
  active?: boolean;
  size?: "sm" | "md" | "lg";
}) {
  const s = STYLES[artikel];
  const sizeClasses =
    size === "lg"
      ? "text-lg md:text-xl px-5 py-2"
      : size === "sm"
      ? "text-xs px-2.5 py-1"
      : "text-sm px-3.5 py-1.5";

  return (
    <span
      className={`inline-flex items-center justify-center rounded-full font-medium font-mono tracking-wide border ${sizeClasses} ${
        active ? "" : "opacity-30 grayscale"
      }`}
      style={{
        background: active ? s.bg : "transparent",
        color: s.color,
        borderColor: s.border,
      }}
    >
      {artikel}
    </span>
  );
}

export function ArtikelTrio({ aktiv }: { aktiv: Artikel }) {
  return (
    <div className="flex gap-2">
      {(["der", "die", "das"] as Artikel[]).map((a) => (
        <ArtikelPill key={a} artikel={a} active={a === aktiv} size="lg" />
      ))}
    </div>
  );
}
