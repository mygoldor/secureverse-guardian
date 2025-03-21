
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDeviceDetection } from '@/hooks/use-device-detection';
import { usePWAInstall } from '@/hooks/use-pwa-install';
import { createPlatformShortcut } from '@/utils/shortcutGenerator';
import { useToast } from '@/hooks/use-toast';
import { useInstallationTracker } from '@/hooks/use-installation-tracker';

export const useSuccessModalLogic = (isOpen: boolean, onClose: () => void) => {
  const { toast } = useToast();
  const navigate = useNavigate(); // Now safely inside a component
  const { isMobile, isDesktop } = useDeviceDetection();
  const { deferredPrompt, startInstallation, downloadStarted, downloadError, resetDownload, handleAppInstalled } = usePWAInstall();
  const { userMadeChoice, setUserMadeChoice, handleClosePrevention } = useInstallationTracker(isOpen);
  
  const [installationAttempted, setInstallationAttempted] = useState(false);
  const [showHelpLink, setShowHelpLink] = useState(false);
  const [showSecurityInfo, setShowSecurityInfo] = useState(false);
  const [installationTab, setInstallationTab] = useState<'pwa' | 'shortcut'>(
    isMobile || deferredPrompt ? 'pwa' : 'shortcut'
  );
  const [shortcutCreated, setShortcutCreated] = useState(false);
  
  const handleClose = () => {
    if (handleClosePrevention()) {
      if (typeof onClose === 'function') {
        onClose();
      }
      return true;
    }
    return false;
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
      
      // Mark choice as made
      setUserMadeChoice(true);
    } catch (error) {
      setShortcutCreated(false);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de créer le raccourci. Veuillez réessayer.",
      });
    }
  };

  // Download handler implementation
  const handleDownload = () => {
    // Simulate download process
    setUserMadeChoice(true);
  };

  // Set up navigation callback for the PWA install handler
  const navigateToDashboard = () => {
    navigate('/dashboard');
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
    handleDownload,
    handleReset,
    handleHelpClick,
    toggleSecurityInfo,
    handleCreateShortcut,
    setUserMadeChoice,
    navigateToDashboard,
    setInstallationTab: (tab: string) => {
      if (tab === 'pwa' || tab === 'shortcut') {
        setInstallationTab(tab as 'pwa' | 'shortcut');
      }
    },
    startInstallation: async (): Promise<void> => {
      try {
        await startInstallation();
        setUserMadeChoice(true);
        // Use our callback for successful installation
        handleAppInstalled(navigateToDashboard);
        return Promise.resolve();
      } catch (error) {
        return Promise.reject(error);
      }
    }
  };
};
