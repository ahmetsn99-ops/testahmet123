"""
Artikelfinder icerik ureteci.
Bu script, temiz kelime CSV'sinden her kelime icin:
- kategori
- 10 gramatik olarak farkli ornek cumle
- quiz sorusu (dogru + 2 yanlis sik)
- 10 dilde ceviri
iceren tek bir JSON dosyasi uretir: data/words/<slug>.json

Yeni kelime eklemek icin: CSV'ye satir ekle, kategori/ceviri sozlugune gir, tekrar calistir.
"""
import json
import re
import unicodedata

# --- 1. Kategori atamasi (elle dogrulanmis, guvenilir) ---
CATEGORY = {
    'Tisch': 'mobilya', 'Stuhl': 'mobilya', 'Bett': 'mobilya', 'Fenster': 'mobilya', 'Tür': 'mobilya',
    'Haus': 'yer', 'Stadt': 'yer', 'Land': 'yer', 'Schule': 'yer', 'Küche': 'yer', 'Garten': 'yer', 'Straße': 'yer',
    'Katze': 'hayvan', 'Hund': 'hayvan', 'Pferd': 'hayvan', 'Vogel': 'hayvan', 'Fisch': 'hayvan', 'Maus': 'hayvan',
    'Frau': 'insan', 'Freund': 'insan', 'Freundin': 'insan', 'Kind': 'insan', 'Arzt': 'insan', 'Lehrer': 'insan',
    'Auto': 'esya', 'Buch': 'esya', 'Glas': 'esya', 'Messer': 'esya', 'Löffel': 'esya', 'Gabel': 'esya', 'Teller': 'esya',
    'Wasser': 'yiyecek_icecek', 'Kaffee': 'yiyecek_icecek', 'Tee': 'yiyecek_icecek', 'Milch': 'yiyecek_icecek',
    'Brot': 'yiyecek_icecek', 'Zucker': 'yiyecek_icecek', 'Salz': 'yiyecek_icecek', 'Apfel': 'yiyecek_icecek',
    'Sonne': 'doga', 'Mond': 'doga', 'Stern': 'doga', 'Baum': 'doga', 'Blume': 'doga',
    'Kopf': 'vucut', 'Hand': 'vucut', 'Auge': 'vucut',
}

# --- 2. Kategoriye gore cumle sablonlari ---
# {w}=yalin isim, {art}=der/die/das, {akk}=akkusativ tekil belirteci, {dat}=dativ tekil belirteci,
# {gen}=genitiv tekil hali, {pl}=cogul, {plart}= cogul icin "die"
TEMPLATES = {
    'mobilya': [
        "{ArtCap} {w} steht im Zimmer.",
        "Ich sehe {akk} {w}.",
        "Ich sitze an {dat} {w}.",
        "Die Farbe {gen_phrase} ist braun.",
        "Die {pl} stehen im Raum.",
        "Wir kaufen die {pl}.",
        "Das ist {ein} schöner {w}.",
        "Ich brauche {einAkk} neuen {w}.",
        "{ArtCap} {w} ist aus Holz.",
        "Neben {dat} {w} liegt ein Teppich.",
    ],
    'yer': [
        "{ArtCap} {w} ist sehr groß.",
        "Wir besuchen {akk} {w}.",
        "Ich wohne in {dat} {w}.",
        "Die Geschichte {gen_phrase} ist interessant.",
        "Die {pl} sind in Europa bekannt.",
        "Viele Menschen mögen die {pl}.",
        "Das ist {ein} schöner {w}.",
        "Ich besuche {einAkk} neuen {w}.",
        "{ArtCap} {w} liegt am Fluss.",
        "In {dat} {w} gibt es viele Menschen.",
    ],
    'hayvan': [
        "{ArtCap} {w} schläft auf dem Sofa.",
        "Ich füttere {akk} {w}.",
        "Ich spiele mit {dat} {w}.",
        "Der Schwanz {gen_phrase} ist lang.",
        "Die {pl} leben im Wald.",
        "Wir beobachten die {pl}.",
        "Das ist {ein} kleiner {w}.",
        "Wir haben {einAkk} neuen {w}.",
        "{ArtCap} {w} läuft schnell.",
        "Neben {dat} {w} sitzt ein Kind.",
    ],
    'insan': [
        "{ArtCap} {w} arbeitet jeden Tag.",
        "Ich kenne {akk} {w}.",
        "Ich spreche mit {dat} {w}.",
        "Der Name {gen_phrase} ist bekannt.",
        "Die {pl} treffen sich oft.",
        "Wir helfen den {pl}.",
        "Das ist {ein} freundlicher {w}.",
        "Ich habe {einAkk} guten {w}.",
        "{ArtCap} {w} wohnt in der Stadt.",
        "Ich vertraue {dat} {w}.",
    ],
    'esya': [
        "{ArtCap} {w} liegt auf dem Tisch.",
        "Ich benutze {akk} {w}.",
        "Ich schneide mit {dat} {w}.",
        "Der Preis {gen_phrase} ist hoch.",
        "Die {pl} sind im Schrank.",
        "Wir brauchen die {pl}.",
        "Das ist {ein} nützlicher {w}.",
        "Ich kaufe {einAkk} neuen {w}.",
        "{ArtCap} {w} ist sehr praktisch.",
        "Neben {dat} {w} liegt eine Serviette.",
    ],
    'yiyecek_icecek': [
        "{ArtCap} {w} schmeckt gut.",
        "Ich trinke {akk} {w} gern." if False else "Ich mag {akk} {w}.",
        "Ich koche mit {dat} {w}.",
        "Der Geschmack {gen_phrase} ist stark.",
        "Die {pl} stehen im Regal.",
        "Wir kaufen die {pl}.",
        "Das ist {ein} frischer {w}.",
        "Ich nehme {einAkk} neuen {w}.",
        "{ArtCap} {w} ist gesund.",
        "Ohne {akk} {w} schmeckt es nicht.",
    ],
    'doga': [
        "{ArtCap} {w} scheint hell." if False else "{ArtCap} {w} ist heute schön.",
        "Ich sehe {akk} {w}.",
        "Ich freue mich über {akk} {w}.",
        "Die Farbe {gen_phrase} ist leuchtend.",
        "Die {pl} sind am Himmel." if False else "Die {pl} stehen im Garten.",
        "Wir beobachten die {pl}.",
        "Das ist {ein} schöner {w}.",
        "Ich male {einAkk} {w}.",
        "{ArtCap} {w} ist wunderschön.",
        "Neben {dat} {w} steht eine Bank.",
    ],
    'vucut': [
        "{ArtCap} {w} tut weh.",
        "Ich wasche {akk} {w}.",
        "Ich denke mit {dat} {w}." if False else "Ich berühre {akk} {w} vorsichtig.",
        "Die Form {gen_phrase} ist rund.",
        "Die {pl} sind wichtig.",
        "Wir schützen die {pl}.",
        "Das ist {ein} starker {w}.",
        "Ich habe {einAkk} {w}.",
        "{ArtCap} {w} bewegt sich.",
        "Neben {dat} {w} ist eine Narbe.",
    ],
}

AKK = {'der': 'den', 'die': 'die', 'das': 'das'}
DAT = {'der': 'dem', 'die': 'der', 'das': 'dem'}
EIN = {'der': 'ein', 'die': 'eine', 'das': 'ein'}
EIN_AKK = {'der': 'einen', 'die': 'eine', 'das': 'ein'}


def fix_genitiv(word, artikel, genitiv_from_data):
    """s/ß/z/x/sch ile biten der/das kelimeleri -es alir (Tisches, Hauses gibi).
    Digerleri icin veri setindeki degeri kullan (genelde -s ekler, o da dogrudur)."""
    if artikel == 'die':
        return genitiv_from_data  # die kelimeleri genitivde degismez
    if re.search(r'(sch|[sßzx])$', word):
        return word + 'es'
    return genitiv_from_data


def slugify(w):

    n = unicodedata.normalize('NFKD', w)
    n = n.replace('ä', 'ae').replace('ö', 'oe').replace('ü', 'ue').replace('ß', 'ss')
    n = n.replace('Ä', 'Ae').replace('Ö', 'Oe').replace('Ü', 'Ue')
    n = re.sub(r'[^a-zA-Z0-9]', '', n)
    return n.lower()


def build_sentences(word, artikel, plural, genitiv, category):
    pool = TEMPLATES.get(category, TEMPLATES['esya'])
    art_cap = artikel.capitalize()
    akk = AKK[artikel]
    dat = DAT[artikel]
    ein = EIN[artikel]
    ein_akk = EIN_AKK[artikel]
    gen_phrase = f"{DAT[artikel] if False else ('des' if artikel in ('der','das') else 'der')} {genitiv}"
    pl_display = plural if plural != '-' else word
    sentences = []
    for tpl in pool:
        s = tpl.format(w=word, ArtCap=art_cap, akk=akk, dat=dat, ein=ein, einAkk=ein_akk,
                        gen_phrase=gen_phrase, pl=pl_display)
        sentences.append(s)
    return sentences


def build_quiz(word, artikel):
    all_arts = ['der', 'die', 'das']
    wrong = [a for a in all_arts if a != artikel]
    return {
        "frage": f'Was ist der richtige Artikel für "{word}"?',
        "richtig": artikel,
        "optionen": sorted([artikel] + wrong),
    }


# --- 3. Guvenilir, elle dogrulanmis 10 dilde ceviri sozlugu (temel/gunluk kelimeler oldugu icin risk dusuk) ---
TRANSLATIONS = {
    'Tisch':   {'tr':'masa','en':'table','ar':'طاولة','es':'mesa','fr':'table','it':'tavolo','ru':'стол','pt':'mesa','nl':'tafel','pl':'stół'},
    'Haus':    {'tr':'ev','en':'house','ar':'منزل','es':'casa','fr':'maison','it':'casa','ru':'дом','pt':'casa','nl':'huis','pl':'dom'},
    'Katze':   {'tr':'kedi','en':'cat','ar':'قطة','es':'gato','fr':'chat','it':'gatto','ru':'кошка','pt':'gato','nl':'kat','pl':'kot'},
    'Hund':    {'tr':'köpek','en':'dog','ar':'كلب','es':'perro','fr':'chien','it':'cane','ru':'собака','pt':'cachorro','nl':'hond','pl':'pies'},
    'Auto':    {'tr':'araba','en':'car','ar':'سيارة','es':'coche','fr':'voiture','it':'auto','ru':'машина','pt':'carro','nl':'auto','pl':'samochód'},
    'Frau':    {'tr':'kadın','en':'woman','ar':'امرأة','es':'mujer','fr':'femme','it':'donna','ru':'женщина','pt':'mulher','nl':'vrouw','pl':'kobieta'},
    'Kind':    {'tr':'çocuk','en':'child','ar':'طفل','es':'niño','fr':'enfant','it':'bambino','ru':'ребёнок','pt':'criança','nl':'kind','pl':'dziecko'},
    'Buch':    {'tr':'kitap','en':'book','ar':'كتاب','es':'libro','fr':'livre','it':'libro','ru':'книга','pt':'livro','nl':'boek','pl':'książka'},
    'Wasser':  {'tr':'su','en':'water','ar':'ماء','es':'agua','fr':'eau','it':'acqua','ru':'вода','pt':'água','nl':'water','pl':'woda'},
    'Brot':    {'tr':'ekmek','en':'bread','ar':'خبز','es':'pan','fr':'pain','it':'pane','ru':'хлеб','pt':'pão','nl':'brood','pl':'chleb'},
    'Apfel':   {'tr':'elma','en':'apple','ar':'تفاحة','es':'manzana','fr':'pomme','it':'mela','ru':'яблоко','pt':'maçã','nl':'appel','pl':'jabłko'},
    'Baum':    {'tr':'ağaç','en':'tree','ar':'شجرة','es':'árbol','fr':'arbre','it':'albero','ru':'дерево','pt':'árvore','nl':'boom','pl':'drzewo'},
    'Sonne':   {'tr':'güneş','en':'sun','ar':'شمس','es':'sol','fr':'soleil','it':'sole','ru':'солнце','pt':'sol','nl':'zon','pl':'słońce'},
    'Mond':    {'tr':'ay','en':'moon','ar':'قمر','es':'luna','fr':'lune','it':'luna','ru':'луна','pt':'lua','nl':'maan','pl':'księżyc'},
    'Stern':   {'tr':'yıldız','en':'star','ar':'نجمة','es':'estrella','fr':'étoile','it':'stella','ru':'звезда','pt':'estrela','nl':'ster','pl':'gwiazda'},
    'Stadt':   {'tr':'şehir','en':'city','ar':'مدينة','es':'ciudad','fr':'ville','it':'città','ru':'город','pt':'cidade','nl':'stad','pl':'miasto'},
    'Land':    {'tr':'ülke','en':'country','ar':'بلد','es':'país','fr':'pays','it':'paese','ru':'страна','pt':'país','nl':'land','pl':'kraj'},
    'Freund':  {'tr':'arkadaş','en':'friend','ar':'صديق','es':'amigo','fr':'ami','it':'amico','ru':'друг','pt':'amigo','nl':'vriend','pl':'przyjaciel'},
    'Freundin':{'tr':'kız arkadaş','en':'girlfriend','ar':'صديقة','es':'amiga','fr':'amie','it':'amica','ru':'подруга','pt':'amiga','nl':'vriendin','pl':'przyjaciółka'},
    'Schule':  {'tr':'okul','en':'school','ar':'مدرسة','es':'escuela','fr':'école','it':'scuola','ru':'школа','pt':'escola','nl':'school','pl':'szkoła'},
    'Lehrer':  {'tr':'öğretmen','en':'teacher','ar':'معلم','es':'profesor','fr':'professeur','it':'insegnante','ru':'учитель','pt':'professor','nl':'leraar','pl':'nauczyciel'},
    'Arzt':    {'tr':'doktor','en':'doctor','ar':'طبيب','es':'médico','fr':'médecin','it':'medico','ru':'врач','pt':'médico','nl':'dokter','pl':'lekarz'},
    'Tür':     {'tr':'kapı','en':'door','ar':'باب','es':'puerta','fr':'porte','it':'porta','ru':'дверь','pt':'porta','nl':'deur','pl':'drzwi'},
    'Fenster': {'tr':'pencere','en':'window','ar':'نافذة','es':'ventana','fr':'fenêtre','it':'finestra','ru':'окно','pt':'janela','nl':'raam','pl':'okno'},
    'Stuhl':   {'tr':'sandalye','en':'chair','ar':'كرسي','es':'silla','fr':'chaise','it':'sedia','ru':'стул','pt':'cadeira','nl':'stoel','pl':'krzesło'},
    'Bett':    {'tr':'yatak','en':'bed','ar':'سرير','es':'cama','fr':'lit','it':'letto','ru':'кровать','pt':'cama','nl':'bed','pl':'łóżko'},
    'Küche':   {'tr':'mutfak','en':'kitchen','ar':'مطبخ','es':'cocina','fr':'cuisine','it':'cucina','ru':'кухня','pt':'cozinha','nl':'keuken','pl':'kuchnia'},
    'Garten':  {'tr':'bahçe','en':'garden','ar':'حديقة','es':'jardín','fr':'jardin','it':'giardino','ru':'сад','pt':'jardim','nl':'tuin','pl':'ogród'},
    'Blume':   {'tr':'çiçek','en':'flower','ar':'زهرة','es':'flor','fr':'fleur','it':'fiore','ru':'цветок','pt':'flor','nl':'bloem','pl':'kwiat'},
    'Vogel':   {'tr':'kuş','en':'bird','ar':'طائر','es':'pájaro','fr':'oiseau','it':'uccello','ru':'птица','pt':'pássaro','nl':'vogel','pl':'ptak'},
    'Fisch':   {'tr':'balık','en':'fish','ar':'سمكة','es':'pez','fr':'poisson','it':'pesce','ru':'рыба','pt':'peixe','nl':'vis','pl':'ryba'},
    'Maus':    {'tr':'fare','en':'mouse','ar':'فأر','es':'ratón','fr':'souris','it':'topo','ru':'мышь','pt':'rato','nl':'muis','pl':'mysz'},
    'Pferd':   {'tr':'at','en':'horse','ar':'حصان','es':'caballo','fr':'cheval','it':'cavallo','ru':'лошадь','pt':'cavalo','nl':'paard','pl':'koń'},
    'Milch':   {'tr':'süt','en':'milk','ar':'حليب','es':'leche','fr':'lait','it':'latte','ru':'молоко','pt':'leite','nl':'melk','pl':'mleko'},
    'Kaffee':  {'tr':'kahve','en':'coffee','ar':'قهوة','es':'café','fr':'café','it':'caffè','ru':'кофе','pt':'café','nl':'koffie','pl':'kawa'},
    'Tee':     {'tr':'çay','en':'tea','ar':'شاي','es':'té','fr':'thé','it':'tè','ru':'чай','pt':'chá','nl':'thee','pl':'herbata'},
    'Zucker':  {'tr':'şeker','en':'sugar','ar':'سكر','es':'azúcar','fr':'sucre','it':'zucchero','ru':'сахар','pt':'açúcar','nl':'suiker','pl':'cukier'},
    'Salz':    {'tr':'tuz','en':'salt','ar':'ملح','es':'sal','fr':'sel','it':'sale','ru':'соль','pt':'sal','nl':'zout','pl':'sól'},
    'Messer':  {'tr':'bıçak','en':'knife','ar':'سكين','es':'cuchillo','fr':'couteau','it':'coltello','ru':'нож','pt':'faca','nl':'mes','pl':'nóż'},
    'Gabel':   {'tr':'çatal','en':'fork','ar':'شوكة','es':'tenedor','fr':'fourchette','it':'forchetta','ru':'вилка','pt':'garfo','nl':'vork','pl':'widelec'},
    'Löffel':  {'tr':'kaşık','en':'spoon','ar':'ملعقة','es':'cuchara','fr':'cuillère','it':'cucchiaio','ru':'ложка','pt':'colher','nl':'lepel','pl':'łyżka'},
    'Glas':    {'tr':'bardak','en':'glass','ar':'كوب','es':'vaso','fr':'verre','it':'bicchiere','ru':'стакан','pt':'copo','nl':'glas','pl':'szklanka'},
    'Kopf':    {'tr':'kafa','en':'head','ar':'رأس','es':'cabeza','fr':'tête','it':'testa','ru':'голова','pt':'cabeça','nl':'hoofd','pl':'głowa'},
    'Hand':    {'tr':'el','en':'hand','ar':'يد','es':'mano','fr':'main','it':'mano','ru':'рука','pt':'mão','nl':'hand','pl':'ręka'},
    'Auge':    {'tr':'göz','en':'eye','ar':'عين','es':'ojo','fr':'œil','it':'occhio','ru':'глаз','pt':'olho','nl':'oog','pl':'oko'},
    'Straße':  {'tr':'cadde','en':'street','ar':'شارع','es':'calle','fr':'rue','it':'strada','ru':'улица','pt':'rua','nl':'straat','pl':'ulica'},
}

if __name__ == '__main__':
    import pandas as pd
    df = pd.read_csv('scripts/de_top_words_final.csv')
    demo_words = list(CATEGORY.keys())
    df = df[df['kelime'].isin(demo_words)].reset_index(drop=True)

    all_index = []
    for _, row in df.iterrows():
        word = row['kelime']
        artikel = row['artikel']
        plural = row['cogul']
        genitiv = fix_genitiv(word, artikel, row['genitiv_tekil'])
        freq = int(row['frekans'])
        category = CATEGORY.get(word, 'esya')
        slug = slugify(word)

        data = {
            "slug": slug,
            "wort": word,
            "artikel": artikel,
            "plural": plural,
            "genitiv_singular": genitiv,
            "kategorie": category,
            "haeufigkeit_rang": int(row['sira']),
            "saetze": build_sentences(word, artikel, plural, genitiv, category),
            "quiz": build_quiz(word, artikel),
            "uebersetzungen": TRANSLATIONS.get(word, {}),
        }
        with open(f'data/words/{slug}.json', 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)

        all_index.append({"slug": slug, "wort": word, "artikel": artikel, "kategorie": category})

    with open('data/index/all-words.json', 'w', encoding='utf-8') as f:
        json.dump(sorted(all_index, key=lambda x: x['wort']), f, ensure_ascii=False, indent=2)

    for art in ['der', 'die', 'das']:
        subset = [w for w in all_index if w['artikel'] == art]
        with open(f'data/index/{art}.json', 'w', encoding='utf-8') as f:
            json.dump(sorted(subset, key=lambda x: x['wort']), f, ensure_ascii=False, indent=2)

    print(f"Uretilen kelime sayisi: {len(all_index)}")
    print("der:", len([w for w in all_index if w['artikel']=='der']))
    print("die:", len([w for w in all_index if w['artikel']=='die']))
    print("das:", len([w for w in all_index if w['artikel']=='das']))
