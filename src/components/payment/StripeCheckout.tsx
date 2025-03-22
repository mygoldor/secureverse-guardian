
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  createPaymentSession, 
  updatePaymentStatus, 
  testCardPayment 
} from '@/utils/stripe';

import TestModeSection from './TestModeSection';
import CardPaymentForm, { paymentFormSchema, PaymentFormValues } from './CardPaymentForm';
import PaymentButton from './PaymentButton';

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
  const [isLoading, setIsLoading] = React.useState(false);
  const [testMode, setTestMode] = React.useState(false);
  const [testCardNumber, setTestCardNumber] = React.useState('4242424242424242');
  const [showCardForm, setShowCardForm] = React.useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvc: '',
    },
  });

  const handlePayNow = async (values: PaymentFormValues) => {
    try {
      setIsLoading(true);
      
      // Create options for payment session
      const options = {
        planType,
        successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/payment`,
        customerEmail: email || '',
        testMode
      };

      // Call our Supabase Edge Function to create a payment session
      const { clientSecret, paymentIntentId, paymentAttemptId } = await createPaymentSession(options);
      
      console.log('Payment session created:', { clientSecret, paymentIntentId, paymentAttemptId });
      
      // For real app, this would process the actual card details
      // For now, we'll simulate a successful payment
      const { status } = await updatePaymentStatus(paymentIntentId, paymentAttemptId);
      
      console.log('Payment status updated:', status);
      
      setIsLoading(false);
      toast({
        title: "Paiement Réussi",
        description: `Statut du paiement: ${status}`,
      });
      
      // Set success in session storage for demo purposes
      sessionStorage.setItem('paymentSuccessful', 'true');
      
      // Call the success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Payment error:', error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Erreur de paiement",
        description: "Une erreur s'est produite lors du traitement du paiement.",
      });
    }
  };

  const handleCheckout = async () => {
    if (testMode) {
      try {
        setIsLoading(true);
        
        // Create options for payment session
        const options = {
          planType,
          successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/payment`,
          customerEmail: email || '',
          testMode
        };

        // Call our Supabase Edge Function to create a payment session
        const { clientSecret, paymentIntentId, paymentAttemptId } = await createPaymentSession(options);
        
        console.log('Payment session created:', { clientSecret, paymentIntentId, paymentAttemptId });
        
        toast({
          title: "Mode Test Activé",
          description: "Traitement du paiement avec une carte de test...",
        });
        
        // Process test card payment
        const result = await testCardPayment(paymentIntentId, paymentAttemptId, testCardNumber);
        
        setIsLoading(false);
        
        if (result.success) {
          toast({
            title: "Paiement Réussi",
            description: result.message,
          });
          
          // Set success in session storage for demo purposes
          sessionStorage.setItem('paymentSuccessful', 'true');
          
          // Call the success callback
          if (onSuccess) {
            onSuccess();
          }
        } else {
          toast({
            variant: "destructive",
            title: "Échec du Paiement",
            description: result.message,
          });
        }
      } catch (error) {
        console.error('Checkout error:', error);
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Erreur de paiement",
          description: "Une erreur s'est produite lors de la création du paiement.",
        });
      }
    } else {
      // Show the card input form
      setShowCardForm(true);
    }
  };

  return (
    <div className="space-y-4">
      <TestModeSection 
        testMode={testMode}
        testCardNumber={testCardNumber}
        onTestModeChange={setTestMode}
        onTestCardNumberChange={setTestCardNumber}
      />
      
      {!showCardForm ? (
        <PaymentButton 
          onClick={handleCheckout}
          isLoading={isLoading}
          isTestMode={testMode}
        />
      ) : (
        <CardPaymentForm
          form={form}
          isLoading={isLoading}
          onSubmit={handlePayNow}
          onCancel={() => setShowCardForm(false)}
        />
      )}
    </div>
  );
};

export default StripeCheckout;
