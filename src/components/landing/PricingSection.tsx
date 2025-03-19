
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const PlanFeature = ({ children }: { children: React.ReactNode }) => (
  <li className="flex items-start">
    <svg className="w-5 h-5 text-[#00CC66] mr-2 mt-1 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
    </svg>
    <div className="text-gray-700">
      {children}
    </div>
  </li>
);

const PricingSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="pricing" className="py-16 md:py-24 px-4 bg-[#F9F9F9]">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-[#003366] text-center mb-4">Nos Tarifs</h2>
        <p className="text-lg text-center text-gray-600 mb-12 max-w-3xl mx-auto">
          Choisissez le plan qui correspond le mieux à vos besoins. Tous nos plans incluent nos fonctionnalités de sécurité essentielles pour vous protéger en ligne.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Monthly Plan */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#0099FF]">
            <h3 className="text-2xl font-bold text-[#003366] mb-2">Plan mensuel</h3>
            <p className="text-gray-600 mb-4">Parfait pour les utilisateurs qui préfèrent une flexibilité mensuelle sans engagement à long terme.</p>
            <div className="mb-4">
              <span className="text-4xl font-bold text-[#003366]">9,99 €</span>
              <span className="text-gray-500">/mois</span>
            </div>
            <p className="text-gray-600 mb-6">Fonctionnalités complètes, mises à jour régulières et support 24/7.</p>
            <ul className="space-y-3 mb-8">
              <PlanFeature>
                <strong className="text-[#003366] font-semibold">Protection complète contre les virus et malwares</strong>
                <p>Détection et suppression automatique de tous types de logiciels malveillants, y compris les ransomwares, spywares et adwares qui pourraient compromettre vos données</p>
              </PlanFeature>
              <PlanFeature>
                <strong className="text-[#003366] font-semibold">Mises à jour automatiques de sécurité</strong>
                <p>Actualisations régulières pour contrer les nouvelles menaces et vulnérabilités, garantissant une protection constante contre les dernières techniques d'attaque</p>
              </PlanFeature>
              <PlanFeature>
                <strong className="text-[#003366] font-semibold">Support client disponible 24/7</strong>
                <p>Assistance technique par chat, email et téléphone à tout moment, avec un temps de réponse moyen de moins de 4 heures pour toute question ou problème rencontré</p>
              </PlanFeature>
              <PlanFeature>
                <strong className="text-[#003366] font-semibold">Protection pour 3 appareils maximum</strong>
                <p>Couvre ordinateurs, tablettes et smartphones avec synchronisation des paramètres et protection en temps réel sur tous vos appareils personnels</p>
              </PlanFeature>
            </ul>
            <Link to="/signup">
              <Button className="w-full bg-[#0099FF] hover:bg-[#007ACC] text-white">
                Choisir ce plan
              </Button>
            </Link>
          </div>
          
          {/* Annual Plan */}
          <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow border-t-4 border-[#00CC66] relative">
            <div className="absolute top-0 right-0 bg-[#00CC66] text-white text-xs font-bold px-3 py-1 rounded-br-lg rounded-tl-lg">ÉCONOMISEZ 2 MOIS</div>
            <h3 className="text-2xl font-bold text-[#003366] mb-2">Plan annuel</h3>
            <p className="text-gray-600 mb-4">Notre offre la plus populaire avec une réduction importante pour un engagement annuel.</p>
            <div className="mb-4">
              <span className="text-4xl font-bold text-[#003366]">99,99 €</span>
              <span className="text-gray-500">/an</span>
            </div>
            <p className="text-gray-600 mb-6">Protection premium avec des avantages exclusifs pour nos abonnés annuels.</p>
            <ul className="space-y-3 mb-8">
              <PlanFeature>
                <strong className="text-[#003366] font-semibold">Protection complète contre tous types de menaces</strong>
                <p>Sécurité avancée contre virus, malwares, ransomwares et attaques zero-day avec analyse heuristique et détection comportementale pour identifier même les menaces inconnues</p>
              </PlanFeature>
              <PlanFeature>
                <strong className="text-[#003366] font-semibold">Mises à jour automatiques prioritaires</strong>
                <p>Recevez les dernières protections en premier et sans interruption, avec accès prioritaire aux nouvelles fonctionnalités et améliorations de sécurité avant leur déploiement général</p>
              </PlanFeature>
              <PlanFeature>
                <strong className="text-[#003366] font-semibold">Support prioritaire avec assistance dédiée</strong>
                <p>Accès VIP avec temps de réponse garanti sous 1 heure et conseiller personnel assigné pour résoudre rapidement tous vos problèmes de sécurité</p>
              </PlanFeature>
              <PlanFeature>
                <strong className="text-[#003366] font-semibold">Protection pour 5 appareils maximum</strong>
                <p>Protégez toute votre famille sur ordinateurs, tablettes et smartphones avec des paramètres personnalisés pour chaque utilisateur et un tableau de bord centralisé pour gérer la sécurité de tous vos appareils</p>
              </PlanFeature>
              <PlanFeature>
                <strong className="text-[#003366] font-semibold">Économisez l'équivalent de 2 mois d'abonnement</strong>
                <p>Rapport qualité-prix optimal avec tous les avantages premium et une réduction de 16,6% par rapport au plan mensuel, soit une économie annuelle de 19,98€</p>
              </PlanFeature>
            </ul>
            <Link to="/signup">
              <Button className="w-full bg-[#00CC66] hover:bg-[#00AA55] text-white">
                Choisir ce plan
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
