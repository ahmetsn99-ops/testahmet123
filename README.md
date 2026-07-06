# Artikelfinder — Proje Rehberi

## Kurulum
```
npm install
npm run dev       # geliştirme sunucusu -> http://localhost:3000
npm run build     # üretim (production) derlemesi
npm start         # üretim sunucusunu baslat
```

## Yeni Kelime Eklemek / Ölçeklendirmek
1. `scripts/de_top_words_final.csv` dosyasına (veya güncel CSV'ye) kelimeleri ekle
2. `scripts/generate_words.py` içindeki `CATEGORY`, `TEMPLATES`, `TRANSLATIONS` sözlüklerine
   yeni kelimeleri/kategorileri ekle
3. Çalıştır: `python3 scripts/generate_words.py`
4. `data/words/*.json` ve `data/index/*.json` otomatik güncellenir
5. `npm run build` ile siteyi yeniden derle

## Klasör Yapısı
- `app/` — Next.js sayfaları (App Router)
- `components/` — Tekrar kullanılan UI bileşenleri
- `lib/words.ts` — Veri okuma katmanı
- `data/words/` — Her kelime için 1 JSON dosyası
- `data/index/` — Kategori/arama için hafif index dosyaları
- `scripts/` — İçerik üretim script'i + kaynak CSV

## Yayına Almadan Önce Yapılması Gerekenler
- `app/impressum/page.tsx` — gerçek isim/adres bilgisiyle değiştir (Almanya'da yasal zorunluluk)
- `app/kontakt/page.tsx` — gerçek e-posta adresi
- `app/datenschutz/page.tsx` — AdSense/Analytics kullanımına göre güncel bir
  Datenschutz-Generator ile gözden geçir
- `metadataBase` (app/layout.tsx) ve sitemap.ts içindeki domain'i gerçek domain ile değiştir
- 46 kelimelik demo veri setini 13.000+ kelimeye ölçeklendir (script hazır, veri de hazır)
