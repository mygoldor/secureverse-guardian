
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

// Ensure menu button is visible on DOM content loaded
document.addEventListener("DOMContentLoaded", function() {
  const menuButton = document.querySelector(".menu-button");
  if (menuButton) {
    menuButton.style.display = "block"; // Ensure it's displayed on loading
    console.log("Menu button visibility enforced");
  } else {
    console.log("Menu button not found in DOM");
    // Try again after a short delay in case of delayed rendering
    setTimeout(() => {
      const delayedMenuButton = document.querySelector(".menu-button");
      if (delayedMenuButton) {
        delayedMenuButton.style.display = "block";
        console.log("Menu button visibility enforced after delay");
      }
    }, 1000);
  }
});

createRoot(document.getElementById("root")!).render(<App />);
