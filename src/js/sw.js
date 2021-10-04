const staticCacheName = 'static-cache-v0';
const dynamicCacheName = 'dynamic-cache-v0';

self.addEventListener('install', () => {
    caches.open(staticCacheName).then(c => c.addAll([
        '/',
        '/alcohol',
        '/contacts',
        '/cost',
        '/drink',
        '/drug',
        '/fizeo',
        '/game',
        '/main.css',
        '/s.js',
        '/images/no-image.jpg',
    ]));
});

self.addEventListener('activate', async () => {
    const cachesKeys = await caches.keys();
    const checkKeys = cachesKeys.map(async key => {
        if (![staticCacheName, dynamicCacheName].includes(key)) {
            await caches.delete(key);
        }
    });
    await Promise.all(checkKeys);
});

self.addEventListener('fetch', e => {
    if (e.request.method === 'GET') e.respondWith(checkCache(e.request));
});

async function checkCache(req) {
    return await caches.match(req) || await checkOnline(req);
}

async function checkOnline(req) {
    const cache = await caches.open(dynamicCacheName);
    try {
        const res = await fetch(req);
        await cache.put(req, res.clone());
        return res;
    } catch (error) {
        const cachedRes = await cache.match(req);
        if (cachedRes) return cachedRes;
        if (req.url.indexOf('.html') !== -1) return caches.match('./offline.html');
        return caches.match('./images/no-image.jpg');
    }
}