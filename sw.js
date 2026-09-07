const CACHE_NAME = 'pemsb-game-v1';
// Add every local asset file your game relies on
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css',
  './game.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});