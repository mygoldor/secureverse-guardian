
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { createCheckoutSession, StripeCheckoutOptions } from '@/utils/stripeUtils';
import { ExternalLink } from 'lucide-react';

interface StripeCheckoutProps {
  planType: 'monthly' | 'yearly';
  email?: string;
  onSuccess?: () => void;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ 
  planType, 
  email, 
  onSuccess 
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // These would be your actual price IDs from Stripe
  const PRICE_IDS = {
    monthly: 'price_monthly',
    yearly: 'price_yearly'
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true);

      // In a real implementation, create the options based on selected plan
      const options: StripeCheckoutOptions = {
        priceId: PRICE_IDS[planType],
        successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/payment`,
        customerEmail: email
      };

      // For demonstration, simulate a successful checkout
      // In production, uncomment the line below to redirect to Stripe
      // const checkoutUrl = await createCheckoutSession(options);
      // window.location.href = checkoutUrl;
      
      // For demo purposes, simulate a successful checkout after short delay
      setTimeout(() => {
        setIsLoading(false);
        
        // Simulate successful payment
        sessionStorage.setItem('paymentSuccessful', 'true');
        
        // Call success callback
        if (onSuccess) {
          onSuccess();
        }
      }, 1500);
    } catch (error) {
      console.error('Checkout error:', error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Erreur de paiement",
        description: "Une erreur s'est produite lors de la redirection vers Stripe.",
      });
    }
  };

  return (
    <Button 
      onClick={handleCheckout} 
      className="w-full bg-security-primary hover:bg-security-primary/90 text-white"
      disabled={isLoading}
    >
      {isLoading ? (
        <>
          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Redirection...
        </>
      ) : (
        <>
          <ExternalLink className="h-4 w-4 mr-2" />
          Payer avec Stripe
        </>
      )}
    </Button>
  );
};

export default StripeCheckout;
