
import React, { useState } from 'react';
import { Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { useDeviceDetection } from '@/hooks/use-device-detection';

interface InstallPWAButtonProps {
  deferredPrompt: BeforeInstallPromptEvent | null;
  onInstall: () => void;
}

// PWA installation event interface
export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const InstallPWAButton: React.FC<InstallPWAButtonProps> = ({ deferredPrompt, onInstall }) => {
  const { toast } = useToast();
  const { isIOS, isAndroid } = useDeviceDetection();
  const [isInstalling, setIsInstalling] = useState(false);
  
  const installPWA = async () => {
    // Immediately mark as having made a choice - since clicking this button is a choice
    sessionStorage.setItem('installationChoiceMade', 'true');
    
    // Set installing state to true to show progress indicator
    setIsInstalling(true);
    
    if (!deferredPrompt) {
      // If the deferred prompt isn't available, show manual instructions based on browser
      const userAgent = navigator.userAgent;
      let instructions = '';
      
      if (isIOS) {
        // iOS-specific instructions
        instructions = "Touchez l'icône de partage, puis 'Sur l'écran d'accueil'";
      } else if (isAndroid) {
        // Android-specific instructions
        instructions = "Touchez les trois points du menu puis 'Ajouter à l'écran d'accueil'";
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
      });
      
      // Call the onInstall callback even for manual installation
      onInstall();
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
    } catch (error) {
      console.error('Error during PWA installation:', error);
      toast({
        variant: "destructive",
        title: "Erreur d'installation",
        description: "Une erreur s'est produite lors de l'installation. Vous pouvez continuer vers votre tableau de bord.",
      });
    } finally {
      // In any case, turn off the progress indicator
      setIsInstalling(false);
      // Call the onInstall callback
      onInstall();
    }
  };

  return (
    <Button 
      onClick={installPWA} 
      className="mt-2 bg-green-600 hover:bg-green-700" 
      size="sm"
      disabled={isInstalling}
    >
      {isInstalling ? (
        <>
          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
          Installation en cours...
        </>
      ) : (
        <>
          <Plus className="h-4 w-4 mr-2" />
          Ajouter à l'écran d'accueil
        </>
      )}
    </Button>
  );
};

export default InstallPWAButton;
