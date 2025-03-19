
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("guardia-cache").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/assets/index.css",
        "/assets/index.js"
      ]);
    })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
