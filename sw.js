);
    return;
  }

  // 其餘靜態資源採用 Cache First 策略
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse;
      }
      return fetch(eveconst CACHE_NAME = 'vocab-system-v1.0.5';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  'https://cdn.tailwindcss.com',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css'
];

// 安裝 Service Worker 並快取核心資源
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).then(() => self.skipWaiting())
  );
});

// 啟動並清理舊版本快取，讓手機立即載入最新版
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('清除舊版快取:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// 攔截網路請求，採用 Network First 優先策略確保手機隨時抓取最新內容
self.addEventListener('fetch', (event) => {
  // 對於 HTML 請求優先從網路取得，確保手機隨時拿到最新修改
  if (event.request.mode === 'navigate' || event.request.url.endsWith('.html') || event.request.url.endsWith('/')) {
    event.respondWith(
      fetch(event.request)
        .then((networkResponse) => {
          return caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, networkResponse.clone());
            return networkResponse;
          });
        })
        .catch(() => {
          return caches.match(event.request) || caches.match('./index.html');
        })nt.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          if (event.request.url.startsWith('http')) {
            cache.put(event.request, networkResponse.clone());
          }
          return networkResponse;
        });
      });
    })
  );
});
