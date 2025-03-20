
import React from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { InfoIcon } from 'lucide-react';

interface ShortcutConfirmationDialogProps {
  open: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  deviceType: string;
}

const ShortcutConfirmationDialog: React.FC<ShortcutConfirmationDialogProps> = ({
  open,
  onConfirm,
  onCancel,
  deviceType,
}) => {
  // Determine location based on device type
  const getLocationText = () => {
    switch (deviceType.toLowerCase()) {
      case 'windows':
        return "sur votre bureau";
      case 'mac':
        return "dans votre dossier Téléchargements";
      case 'linux':
        return "dans votre dossier Téléchargements";
      case 'android':
        return "sur votre écran d'accueil";
      case 'ios':
        return "sur votre écran d'accueil";
      default:
        return "dans votre dossier Téléchargements";
    }
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center gap-2">
            <InfoIcon className="h-5 w-5 text-blue-500" />
            Confirmation de création du raccourci
          </AlertDialogTitle>
          <AlertDialogDescription>
            Un raccourci Guardia sera créé {getLocationText()}. 
            <br /><br />
            Vous pourrez facilement accéder à Guardia en cliquant sur ce raccourci.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction 
            onClick={onConfirm}
            className="bg-purple-600 hover:bg-purple-700 text-white"
          >
            Créer le raccourci
          </AlertDialogAction>
          <AlertDialogAction 
            onClick={onCancel}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Annuler
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ShortcutConfirmationDialog;
