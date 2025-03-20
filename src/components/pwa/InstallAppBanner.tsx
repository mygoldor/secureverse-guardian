
import React, { useState, useEffect } from 'react';
import { Bell, Download, X, HelpCircle, Smartphone, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { usePWAInstall } from '@/hooks/use-pwa-install';
import { useDeviceDetection } from '@/hooks/use-device-detection';

const InstallAppBanner: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const [showInstructions, setShowInstructions] = useState<'ios' | 'desktop' | 'android' | null>(null);
  const { toast } = useToast();
  const { deferredPrompt, canInstallPWA, startInstallation } = usePWAInstall();
  const { isMobile, isIOS, isAndroid, isSafari, isChrome, isFirefox, isEdge } = useDeviceDetection();

  // Vérifier si l'application est déjà installée
  useEffect(() => {
    // Vérifier si l'application est déjà en mode standalone/installed
    const isInstalled = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone === true;
    
    // Si l'utilisateur peut installer la PWA et qu'elle n'est pas déjà installée
    if (canInstallPWA && !isInstalled && !isDismissed) {
      // Vérifier si l'utilisateur a déjà rejeté la bannière récemment
      const lastDismissed = localStorage.getItem('guardia_install_dismissed');
      if (!lastDismissed || Date.now() - parseInt(lastDismissed) > 7 * 24 * 60 * 60 * 1000) {
        // N'afficher qu'après un certain délai
        const timer = setTimeout(() => {
          setIsVisible(true);
        }, 10000); // 10 secondes
        
        return () => clearTimeout(timer);
      }
    }
  }, [canInstallPWA, isDismissed]);

  // Fonction pour installer l'application
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

  // Fermer la bannière et marquer comme rejetée
  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('guardia_install_dismissed', Date.now().toString());
  };

  // Fermer les instructions
  const closeInstructions = () => {
    setShowInstructions(null);
  };

  // Si la bannière ne doit pas être affichée, ne rien rendre
  if (!isVisible) return null;

  // Détecter le type de navigateur pour les instructions spécifiques
  const getBrowserSpecificInstructions = () => {
    if (isIOS && isSafari) {
      return (
        <div className="space-y-2 mt-2">
          <h4 className="font-medium">Instructions pour Safari sur iOS:</h4>
          <ol className="list-decimal pl-5 text-sm">
            <li>Touchez l'icône de partage <span className="inline-block px-2 py-1 bg-gray-100 rounded">􀈂</span> en bas de l'écran</li>
            <li>Faites défiler et touchez "Sur l'écran d'accueil"</li>
            <li>Touchez "Ajouter" en haut à droite</li>
          </ol>
        </div>
      );
    } else if (isChrome) {
      return (
        <div className="space-y-2 mt-2">
          <h4 className="font-medium">Instructions pour Chrome:</h4>
          <ol className="list-decimal pl-5 text-sm">
            <li>Cliquez sur les trois points ⋮ en haut à droite</li>
            <li>Sélectionnez "Installer Guardia..."</li>
          </ol>
        </div>
      );
    } else if (isEdge) {
      return (
        <div className="space-y-2 mt-2">
          <h4 className="font-medium">Instructions pour Edge:</h4>
          <ol className="list-decimal pl-5 text-sm">
            <li>Cliquez sur les trois points ... en haut à droite</li>
            <li>Sélectionnez "Applications" puis "Installer cette application"</li>
          </ol>
        </div>
      );
    } else if (isFirefox) {
      return (
        <div className="space-y-2 mt-2">
          <h4 className="font-medium">Instructions pour Firefox:</h4>
          <ol className="list-decimal pl-5 text-sm">
            <li>Firefox ne prend pas entièrement en charge l'installation des PWA</li>
            <li>Vous pouvez ajouter un marque-page ou créer un raccourci manuellement</li>
          </ol>
        </div>
      );
    } else if (isAndroid) {
      return (
        <div className="space-y-2 mt-2">
          <h4 className="font-medium">Instructions pour Android:</h4>
          <ol className="list-decimal pl-5 text-sm">
            <li>Touchez les trois points ⋮ en haut à droite</li>
            <li>Sélectionnez "Installer l'application" ou "Ajouter à l'écran d'accueil"</li>
          </ol>
        </div>
      );
    }
    
    return (
      <div className="space-y-2 mt-2">
        <h4 className="font-medium">Instructions générales:</h4>
        <ol className="list-decimal pl-5 text-sm">
          <li>Recherchez l'option "Installer" dans le menu de votre navigateur</li>
          <li>Ou utilisez la fonction "Ajouter à l'écran d'accueil"</li>
        </ol>
      </div>
    );
  };

  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto max-w-md z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <div className="flex justify-between items-start">
          <div className="flex items-start space-x-3">
            {isMobile ? (
              <Smartphone className="h-6 w-6 text-security-primary flex-shrink-0 mt-1" />
            ) : (
              <Laptop className="h-6 w-6 text-security-primary flex-shrink-0 mt-1" />
            )}
            <div>
              <h3 className="font-medium">Installez Guardia sur votre appareil</h3>
              <p className="text-sm text-gray-600 mt-1">
                Accédez à Guardia depuis votre écran d'accueil pour une expérience optimale, même hors ligne.
              </p>
              
              {showInstructions && (
                <div className="mt-2 bg-blue-50 p-3 rounded-md text-blue-800">
                  {getBrowserSpecificInstructions()}
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={closeInstructions}
                    className="mt-2 w-full text-blue-600 border-blue-300 hover:bg-blue-100"
                  >
                    J'ai compris
                  </Button>
                </div>
              )}
              
              <div className="flex space-x-2 mt-3">
                <Button
                  size="sm"
                  onClick={handleInstall}
                >
                  <Download className="h-4 w-4 mr-1" />
                  Installer
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => window.open('/help/installation-guide', '_blank')}
                >
                  <HelpCircle className="h-4 w-4 mr-1" />
                  Aide
                </Button>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstallAppBanner;
