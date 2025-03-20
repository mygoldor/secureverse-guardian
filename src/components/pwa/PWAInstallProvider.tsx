
import React, { useState, useEffect } from 'react';
import InstallAppBanner from './InstallAppBanner';
import { useDeviceDetection } from '@/hooks/use-device-detection';

const PWAInstallProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [showBanner, setShowBanner] = useState(false);
  const { isMobile } = useDeviceDetection();
  
  useEffect(() => {
    // Vérifier si l'application est déjà installée
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone === true;
    
    if (isInstalled) {
      // L'application est déjà installée, ne pas afficher la bannière
      return;
    }
    
    // Vérifier si l'utilisateur a déjà vu la bannière récemment
    const lastPrompt = localStorage.getItem('guardia_install_prompt');
    const now = Date.now();
    
    if (lastPrompt) {
      const lastPromptTime = parseInt(lastPrompt);
      const daysSinceLastPrompt = (now - lastPromptTime) / (1000 * 60 * 60 * 24);
      
      // Ne pas montrer la bannière si elle a été affichée dans les 7 derniers jours
      if (daysSinceLastPrompt < 7) {
        return;
      }
    }
    
    // Afficher la bannière après un délai pour les nouveaux utilisateurs
    const timer = setTimeout(() => {
      setShowBanner(true);
      // Enregistrer le moment où la bannière a été montrée
      localStorage.setItem('guardia_install_prompt', now.toString());
    }, 60000); // Afficher après 1 minute
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <>
      {children}
      {showBanner && <InstallAppBanner />}
    </>
  );
};

export default PWAInstallProvider;
