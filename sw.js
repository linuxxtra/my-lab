const CACHE_NAME = 'fw-v1';
const assets = ['./', './index.html', './logo.png'];

// Install - Saves files for offline use
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(assets)));
});

// Activate - Deletes old cache versions (Crucial for updates)
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)));
    })
  );
});

// Fetch - Serves the site even if Wi-Fi is off
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});

