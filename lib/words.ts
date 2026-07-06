import fs from "fs";
import path from "path";

export type Artikel = "der" | "die" | "das";

export interface Quiz {
  frage: string;
  richtig: Artikel;
  optionen: Artikel[];
}

export interface WordData {
  slug: string;
  wort: string;
  artikel: Artikel;
  plural: string;
  genitiv_singular: string;
  kategorie: string;
  haeufigkeit_rang: number;
  saetze: string[];
  quiz: Quiz;
  uebersetzungen: Record<string, string>;
}

export interface WordIndexEntry {
  slug: string;
  wort: string;
  artikel: Artikel;
  kategorie: string;
}

const WORDS_DIR = path.join(process.cwd(), "data", "words");
const INDEX_DIR = path.join(process.cwd(), "data", "index");

export const SPRACHEN: { code: string; name: string }[] = [
  { code: "tr", name: "Türkisch" },
  { code: "en", name: "Englisch" },
  { code: "ar", name: "Arabisch" },
  { code: "es", name: "Spanisch" },
  { code: "fr", name: "Französisch" },
  { code: "it", name: "Italienisch" },
  { code: "ru", name: "Russisch" },
  { code: "pt", name: "Portugiesisch" },
  { code: "nl", name: "Niederländisch" },
  { code: "pl", name: "Polnisch" },
];

export function getAllWordSlugs(): string[] {
  return fs
    .readdirSync(WORDS_DIR)
    .filter((f) => f.endsWith(".json"))
    .map((f) => f.replace(/\.json$/, ""));
}

export function getWord(slug: string): WordData | null {
  const file = path.join(WORDS_DIR, `${slug}.json`);
  if (!fs.existsSync(file)) return null;
  return JSON.parse(fs.readFileSync(file, "utf-8"));
}

export function getAllWordsIndex(): WordIndexEntry[] {
  return JSON.parse(fs.readFileSync(path.join(INDEX_DIR, "all-words.json"), "utf-8"));
}

export function getWordsByArtikel(artikel: Artikel): WordIndexEntry[] {
  return JSON.parse(fs.readFileSync(path.join(INDEX_DIR, `${artikel}.json`), "utf-8"));
}

export function getRelatedWords(word: WordData, limit = 6): WordIndexEntry[] {
  const all = getAllWordsIndex();
  return all
    .filter((w) => w.kategorie === word.kategorie && w.slug !== word.slug)
    .slice(0, limit);
}

export const KATEGORIE_LABELS: Record<string, string> = {
  mobilya: "Möbel",
  yer: "Orte",
  hayvan: "Tiere",
  insan: "Menschen",
  esya: "Gegenstände",
  yiyecek_icecek: "Essen & Trinken",
  doga: "Natur",
  vucut: "Körperteile",
};
