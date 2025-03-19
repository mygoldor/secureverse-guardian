
import { useState, useEffect } from 'react';
import { BeforeInstallPromptEvent } from '@/components/payment/modal/InstallPWAButton';
import { useToast } from '@/hooks/use-toast';

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [canInstallPWA, setCanInstallPWA] = useState(false);
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

  // Function to install PWA
  const startInstallation = () => {
    // Get the user's operating system for desktop platforms
    const userAgent = window.navigator.userAgent;
    let downloadLink = '';
    
    if (userAgent.indexOf('Windows') !== -1) {
      downloadLink = '/Guardia-Security-1.0.0-win.exe';
      toast({
        title: "Téléchargement démarré",
        description: "L'installateur Windows de Guardia est en cours de téléchargement.",
      });
    } else if (userAgent.indexOf('Mac') !== -1) {
      downloadLink = '/Guardia-Security-1.0.0-mac.dmg';
      toast({
        title: "Téléchargement démarré",
        description: "L'installateur macOS de Guardia est en cours de téléchargement.",
      });
    } else if (userAgent.indexOf('Linux') !== -1) {
      downloadLink = '/Guardia-Security-1.0.0-linux.AppImage';
      toast({
        title: "Téléchargement démarré",
        description: "L'installateur Linux de Guardia est en cours de téléchargement.",
      });
    } else {
      toast({
        variant: "destructive",
        title: "Système non reconnu",
        description: "Veuillez télécharger manuellement la version correspondant à votre système d'exploitation.",
      });
      return;
    }
    
    // Create invisible anchor for download
    const link = document.createElement('a');
    link.href = downloadLink;
    link.download = downloadLink.split('/').pop() || 'Guardia-Security-Installer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return {
    deferredPrompt,
    canInstallPWA,
    startInstallation
  };
}
