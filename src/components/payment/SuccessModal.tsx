
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
        
        <DialogFooter>
          <Button asChild className="w-full bg-security-primary hover:bg-security-secondary">
            <Link to="/dashboard">
              Accéder au tableau de bord
            </Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuccessModal;
