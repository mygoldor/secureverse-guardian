
import React from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { CheckCircle } from 'lucide-react';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex justify-center mb-4">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <DialogTitle className="text-center text-2xl">Paiement réussi</DialogTitle>
        </DialogHeader>
        <div className="text-center space-y-4">
          <p>Merci pour votre abonnement à Guardia !</p>
          <p>Un email de confirmation a été envoyé à votre adresse avec un lien de validation.</p>
          <p className="text-sm text-gray-500">Vous allez être redirigé vers votre tableau de bord...</p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
