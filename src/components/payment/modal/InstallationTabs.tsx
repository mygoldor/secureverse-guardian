
import React, { useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
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
  setUserMadeChoice: (choice: boolean) => void;
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
  handleCreateShortcut,
  setUserMadeChoice
}) => {
  // Update user choice status based on current installation state
  useEffect(() => {
    if (
      (installationTab === 'pwa' && deferredPrompt === null) ||
      (installationTab === 'shortcut' && shortcutCreated)
    ) {
      sessionStorage.setItem('installationChoiceMade', 'true');
      setUserMadeChoice(true);
    }
  }, [installationTab, deferredPrompt, shortcutCreated, setUserMadeChoice]);

  return (
    <Tabs defaultValue={installationTab} value={installationTab} onValueChange={setInstallationTab}>
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="pwa" disabled={!isMobile && !deferredPrompt}>Installer PWA</TabsTrigger>
        <TabsTrigger value="shortcut">Raccourci</TabsTrigger>
      </TabsList>
      
      <TabsContent value="pwa">
        <MobilePWA 
          deferredPrompt={deferredPrompt}
          onDownload={() => {
            startInstallation().then(() => {
              sessionStorage.setItem('installationChoiceMade', 'true');
              setUserMadeChoice(true);
            });
          }}
        />
      </TabsContent>
      
      <TabsContent value="shortcut">
        <ShortcutInstall 
          shortcutCreated={shortcutCreated}
          onCreateShortcut={() => {
            handleCreateShortcut();
          }}
        />
      </TabsContent>
    </Tabs>
  );
};

export default InstallationTabs;
