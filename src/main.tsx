
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Register the service worker
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("/service-worker.js")
    .then(() => console.log("Service Worker registered successfully!"))
    .catch((error) => console.log("Service Worker registration failed:", error));
}

createRoot(document.getElementById("root")!).render(<App />);
