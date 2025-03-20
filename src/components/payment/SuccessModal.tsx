
import React, { useEffect, useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();
  
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

  const isModalOpen = Boolean(isOpen);
  const [showForcedModal, setShowForcedModal] = useState(false);
  
  useEffect(() => {
    const checkInstallationChoice = () => {
      const choiceMade = sessionStorage.getItem('installationChoiceMade') === 'true';
      if (choiceMade && !userMadeChoice) {
        setUserMadeChoice(true);
      }
    };
    
    if (isModalOpen) {
      sessionStorage.removeItem('installationChoiceMade');
      setUserMadeChoice(false);
    }
    
    checkInstallationChoice();
    const interval = setInterval(checkInstallationChoice, 500);
    
    return () => clearInterval(interval);
  }, [isModalOpen, userMadeChoice, setUserMadeChoice]);
  
  const { handleEscapeKeyDown, handlePointerDownOutside } = useNavigationPrevention({
    isModalOpen,
    userMadeChoice
  });

  useEffect(() => {
    if (isModalOpen && !userMadeChoice) {
      setShowForcedModal(true);
    } else {
      setShowForcedModal(false);
    }
  }, [isModalOpen, userMadeChoice]);

  useEffect(() => {
    if (userMadeChoice && isModalOpen) {
      const redirectTimer = setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [userMadeChoice, isModalOpen, navigate]);

  const handleForcedInstall = () => {
    if (deferredPrompt) {
      startInstallation();
    } else {
      setInstallationTab('pwa');
      handleDownload();
    }
    setShowForcedModal(false);
  };

  const handleForcedShortcut = () => {
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
          if (!open && !userMadeChoice) {
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
