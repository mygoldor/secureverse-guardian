
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
    
    console.log('PaymentSuccessGuard checks:', { 
      hasSuccessfulPayment, 
      hasUserMadeChoice,
      timeChecked: new Date().toISOString() 
    });
    
    if (!hasSuccessfulPayment) {
      toast({
        variant: "destructive",
        title: "Accès refusé",
        description: "Cette page n'est accessible qu'après un paiement réussi.",
      });
      navigate('/payment');
    } else if (hasUserMadeChoice) {
      // If the user has already made an installation choice, redirect to dashboard
      console.log('User made installation choice, redirecting to dashboard');
      navigate('/dashboard');
    } else {
      console.log('Payment successful but no installation choice made, showing modal');
      // Clear any incorrect or stale choice data
      sessionStorage.removeItem('installationChoiceMade');
      setIsVerified(true);
    }
    
    setIsLoading(false);
  }, [navigate, toast]);

  // We need to handle browser navigation/refresh to prevent users from escaping the choice
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      const hasUserMadeChoice = sessionStorage.getItem('installationChoiceMade') === 'true';
      if (isVerified && !hasUserMadeChoice) {
        const message = 'Vous devez choisir une option d\'installation avant de quitter.';
        e.preventDefault();
        e.returnValue = message;
        return message;
      }
    };

    // Handle attempts to navigate away using browser controls
    const handlePopState = () => {
      const hasUserMadeChoice = sessionStorage.getItem('installationChoiceMade') === 'true';
      if (isVerified && !hasUserMadeChoice) {
        // Push the current state back to prevent navigation
        window.history.pushState(null, '', window.location.pathname);
        toast({
          variant: "destructive",
          title: "Action requise",
          description: "Veuillez choisir une option d'installation avant de continuer.",
        });
      }
    };

    if (isVerified) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      window.addEventListener('popstate', handlePopState);
      
      // Push a state to ensure we can catch back button presses
      window.history.pushState(null, '', window.location.pathname);
    }
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('popstate', handlePopState);
    };
  }, [isVerified, toast]);

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
