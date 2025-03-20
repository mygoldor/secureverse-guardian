
import React, { useEffect, useState } from 'react';
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
  
  // Check session storage for installation choice and update state
  useEffect(() => {
    const checkInstallationChoice = () => {
      const choiceMade = sessionStorage.getItem('installationChoiceMade') === 'true';
      console.log('Checking installation choice:', choiceMade);
      if (choiceMade && !userMadeChoice) {
        console.log('Setting userMadeChoice to true based on session storage');
        setUserMadeChoice(true);
      }
    };
    
    // Check immediately and every 500ms
    checkInstallationChoice();
    const interval = setInterval(checkInstallationChoice, 500);
    
    return () => clearInterval(interval);
  }, [userMadeChoice, setUserMadeChoice]);
  
  // Force modal to stay open and log state changes
  useEffect(() => {
    console.log('Modal state:', { 
      isModalOpen, 
      userMadeChoice,
      sessionStorageChoice: sessionStorage.getItem('installationChoiceMade'),
      timestamp: new Date().toISOString() 
    });
    
    // Disable all navigation attempts if modal is open and no choice made
    const blockNavigation = () => {
      if (isModalOpen && !userMadeChoice) {
        console.log('Blocking navigation attempt');
        toast({
          variant: "destructive",
          title: "Choix requis",
          description: "Veuillez choisir une option d'installation avant de continuer.",
        });
        return false;
      }
      return true;
    };
    
    const preventClosing = (e: BeforeUnloadEvent) => {
      if (isModalOpen && !userMadeChoice) {
        e.preventDefault();
        e.returnValue = 'Vous devez choisir une option d\'installation avant de quitter.';
        return e.returnValue;
      }
    };

    if (isModalOpen) {
      window.addEventListener('beforeunload', preventClosing);
      window.history.pushState(null, '', window.location.href);
      
      const handlePopState = (e: PopStateEvent) => {
        if (!userMadeChoice) {
          e.preventDefault();
          window.history.pushState(null, '', window.location.href);
          toast({
            variant: "destructive",
            title: "Choix requis",
            description: "Veuillez choisir une option d'installation avant de continuer.",
          });
        }
      };
      
      window.addEventListener('popstate', handlePopState);
      
      return () => {
        window.removeEventListener('beforeunload', preventClosing);
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isModalOpen, userMadeChoice, toast]);

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

  // Create mandatory installation modal based on HTML example
  const [showForcedModal, setShowForcedModal] = useState(true);

  // If no choices have been made, show the forced modal
  useEffect(() => {
    if (isModalOpen && !userMadeChoice) {
      setShowForcedModal(true);
    } else {
      setShowForcedModal(false);
    }
  }, [isModalOpen, userMadeChoice]);

  // Handle forced installation choice
  const handleForcedInstall = () => {
    console.log('Forced install clicked');
    if (deferredPrompt) {
      startInstallation();
    } else {
      setInstallationTab('pwa');
      handleDownload();
    }
    setShowForcedModal(false);
  };

  const handleForcedShortcut = () => {
    console.log('Forced shortcut clicked');
    setInstallationTab('shortcut');
    handleCreateShortcut();
    setShowForcedModal(false);
  };

  if (showForcedModal && isModalOpen) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg max-w-md w-full">
          <h2 className="text-xl font-bold mb-4 text-center">Installation de Guardia</h2>
          <p className="mb-6 text-center">
            Voulez-vous installer Guardia ou créer un raccourci sur votre écran d'accueil ?
          </p>
          <div className="flex justify-center gap-4">
            <Button onClick={handleForcedInstall} className="bg-green-600 hover:bg-green-700">
              Installer
            </Button>
            <Button 
              onClick={handleForcedShortcut} 
              variant="outline"
              className="border-purple-300 text-purple-800 hover:bg-purple-100"
            >
              Créer un raccourci
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
