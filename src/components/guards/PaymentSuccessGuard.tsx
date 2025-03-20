
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface PaymentSuccessGuardProps {
  children: React.ReactNode;
}

const PaymentSuccessGuard: React.FC<PaymentSuccessGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if payment was successful
    const hasSuccessfulPayment = sessionStorage.getItem('paymentSuccessful') === 'true';
    const hasUserMadeChoice = sessionStorage.getItem('installationChoiceMade') === 'true';
    
    if (!hasSuccessfulPayment) {
      toast({
        variant: "destructive",
        title: "Accès refusé",
        description: "Cette page n'est accessible qu'après un paiement réussi.",
      });
      navigate('/payment');
    } else if (hasUserMadeChoice) {
      // If the user has already made an installation choice, redirect to dashboard
      navigate('/dashboard');
    } else {
      setIsVerified(true);
    }
    
    setIsLoading(false);
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-security-primary"></div>
      </div>
    );
  }

  if (!isVerified) {
    return null;
  }

  return <>{children}</>;
};

export default PaymentSuccessGuard;
