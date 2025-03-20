
import React from 'react';
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
    startInstallation
  } = useSuccessModalLogic(isOpen, onClose);

  // Make sure isOpen is a boolean to prevent type errors
  const isModalOpen = Boolean(isOpen);
  
  const handleFooterButtonClick = () => {
    if (!userMadeChoice) {
      toast({
        variant: "warning",
        title: "Choix requis",
        description: "Veuillez choisir une option d'installation avant de continuer.",
      });
    } else {
      handleClose();
    }
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => {
      if (!open && !userMadeChoice) {
        // Prevent closing if no choice made
        toast({
          variant: "warning",
          title: "Choix requis",
          description: "Veuillez choisir une option d'installation avant de continuer.",
        });
        return;
      }
      handleClose();
    }}>
      <DialogContent className="sm:max-w-md">
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
            />
          </div>
          
          {downloadStarted && installationTab === 'download' && (
            <SecurityInfoAlert 
              showSecurityInfo={showSecurityInfo}
              toggleSecurityInfo={toggleSecurityInfo}
            />
          )}
          
          <p className="text-sm text-gray-500">
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
            variant="outline"
            onClick={handleFooterButtonClick}
            className={!userMadeChoice ? "opacity-70" : ""}
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
