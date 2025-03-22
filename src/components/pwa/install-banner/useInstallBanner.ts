
import { useState } from 'react';

// Return empty hooks with default values that won't trigger any banner
export const useInstallBanner = () => {
  const [isVisible, setIsVisible] = useState(false);
  
  return {
    isVisible: false, // Force to false to ensure banner never shows
    setIsVisible: () => {},
    isDismissed: true,
    setIsDismissed: () => {},
    showInstructions: null,
    isMobile: false,
    isIOS: false,
    isAndroid: false,
    isSafari: false,
    isChrome: false,
    isFirefox: false, 
    isEdge: false,
    deferredPrompt: null,
    handleInstall: () => {},
    handleDismiss: () => {},
    closeInstructions: () => {},
    handleHelpClick: () => {}
  };
};
