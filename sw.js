// 183 line added tabindex
// register serviceWorker v main.js
var staticCacheName = 'restaurant-v1';


self.addEventListener('install', function (event) {
  // Perform install steps
});
var urlsToCache = [
  '/',
  './index.html',
  './restaurant.html',
  './css/styles.css',
  './js/dbhelper.js',
  './js/main.js',
  './js/restaurant_info.js',
  './data/restaurants.json',
  './img/1.jpg',
  './img/2.jpg',
  './img/3.jpg',
  './img/4.jpg',
  './img/5.jpg',
  './img/6.jpg',
  './img/7.jpg',
  './img/8.jpg',
  './img/9.jpg',
  './img/10.jpg',
];

self.addEventListener('install', function(event) {
  // waiting until installation is complete
  event.waitUntil(
    //open caches matching cache name =>
    // return promise with all cached urls
    caches.open(staticCacheName).then(function(cache) {
         console.log("Opened caches");
      return cache.addAll(urlsToCache);
    }) // leave it
    );
});

self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  // math method if requested url is already in cache from installation
  // .then to get a promise
  event.respondWith(
    caches.match(event.request, {ignoreSearch: true}).then(function(response) {
      if(response) {
        console.log(event.request, 'was found in cache');
        return response;
      }
      else {
        console.log('was not found, now FETCHING');
        return fetch(event.request);
      // adding to cache for later use

      }
    }).catch(function(err) {
      console.log(err, event.request);
    })
    );
});
