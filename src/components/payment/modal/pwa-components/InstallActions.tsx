
import React from 'react';
import { Button } from '@/components/ui/button';
import InstallPWAButton from '../InstallPWAButton';
import { BeforeInstallPromptEvent } from '../types/installPwa';

interface InstallActionsProps {
  progressValue: number;
  installComplete: boolean;
  installing: boolean;
  deferredPrompt: BeforeInstallPromptEvent | null;
  onInstall: () => void;
  onSkip: () => void;
}

const InstallActions: React.FC<InstallActionsProps> = ({
  progressValue,
  installComplete,
  installing,
  deferredPrompt,
  onInstall,
  onSkip
}) => {
  return (
    <>
      {progressValue < 100 && !installComplete && (
        <InstallPWAButton 
          deferredPrompt={deferredPrompt} 
          onInstall={onInstall}
        />
      )}
      
      {!installComplete && !installing && (
        <button 
          onClick={onSkip} 
          className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700"
        >
          Passer cette étape et continuer
        </button>
      )}
    </>
  );
};

export default InstallActions;
