import { Wort } from "@/data/woerter";

export interface WortFaqItem {
  frage: string;
  antwort: string;
}

export function buildWortFaq(w: Wort): WortFaqItem[] {
  const akk = w.deklinationSingular.akkusativ;
  const gen = w.deklinationSingular.genitiv;

  return [
    {
      frage: `Welcher Artikel hat ${w.wort}?`,
      antwort: `Der Artikel von ${w.wort} ist ${w.artikel} — ${w.wort} ist ein ${w.genus}es Substantiv auf ${w.niveau}-Niveau. Im Nominativ heißt es also „${w.artikel} ${w.wort}“, im Akkusativ „${akk}“.`,
    },
    {
      frage: `Was ist der Plural von ${w.wort}?`,
      antwort: `Der Plural von ${w.wort} lautet „die ${w.plural}“. Unabhängig vom Singular-Artikel steht im Plural immer „die“.`,
    },
    {
      frage: `Wie dekliniert man ${w.wort}?`,
      antwort: `${w.wort} wird in vier Fällen dekliniert: Nominativ „${w.deklinationSingular.nominativ}“, Akkusativ „${akk}“, Dativ „${w.deklinationSingular.dativ}“ und Genitiv „${gen}“.`,
    },
    {
      frage: `Was bedeutet ${w.wort} auf Deutsch?`,
      antwort: w.bedeutung,
    },
    {
      frage: `Warum ist ${w.wort} ${w.genus}?`,
      antwort:
        w.merksatz ??
        `Das grammatische Geschlecht deutscher Substantive folgt selten einer festen Logik. Am sichersten lernst du ${w.wort} zusammen mit seinem Artikel „${w.artikel}“ auswendig.`,
    },
  ];
}
