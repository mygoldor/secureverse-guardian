
import React from 'react';
import { Button } from '@/components/ui/button';
import PaymentMethodSelector from '@/components/payment/PaymentMethodSelector';
import StripeCheckout from '@/components/payment/StripeCheckout';

interface PaymentMethodsSectionProps {
  paymentMethod: string;
  selectedPlan: 'monthly' | 'yearly';
  onPaymentMethodChange: (method: string) => void;
  onPaymentSuccess: () => void;
}

const PaymentMethodsSection: React.FC<PaymentMethodsSectionProps> = ({
  paymentMethod,
  selectedPlan,
  onPaymentMethodChange,
  onPaymentSuccess
}) => {
  return (
    <section className="max-w-2xl mx-auto mb-12">
      <div className="bg-green-50 shadow-md rounded-lg p-6 border border-gray-200">
        <h3 className="text-xl font-semibold mb-6 text-center">Options de paiement</h3>
        
        <div className="space-y-4">
          <PaymentMethodSelector 
            value={paymentMethod} 
            onChange={onPaymentMethodChange} 
          />
          
          {paymentMethod === 'stripe' && (
            <StripeCheckout 
              planType={selectedPlan}
              onSuccess={onPaymentSuccess}
            />
          )}
          
          {paymentMethod === 'mollie' && (
            <Button 
              onClick={onPaymentSuccess} 
              className="w-full bg-[#0a84ff] hover:bg-[#0a84ff]/90 text-white"
            >
              Payer avec Bancontact
            </Button>
          )}
          
          {paymentMethod === 'paypal' && (
            <Button 
              onClick={onPaymentSuccess} 
              className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white"
            >
              Payer avec PayPal
            </Button>
          )}
        </div>
      </div>
    </section>
  );
};

export default PaymentMethodsSection;
