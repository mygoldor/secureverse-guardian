
import React from 'react';
import { Smartphone } from 'lucide-react';
import { BeforeInstallPromptEvent } from './types/installPwa';
import InstallProgressIndicator from './pwa-components/InstallProgressIndicator';
import InstallActions from './pwa-components/InstallActions';
import { useMobilePWAInstall } from './hooks/useMobilePWAInstall';

interface MobilePWAProps {
  deferredPrompt: BeforeInstallPromptEvent | null;
  onDownload: () => void;
}

const MobilePWA: React.FC<MobilePWAProps> = ({ deferredPrompt, onDownload }) => {
  const {
    installing,
    progressValue,
    installComplete,
    installError,
    handleInstallClick,
    handleSkip
  } = useMobilePWAInstall(deferredPrompt, onDownload);

  return (
    <div className="bg-green-50 p-4 rounded-lg my-4">
      <h4 className="font-medium text-green-700 mb-2">
        <Smartphone className="h-4 w-4 inline mr-1" />
        Ajouter à l'écran d'accueil
      </h4>
      <p className="text-sm text-green-600 mb-2">
        Installez Guardia directement sur votre écran d'accueil pour un accès rapide et une expérience optimale.
      </p>
      
      <InstallProgressIndicator
        installing={installing}
        progressValue={progressValue}
        installComplete={installComplete}
        installError={installError}
      />
      
      <InstallActions
        progressValue={progressValue}
        installComplete={installComplete}
        installing={installing}
        deferredPrompt={deferredPrompt}
        onInstall={handleInstallClick}
        onSkip={handleSkip}
      />
    </div>
  );
};

export default MobilePWA;
