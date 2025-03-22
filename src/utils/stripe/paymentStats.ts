
import { supabase } from '@/integrations/supabase/client';

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
