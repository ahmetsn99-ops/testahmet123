import type { CSSProperties } from "react";
const REGELN: {
  artikel: "der" | "die" | "das";
  endungen: string;
  beispiele: string;
}[] = [
  { artikel: "der", endungen: "-er, -ling, -ig, -ismus", beispiele: "der Lehrer, der Frühling, der Honig" },
  { artikel: "die", endungen: "-e, -ung, -heit, -keit, -schaft, -ion", beispiele: "die Blume, die Zeitung, die Freiheit" },
  { artikel: "das", endungen: "-chen, -lein, -um, -ment", beispiele: "das Mädchen, das Museum, das Dokument" },
];

export default function GrammarRulesTable() {
  return (
    <div
      className="card"
      style={{ overflow: "hidden" }}
    >
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "var(--bg-soft)" }}>
            <th style={head}>Artikel</th>
            <th style={head}>Typische Endungen</th>
            <th style={head}>Beispiele</th>
          </tr>
        </thead>
        <tbody>
          {REGELN.map((r) => (
            <tr key={r.artikel}>
              <td style={{ ...cell, borderLeft: `4px solid var(--${r.artikel})` }}>
                <span className={`badge bg-${r.artikel} tag-${r.artikel}`} style={{ padding: "5px 14px", fontSize: 14 }}>
                  {r.artikel}
                </span>
              </td>
              <td style={{ ...cell, fontFamily: "var(--mono)", fontSize: 14 }}>{r.endungen}</td>
              <td style={{ ...cell, color: "var(--ink-soft)" }}>{r.beispiele}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const head: CSSProperties = {
  textAlign: "left",
  padding: "14px 20px",
  fontFamily: "var(--mono)",
  fontSize: 12,
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  color: "var(--ink-soft)",
};

const cell: CSSProperties = {
  padding: "16px 20px",
  borderTop: "1px solid var(--line)",
  fontSize: 15,
};
