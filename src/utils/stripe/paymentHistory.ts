
import { supabase } from '@/integrations/supabase/client';

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
