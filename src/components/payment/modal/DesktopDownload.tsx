
import React, { useState, useEffect } from 'react';
import { Download, AlertTriangle, RefreshCw, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

interface DesktopDownloadProps {
  installationStarted: boolean;
  downloadError?: boolean;
  onDownload: () => void;
  onReset?: () => void;
}

const DesktopDownload: React.FC<DesktopDownloadProps> = ({ 
  installationStarted, 
  downloadError = false,
  onDownload,
  onReset
}) => {
  const { toast } = useToast();
  const [downloadUrl, setDownloadUrl] = useState('');
  const [fileCheckInProgress, setFileCheckInProgress] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);
  
  useEffect(() => {
    // Get the user's operating system for desktop platforms
    const userAgent = window.navigator.userAgent;
    
    // In a real app, these would point to actual files on your server
    if (userAgent.indexOf('Windows') !== -1) {
      setDownloadUrl('/downloads/Guardia-Security-1.0.0-win.exe');
    } else if (userAgent.indexOf('Mac') !== -1) {
      setDownloadUrl('/downloads/Guardia-Security-1.0.0-mac.dmg');
    } else if (userAgent.indexOf('Linux') !== -1) {
      setDownloadUrl('/downloads/Guardia-Security-1.0.0-linux.AppImage');
    }
    
    // Show instructions automatically after download starts
    if (installationStarted && !downloadError) {
      setShowInstructions(true);
    }
  }, [installationStarted, downloadError]);
  
  const handleDownload = () => {
    if (onReset) {
      onReset();
    }
    
    setFileCheckInProgress(true);
    
    // First check if the file exists by making a HEAD request
    fetch(downloadUrl, { method: 'HEAD' })
      .then(response => {
        setFileCheckInProgress(false);
        if (response.ok) {
          // File exists, proceed with download
          const link = document.createElement('a');
          link.href = downloadUrl;
          link.download = downloadUrl.split('/').pop() || 'Guardia-Security-Installer';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          toast({
            title: "Téléchargement démarré",
            description: "L'installateur de Guardia est en cours de téléchargement.",
          });
          
          // Call parent's onDownload callback
          onDownload();
          
          // Show instructions after download starts
          setShowInstructions(true);
        } else {
          // File doesn't exist
          console.error('Download file not found:', downloadUrl);
          
          toast({
            variant: "destructive",
            title: "Fichier non disponible",
            description: "Le fichier d'installation n'est pas encore disponible. Veuillez réessayer plus tard.",
          });
        }
      })
      .catch(error => {
        setFileCheckInProgress(false);
        console.error('Error checking download file:', error);
        
        toast({
          variant: "destructive",
          title: "Erreur de téléchargement",
          description: "Une erreur s'est produite lors de la vérification du fichier. Veuillez réessayer plus tard.",
        });
      });
  };

  const handleRetry = () => {
    if (onReset) {
      onReset();
    }
    setShowInstructions(false);
    handleDownload();
  };

  return (
    <div className="bg-blue-50 p-4 rounded-lg my-4">
      <h4 className="font-medium text-blue-700 mb-2">Installation de Guardia</h4>
      
      {downloadError ? (
        <Alert variant="destructive" className="mb-3">
          <AlertTriangle className="h-4 w-4 mr-2" />
          <AlertTitle>Fichier non disponible</AlertTitle>
          <AlertDescription>
            Le fichier d'installation n'est pas encore disponible. Veuillez réessayer plus tard ou contacter le support.
          </AlertDescription>
        </Alert>
      ) : installationStarted && showInstructions ? (
        <div className="space-y-3">
          <p className="text-sm text-blue-600">
            Le téléchargement a commencé. Suivez ces étapes pour installer Guardia:
          </p>
          <ol className="text-sm text-blue-700 list-decimal pl-5 space-y-2">
            <li>
              <strong>Attention au message de sécurité</strong>: Votre navigateur peut afficher un avertissement du type "guardia-security n'est pas fréquemment téléchargé".
              <div className="bg-amber-50 p-2 rounded border border-amber-200 mt-1">
                <div className="flex items-start">
                  <Shield className="h-4 w-4 text-amber-600 mr-2 mt-0.5" />
                  <span className="text-amber-700 text-xs">
                    Cliquez sur "Conserver" puis "Exécuter quand même" car il s'agit de notre application officielle.
                  </span>
                </div>
              </div>
            </li>
            <li><strong>Localisez le fichier</strong> téléchargé dans votre dossier de téléchargements.</li>
            <li><strong>Exécutez le fichier</strong> en double-cliquant dessus.</li>
            <li>Si un avertissement de sécurité apparaît, cliquez sur <strong>"Plus d'informations"</strong> puis <strong>"Exécuter quand même"</strong>.</li>
            <li>Suivez les instructions d'installation à l'écran.</li>
          </ol>
        </div>
      ) : (
        <p className="text-sm text-blue-600 mb-2">
          {installationStarted 
            ? "Le téléchargement a commencé. Exécutez le fichier une fois le téléchargement terminé pour installer Guardia."
            : "Téléchargement automatique en cours de préparation..."}
        </p>
      )}
      
      <div className="flex space-x-2 mt-3">
        <Button 
          onClick={downloadError ? handleRetry : handleDownload}
          className="" 
          variant={downloadError ? "destructive" : "outline"}
          size="sm"
          disabled={fileCheckInProgress}
        >
          {fileCheckInProgress ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Vérification...
            </>
          ) : downloadError ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2" />
              Réessayer
            </>
          ) : (
            <>
              <Download className="h-4 w-4 mr-2" />
              {installationStarted ? "Télécharger à nouveau" : "Télécharger"}
            </>
          )}
        </Button>
        
        {installationStarted && !showInstructions && (
          <Button 
            onClick={() => setShowInstructions(true)}
            variant="secondary"
            size="sm"
          >
            Voir les instructions
          </Button>
        )}
      </div>
    </div>
  );
};

export default DesktopDownload;
