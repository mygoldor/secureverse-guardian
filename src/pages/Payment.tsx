
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import Footer from '@/components/Footer';
import SuccessModal from '@/components/payment/SuccessModal';
import PlanSection from '@/components/payment/PlanSection';
import BenefitsSection from '@/components/payment/BenefitsSection';
import PaymentMethodsSection from '@/components/payment/PaymentMethodsSection';
import PaymentLoader from '@/components/payment/PaymentLoader';

const Payment = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  
  useEffect(() => {
    sessionStorage.removeItem('installationChoiceMade');
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);
  
  const handlePaymentSuccess = () => {
    try {
      sessionStorage.setItem('paymentSuccessful', 'true');
      sessionStorage.removeItem('installationChoiceMade');
      setShowSuccessModal(true);
      console.log('Paiement simulé', new Date().toISOString());
    } catch (error) {
      console.error('Erreur de paiement:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Un problème est survenu lors de la finalisation de votre abonnement.",
      });
    }
  };
  
  const handlePlanChange = (plan: 'monthly' | 'yearly') => {
    try {
      setSelectedPlan(plan);
    } catch (error) {
      console.error('Erreur de changement de plan:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de changer de plan. Veuillez réessayer.",
      });
    }
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };
  
  if (isLoading) {
    return <PaymentLoader />;
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <main className="flex-grow container mx-auto py-8 px-4">
        <PlanSection 
          selectedPlan={selectedPlan} 
          onPlanChange={handlePlanChange} 
        />
        
        <BenefitsSection />
        
        <PaymentMethodsSection 
          paymentMethod={paymentMethod}
          selectedPlan={selectedPlan}
          onPaymentMethodChange={handlePaymentMethodChange}
          onPaymentSuccess={handlePaymentSuccess}
        />
      </main>
      
      <Footer />
      
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </div>
  );
};

export default Payment;
