

const cacheName = "ola-pwa-v1";

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
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    );
    self.skipWaiting();
});

self.addEventListener('activate', event => {
    event.waitUntil(
        self.clients.claim()
    );
});

self.addEventListener('fetch', event => {

    event.respondWith(
        caches.match(event.request)
            .then(response => {


                if (response) {
                    return response;
                }


                return fetch(event.request);

            })
    );

});








