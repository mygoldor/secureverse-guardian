
import React, { useState } from 'react';
import { Smartphone, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BrowserInstructions from './BrowserInstructions';
import InstallButtons from './InstallButtons';

interface InstallBannerContentProps {
  isMobile: boolean;
  isIOS: boolean;
  isSafari: boolean;
  isAndroid: boolean;
  isChrome: boolean;
  isFirefox: boolean;
  isEdge: boolean;
  showInstructions: 'ios' | 'desktop' | 'android' | null;
  onInstall: () => void;
  onHelpClick: () => void;
  onCloseInstructions: () => void;
}

const InstallBannerContent: React.FC<InstallBannerContentProps> = ({
  isMobile,
  isIOS,
  isSafari,
  isAndroid,
  isChrome,
  isFirefox,
  isEdge,
  showInstructions,
  onInstall,
  onHelpClick,
  onCloseInstructions
}) => {
  // Determine browser type for instructions
  const getBrowserType = () => {
    if (isIOS && isSafari) return 'ios';
    if (isChrome) return 'chrome';
    if (isEdge) return 'edge';
    if (isFirefox) return 'firefox';
    if (isAndroid) return 'android';
    return 'default';
  };

  return (
    <div className="flex items-start space-x-3">
      {isMobile ? (
        <Smartphone className="h-6 w-6 text-security-primary flex-shrink-0 mt-1" />
      ) : (
        <Laptop className="h-6 w-6 text-security-primary flex-shrink-0 mt-1" />
      )}
      <div>
        <h3 className="font-medium">Installez Guardia sur votre appareil</h3>
        <p className="text-sm text-gray-600 mt-1">
          Accédez à Guardia depuis votre écran d'accueil pour une expérience optimale, même hors ligne.
        </p>
        
        {showInstructions && (
          <div className="mt-2 bg-blue-50 p-3 rounded-md text-blue-800">
            <BrowserInstructions browserType={getBrowserType()} />
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onCloseInstructions}
              className="mt-2 w-full text-blue-600 border-blue-300 hover:bg-blue-100"
            >
              J'ai compris
            </Button>
          </div>
        )}
        
        <InstallButtons onInstall={onInstall} onHelp={onHelpClick} />
      </div>
    </div>
  );
};

export default InstallBannerContent;
