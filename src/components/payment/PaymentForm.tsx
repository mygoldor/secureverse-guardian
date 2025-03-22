
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
  paymentMethod: z.enum(['stripe', 'mollie']),
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
    mode: 'onChange', // Enable validation as the user types
  });

  // Update form when selectedPlan changes
  useEffect(() => {
    try {
      if (selectedPlan) {
        form.setValue('plan', selectedPlan);
      }
    } catch (error) {
      console.error('Error updating plan value:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Un problème est survenu lors de la mise à jour du plan.",
      });
    }
  }, [selectedPlan, form, toast]);

  const onSubmit = (data: FormValues) => {
    try {
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
      
      // Clear any previous installation choices
      sessionStorage.removeItem('installationChoiceMade');
      
      // Simulate payment processing
      console.log('Processing payment...', data);
      
      setTimeout(() => {
        setIsSubmitting(false);
        
        // Set payment success flag in sessionStorage
        sessionStorage.setItem('paymentSuccessful', 'true');
        
        // Check if the callback exists before calling it
        if (typeof onPaymentSuccess === 'function') {
          onPaymentSuccess();
        } else {
          console.error('onPaymentSuccess is not a function');
          toast({
            variant: "destructive",
            title: "Erreur",
            description: "Impossible de finaliser le paiement. Veuillez réessayer.",
          });
        }
      }, 2000);
    } catch (error) {
      console.error('Payment processing error:', error);
      setIsSubmitting(false);
      toast({
        variant: "destructive",
        title: "Erreur de paiement",
        description: "Une erreur s'est produite lors du traitement du paiement. Veuillez réessayer.",
      });
    }
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
