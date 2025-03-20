
import React from 'react';
import { Button } from '@/components/ui/button';
import { BeforeInstallPromptEvent, InstallPWAButtonProps } from './types/installPwa';
import InstallButtonIcon from './install-button/InstallButtonIcon';
import InstallButtonContent from './install-button/InstallButtonContent';
import { useInstallPWA } from './install-button/useInstallPWA';

const InstallPWAButton: React.FC<InstallPWAButtonProps> = ({ deferredPrompt, onInstall }) => {
  const { isInstalling, installPWA } = useInstallPWA(deferredPrompt, onInstall);

  return (
    <Button 
      onClick={installPWA} 
      className="mt-2 bg-green-600 hover:bg-green-700 w-full" 
      size="sm"
      disabled={isInstalling}
    >
      <InstallButtonIcon isInstalling={isInstalling} />
      <InstallButtonContent isInstalling={isInstalling} />
    </Button>
  );
};

export default InstallPWAButton;

// Export the BeforeInstallPromptEvent type for backward compatibility
export type { BeforeInstallPromptEvent };
