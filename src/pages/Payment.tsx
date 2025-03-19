
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/use-toast';
import PlanOption from '@/components/payment/PlanOption';
import PaymentMethodSelector from '@/components/payment/PaymentMethodSelector';
import PaymentForm, { FormValues } from '@/components/payment/PaymentForm';
import SuccessModal from '@/components/payment/SuccessModal';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Check, AlertTriangle } from 'lucide-react';

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
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-grow py-10 px-4">
        <div className="max-w-6xl mx-auto space-y-12">
          {/* Hero Section */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-2 bg-security-primary/10 rounded-full mb-4">
              <Shield className="h-6 w-6 text-security-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Protégez tous vos appareils</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Avec Guardia Security, bénéficiez d'une protection complète contre les cybermenaces et sécurisez votre vie numérique.
            </p>
          </div>
          
          {/* Plan Selection */}
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-center">Choisissez votre plan</h2>
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
          
          {/* Benefits Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-center">Ce qui est inclus</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 p-2 bg-green-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Protection en temps réel</h3>
                  <p className="text-gray-600">Analyse automatique des fichiers et programmes pour détecter les menaces avant qu'elles n'agissent.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 p-2 bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Détection avancée</h3>
                  <p className="text-gray-600">Intelligence artificielle et machine learning pour identifier les menaces les plus récentes.</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="mb-4 p-2 bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Support prioritaire</h3>
                  <p className="text-gray-600">Une équipe d'experts à votre disposition pour vous aider en cas de problème de sécurité.</p>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Payment Form Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-8 text-center">Terminez votre abonnement</h2>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h3 className="text-xl font-medium mb-4">Vos informations</h3>
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
                
                <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <h4 className="font-medium mb-3 flex items-center text-gray-900">
                    <Shield className="h-4 w-4 mr-2 text-security-primary" />
                    Achat 100% sécurisé
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      Protection des données (RGPD)
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      Paiements sécurisés (SSL/TLS)
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5" />
                      Satisfait ou remboursé pendant 30 jours
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          {/* FAQ Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-center">Questions fréquentes</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Puis-je changer de plan plus tard ?</h4>
                <p className="text-gray-600">Oui, vous pouvez passer du plan mensuel au plan annuel (ou inversement) à tout moment depuis votre espace client.</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Sur combien d'appareils puis-je utiliser Guardia Security ?</h4>
                <p className="text-gray-600">Nos plans incluent la protection pour 5 appareils différents (PC, Mac, smartphones, tablettes).</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Comment fonctionne la garantie "satisfait ou remboursé" ?</h4>
                <p className="text-gray-600">Si vous n'êtes pas satisfait, contactez notre support dans les 30 jours suivant votre achat pour obtenir un remboursement complet.</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Comment accéder au support technique ?</h4>
                <p className="text-gray-600">Nos abonnés bénéficient d'un accès prioritaire au support 24/7 via chat, email ou téléphone.</p>
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
