// 오프라인 캐시. 3D 모델·Draco 해제기·글자 인식 엔진(ocr/)·글꼴은 한 번 받으면 캐시에서, 나머지는 네트워크 우선(실패하면 캐시).
// 모델이나 인식 모델을 바꿔 배포할 때는 MODELS·OCR 버전을 올린다(tools/deploy.sh 가 파일 해시로 자동으로 바꾼다).
const MODELS = 'models-39d81d72cc';
const OCR = 'ocr-ad0f160577';
const APP = 'app-v1';

self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', (e) => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== MODELS && k !== APP && k !== OCR) await caches.delete(k);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;            // 통계 전송(Supabase) 등은 건드리지 않음
  if (/\/(ocr|fonts)\//.test(url.pathname)) {
    e.respondWith(cacheFirst(req, OCR));                 // 글자 인식 엔진·모델(약 32MB), 글꼴
  } else if (/\/(models|draco)\//.test(url.pathname) || /\/assets\/.+-[\w-]{8}\.\w+$/.test(url.pathname)) {
    e.respondWith(cacheFirst(req));                      // 모델, 해시가 붙은 빌드 파일
  } else {
    e.respondWith(networkFirst(req));                    // index.html, data/*.json 등
  }
});

async function cacheFirst(req, name = MODELS) {
  const cache = await caches.open(name);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  // 저장 공간이 모자라 넣지 못해도 응답은 그대로 쓴다
  if (res.ok && !(res.headers.get('content-type') || '').includes('text/html')) cache.put(req, res.clone()).catch(() => {});
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
