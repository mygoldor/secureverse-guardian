
import React from 'react';
import { CreditCard } from 'lucide-react';

interface PaymentMethodSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
      {/* Stripe (Credit Card) option */}
      <div
        className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
          value === 'stripe' ? 'border-security-primary bg-blue-50' : 'border-gray-200'
        }`}
        onClick={() => onChange('stripe')}
      >
        <CreditCard className="h-6 w-6 mb-2" />
        <span className="text-sm font-medium">Carte bancaire</span>
        <span className="text-xs text-gray-500 mt-1">Visa/Mastercard</span>
      </div>

      {/* Mollie (Bancontact) option */}
      <div
        className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
          value === 'mollie' ? 'border-security-primary bg-blue-50' : 'border-gray-200'
        }`}
        onClick={() => onChange('mollie')}
      >
        <div className="h-6 w-6 mb-2 flex items-center justify-center font-bold text-white bg-[#0a84ff] rounded">B</div>
        <span className="text-sm font-medium">Bancontact</span>
        <span className="text-xs text-gray-500 mt-1">Mollie</span>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
