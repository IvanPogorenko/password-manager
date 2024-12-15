const CACHE_NAME="pwa-cache-v1";const urlsToCache=["/","/index.html","/src/assets/password-manager.ico","/src/styles/style.css","/src/index.js"];self.addEventListener("install",(event=>{event.waitUntil(caches.open(CACHE_NAME).then((cache=>cache.addAll(urlsToCache))))}));self.addEventListener("fetch",(event=>{event.respondWith(caches.match(event.request).then((cachedResponse=>{if(cachedResponse){return cachedResponse}return fetch(event.request)})))}));self.addEventListener("activate",(event=>{const cacheWhitelist=[CACHE_NAME];event.waitUntil(caches.keys().then((cacheNames=>Promise.all(cacheNames.map((cacheName=>{if(!cacheWhitelist.includes(cacheName)){return caches.delete(cacheName)}}))))))}));