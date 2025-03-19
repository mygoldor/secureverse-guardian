
import React from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Control } from 'react-hook-form';
import { FormValues } from '../PaymentForm';
import { useLanguage } from '@/contexts/LanguageContext';

interface PlanSelectionProps {
  control: Control<FormValues>;
  onPlanChange: (plan: 'monthly' | 'yearly') => void;
}

const PlanSelection: React.FC<PlanSelectionProps> = ({ control, onPlanChange }) => {
  const { t } = useLanguage();
  
  return (
    <FormField
      control={control}
      name="plan"
      render={({ field, fieldState }) => (
        <FormItem className="space-y-3">
          <FormLabel>{t('plan_selection')}</FormLabel>
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
                <label htmlFor="monthly" className="cursor-pointer">{t('monthly_plan')} - {t('monthly_price')}</label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yearly" id="yearly" />
                <label htmlFor="yearly" className="cursor-pointer">{t('yearly_plan')} - {t('yearly_price')} ({t('save_with_yearly')})</label>
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
