
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/use-toast';
import PlanOption from '@/components/payment/PlanOption';
import PaymentMethodSelector from '@/components/payment/PaymentMethodSelector';
import PaymentForm, { FormValues } from '@/components/payment/PaymentForm';
import SuccessModal from '@/components/payment/SuccessModal';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

type PaymentMethod = 'stripe' | 'paypal' | 'mollie';

const Payment = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const handleSubmit = (values: FormValues) => {
    // Check if email is already in use (this would be an API call in a real app)
    if (values.email === 'test@example.com') {
      toast({
        variant: "destructive",
        title: "Email déjà utilisé",
        description: "Cet email est déjà associé à un compte. Veuillez vous connecter ou utiliser une autre adresse."
      });
      return;
    }
    
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      setShowSuccessModal(true);
      
      // Show success toast
      toast({
        title: "Enregistrement réussi!",
        description: "Votre compte a été créé et votre abonnement est actif.",
        variant: "default",
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-10 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* 2. Présentation de l'abonnement */}
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Protégez vos appareils dès aujourd'hui</h1>
            
            {/* Plan Selection */}
            <div className="mt-8">
              <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
                <PlanOption 
                  type="monthly" 
                  selected={selectedPlan === 'monthly'} 
                  onSelect={() => setSelectedPlan('monthly')} 
                />
                
                <PlanOption 
                  type="annual" 
                  selected={selectedPlan === 'annual'} 
                  onSelect={() => setSelectedPlan('annual')} 
                />
              </div>
            </div>
          </div>
          
          {/* 3. Formulaire de paiement et création de compte */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-8 text-center">Terminez votre abonnement</h2>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h3 className="text-xl font-medium mb-4">Créez votre compte</h3>
                <PaymentForm 
                  isProcessing={isProcessing} 
                  onSubmit={handleSubmit} 
                />
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-medium mb-4">Mode de paiement</h3>
                
                <PaymentMethodSelector 
                  selectedMethod={paymentMethod} 
                  onChange={setPaymentMethod} 
                />
                
                {/* Order Summary */}
                <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="font-medium mb-3 text-gray-900">Récapitulatif de commande</h4>
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Plan</span>
                      <span className="font-medium">{selectedPlan === 'monthly' ? 'Mensuel' : 'Annuel'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Prix</span>
                      <span className="font-medium">{selectedPlan === 'monthly' ? '9,99€/mois' : '99,99€/an'}</span>
                    </div>
                    {selectedPlan === 'annual' && (
                      <div className="flex justify-between text-green-600">
                        <span>Économie</span>
                        <span className="font-medium">2 mois offerts</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t border-gray-200 pt-2 mt-2">
                    <div className="flex justify-between font-medium">
                      <span>Total à payer</span>
                      <span className="text-security-primary">{selectedPlan === 'monthly' ? '9,99€' : '99,99€'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      {/* 4. Confirmation */}
      <SuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
      />
    </div>
  );
};

export default Payment;
