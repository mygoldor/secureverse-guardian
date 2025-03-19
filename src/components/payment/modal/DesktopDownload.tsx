
import React from 'react';
import { Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface DesktopDownloadProps {
  installationStarted: boolean;
  onDownload: () => void;
}

const DesktopDownload: React.FC<DesktopDownloadProps> = ({ 
  installationStarted, 
  onDownload 
}) => {
  return (
    <div className="bg-blue-50 p-4 rounded-lg my-4">
      <h4 className="font-medium text-blue-700 mb-2">Installation de Guardia</h4>
      <p className="text-sm text-blue-600 mb-2">
        {installationStarted 
          ? "Le téléchargement a commencé. Exécutez le fichier une fois le téléchargement terminé pour installer Guardia."
          : "Téléchargement automatique en cours de préparation..."}
      </p>
      {installationStarted && (
        <Button 
          onClick={onDownload} 
          className="mt-2" 
          variant="outline"
          size="sm"
        >
          <Download className="h-4 w-4 mr-2" />
          Télécharger à nouveau
        </Button>
      )}
    </div>
  );
};

export default DesktopDownload;
