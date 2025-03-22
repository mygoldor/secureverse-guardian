
import React, { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { 
  createPaymentSession, 
  updatePaymentStatus
} from '@/utils/stripe';

import CardPaymentForm, { paymentFormSchema, PaymentFormValues } from './CardPaymentForm';
import PaymentButton from './PaymentButton';

interface StripeCheckoutProps {
  planType: 'monthly' | 'yearly';
  email?: string;
  onSuccess?: () => void;
  paymentMethod?: string;
}

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ 
  planType, 
  email, 
  onSuccess,
  paymentMethod = 'stripe'
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
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
        paymentMethod
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
    // Show the card input form
    setShowCardForm(true);
  };

  return (
    <div className="space-y-4">
      {!showCardForm ? (
        <PaymentButton 
          onClick={handleCheckout}
          isLoading={isLoading}
          isTestMode={false}
          customText={paymentMethod === 'mollie' ? "Payer avec Bancontact" : undefined}
        />
      ) : (
        <CardPaymentForm
          form={form}
          isLoading={isLoading}
          onSubmit={handlePayNow}
          onCancel={() => setShowCardForm(false)}
          isBancontact={paymentMethod === 'mollie'}
        />
      )}
    </div>
  );
};

export default StripeCheckout;
