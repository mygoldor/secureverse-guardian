
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle, Download, Plus, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// PWA installation event interface
interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const [installationStarted, setInstallationStarted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [canInstallPWA, setCanInstallPWA] = useState(false);
  
  // Handle close function
  const handleClose = () => {
    try {
      if (typeof onClose === 'function') {
        onClose();
      }
    } catch (error) {
      console.error('Error in modal close handler:', error);
      // Fallback close method if the provided handler fails
      if (typeof window !== 'undefined') {
        window.history.back();
      }
    }
  };

  // Detect if user is on mobile
  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    setIsMobile(mobileRegex.test(userAgent));
  }, []);

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

  // Start installation automatically
  useEffect(() => {
    if (isOpen && !installationStarted) {
      // Set a short delay before starting download to ensure modal is visible
      const timer = setTimeout(() => {
        startInstallation();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      console.log('SuccessModal unmounted successfully');
    };
  }, []);

  // Function to start installation
  const startInstallation = () => {
    setInstallationStarted(true);
    
    if (isMobile) {
      // Handle mobile platforms
      const userAgent = window.navigator.userAgent;
      
      if (userAgent.indexOf('Android') !== -1) {
        // For Android devices
        window.location.href = 'https://play.google.com/store/apps/details?id=com.guardia.security';
        toast({
          title: "Installation mobile",
          description: "Vous êtes redirigé vers Google Play Store pour installer Guardia Security.",
        });
      } else if (userAgent.indexOf('iPhone') !== -1 || userAgent.indexOf('iPad') !== -1) {
        // For iOS devices
        window.location.href = 'https://apps.apple.com/app/guardia-security/id1234567890';
        toast({
          title: "Installation mobile",
          description: "Vous êtes redirigé vers l'App Store pour installer Guardia Security.",
        });
      } else {
        // For other mobile platforms
        toast({
          variant: "destructive",
          title: "Appareil non reconnu",
          description: "Veuillez télécharger manuellement l'application depuis votre store d'applications.",
        });
      }
    } else {
      // Handle desktop platforms (existing code)
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
    }
  };

  // Function to install PWA
  const installPWA = async () => {
    if (!deferredPrompt) {
      // If the deferred prompt isn't available, show alternative instructions
      toast({
        title: "Installation manuelle",
        description: "Pour installer l'application, utilisez le menu de votre navigateur et sélectionnez 'Ajouter à l'écran d'accueil'.",
      });
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
    
    // Clear the deferredPrompt variable as it can only be used once
    setDeferredPrompt(null);
  };

  // Make sure isOpen is a boolean to prevent type errors
  const isModalOpen = Boolean(isOpen);

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <DialogTitle className="text-center text-2xl">Paiement réussi</DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-4">
          <p>Merci pour votre abonnement à Guardia !</p>
          <p>Un email de confirmation a été envoyé à votre adresse avec un lien de validation.</p>
          
          <div className="bg-blue-50 p-4 rounded-lg my-4">
            <h4 className="font-medium text-blue-700 mb-2">Installation de Guardia</h4>
            <p className="text-sm text-blue-600 mb-2">
              {installationStarted 
                ? isMobile 
                  ? "Vous êtes redirigé vers le store d'applications pour installer Guardia Security." 
                  : "Le téléchargement a commencé. Exécutez le fichier une fois le téléchargement terminé pour installer Guardia."
                : "Téléchargement automatique en cours de préparation..."}
            </p>
            {installationStarted && (
              <Button 
                onClick={startInstallation} 
                className="mt-2" 
                variant="outline"
                size="sm"
              >
                <Download className="h-4 w-4 mr-2" />
                {isMobile ? "Télécharger sur le store" : "Télécharger à nouveau"}
              </Button>
            )}
          </div>
          
          {/* Add to Home Screen option for mobile */}
          {isMobile && (
            <div className="bg-green-50 p-4 rounded-lg my-4">
              <h4 className="font-medium text-green-700 mb-2">
                <Smartphone className="h-4 w-4 inline mr-1" />
                Ajouter à l'écran d'accueil
              </h4>
              <p className="text-sm text-green-600 mb-2">
                Installez Guardia directement sur votre écran d'accueil pour un accès rapide et une expérience optimale.
              </p>
              <Button 
                onClick={installPWA} 
                className="mt-2 bg-green-600 hover:bg-green-700" 
                size="sm"
              >
                <Plus className="h-4 w-4 mr-2" />
                Ajouter à l'écran d'accueil
              </Button>
            </div>
          )}
          
          <p className="text-sm text-gray-500">Vous allez être redirigé vers votre tableau de bord...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
