
import React from 'react';
import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';
import LoadingSpinner from './LoadingSpinner';

interface PaymentButtonProps {
  onClick: () => void;
  isLoading: boolean;
  isTestMode: boolean;
}

const PaymentButton: React.FC<PaymentButtonProps> = ({
  onClick,
  isLoading,
  isTestMode
}) => {
  return (
    <Button 
      onClick={onClick} 
      className="w-full bg-security-primary hover:bg-security-primary/90 text-white"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <LoadingSpinner />
          Traitement du paiement...
        </>
      ) : (
        <>
          <CreditCard className="h-4 w-4 mr-2" />
          {isTestMode ? 'Tester le Paiement' : 'Contenu'}
        </>
      )}
    </Button>
  );
};

export default PaymentButton;
