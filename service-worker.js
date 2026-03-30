// GT7 Random Circuit Selector — Service Worker
// Cache-first strategy for full offline support

const CACHE_NAME = 'gt7-randomizer-v13';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './manifest.json',
  './favicon.ico',
  './favicon-96x96.png',
  './apple-touch-icon.png',
  './web-app-manifest-192x192.png',
  './web-app-manifest-512x512.png',
  './screenshot-mobile.webp',
  './screenshot-mobile-2.webp',
  './screenshot-mobile-3.webp',
  './screenshot-mobile-4.webp',
  './screenshot-desktop.webp',
  './screenshot-desktop-2.webp',
  './screenshot-desktop-3.webp',
  'https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;900&family=Inter:wght@300;400;500;600&display=swap'
];

// ─── Install: pre-cache all assets ───────────────────────────────────────────
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS_TO_CACHE))
    // From v13 onwards, skipWaiting() is removed and the update banner takes over
  );
});

// ─── Message: allow the page to trigger activation ───────────────────────────
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

// ─── Activate: purge old caches ──────────────────────────────────────────────
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// ─── Fetch: cache-first, fall back to network ────────────────────────────────
self.addEventListener('fetch', event => {
  // Only handle GET requests
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // Only cache valid responses
        if (!response || response.status !== 200 || response.type === 'opaque') {
          return response;
        }
        const cloned = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, cloned));
        return response;
      }).catch(() => {
        // Offline fallback for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
