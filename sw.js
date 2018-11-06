// 183 line added tabindex
// register serviceWorker v main.js
var staticCacheName = 'restaurant-v1';
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
         console.log("Service worker:Opened caches, caching files");
      // return promise with all cached urls
      // Caching the files after installing sw
      return cache.addAll(urlsToCache);
    }) // leave it
    );
});

// activating
self.addEventListener('activate', function(event) {
  event.waitUntil(self.clients.claim());
});

self.addEventListener('activate', function(event) {
  // wait until activate serviceWorker until old cache is deleted
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      // .keys() gives promise with all cache names
      return Promise.all(
        // return all promise before activation
        // using filter method to fullfill condition - differ name and starting with...
        cacheNames.filter(function(cacheName) {
            return cacheName.startsWith('restaurant-') && cacheName != staticCacheName;
        }).map(function(cacheName) {
          // when filter applied creating new array using map method
          // using map array method and then delete them all
          console.log("ServiceWorker cleaning old caches");
          return caches.delete(cacheName);
        })
      );
    })
  );
});

  // return Promise.all(allKey.map(function(key) {
  //     if (staticCacheName.indexOf(key) === -1) {
  //         return caches.delete(key);
  //     }

// respond from the cache when necessary
// performs browser fetch, so results can come from cache
self.addEventListener('fetch', function(event) {
  // math method if requested url is already in cache from installation
  // .then to get a promise
  event.respondWith(
    // match request with cache
    caches.match(event.request, {ignoreSearch: true}).then(function(response) {
      if(response) {
        console.log(event.request, 'found in cache');
        return response;
      }
      else {
        console.log(event.request, 'WAS NOT FOUND, now REQUESTED/FETCHING');
        return fetch(event.request).then(function(res) {
          return caches.open('restaurant-v1').then(function(cache) {
            cache.put(event.request, res.clone());
            return res;
          }).catch(function(err) {
            console.log(err, event.request);
          })
        })
      }
    })
    );
});
