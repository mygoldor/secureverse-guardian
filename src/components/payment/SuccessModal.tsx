
import React, { useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useSuccessModalLogic } from './modal/useSuccessModalLogic';
import SuccessHeader from './modal/SuccessHeader';
import InstallationTabs from './modal/InstallationTabs';
import SecurityInfoAlert from './modal/SecurityInfoAlert';
import HelpLink from './modal/HelpLink';
import { useToast } from '@/hooks/use-toast';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const { toast } = useToast();
  const {
    isMobile,
    deferredPrompt,
    showHelpLink,
    showSecurityInfo,
    installationTab,
    shortcutCreated,
    downloadStarted,
    downloadError,
    userMadeChoice,
    handleClose,
    handleDownload,
    handleReset,
    handleHelpClick,
    toggleSecurityInfo,
    handleCreateShortcut,
    setInstallationTab,
    startInstallation,
    setUserMadeChoice
  } = useSuccessModalLogic(isOpen, onClose);

  // Make sure isOpen is a boolean to prevent type errors
  const isModalOpen = Boolean(isOpen);
  
  // Force modal to stay open and log state changes
  useEffect(() => {
    console.log('Modal state:', { 
      isModalOpen, 
      userMadeChoice,
      sessionStorageChoice: sessionStorage.getItem('installationChoiceMade'),
      timestamp: new Date().toISOString() 
    });
    
    const preventClosing = (e: BeforeUnloadEvent) => {
      if (isModalOpen && !userMadeChoice) {
        e.preventDefault();
        e.returnValue = 'Vous devez choisir une option d\'installation avant de quitter.';
        return e.returnValue;
      }
    };

    if (isModalOpen) {
      window.addEventListener('beforeunload', preventClosing);
    }

    return () => {
      window.removeEventListener('beforeunload', preventClosing);
    };
  }, [isModalOpen, userMadeChoice]);

  const handleFooterButtonClick = () => {
    if (!userMadeChoice) {
      toast({
        variant: "destructive",
        title: "Choix requis",
        description: "Veuillez choisir une option d'installation avant de continuer.",
      });
      return;
    }
    
    console.log('Footer button clicked with userMadeChoice:', userMadeChoice);
    if (handleClose()) {
      console.log('Modal closing via footer button');
    }
  };

  // Prevent ESC key from closing the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen && !userMadeChoice) {
        e.preventDefault();
        e.stopPropagation();
        
        toast({
          variant: "destructive",
          title: "Choix requis",
          description: "Veuillez choisir une option d'installation avant de continuer.",
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown, true);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isModalOpen, userMadeChoice, toast]);

  return (
    <Dialog 
      open={isModalOpen} 
      onOpenChange={(open) => {
        console.log('Dialog onOpenChange:', { open, userMadeChoice });
        if (!open && !userMadeChoice) {
          // Prevent closing if no choice made
          toast({
            variant: "destructive",
            title: "Choix requis",
            description: "Veuillez choisir une option d'installation avant de continuer.",
          });
          return false;
        }
        if (!open && userMadeChoice) {
          handleClose();
        }
      }}
    >
      <DialogContent 
        className="sm:max-w-md" 
        onEscapeKeyDown={(e) => {
          if (!userMadeChoice) {
            e.preventDefault();
            toast({
              variant: "destructive",
              title: "Choix requis",
              description: "Veuillez choisir une option d'installation avant de continuer.",
            });
          }
        }} 
        onPointerDownOutside={(e) => {
          if (!userMadeChoice) {
            e.preventDefault();
            toast({
              variant: "destructive",
              title: "Choix requis",
              description: "Veuillez choisir une option d'installation avant de continuer.",
            });
          }
        }}
      >
        <SuccessHeader />
        
        <div className="text-center space-y-4">
          <p>Un email de confirmation a été envoyé à votre adresse avec un lien de validation.</p>
          
          <div className="my-4">
            <h3 className="font-medium mb-3">Installer Guardia sur votre appareil</h3>
            
            <InstallationTabs 
              installationTab={installationTab}
              setInstallationTab={setInstallationTab}
              isMobile={isMobile}
              deferredPrompt={deferredPrompt}
              downloadStarted={downloadStarted}
              downloadError={downloadError}
              startInstallation={startInstallation}
              handleDownload={handleDownload}
              handleReset={handleReset}
              shortcutCreated={shortcutCreated}
              handleCreateShortcut={handleCreateShortcut}
              setUserMadeChoice={setUserMadeChoice}
            />
          </div>
          
          {showSecurityInfo && (
            <SecurityInfoAlert 
              showSecurityInfo={showSecurityInfo}
              toggleSecurityInfo={toggleSecurityInfo}
            />
          )}
          
          <p className="text-sm text-gray-500 font-bold">
            {userMadeChoice 
              ? "Vous allez être redirigé vers votre tableau de bord..."
              : "Veuillez choisir une option d'installation pour continuer."}
          </p>
          
          <HelpLink 
            showHelpLink={showHelpLink}
            downloadError={downloadError}
            onHelpClick={handleHelpClick}
          />
        </div>
        
        <DialogFooter className="sm:justify-center">
          <Button
            variant={userMadeChoice ? "default" : "outline"}
            onClick={handleFooterButtonClick}
            className={!userMadeChoice ? "opacity-70 cursor-not-allowed" : ""}
            disabled={!userMadeChoice}
          >
            {userMadeChoice 
              ? "Continuer vers le tableau de bord"
              : "Veuillez choisir une option d'installation"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
