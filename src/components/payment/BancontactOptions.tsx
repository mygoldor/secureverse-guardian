
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Smartphone } from 'lucide-react';
import CardPaymentForm, { bancontactFormSchema, BancontactFormValues } from './CardPaymentForm';

interface BancontactOptionsProps {
  onSuccess: () => void;
}

const BancontactOptions: React.FC<BancontactOptionsProps> = ({ onSuccess }) => {
  const [showCardForm, setShowCardForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<BancontactFormValues>({
    resolver: zodResolver(bancontactFormSchema),
    defaultValues: {
      cardNumber: '',
      cardName: '',
      expiry: '',
    },
  });

  const handleCardSubmit = (values: BancontactFormValues) => {
    setIsLoading(true);
    console.log('Bancontact card payment values:', values);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 2000);
  };

  const handleAppPayment = () => {
    setIsLoading(true);
    console.log('Processing Bancontact app payment');
    
    // Simulate payment processing
    setTimeout(() => {
      setIsLoading(false);
      onSuccess();
    }, 2000);
  };

  // Direct handler for card option - immediately shows the form
  const handleCardOptionClick = () => {
    setShowCardForm(true);
  };

  if (showCardForm) {
    return (
      <CardPaymentForm 
        form={form}
        isLoading={isLoading}
        onSubmit={handleCardSubmit}
        onCancel={() => setShowCardForm(false)}
        isBancontact={true}
      />
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 text-center">Options Bancontact</h3>
        
        <div className="grid grid-cols-1 gap-4 pt-2">
          {/* Card option - now directly clickable */}
          <div 
            className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 cursor-pointer"
            onClick={handleCardOptionClick}
          >
            <div className="flex-grow cursor-pointer flex items-center">
              <div className="ml-2">
                <p className="font-medium">Carte bancaire</p>
                <p className="text-sm text-gray-500">Payer avec une carte Bancontact</p>
              </div>
            </div>
          </div>
          
          {/* App option */}
          <div 
            className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 cursor-pointer"
            onClick={handleAppPayment}
          >
            <div className="flex-grow cursor-pointer flex items-center">
              <Smartphone className="h-5 w-5 text-blue-500 mr-2" />
              <div>
                <p className="font-medium">Application mobile</p>
                <p className="text-sm text-gray-500">Utiliser l'app Bancontact sur votre téléphone</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BancontactOptions;
