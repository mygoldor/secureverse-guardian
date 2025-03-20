
import React, { useEffect, useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { useSuccessModalLogic } from './modal/useSuccessModalLogic';
import { useNavigationPrevention } from './modal/useNavigationPrevention';
import SuccessModalContent from './modal/SuccessModalContent';
import ForcedInstallModal from './modal/ForcedInstallModal';
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
  
  // Use the navigation prevention hook
  const { handleEscapeKeyDown, handlePointerDownOutside } = useNavigationPrevention({
    isModalOpen,
    userMadeChoice
  });

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

  return (
    <>
      <ForcedInstallModal 
        isOpen={showForcedModal && isModalOpen}
        onInstall={handleForcedInstall}
        onCreateShortcut={handleForcedShortcut}
      />

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
        <SuccessModalContent
          userMadeChoice={userMadeChoice}
          showSecurityInfo={showSecurityInfo}
          toggleSecurityInfo={toggleSecurityInfo}
          installationTab={installationTab}
          setInstallationTab={setInstallationTab}
          isMobile={isMobile}
          deferredPrompt={deferredPrompt}
          downloadStarted={downloadStarted}
          downloadError={downloadError}
          showHelpLink={showHelpLink}
          startInstallation={startInstallation}
          handleDownload={handleDownload}
          handleReset={handleReset}
          shortcutCreated={shortcutCreated}
          handleCreateShortcut={handleCreateShortcut}
          setUserMadeChoice={setUserMadeChoice}
          handleClose={handleClose}
          onEscapeKeyDown={handleEscapeKeyDown}
          onPointerDownOutside={handlePointerDownOutside}
        />
      </Dialog>
    </>
  );
};

export default SuccessModal;
