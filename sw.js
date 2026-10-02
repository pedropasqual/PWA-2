// ============================================
// SERVICE WORKER - Permite funcionar offline
// ============================================

const CACHE_NAME = 'sistema-pwa-v1';
const urlsToCache = [
    '/',
    'index.html',
    'produtos.html',
    'clientes.html',
    'style.css',
    'app.js',
    'manifest.json'
];

// INSTALAÇÃO - Armazena os arquivos no cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Cache aberto');
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

// ATIVAÇÃO - Limpa caches antigos
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Removendo cache antigo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// INTERCEPTAÇÃO DE REQUISIÇÕES - Serve do cache quando offline
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Cache hit - retorna do cache
                if (response) {
                    return response;
                }
                
                // Se não está no cache, faz a requisição normal
                return fetch(event.request).then(
                    response => {
                        // Verifica se resposta é válida
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }
                        
                        // Clona a resposta para armazenar no cache
                        const responseToCache = response.clone();
                        
                        caches.open(CACHE_NAME)
                            .then(cache => {
                                cache.put(event.request, responseToCache);
                            });
                        
                        return response;
                    }
                );
            })
    );
});
