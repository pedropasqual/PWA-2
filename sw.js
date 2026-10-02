const CACHE="minha-pwa-v1";

const arquivos=[
"./",
"index.html",
"style.css",
"script.js",
"manifest.json"
];

self.addEventListener("install",evento=>{

evento.waitUntil(

caches.open(CACHE)
.then(cache=>cache.addAll(arquivos))

);

});

self.addEventListener("fetch",evento=>{

evento.respondWith(

caches.match(evento.request)
.then(resposta=>resposta||fetch(evento.request))

);

});
