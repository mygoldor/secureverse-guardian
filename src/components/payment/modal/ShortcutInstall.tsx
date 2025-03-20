
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, CheckCircle } from 'lucide-react';
import ShortcutConfirmationDialog from './ShortcutConfirmationDialog';

interface ShortcutInstallProps {
  shortcutCreated: boolean;
  onCreateShortcut: () => void;
}

const ShortcutInstall: React.FC<ShortcutInstallProps> = ({ 
  shortcutCreated, 
  onCreateShortcut 
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [deviceType, setDeviceType] = useState('');

  // When the component renders and shows shortcut created
  // make sure the session storage is updated
  useEffect(() => {
    if (shortcutCreated) {
      console.log('ShortcutInstall: shortcut created, updating session storage');
      sessionStorage.setItem('installationChoiceMade', 'true');
    }
    
    // Detect device type
    const userAgent = navigator.userAgent.toLowerCase();
    if (userAgent.includes('windows')) {
      setDeviceType('windows');
    } else if (userAgent.includes('mac')) {
      setDeviceType('mac');
    } else if (userAgent.includes('linux')) {
      setDeviceType('linux');
    } else if (userAgent.includes('android')) {
      setDeviceType('android');
    } else if (userAgent.includes('iphone') || userAgent.includes('ipad')) {
      setDeviceType('ios');
    } else {
      setDeviceType('other');
    }
  }, [shortcutCreated]);

  const handleCreateShortcutClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmShortcut = () => {
    console.log('Create shortcut button clicked, setting installationChoiceMade to true');
    sessionStorage.setItem('installationChoiceMade', 'true');
    onCreateShortcut();
    setShowConfirmation(false);
  };

  const handleCancelShortcut = () => {
    setShowConfirmation(false);
  };

  return (
    <div className="bg-purple-50 p-3 rounded-md mb-3">
      <h4 className="font-medium text-purple-800 mb-2 flex items-center">
        <ExternalLink className="h-4 w-4 mr-1" />
        Créer un raccourci
      </h4>
      <p className="text-sm text-purple-700 mb-2">
        Téléchargez un raccourci vers Guardia pour l'ajouter à votre bureau ou écran d'accueil.
      </p>
      {shortcutCreated ? (
        <div className="bg-green-100 p-2 rounded text-green-800 text-sm mb-2">
          <CheckCircle className="h-4 w-4 inline mr-1" />
          Raccourci créé avec succès! Vérifiez vos téléchargements.
        </div>
      ) : (
        <Button 
          onClick={handleCreateShortcutClick}
          variant="outline"
          className="bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200"
        >
          Télécharger le raccourci
        </Button>
      )}

      <ShortcutConfirmationDialog
        open={showConfirmation}
        onConfirm={handleConfirmShortcut}
        onCancel={handleCancelShortcut}
        deviceType={deviceType}
      />
    </div>
  );
};

export default ShortcutInstall;
