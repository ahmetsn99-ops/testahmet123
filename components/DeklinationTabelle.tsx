import { Artikel } from "@/lib/words";

const AKK: Record<Artikel, string> = { der: "den", die: "die", das: "das" };
const DAT: Record<Artikel, string> = { der: "dem", die: "der", das: "dem" };
const GEN_ART: Record<Artikel, string> = { der: "des", die: "der", das: "des" };

export function DeklinationTabelle({
  wort,
  artikel,
  plural,
  genitivSingular,
}: {
  wort: string;
  artikel: Artikel;
  plural: string;
  genitivSingular: string;
}) {
  const pluralDisplay = plural !== "-" ? plural : wort;
  const dativPluralWort =
    pluralDisplay.endsWith("n") || pluralDisplay.endsWith("s") ? pluralDisplay : `${pluralDisplay}n`;

  const rows = [
    { fall: "Nominativ", singular: `${artikel} ${wort}`, plural: `die ${pluralDisplay}` },
    { fall: "Akkusativ", singular: `${AKK[artikel]} ${wort}`, plural: `die ${pluralDisplay}` },
    { fall: "Dativ", singular: `${DAT[artikel]} ${wort}`, plural: `den ${dativPluralWort}` },
    { fall: "Genitiv", singular: `${GEN_ART[artikel]} ${genitivSingular}`, plural: `der ${pluralDisplay}` },
  ];

  return (
    <div className="overflow-x-auto rounded-2xl border" style={{ borderColor: "var(--border)" }}>
      <table className="w-full text-sm md:text-base">
        <thead>
          <tr style={{ background: "var(--bg)" }}>
            <th className="text-left font-medium px-4 py-3 font-mono text-xs uppercase tracking-wider" style={{ color: "var(--ink-faint)" }}>
              Fall
            </th>
            <th className="text-left font-medium px-4 py-3">Singular</th>
            <th className="text-left font-medium px-4 py-3">Plural</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.fall} className={i !== rows.length - 1 ? "border-b" : ""} style={{ borderColor: "var(--border-soft)" }}>
              <td className="px-4 py-3 font-mono text-xs" style={{ color: "var(--ink-faint)" }}>
                {r.fall}
              </td>
              <td className="px-4 py-3">{r.singular}</td>
              <td className="px-4 py-3">{r.plural}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
