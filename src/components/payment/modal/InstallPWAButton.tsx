
import React from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

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
  
  const installPWA = async () => {
    // Immediately mark as having made a choice - since clicking this button is a choice
    console.log('PWA installation started, marking choice as made');
    sessionStorage.setItem('installationChoiceMade', 'true');
    
    if (!deferredPrompt) {
      // If the deferred prompt isn't available, show manual instructions based on browser
      const userAgent = navigator.userAgent;
      let instructions = '';
      
      if (/Safari/i.test(userAgent) && !/Chrome/i.test(userAgent)) {
        // Safari on iOS
        instructions = "Touchez l'icône de partage, puis 'Sur l'écran d'accueil'";
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
      return;
    }

    // Show the install prompt
    deferredPrompt.prompt();
    
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
    
    // Call the onInstall callback in any case
    onInstall();
  };

  return (
    <Button 
      onClick={installPWA} 
      className="mt-2 bg-green-600 hover:bg-green-700" 
      size="sm"
    >
      <Plus className="h-4 w-4 mr-2" />
      Ajouter à l'écran d'accueil
    </Button>
  );
};

export default InstallPWAButton;
