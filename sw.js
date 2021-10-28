//create AppShell
const _cache = 'meals@v3-cache';



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


self.addEventListener('fetch', (e) => {
    e.respondWith(
        caches.match(e.request).then((r) =>{
            return r || fetch(e.request)
        })
    );
});


//1. cache Only
/*self.addEventListener('fetch', event => {
 //  event.respondWith(caches.match(event.request))
    // la funcion open abre un cache pero si no existe lo crea ////Abrir o crear
    //.match compara los archivos y responde
    // event.respondWith(caches.match(event.request))  vwerifica si la peticion es igual a algun recurso almacenado en cache
    //cache only solo responde a tomar recursos del cache
});*/

/*
//2. Network Only
// solo respondera de los datos que esten en Internet

self.addEventListener('fetch', event => {
    event.respondWith(event.request);
})
*/

//3 Cache First
/*self.addEventListener('fetch', event => {
    const response = caches.match(event.request).then(res => {
        console.log("Existe el request" + event.request);
        console.log(res)
    })
    .catch( res => {
        console.log("No existe el request" + event.request)
        console.log(res);
    })
 
      
 event.respondWith(
     caches.match(event.request).then(cachedResponse =>{
         
    if (cachedResponse) return cachedResponse;
    return fetch(event.request)
     })
    );    
    });*/


   /* //Network Firts
    self.addEventListener('fetch', event => {
        event.respondWith(
            fetch(event.request).then(networkResponse => {
                return networkResponse ||  caches.match(event.request)
            })
        );
    })
  */
                
           



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
      