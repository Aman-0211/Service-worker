const cacheName = 'v2';

const cacheAssets = ['index.html', '/css/style.css', '/js/main.js'];

// Call install event
self.addEventListener('install', (e) => {
  console.log('Services Worker : Installed');
  e.waitUntil(
    caches
      .open(cacheName)
      .then((cache) => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

//  Call Activate event
self.addEventListener('activate', (e) => {
  console.log('Services Worker : Activated');
  e.waitUntil(
    caches.keys().then((cacheName) => {
      return Promise.all(
        cacheName.map((cache) => {
          if (cache !== cacheName) {
            console.log('Services Worker : Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call fetch event

self.addEventListener('fetch', (e) => {
  console.log('Service worker fetching');
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
