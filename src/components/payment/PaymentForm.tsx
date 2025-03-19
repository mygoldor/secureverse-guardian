
import React, { useState, useEffect } from 'react';
import { Form } from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';

// Import refactored components
import PlanSelection from './form/PlanSelection';
import PersonalInfo from './form/PersonalInfo';
import PaymentOptions from './form/PaymentOptions';
import TermsAgreement from './form/TermsAgreement';
import SubmitButton from './form/SubmitButton';

interface PaymentFormProps {
  selectedPlan: 'monthly' | 'yearly';
  onPlanChange: (plan: 'monthly' | 'yearly') => void;
  onPaymentSuccess: () => void;
}

const formSchema = z.object({
  name: z.string().min(2, { message: 'Le nom doit contenir au moins 2 caractères' }),
  email: z.string().email({ message: 'Adresse e-mail invalide' }),
  password: z.string().min(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' }),
  plan: z.enum(['monthly', 'yearly']),
  paymentMethod: z.enum(['stripe', 'mollie', 'paypal']),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: 'Vous devez accepter les conditions générales',
  }),
});

export type FormValues = z.infer<typeof formSchema>;

const PaymentForm: React.FC<PaymentFormProps> = ({ 
  selectedPlan, 
  onPlanChange,
  onPaymentSuccess
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      plan: selectedPlan,
      paymentMethod: 'stripe',
      termsAccepted: false,
    },
  });

  // Update form when selectedPlan changes
  useEffect(() => {
    form.setValue('plan', selectedPlan);
  }, [selectedPlan, form]);

  const onSubmit = (data: FormValues) => {
    setIsSubmitting(true);
    
    // Check if email is already in use (simulation)
    if (data.email === 'test@example.com') {
      toast({
        variant: "destructive",
        title: "Erreur de validation",
        description: "Cette adresse e-mail est déjà utilisée.",
      });
      setIsSubmitting(false);
      return;
    }
    
    // Simulate payment processing
    console.log('Processing payment...', data);
    
    setTimeout(() => {
      setIsSubmitting(false);
      onPaymentSuccess();
    }, 2000);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Plan Selection Component */}
        <PlanSelection 
          control={form.control} 
          onPlanChange={onPlanChange} 
        />
        
        {/* Personal Information Component */}
        <PersonalInfo control={form.control} />
        
        {/* Payment Options Component */}
        <PaymentOptions control={form.control} />
        
        {/* Terms Agreement Component */}
        <TermsAgreement control={form.control} />
        
        {/* Submit Button Component */}
        <SubmitButton isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
};

export default PaymentForm;
