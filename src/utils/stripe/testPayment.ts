
import { supabase } from '@/integrations/supabase/client';

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
