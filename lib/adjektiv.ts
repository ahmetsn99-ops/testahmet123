import { Deklination, Genus } from "@/data/woerter";

/**
 * Erzeugt die Deklination eines generischen Adjektivs ("groß") vor dem
 * Substantiv nach bestimmtem Artikel (schwache Deklination), basierend auf
 * den bereits vorhandenen Artikel+Nomen-Formen. So brauchen wir pro Wort
 * keine zusätzlichen Daten zu pflegen.
 */
export function buildAdjektivDeklination(
  deklinationSingular: Deklination,
  genus: Genus
): Deklination {
  const adjEnde = {
    nominativ: "e",
    akkusativ: genus === "maskulin" ? "en" : "e",
    dativ: "en",
    genitiv: "en",
  };

  const einfuegen = (formel: string, ende: string) => {
    const [artikelWort, ...rest] = formel.split(" ");
    return `${artikelWort} groß${ende} ${rest.join(" ")}`;
  };

  return {
    nominativ: einfuegen(deklinationSingular.nominativ, adjEnde.nominativ),
    akkusativ: einfuegen(deklinationSingular.akkusativ, adjEnde.akkusativ),
    dativ: einfuegen(deklinationSingular.dativ, adjEnde.dativ),
    genitiv: einfuegen(deklinationSingular.genitiv, adjEnde.genitiv),
  };
}
