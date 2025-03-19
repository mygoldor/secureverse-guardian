
import React from 'react';
import { Separator } from '@/components/ui/separator';

const TermsContent: React.FC = () => {
  return (
    <div className="prose prose-sm max-w-none">
      <p className="mb-6">
        Bienvenue chez <strong>Guardia</strong>. Les présentes Conditions Générales d'Utilisation (CGU) régissent l'accès et l'utilisation de nos services, y compris notre plateforme en ligne, notre application et nos services associés (collectivement appelés "Services"). En accédant à ou en utilisant les Services, vous acceptez les présentes Conditions. Si vous n'acceptez pas ces conditions, vous devez immédiatement cesser d'utiliser nos Services.
      </p>

      <Separator className="my-6" />

      <h2 className="text-xl font-semibold" id="introduction">1. Introduction</h2>
      <p className="mb-6">
        Les Services sont fournis par <strong>Guardia Security</strong>, société enregistrée sous le numéro B123456789 et ayant son siège social à 123 Security Street, 1000 Brussels, Belgium. Nous nous réservons le droit de modifier, suspendre ou interrompre les Services à tout moment, sans préavis.
      </p>

      <Separator className="my-6" />

      <h2 className="text-xl font-semibold" id="inscription">2. Inscription et Compte Utilisateur</h2>
      
      <h3 className="text-lg font-medium mt-4">2.1 Création du compte</h3>
      <p>
        Pour utiliser nos Services, vous devez créer un compte en fournissant des informations exactes et complètes. Vous êtes responsable de la confidentialité de vos informations de connexion (identifiant et mot de passe) et de toutes les activités réalisées via votre compte.
      </p>

      <h3 className="text-lg font-medium mt-4">2.2 Adresse e-mail unique</h3>
      <p>
        Chaque adresse e-mail peut être associée à un seul compte. Vous êtes responsable de l'exactitude des informations liées à votre compte et devez nous informer immédiatement en cas de compromission de vos informations de connexion.
      </p>

      <h3 className="text-lg font-medium mt-4">2.3 Suppression de compte</h3>
      <p className="mb-6">
        Vous pouvez supprimer votre compte à tout moment en nous contactant à l'adresse e-mail suivante : privacy@guardia-security.com. La suppression du compte entraînera la perte d'accès aux Services et à toutes les données associées.
      </p>

      <Separator className="my-6" />

      <h2 className="text-xl font-semibold" id="abonnement">3. Abonnement et Paiement</h2>
      
      <h3 className="text-lg font-medium mt-4">3.1 Plans d'abonnement</h3>
      <p>
        Les utilisateurs peuvent choisir un abonnement mensuel de <strong>9,99 EUR/mois</strong> ou annuel de <strong>99,99 EUR/an</strong>. Ces montants sont facturés à l'avance et sont non remboursables, sauf dans les cas prévus par la loi.
      </p>

      <h3 className="text-lg font-medium mt-4">3.2 Modalités de paiement</h3>
      <p>
        Les paiements peuvent être effectués via les services de paiement sécurisés <strong>Stripe</strong>, <strong>Mollie</strong> (y compris carte Bancontact) ou <strong>PayPal</strong>. En utilisant nos Services, vous acceptez les conditions de paiement des prestataires de paiement tiers.
      </p>

      <h3 className="text-lg font-medium mt-4">3.3 Modification de l'abonnement</h3>
      <p className="mb-6">
        Vous pouvez modifier ou annuler votre abonnement à tout moment via la page "Paramètres" de votre compte. Si vous annulez votre abonnement, vous pourrez continuer à utiliser les Services jusqu'à la fin de la période payée.
      </p>

      <Separator className="my-6" />

      <h2 className="text-xl font-semibold" id="utilisation">4. Utilisation des Services</h2>
      
      <h3 className="text-lg font-medium mt-4">4.1 Conformité aux lois</h3>
      <p>
        Vous vous engagez à utiliser les Services uniquement à des fins légales et conformément à toutes les lois et règlements applicables. Vous ne devez pas utiliser les Services pour :
      </p>
      <ul className="list-disc pl-5 my-3">
        <li>Enfreindre les droits de propriété intellectuelle</li>
        <li>Diffuser du contenu illégal, nuisible, ou malveillant</li>
        <li>Effectuer des attaques ou tentatives d'intrusion dans le système de Guardia</li>
      </ul>

      <h3 className="text-lg font-medium mt-4">4.2 Interdiction d'abus</h3>
      <p className="mb-6">
        Il est interdit de tenter d'exploiter une faille de sécurité ou d'accéder à des données non autorisées, d'utiliser les Services pour collecter des informations personnelles d'autres utilisateurs sans leur consentement, ou de tenter de contourner les systèmes de sécurité de notre plateforme.
      </p>

      <Separator className="my-6" />

      <h2 className="text-xl font-semibold" id="propriete">5. Propriété intellectuelle</h2>
      <p className="mb-6">
        Tous les droits de propriété intellectuelle relatifs aux Services, y compris mais sans s'y limiter, les logiciels, le contenu, les marques, les logos, les bases de données et autres éléments associés, sont la propriété exclusive de <strong>Guardia Security</strong>. Vous n'êtes pas autorisé à copier, modifier, distribuer, vendre, ou utiliser ces éléments sans notre autorisation expresse.
      </p>

      <Separator className="my-6" />

      <h2 className="text-xl font-semibold" id="confidentialite">6. Confidentialité et Protection des données</h2>
      <p className="mb-6">
        Nous nous engageons à respecter votre vie privée et à protéger vos données personnelles conformément à notre <strong>Politique de confidentialité</strong>.
      </p>

      <Separator className="my-6" />

      <h2 className="text-xl font-semibold" id="suspension">7. Suspension et Résiliation</h2>
      <p className="mb-6">
        Nous nous réservons le droit de suspendre ou de résilier votre compte si nous constatons une violation des présentes Conditions ou si vous ne respectez pas les lois applicables. En cas de suspension ou de résiliation de votre compte, vous n'aurez plus accès aux Services et aucune indemnité ne sera versée.
      </p>

      <Separator className="my-6" />

      <h2 className="text-xl font-semibold" id="limitations">8. Limitations de responsabilité</h2>
      
      <h3 className="text-lg font-medium mt-4">8.1 Aucune garantie explicite ou implicite</h3>
      <p>
        Les Services sont fournis "tels quels" et nous ne garantissons pas qu'ils seront exempts d'erreurs, d'interruptions ou de défaillances. Nous déclinons toute responsabilité concernant les pertes ou dommages résultant de l'utilisation des Services, y compris mais sans s'y limiter, les pertes de données ou d'accès.
      </p>

      <h3 className="text-lg font-medium mt-4">8.2 Responsabilité limitée</h3>
      <p className="mb-6">
        Dans toute la mesure permise par la loi applicable, notre responsabilité envers vous, que ce soit en vertu d'un contrat, d'une négligence ou autrement, est limitée à la somme que vous avez payée pour les Services pendant les <strong>6 mois</strong> précédant la réclamation.
      </p>

      <Separator className="my-6" />

      <h2 className="text-xl font-semibold" id="modifications">9. Modifications des Conditions</h2>
      <p className="mb-6">
        Nous pouvons modifier ces Conditions à tout moment. Nous vous informerons de toute modification importante par e-mail ou via la plateforme. Si vous continuez à utiliser les Services après la modification des Conditions, cela signifie que vous les acceptez.
      </p>

      <Separator className="my-6" />

      <h2 className="text-xl font-semibold" id="loi">10. Loi applicable et règlement des différends</h2>
      <p className="mb-6">
        Les présentes Conditions sont régies par les lois de <strong>Belgique</strong>. En cas de litige, nous nous engageons à chercher une résolution amiable. Si aucun accord n'est trouvé, le litige sera soumis à la compétence exclusive des tribunaux de <strong>Bruxelles</strong>.
      </p>

      <Separator className="my-6" />

      <h2 className="text-xl font-semibold" id="contact">11. Contact</h2>
      <p className="mb-6">
        Si vous avez des questions concernant ces Conditions Générales, vous pouvez nous contacter à l'adresse suivante :<br /><br />
        📩 <strong>E-mail</strong> : contact@guardia-security.com<br />
        📍 <strong>Adresse</strong> : 123 Security Street, 1000 Brussels, Belgium
      </p>

      <Separator className="my-6" />

      <p className="text-center font-medium mt-8">
        En utilisant nos Services, vous reconnaissez avoir lu, compris et accepté ces Conditions Générales d'Utilisation.
      </p>
    </div>
  );
};

export default TermsContent;
