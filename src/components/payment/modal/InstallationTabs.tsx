
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Smartphone, Laptop, ExternalLink } from 'lucide-react';
import DesktopDownload from './DesktopDownload';
import MobilePWA from './MobilePWA';
import ShortcutInstall from './ShortcutInstall';

interface InstallationTabsProps {
  installationTab: 'download' | 'pwa' | 'shortcut';
  setInstallationTab: (value: 'download' | 'pwa' | 'shortcut') => void;
  isMobile: boolean;
  deferredPrompt: any;
  downloadStarted: boolean;
  downloadError: boolean | undefined;
  startInstallation: () => void;
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
  return (
    <Tabs value={installationTab} onValueChange={(value) => setInstallationTab(value as any)}>
      <TabsList className="grid grid-cols-3 mb-4">
        {!isMobile && (
          <TabsTrigger value="download" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            Télécharger
          </TabsTrigger>
        )}
        <TabsTrigger value="pwa" className="flex items-center gap-1">
          {isMobile ? <Smartphone className="h-4 w-4" /> : <Laptop className="h-4 w-4" />}
          Application Web
        </TabsTrigger>
        <TabsTrigger value="shortcut" className="flex items-center gap-1">
          <ExternalLink className="h-4 w-4" />
          Raccourci
        </TabsTrigger>
      </TabsList>
      
      <TabsContent value="download">
        {!isMobile && (
          <DesktopDownload 
            installationStarted={downloadStarted}
            downloadError={downloadError}
            onDownload={handleDownload}
            onReset={handleReset}
          />
        )}
      </TabsContent>
      
      <TabsContent value="pwa">
        <div className="bg-blue-50 p-3 rounded-md mb-3">
          <h4 className="font-medium text-blue-800 mb-2 flex items-center">
            <Laptop className="h-4 w-4 mr-1" />
            Installation comme application web
          </h4>
          <p className="text-sm text-blue-700 mb-2">
            Ajoutez Guardia à votre écran d'accueil pour une expérience optimale et un accès rapide.
          </p>
          {isMobile ? (
            <MobilePWA deferredPrompt={deferredPrompt} />
          ) : (
            <div>
              <p className="text-sm text-blue-700 mb-2">
                Cliquez sur l'icône d'installation dans la barre d'adresse de votre navigateur ou utilisez le menu du navigateur.
              </p>
              <Button 
                onClick={() => startInstallation()}
                variant="outline"
                className="bg-blue-100 border-blue-300 text-blue-800 hover:bg-blue-200"
              >
                Installer Guardia
              </Button>
            </div>
          )}
        </div>
      </TabsContent>
      
      <TabsContent value="shortcut">
        <ShortcutInstall 
          shortcutCreated={shortcutCreated}
          onCreateShortcut={handleCreateShortcut}
        />
      </TabsContent>
    </Tabs>
  );
};

// Import Button only for the inline component
import { Button } from '@/components/ui/button';

export default InstallationTabs;
