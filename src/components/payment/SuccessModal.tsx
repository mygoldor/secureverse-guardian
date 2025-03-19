
import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle } from 'lucide-react';
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
  const { deferredPrompt, startInstallation } = usePWAInstall();
  const [installationStarted, setInstallationStarted] = useState(false);
  
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
    if (isOpen && !installationStarted && !isMobile) {
      // Set a short delay before starting download to ensure modal is visible
      const timer = setTimeout(() => {
        handleDownload();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMobile, installationStarted]);

  // Cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      console.log('SuccessModal unmounted successfully');
    };
  }, []);

  // Function to start installation for desktop
  const handleDownload = () => {
    setInstallationStarted(true);
    
    if (!isMobile) {
      startInstallation();
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
        </DialogHeader>
        <div className="text-center space-y-4">
          <p>Merci pour votre abonnement à Guardia !</p>
          <p>Un email de confirmation a été envoyé à votre adresse avec un lien de validation.</p>
          
          {!isMobile && (
            <DesktopDownload 
              installationStarted={installationStarted}
              onDownload={handleDownload}
            />
          )}
          
          {/* Add to Home Screen option for all mobile users */}
          {isMobile && (
            <MobilePWA deferredPrompt={deferredPrompt} />
          )}
          
          <p className="text-sm text-gray-500">Vous allez être redirigé vers votre tableau de bord...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
