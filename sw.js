//create AppShell
const _cache = 'meals@v1-cache';



self.addEventListener('install', (event) => {
    console.log('SW instalado');


    const _appShellFiles = [
        'index.html',
        'styles.css',
        'main.js',
        'app.js',
        'img/musicicon.jpg',
        'img/showcase2.jpg',
        'img/icon-192x192.png',
        'img/icon-256x256.png',
        'img/icon-384x384.png',
        'img/icon-512x512.png',
    ];

    event.waitUntil(
        caches.open(_cache)
        .then(cache =>{
            return cache.addAll(_appShellFiles)
        })
    )

});


self.addEventListener('activate', event => {
  console.log('SW activado de juan Carlos');

  const cacheAllowlist = [_cache];

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
  );
});



//3 Cache First
self.addEventListener('fetch', (e) =>{
  e.respondWith(caches.match(e.request).then((r) => {
    return r || fetch(e.request) 
  })
  );  
}); 



  
                
           


