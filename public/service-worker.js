
// Version pour le cache
const CACHE_VERSION = 'v4'; // Incremented cache version again to refresh assets
const CACHE_NAME = `guardia-cache-${CACHE_VERSION}`;

// Liste des ressources à mettre en cache
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/dashboard',
  '/assets/index.css',
  '/assets/index.js',
  '/icons/guardia-icon-192.png',
  '/icons/guardia-icon-512.png',
  '/favicon.ico',
  '/offline.html'
];

// Installation - mise en cache des ressources
self.addEventListener('install', (event) => {
  console.log('[Service Worker] Installation en cours...');
  
  // Passer à la nouvelle version sans attendre
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Mise en cache des ressources principales');
      return cache.addAll(ASSETS_TO_CACHE);
    })
  );
});

// Activation - nettoyage des anciens caches
self.addEventListener('activate', (event) => {
  console.log('[Service Worker] Activation en cours...');
  
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key !== CACHE_NAME) {
          console.log('[Service Worker] Suppression de l\'ancien cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  
  // S'assurer que le service worker prend le contrôle immédiatement
  return self.clients.claim();
});

// Stratégie de récupération: cache puis réseau avec mise à jour du cache
self.addEventListener('fetch', (event) => {
  // Ignorer les requêtes cross-origin et vers "cdn.gpteng.co"
  if (!event.request.url.startsWith(self.location.origin) || 
      event.request.url.includes('cdn.gpteng.co') ||
      event.request.url.includes('gpteng.co')) {
    return;
  }
  
  // Stratégie pour les pages HTML (toujours essayer le réseau d'abord)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // Si le réseau échoue, servir la page hors ligne
          return caches.match('/offline.html') || caches.match('/');
        })
    );
    return;
  }
  
  // Stratégie pour les autres ressources (cache puis réseau)
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Utiliser la version en cache si elle existe
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          // Ne pas mettre en cache les réponses non réussies
          if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
            return networkResponse;
          }
          
          // Mettre à jour le cache avec la nouvelle version
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
          
          return networkResponse;
        })
        .catch((error) => {
          console.log('[Service Worker] Erreur de récupération:', error);
          // Renvoyer null en cas d'erreur pour que le cache soit utilisé
          return null;
        });
      
      // Renvoyer le cache ou attendre la réponse réseau
      return cachedResponse || fetchPromise;
    })
  );
});

// Gestion des notifications push
self.addEventListener('push', (event) => {
  console.log('[Service Worker] Notification push reçue');
  
  try {
    const data = event.data.json();
    const title = data.title || 'Guardia Security';
    const options = {
      body: data.body || 'Notification de Guardia Security',
      icon: '/icons/guardia-icon-192.png',
      badge: '/icons/guardia-icon-192.png',
      vibrate: [100, 50, 100],
      data: {
        url: data.url || '/dashboard'
      }
    };
    
    event.waitUntil(self.registration.showNotification(title, options));
  } catch (error) {
    console.error('[Service Worker] Erreur lors du traitement de la notification:', error);
  }
});

// Gestion des clics sur les notifications
self.addEventListener('notificationclick', (event) => {
  console.log('[Service Worker] Clic sur notification');
  
  event.notification.close();
  
  // Naviguer vers l'URL spécifiée dans la notification ou par défaut
  const url = event.notification.data.url || '/dashboard';
  
  event.waitUntil(
    clients.matchAll({type: 'window'})
      .then((windowClients) => {
        // Vérifier si une fenêtre est déjà ouverte
        for (const client of windowClients) {
          if (client.url.includes(self.location.origin) && 'focus' in client) {
            // Réutiliser la fenêtre existante
            client.navigate(url);
            return client.focus();
          }
        }
        // Ouvrir une nouvelle fenêtre si nécessaire
        return clients.openWindow(url);
      })
  );
});

// Gestion de la synchronisation en arrière-plan
self.addEventListener('sync', (event) => {
  if (event.tag === 'guardia-scan-sync') {
    console.log('[Service Worker] Synchronisation des analyses en arrière-plan');
    event.waitUntil(syncScanData());
  }
});

// Fonction pour synchroniser les données d'analyse
async function syncScanData() {
  try {
    // Logique pour synchroniser les données d'analyse
    const pendingScans = await getPendingScans();
    if (pendingScans.length === 0) return;
    
    // Envoyer les données au serveur
    const response = await fetch('/api/sync-scans', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ scans: pendingScans })
    });
    
    if (response.ok) {
      // Marquer les analyses comme synchronisées
      await markScansAsSynced(pendingScans);
    }
  } catch (error) {
    console.error('[Service Worker] Erreur de synchronisation:', error);
  }
}

// Fonctions fictives pour la gestion des scans en attente
async function getPendingScans() {
  // Dans une implémentation réelle, récupérerait les données d'IndexedDB
  return [];
}

async function markScansAsSynced(scans) {
  // Dans une implémentation réelle, mettrait à jour IndexedDB
}
