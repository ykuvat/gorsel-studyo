/* KUVAT Görsel Stüdyosu — service worker
   Uygulamayı çevrimdışı çalışabilir hale getirir.
   Yeni sürüm yayınladığında aşağıdaki CACHE_VERSION'ı artır (v2, v3 ...) ki
   kullanıcıların tarayıcısı eski sürümde takılı kalmasın. */

const CACHE_VERSION = "kuvat-gorsel-v3";
const APP_SHELL = [
  "./",
  "./index.html",
  "./manifest.json",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-512-maskable.png",
  "./apple-touch-icon.png",
  "./favicon.png"
];

// Kurulum: uygulama dosyalarını önbelleğe al
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION)
      .then((cache) => cache.addAll(APP_SHELL))
      .then(() => self.skipWaiting())
      .catch((err) => console.warn("[SW] Önbellekleme hatası:", err))
  );
});

// Etkinleşme: eski sürümlerin önbelleğini temizle
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(
        keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const req = event.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);
  const isFont =
    url.hostname === "fonts.googleapis.com" ||
    url.hostname === "fonts.gstatic.com";

  // Yazı tipleri: önce önbellek, yoksa ağdan al ve sakla (çevrimdışı da çalışsın)
  if (isFont) {
    event.respondWith(
      caches.match(req).then((hit) => {
        if (hit) return hit;
        return fetch(req).then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        }).catch(() => hit);
      })
    );
    return;
  }

  // Aynı kaynaktaki dosyalar: önce ağ (güncel sürüm), olmazsa önbellek
  if (url.origin === self.location.origin) {
    event.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then((hit) => hit || caches.match("./index.html")))
    );
  }
});
