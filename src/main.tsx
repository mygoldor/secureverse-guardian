import * as React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Get the root element
const rootElement = document.getElementById('root');

// Create a root using createRoot API
if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<App />);
}

// Register the service worker with better error handling and logging
if ("serviceWorker" in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered successfully! Scope:", registration.scope);
        
        // Check for new service workers and update
        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          if (installingWorker == null) {
            return;
          }
          
          installingWorker.onstatechange = () => {
            if (installingWorker.state === 'installed') {
              if (navigator.serviceWorker.controller) {
                // At this point, the updated precached content has been fetched,
                // but the previous service worker will still serve the older
                // content until all client tabs are closed.
                console.log('New content is available and will be used when all tabs for this page are closed.');
                
                // Optional: Show a notification to the user
                if ('Notification' in window && Notification.permission === 'granted') {
                  navigator.serviceWorker.ready.then(registration => {
                    registration.showNotification('Mise à jour disponible', {
                      body: 'Une nouvelle version de Guardia est disponible. Fermez et rouvrez l\'application pour l\'utiliser.',
                      icon: '/icons/guardia-icon-192.png'
                    });
                  });
                }
              } else {
                // At this point, everything has been precached.
                console.log('Content is cached for offline use.');
              }
            }
          };
        };
        
        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000); // Check for updates every hour
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
  
  // Handle controller change (when a new service worker takes over)
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    console.log('New service worker controller, page will reload if needed.');
  });
}

// Add event listener for the PWA installation event
window.addEventListener('appinstalled', (event) => {
  console.log('Guardia was successfully installed as a PWA');
  
  // Record the installation for analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'pwa_installed', {
      event_category: 'engagement',
      event_label: 'PWA Installation'
    });
  }
  
  // Update UI if needed to reflect installed state
  const installedElements = document.querySelectorAll('.show-when-installed');
  installedElements.forEach(el => {
    (el as HTMLElement).style.display = 'block';
  });
  
  const notInstalledElements = document.querySelectorAll('.hide-when-installed');
  notInstalledElements.forEach(el => {
    (el as HTMLElement).style.display = 'none';
  });
});

// Detect if the app is launched in standalone mode (PWA)
if (window.matchMedia('(display-mode: standalone)').matches || (window.navigator as any).standalone === true) {
  console.log('Application launched in standalone mode (PWA)');
  
  // Record app launch for analytics
  if (typeof window.gtag === 'function') {
    window.gtag('event', 'pwa_launched', {
      event_category: 'engagement',
      event_label: 'PWA Launch'
    });
  }
}

// Ensure menu button is visible on DOM content loaded
document.addEventListener("DOMContentLoaded", function() {
  const menuButton = document.querySelector(".menu-button") as HTMLElement;
  if (menuButton) {
    menuButton.style.display = "block"; // Ensure it's displayed on loading
    console.log("Menu button visibility enforced");
  } else {
    console.log("Menu button not found in DOM");
    // Try again after a short delay in case of delayed rendering
    setTimeout(() => {
      const delayedMenuButton = document.querySelector(".menu-button") as HTMLElement;
      if (delayedMenuButton) {
        delayedMenuButton.style.display = "block";
        console.log("Menu button visibility enforced after delay");
      }
    }, 1000);
  }
});

// Request notification permission with better UX
const requestNotificationPermission = async () => {
  if (!('Notification' in window)) {
    console.log('This browser does not support notifications');
    return;
  }
  
  if (Notification.permission === 'granted') {
    console.log('Notification permission already granted');
    return;
  }
  
  if (Notification.permission !== 'denied') {
    try {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        console.log('Notification permission granted');
      }
    } catch (error) {
      console.error('Error requesting notification permission:', error);
    }
  }
};

// Request permission after user interaction
document.addEventListener('click', () => {
  if (!window.__notificationPermissionRequested) {
    window.__notificationPermissionRequested = true;
    // Delay the request to avoid disrupting the user experience
    setTimeout(() => {
      requestNotificationPermission();
    }, 3000);
  }
});

// Add the global property for TypeScript
declare global {
  interface Window {
    __notificationPermissionRequested?: boolean;
    gtag?: (...args: any[]) => void;
  }
}
