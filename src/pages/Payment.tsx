
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import PaymentForm from '@/components/payment/PaymentForm';
import PlanOption from '@/components/payment/PlanOption';
import SuccessModal from '@/components/payment/SuccessModal';
import Footer from '@/components/Footer';

const Payment = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  const handlePaymentSuccess = () => {
    setShowSuccessModal(true);
    // Simulate email sending
    console.log('Sending confirmation email...');
    
    // Close modal and redirect after 5 seconds
    setTimeout(() => {
      setShowSuccessModal(false);
      navigate('/dashboard');
    }, 5000);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      {/* En-tête */}
      <header className="bg-security-primary text-white p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src="/icons/guardia-icon-192.png" alt="Guardia" className="h-10 w-10 mr-2" />
            <h1 className="text-xl font-bold">Guardia</h1>
          </div>
          <Button 
            variant="ghost" 
            className="text-white flex items-center" 
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Retour au tableau de bord
          </Button>
        </div>
      </header>
      
      <main className="flex-grow container mx-auto py-8 px-4">
        {/* Présentation de l'abonnement */}
        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-6 text-security-primary">Protégez vos appareils dès aujourd'hui</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <PlanOption
              title="Mensuel"
              price="9,99€"
              period="/mois"
              isSelected={selectedPlan === 'monthly'}
              onSelect={() => setSelectedPlan('monthly')}
            />
            
            <PlanOption
              title="Annuel"
              price="99,99€"
              period="/an"
              isSelected={selectedPlan === 'yearly'}
              onSelect={() => setSelectedPlan('yearly')}
              discount="2 mois offerts"
            />
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg mb-8 max-w-2xl mx-auto">
            <h3 className="font-semibold text-xl mb-4">Avantages inclus</h3>
            <ul className="space-y-3 text-left">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Sécurité 24/7 avec surveillance en temps réel</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Pentest et correction automatique des failles</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Sauvegarde et récupération des fichiers en cas d'attaque</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                <span>Support client prioritaire</span>
              </li>
            </ul>
          </div>
        </section>
        
        {/* Formulaire de paiement */}
        <section className="max-w-2xl mx-auto mb-12">
          <div className="bg-green-50 shadow-md rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-6 text-center">Formulaire de paiement et création de compte</h3>
            <PaymentForm 
              selectedPlan={selectedPlan} 
              onPlanChange={setSelectedPlan}
              onPaymentSuccess={handlePaymentSuccess}
            />
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <Footer />
      
      {/* Modal de confirmation */}
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </div>
  );
};

export default Payment;
