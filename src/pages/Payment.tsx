
import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from '@/components/ui/use-toast';
import PlanOption from '@/components/payment/PlanOption';
import PaymentMethodSelector from '@/components/payment/PaymentMethodSelector';
import PaymentForm, { FormValues } from '@/components/payment/PaymentForm';
import SuccessModal from '@/components/payment/SuccessModal';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Shield, Check, AlertTriangle, Star, Lock, CreditCard, Clock, Gift, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
          {/* Hero Section */}
          <div className="text-center">
            <div className="inline-flex items-center justify-center p-2 bg-security-primary/10 rounded-full mb-4">
              <Shield className="h-6 w-6 text-security-primary" />
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">Protégez tous vos appareils</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Avec Guardia Security, bénéficiez d'une protection complète contre les cybermenaces et sécurisez votre vie numérique.
            </p>
            
            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-4 mt-6">
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center">
                <Star className="h-4 w-4 text-yellow-500 mr-1" />
                <span className="text-sm font-medium">Noté 4.9/5</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center">
                <Lock className="h-4 w-4 text-security-primary mr-1" />
                <span className="text-sm font-medium">Conforme RGPD</span>
              </div>
              <div className="bg-white px-4 py-2 rounded-lg shadow-sm flex items-center">
                <Clock className="h-4 w-4 text-security-primary mr-1" />
                <span className="text-sm font-medium">30 jours satisfait ou remboursé</span>
              </div>
            </div>
          </div>
          
          {/* Plan Selection */}
          <div>
            <h2 className="text-2xl font-semibold mb-4 text-center">Choisissez votre plan</h2>
            <p className="text-center text-gray-600 mb-6 max-w-2xl mx-auto">
              Tous nos plans incluent une protection complète et un support client prioritaire
            </p>
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
            
            {/* Special Offer */}
            {selectedPlan === 'annual' && (
              <div className="mt-6 bg-green-50 border border-green-200 rounded-lg p-4 flex items-center justify-center text-green-800">
                <Gift className="h-5 w-5 mr-2 text-green-600" />
                <span className="font-medium">Offre spéciale : </span>
                <span className="ml-1">Obtenez 2 mois gratuits avec l'abonnement annuel</span>
              </div>
            )}
          </div>
          
          {/* Benefits Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-center">Ce qui est inclus</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 p-2 bg-green-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <Shield className="h-5 w-5 text-green-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Protection en temps réel</h3>
                  <p className="text-gray-600">Analyse automatique des fichiers et programmes pour détecter les menaces avant qu'elles n'agissent.</p>
                  <ul className="mt-4 space-y-1.5">
                    <li className="flex items-start text-sm">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Protection anti-malware</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Surveillance continue</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Détection des ransomwares</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 p-2 bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <AlertTriangle className="h-5 w-5 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Détection avancée</h3>
                  <p className="text-gray-600">Intelligence artificielle et machine learning pour identifier les menaces les plus récentes.</p>
                  <ul className="mt-4 space-y-1.5">
                    <li className="flex items-start text-sm">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>IA de détection comportementale</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Mises à jour des signatures</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Protection zero-day</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="hover:shadow-md transition-shadow">
                <CardContent className="pt-6">
                  <div className="mb-4 p-2 bg-purple-100 rounded-full w-10 h-10 flex items-center justify-center">
                    <Check className="h-5 w-5 text-purple-600" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Support prioritaire</h3>
                  <p className="text-gray-600">Une équipe d'experts à votre disposition pour vous aider en cas de problème de sécurité.</p>
                  <ul className="mt-4 space-y-1.5">
                    <li className="flex items-start text-sm">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Support 24/7</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Assistance personnalisée</span>
                    </li>
                    <li className="flex items-start text-sm">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      <span>Temps de réponse garanti</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          
          {/* Payment Form Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-8 text-center">Terminez votre abonnement</h2>
            
            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-6">
                <h3 className="text-xl font-medium mb-4 flex items-center">
                  <User className="h-5 w-5 mr-2 text-security-primary" />
                  Vos informations
                </h3>
                <PaymentForm 
                  isProcessing={isProcessing} 
                  onSubmit={handleSubmit} 
                />
              </div>
              
              <div className="space-y-6">
                <h3 className="text-xl font-medium mb-4 flex items-center">
                  <CreditCard className="h-5 w-5 mr-2 text-security-primary" />
                  Mode de paiement
                </h3>
                
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
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      Protection des données (RGPD)
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      Paiements sécurisés (SSL/TLS)
                    </li>
                    <li className="flex items-start">
                      <Check className="h-4 w-4 mr-2 text-green-500 mt-0.5 flex-shrink-0" />
                      Satisfait ou remboursé pendant 30 jours
                    </li>
                  </ul>
                </div>
                
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
                        <span className="font-medium">19,98€</span>
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
          
          {/* FAQ Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-center">Questions fréquentes</h2>
            
            <Tabs defaultValue="general" className="w-full">
              <TabsList className="grid w-full grid-cols-3 mb-6">
                <TabsTrigger value="general">Général</TabsTrigger>
                <TabsTrigger value="billing">Facturation</TabsTrigger>
                <TabsTrigger value="support">Support</TabsTrigger>
              </TabsList>
              
              <TabsContent value="general" className="mt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-medium">Puis-je changer de plan plus tard ?</h4>
                    <p className="text-gray-600">Oui, vous pouvez passer du plan mensuel au plan annuel (ou inversement) à tout moment depuis votre espace client.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Sur combien d'appareils puis-je utiliser Guardia Security ?</h4>
                    <p className="text-gray-600">Nos plans incluent la protection pour 5 appareils différents (PC, Mac, smartphones, tablettes).</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="billing" className="mt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-medium">Comment fonctionne la garantie "satisfait ou remboursé" ?</h4>
                    <p className="text-gray-600">Si vous n'êtes pas satisfait, contactez notre support dans les 30 jours suivant votre achat pour obtenir un remboursement complet.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Quels modes de paiement acceptez-vous ?</h4>
                    <p className="text-gray-600">Nous acceptons les cartes de crédit (Visa, Mastercard), PayPal, et plusieurs méthodes de paiement locales via Mollie (Bancontact, iDEAL).</p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="support" className="mt-0">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <h4 className="font-medium">Comment accéder au support technique ?</h4>
                    <p className="text-gray-600">Nos abonnés bénéficient d'un accès prioritaire au support 24/7 via chat, email ou téléphone.</p>
                  </div>
                  
                  <div className="space-y-2">
                    <h4 className="font-medium">Que faire en cas de problème après l'installation ?</h4>
                    <p className="text-gray-600">Notre équipe de support technique est disponible 24/7 pour vous aider à résoudre tout problème rencontré. Un technicien peut même prendre le contrôle à distance si nécessaire.</p>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 text-center">
              <p className="text-gray-600">Vous avez d'autres questions ?</p>
              <Button variant="link" className="text-security-primary hover:text-security-secondary">
                Contactez notre équipe
              </Button>
            </div>
          </div>
          
          {/* Testimonials */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-100">
            <h2 className="text-2xl font-semibold mb-6 text-center">Ce que disent nos clients</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="border-gray-100">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">"Un excellent logiciel de sécurité qui m'a aidé à protéger mes données personnelles. L'interface est intuitive et la protection en temps réel fonctionne parfaitement."</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                    <div>
                      <p className="font-medium text-sm">Sophie Martineau</p>
                      <p className="text-gray-500 text-xs">Client depuis 2 ans</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-gray-100">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">"J'utilise Guardia Security pour mon entreprise et je suis impressionné par la qualité de la protection. Le support client est rapide et efficace."</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                    <div>
                      <p className="font-medium text-sm">Marc Dupont</p>
                      <p className="text-gray-500 text-xs">Propriétaire d'entreprise</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-gray-100">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-4">"Le rapport qualité-prix est excellent. J'ai pu protéger tous mes appareils familiaux avec un seul abonnement. Je recommande vivement."</p>
                  <div className="flex items-center">
                    <div className="w-8 h-8 bg-gray-200 rounded-full mr-2"></div>
                    <div>
                      <p className="font-medium text-sm">Thomas Leroux</p>
                      <p className="text-gray-500 text-xs">Client depuis 1 an</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
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
