
import { supabase } from '@/integrations/supabase/client';

/**
 * Update payment status in Supabase
 */
export const updatePaymentStatus = async (
  paymentIntentId: string, 
  paymentAttemptId: string
): Promise<{ status: string }> => {
  try {
    const { data, error } = await supabase.functions.invoke('update-payment', {
      body: { 
        paymentIntentId, 
        paymentAttemptId
      },
    });

    if (error) throw new Error(error.message);
    if (!data) throw new Error('No data returned from update payment function');

    return { status: data.status };
  } catch (error) {
    console.error('Error updating payment status:', error);
    throw error;
  }
};
