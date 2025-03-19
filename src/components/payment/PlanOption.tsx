
import React from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PlanOptionProps {
  type: 'monthly' | 'annual';
  selected: boolean;
  onSelect: () => void;
}

const PlanOption: React.FC<PlanOptionProps> = ({ type, selected, onSelect }) => {
  const isMonthly = type === 'monthly';
  
  return (
    <div 
      className={cn(
        "border rounded-lg p-6 transition-all cursor-pointer",
        selected 
          ? "border-security-primary shadow-md" 
          : "border-gray-200 hover:border-gray-300"
      )}
      onClick={onSelect}
    >
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-lg font-semibold mb-1">
            {isMonthly ? "Abonnement Mensuel" : "Abonnement Annuel"}
          </h3>
          <div className="text-2xl font-bold text-security-primary">
            {isMonthly ? "9,99€" : "99,99€"}
            <span className="text-sm font-normal text-gray-500">
              {isMonthly ? "/mois" : "/an"}
            </span>
          </div>
          {!isMonthly && (
            <div className="mt-1 text-sm text-green-600 font-medium">
              2 mois offerts
            </div>
          )}
        </div>
        <div className={cn(
          "w-6 h-6 rounded-full border-2",
          selected 
            ? "border-security-primary bg-security-primary/10" 
            : "border-gray-300"
        )}>
          {selected && <div className="w-3 h-3 bg-security-primary rounded-full m-auto mt-[3px]"></div>}
        </div>
      </div>
      
      <ul className="space-y-3 mt-4">
        <li className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          Sécurité 24/7 avec surveillance en temps réel
        </li>
        <li className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          Pentest et correction automatique des failles
        </li>
        <li className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          Sauvegarde et récupération des fichiers en cas d'attaque
        </li>
        <li className="flex items-center">
          <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
          Support client prioritaire
        </li>
      </ul>
    </div>
  );
};

export default PlanOption;
