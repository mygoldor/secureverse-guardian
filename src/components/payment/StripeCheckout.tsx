
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ExternalLink, CreditCard, Lock } from 'lucide-react';
import { 
  createPaymentSession, 
  updatePaymentStatus, 
  testCardPayment 
} from '@/utils/stripe';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { useLanguage } from '@/contexts/LanguageContext';
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

interface StripeCheckoutProps {
  planType: 'monthly' | 'yearly';
  email?: string;
  onSuccess?: () => void;
}

const paymentFormSchema = z.object({
  cardNumber: z.string().min(16, "Le numéro de carte doit comporter 16 chiffres"),
  cardName: z.string().min(3, "Veuillez entrer le nom sur la carte"),
  expiry: z.string().regex(/^(0[1-9]|1[0-2])\/([0-9]{2})$/, "Format MM/YY requis"),
  cvc: z.string().min(3, "Le CVC doit comporter 3 chiffres"),
});

const StripeCheckout: React.FC<StripeCheckoutProps> = ({ 
  planType, 
  email, 
  onSuccess 
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [testMode, setTestMode] = React.useState(false);
  const [testCardNumber, setTestCardNumber] = React.useState('4242424242424242');
  const [showCardForm, setShowCardForm] = React.useState(false);
  const { toast } = useToast();
  const { t } = useLanguage();

  const form = useForm<z.infer<typeof paymentFormSchema>>({
    resolver: zodResolver(paymentFormSchema),
    defaultValues: {
      cardNumber: '',
      cardName: '',
      expiry: '',
      cvc: '',
    },
  });

  const handlePayNow = async (values: z.infer<typeof paymentFormSchema>) => {
    try {
      setIsLoading(true);
      
      // Create options for payment session
      const options = {
        planType,
        successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
        cancelUrl: `${window.location.origin}/payment`,
        customerEmail: email || '',
        testMode
      };

      // Call our Supabase Edge Function to create a payment session
      const { clientSecret, paymentIntentId, paymentAttemptId } = await createPaymentSession(options);
      
      console.log('Payment session created:', { clientSecret, paymentIntentId, paymentAttemptId });
      
      // For real app, this would process the actual card details
      // For now, we'll simulate a successful payment
      const { status } = await updatePaymentStatus(paymentIntentId, paymentAttemptId);
      
      console.log('Payment status updated:', status);
      
      setIsLoading(false);
      toast({
        title: "Paiement Réussi",
        description: `Statut du paiement: ${status}`,
      });
      
      // Set success in session storage for demo purposes
      sessionStorage.setItem('paymentSuccessful', 'true');
      
      // Call the success callback
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Payment error:', error);
      setIsLoading(false);
      toast({
        variant: "destructive",
        title: "Erreur de paiement",
        description: "Une erreur s'est produite lors du traitement du paiement.",
      });
    }
  };

  const handleCheckout = async () => {
    if (testMode) {
      try {
        setIsLoading(true);
        
        // Create options for payment session
        const options = {
          planType,
          successUrl: `${window.location.origin}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl: `${window.location.origin}/payment`,
          customerEmail: email || '',
          testMode
        };

        // Call our Supabase Edge Function to create a payment session
        const { clientSecret, paymentIntentId, paymentAttemptId } = await createPaymentSession(options);
        
        console.log('Payment session created:', { clientSecret, paymentIntentId, paymentAttemptId });
        
        toast({
          title: "Mode Test Activé",
          description: "Traitement du paiement avec une carte de test...",
        });
        
        // Process test card payment
        const result = await testCardPayment(paymentIntentId, paymentAttemptId, testCardNumber);
        
        setIsLoading(false);
        
        if (result.success) {
          toast({
            title: "Paiement Réussi",
            description: result.message,
          });
          
          // Set success in session storage for demo purposes
          sessionStorage.setItem('paymentSuccessful', 'true');
          
          // Call the success callback
          if (onSuccess) {
            onSuccess();
          }
        } else {
          toast({
            variant: "destructive",
            title: "Échec du Paiement",
            description: result.message,
          });
        }
      } catch (error) {
        console.error('Checkout error:', error);
        setIsLoading(false);
        toast({
          variant: "destructive",
          title: "Erreur de paiement",
          description: "Une erreur s'est produite lors de la création du paiement.",
        });
      }
    } else {
      // Show the card input form
      setShowCardForm(true);
    }
  };

  return (
    <div className="space-y-4">
      <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
        <div className="flex items-center space-x-2 mb-4">
          <Checkbox 
            id="test-mode" 
            checked={testMode} 
            onCheckedChange={(checked) => setTestMode(checked === true)}
          />
          <Label htmlFor="test-mode" className="font-medium">
            Mode Test (Utiliser des cartes de test Stripe)
          </Label>
        </div>
        
        {testMode && (
          <div className="space-y-3">
            <div className="space-y-1">
              <Label htmlFor="card-number">Numéro de Carte Test</Label>
              <Input
                id="card-number"
                value={testCardNumber}
                onChange={(e) => setTestCardNumber(e.target.value)}
                placeholder="4242424242424242"
                className="font-mono"
              />
            </div>
            <div className="text-xs text-slate-500 space-y-1">
              <p>Cartes de Test:</p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Succès: 4242424242424242</li>
                <li>Refusée: 4000000000000002</li>
                <li>Refus générique: 4000000000000101</li>
              </ul>
            </div>
          </div>
        )}
      </div>
      
      {!showCardForm ? (
        <Button 
          onClick={handleCheckout} 
          className="w-full bg-security-primary hover:bg-security-primary/90 text-white"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Traitement du paiement...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4 mr-2" />
              {testMode ? 'Tester le Paiement' : 'Contenu'}
            </>
          )}
        </Button>
      ) : (
        <div className="bg-white p-5 rounded-lg border border-gray-200 shadow-sm">
          <h3 className="text-lg font-semibold mb-4 text-center">Détails de Paiement</h3>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handlePayNow)} className="space-y-4">
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
              
              <div className="grid grid-cols-2 gap-4">
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
                  onClick={() => setShowCardForm(false)}
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
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
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
      )}
    </div>
  );
};

export default StripeCheckout;
