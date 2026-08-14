const { cache } = require("react");

const cacheName = "ola-pwa";

var filesToCache = [
    './',
    './manifest.webmanifest',
    './index.html',
    './css/style.css',
    './js/main.js'
]

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName)
            .then(cache =>
                cache.addAll(filesToCache)
            )
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response ||
                    fetch(event.request);
            }

            )
    );
});





