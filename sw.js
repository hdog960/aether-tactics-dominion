const CACHE='aether-dominion-v07-terrain-grounding-20261031';
const ASSETS=['./','./index.html','./v06.html','./v04-style.css','./v05-style.css','./v06-style.css','./v05-art.js','./v06-engine.js','./v06-scene.js','./v07-scene.js','./v04-net.js','./art/panorama.png','./art/cards.png','./art/reference.png','./art/units.png','./art/units-grounded.png','./art/terrain-natural.jpg','./manifest.webmanifest','./icon-192.png','./icon-512.png','./apple-touch-icon.png'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('aether-dominion-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);if(url.origin!==self.location.origin)return;
 if(event.request.mode==='navigate'){
   event.respondWith(fetch(event.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{})}return r}).catch(async()=>await caches.match(event.request)||await caches.match('./index.html')));
   return
 }
 event.respondWith(caches.match(event.request).then(cached=>cached||fetch(event.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(cache=>cache.put(event.request,copy)).catch(()=>{})}return r})))
});