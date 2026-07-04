export type Artikel = "der" | "die" | "das";
export type Genus = "maskulin" | "feminin" | "neutrum";
export type Niveau = "A1" | "A2" | "B1";

export interface Deklination {
  nominativ: string;
  akkusativ: string;
  dativ: string;
  genitiv: string;
}

export interface Redewendung {
  ausdruck: string;
  bedeutung: string;
  beispiel: string;
}

export interface Wort {
  slug: string;
  wort: string;
  artikel: Artikel;
  genus: Genus;
  pluralArtikel: "die";
  plural: string;
  bedeutung: string;
  merksatz?: string;
  aussprache: string;
  niveau: Niveau;
  synonyme: string[];
  haeufigerFehler: string;
  redewendungen?: Redewendung[];
  deklinationSingular: Deklination;
  deklinationPlural: Deklination;
  beispielsaetze: string[];
  verwandt: string[];
  kategorie: string;
}

export const woerter: Wort[] = [
  {
    slug: "tisch",
    wort: "Tisch",
    artikel: "der",
    genus: "maskulin",
    pluralArtikel: "die",
    plural: "Tische",
    bedeutung:
      "Ein Tisch ist ein Möbelstück mit einer flachen Platte, auf der man isst, arbeitet oder Dinge abstellt.",
    merksatz:
      "Die meisten Möbelstücke, die man 'benutzt' statt 'betritt', sind oft maskulin – wie der Tisch, der Stuhl, der Schrank.",
    aussprache: "[tɪʃ]",
    niveau: "A1",
    synonyme: ["die Tafel (veraltet)", "das Pult (Sonderform)"],
    haeufigerFehler:
      "Viele verwechseln 'den Tisch' (Akkusativ) mit 'dem Tisch' (Dativ) – achte auf die Präposition davor: 'auf dem Tisch' aber 'auf den Tisch legen'.",
    redewendungen: [
      {
        ausdruck: "reinen Tisch machen",
        bedeutung: "eine Sache klären und endgültig bereinigen",
        beispiel: "Lass uns reinen Tisch machen und offen über alles reden.",
      },
      {
        ausdruck: "jemanden über den Tisch ziehen",
        bedeutung: "jemanden geschickt übervorteilen",
        beispiel: "Beim Autokauf hat ihn der Händler über den Tisch gezogen.",
      },
    ],
    deklinationSingular: {
      nominativ: "der Tisch",
      akkusativ: "den Tisch",
      dativ: "dem Tisch",
      genitiv: "des Tisches",
    },
    deklinationPlural: {
      nominativ: "die Tische",
      akkusativ: "die Tische",
      dativ: "den Tischen",
      genitiv: "der Tische",
    },
    beispielsaetze: [
      "Der Tisch steht in der Mitte des Zimmers.",
      "Ich stelle die Vase auf den Tisch.",
      "Unter dem Tisch liegt eine Katze.",
      "Das ist die Platte des Tisches.",
      "Wir kaufen einen neuen Tisch für die Küche.",
      "Auf dem Tisch liegen viele Bücher.",
      "Kannst du mir bitte den Tisch abwischen?",
      "Der alte Tisch wurde repariert.",
    ],
    verwandt: ["stuhl", "fenster", "buch"],
    kategorie: "Möbel",
  },
  {
    slug: "stuhl",
    wort: "Stuhl",
    artikel: "der",
    genus: "maskulin",
    pluralArtikel: "die",
    plural: "Stühle",
    bedeutung:
      "Ein Stuhl ist ein Sitzmöbel für eine Person, meist mit vier Beinen und einer Lehne.",
    merksatz: "Wie 'der Tisch' gehört auch 'der Stuhl' zu den maskulinen Möbelstücken.",
    aussprache: "[ʃtuːl]",
    niveau: "A1",
    synonyme: ["der Sessel (gepolstert)", "der Hocker (ohne Lehne)"],
    haeufigerFehler:
      "Der Plural 'die Stühle' bekommt einen Umlaut (u → ü) – ein Fehler ist 'die Stuhle' ohne Umlaut.",
    deklinationSingular: {
      nominativ: "der Stuhl",
      akkusativ: "den Stuhl",
      dativ: "dem Stuhl",
      genitiv: "des Stuhles",
    },
    deklinationPlural: {
      nominativ: "die Stühle",
      akkusativ: "die Stühle",
      dativ: "den Stühlen",
      genitiv: "der Stühle",
    },
    beispielsaetze: [
      "Der Stuhl steht am Tisch.",
      "Ich setze mich auf den Stuhl.",
      "Die Lehne des Stuhls ist kaputt.",
      "Gib mir bitte den Stuhl dort drüben.",
      "Auf dem Stuhl liegt eine Jacke.",
      "Wir brauchen vier neue Stühle.",
      "Der Stuhl wackelt ein bisschen.",
      "Sie stellt den Stuhl an den Tisch.",
    ],
    verwandt: ["tisch", "fenster"],
    kategorie: "Möbel",
  },
  {
    slug: "haus",
    wort: "Haus",
    artikel: "das",
    genus: "neutrum",
    pluralArtikel: "die",
    plural: "Häuser",
    bedeutung: "Ein Haus ist ein Gebäude, in dem Menschen wohnen.",
    merksatz:
      "Viele neutrale Grundwörter für Gebäude wie 'das Haus', 'das Zimmer' sind neutrum.",
    aussprache: "[haʊs]",
    niveau: "A1",
    synonyme: ["das Gebäude", "die Villa (großes Haus)"],
    haeufigerFehler:
      "Im Plural ändert sich der Artikel zu 'die Häuser' – 'das Häuser' ist falsch, im Plural gibt es nur noch 'die'.",
    deklinationSingular: {
      nominativ: "das Haus",
      akkusativ: "das Haus",
      dativ: "dem Haus",
      genitiv: "des Hauses",
    },
    deklinationPlural: {
      nominativ: "die Häuser",
      akkusativ: "die Häuser",
      dativ: "den Häusern",
      genitiv: "der Häuser",
    },
    beispielsaetze: [
      "Das Haus ist sehr groß.",
      "Wir kaufen ein neues Haus.",
      "Ich sehe das Dach des Hauses.",
      "Vor dem Haus steht ein Baum.",
      "Sie wohnt in einem alten Haus.",
      "Das Fenster des Hauses ist offen.",
      "Wir renovieren das ganze Haus.",
      "Neben dem Haus gibt es einen Garten.",
    ],
    verwandt: ["fenster", "schule"],
    kategorie: "Gebäude",
  },
  {
    slug: "fenster",
    wort: "Fenster",
    artikel: "das",
    genus: "neutrum",
    pluralArtikel: "die",
    plural: "Fenster",
    bedeutung:
      "Ein Fenster ist eine Öffnung in der Wand, meist mit Glas, durch die Licht hereinkommt.",
    aussprache: "[ˈfɛnstɐ]",
    niveau: "A1",
    synonyme: ["die Scheibe (nur das Glas)"],
    haeufigerFehler:
      "'Fenster' bleibt im Plural gleich ('die Fenster') – nur der Artikel ändert sich, nicht die Endung.",
    deklinationSingular: {
      nominativ: "das Fenster",
      akkusativ: "das Fenster",
      dativ: "dem Fenster",
      genitiv: "des Fensters",
    },
    deklinationPlural: {
      nominativ: "die Fenster",
      akkusativ: "die Fenster",
      dativ: "den Fenstern",
      genitiv: "der Fenster",
    },
    beispielsaetze: [
      "Das Fenster ist geöffnet.",
      "Ich mache das Fenster zu.",
      "Der Rahmen des Fensters ist aus Holz.",
      "Wir putzen jedes Fenster im Haus.",
      "Durch das Fenster sieht man den Garten.",
      "Sie öffnet das Fenster im Schlafzimmer.",
      "Am Fenster steht eine Pflanze.",
      "Das kaputte Fenster muss repariert werden.",
    ],
    verwandt: ["haus", "tisch"],
    kategorie: "Gebäude",
  },
  {
    slug: "buch",
    wort: "Buch",
    artikel: "das",
    genus: "neutrum",
    pluralArtikel: "die",
    plural: "Bücher",
    bedeutung: "Ein Buch besteht aus bedruckten oder beschriebenen Seiten, die zusammengebunden sind.",
    aussprache: "[buːx]",
    niveau: "A1",
    synonyme: ["der Roman (Erzählung)", "das Werk (gehoben)"],
    haeufigerFehler:
      "Der Genitiv 'des Buches' wird oft zu 'des Buchs' verkürzt – beides ist korrekt, 'des Buches' ist die vollere, formellere Form.",
    deklinationSingular: {
      nominativ: "das Buch",
      akkusativ: "das Buch",
      dativ: "dem Buch",
      genitiv: "des Buches",
    },
    deklinationPlural: {
      nominativ: "die Bücher",
      akkusativ: "die Bücher",
      dativ: "den Büchern",
      genitiv: "der Bücher",
    },
    beispielsaetze: [
      "Das Buch liegt auf dem Tisch.",
      "Ich lese ein spannendes Buch.",
      "Der Titel des Buches gefällt mir.",
      "Sie schenkt mir ein neues Buch.",
      "In dem Buch geht es um Liebe.",
      "Wir kaufen drei Bücher für die Schule.",
      "Das Buch hat über dreihundert Seiten.",
      "Leg das Buch bitte zurück ins Regal.",
    ],
    verwandt: ["tisch", "zeitung", "schule"],
    kategorie: "Gegenstände",
  },
  {
    slug: "zeitung",
    wort: "Zeitung",
    artikel: "die",
    genus: "feminin",
    pluralArtikel: "die",
    plural: "Zeitungen",
    bedeutung: "Eine Zeitung ist eine regelmäßig erscheinende Druckschrift mit aktuellen Nachrichten.",
    merksatz: "Wörter mit der Endung -ung sind fast immer feminin, wie 'die Zeitung' oder 'die Übung'.",
    aussprache: "[ˈtsaɪtʊŋ]",
    niveau: "A2",
    synonyme: ["die Presse", "das Blatt (umgangssprachlich)"],
    haeufigerFehler:
      "Substantive auf -ung sind so gut wie immer feminin – ein 'der Zeitung' oder 'das Zeitung' ist immer falsch.",
    deklinationSingular: {
      nominativ: "die Zeitung",
      akkusativ: "die Zeitung",
      dativ: "der Zeitung",
      genitiv: "der Zeitung",
    },
    deklinationPlural: {
      nominativ: "die Zeitungen",
      akkusativ: "die Zeitungen",
      dativ: "den Zeitungen",
      genitiv: "der Zeitungen",
    },
    beispielsaetze: [
      "Die Zeitung liegt auf dem Tisch.",
      "Ich lese jeden Morgen die Zeitung.",
      "Der Artikel der Zeitung ist interessant.",
      "Er kauft die Zeitung am Kiosk.",
      "In der Zeitung steht eine wichtige Nachricht.",
      "Wir abonnieren eine lokale Zeitung.",
      "Die alte Zeitung wird recycelt.",
      "Hast du die Zeitung von heute gesehen?",
    ],
    verwandt: ["buch", "schule"],
    kategorie: "Gegenstände",
  },
  {
    slug: "katze",
    wort: "Katze",
    artikel: "die",
    genus: "feminin",
    pluralArtikel: "die",
    plural: "Katzen",
    bedeutung: "Eine Katze ist ein kleines, oft als Haustier gehaltenes Raubtier.",
    merksatz: "Wörter mit der Endung -e sind häufig feminin, wie 'die Katze' oder 'die Blume'.",
    aussprache: "[ˈkatsə]",
    niveau: "A1",
    synonyme: ["der Kater (männlich)", "das Kätzchen (Jungtier)"],
    haeufigerFehler:
      "Achtung: das männliche Tier heißt 'der Kater', nicht 'der Katze' – das Genus wechselt beim Wort für das Männchen.",
    redewendungen: [
      {
        ausdruck: "die Katze im Sack kaufen",
        bedeutung: "etwas kaufen, ohne es vorher geprüft zu haben",
        beispiel: "Kauf das Auto nicht ungesehen, sonst kaufst du die Katze im Sack.",
      },
    ],
    deklinationSingular: {
      nominativ: "die Katze",
      akkusativ: "die Katze",
      dativ: "der Katze",
      genitiv: "der Katze",
    },
    deklinationPlural: {
      nominativ: "die Katzen",
      akkusativ: "die Katzen",
      dativ: "den Katzen",
      genitiv: "der Katzen",
    },
    beispielsaetze: [
      "Die Katze schläft auf dem Sofa.",
      "Ich füttere die Katze jeden Abend.",
      "Das Fell der Katze ist schwarz.",
      "Wir haben eine neue Katze adoptiert.",
      "Die Katze jagt eine Maus im Garten.",
      "Er streichelt die Katze vorsichtig.",
      "Die kleine Katze miaut laut.",
      "Meine Nachbarin hat drei Katzen.",
    ],
    verwandt: ["hund", "blume"],
    kategorie: "Tiere",
  },
  {
    slug: "hund",
    wort: "Hund",
    artikel: "der",
    genus: "maskulin",
    pluralArtikel: "die",
    plural: "Hunde",
    bedeutung: "Ein Hund ist ein treues Haustier, das oft als Begleiter oder Wachtier gehalten wird.",
    aussprache: "[hʊnt]",
    niveau: "A1",
    synonyme: ["der Wauwau (Kindersprache)", "der Vierbeiner (umgangssprachlich)"],
    haeufigerFehler:
      "Am Wortende steht 'd', aber es wird wie 't' gesprochen ('Hunt'). Im Plural und vor Vokal hört man das 'd' wieder: 'die Hunde'.",
    deklinationSingular: {
      nominativ: "der Hund",
      akkusativ: "den Hund",
      dativ: "dem Hund",
      genitiv: "des Hundes",
    },
    deklinationPlural: {
      nominativ: "die Hunde",
      akkusativ: "die Hunde",
      dativ: "den Hunden",
      genitiv: "der Hunde",
    },
    beispielsaetze: [
      "Der Hund bellt sehr laut.",
      "Ich gehe mit dem Hund spazieren.",
      "Das Fell des Hundes ist braun.",
      "Wir füttern den Hund zweimal am Tag.",
      "Der kleine Hund spielt im Garten.",
      "Sie streichelt den Hund sanft.",
      "Der Hund liegt vor der Tür.",
      "Mein Bruder hat einen großen Hund.",
    ],
    verwandt: ["katze", "haus"],
    kategorie: "Tiere",
  },
  {
    slug: "blume",
    wort: "Blume",
    artikel: "die",
    genus: "feminin",
    pluralArtikel: "die",
    plural: "Blumen",
    bedeutung: "Eine Blume ist eine Pflanze mit auffälligen, oft bunten Blüten.",
    merksatz: "Wie 'die Katze' endet auch 'die Blume' auf -e und ist feminin.",
    aussprache: "[ˈbluːmə]",
    niveau: "A1",
    synonyme: ["die Pflanze (Oberbegriff)", "die Blüte (nur der Blütenteil)"],
    haeufigerFehler:
      "Der Plural bekommt ein -n statt -en: 'die Blumen', nicht 'die Blumene'.",
    deklinationSingular: {
      nominativ: "die Blume",
      akkusativ: "die Blume",
      dativ: "der Blume",
      genitiv: "der Blume",
    },
    deklinationPlural: {
      nominativ: "die Blumen",
      akkusativ: "die Blumen",
      dativ: "den Blumen",
      genitiv: "der Blumen",
    },
    beispielsaetze: [
      "Die Blume blüht im Frühling.",
      "Ich schenke ihr eine rote Blume.",
      "Der Duft der Blume ist stark.",
      "Wir gießen die Blumen jeden Tag.",
      "Die Blume steht in einer Vase.",
      "Sie pflanzt neue Blumen im Garten.",
      "Die gelbe Blume gefällt mir sehr.",
      "Am Fenster stehen viele Blumen.",
    ],
    verwandt: ["katze", "fenster"],
    kategorie: "Pflanzen",
  },
  {
    slug: "schule",
    wort: "Schule",
    artikel: "die",
    genus: "feminin",
    pluralArtikel: "die",
    plural: "Schulen",
    bedeutung: "Eine Schule ist eine Bildungseinrichtung, in der Kinder und Jugendliche unterrichtet werden.",
    aussprache: "[ˈʃuːlə]",
    niveau: "A1",
    synonyme: ["die Bildungseinrichtung (formell)", "das Gymnasium (weiterführende Schule)"],
    haeufigerFehler:
      "'Zur Schule gehen' braucht Dativ ('zur' = zu der), nicht Akkusativ – ein häufiger Fehler ist 'zur Schule' durch 'in die Schule' korrekt zu ersetzen, je nach Bedeutung.",
    deklinationSingular: {
      nominativ: "die Schule",
      akkusativ: "die Schule",
      dativ: "der Schule",
      genitiv: "der Schule",
    },
    deklinationPlural: {
      nominativ: "die Schulen",
      akkusativ: "die Schulen",
      dativ: "den Schulen",
      genitiv: "der Schulen",
    },
    beispielsaetze: [
      "Die Schule beginnt um acht Uhr.",
      "Ich gehe jeden Tag zur Schule.",
      "Das Gebäude der Schule ist neu.",
      "Wir besuchen die Schule in der Stadt.",
      "Die Schule hat viele Klassenzimmer.",
      "Er verlässt die Schule um vier Uhr.",
      "Die neue Schule liegt neben dem Park.",
      "Meine Kinder mögen ihre Schule sehr.",
    ],
    verwandt: ["buch", "haus"],
    kategorie: "Orte",
  },
];

export function getWordsByArtikel(artikel: Artikel): Wort[] {
  return woerter.filter((w) => w.artikel === artikel);
}

export function getAllWords(): Wort[] {
  return woerter;
}

export function getWordBySlug(slug: string): Wort | undefined {
  return woerter.find((w) => w.slug === slug);
}

export function getRelatedWords(wort: Wort): Wort[] {
  return wort.verwandt
    .map((slug) => getWordBySlug(slug))
    .filter((w): w is Wort => Boolean(w));
}
