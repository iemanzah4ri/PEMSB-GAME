const CACHE_NAME = 'pemsb-game-v2';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './menu_background.png',
  './stage1.png',
  './stage2.png',
  './stage3.png',
  './stage4.png',
  './testing.png',
  './stage1/stage1.html',
  './stage1/stage1_background.png',
  './stage1/aluminium.png',
  './stage1/plastic.png',
  './stage1/scrap.png',
  './stage1/popup.png',
  './stage2/stage2.html',
  './stage2/stage2_background.png',
  './stage2/popup.png',
  './stage2/casting_failure.png',
  './stage3/stage3.html',
  './stage3/factory_background.png',
  './stage3/cnc_machine.png',
  './stage3/engine_block.png',
  './stage3/drill_tool.png',
  './stage3/mill_tool.png',
  './stage3/popup.png',
  './stage4/stage4.html',
  './stage4/assembly_station.png',
  './stage4/assembly_station1.png',
  './stage4/complete_engine.png',
  './stage4/connecting_rod.png',
  './stage4/crankshaft.png',
  './stage4/cylinder_head.png',
  './stage4/engine_block.png',
  './stage4/engine_blueprint.png',
  './stage4/engine_stand.png',
  './stage4/piston.png',
  './stage4/popup.png',
  './stage4/timing_chain.png',
  './stage4/timing_chain_cover.png',
  './stage4/valve_cover.png',
  './stage5/stage5.html',
  './stage5/engine_test_room.png',
  './stage5/final_engine.png',
  './stage5/rpm_gauge.png',
  './stage5/temp_gauge.png',
  './stage5/oil_gauge.png',
  './stage5/popup.png',
  './stage5/production_certificate.png',
  './stage5/test_passed.png',
  './stage5/test_failed.png',
  './stage5/warning_terminal.png',
  './certificate_page/certificate.html',
  './certificate_page/production_certificate.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => Promise.all(
      cacheNames
        .filter((cacheName) => cacheName !== CACHE_NAME)
        .map((cacheName) => caches.delete(cacheName))
    )).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) return cachedResponse;

      return fetch(event.request).catch(() => {
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
        return Response.error();
      });
    })
  );
});