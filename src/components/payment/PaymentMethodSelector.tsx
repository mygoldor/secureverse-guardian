
import React from 'react';
import { CreditCard } from 'lucide-react';

interface PaymentMethodSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

const PaymentMethodSelector: React.FC<PaymentMethodSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
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

      {/* PayPal option */}
      <div
        className={`border rounded-lg p-4 flex flex-col items-center cursor-pointer transition-all ${
          value === 'paypal' ? 'border-security-primary bg-blue-50' : 'border-gray-200'
        }`}
        onClick={() => onChange('paypal')}
      >
        <div className="h-6 w-6 mb-2 flex items-center justify-center">
          <svg viewBox="0 0 24 24" width="24" height="24">
            <path
              fill="#253B80"
              d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106z"
            />
            <path
              fill="#179BD7"
              d="M19.923 5.236c-.568 3.56-3.418 5.764-7.636 5.764h-1.616c-.356 0-.658.254-.712.607l-.824 5.22-.233 1.477c-.43.272.16.52.392.52h2.752c.327 0 .605-.237.656-.56l.27-1.373.427-2.707c.05-.323.33-.56.656-.56h.414c2.995 0 5.338-1.215 6.022-4.733.29-1.485.15-2.729-.596-3.608-.218-.253-.5-.47-.811-.657"
            />
          </svg>
        </div>
        <span className="text-sm font-medium">PayPal</span>
        <span className="text-xs text-gray-500 mt-1">Connexion sécurisée</span>
      </div>
    </div>
  );
};

export default PaymentMethodSelector;
