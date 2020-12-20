/* THIS FILES NEEDS TO BE IN THE ROOT */
var cacheName = "Health-PWA";
var filesToCache = [
    '/',
    '/index.html',
    '/css/index.css',
    '/js/custom.js'
];

/* Start the service worker and cache all op the app's content */
self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open(cacheName).then(function(cache) {
            return cache.addAll(filesToCache);
        })
    );
});

/* Serve cached content when offline */
self.addEventListener('fetch',function(e) {
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});
