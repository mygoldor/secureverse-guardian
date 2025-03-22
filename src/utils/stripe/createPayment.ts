
import { supabase } from '@/integrations/supabase/client';

interface CreatePaymentSessionOptions {
  planType: 'monthly' | 'yearly';
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
  // Add test mode for using fake cards
  testMode?: boolean;
}

interface PaymentResult {
  clientSecret: string;
  paymentIntentId: string;
  paymentAttemptId: string;
}

/**
 * Create a Stripe payment session via Supabase Edge Function
 */
export const createPaymentSession = async (options: CreatePaymentSessionOptions): Promise<PaymentResult> => {
  try {
    const { data, error } = await supabase.functions.invoke('stripe-payment', {
      body: options,
    });

    if (error) throw new Error(error.message);
    if (!data) throw new Error('No data returned from payment function');

    return data as PaymentResult;
  } catch (error) {
    console.error('Error creating payment session:', error);
    throw error;
  }
};
