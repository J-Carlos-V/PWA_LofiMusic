//create AppShell
//const _cache = 'meals@v1-cache';

let staticCache = 'staticCache-v1';
let dynamicCache = 'dynamicCache-v1';
let immutableCache = 'immutableCache-v1';


self.addEventListener('install', (event) => {
    console.log('SW instalado');


    const _appShellFiles = [
        'index.html',
        'styles.css',
        'main.js',
        'img/musicicon.jpg',
        'img/showcase2.jpg',
        'img/icon-192x192.png',
        'img/icon-256x256.png',
        'img/icon-384x384.png',
        'img/icon-512x512.png',
    ];

    const _IMMUTABLE_FILES = [
      'https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500&display=swap',
      'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css',
    ];

    const saveStaticCache = caches
    .open(staticCache)
    .then((cache) => cache.addAll(_appShellFiles));

    const saveImmutableCache = caches
    .open(immutableCache)
    .then((cache) => cache.addAll(_IMMUTABLE_FILES));

    event.waitUntil(
      Promise.all(
        [
          saveStaticCache,
          saveImmutableCache
        ]
      )
    );
});


self.addEventListener('activate', (event) => {
  console.log('SW activado de juan Carlos');

  /*const cacheAllowlist = [_cache];
  event.waitUntil(//funciona como un awakw
    caches.keys().then(cacheNames => {
      return Promise.all(//promisetodas las promesas seran resultas 
        cacheNames.map(cacheName => {// map con base a un arreglo comienza a extraer cada elemento de la lista
          if (cacheAllowlist.indexOf(cacheName) === -1) {// si uno de los elementos de la vista  
            return caches.delete(cacheName);
          }
        })
      );
    })
  );*/
  event.waitUntil(updateCache());
});

function updateCache(){
  caches.keys().then((keys) =>
  Promise.all(
    keys.map((key) =>{
      if (!staticCache.includes(key) && !immutableCache.includes(key)) {
        console.log("Cache actualizado");
        return caches.delete(key);
      }
    })
  )
  );
}


//3 Cache First
self.addEventListener('fetch', (event) =>{
  const res = caches.match(event.request).then((cacheResponse) => {
    return(
      cacheResponse ||
      fetch(event.request).then(networkResponse => {
         caches.open(dynamicCache).then(cache => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        });
      })
    );
  });
  event.respondWith(res); 
}); 

self.addEventListener('message', (msgClient) => {
  if (msgClient.data.action == 'skipWaiting') {
    self.skipWaiting();   
    
  }
});

