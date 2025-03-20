
import React from 'react';
import { Button } from '@/components/ui/button';
import { ExternalLink, CheckCircle } from 'lucide-react';

interface ShortcutInstallProps {
  shortcutCreated: boolean;
  onCreateShortcut: () => void;
}

const ShortcutInstall: React.FC<ShortcutInstallProps> = ({ 
  shortcutCreated, 
  onCreateShortcut 
}) => {
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
          onClick={onCreateShortcut}
          variant="outline"
          className="bg-purple-100 border-purple-300 text-purple-800 hover:bg-purple-200"
        >
          Télécharger le raccourci
        </Button>
      )}
    </div>
  );
};

export default ShortcutInstall;
