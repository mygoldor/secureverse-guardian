
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

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  const {
    isMobile,
    deferredPrompt,
    showHelpLink,
    showSecurityInfo,
    installationTab,
    shortcutCreated,
    downloadStarted,
    downloadError,
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

  return (
    <Dialog open={isModalOpen} onOpenChange={handleClose}>
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
          
          <p className="text-sm text-gray-500">Vous allez être redirigé vers votre tableau de bord...</p>
          
          <HelpLink 
            showHelpLink={showHelpLink}
            downloadError={downloadError}
            onHelpClick={handleHelpClick}
          />
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
