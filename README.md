# KUVAT Görsel Stüdyosu

ATSO sosyal medya görselleri için tek dosyalık üretim aracı. GitHub Pages üzerinde
yayınlanır, telefona ve masaüstüne **uygulama gibi kurulur**, internet olmadan da çalışır.

---

## Klasördeki dosyalar

| Dosya | Ne işe yarar |
|---|---|
| `index.html` | Uygulamanın kendisi (tüm kod, logolar ve başkan fotoğrafları içinde gömülü) |
| `manifest.json` | Uygulama adı, ikonu, rengi — "kurulabilir" olmasını sağlar |
| `sw.js` | Service worker — çevrimdışı çalışmayı sağlar |
| `icon-192.png`, `icon-512.png`, `icon-512-maskable.png` | Uygulama ikonları |
| `apple-touch-icon.png` | iPhone/iPad ana ekran ikonu |
| `favicon.png` | Tarayıcı sekmesi ikonu |

> **Önemli:** Bu dosyaların hepsi **aynı klasörde** olmalı. `index.html` adı değişmemeli.

---

## 1. GitHub'a yükleme

### Yöntem A — Tarayıcıdan (en kolay, terminal gerekmez)

1. [github.com](https://github.com) → giriş yap → sağ üstteki **+** → **New repository**
2. **Repository name:** `gorsel-studyosu` (istediğin ismi verebilirsin)
3. **Public** seç (GitHub Pages ücretsiz planda public repo ister)
4. **Create repository**
5. Açılan sayfada **uploading an existing file** bağlantısına tıkla
6. Bu klasördeki **tüm dosyaları** sürükle-bırak ile yükle
7. Altta **Commit changes** butonuna bas

### Yöntem B — Terminalden

```bash
cd bu-klasor
git init
git add .
git commit -m "KUVAT Görsel Stüdyosu ilk sürüm"
git branch -M main
git remote add origin https://github.com/KULLANICI-ADIN/gorsel-studyosu.git
git push -u origin main
```

---

## 2. GitHub Pages'i açma

1. Repo sayfasında üstteki **Settings** sekmesi
2. Sol menüden **Pages**
3. **Source** → `Deploy from a branch`
4. **Branch** → `main`, klasör `/ (root)` → **Save**
5. 1–2 dakika bekle, sayfayı yenile

Adresin şu şekilde olacak:

```
https://KULLANICI-ADIN.github.io/gorsel-studyosu/
```

---

## 3. Uygulama olarak kurma

Yukarıdaki adresi **Chrome veya Edge** ile aç:

**Masaüstü (Windows):**
- Adres çubuğunun sağındaki **kur / install** simgesine tıkla
- Ya da: ⋮ menüsü → **Uygulamayı yükle** / **Install**
- Artık Başlat menüsünde normal bir program gibi görünür, kendi penceresinde açılır

**Android:**
- ⋮ menüsü → **Uygulamayı yükle** / **Ana ekrana ekle**

**iPhone / iPad (Safari ile açmalısın):**
- Paylaş simgesi → **Ana Ekrana Ekle**

Kurduktan sonra internet olmadan da açılır ve çalışır.

---

## 4. Güncelleme yapmak istersen

1. Yeni `index.html`'i GitHub'da eski dosyanın üstüne yükle (aynı isimle)
2. **`sw.js` dosyasını aç ve sürüm numarasını artır:**

   ```js
   const CACHE_VERSION = "kuvat-gorsel-v1";   // -> "kuvat-gorsel-v2"
   ```

   Bu adım **çok önemli**. Yapmazsan kullanıcıların tarayıcısı eski sürümü
   önbellekten açmaya devam eder ve değişiklikleri göremezler.

3. Kurulu uygulamayı kapatıp tekrar aç — yeni sürüm gelir.

---

## Bilinmesi gerekenler

- **Veriler cihazda saklanır.** Yüklediğin şablonlar, logolar, kişi fotoğrafları ve
  Geçmiş kayıtları tarayıcının kendi deposundadır. Başka bilgisayarda açarsan
  orada görünmezler; bunlar internete gönderilmez, bir sunucuda tutulmaz.
- **Repo public olacak.** İçindeki başkan fotoğrafları ve logolar da herkese açık olur.
  Bunun sakıncası varsa: repoyu **private** yapıp GitHub Pages yerine kurum içi bir
  sunucuda yayınlamak gerekir (Pages private repolarda ücretli plan ister).
- **Yazı tipleri** ilk açılışta internetten yüklenir, sonra çevrimdışı için saklanır.
  Hiç internet olmadan ilk kez açılırsa yazılar varsayılan fonta düşer.
- Uygulamayı sıfırlamak için içindeki **Verileri Sıfırla** butonunu kullan.
