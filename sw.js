const CACHE='arise-shell-v54';
const SHELL=['/','/index.html','/styles.css','/extras.css','/simple-ux.css','/app-experience-v1.css','/arise-theme.css','/study-hub.css','/cp-roadmap.css','/room-spark.css','/system-aura.css','/system-aura-v3.css','/system-aura-v4.css','/system-aura-v5.css','/arise-hunter-v1.css','/arise-ui-v22.css','/arise-mentor-v2.css','/data.js','/study-data.js','/mentor-resources-v1.js','/engineering-resources-v2.js','/app-v18.js','/cp-roadmap.js','/topic-media-v17.js','/room-spark.js','/engineering-atlas-v1.js','/engineering-roadmap-v3.js','/arise-resource-agent-v2.js','/resource-discovery-v2.js','/practice-ranks-v22.js','/manifest.webmanifest','/arise-mark.svg','/arise-mark-v1.svg','/assets/hunter-gate.png','/assets/hunter-portrait.svg','/assets/jinwoo-profile.png','/assets/arise-gate-logo.png','/assets/arise-logo.svg','/assets/arise-wordmark-v1.svg'];
self.addEventListener('install',event=>event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',event=>event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(key=>key!==CACHE).map(key=>caches.delete(key)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',event=>{
  const request=event.request;
  if(request.method!=='GET')return;
  const url=new URL(request.url);
  if(url.origin!==self.location.origin||url.pathname.startsWith('/api/'))return;
  if(request.mode==='navigate'){
    event.respondWith(fetch(request).then(response=>{const copy=response.clone();caches.open(CACHE).then(cache=>cache.put('/index.html',copy));return response}).catch(()=>caches.match('/index.html')));
  }else{
    event.respondWith(caches.match(request,{ignoreSearch:true}).then(hit=>hit||fetch(request).then(response=>{if(response.ok)caches.open(CACHE).then(cache=>cache.put(request,response.clone()));return response})));
  }
});




