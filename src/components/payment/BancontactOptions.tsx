
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import CardPaymentForm from './CardPaymentForm';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { paymentFormSchema, PaymentFormValues } from './CardPaymentForm';
import { Smartphone } from 'lucide-react';

interface BancontactOptionsProps {
  onSuccess: () => void;
}

const BancontactOptions: React.FC<BancontactOptionsProps> = ({ onSuccess }) => {
  const [showCardForm, setShowCardForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'app'>('card');
  
  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvc: '',
    },
  });

  const handleCardSubmit = (values: PaymentFormValues) => {
    setIsLoading(true);
    console.log('Card payment values:', values);
    
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

  const handleChooseMethod = (method: 'card' | 'app') => {
    setPaymentMethod(method);
    if (method === 'card') {
      setShowCardForm(true);
    } else {
      handleAppPayment();
    }
  };

  return (
    <div className="space-y-4">
      {!showCardForm ? (
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-center">Options Bancontact</h3>
          
          <RadioGroup 
            defaultValue="card"
            className="grid grid-cols-1 gap-4 pt-2"
            onValueChange={(value) => setPaymentMethod(value as 'card' | 'app')}
          >
            <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="card" id="card-option" />
              <Label htmlFor="card-option" className="flex-grow cursor-pointer flex items-center">
                <div className="ml-2">
                  <p className="font-medium">Carte bancaire</p>
                  <p className="text-sm text-gray-500">Payer avec une carte Bancontact</p>
                </div>
              </Label>
            </div>
            
            <div className="flex items-center space-x-2 border p-3 rounded-md hover:bg-gray-50 cursor-pointer">
              <RadioGroupItem value="app" id="app-option" />
              <Label htmlFor="app-option" className="flex-grow cursor-pointer flex items-center">
                <Smartphone className="h-5 w-5 text-blue-500 mr-2" />
                <div>
                  <p className="font-medium">Application mobile</p>
                  <p className="text-sm text-gray-500">Utiliser l'app Bancontact sur votre téléphone</p>
                </div>
              </Label>
            </div>
          </RadioGroup>
          
          <div className="mt-6 flex justify-center">
            <Button 
              onClick={() => handleChooseMethod(paymentMethod)}
              className="bg-[#0a84ff] hover:bg-[#0a84ff]/90 text-white w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Traitement...' : 'Continuer'}
            </Button>
          </div>
        </div>
      ) : (
        <CardPaymentForm 
          form={form}
          isLoading={isLoading}
          onSubmit={handleCardSubmit}
          onCancel={() => setShowCardForm(false)}
        />
      )}
    </div>
  );
};

export default BancontactOptions;
