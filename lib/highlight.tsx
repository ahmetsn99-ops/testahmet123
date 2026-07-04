import type { ReactNode } from "react";

/**
 * Hebt jedes Vorkommen des Wortstamms (z. B. "Tisch" in "Tische", "Tisches")
 * innerhalb eines Satzes optisch hervor.
 */
export function hebeWortHervor(satz: string, stamm: string): ReactNode[] {
  if (!stamm) return [satz];
  const regex = new RegExp(`(${escapeRegExp(stamm)}\\p{L}*)`, "gu");
  const teile = satz.split(regex);

  // String.split mit einer Capture-Gruppe liefert abwechselnd:
  // [normal, treffer, normal, treffer, ...] – ungerade Indizes sind Treffer.
  return teile.map((teil, i) =>
    i % 2 === 1 ? (
      <strong key={i} style={{ color: "var(--der)" }}>
        {teil}
      </strong>
    ) : (
      <span key={i}>{teil}</span>
    )
  );
}

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
