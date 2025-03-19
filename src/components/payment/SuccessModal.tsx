
import React from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ open, onOpenChange }) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="mx-auto bg-green-100 p-3 rounded-full">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <DialogTitle className="text-center pt-4">Paiement réussi !</DialogTitle>
          <DialogDescription className="text-center">
            Merci pour votre abonnement à Guardia Security.
            Un email de confirmation a été envoyé à votre adresse.
          </DialogDescription>
        </DialogHeader>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-4">
          <h4 className="font-medium text-sm mb-2 text-gray-700">Étapes suivantes</h4>
          <ul className="text-sm space-y-2">
            <li className="flex items-start">
              <span className="bg-security-primary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">1</span>
              <span>Vérifiez votre email pour activer votre compte</span>
            </li>
            <li className="flex items-start">
              <span className="bg-security-primary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">2</span>
              <span>Connectez-vous à votre tableau de bord</span>
            </li>
            <li className="flex items-start">
              <span className="bg-security-primary text-white rounded-full h-5 w-5 flex items-center justify-center text-xs mr-2 mt-0.5">3</span>
              <span>Commencez à protéger vos appareils</span>
            </li>
          </ul>
        </div>
        
        <DialogFooter>
          <Button asChild className="w-full bg-security-primary hover:bg-security-secondary">
            <Link to="/">
              Accéder au tableau de bord
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
