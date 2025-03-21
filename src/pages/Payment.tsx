
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Shield, CheckCircle, CreditCard, Wallet } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import PaymentForm from '@/components/payment/PaymentForm';
import PlanOption from '@/components/payment/PlanOption';
import SuccessModal from '@/components/payment/SuccessModal';
import StripeCheckout from '@/components/payment/StripeCheckout';
import Footer from '@/components/Footer';
import { useToast } from '@/hooks/use-toast';
import PaymentMethodSelector from '@/components/payment/PaymentMethodSelector';

const Payment = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [email, setEmail] = useState('');
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
      console.log('Sending confirmation email...', new Date().toISOString());
    } catch (error) {
      console.error('Error in payment success handler:', error);
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
      console.error('Error changing plan:', error);
      toast({
        variant: "destructive",
        title: "Erreur",
        description: "Impossible de changer de plan. Veuillez réessayer.",
      });
    }
  };

  const handleEmailChange = (newEmail: string) => {
    setEmail(newEmail);
  };

  const handlePaymentMethodChange = (method: string) => {
    setPaymentMethod(method);
  };
  
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-security-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <main className="flex-grow container mx-auto py-8 px-4">
        <div className="mx-auto max-w-2xl mb-4">
          <Button 
            onClick={handlePaymentSuccess}
            variant="outline"
            className="w-full bg-amber-100 hover:bg-amber-200 border-amber-300 text-amber-800"
          >
            Simuler un paiement réussi
          </Button>
        </div>

        <section className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-6 text-security-primary">Protégez vos appareils dès aujourd'hui</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <PlanOption
              title="Mensuel"
              price="9,99€"
              period="/mois"
              isSelected={selectedPlan === 'monthly'}
              onSelect={() => handlePlanChange('monthly')}
            />
            
            <PlanOption
              title="Annuel"
              price="99,99€"
              period="/an"
              isSelected={selectedPlan === 'yearly'}
              onSelect={() => handlePlanChange('yearly')}
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
        
        <section className="max-w-2xl mx-auto mb-12">
          <div className="bg-green-50 shadow-md rounded-lg p-6 border border-gray-200">
            <h3 className="text-xl font-semibold mb-6 text-center">Options de paiement</h3>
            
            <div className="space-y-4">
              <div className="space-y-4 mb-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
                    Adresse e-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-security-primary"
                    placeholder="votre@email.com"
                    value={email}
                    onChange={(e) => handleEmailChange(e.target.value)}
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-medium mb-3">
                  Méthode de paiement
                </label>
                <PaymentMethodSelector 
                  value={paymentMethod} 
                  onChange={handlePaymentMethodChange} 
                />
              </div>
              
              {paymentMethod === 'stripe' && (
                <StripeCheckout 
                  planType={selectedPlan}
                  email={email}
                  onSuccess={handlePaymentSuccess}
                />
              )}
              
              {paymentMethod === 'mollie' && (
                <Button 
                  onClick={handlePaymentSuccess} 
                  className="w-full bg-[#0a84ff] hover:bg-[#0a84ff]/90 text-white"
                >
                  Payer avec Bancontact
                </Button>
              )}
              
              {paymentMethod === 'paypal' && (
                <Button 
                  onClick={handlePaymentSuccess} 
                  className="w-full bg-[#0070ba] hover:bg-[#005ea6] text-white"
                >
                  Payer avec PayPal
                </Button>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
      
      <SuccessModal isOpen={showSuccessModal} onClose={() => setShowSuccessModal(false)} />
    </div>
  );
};

export default Payment;
