
import React from 'react';
import { Link } from 'react-router-dom';
import { Separator } from '@/components/ui/separator';

const MentionsLegalesContent: React.FC = () => {
  const today = new Date();
  const formattedDate = `${today.getDate()} ${today.toLocaleString('fr-FR', { month: 'long' })} ${today.getFullYear()}`;
  
  return (
    <div className="prose prose-sm max-w-none text-gray-800">
      <h2 className="text-2xl font-semibold mb-6 text-center text-gray-900">Mentions Légales – Guardia</h2>
      <p className="text-sm text-right mb-4 text-gray-500">Dernière mise à jour : {formattedDate}</p>
      
      <Separator className="my-6" />
      
      <h3 className="text-xl font-semibold text-gray-900">1. Informations Générales</h3>
      <p className="mb-1"><strong>Nom de l'entreprise</strong> : Guardia</p>
      <p className="mb-1"><strong>Forme juridique</strong> : SAS</p>
      <p className="mb-1"><strong>Siège social</strong> : 123 Avenue de la Cybersécurité, 75001 Paris</p>
      <p className="mb-1"><strong>Téléphone</strong> : +33 (0)1 23 45 67 89</p>
      <p className="mb-1"><strong>Email</strong> : contact@guardia-security.com</p>
      <p className="mb-1"><strong>Directeur de la publication</strong> : Jean Dupont</p>
      <p className="mb-1"><strong>Hébergeur du site</strong> : OVHcloud – 2 rue Kellermann, 59100 Roubaix, France</p>
      
      <Separator className="my-6" />
      
      <h3 className="text-xl font-semibold text-gray-900">2. Activité</h3>
      <p className="mb-4">
        Guardia est une plateforme de cybersécurité proposant des solutions de protection autonomes et sans installation pour les particuliers et les entreprises.
      </p>
      <p className="mb-1"><strong>Numéro d'immatriculation</strong> : RCS Paris B 123 456 789</p>
      <p className="mb-1"><strong>Numéro de TVA intracommunautaire</strong> : FR 12 345 678 901</p>
      
      <Separator className="my-6" />
      
      <h3 className="text-xl font-semibold text-gray-900">3. Propriété Intellectuelle</h3>
      <p className="mb-4">
        Le site web de Guardia et son contenu (textes, images, logos, vidéos) sont protégés par les droits de propriété intellectuelle. Toute reproduction, modification ou utilisation sans autorisation écrite est strictement interdite.
      </p>
      
      <Separator className="my-6" />
      
      <h3 className="text-xl font-semibold text-gray-900">4. Données Personnelles</h3>
      <p className="mb-4">
        Conformément au Règlement Général sur la Protection des Données (RGPD), Guardia s'engage à protéger vos données personnelles. Pour en savoir plus, consultez notre <Link to="/privacy" className="text-security-primary hover:underline">Politique de Confidentialité</Link>.
      </p>
      
      <Separator className="my-6" />
      
      <h3 className="text-xl font-semibold text-gray-900">5. Cookies</h3>
      <p className="mb-4">
        Le site utilise des cookies pour améliorer votre expérience utilisateur. Pour plus d'informations, consultez notre <Link to="/cookies" className="text-security-primary hover:underline">Politique des Cookies</Link>.
      </p>
      
      <Separator className="my-6" />
      
      <h3 className="text-xl font-semibold text-gray-900">6. Limitation de Responsabilité</h3>
      <p className="mb-4">
        Guardia ne peut être tenu responsable :
      </p>
      <ul className="list-disc pl-5 mb-4">
        <li>Des dommages directs ou indirects résultant de l'utilisation du site.</li>
        <li>Des interruptions, bugs ou erreurs techniques.</li>
        <li>Des contenus publiés par des tiers (liens externes, commentaires).</li>
      </ul>
      
      <Separator className="my-6" />
      
      <h3 className="text-xl font-semibold text-gray-900">7. Liens Externes</h3>
      <p className="mb-4">
        Le site peut contenir des liens vers des sites tiers. Guardia n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu ou pratiques.
      </p>
      
      <Separator className="my-6" />
      
      <h3 className="text-xl font-semibold text-gray-900">8. Loi Applicable et Juridiction</h3>
      <p className="mb-4">
        Le site est soumis au droit français. En cas de litige, les tribunaux de Paris seront compétents.
      </p>
      
      <Separator className="my-6" />
      
      <h3 className="text-xl font-semibold text-gray-900">9. Contact</h3>
      <p className="mb-4">
        Pour toute question concernant les mentions légales, contactez-nous à :
      </p>
      <ul className="list-none mb-4">
        <li><strong>Email</strong> : legal@guardia-security.com</li>
        <li><strong>Adresse postale</strong> : 123 Avenue de la Cybersécurité, 75001 Paris</li>
      </ul>
      
      <Separator className="my-6" />
      
      <p className="text-center italic text-gray-700 border border-gray-200 p-4 rounded-md bg-gray-50 mt-8">
        Des mentions légales claires et complètes assurent la transparence et la conformité légale de votre site web.
      </p>
      
      <p className="text-sm text-gray-500 mt-8">
        <strong>Note</strong> : Ces mentions légales sont conformes à la législation française en vigueur.
      </p>
    </div>
  );
};

export default MentionsLegalesContent;
