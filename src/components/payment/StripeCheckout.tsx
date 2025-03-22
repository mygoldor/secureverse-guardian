
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ExternalLink } from 'lucide-react';
import { createPaymentSession, updatePaymentStatus } from '@/utils/stripeClient';

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

  const handleCheckout = async () => {
    try {
      setIsLoading(true);
      
      // Create options for payment session
      const options = {
        planType,
        successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/payment`,
        customerEmail: email || ''
      };

      // Call our Supabase Edge Function to create a payment session
      const { clientSecret, paymentIntentId, paymentAttemptId } = await createPaymentSession(options);
      
      console.log('Payment session created:', { clientSecret, paymentIntentId, paymentAttemptId });
      
      // For testing purposes, we'll simulate a successful payment
      // In a real app, you'd use Stripe Elements or redirect to Stripe Checkout
      toast({
        title: "Test Payment Initialized",
        description: "Using test mode. In a real app, you'd be redirected to Stripe.",
      });
      
      // Simulate payment processing
      setTimeout(async () => {
        try {
          // Update the payment status
          const { status } = await updatePaymentStatus(paymentIntentId, paymentAttemptId);
          
          console.log('Payment status updated:', status);
          
          setIsLoading(false);
          toast({
            title: "Test Payment Successful",
            description: `Payment status: ${status}`,
          });
          
          // Set success in session storage for demo purposes
          sessionStorage.setItem('paymentSuccessful', 'true');
          
          // Call the success callback
          if (onSuccess) {
            onSuccess();
          }
        } catch (error) {
          console.error('Error updating payment status:', error);
          setIsLoading(false);
          toast({
            variant: "destructive",
            title: "Payment Error",
            description: "Error updating payment status.",
          });
        }
      }, 2000);
    } catch (error) {
      console.error('Checkout error:', error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Erreur de paiement",
        description: "Une erreur s'est produite lors de la création du paiement.",
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
          Traitement du paiement...
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
