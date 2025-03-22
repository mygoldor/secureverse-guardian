
import { supabase } from '@/integrations/supabase/client';

interface CreatePaymentSessionOptions {
  planType: 'monthly' | 'yearly';
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
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

/**
 * Update payment status in Supabase
 */
export const updatePaymentStatus = async (paymentIntentId: string, paymentAttemptId: string): Promise<{ status: string }> => {
  try {
    const { data, error } = await supabase.functions.invoke('update-payment', {
      body: { paymentIntentId, paymentAttemptId },
    });

    if (error) throw new Error(error.message);
    if (!data) throw new Error('No data returned from update payment function');

    return { status: data.status };
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};
