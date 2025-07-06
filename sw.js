const CACHE_NAME = 'tarot-katalog-cache-v1';

// Çevrimdışı kullanım için önbelleğe alınacak dosyaların tam listesi
const URLS_TO_CACHE = [
    '/',
    'index.html',
    'style.css',
    'script.js',
    'manifest.json',
    'images/icons/icon-192x192.png',
    'images/icons/icon-512x512.png',
    'images/adalet.jpg',
    'images/asilanadam.jpg',
    'images/asiklar.jpg',
    'images/ay.jpg',
    'images/aziz.jpg',
    'images/azize.jpg',
    'images/buyucu.jpg',
    'images/değnekaltılısı.jpg',
    'images/değnekası.jpg',
    'images/değnekbeşlisi.jpg',
    'images/değnekdokuzlusu.jpg',
    'images/değnekdörtlüsü.jpg',
    'images/değnekikilisi.jpg',
    'images/değnekkralı.jpg',
    'images/değnekkraliçesi.jpg',
    'images/değnekonlusu.jpg',
    'images/değnekprensi.jpg',
    'images/değneksekizlisi.jpg',
    'images/değnekşövalyesi.jpg',
    'images/değneküçlüsü.jpg',
    'images/değnekyedilisi.jpg',
    'images/denge.jpg',
    'images/dünya.jpg',
    'images/ermiş.jpg',
    'images/güç.jpg',
    'images/gunes.jpg',
    'images/imparator.jpg',
    'images/imparatorice.jpg',
    'images/joker.jpg',
    'images/kader.jpg',
    'images/kilicaltilisi.jpg',
    'images/kilicasi.jpg',
    'images/kilicbeslisi.jpg',
    'images/kilicdokuzlusu.jpg',
    'images/kilicdortlusu.jpg',
    'images/kilicikilisi.jpg',
    'images/kilickrali.jpg',
    'images/kilickralicesi.jpg',
    'images/kiliconlusu.jpg',
    'images/kilicprensi.jpg',
    'images/kilicsekizlisi.jpg',
    'images/kilicsovalyesi.jpg',
    'images/kilicuclusu.jpg',
    'images/kilicyedilisi.jpg',
    'images/kupaaltilisi.jpg',
    'images/kupaasi.jpg',
    'images/kupabeslisi.jpg',
    'images/kupadokuzlusu.jpg',
    'images/kupadortlusu.jpg',
    'images/kupa_ikilisi.jpg',
    'images/kupakrali.jpg',
    'images/kupakralicesi.jpg',
    'images/kupaonlusu.jpg',
    'images/kupaprensi.jpg',
    'images/kupasekizlisi.jpg',
    'images/kupauclusu.jpg',
    'images/kupa_yedilisi.jpg',
    'images/kupa_sovalyesi.jpg',
    'images/mahkeme.jpg',
    'images/olum.jpg',
    'images/savasarabasi.jpg',
    'images/seytan.jpg',
    'images/tılsımkralicesi.jpg',
    'images/tılsımaltilisi.jpg',
    'images/tılsıması.jpg',
    'images/tılsımbeslisi.jpg',
    'images/tılsımikilisi.jpg',
    'images/tılsımkrali.jpg',
    'images/tılsımonlusu.jpg',
    'images/tılsımprensi.jpg',
    'images/tılsımsekizlisi.jpg',
    'images/tılsımsovalyesi.jpg',
    'images/tılsımuclusu.jpg',
    'images/tılsımyedilisi.jpg',
    'images/yikilankule.jpg',
    'images/yildiz.jpg'
];

// Service Worker 'install' olduğunda, yani ilk kez kurulduğunda çalışır.
self.addEventListener('install', (event) => {
  // Tüm önemli dosyaları önbelleğe alır.
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return cache.addAll(URLS_TO_CACHE);
      })
  );
});

// Sayfa bir dosya (resim, stil dosyası vb.) istediğinde bu olay tetiklenir.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    // Önce önbellekte bu dosyayı arar.
    caches.match(event.request)
      .then((response) => {
        // Eğer önbellekte varsa, direkt oradan döndürür (internet olmasa bile).
        if (response) {
          return response;
        }
        // Eğer önbellekte yoksa, internetten getirmeye çalışır.
        return fetch(event.request);
      })
  );
});
