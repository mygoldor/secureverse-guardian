
import { usePWADetection } from './pwa/use-pwa-detection';
import { usePWAActions } from './pwa/use-pwa-actions';
import { useToast } from './use-toast';

// Remove direct Router dependency from the hook
export function usePWAInstall() {
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
  
  // App installed handler with notifications
  const handleAppInstalled = (callback?: () => void) => {
    toast({
      title: "Installation réussie",
      description: "Guardia a été installé sur votre appareil.",
    });
    
    // Use callback instead of direct navigation
    if (callback) {
      setTimeout(() => {
        callback();
      }, 1000);
    }
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
