
import { usePWADetection } from './pwa/use-pwa-detection';
import { usePWAActions } from './pwa/use-pwa-actions';
import { useNavigate } from 'react-router-dom';
import { useToast } from './use-toast';

export function usePWAInstall() {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  // Get installation detection
  const {
    deferredPrompt,
    setDeferredPrompt,
    canInstallPWA,
    isAppInstalled
  } = usePWADetection();
  
  // Get installation actions
  const {
    downloadStarted,
    downloadError,
    startInstallation,
    resetDownload
  } = usePWAActions({
    deferredPrompt,
    setDeferredPrompt
  });
  
  // App installed handler with notifications and redirect
  const handleAppInstalled = () => {
    toast({
      title: "Installation réussie",
      description: "Guardia a été installé sur votre appareil.",
    });
    
    // Redirect to dashboard after a delay
    setTimeout(() => {
      navigate('/dashboard');
    }, 1000);
  };

  return {
    deferredPrompt,
    canInstallPWA,
    downloadStarted,
    downloadError,
    isAppInstalled,
    startInstallation,
    resetDownload,
    handleAppInstalled
  };
}
