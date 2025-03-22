
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Lock } from 'lucide-react';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { UseFormReturn } from 'react-hook-form';
import * as z from 'zod';
import LoadingSpinner from './LoadingSpinner';

// Define the schema for the form validation
export const paymentFormSchema = z.object({
  cardNumber: z.string().min(16, "Le numéro de carte doit comporter 16 chiffres"),
  cardName: z.string().min(3, "Veuillez entrer le nom sur la carte"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Format MM/YY requis"),
  cvc: z.string().min(3, "Le CVC doit comporter 3 chiffres").optional(),
});

// Bancontact schema without CVC
export const bancontactFormSchema = paymentFormSchema.omit({ cvc: true });

export type PaymentFormValues = z.infer<typeof paymentFormSchema>;
export type BancontactFormValues = z.infer<typeof bancontactFormSchema>;

interface CardPaymentFormProps {
  form: UseFormReturn<PaymentFormValues> | UseFormReturn<BancontactFormValues>;
  isLoading: boolean;
  onSubmit: (values: PaymentFormValues | BancontactFormValues) => void;
  onCancel: () => void;
  isBancontact?: boolean;
}

const CardPaymentForm: React.FC<CardPaymentFormProps> = ({
  form,
  isLoading,
  onSubmit,
  onCancel,
  isBancontact = false
}) => {
  return (
    <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
      <h3 className="text-lg font-semibold mb-4 text-center">Détails de Paiement</h3>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="cardName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nom sur la carte</FormLabel>
                <FormControl>
                  <Input placeholder="John Doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="cardNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Numéro de carte</FormLabel>
                <FormControl>
                  <Input 
                    placeholder="1234 5678 9012 3456" 
                    maxLength={16}
                    {...field} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className={isBancontact ? "grid grid-cols-1" : "grid grid-cols-2 gap-4"}>
            <FormField
              control={form.control}
              name="expiry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date d'expiration</FormLabel>
                  <FormControl>
                    <Input placeholder="MM/YY" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {!isBancontact && (
              <FormField
                control={form.control}
                name="cvc"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>CVC</FormLabel>
                    <FormControl>
                      <Input placeholder="123" maxLength={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}
          </div>
          
          <div className="flex items-center text-sm text-gray-500 mb-4">
            <Lock className="h-4 w-4 mr-2" />
            <span>Vos informations de paiement sont sécurisées</span>
          </div>
          
          <div className="flex gap-3">
            <Button 
              variant="outline" 
              className="flex-1"
              type="button"
              onClick={onCancel}
            >
              Retour
            </Button>
            <Button 
              type="submit" 
              className="flex-1 bg-security-primary hover:bg-security-primary/90 text-white"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <LoadingSpinner />
                  Traitement...
                </>
              ) : (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Payer Maintenant
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default CardPaymentForm;
