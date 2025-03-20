
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
  
  // Handle close function
  const handleClose = () => {
    try {
      if (typeof onClose === 'function') {
        onClose();
      }
    } catch (error) {
      console.error('Error in modal close handler:', error);
      // Fallback close method if the provided handler fails
      if (typeof window !== 'undefined') {
        window.history.back();
      }
    }
  };

  // Start installation automatically
  useEffect(() => {
    if (isOpen && !installationAttempted && isDesktop && installationTab === 'download') {
      // Set a short delay before starting download to ensure modal is visible
      const timer = setTimeout(() => {
        handleDownload();
      }, 1500);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, isMobile, isDesktop, installationAttempted, installationTab]);

  // Show help link after some time
  useEffect(() => {
    if (downloadStarted) {
      const timer = setTimeout(() => {
        setShowHelpLink(true);
      }, 10000); // Show help link after 10 seconds
      
      return () => clearTimeout(timer);
    }
  }, [downloadStarted]);

  // Show security info after download starts
  useEffect(() => {
    if (downloadStarted && !isMobile) {
      setShowSecurityInfo(true);
    }
  }, [downloadStarted, isMobile]);

  // Cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      console.log('SuccessModal unmounted successfully');
    };
  }, []);

  // Function to start installation for desktop
  const handleDownload = () => {
    setInstallationAttempted(true);
    
    if (!isMobile && installationTab === 'download') {
      startInstallation();
    }
  };

  // Reset function for retry attempts
  const handleReset = () => {
    resetDownload();
    setInstallationAttempted(false);
    setShowHelpLink(false);
    setShowSecurityInfo(false);
  };

  // Handle help button click
  const handleHelpClick = () => {
    // Open help documentation in a new tab
    window.open('/installation-guide', '_blank');
  };

  // Toggle security info display
  const toggleSecurityInfo = () => {
    setShowSecurityInfo(!showSecurityInfo);
  };

  // Create desktop shortcut
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
    setInstallationTab,
    startInstallation
  };
};
