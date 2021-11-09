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
self.addEventListener('fetch', event => {
    event.responseWith(caches.match(event.request).then((response) => {
            return response || fetch(event.request);
    })
    );
    });



  
                
           


