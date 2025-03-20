
import React from 'react';
import { Button } from '@/components/ui/button';
import { ShieldAlert } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

interface SecurityInfoAlertProps {
  showSecurityInfo: boolean;
  toggleSecurityInfo: () => void;
}

const SecurityInfoAlert: React.FC<SecurityInfoAlertProps> = ({ 
  showSecurityInfo, 
  toggleSecurityInfo 
}) => {
  return (
    <div className="mt-2">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={toggleSecurityInfo}
        className="flex items-center text-amber-700 bg-amber-50 border-amber-200 hover:bg-amber-100"
      >
        <ShieldAlert className="h-4 w-4 mr-2" />
        {showSecurityInfo ? "Masquer" : "Afficher"} les informations sur les avertissements de sécurité
      </Button>
      
      {showSecurityInfo && (
        <Alert className="mt-2 bg-amber-50 border-amber-200">
          <ShieldAlert className="h-4 w-4 text-amber-700" />
          <AlertDescription className="text-sm text-amber-700 mt-2">
            <p className="font-medium mb-1">Avertissements de sécurité courants:</p>
            <ul className="list-disc pl-5 space-y-1 text-xs">
              <li><strong>Windows:</strong> "Windows a protégé votre ordinateur" - Cliquez sur "Plus d'informations" puis "Exécuter quand même".</li>
              <li><strong>Chrome/Edge:</strong> "guardia-security n'est pas fréquemment téléchargé" - Cliquez sur "Conserver" puis trouvez le fichier dans vos téléchargements.</li>
              <li><strong>Mac:</strong> "L'application ne peut pas être ouverte" - Allez dans Préférences Système &gt; Sécurité &gt; "Ouvrir quand même".</li>
            </ul>
            <p className="text-xs mt-2">Ces avertissements sont normaux pour les nouvelles applications. Guardia Security est une application légitime et sécurisée.</p>
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default SecurityInfoAlert;
