import React from 'react';
import { Separator } from '@/components/ui/separator';

const CookiesPolicyContent: React.FC = () => {
  const today = new Date();
  const formattedDate = `${today.getDate()} ${today.toLocaleString('fr-FR', { month: 'long' })} ${today.getFullYear()}`;
  
  return (
    <div className="prose prose-sm max-w-none text-gray-800">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">Politique des Cookies pour Guardia</h2>
      <p className="text-sm text-right mb-4 text-gray-500">Dernière mise à jour : {formattedDate}</p>
      
      <Separator className="my-6" />
      
      <h3 className="text-xl font-semibold text-gray-900">1. Introduction</h3>
      <p className="mb-4">
        Bienvenue sur le site web de Guardia. Cette politique des cookies explique comment nous utilisons les cookies et technologies similaires pour améliorer votre expérience utilisateur, analyser le trafic et personnaliser les contenus. En utilisant notre site, vous consentez à l'utilisation de cookies conformément à cette politique.
      </p>
      
      <Separator className="my-6" />
      
      <h3 className="text-xl font-semibold text-gray-900">2. Que sont les Cookies ?</h3>
      <p className="mb-4">
        Les cookies sont de petits fichiers texte stockés sur votre appareil (ordinateur, smartphone, tablette) lorsque vous visitez un site web. Ils permettent au site de reconnaître votre appareil et de mémoriser des informations pour améliorer votre navigation.
      </p>
      
      <Separator className="my-6" />
      
      <h3 className="text-xl font-semibold text-gray-900">3. Types de Cookies Utilisés</h3>
      
      <h4 className="text-lg font-medium text-gray-900 mt-4">A. Cookies Essentiels</h4>
      <ul className="list-disc pl-5 mb-4">
        <li><strong>Objectif</strong> : Assurer le bon fonctionnement du site (ex : connexion sécurisée, panier d'achat).</li>
        <li><strong>Exemples</strong> :
          <ul className="list-disc pl-5 mt-1">
            <li>Authentification des utilisateurs.</li>
            <li>Mémorisation des préférences de langue.</li>
          </ul>
        </li>
        <li><strong>Durée</strong> : Session ou persistant (selon le besoin).</li>
      </ul>
      
      <h4 className="text-lg font-medium text-gray-900 mt-4">B. Cookies de Performance</h4>
      <ul className="list-disc pl-5 mb-4">
        <li><strong>Objectif</strong> : Analyser l'utilisation du site et améliorer ses performances.</li>
        <li><strong>Exemples</strong> :
          <ul className="list-disc pl-5 mt-1">
            <li>Mesure du temps de chargement des pages.</li>
            <li>Identification des pages les plus visitées.</li>
          </ul>
        </li>
        <li><strong>Durée</strong> : Jusqu'à 12 mois.</li>
      </ul>
      
      <h4 className="text-lg font-medium text-gray-900 mt-4">C. Cookies de Fonctionnalité</h4>
      <ul className="list-disc pl-5 mb-4">
        <li><strong>Objectif</strong> : Personnaliser votre expérience utilisateur.</li>
        <li><strong>Exemples</strong> :
          <ul className="list-disc pl-5 mt-1">
            <li>Mémorisation des préférences (ex : thème sombre/clair).</li>
            <li>Affichage de contenus adaptés à vos intérêts.</li>
          </ul>
        </li>
        <li><strong>Durée</strong> : Jusqu'à 12 mois.</li>
      </ul>
      
      <h4 className="text-lg font-medium text-gray-900 mt-4">D. Cookies Publicitaires</h4>
      <ul className="list-disc pl-5 mb-4">
        <li><strong>Objectif</strong> : Afficher des publicités ciblées et mesurer leur efficacité.</li>
        <li><strong>Exemples</strong> :
          <ul className="list-disc pl-5 mt-1">
            <li>Suivi des campagnes publicitaires.</li>
            <li>Affichage d'annonces personnalisées.</li>
          </ul>
        </li>
        <li><strong>Durée</strong> : Jusqu'à 12 mois.</li>
      </ul>
      
      <Separator className="my-6" />
      
      <h3 className="text-xl font-semibold text-gray-900">4. Contrôle des Cookies</h3>
      <p className="mb-4">
        Vous pouvez gérer ou désactiver les cookies à tout moment via les paramètres de votre navigateur. Voici comment :
      </p>
      
      <h4 className="text-lg font-medium text-gray-900 mt-4">A. Accepter ou Refuser les Cookies</h4>
      <ul className="list-disc pl-5 mb-4">
        <li>Lors de votre première visite, un bandeau de consentement vous permet de choisir les catégories de cookies à activer.</li>
      </ul>
      
      <h4 className="text-lg font-medium text-gray-900 mt-4">B. Désactiver les Cookies</h4>
      <ul className="list-disc pl-5 mb-4">
        <li><strong>Via votre navigateur</strong> :
          <ul className="list-disc pl-5 mt-1">
            <li>Chrome : Paramètres &gt; Confidentialité et sécurité &gt; Cookies et autres données.</li>
            <li>Firefox : Options &gt; Vie privée et sécurité &gt; Cookies et données de site.</li>
            <li>Safari : Préférences &gt; Confidentialité &gt; Gestion des cookies.</li>
          </ul>
        </li>
        <li><strong>Conséquences</strong> : Certaines fonctionnalités du site peuvent ne plus fonctionner correctement.</li>
      </ul>
      
      <Separator className="my-6" />
      
      <h3 className="text-xl font-semibold text-gray-900">5. Partage des Données</h3>
      <p className="mb-4">
        Les données collectées via les cookies peuvent être partagées avec :
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li><strong>Prestataires de services</strong> : Pour l'analyse du trafic et la publicité.</li>
        <li><strong>Partenaires tiers</strong> : Uniquement avec votre consentement.</li>
      </ul>
      <p className="mb-4">
        Nous ne vendons pas vos données à des tiers.
      </p>
      
      <Separator className="my-6" />
      
      <h3 className="text-xl font-semibold text-gray-900">6. Vos Droits</h3>
      <p className="mb-4">
        Conformément au RGPD, vous avez le droit :
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>D'accéder à vos données.</li>
        <li>De les rectifier ou les supprimer.</li>
        <li>De retirer votre consentement à tout moment.</li>
      </ul>
      <p className="mb-4">
        Pour exercer vos droits, contactez-nous à l'adresse : <strong>privacy@guardia-security.com</strong>.
      </p>
      
      <Separator className="my-6" />
      
      <h3 className="text-xl font-semibold text-gray-900">7. Modifications de la Politique</h3>
      <p className="mb-4">
        Nous pouvons mettre à jour cette politique pour refléter les évolutions légales ou techniques. Les modifications seront publiées sur cette page avec la date de mise à jour.
      </p>
      
      <Separator className="my-6" />
      
      <h3 className="text-xl font-semibold text-gray-900">8. Contact</h3>
      <p className="mb-4">
        Pour toute question concernant cette politique des cookies, contactez-nous à :
      </p>
      <ul className="list-none mb-4">
        <li><strong>Email</strong> : info@cybergard.eu</li>
      </ul>
      
      <Separator className="my-6" />
      
      <p className="text-center italic text-gray-700 border border-gray-200 p-4 rounded-md bg-gray-50 mt-8">
        Une politique des cookies claire et transparente renforce la confiance des utilisateurs et assure la conformité légale.
      </p>
      
      <p className="text-sm text-gray-500 mt-8">
        <strong>Note</strong> : Cette politique est conçue pour être conforme au RGPD et à la directive ePrivacy.
      </p>
    </div>
  );
};

export default CookiesPolicyContent;
