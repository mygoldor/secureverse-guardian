
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, CheckCircle, Loader2 } from 'lucide-react';
import ShortcutConfirmationDialog from './ShortcutConfirmationDialog';
import { Progress } from '@/components/ui/progress';

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
  const [creatingShortcut, setCreatingShortcut] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  // When the component renders and shows shortcut created
  // make sure the session storage is updated
  useEffect(() => {
    if (shortcutCreated) {
      console.log('ShortcutInstall: shortcut created, updating session storage');
      sessionStorage.setItem('installationChoiceMade', 'true');
      setCreatingShortcut(false);
      setProgressValue(100);
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

  // Simulate progress for shortcut creation
  useEffect(() => {
    if (creatingShortcut && !shortcutCreated) {
      const interval = setInterval(() => {
        setProgressValue((prevValue) => {
          // Stop increasing when we hit 90% - the final 10% will happen after success
          const newValue = prevValue < 90 ? prevValue + 10 : prevValue;
          return newValue;
        });
      }, 200); // Update every 200ms
      
      return () => clearInterval(interval);
    }
  }, [creatingShortcut, shortcutCreated]);

  const handleCreateShortcutClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmShortcut = () => {
    console.log('Create shortcut button clicked, setting installationChoiceMade to true');
    sessionStorage.setItem('installationChoiceMade', 'true');
    setCreatingShortcut(true);
    setProgressValue(10); // Start at 10%
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
      
      {creatingShortcut && !shortcutCreated && (
        <div className="mb-3">
          <div className="flex items-center mb-1">
            <Loader2 className="h-4 w-4 mr-2 text-purple-700 animate-spin" />
            <span className="text-sm text-purple-700">Création du raccourci en cours...</span>
          </div>
          <Progress value={progressValue} className="h-2" indicatorClassName="bg-purple-600" />
        </div>
      )}
      
      {shortcutCreated ? (
        <div className="bg-green-100 p-2 rounded text-green-800 text-sm mb-2">
          <CheckCircle className="h-4 w-4 inline mr-1" />
          Raccourci créé avec succès! Vérifiez vos téléchargements.
          {progressValue === 100 && (
            <div className="mt-1">
              <Progress value={progressValue} className="h-2" indicatorClassName="bg-green-600" />
            </div>
          )}
        </div>
      ) : (
        <Button 
          onClick={handleCreateShortcutClick}
          variant="outline"
          className="bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200"
          disabled={creatingShortcut}
        >
          {creatingShortcut ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Création en cours...
            </>
          ) : (
            'Télécharger le raccourci'
          )}
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
