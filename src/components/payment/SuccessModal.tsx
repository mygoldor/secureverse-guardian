
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle, ExternalLink, ShieldAlert, Info, Download, Smartphone, Laptop } from 'lucide-react';
import { useDeviceDetection } from '@/hooks/use-device-detection';
import { usePWAInstall } from '@/hooks/use-pwa-install';
import MobilePWA from './modal/MobilePWA';
import DesktopDownload from './modal/DesktopDownload';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { createPlatformShortcut } from '@/utils/shortcutGenerator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const { isMobile, isDesktop } = useDeviceDetection();
  const { deferredPrompt, startInstallation, downloadStarted, downloadError, resetDownload } = usePWAInstall();
  const [installationAttempted, setInstallationAttempted] = useState(false);
  const [showHelpLink, setShowHelpLink] = useState(false);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const [installationTab, setInstallationTab] = useState<'download' | 'pwa' | 'shortcut'>(
    isMobile ? 'pwa' : 'download'
  );
  const [shortcutCreated, setShortcutCreated] = useState(false);
  
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

  // Start installation automatically
  useEffect(() => {
    if (isOpen && !installationAttempted && isDesktop && installationTab === 'download') {
      // Set a short delay before starting download to ensure modal is visible
      const timer = setTimeout(() => {
        handleDownload();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMobile, isDesktop, installationAttempted, installationTab]);

  // Show help link after some time
  useEffect(() => {
    if (downloadStarted) {
      const timer = setTimeout(() => {
        setShowHelpLink(true);
      }, 10000); // Show help link after 10 seconds
      
      return () => clearTimeout(timer);
    }
  }, [downloadStarted]);

  // Show security info after download starts
  useEffect(() => {
    if (downloadStarted && !isMobile) {
      setShowSecurityInfo(true);
    }
  }, [downloadStarted, isMobile]);

  // Cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      console.log('SuccessModal unmounted successfully');
    };
  }, []);

  // Function to start installation for desktop
  const handleDownload = () => {
    setInstallationAttempted(true);
    
    if (!isMobile && installationTab === 'download') {
      startInstallation();
    }
  };

  // Reset function for retry attempts
  const handleReset = () => {
    resetDownload();
    setInstallationAttempted(false);
    setShowHelpLink(false);
    setShowSecurityInfo(false);
  };

  // Handle help button click
  const handleHelpClick = () => {
    // Open help documentation in a new tab
    window.open('/installation-guide', '_blank');
  };

  // Toggle security info display
  const toggleSecurityInfo = () => {
    setShowSecurityInfo(!showSecurityInfo);
  };

  // Create desktop shortcut
  const handleCreateShortcut = () => {
    try {
      const fileName = createPlatformShortcut();
      setShortcutCreated(true);
      console.log(`Shortcut created: ${fileName}`);
    } catch (error) {
      console.error('Error creating shortcut:', error);
      setShortcutCreated(false);
    }
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
          <DialogDescription className="text-center">
            Votre abonnement à Guardia a été activé avec succès
          </DialogDescription>
        </DialogHeader>
        <div className="text-center space-y-4">
          <p>Un email de confirmation a été envoyé à votre adresse avec un lien de validation.</p>
          
          <div className="my-4">
            <h3 className="font-medium mb-3">Installer Guardia sur votre appareil</h3>
            
            <Tabs value={installationTab} onValueChange={(value) => setInstallationTab(value as any)}>
              <TabsList className="grid grid-cols-3 mb-4">
                {!isMobile && (
                  <TabsTrigger value="download" className="flex items-center gap-1">
                    <Download className="h-4 w-4" />
                    Télécharger
                  </TabsTrigger>
                )}
                <TabsTrigger value="pwa" className="flex items-center gap-1">
                  {isMobile ? <Smartphone className="h-4 w-4" /> : <Laptop className="h-4 w-4" />}
                  Application Web
                </TabsTrigger>
                <TabsTrigger value="shortcut" className="flex items-center gap-1">
                  <ExternalLink className="h-4 w-4" />
                  Raccourci
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="download">
                {!isMobile && (
                  <DesktopDownload 
                    installationStarted={downloadStarted}
                    downloadError={downloadError}
                    onDownload={handleDownload}
                    onReset={handleReset}
                  />
                )}
              </TabsContent>
              
              <TabsContent value="pwa">
                <div className="bg-blue-50 p-3 rounded-md mb-3">
                  <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                    <Info className="h-4 w-4 mr-1" />
                    Installation comme application web
                  </h4>
                  <p className="text-sm text-blue-700 mb-2">
                    Ajoutez Guardia à votre écran d'accueil pour une expérience optimale et un accès rapide.
                  </p>
                  {isMobile ? (
                    <MobilePWA deferredPrompt={deferredPrompt} />
                  ) : (
                    <div>
                      <p className="text-sm text-blue-700 mb-2">
                        Cliquez sur l'icône d'installation dans la barre d'adresse de votre navigateur ou utilisez le menu du navigateur.
                      </p>
                      <Button 
                        onClick={() => startInstallation()}
                        variant="outline"
                        className="bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200"
                      >
                        Installer Guardia
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="shortcut">
                <div className="bg-purple-50 p-3 rounded-md mb-3">
                  <h4 className="font-medium text-purple-800 mb-2 flex items-center">
                    <ExternalLink className="h-4 w-4 mr-1" />
                    Créer un raccourci
                  </h4>
                  <p className="text-sm text-purple-700 mb-2">
                    Téléchargez un raccourci vers Guardia pour l'ajouter à votre bureau ou écran d'accueil.
                  </p>
                  {shortcutCreated ? (
                    <div className="bg-green-100 p-2 rounded text-green-800 text-sm mb-2">
                      <CheckCircle className="h-4 w-4 inline mr-1" />
                      Raccourci créé avec succès! Vérifiez vos téléchargements.
                    </div>
                  ) : (
                    <Button 
                      onClick={handleCreateShortcut}
                      variant="outline"
                      className="bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200"
                    >
                      Télécharger le raccourci
                    </Button>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </div>
          
          {downloadStarted && installationTab === 'download' && (
            <div className="mt-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleSecurityInfo}
                className="flex items-center text-amber-700 bg-amber-50 border-amber-200 hover:bg-amber-100"
              >
                <ShieldAlert className="h-4 w-4 mr-2" />
                {showSecurityInfo ? "Masquer" : "Afficher"} les informations sur les avertissements de sécurité
              </Button>
              
              {showSecurityInfo && (
                <Alert className="mt-2 bg-amber-50 border-amber-200">
                  <ShieldAlert className="h-4 w-4 text-amber-700" />
                  <AlertDescription className="text-sm text-amber-700 mt-2">
                    <p className="font-medium mb-1">Avertissements de sécurité courants:</p>
                    <ul className="list-disc pl-5 space-y-1 text-xs">
                      <li><strong>Windows:</strong> "Windows a protégé votre ordinateur" - Cliquez sur "Plus d'informations" puis "Exécuter quand même".</li>
                      <li><strong>Chrome/Edge:</strong> "guardia-security n'est pas fréquemment téléchargé" - Cliquez sur "Conserver" puis trouvez le fichier dans vos téléchargements.</li>
                      <li><strong>Mac:</strong> "L'application ne peut pas être ouverte" - Allez dans Préférences Système &gt; Sécurité &gt; "Ouvrir quand même".</li>
                    </ul>
                    <p className="text-xs mt-2">Ces avertissements sont normaux pour les nouvelles applications. Guardia Security est une application légitime et sécurisée.</p>
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
          
          <p className="text-sm text-gray-500">Vous allez être redirigé vers votre tableau de bord...</p>
          
          {/* Show help link after some time or if there's an error */}
          {(showHelpLink || downloadError) && (
            <div className="mt-4 text-center">
              <Button 
                variant="link" 
                onClick={handleHelpClick}
                className="text-blue-600"
              >
                <ExternalLink className="h-4 w-4 mr-1" />
                Besoin d'aide pour l'installation ?
              </Button>
            </div>
          )}
        </div>
        <DialogFooter className="sm:justify-center">
          <Button
            variant="outline"
            onClick={handleClose}
          >
            Continuer vers le tableau de bord
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
