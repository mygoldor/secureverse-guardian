
import React from 'react';
import { DialogContent, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import SuccessHeader from './SuccessHeader';
import InstallationTabs from './InstallationTabs';
import SecurityInfoAlert from './SecurityInfoAlert';
import HelpLink from './HelpLink';

interface SuccessModalContentProps {
  userMadeChoice: boolean;
  showSecurityInfo: boolean;
  toggleSecurityInfo: () => void;
  installationTab: string;
  setInstallationTab: (tab: string) => void;
  isMobile: boolean;
  deferredPrompt: any;
  downloadStarted: boolean;
  downloadError: boolean | undefined;
  showHelpLink: boolean;
  startInstallation: () => Promise<void>;
  handleDownload: () => void;
  handleReset: () => void;
  shortcutCreated: boolean;
  handleCreateShortcut: () => void;
  setUserMadeChoice: (choice: boolean) => void;
  handleClose: () => boolean;
  onEscapeKeyDown: (e: React.KeyboardEvent) => void;
  onPointerDownOutside: (e: React.PointerEvent) => void;
}

const SuccessModalContent: React.FC<SuccessModalContentProps> = ({
  userMadeChoice,
  showSecurityInfo,
  toggleSecurityInfo,
  installationTab,
  setInstallationTab,
  isMobile,
  deferredPrompt,
  downloadStarted,
  downloadError,
  showHelpLink,
  startInstallation,
  handleDownload,
  handleReset,
  shortcutCreated,
  handleCreateShortcut,
  setUserMadeChoice,
  handleClose,
  onEscapeKeyDown,
  onPointerDownOutside
}) => {
  const { toast } = useToast();

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

  return (
    <DialogContent 
      className="sm:max-w-md" 
      onEscapeKeyDown={onEscapeKeyDown}
      onPointerDownOutside={onPointerDownOutside}
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
          onHelpClick={() => {}}
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
  );
};

export default SuccessModalContent;
