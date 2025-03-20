
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
import { CheckCircle, ExternalLink } from 'lucide-react';
import { useDeviceDetection } from '@/hooks/use-device-detection';
import { usePWAInstall } from '@/hooks/use-pwa-install';
import MobilePWA from './modal/MobilePWA';
import DesktopDownload from './modal/DesktopDownload';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const { isMobile } = useDeviceDetection();
  const { deferredPrompt, startInstallation, downloadStarted, downloadError, resetDownload } = usePWAInstall();
  const [installationAttempted, setInstallationAttempted] = useState(false);
  const [showHelpLink, setShowHelpLink] = useState(false);
  
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
    if (isOpen && !installationAttempted && !isMobile) {
      // Set a short delay before starting download to ensure modal is visible
      const timer = setTimeout(() => {
        handleDownload();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMobile, installationAttempted]);

  // Show help link after some time
  useEffect(() => {
    if (downloadStarted) {
      const timer = setTimeout(() => {
        setShowHelpLink(true);
      }, 10000); // Show help link after 10 seconds
      
      return () => clearTimeout(timer);
    }
  }, [downloadStarted]);

  // Cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      console.log('SuccessModal unmounted successfully');
    };
  }, []);

  // Function to start installation for desktop
  const handleDownload = () => {
    setInstallationAttempted(true);
    
    if (!isMobile) {
      startInstallation();
    }
  };

  // Reset function for retry attempts
  const handleReset = () => {
    resetDownload();
    setInstallationAttempted(false);
    setShowHelpLink(false);
  };

  // Handle help button click
  const handleHelpClick = () => {
    // Open help documentation in a new tab
    window.open('/help/installation-guide', '_blank');
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
          
          {!isMobile && (
            <DesktopDownload 
              installationStarted={downloadStarted}
              downloadError={downloadError}
              onDownload={handleDownload}
              onReset={handleReset}
            />
          )}
          
          {/* Add to Home Screen option for all mobile users */}
          {isMobile && (
            <MobilePWA deferredPrompt={deferredPrompt} />
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
