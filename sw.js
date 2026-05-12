const CACHE_NAME = 'fw-german-v1';
const assets = [
  './',
  './index.html'
];

// Install Service Worker
self.addEventListener('install', (evt) => {
  evt.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching shell assets');
      cache.addAll(assets);
    })
  );
});

// Activate Event
self.addEventListener('activate', (evt) => {
  console.log('Service worker activated');
});

// Fetch Event
self.addEventListener('fetch', (evt) => {
  evt.respondWith(
    caches.match(evt.request).then((cacheRes) => {
      return cacheRes || fetch(evt.request);
    })
  );
});

