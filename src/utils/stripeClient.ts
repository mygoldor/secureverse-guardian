
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

/**
 * Get payment attempts for a customer
 */
export const getPaymentAttempts = async (email: string) => {
  try {
    const { data, error } = await supabase
      .from('payment_attempts')
      .select('*')
      .eq('customer_email', email)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching payment attempts:', error);
    throw error;
  }
};

/**
 * Test fake card payment - simulates a payment with a test card number
 */
export const testCardPayment = async (
  paymentIntentId: string, 
  paymentAttemptId: string, 
  cardNumber: string
): Promise<{ success: boolean; status: string; message: string }> => {
  try {
    // Simulate different responses based on test card numbers
    // Using common Stripe test card numbers:
    // 4242424242424242 - Success
    // 4000000000000002 - Declined
    // 4000000000000101 - Generic decline

    let simulatedStatus: string;
    let message: string;

    if (cardNumber === '4242424242424242') {
      simulatedStatus = 'succeeded';
      message = 'Payment succeeded!';
    } else if (cardNumber === '4000000000000002') {
      simulatedStatus = 'failed';
      message = 'Your card was declined.';
    } else if (cardNumber === '4000000000000101') {
      simulatedStatus = 'failed';
      message = 'Generic decline.';
    } else {
      // Default to succeeded for testing other numbers
      simulatedStatus = 'succeeded';
      message = 'Payment processed with test card.';
    }

    // Make an API call to update the payment status in Supabase
    const { data, error } = await supabase.functions.invoke('update-payment', {
      body: { 
        paymentIntentId, 
        paymentAttemptId,
        testMode: true,
        simulatedStatus
      },
    });

    if (error) throw new Error(error.message);

    return {
      success: simulatedStatus === 'succeeded',
      status: simulatedStatus,
      message
    };
  } catch (error) {
    console.error('Error in test payment:', error);
    return {
      success: false,
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown error occurred'
    };
  }
};

/**
 * Get successful payments for the current user
 */
export const getSuccessfulPayments = async () => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError) throw userError;
    
    const email = userData.user?.email;
    if (!email) {
      throw new Error('User email not found');
    }
    
    const { data, error } = await supabase
      .from('payment_attempts')
      .select('*')
      .eq('customer_email', email)
      .eq('status', 'succeeded')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data || [];
  } catch (error) {
    console.error('Error fetching successful payments:', error);
    throw error;
  }
};

/**
 * Get payment statistics for the dashboard
 */
export const getPaymentStats = async () => {
  try {
    const { data: userData, error: userError } = await supabase.auth.getUser();
    
    if (userError) throw userError;
    
    const email = userData.user?.email;
    if (!email) {
      return {
        totalSpent: 0,
        subscriptionsCount: 0,
        latestPayment: null
      };
    }
    
    // Get all successful payments
    const { data, error } = await supabase
      .from('payment_attempts')
      .select('*')
      .eq('customer_email', email)
      .eq('status', 'succeeded')
      .order('created_at', { ascending: false });

    if (error) throw error;
    
    // Calculate stats
    const payments = data || [];
    const totalSpent = payments.reduce((total, payment) => total + payment.amount, 0) / 100; // Convert from cents
    
    return {
      totalSpent,
      subscriptionsCount: payments.length,
      latestPayment: payments[0] || null
    };
  } catch (error) {
    console.error('Error fetching payment stats:', error);
    return {
      totalSpent: 0,
      subscriptionsCount: 0,
      latestPayment: null
    };
  }
};
