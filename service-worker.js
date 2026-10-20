// App-shell only: Firestore check-ins are never cached by the service worker.
const CACHE_NAME = 'better-together-shell-v2';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE_NAME).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(names=>Promise.all(names.filter(name=>name!==CACHE_NAME&&name.startsWith('better-together-shell-')).map(name=>caches.delete(name)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',event=>{
 const req=event.request; if(req.method!=='GET'||new URL(req.url).origin!==self.location.origin)return;
 const path=new URL(req.url).pathname;
 // Do not cache identity helpers, API endpoints, or user-generated URLs.
 if(req.mode!=='navigate' && !(/\/(index\.html|manifest\.webmanifest|service-worker\.js)$/.test(path) || /\/icons\/[^/]+\.png$/.test(path)))return;
 if(req.mode==='navigate'){
  event.respondWith(fetch(req).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put('./index.html',copy))}return response}).catch(()=>caches.match('./index.html')));
  return;
 }
 event.respondWith(caches.match(req).then(found=>found||fetch(req).then(response=>{if(response.ok){const copy=response.clone();caches.open(CACHE_NAME).then(cache=>cache.put(req,copy))}return response})))
});