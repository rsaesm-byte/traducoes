// Service worker: página = rede primeiro (pega atualização); ícones = cache primeiro
const VERSAO = "traducoes-v2";
const ARQUIVOS = ["./", "./index.html", "./manifest.json", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", e => { self.skipWaiting(); e.waitUntil(caches.open(VERSAO).then(c => c.addAll(ARQUIVOS)).catch(()=>{})); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSAO).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  const u = new URL(e.request.url);
  if (e.request.method !== "GET" || u.origin !== location.origin) return;           // GitHub API / ntfy passam direto
  if (u.pathname.endsWith("version.json")) return;
  if (e.request.mode === "navigate" || u.pathname.endsWith(".html")) {
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(VERSAO).then(x => x.put(e.request, c)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match("./index.html"))));
    return;
  }
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => { const c = res.clone(); caches.open(VERSAO).then(x => x.put(e.request, c)); return res; })));
});
