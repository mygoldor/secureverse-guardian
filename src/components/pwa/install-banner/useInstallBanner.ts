
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useDeviceDetection } from '@/hooks/use-device-detection';
import { usePWAInstall } from '@/hooks/use-pwa-install';

export const useInstallBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showInstructions, setShowInstructions] = useState<'ios' | 'desktop' | 'android' | null>(null);
  const { toast } = useToast();
  const { deferredPrompt, canInstallPWA, startInstallation } = usePWAInstall();
  const { isMobile, isIOS, isAndroid, isSafari, isChrome, isFirefox, isEdge } = useDeviceDetection();

  const handleInstall = async () => {
    try {
      if (isIOS && isSafari) {
        setShowInstructions('ios');
      } else if (isAndroid && !deferredPrompt) {
        setShowInstructions('android');
      } else if (!isMobile) {
        if (!deferredPrompt) {
          setShowInstructions('desktop');
        } else {
          await startInstallation();
          setIsVisible(false);
          toast({
            title: "Installation réussie",
            description: "Guardia a été installé avec succès sur votre appareil.",
            duration: 5000,
          });
        }
      } else if (deferredPrompt) {
        await startInstallation();
        setIsVisible(false);
      }
    } catch (error) {
      console.error("Erreur lors de l'installation:", error);
      toast({
        variant: "destructive",
        title: "Échec de l'installation",
        description: "Un problème est survenu lors de l'installation. Veuillez réessayer.",
      });
    }
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('guardia_install_dismissed', Date.now().toString());
  };

  const closeInstructions = () => {
    setShowInstructions(null);
  };

  const handleHelpClick = () => {
    window.open('/installation-guide', '_blank');
  };

  return {
    isVisible,
    setIsVisible,
    isDismissed,
    setIsDismissed,
    showInstructions,
    isMobile,
    isIOS,
    isAndroid,
    isSafari,
    isChrome,
    isFirefox, 
    isEdge,
    deferredPrompt,
    handleInstall,
    handleDismiss,
    closeInstructions,
    handleHelpClick
  };
};
