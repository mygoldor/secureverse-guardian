
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useInstallPWA } from './install-button/useInstallPWA';
import InstallButtonContent from './install-button/InstallButtonContent';
import { BeforeInstallPromptEvent } from './types/installPwa';

interface InstallPWAButtonProps {
  deferredPrompt: BeforeInstallPromptEvent | null;
  onInstall: () => void;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
}

const InstallPWAButton: React.FC<InstallPWAButtonProps> = ({
  deferredPrompt,
  onInstall,
  className = '',
  variant = 'default'
}) => {
  const navigate = useNavigate(); // Safe inside component
  const { isInstalling, installPWA } = useInstallPWA(
    deferredPrompt, 
    onInstall,
    () => navigate('/dashboard') // Pass navigation as callback
  );
  
  return (
    <Button
      onClick={installPWA}
      disabled={isInstalling}
      className={className}
      variant={variant}
    >
      <InstallButtonContent isInstalling={isInstalling} />
    </Button>
  );
};

export default InstallPWAButton;
