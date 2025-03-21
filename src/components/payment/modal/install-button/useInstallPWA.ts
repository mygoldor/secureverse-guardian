
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useDeviceDetection } from '@/hooks/use-device-detection';
import { BeforeInstallPromptEvent } from '../types/installPwa';

export function useInstallPWA(
  deferredPrompt: BeforeInstallPromptEvent | null,
  onInstall: () => void,
  onNavigate?: () => void // Optional callback for navigation
) {
  const { toast } = useToast();
  const { isIOS, isAndroid } = useDeviceDetection();
  const [isInstalling, setIsInstalling] = useState(false);

  const installPWA = async () => {
    // Immediately mark as having made a choice - since clicking this button is a choice
    sessionStorage.setItem('installationChoiceMade', 'true');
    
    // Set installing state to true to show progress indicator
    setIsInstalling(true);
    
    // Force a small delay to ensure the UI updates before proceeding
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (!deferredPrompt) {
      // If the deferred prompt isn't available, show manual instructions based on browser
      const userAgent = navigator.userAgent;
      let instructions = '';
      
      if (isIOS) {
        // iOS-specific instructions
        instructions = "Touchez l'icône de partage, puis 'Sur l'écran d'accueil'";
      } else if (isAndroid) {
        if (/Chrome/i.test(userAgent)) {
          instructions = "Touchez les trois points du menu puis 'Ajouter à l'écran d'accueil'";
        } else if (/Firefox/i.test(userAgent)) {
          instructions = "Touchez les trois points du menu puis 'Installer'";
        } else if (/Samsung/i.test(userAgent)) {
          instructions = "Touchez le bouton de menu puis 'Ajouter page à'";
        } else {
          instructions = "Touchez le menu de votre navigateur puis 'Ajouter à l'écran d'accueil'";
        }
      } else if (/Firefox/i.test(userAgent)) {
        instructions = "Appuyez sur les trois points du menu puis 'Installer'";
      } else if (/Edge/i.test(userAgent)) {
        instructions = "Appuyez sur les trois points du menu puis 'Installer'";
      } else {
        instructions = "Utilisez le menu de votre navigateur et sélectionnez 'Ajouter à l'écran d'accueil'";
      }
      
      toast({
        title: "Installation manuelle",
        description: instructions,
        duration: 7000,
      });
      
      // Call the onInstall callback even for manual installation
      onInstall();
      
      // Use callback for navigation if provided
      if (onNavigate) {
        setTimeout(() => {
          onNavigate();
        }, 5000);
      }
      
      setIsInstalling(false);
      return;
    }

    try {
      // Show the install prompt
      await deferredPrompt.prompt();
      
      // Wait for the user to respond to the prompt
      const choiceResult = await deferredPrompt.userChoice;
      
      if (choiceResult.outcome === 'accepted') {
        toast({
          title: "Installation réussie",
          description: "Guardia a été ajouté à votre écran d'accueil.",
        });
      } else {
        toast({
          title: "Installation annulée",
          description: "Vous pouvez toujours installer Guardia plus tard depuis le menu de votre navigateur.",
        });
      }
      
      // Use callback for navigation if provided
      if (onNavigate) {
        setTimeout(() => {
          onNavigate();
        }, 3000);
      }
      
    } catch (error) {
      console.error('Error during PWA installation:', error);
      toast({
        variant: "destructive",
        title: "Erreur d'installation",
        description: "Une erreur s'est produite lors de l'installation. Vous pouvez continuer vers votre tableau de bord.",
      });
      
      // Still use callback for navigation if provided
      if (onNavigate) {
        setTimeout(() => {
          onNavigate();
        }, 3000);
      }
    } finally {
      // In any case, turn off the progress indicator
      setIsInstalling(false);
      // Call the onInstall callback
      onInstall();
    }
  };

  return {
    isInstalling,
    installPWA
  };
}
