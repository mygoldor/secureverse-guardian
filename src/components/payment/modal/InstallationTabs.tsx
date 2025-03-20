
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import DesktopDownload from './DesktopDownload';
import MobilePWA from './MobilePWA';
import ShortcutInstall from './ShortcutInstall';

interface InstallationTabsProps {
  installationTab: string;
  setInstallationTab: (tab: string) => void;
  isMobile: boolean;
  deferredPrompt: any;
  downloadStarted: boolean;
  downloadError: boolean | undefined;
  startInstallation: () => Promise<void>;
  handleDownload: () => void;
  handleReset: () => void;
  shortcutCreated: boolean;
  handleCreateShortcut: () => void;
}

const InstallationTabs: React.FC<InstallationTabsProps> = ({ 
  installationTab,
  setInstallationTab,
  isMobile,
  deferredPrompt,
  downloadStarted,
  downloadError,
  startInstallation,
  handleDownload,
  handleReset,
  shortcutCreated,
  handleCreateShortcut
}) => {
  // Record when a user makes a choice by clicking on action buttons
  const handleUserChoice = () => {
    sessionStorage.setItem('installationChoiceMade', 'true');
  };

  return (
    <Tabs defaultValue={installationTab} value={installationTab} onValueChange={setInstallationTab}>
      <TabsList className="grid w-full grid-cols-3">
        <TabsTrigger value="download">Télécharger</TabsTrigger>
        <TabsTrigger value="pwa" disabled={!isMobile && !deferredPrompt}>Installer PWA</TabsTrigger>
        <TabsTrigger value="shortcut">Raccourci</TabsTrigger>
      </TabsList>
      
      <TabsContent value="download">
        <DesktopDownload 
          installationStarted={downloadStarted} 
          downloadError={downloadError}
          onDownload={() => {
            handleDownload();
            handleUserChoice();
          }}
          onReset={handleReset}
        />
      </TabsContent>
      
      <TabsContent value="pwa">
        <MobilePWA 
          deferredPrompt={deferredPrompt}
          onDownload={() => {
            startInstallation();
            handleUserChoice();
          }}
        />
      </TabsContent>
      
      <TabsContent value="shortcut">
        <ShortcutInstall 
          shortcutCreated={shortcutCreated}
          onCreateShortcut={() => {
            handleCreateShortcut();
            handleUserChoice();
          }}
        />
      </TabsContent>
    </Tabs>
  );
};

export default InstallationTabs;
