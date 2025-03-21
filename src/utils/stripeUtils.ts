
/**
 * Stripe utility functions for payment processing
 */

// Define interface for checkout options
export interface StripeCheckoutOptions {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  customerEmail?: string;
}

/**
 * Create a Stripe checkout session
 * @param options Checkout session options
 * @returns The URL to redirect to for checkout
 */
export const createCheckoutSession = async (options: StripeCheckoutOptions): Promise<string> => {
  try {
    // In a real implementation, this would make a request to your backend
    // which would then create a Stripe checkout session
    const response = await fetch('/api/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(options),
    });

    if (!response.ok) {
      throw new Error('Failed to create checkout session');
    }

    const data = await response.json();
    return data.url;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

/**
 * Redirect to Stripe customer portal
 * @returns Success status
 */
export const redirectToCustomerPortal = async (): Promise<boolean> => {
  try {
    // This would make a request to your backend to create a portal session
    const response = await fetch('/api/customer-portal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to create portal session');
    }

    const data = await response.json();
    window.location.href = data.url;
    return true;
  } catch (error) {
    console.error('Error redirecting to customer portal:', error);
    return false;
  }
};
