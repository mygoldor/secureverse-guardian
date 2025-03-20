
import { useState, useEffect } from 'react';
import { useDeviceDetection } from '@/hooks/use-device-detection';
import { usePWAInstall } from '@/hooks/use-pwa-install';
import { createPlatformShortcut } from '@/utils/shortcutGenerator';
import { useToast } from '@/hooks/use-toast';

export const useSuccessModalLogic = (isOpen: boolean, onClose: () => void) => {
  const { toast } = useToast();
  const { isMobile, isDesktop } = useDeviceDetection();
  const { deferredPrompt, startInstallation, downloadStarted, downloadError, resetDownload } = usePWAInstall();
  const [installationAttempted, setInstallationAttempted] = useState(false);
  const [showHelpLink, setShowHelpLink] = useState(false);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const [installationTab, setInstallationTab] = useState<'pwa' | 'shortcut'>(
    isMobile || deferredPrompt ? 'pwa' : 'shortcut'
  );
  const [shortcutCreated, setShortcutCreated] = useState(false);
  const [userMadeChoice, setUserMadeChoice] = useState(false);
  
  // Check if user has already made a choice (from session storage)
  useEffect(() => {
    const choiceMade = sessionStorage.getItem('installationChoiceMade') === 'true';
    console.log('Initial choiceMade check:', choiceMade, new Date().toISOString());
    if (choiceMade) {
      setUserMadeChoice(true);
    }
  }, []);
  
  // Persist the installation state when changes occur
  useEffect(() => {
    console.log('userMadeChoice changed:', userMadeChoice, new Date().toISOString());
    if (userMadeChoice) {
      sessionStorage.setItem('installationChoiceMade', 'true');
    }
  }, [userMadeChoice]);
  
  // Force prompt to stay open if no choice made
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isOpen && !userMadeChoice) {
        e.preventDefault();
        e.returnValue = 'Vous devez choisir une option d\'installation avant de quitter.';
        return e.returnValue;
      }
    };

    if (isOpen) {
      window.addEventListener('beforeunload', handleBeforeUnload);
    }
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [isOpen, userMadeChoice]);
  
  // Check direct session storage for most accurate data
  const hasUserMadeChoiceInStorage = () => {
    return sessionStorage.getItem('installationChoiceMade') === 'true';
  };
  
  const handleClose = () => {
    try {
      // Only allow closing if the user made an installation choice
      // Double-check both the state variable and session storage
      if (userMadeChoice || hasUserMadeChoiceInStorage()) {
        console.log('Close allowed - user made choice');
        if (typeof onClose === 'function') {
          onClose();
        }
        return true;
      } else {
        console.log('Close prevented - no choice made');
        toast({
          variant: "destructive",
          title: "Choix requis",
          description: "Veuillez choisir une option d'installation avant de continuer.",
        });
        // Do not close the modal
        return false;
      }
    } catch (error) {
      console.error('Error in modal close handler:', error);
      return false;
    }
  };

  const handleReset = () => {
    resetDownload();
    setInstallationAttempted(false);
    setShowHelpLink(false);
    setShowSecurityInfo(false);
    sessionStorage.removeItem('installationChoiceMade');
    setUserMadeChoice(false);
  };

  const handleHelpClick = () => {
    window.open('/installation-guide', '_blank');
  };

  const toggleSecurityInfo = () => {
    setShowSecurityInfo(!showSecurityInfo);
  };

  const handleCreateShortcut = () => {
    try {
      const fileName = createPlatformShortcut();
      setShortcutCreated(true);
      console.log(`Shortcut created: ${fileName}`, new Date().toISOString());
      
      // Mark choice as made - both in state and session storage
      sessionStorage.setItem('installationChoiceMade', 'true');
      setUserMadeChoice(true);
    } catch (error) {
      console.error('Error creating shortcut:', error);
      setShortcutCreated(false);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer le raccourci. Veuillez réessayer.",
      });
    }
  };

  return {
    isMobile,
    isDesktop,
    deferredPrompt,
    installationAttempted,
    showHelpLink,
    showSecurityInfo,
    installationTab,
    shortcutCreated,
    downloadStarted,
    downloadError,
    userMadeChoice,
    handleClose,
    handleDownload: () => {}, // Keep this empty function to avoid breaking the interface
    handleReset,
    handleHelpClick,
    toggleSecurityInfo,
    handleCreateShortcut,
    setUserMadeChoice: (choice: boolean) => {
      console.log('setUserMadeChoice called with:', choice, new Date().toISOString());
      if (choice) {
        sessionStorage.setItem('installationChoiceMade', 'true');
      } else {
        sessionStorage.removeItem('installationChoiceMade');
      }
      setUserMadeChoice(choice);
    },
    setInstallationTab: (tab: string) => {
      if (tab === 'pwa' || tab === 'shortcut') {
        setInstallationTab(tab as 'pwa' | 'shortcut');
      }
    },
    startInstallation: async (): Promise<void> => {
      try {
        console.log('Starting installation process', new Date().toISOString());
        await startInstallation();
        
        // Mark choice as made - both in state and session storage
        console.log('Installation successful, marking choice as made', new Date().toISOString());
        sessionStorage.setItem('installationChoiceMade', 'true');
        setUserMadeChoice(true);
        
        return Promise.resolve();
      } catch (error) {
        console.error('Installation error:', error);
        
        // Even in case of error, we might want to consider it a choice
        // depending on the error type, but for now just reject
        return Promise.reject(error);
      }
    }
  };
};
