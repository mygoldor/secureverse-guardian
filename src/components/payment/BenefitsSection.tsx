
import React from 'react';
import { CheckCircle } from 'lucide-react';

const BenefitsSection: React.FC = () => {
  return (
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
  );
};

export default BenefitsSection;
