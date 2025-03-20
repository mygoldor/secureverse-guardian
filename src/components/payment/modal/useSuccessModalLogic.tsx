
import { useState, useEffect } from 'react';
import { useDeviceDetection } from '@/hooks/use-device-detection';
import { usePWAInstall } from '@/hooks/use-pwa-install';
import { createPlatformShortcut } from '@/utils/shortcutGenerator';

export const useSuccessModalLogic = (isOpen: boolean, onClose: () => void) => {
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
    if (choiceMade) {
      setUserMadeChoice(true);
    }
  }, []);
  
  // Persist the installation state when changes occur
  useEffect(() => {
    if (userMadeChoice) {
      sessionStorage.setItem('installationChoiceMade', 'true');
    }
  }, [userMadeChoice]);
  
  // Force prompt to stay open if no choice made
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (isOpen && !userMadeChoice) {
        e.preventDefault();
        e.returnValue = 'You need to make an installation choice before leaving.';
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
  
  const handleClose = () => {
    try {
      // Only allow closing if the user made an installation choice
      if (userMadeChoice) {
        if (typeof onClose === 'function') {
          onClose();
        }
        return true;
      } else {
        console.log('Please make an installation choice before continuing');
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
      console.log(`Shortcut created: ${fileName}`);
      
      // Mark choice as made
      sessionStorage.setItem('installationChoiceMade', 'true');
      setUserMadeChoice(true);
    } catch (error) {
      console.error('Error creating shortcut:', error);
      setShortcutCreated(false);
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
    setUserMadeChoice,
    setInstallationTab: (tab: string) => {
      if (tab === 'pwa' || tab === 'shortcut') {
        setInstallationTab(tab as 'pwa' | 'shortcut');
      }
    },
    startInstallation: async (): Promise<void> => {
      try {
        await startInstallation();
        
        // Mark choice as made
        sessionStorage.setItem('installationChoiceMade', 'true');
        setUserMadeChoice(true);
        
        return Promise.resolve();
      } catch (error) {
        console.error('Installation error:', error);
        return Promise.reject(error);
      }
    }
  };
};
