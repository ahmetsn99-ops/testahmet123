# Artikel Finder

Almanca "der / die / das" artikellerini bulmaya yardımcı olan, tek dilli
(sadece Almanca), hız odaklı Next.js (App Router + TypeScript) sitesi.

## Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini aç.

## URL yapısı

```
/                      → Ana sayfa: arama, popüler kelimeler, 3 kategori, kurallar, FAQ
/der                   → der-Wörter kategori sayfası (tüm maskulin kelimeler)
/die                   → die-Wörter kategori sayfası (tüm feminin kelimeler)
/das                   → das-Wörter kategori sayfası (tüm nötr kelimeler)
/der/tisch             → Kelime içerik sayfası (örnek)
/die/katze             → Kelime içerik sayfası (örnek)
/das/haus              → Kelime içerik sayfası (örnek)
/ueber                 → Hakkımızda
/sitemap.xml           → Otomatik oluşan site haritası
/robots.txt            → Otomatik oluşan robots dosyası
```

## Proje yapısı

```
app/
  page.tsx                     → Ana sayfa
  [artikel]/page.tsx           → Kategori sayfası (der/die/das)
  [artikel]/[slug]/page.tsx    → Kelime içerik sayfası
  ueber/page.tsx                → Hakkımızda
  layout.tsx                    → Header/footer, font, metadata
  globals.css                   → Renk/tipografi tokenları
  sitemap.ts / robots.ts        → SEO dosyaları

components/
  SearchBox.tsx        → Canlı arama kutusu (client)
  Faq.tsx              → Akordeon FAQ (client)
  DeclensionTable.tsx  → Nominativ/Akkusativ/Dativ/Genitiv tablosu
  GrammarRulesTable.tsx→ Ek/artikel eşleşme tablosu
  ArticleBadge.tsx     → der/die/das rozeti
  WordCard.tsx         → Kelime kartı (iç linkleme için)
  CopyButton.tsx       → "der Tisch" gibi metni kopyalama butonu (client)
  AdSlot.tsx           → AdSense yer tutucu

lib/
  wordFaq.ts     → Her kelime için otomatik 5 soruluk FAQ üretir
  highlight.tsx  → Örnek cümlelerde kelimeyi vurgular

data/
  woerter.ts     → Kelime veritabanı (TypeScript tipli obje dizisi)
```

## Yeni kelime eklemek

`data/woerter.ts` dosyasındaki `woerter` dizisine yeni bir obje eklemen yeterli.
Alanlar: `slug`, `wort`, `artikel` (der/die/das), `genus`, `plural`, `bedeutung`,
`merksatz` (opsiyonel), `aussprache`, `niveau` (A1/A2/B1), `synonyme`,
`haeufigerFehler`, `redewendungen` (opsiyonel), `deklinationSingular`,
`deklinationPlural`, `beispielsaetze` (8 cümle), `verwandt` (iç linkleme
için slug listesi), `kategorie`.

Eklendiğinde otomatik olarak:
- `/[artikel]/[slug]` sayfası oluşur
- İlgili `/[artikel]` kategori sayfasına eklenir
- `sitemap.xml`'e eklenir
- FAQ ve kelime kartları otomatik üretilir

## Performans / hız kararları

- Font: sadece **Inter**, `next/font/google` ile derleme sırasında indirilip
  kendi sunucundan sunuluyor (harici Google Fonts isteği yok → render-blocking yok)
- Görsel yok, ağır animasyon/gradient yok → düşük CSS/JS yükü
- Tüm sayfalar `generateStaticParams` ile derleme zamanında statik üretiliyor (SSG)
- Tek renk paleti + sistem monospace fontu → ekstra font indirmesi yok

## Google AdSense reklamlarını aktif etme

Şu an sitede `components/AdSlot.tsx` ile gösterilen kesikli çizgili kutular sadece
**yer tutucu**. Gerçek reklamları göstermek için:

1. [google.com/adsense](https://www.google.com/adsense) üzerinden hesap aç.
2. `app/layout.tsx` içindeki `<head>`e (veya bir `<Script>` bileşenine) AdSense
   doğrulama script'ini ekle:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXX" crossOrigin="anonymous" />
   ```
3. `components/AdSlot.tsx` içindeki yorumdaki gerçek `<ins className="adsbygoogle">`
   kodunu aktif hale getir, `data-ad-client` / `data-ad-slot` değerlerini kendi
   panelinden al.
4. Yer tutucu `className="ad-slot"` çerçevesini kaldır.

## Yayına alma (deploy)

```bash
npm run build
```

Vercel'e bağlayıp otomatik deploy edebilir ya da `next start` ile kendi
sunucunda çalıştırabilirsin. `app/layout.tsx` ve `app/sitemap.ts` /
`app/robots.ts` içindeki `artikel-finder.example.de` adresini gerçek alan
adınla değiştirmeyi unutma.
