
import React from 'react';
import { Button } from '@/components/ui/button';

interface ForcedInstallModalProps {
  isOpen: boolean;
  onInstall: () => void;
  onCreateShortcut: () => void;
}

const ForcedInstallModal: React.FC<ForcedInstallModalProps> = ({
  isOpen,
  onInstall,
  onCreateShortcut
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-bold mb-4 text-center">Installation de Guardia</h2>
        <p className="mb-6 text-center">
          Voulez-vous installer Guardia ou créer un raccourci sur votre écran d'accueil ?
        </p>
        <div className="flex justify-center gap-4">
          <Button onClick={onInstall} className="bg-green-600 hover:bg-green-700">
            Installer
          </Button>
          <Button 
            onClick={onCreateShortcut} 
            variant="outline"
            className="border-purple-300 text-purple-800 hover:bg-purple-100"
          >
            Créer un raccourci
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ForcedInstallModal;
