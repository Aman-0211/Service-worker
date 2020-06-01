const cacheName = 'v2';

// Call install event
self.addEventListener('install', (e) => {
  console.log('Services Worker : Installed');
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
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const resClone = res.clone();
        //   Open cache
        caches.open(cacheName).then((cache) => {
          cache.put(e.request, resClone);
        });
        return res;
      })
      .catch(() => caches.match(e.request).then((res) => res))
  );
});
