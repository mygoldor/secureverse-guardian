
import { useState, useEffect } from 'react';
import { BeforeInstallPromptEvent } from '@/components/payment/modal/InstallPWAButton';
import { useToast } from '@/hooks/use-toast';
import { useDeviceDetection } from '@/hooks/use-device-detection';

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [canInstallPWA, setCanInstallPWA] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const [downloadError, setDownloadError] = useState(false);
  const { toast } = useToast();
  const { isMobile } = useDeviceDetection();

  // Handle PWA installation prompt
  useEffect(() => {
    // Capture the install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      // Update UI to notify the user they can add to home screen
      setCanInstallPWA(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  // Function to initiate desktop download
  const startInstallation = () => {
    // For mobile devices, we'll handle differently
    if (isMobile) {
      // For mobile, we'll just mark it as a success since they'll use the PWA
      setDownloadStarted(true);
      setDownloadError(false);
      
      if (!deferredPrompt) {
        // Guide for manual installation
        toast({
          title: "Installation manuelle requise",
          description: "Veuillez suivre les instructions pour installer Guardia sur votre appareil mobile.",
        });
        // Mark as installation choice made to allow navigation
        sessionStorage.setItem('installationChoiceMade', 'true');
      }
      return;
    }
    
    // Get the user's operating system for desktop platforms
    const userAgent = window.navigator.userAgent;
    let downloadUrl = '';
    let platformName = '';
    
    // Set download URL based on detected platform
    if (userAgent.indexOf('Windows') !== -1) {
      downloadUrl = '/downloads/Guardia-Security-1.0.0-win.exe';
      platformName = 'Windows';
    } else if (userAgent.indexOf('Mac') !== -1) {
      downloadUrl = '/downloads/Guardia-Security-1.0.0-mac.dmg';
      platformName = 'macOS';
    } else if (userAgent.indexOf('Linux') !== -1) {
      downloadUrl = '/downloads/Guardia-Security-1.0.0-linux.AppImage';
      platformName = 'Linux';
    } else {
      toast({
        variant: "destructive",
        title: "Système non reconnu",
        description: "Veuillez télécharger manuellement la version correspondant à votre système d'exploitation.",
      });
      setDownloadError(true);
      // Still mark as choice made to allow navigation
      sessionStorage.setItem('installationChoiceMade', 'true');
      return;
    }
    
    toast({
      title: "Préparation du téléchargement",
      description: `Nous préparons le téléchargement pour ${platformName}...`,
    });
    
    // First check if the file exists by making a HEAD request
    fetch(downloadUrl, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          // File exists, proceed with download
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = downloadUrl.split('/').pop() || 'Guardia-Security-Installer';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          setDownloadStarted(true);
          setDownloadError(false);
          
          toast({
            title: "Téléchargement démarré",
            description: "L'installateur de Guardia est en cours de téléchargement.",
          });
        } else {
          // File doesn't exist but we don't want to block user progress
          console.error('Download file not found:', downloadUrl);
          setDownloadError(true);
          
          toast({
            variant: "destructive",
            title: "Installation alternative",
            description: "L'installateur n'est pas disponible actuellement. Vous serez redirigé vers votre tableau de bord.",
          });
          
          // Still mark as made a choice to allow navigation
          sessionStorage.setItem('installationChoiceMade', 'true');
        }
      })
      .catch(error => {
        console.error('Error checking download file:', error);
        setDownloadError(true);
        
        toast({
          variant: "destructive",
          title: "Installation alternative",
          description: "Une erreur s'est produite. Vous pouvez continuer vers votre tableau de bord.",
        });
        
        // Still mark as made a choice to allow navigation
        sessionStorage.setItem('installationChoiceMade', 'true');
      });
  };

  // Function to reset download state
  const resetDownload = () => {
    setDownloadError(false);
    setDownloadStarted(false);
  };

  return {
    deferredPrompt,
    canInstallPWA,
    downloadStarted,
    downloadError,
    startInstallation,
    resetDownload
  };
}
