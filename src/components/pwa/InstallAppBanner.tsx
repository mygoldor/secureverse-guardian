
import React from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import InstallBannerContent from './install-banner/InstallBannerContent';
import { useInstallBanner } from './install-banner/useInstallBanner';

const InstallAppBanner: React.FC = () => {
  const {
    isVisible,
    showInstructions,
    isMobile,
    isIOS,
    isAndroid,
    isSafari,
    isChrome,
    isFirefox,
    isEdge,
    handleInstall,
    handleDismiss,
    closeInstructions,
    handleHelpClick
  } = useInstallBanner();

  if (!isVisible) {
    return null;
  }

  return (
    <div className="fixed bottom-4 left-0 right-0 mx-auto max-w-md z-50 p-4">
      <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
        <div className="flex justify-between items-start">
          <InstallBannerContent
            isMobile={isMobile}
            isIOS={isIOS}
            isSafari={isSafari}
            isAndroid={isAndroid}
            isChrome={isChrome}
            isFirefox={isFirefox}
            isEdge={isEdge}
            showInstructions={showInstructions}
            onInstall={handleInstall}
            onHelpClick={handleHelpClick}
            onCloseInstructions={closeInstructions}
          />
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismiss}
            className="h-8 w-8"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default InstallAppBanner;
