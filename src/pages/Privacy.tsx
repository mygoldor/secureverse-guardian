
import React, { useState } from 'react';
import Header from '@/components/Header';
import { UserCheck, Eye, Fingerprint, Trash2 } from 'lucide-react';
import ProtectionCard from '@/components/ProtectionCard';
import { Separator } from '@/components/ui/separator';

const Privacy = () => {
  const [privacySettings, setPrivacySettings] = useState({
    trackingPrevention: true,
    cookiesManagement: true,
    passwordProtection: false,
    dataCleanup: true,
  });

  const handleTogglePrivacy = (key: keyof typeof privacySettings) => {
    setPrivacySettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-security-foreground">Confidentialité</h1>
          <p className="text-security-muted mt-2">Gérez la manière dont vos données sont collectées et utilisées conformément à la réglementation RGPD.</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6 mb-10">
          <ProtectionCard
            title="Protection contre le suivi"
            description="Bloque les trackers tiers qui collectent vos données de navigation entre les sites."
            icon={Eye}
            enabled={privacySettings.trackingPrevention}
            onToggle={() => handleTogglePrivacy('trackingPrevention')}
            color="text-security-primary"
          />
          
          <ProtectionCard
            title="Gestion des cookies"
            description="Contrôle quels sites web peuvent stocker des cookies sur votre appareil et pour combien de temps."
            icon={Fingerprint}
            enabled={privacySettings.cookiesManagement}
            onToggle={() => handleTogglePrivacy('cookiesManagement')}
            color="text-security-danger"
          />
          
          <ProtectionCard
            title="Protection des mots de passe"
            description="Surveille les mots de passe enregistrés et vous alerte s'ils sont trouvés dans des violations de données."
            icon={UserCheck}
            enabled={privacySettings.passwordProtection}
            onToggle={() => handleTogglePrivacy('passwordProtection')}
            color="text-security-warning"
          />
          
          <ProtectionCard
            title="Nettoyage des données"
            description="Supprime automatiquement l'historique de navigation et les fichiers temporaires pour protéger votre vie privée."
            icon={Trash2}
            enabled={privacySettings.dataCleanup}
            onToggle={() => handleTogglePrivacy('dataCleanup')}
            color="text-security-success"
          />
        </div>
        
        <div className="mt-10 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-2xl font-semibold mb-6 text-center">Politique de Confidentialité</h2>
          <p className="text-sm text-right mb-4 text-security-muted">Dernière mise à jour : 1 juin 2023</p>
          
          <div className="prose prose-sm max-w-none">
            <p className="text-security-muted mb-6">
              Bienvenue chez <strong>Guardia</strong>. Nous accordons une grande importance à la protection de vos données personnelles 
              et nous nous engageons à respecter la <strong>Réglementation Générale sur la Protection des Données (RGPD)</strong>. 
              Cette politique de confidentialité vous explique comment nous collectons, utilisons et protégeons vos informations.
            </p>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">1. Qui sommes-nous ?</h3>
            <p className="mb-4">
              Guardia est une solution de cybersécurité conçue pour protéger les particuliers et les entreprises contre les menaces en ligne. 
              Nous sommes responsables du traitement des données personnelles que nous collectons.
            </p>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <h4 className="font-medium mb-2">Coordonnées du responsable du traitement :</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Nom de l'entreprise</strong> : Guardia Cybersecurity SRL</li>
                <li><strong>Adresse</strong> : 123 Rue de la Sécurité, 1000 Bruxelles, Belgique</li>
                <li><strong>E-mail de contact</strong> : privacy@guardia-security.com</li>
              </ul>
            </div>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">2. Quelles données collectons-nous ?</h3>
            <p className="mb-3">
              Nous collectons uniquement les données nécessaires pour fournir nos services et assurer la sécurité de votre compte.
            </p>
            
            <h4 className="font-medium mt-4 mb-2">Données collectées automatiquement :</h4>
            <ul className="list-disc pl-5 mb-4">
              <li>Adresse IP</li>
              <li>Informations sur l'appareil et le navigateur</li>
              <li>Données de journal (logs de connexion et d'activité)</li>
            </ul>
            
            <h4 className="font-medium mt-4 mb-2">Données fournies par l'utilisateur :</h4>
            <ul className="list-disc pl-5 mb-4">
              <li>Nom et prénom</li>
              <li>Adresse e-mail (unique pour chaque compte)</li>
              <li>Informations de paiement (via Stripe, Mollie ou PayPal – nous ne stockons pas vos données bancaires)</li>
              <li>Préférences et paramètres de compte</li>
            </ul>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">3. Pourquoi collectons-nous vos données ?</h3>
            <p className="mb-3">Nous utilisons vos données uniquement pour :</p>
            <ul className="mb-4">
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span>Gérer et sécuriser votre compte</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span>Fournir nos services et assurer leur bon fonctionnement</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span>Améliorer l'expérience utilisateur et nos fonctionnalités</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span>Vous envoyer des notifications et rapports de sécurité</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span>Respecter nos obligations légales et prévenir la fraude</span>
              </li>
            </ul>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">4. Base légale du traitement</h3>
            <p className="mb-3">Nous collectons et traitons vos données uniquement lorsque :</p>
            <ul className="list-disc pl-5 mb-4">
              <li><strong>Vous avez donné votre consentement</strong> (ex. inscription à la newsletter)</li>
              <li><strong>Le traitement est nécessaire pour exécuter notre contrat</strong> (ex. fournir un abonnement actif)</li>
              <li><strong>Nous avons une obligation légale</strong> (ex. obligations fiscales et de lutte contre la fraude)</li>
              <li><strong>Nous avons un intérêt légitime</strong> (ex. améliorer la sécurité de notre service)</li>
            </ul>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">5. Avec qui partageons-nous vos données ?</h3>
            <p className="mb-3 font-medium">Vos données ne sont <strong>jamais revendues</strong>. Nous les partageons uniquement avec :</p>
            <ul className="list-disc pl-5 mb-4">
              <li><strong>Fournisseurs de paiement</strong> : Stripe, Mollie, PayPal (pour traiter les paiements sécurisés)</li>
              <li><strong>Hébergeur et infrastructure</strong> : Combell (pour stocker les données en toute sécurité)</li>
              <li><strong>Services analytiques</strong> : (optionnel) Google Analytics, Matomo (anonymisation des IP activée)</li>
            </ul>
            <p className="mb-4">Nous exigeons que ces partenaires respectent les lois en vigueur et protègent vos données.</p>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">6. Combien de temps conservons-nous vos données ?</h3>
            <p className="mb-3">Nous ne conservons vos données que <strong>le temps nécessaire</strong> pour fournir nos services :</p>
            <ul className="list-disc pl-5 mb-4">
              <li><strong>Données de compte</strong> : supprimées <strong>6 mois après la résiliation</strong></li>
              <li><strong>Données de paiement</strong> : conservées <strong>conformément aux obligations légales</strong></li>
              <li><strong>Logs de connexion</strong> : supprimés après <strong>12 mois</strong></li>
            </ul>
            <p className="mb-4">Vous pouvez demander <strong>la suppression de vos données</strong> à tout moment (voir section 7).</p>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">7. Quels sont vos droits ?</h3>
            <p className="mb-3">Conformément au RGPD, vous disposez des droits suivants :</p>
            <ul className="mb-4">
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span><strong>Accès</strong> : savoir quelles données nous détenons sur vous</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span><strong>Rectification</strong> : corriger vos informations personnelles</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span><strong>Suppression</strong> : demander la suppression de vos données (droit à l'oubli)</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span><strong>Opposition</strong> : refuser certains traitements</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span><strong>Portabilité</strong> : récupérer vos données dans un format lisible</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span><strong>Limitation du traitement</strong> : demander un gel temporaire de l'utilisation de vos données</span>
              </li>
            </ul>
            
            <h4 className="font-medium mt-4 mb-2">Comment exercer vos droits ?</h4>
            <p className="mb-4">
              Vous pouvez nous contacter à tout moment par e-mail : <strong>privacy@guardia-security.com</strong><br />
              Nous traiterons votre demande sous <strong>30 jours maximum</strong>.
            </p>
            <p className="mb-4">
              Si vous estimez que nous ne respectons pas vos droits, vous pouvez déposer une réclamation auprès de 
              l'<strong>Autorité de Protection des Données</strong> (https://www.gegevensbeschermingsautoriteit.be).
            </p>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">8. Sécurité de vos données</h3>
            <p className="mb-3">Nous mettons en place des <strong>mesures de sécurité strictes</strong> pour protéger vos informations :</p>
            <ul className="mb-4">
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span>Chiffrement des données sensibles</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span>Protection contre les attaques (pare-feu, surveillance 24/7)</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span>Accès restreint aux données aux seules personnes autorisées</span>
              </li>
              <li className="flex items-start mb-2">
                <span className="text-security-success font-bold mr-2">✓</span>
                <span>Audit de sécurité régulier</span>
              </li>
            </ul>
            <p className="mb-4">
              Malgré ces mesures, <strong>aucun système n'est infaillible</strong>. En cas de violation de données, 
              nous vous informerons dans les plus brefs délais.
            </p>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">9. Cookies et suivi</h3>
            <p className="mb-3">Guardia utilise des cookies uniquement pour :</p>
            <ul className="list-disc pl-5 mb-4">
              <li>Assurer le bon fonctionnement du site (cookies essentiels)</li>
              <li>Mémoriser vos préférences (cookies fonctionnels)</li>
              <li>Améliorer les performances et la sécurité (cookies analytiques anonymisés)</li>
            </ul>
            <p className="mb-4">
              <strong>Vous pouvez refuser les cookies</strong> via les paramètres de votre navigateur ou notre bannière de gestion des cookies.
            </p>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">10. Modifications de cette politique</h3>
            <p className="mb-4">
              Nous pouvons mettre à jour cette politique en cas d'évolution légale ou technique. La <strong>date de mise à jour</strong> 
              est indiquée en haut de cette page. Nous vous informerons en cas de modifications importantes.
            </p>
            
            <Separator className="my-6" />
            
            <h3 className="text-xl font-semibold mb-3">11. Contact</h3>
            <p className="mb-3">Si vous avez des questions, vous pouvez nous contacter à :</p>
            <p className="mb-4">
              📩 <strong>E-mail</strong> : privacy@guardia-security.com<br />
              📍 <strong>Adresse postale</strong> : 123 Rue de la Sécurité, 1000 Bruxelles, Belgique
            </p>
            
            <p className="mt-8 text-center font-medium">
              Cette politique respecte pleinement le <strong>RGPD</strong> et assure la <strong>transparence</strong> quant à l'utilisation de vos données.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Privacy;
