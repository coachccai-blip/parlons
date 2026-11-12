/* Parlons ! — service worker.
   1. Hors connexion : garde une copie de l'application sur l'appareil.
   2. Mises à jour : à chaque lancement, la page vient du réseau (dernière version publiée) ;
      la copie locale ne sert que sans connexion ou quand le réseau tarde.
   3. Rappel quotidien : affiche la notification « objectif du jour ».
   La progression de l'étudiant n'est pas ici : elle reste dans localStorage, côté page. */
'use strict';

const APP = 'parlons-app-v2';     // copie de l'application
const DATA = 'parlons-donnees';   // état du rappel, écrit par la page (jamais effacé ici)
const at = name => new URL(name, self.location.href).href;
const INDEX = at('./');
const ASSETS = ['manifest.webmanifest', 'icons/logo-192.png', 'icons/logo-512.png', 'icons/logo-maskable-512.png', 'icons/apple-touch-icon.png', 'icons/favicon-64.png', 'icons/badge-96.png'].map(at);
const NET_WAIT_MS = 3000;         // au-delà, on sert la copie locale et la mise à jour arrive ensuite

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(APP);
    if (!(await cache.match(INDEX))) await cache.add(new Request(INDEX, { cache: 'reload' }));
    await Promise.allSettled(ASSETS.map(u => cache.add(u))); // une icône manquante n'empêche pas l'installation
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const key of await caches.keys()) if (key.startsWith('parlons-app-') && key !== APP) await caches.delete(key);
    await self.clients.claim();
  })());
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  url.search = ''; url.hash = '';
  const key = url.href === INDEX + 'index.html' ? INDEX : url.href;
  if (key === INDEX) e.respondWith(page(e));
  else if (ASSETS.includes(key)) e.respondWith(asset(e, key));
});

/** La page : réseau d'abord, copie locale si le réseau échoue ou tarde. */
async function page(e) {
  const cache = await caches.open(APP);
  const cached = await cache.match(INDEX);
  const fresh = fetch(INDEX, { cache: 'no-cache' }).then(res => {
    if (res.ok && !res.redirected) e.waitUntil(cache.put(INDEX, res.clone()));
    return res;
  });
  if (!cached) return fresh;
  const safe = fresh.catch(() => null);
  e.waitUntil(safe);
  const res = await Promise.race([safe, new Promise(done => setTimeout(done, NET_WAIT_MS, null))]);
  return res && res.ok ? res : cached;
}

/** Icônes et manifeste : copie locale d'abord, rafraîchie en arrière-plan. */
async function asset(e, key) {
  const cache = await caches.open(APP);
  const cached = await cache.match(key);
  const fresh = fetch(key).then(res => {
    if (res.ok) e.waitUntil(cache.put(key, res.clone()));
    return res;
  });
  if (!cached) return fresh;
  e.waitUntil(fresh.catch(() => {}));
  return cached;
}

/* ───────────────────────── Rappel quotidien ─────────────────────────
   La page copie dans le cache DATA l'état du jour : { on, time, goal, day, count, streak }.
   Le rappel est demandé par la page (minuterie, tant qu'elle est ouverte) ou par le navigateur
   (synchronisation périodique : application installée sur Android). */
const two = n => String(n).padStart(2, '0');
const dkey = d => d.getFullYear() + '-' + two(d.getMonth() + 1) + '-' + two(d.getDate());

async function remind() {
  if (self.Notification?.permission !== 'granted') return;
  const cache = await caches.open(DATA);
  const s = await cache.match(at('rappel-etat')).then(r => r?.json()).catch(() => null);
  if (!s?.on) return;
  const now = new Date(), today = dkey(now);
  if (two(now.getHours()) + ':' + two(now.getMinutes()) < s.time) return;        // pas encore l'heure
  const last = await cache.match(at('rappel-dernier')).then(r => r?.text()).catch(() => '');
  if (last === today) return;                                                    // un seul rappel par jour
  const done = s.day === today ? s.count : 0;
  if (done >= s.goal) return;                                                    // objectif déjà atteint
  const windows = await self.clients.matchAll({ type: 'window' });
  if (windows.some(w => w.visibilityState === 'visible')) return;                // l'étudiant est déjà dans l'application
  await cache.put(at('rappel-dernier'), new Response(today));

  const yesterday = new Date(now); yesterday.setDate(now.getDate() - 1);
  const streak = s.day === today || (s.day === dkey(yesterday) && s.count >= s.goal) ? s.streak : 0;
  const left = s.goal - done;
  await self.registration.showNotification(
    done ? 'Encore ' + left + ' phrase' + (left > 1 ? 's' : '') + ' pour l\'objectif du jour' : 'Vos ' + s.goal + ' phrases du jour vous attendent',
    {
      body: streak ? 'Gardez votre série : ' + streak + ' jour' + (streak > 1 ? 's' : '') + ' d\'affilée !' : 'Quelques minutes suffisent. À vous de parler !',
      icon: at('icons/logo-192.png'), badge: at('icons/badge-96.png'), tag: 'parlons-rappel', lang: 'fr',
    });
}

self.addEventListener('message', e => { if (e.data?.type === 'rappel') e.waitUntil(remind()); });
self.addEventListener('periodicsync', e => { if (e.tag === 'rappel') e.waitUntil(remind()); });

self.addEventListener('notificationclick', e => {
  e.notification.close();
  e.waitUntil((async () => {
    const windows = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    if (windows.length) return windows[0].focus();
    return self.clients.openWindow(INDEX);
  })());
});
