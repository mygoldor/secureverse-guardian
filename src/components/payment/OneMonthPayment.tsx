import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { CreditCard } from 'lucide-react';
import { createPaymentSession, updatePaymentStatus } from '@/utils/stripe';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoadingSpinner from './LoadingSpinner';

interface OneMonthPaymentProps {
  onSuccess?: () => void;
}

const OneMonthPayment: React.FC<OneMonthPaymentProps> = ({ onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const { toast } = useToast();

  // Get the current user's email if logged in
  React.useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      if (data.user?.email) {
        setEmail(data.user.email);
      }
    };
    getUser();
  }, []);

  const handlePayment = async () => {
    try {
      setIsLoading(true);
      
      // Create payment session for a monthly plan
      const options = {
        planType: 'monthly' as const,
        successUrl: `${window.location.origin}/payment/success`,
        cancelUrl: `${window.location.origin}/payment`,
        customerEmail: email,
        testMode: true // Using test mode for demonstration
      };

      toast({
        title: "Initializing Payment",
        description: "Preparing your one-month subscription...",
      });

      // Call Supabase Edge Function to create payment
      const { clientSecret, paymentIntentId, paymentAttemptId } = await createPaymentSession(options);
      
      console.log('Payment session created:', { paymentIntentId, paymentAttemptId });
      
      // Simulate successful payment for demonstration
      setTimeout(async () => {
        try {
          // Update payment status to succeeded
          const { status } = await updatePaymentStatus(
            paymentIntentId, 
            paymentAttemptId, 
            true, // Use test mode
            'succeeded' // Force success status
          );
          
          setIsLoading(false);
          
          toast({
            title: "Payment Successful",
            description: "Your one-month subscription has been activated!",
          });
          
          // Set success in session storage
          sessionStorage.setItem('paymentSuccessful', 'true');
          
          if (onSuccess) {
            onSuccess();
          }
        } catch (error) {
          console.error('Error updating payment:', error);
          setIsLoading(false);
          toast({
            variant: "destructive",
            title: "Payment Failed",
            description: "Could not process your payment. Please try again.",
          });
        }
      }, 2000);
    } catch (error) {
      console.error('Payment error:', error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Payment Error",
        description: "An error occurred while processing your payment.",
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center">One-Month Subscription</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-semibold text-lg mb-2">Monthly Plan</h3>
            <p className="text-2xl font-bold mb-1">€9.99 <span className="text-sm font-normal">/month</span></p>
            <p className="text-sm text-gray-600">Full access to all Guardia security features</p>
          </div>
          
          <Button 
            onClick={handlePayment} 
            className="w-full bg-security-primary hover:bg-security-primary/90 text-white"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <LoadingSpinner />
                Processing...
              </>
            ) : (
              <>
                <CreditCard className="h-4 w-4 mr-2" />
                Pay Now (Test Mode)
              </>
            )}
          </Button>
          
          <p className="text-xs text-center text-gray-500 mt-2">
            This is a test payment. No actual charge will be made.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default OneMonthPayment;
