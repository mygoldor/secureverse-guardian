
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
  const { isMobile, isIOS, isAndroid } = useDeviceDetection();

  // Check if the app is already installed as a PWA
  const [isAppInstalled, setIsAppInstalled] = useState(false);
  
  useEffect(() => {
    // Check if app is already installed as a PWA
    const checkIfInstalled = () => {
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
        || (window.navigator as any).standalone === true;
      
      setIsAppInstalled(isStandalone);
      
      if (isStandalone) {
        setCanInstallPWA(false);
      }
    };
    
    checkIfInstalled();
    
    // Listen for display mode changes
    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const listener = (e: MediaQueryListEvent) => {
      setIsAppInstalled(e.matches);
      if (e.matches) {
        setCanInstallPWA(false);
      }
    };
    
    try {
      // Modern browsers
      mediaQuery.addEventListener('change', listener);
    } catch (e) {
      // Fallback for older browsers
      mediaQuery.addListener(listener);
    }
    
    return () => {
      try {
        mediaQuery.removeEventListener('change', listener);
      } catch (e) {
        mediaQuery.removeListener(listener);
      }
    };
  }, []);

  // Handle PWA installation prompt
  useEffect(() => {
    // Skip if already installed
    if (isAppInstalled) return;
    
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
    
    // Handle app installed event
    const handleAppInstalled = () => {
      setIsAppInstalled(true);
      setCanInstallPWA(false);
      setDeferredPrompt(null);
      
      toast({
        title: "Installation réussie",
        description: "Guardia a été installé sur votre appareil.",
      });
      
      // Mark as installation choice made
      sessionStorage.setItem('installationChoiceMade', 'true');
    };
    
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, [isAppInstalled, toast]);

  // Function to initiate installation
  const startInstallation = async () => {
    // For mobile devices without the prompt, provide guidance
    if (isMobile && !deferredPrompt) {
      setDownloadStarted(true);
      setDownloadError(false);
      
      // Mark as installation choice made
      sessionStorage.setItem('installationChoiceMade', 'true');
      
      // Provide OS-specific installation guidance
      if (isIOS) {
        toast({
          title: "Installation sur iOS",
          description: "Touchez l'icône de partage puis 'Sur l'écran d'accueil'.",
          duration: 7000,
        });
      } else if (isAndroid) {
        toast({
          title: "Installation sur Android",
          description: "Dans le menu de votre navigateur, sélectionnez 'Ajouter à l'écran d'accueil'.",
          duration: 7000,
        });
      }
      
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
          sessionStorage.setItem('installationChoiceMade', 'true');
        } else {
          // User dismissed the install prompt
          toast({
            title: "Installation annulée",
            description: "Vous pouvez réessayer plus tard.",
          });
        }
      } catch (error) {
        console.error('Error during PWA installation:', error);
        setDownloadError(true);
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
          
          // Mark as installation choice made
          sessionStorage.setItem('installationChoiceMade', 'true');
        } else {
          // File doesn't exist but we don't want to block user progress
          console.error('Download file not found:', downloadUrl);
          setDownloadError(true);
          
          toast({
            variant: "warning",
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
    isAppInstalled,
    startInstallation,
    resetDownload
  };
}
