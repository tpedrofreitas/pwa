const cacheName = 'ola-pwa-v2';

const filesToCache = [
    './',
    './index.html',
    './manifest.webmanifest',
    './css/style.css',
    './js/main.js'
];

// Instala o Service Worker e cria o cache
self.addEventListener('install', event => {

    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(filesToCache);
            })
    );

    self.skipWaiting();
});

// Assume o controle das páginas abertas
self.addEventListener('activate', event => {

    event.waitUntil(
        self.clients.claim()
    );

});

// Intercepta as requisições
self.addEventListener('fetch', event => {

    event.respondWith(
        caches.match(event.request)
            .then(response => {

                // Encontrou no cache
                if (response) {
                    return response;
                }

                // Não encontrou → tenta a internet
                return fetch(event.request);

            })
    );

});