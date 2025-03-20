
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
  const [installationTab, setInstallationTab] = useState<'download' | 'pwa' | 'shortcut'>(
    isMobile ? 'pwa' : 'download'
  );
  const [shortcutCreated, setShortcutCreated] = useState(false);
  
  const handleClose = () => {
    try {
      if (typeof onClose === 'function') {
        onClose();
      }
    } catch (error) {
      console.error('Error in modal close handler:', error);
      if (typeof window !== 'undefined') {
        window.history.back();
      }
    }
  };

  useEffect(() => {
    if (isOpen && !installationAttempted && isDesktop && installationTab === 'download') {
      const timer = setTimeout(() => {
        handleDownload();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMobile, isDesktop, installationAttempted, installationTab]);

  useEffect(() => {
    if (downloadStarted) {
      const timer = setTimeout(() => {
        setShowHelpLink(true);
      }, 10000);
      
      return () => clearTimeout(timer);
    }
  }, [downloadStarted]);

  useEffect(() => {
    if (downloadStarted && !isMobile) {
      setShowSecurityInfo(true);
    }
  }, [downloadStarted, isMobile]);

  useEffect(() => {
    return () => {
      console.log('SuccessModal unmounted successfully');
    };
  }, []);

  const handleDownload = () => {
    setInstallationAttempted(true);
    
    if (!isMobile && installationTab === 'download') {
      startInstallation();
    }
  };

  const handleReset = () => {
    resetDownload();
    setInstallationAttempted(false);
    setShowHelpLink(false);
    setShowSecurityInfo(false);
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
    handleClose,
    handleDownload,
    handleReset,
    handleHelpClick,
    toggleSecurityInfo,
    handleCreateShortcut,
    setInstallationTab: (tab: string) => {
      // Ensure tab is one of the allowed values
      if (tab === 'download' || tab === 'pwa' || tab === 'shortcut') {
        setInstallationTab(tab);
      }
    },
    startInstallation: async (): Promise<void> => {
      startInstallation();
      return Promise.resolve();
    }
  };
};
