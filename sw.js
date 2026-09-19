// 오프라인 캐시. 3D 모델·Draco 해제기는 한 번 받으면 캐시에서, 나머지는 네트워크 우선(실패하면 캐시).
// 모델을 바꿔 배포할 때는 MODELS 버전을 올린다(tools/deploy.sh 가 자동으로 바꾼다).
const MODELS = 'models-fa4a116621';
const APP = 'app-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== MODELS && k !== APP) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;            // 통계 전송(Supabase) 등은 건드리지 않음
  if (/\/(models|draco)\//.test(url.pathname) || /\/assets\/.+-[\w-]{8}\.\w+$/.test(url.pathname)) {
    e.respondWith(cacheFirst(req));                      // 모델, 해시가 붙은 빌드 파일
  } else {
    e.respondWith(networkFirst(req));                    // index.html, data/*.json 등
  }
});

async function cacheFirst(req) {
  const cache = await caches.open(MODELS);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res.ok) cache.put(req, res.clone());
  return res;
}

async function networkFirst(req) {
  const cache = await caches.open(APP);
  try {
    const res = await fetch(req);
    if (res.ok) cache.put(req, res.clone());
    return res;
  } catch (err) {
    const hit = await cache.match(req, { ignoreSearch: req.mode === 'navigate' });
    if (hit) return hit;
    throw err;
  }
}
