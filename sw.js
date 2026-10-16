const CACHE_NAME = 'vocab-system-1151017'; // 👈 每次改了 HTML，就手動把這裡改掉（v2, v3, v4...）
const urlsToCache = [
  './',
  './index.html',
  './manifest.json',
  './icon.png'
];

// 1. 安裝並快取新檔案
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    }).then(() => self.skipWaiting()) // 讓新 Service Worker 立即生效
  );
});

// 2. 關鍵：自動清除舊版本的快取（您原本漏掉這段）
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          // 如果快取名稱不是目前的 v2，就把它刪除
          if (cache !== CACHE_NAME) {
            console.log('正在清除舊快取:', cache);
            return caches.delete(cache);
          }
        })
      );
    }).then(() => self.clients.claim()) // 立即控制所有頁面
  );
});

// 3. 攔截請求並優先使用快取
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
