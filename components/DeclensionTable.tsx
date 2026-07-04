import type { CSSProperties } from "react";
import { Deklination, Artikel } from "@/data/woerter";

const FALLE: { key: keyof Deklination; label: string; frage: string }[] = [
  { key: "nominativ", label: "Nominativ", frage: "Wer/Was?" },
  { key: "akkusativ", label: "Akkusativ", frage: "Wen/Was?" },
  { key: "dativ", label: "Dativ", frage: "Wem?" },
  { key: "genitiv", label: "Genitiv", frage: "Wessen?" },
];

export default function DeclensionTable({
  singular,
  plural,
  artikel,
}: {
  singular: Deklination;
  plural: Deklination;
  artikel: Artikel;
}) {
  return (
    <div
      className="card"
      style={{
        overflow: "hidden",
        borderTop: `3px solid var(--${artikel})`,
      }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--bg-soft)" }}>
            <th style={cellHead}>Fall</th>
            <th style={cellHead}>Singular</th>
            <th style={cellHead}>Plural</th>
          </tr>
        </thead>
        <tbody>
          {FALLE.map((f, i) => (
            <tr key={f.key}>
              <td style={cellLabel}>
                <span style={{ display: "block", fontWeight: 600 }}>{f.label}</span>
                <span
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: 12,
                    color: "var(--ink-soft)",
                  }}
                >
                  {f.frage}
                </span>
              </td>
              <td style={cell}>{singular[f.key]}</td>
              <td style={cell}>{plural[f.key]}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const cellHead: CSSProperties = {
  textAlign: "left",
  padding: "14px 20px",
  fontFamily: "var(--mono)",
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "var(--ink-soft)",
};

const cell: CSSProperties = {
  padding: "14px 20px",
  borderTop: "1px solid var(--line)",
  fontFamily: "var(--mono)",
  fontSize: 15,
};

const cellLabel: CSSProperties = {
  ...cell,
};
