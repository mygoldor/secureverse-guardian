
import React, { useEffect, useState } from 'react';
import { Smartphone, Loader2 } from 'lucide-react';
import InstallPWAButton, { BeforeInstallPromptEvent } from './InstallPWAButton';
import { Progress } from '@/components/ui/progress';

interface MobilePWAProps {
  deferredPrompt: BeforeInstallPromptEvent | null;
  onDownload: () => void;
}

const MobilePWA: React.FC<MobilePWAProps> = ({ deferredPrompt, onDownload }) => {
  const [installing, setInstalling] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  
  useEffect(() => {
    if (deferredPrompt === null && sessionStorage.getItem('promptWasAvailable') === 'true') {
      sessionStorage.setItem('installationChoiceMade', 'true');
      setInstalling(false);
      setProgressValue(100);
    }
    
    if (deferredPrompt !== null) {
      sessionStorage.setItem('promptWasAvailable', 'true');
    }
  }, [deferredPrompt]);
  
  useEffect(() => {
    if (installing) {
      const interval = setInterval(() => {
        setProgressValue((prevValue) => {
          return prevValue < 90 ? prevValue + 5 : prevValue;
        });
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [installing]);

  return (
    <div className="bg-green-50 p-4 rounded-lg my-4">
      <h4 className="font-medium text-green-700 mb-2">
        <Smartphone className="h-4 w-4 inline mr-1" />
        Ajouter à l'écran d'accueil
      </h4>
      <p className="text-sm text-green-600 mb-2">
        Installez Guardia directement sur votre écran d'accueil pour un accès rapide et une expérience optimale.
      </p>
      
      {installing && (
        <div className="mb-3">
          <div className="flex items-center mb-1">
            <Loader2 className="h-4 w-4 mr-2 text-green-700 animate-spin" />
            <span className="text-sm text-green-700">Installation en cours...</span>
          </div>
          <Progress value={progressValue} className="h-2" indicatorClassName="bg-green-600" />
        </div>
      )}
      
      {deferredPrompt === null && progressValue === 100 && (
        <div className="bg-green-100 p-2 rounded text-green-800 text-sm mb-2">
          <Progress value={100} className="h-2 mb-2" indicatorClassName="bg-green-600" />
          Installation réussie ! L'application est maintenant disponible sur votre écran d'accueil.
        </div>
      )}
      
      <InstallPWAButton 
        deferredPrompt={deferredPrompt} 
        onInstall={() => {
          sessionStorage.removeItem('installationChoiceMade');
          sessionStorage.setItem('installationChoiceMade', 'true');
          setInstalling(true);
          setProgressValue(10);
          onDownload();
        }}
      />
    </div>
  );
};

export default MobilePWA;
