;
const CACHE_NAME = 'v1_cache_to_do_list',
    urlsToCache = [
        "./",
        "https://fonts.googleapis.com/css?family=Titillium+Web",
        "https://kit.fontawesome.com/747a22a42f.js",
        "./css/style.css",
        "./js/main.js",
        "./js/script.js",
        "./assets/img/landscape.jpg",
        "./assets/img/favicon.png"
    ]

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then( cache => {
            return cache.addAll(urlsToCache)
                    .then(() => self.skipWaiting())
        })
        .catch( err => console.log('Fallo registro de caché', err))
    )
})
self.addEventListener('activate', e => {
    const cacheWhiteList = [CACHE_NAME]
    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            cacheNames.map(cacheName => {
                if(cacheWhiteList.indexOf(cacheName) === -1){
                    return caches.delete(cacheName)
                }
            })
        })
        .then(() => self.clients.claim())
    )
})
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            return res ? res : fetch(e.request)
        })
    )
})
