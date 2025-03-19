
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';
import { Control } from 'react-hook-form';
import { FormValues } from '../PaymentForm';

interface TermsAgreementProps {
  control: Control<FormValues>;
}

const TermsAgreement: React.FC<TermsAgreementProps> = ({ control }) => {
  return (
    <FormField
      control={control}
      name="termsAccepted"
      render={({ field, fieldState }) => (
        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
          <FormControl>
            <Checkbox
              checked={field.value}
              onCheckedChange={field.onChange}
              className={fieldState.invalid ? "border-red-500" : ""}
            />
          </FormControl>
          <div className="space-y-1 leading-none">
            <FormLabel className={fieldState.invalid ? "text-red-500" : ""}>
              J'accepte les Conditions Générales
            </FormLabel>
            {fieldState.invalid && (
              <FormMessage />
            )}
          </div>
        </FormItem>
      )}
    />
  );
};

export default TermsAgreement;
