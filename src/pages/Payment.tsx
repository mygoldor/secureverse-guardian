
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/use-toast';
import PlanOption from '@/components/payment/PlanOption';
import PaymentMethodSelector from '@/components/payment/PaymentMethodSelector';
import PaymentForm, { FormValues } from '@/components/payment/PaymentForm';
import SuccessModal from '@/components/payment/SuccessModal';

type PaymentMethod = 'card' | 'paypal' | 'mollie';

const Payment = () => {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'annual'>('monthly');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
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
    }, 2000);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Protégez vos appareils dès aujourd'hui</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Avec Guardia Security, bénéficiez d'une protection complète contre les menaces en ligne et sécurisez tous vos appareils.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
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
          
          <div className="security-card p-6 mb-10">
            <h2 className="text-xl font-bold mb-6">Vos informations</h2>
            
            <div className="grid md:grid-cols-2 gap-8">
              <PaymentForm 
                isProcessing={isProcessing} 
                onSubmit={handleSubmit} 
              />
              
              <div className="space-y-6">
                <PaymentMethodSelector 
                  selectedMethod={paymentMethod} 
                  onChange={setPaymentMethod} 
                />
                
                <div className="bg-gray-50 p-4 rounded-lg border border-gray-100">
                  <h3 className="text-sm font-medium mb-2">Protection des données (RGPD)</h3>
                  <p className="text-xs text-gray-600">
                    Vos données personnelles sont protégées conformément au Règlement Général sur la Protection des Données.
                    Consultez notre politique de confidentialité pour en savoir plus.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
      
      <SuccessModal
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
      />
    </div>
  );
};

export default Payment;
