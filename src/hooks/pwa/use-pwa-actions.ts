
import { useState } from 'react';
import { BeforeInstallPromptEvent } from './types';
import { usePWAPlatform } from './use-pwa-platform';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface PWAActionProps {
  deferredPrompt: BeforeInstallPromptEvent | null;
  setDeferredPrompt: (prompt: BeforeInstallPromptEvent | null) => void;
}

export function usePWAActions({ deferredPrompt, setDeferredPrompt }: PWAActionProps) {
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isMobile, handleMobileInstallation, handleDesktopInstallation } = usePWAPlatform();

  // Function to initiate installation
  const startInstallation = async () => {
    // Mark as installation choice made regardless of outcome
    sessionStorage.setItem('installationChoiceMade', 'true');
    
    // For mobile devices without the prompt, provide guidance
    if (isMobile && !deferredPrompt) {
      setDownloadStarted(true);
      setDownloadError(false);
      
      handleMobileInstallation();
      return;
    }
    
    // For mobile with deferredPrompt available
    if (isMobile && deferredPrompt) {
      try {
        setDownloadStarted(true);
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        
        if (choiceResult.outcome === 'accepted') {
          // User accepted the install prompt
          setDeferredPrompt(null);
          
          toast({
            title: "Installation réussie",
            description: "Guardia a été installé sur votre appareil.",
          });
        } else {
          // User dismissed the install prompt
          toast({
            title: "Installation annulée",
            description: "Vous pouvez réessayer plus tard.",
          });
        }
        
        // Redirect after a delay regardless of outcome
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
        
      } catch (error) {
        console.error('Error during PWA installation:', error);
        setDownloadError(true);
        
        // Redirect on error
        setTimeout(() => {
          navigate('/dashboard');
        }, 3000);
      }
      return;
    }
    
    // For desktop platforms
    handleDesktopInstallation();
    setDownloadStarted(true);
  };

  // Function to reset download state
  const resetDownload = () => {
    setDownloadError(false);
    setDownloadStarted(false);
  };

  return {
    downloadStarted,
    downloadError,
    startInstallation,
    resetDownload
  };
}
