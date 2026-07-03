# Artikel-Finder

Almanca "der / die / das" artikellerini bulmaya yardımcı olan Next.js (App Router + TypeScript) sitesi.

## Kurulum

```bash
npm install
npm run dev
```

Tarayıcıda `http://localhost:3000` adresini aç.

## Proje yapısı

```
app/
  page.tsx                 → Ana sayfa (hero, der/die/das açıklaması, öne çıkan kelimeler, FAQ)
  artikel/page.tsx         → Tüm kelimelerin listesi (/artikel)
  artikel/[slug]/page.tsx  → Her kelime için içerik sayfası (/artikel/tisch gibi)
  ueber/page.tsx           → Hakkımızda sayfası
  layout.tsx               → Ortak header/footer, fontlar, metadata
  globals.css              → Renk/tipografi değişkenleri (der=mavi, die=kırmızı, das=yeşil)

components/
  SearchBox.tsx             → Ana sayfadaki canlı arama kutusu (client component)
  Faq.tsx                    → Akordeon FAQ (client component)
  DeclensionTable.tsx        → Nominativ/Akkusativ/Dativ/Genitiv tablosu
  ArticleBadge.tsx           → der/die/das rozeti
  WordCard.tsx                → Kelime listesi kartı (internal linking için kullanılıyor)

data/
  woerter.ts                → Kelime veritabanı (TypeScript, JSON yerine tipli obje dizisi)
```

## Yeni kelime eklemek

`data/woerter.ts` dosyasındaki `woerter` dizisine yeni bir obje eklemen yeterli.
Her kelime şu alanları içermeli:

- `slug`: URL'de kullanılacak kısa isim (örn. `tisch` → `/artikel/tisch`)
- `wort`, `artikel` (der/die/das), `genus`, `plural`
- `bedeutung`: basit açıklama
- `merksatz` (opsiyonel): hatırlatma ipucu
- `deklinationSingular` / `deklinationPlural`: Nominativ, Akkusativ, Dativ, Genitiv
- `beispielsaetze`: 8 örnek cümle (dizi)
- `verwandt`: iç linkleme için ilişkili kelimelerin slug'ları
- `kategorie`: gruplama için (Möbel, Tiere, vs.)

Yeni kelime eklendiğinde:
- `/artikel/[slug]` sayfası otomatik oluşur (`generateStaticParams` sayesinde)
- `/artikel` listesine otomatik eklenir
- Diğer kelimelerin `verwandt` alanına slug'ını ekleyerek iç linkleme kurabilirsin

## Yayına alma (deploy)

Proje statik/SSG uyumludur. En kolay yol Vercel:

```bash
npm run build
```

`npm run build` çalıştıktan sonra Vercel'e bağlayıp deploy edebilir ya da
`next start` ile kendi sunucunda çalıştırabilirsin.

## Notlar

- Tasarımda "kütüphane fişi / sözlük" estetiği kullanıldı: der=mavi, die=kırmızı, das=yeşil
  kenar şeridi ile her kelime kartında artikel anında görülebiliyor.
- SEO için her kelime sayfasında `generateMetadata` ile başlık/açıklama ve
  `DefinedTerm` şemasıyla JSON-LD ekleniyor.
- Fontlar Google Fonts üzerinden yükleniyor (Fraunces, Inter, IBM Plex Mono) —
  internet bağlantısı gerektirir; offline kullanım için `next/font/google` ile
  değiştirilebilir.
