
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
      render={({ field, fieldState }) => (
        <FormItem>
          <FormLabel className={fieldState.invalid ? "text-red-500" : ""}>Mode de paiement</FormLabel>
          <FormControl>
            <PaymentMethodSelector 
              value={field.value} 
              onChange={field.onChange} 
            />
          </FormControl>
          {fieldState.error && <FormMessage />}
        </FormItem>
      )}
    />
  );
};

export default PaymentOptions;
