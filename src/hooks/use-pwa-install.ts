
import { useState, useEffect } from 'react';
import { BeforeInstallPromptEvent } from '@/components/payment/modal/InstallPWAButton';
import { useToast } from '@/hooks/use-toast';

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [canInstallPWA, setCanInstallPWA] = useState(false);
  const [downloadStarted, setDownloadStarted] = useState(false);
  const { toast } = useToast();

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
    // Get the user's operating system for desktop platforms
    const userAgent = window.navigator.userAgent;
    let downloadUrl = '';
    
    // Set download URL based on detected platform
    if (userAgent.indexOf('Windows') !== -1) {
      downloadUrl = '/downloads/Guardia-Security-1.0.0-win.exe';
      toast({
        title: "Préparation du téléchargement",
        description: "Nous préparons le téléchargement pour Windows...",
      });
    } else if (userAgent.indexOf('Mac') !== -1) {
      downloadUrl = '/downloads/Guardia-Security-1.0.0-mac.dmg';
      toast({
        title: "Préparation du téléchargement",
        description: "Nous préparons le téléchargement pour macOS...",
      });
    } else if (userAgent.indexOf('Linux') !== -1) {
      downloadUrl = '/downloads/Guardia-Security-1.0.0-linux.AppImage';
      toast({
        title: "Préparation du téléchargement",
        description: "Nous préparons le téléchargement pour Linux...",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Système non reconnu",
        description: "Veuillez télécharger manuellement la version correspondant à votre système d'exploitation.",
      });
      return;
    }
    
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
          
          toast({
            title: "Téléchargement démarré",
            description: "L'installateur de Guardia est en cours de téléchargement.",
          });
        } else {
          // File doesn't exist
          console.error('Download file not found:', downloadUrl);
          
          toast({
            variant: "destructive",
            title: "Fichier non disponible",
            description: "Le fichier d'installation n'est pas encore disponible. Veuillez réessayer plus tard.",
          });
        }
      })
      .catch(error => {
        console.error('Error checking download file:', error);
        
        toast({
          variant: "destructive",
          title: "Erreur de téléchargement",
          description: "Une erreur s'est produite lors de la vérification du fichier. Veuillez réessayer plus tard.",
        });
      });
  };

  return {
    deferredPrompt,
    canInstallPWA,
    downloadStarted,
    startInstallation
  };
}
