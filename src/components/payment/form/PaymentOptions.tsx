
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Control } from 'react-hook-form';
import PaymentMethodSelector from '../PaymentMethodSelector';
import { FormValues } from '../PaymentForm';

interface PaymentOptionsProps {
  control: Control<FormValues>;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="paymentMethod"
      render={({ field }) => (
        <FormItem>
          <FormLabel>Mode de paiement</FormLabel>
          <FormControl>
            <PaymentMethodSelector 
              value={field.value} 
              onChange={field.onChange} 
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PaymentOptions;
