
import React from 'react';
import { Loader2, Check, AlertCircle } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface InstallProgressIndicatorProps {
  installing: boolean;
  progressValue: number;
  installComplete: boolean;
  installError: boolean;
}

const InstallProgressIndicator: React.FC<InstallProgressIndicatorProps> = ({
  installing,
  progressValue,
  installComplete,
  installError
}) => {
  if (installing) {
    return (
      <div className="mb-3">
        <div className="flex items-center mb-1">
          <Loader2 className="h-4 w-4 mr-2 text-green-700 animate-spin" />
          <span className="text-sm text-green-700">Installation en cours...</span>
        </div>
        <Progress value={progressValue} className="h-2" indicatorClassName="bg-green-600" />
      </div>
    );
  }
  
  if ((progressValue >= 100 || installComplete) && !installError) {
    return (
      <div className="bg-green-100 p-2 rounded text-green-800 text-sm mb-2">
        <div className="flex items-center">
          <Check className="h-4 w-4 mr-2 text-green-700" />
          <span>Installation réussie !</span>
        </div>
        <Progress value={100} className="h-2 mb-2" indicatorClassName="bg-green-600" />
        <p>L'application est maintenant disponible sur votre écran d'accueil. Vous allez être redirigé...</p>
      </div>
    );
  }
  
  if (installError) {
    return (
      <div className="bg-amber-100 p-2 rounded text-amber-800 text-sm mb-2">
        <div className="flex items-center">
          <AlertCircle className="h-4 w-4 mr-2 text-amber-700" />
          <span>Problème d'installation</span>
        </div>
        <p>Une erreur s'est produite lors de l'installation. Vous pouvez continuer vers le tableau de bord.</p>
      </div>
    );
  }
  
  return null;
};

export default InstallProgressIndicator;
