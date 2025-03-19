
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Control } from 'react-hook-form';
import { FormValues } from '../PaymentForm';

interface PlanSelectionProps {
  control: Control<FormValues>;
  onPlanChange: (plan: 'monthly' | 'yearly') => void;
}

const PlanSelection: React.FC<PlanSelectionProps> = ({ control, onPlanChange }) => {
  return (
    <FormField
      control={control}
      name="plan"
      render={({ field, fieldState }) => (
        <FormItem className="space-y-3">
          <FormLabel>Sélection du plan</FormLabel>
          <FormControl>
            <RadioGroup
              onValueChange={(value) => {
                field.onChange(value);
                onPlanChange(value as 'monthly' | 'yearly');
              }}
              defaultValue={field.value}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="monthly" id="monthly" />
                <label htmlFor="monthly" className="cursor-pointer">Mensuel - 9,99€/mois</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yearly" id="yearly" />
                <label htmlFor="yearly" className="cursor-pointer">Annuel - 99,99€/an (2 mois offerts)</label>
              </div>
            </RadioGroup>
          </FormControl>
          {fieldState.error && <FormMessage />}
        </FormItem>
      )}
    />
  );
};

export default PlanSelection;
