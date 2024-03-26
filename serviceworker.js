const staticCacheName = "ecommerce-v1";

self.addEventListener("install", function (e) {
    e.waitUntil(
        caches.open(staticCacheName).then(function (cache) {
            return cache.addAll([
                "/",
                "/index.html",
                "/styles.css",
                "/product1.jpg", // Add more product images as needed
                "/product2.jpg",
                "/product3.jpg",
                "manifest.json", // Ensure manifest is cached
                "serviceworker.js" // Ensure serviceworker is cached
            ]);
        })
    );
});

self.addEventListener("fetch", function (event) {
    console.log(event.request.url);

    event.respondWith(
        caches.match(event.request).then(function (response) {
            return response || fetch(event.request);
        })
    );
});
