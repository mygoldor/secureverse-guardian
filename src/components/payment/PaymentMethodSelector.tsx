
import React from 'react';
import { CreditCard, CreditCardIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type PaymentMethod = 'stripe' | 'paypal' | 'mollie';

interface PaymentMethodSelectorProps {
  selectedMethod: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ 
  selectedMethod, 
  onChange 
}) => {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium mb-2">Mode de paiement</h3>
      
      <div 
        className={cn(
          "flex items-center p-4 border rounded-lg cursor-pointer",
          selectedMethod === 'stripe' 
            ? "border-security-primary bg-security-primary/5" 
            : "border-gray-200 hover:border-gray-300"
        )}
        onClick={() => onChange('stripe')}
      >
        <div className={cn(
          "w-5 h-5 rounded-full border-2 mr-3",
          selectedMethod === 'stripe' 
            ? "border-security-primary" 
            : "border-gray-300"
        )}>
          {selectedMethod === 'stripe' && (
            <div className="w-2.5 h-2.5 bg-security-primary rounded-full m-auto mt-[1px]"></div>
          )}
        </div>
        <CreditCard className="h-5 w-5 text-gray-600 mr-2" />
        <span className="font-medium">Carte bancaire</span>
        <div className="ml-auto flex space-x-2">
          <img src="/visa.svg" alt="Visa" className="h-6" />
          <img src="/mastercard.svg" alt="Mastercard" className="h-6" />
        </div>
      </div>
      
      <div 
        className={cn(
          "flex items-center p-4 border rounded-lg cursor-pointer",
          selectedMethod === 'paypal' 
            ? "border-security-primary bg-security-primary/5" 
            : "border-gray-200 hover:border-gray-300"
        )}
        onClick={() => onChange('paypal')}
      >
        <div className={cn(
          "w-5 h-5 rounded-full border-2 mr-3",
          selectedMethod === 'paypal' 
            ? "border-security-primary" 
            : "border-gray-300"
        )}>
          {selectedMethod === 'paypal' && (
            <div className="w-2.5 h-2.5 bg-security-primary rounded-full m-auto mt-[1px]"></div>
          )}
        </div>
        <img src="/paypal.svg" alt="PayPal" className="h-5 mr-2" />
        <span className="font-medium">PayPal</span>
      </div>
      
      <div 
        className={cn(
          "flex items-center p-4 border rounded-lg cursor-pointer",
          selectedMethod === 'mollie' 
            ? "border-security-primary bg-security-primary/5" 
            : "border-gray-200 hover:border-gray-300"
        )}
        onClick={() => onChange('mollie')}
      >
        <div className={cn(
          "w-5 h-5 rounded-full border-2 mr-3",
          selectedMethod === 'mollie' 
            ? "border-security-primary" 
            : "border-gray-300"
        )}>
          {selectedMethod === 'mollie' && (
            <div className="w-2.5 h-2.5 bg-security-primary rounded-full m-auto mt-[1px]"></div>
          )}
        </div>
        <img src="/mollie.svg" alt="Mollie" className="h-5 mr-2" />
        <span className="font-medium">Mollie</span>
        <span className="ml-2 text-sm text-gray-500">(Bancontact, iDEAL, etc.)</span>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
