
import React from 'react';
import { DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { CheckCircle } from 'lucide-react';

const SuccessHeader: React.FC = () => {
  return (
    <DialogHeader>
      <div className="flex justify-center mb-4">
        <CheckCircle className="h-16 w-16 text-green-500" />
      </div>
      <DialogTitle className="text-center text-2xl">Paiement réussi</DialogTitle>
      <DialogDescription className="text-center">
        Votre abonnement à Guardia a été activé avec succès
      </DialogDescription>
    </DialogHeader>
  );
};

export default SuccessHeader;
