
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Register the service worker with better error handling
if ("serviceWorker" in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register("/service-worker.js")
      .then((registration) => {
        console.log("Service Worker registered successfully! Scope:", registration.scope);
        
        // Check for updates periodically
        setInterval(() => {
          registration.update();
        }, 60 * 60 * 1000); // Check for updates every hour
      })
      .catch((error) => {
        console.error("Service Worker registration failed:", error);
      });
  });
}

// Add event listener for the PWA installation event for debugging
window.addEventListener('appinstalled', (event) => {
  console.log('Guardia was successfully installed as a PWA');
});

createRoot(document.getElementById("root")!).render(<App />);
