
import React, { useEffect } from 'react';
import { Smartphone } from 'lucide-react';
import InstallPWAButton, { BeforeInstallPromptEvent } from './InstallPWAButton';

interface MobilePWAProps {
  deferredPrompt: BeforeInstallPromptEvent | null;
  onDownload: () => void;
}

const MobilePWA: React.FC<MobilePWAProps> = ({ deferredPrompt, onDownload }) => {
  // If the deferredPrompt is null after being non-null (installation happened)
  // make sure to update session storage
  useEffect(() => {
    // We can check if deferredPrompt is null and was previously non-null
    if (deferredPrompt === null && sessionStorage.getItem('promptWasAvailable') === 'true') {
      console.log('MobilePWA: deferredPrompt is now null after being available, marking choice as made');
      sessionStorage.setItem('installationChoiceMade', 'true');
    }
    
    // Track if prompt was available
    if (deferredPrompt !== null) {
      sessionStorage.setItem('promptWasAvailable', 'true');
    }
  }, [deferredPrompt]);

  return (
    <div className="bg-green-50 p-4 rounded-lg my-4">
      <h4 className="font-medium text-green-700 mb-2">
        <Smartphone className="h-4 w-4 inline mr-1" />
        Ajouter à l'écran d'accueil
      </h4>
      <p className="text-sm text-green-600 mb-2">
        Installez Guardia directement sur votre écran d'accueil pour un accès rapide et une expérience optimale.
      </p>
      <InstallPWAButton 
        deferredPrompt={deferredPrompt} 
        onInstall={() => {
          console.log('Install PWA button clicked');
          onDownload();
        }}
      />
    </div>
  );
};

export default MobilePWA;
