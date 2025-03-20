
import { useState, useEffect } from 'react';
import { BeforeInstallPromptEvent } from './types';

export function usePWADetection() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [canInstallPWA, setCanInstallPWA] = useState(false);
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  
  useEffect(() => {
    // Check if app is already installed as a PWA
    const checkIfInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
        || (window.navigator as any).standalone === true;
      
      setIsAppInstalled(isStandalone);
      
      if (isStandalone) {
        setCanInstallPWA(false);
        sessionStorage.setItem('installationChoiceMade', 'true');
      }
    };
    
    checkIfInstalled();
    
    // Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const listener = (e: MediaQueryListEvent) => {
      setIsAppInstalled(e.matches);
      if (e.matches) {
        setCanInstallPWA(false);
        sessionStorage.setItem('installationChoiceMade', 'true');
      }
    };
    
    try {
      // Modern browsers
      mediaQuery.addEventListener('change', listener);
    } catch (e) {
      // Fallback for older browsers
      mediaQuery.addListener(listener);
    }
    
    return () => {
      try {
        mediaQuery.removeEventListener('change', listener);
      } catch (e) {
        mediaQuery.removeListener(listener);
      }
    };
  }, []);

  // Handle PWA installation prompt
  useEffect(() => {
    // Skip if already installed
    if (isAppInstalled) return;
    
    // Capture the install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Update UI to notify the user they can add to home screen
      setCanInstallPWA(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    
    // Handle app installed event
    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setCanInstallPWA(false);
      setDeferredPrompt(null);
      
      // Mark as installation choice made
      sessionStorage.setItem('installationChoiceMade', 'true');
    };
    
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isAppInstalled]);

  return {
    deferredPrompt,
    setDeferredPrompt,
    canInstallPWA,
    setCanInstallPWA,
    isAppInstalled
  };
}
