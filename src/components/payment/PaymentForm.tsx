
import React, { useState } from 'react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import PaymentMethodSelector from './PaymentMethodSelector';

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
  termsAccepted: z.literal(true, {
    errorMap: () => ({ message: 'Vous devez accepter les conditions générales' }),
  }),
});

type FormValues = z.infer<typeof formSchema>;

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
  React.useEffect(() => {
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
        {/* Sélection du plan */}
        <FormField
          control={form.control}
          name="plan"
          render={({ field }) => (
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
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Informations personnelles */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom</FormLabel>
              <FormControl>
                <Input placeholder="Votre nom" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Adresse e-mail</FormLabel>
              <FormControl>
                <Input type="email" placeholder="votre@email.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Mot de passe</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        {/* Sélection du mode de paiement */}
        <FormField
          control={form.control}
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
        
        {/* Conditions générales */}
        <FormField
          control={form.control}
          name="termsAccepted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              <FormControl>
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>
                  J'accepte les Conditions Générales
                </FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? 'Traitement...' : "S'abonner maintenant"}
        </Button>
      </form>
    </Form>
  );
};

export default PaymentForm;
