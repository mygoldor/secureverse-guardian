import React, { useState, useEffect } from 'react';
import { Download, AlertTriangle, RefreshCw, Shield, ExternalLink } from 'lucide-react';
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
  const [platform, setPlatform] = useState('');
  
  useEffect(() => {
    const userAgent = window.navigator.userAgent;
    
    if (userAgent.indexOf('Windows') !== -1) {
      setDownloadUrl('/downloads/Guardia-Security-1.0.0-win.exe');
      setPlatform('Windows');
    } else if (userAgent.indexOf('Mac') !== -1) {
      setDownloadUrl('/downloads/Guardia-Security-1.0.0-mac.dmg');
      setPlatform('Mac');
    } else if (userAgent.indexOf('Linux') !== -1) {
      setDownloadUrl('/downloads/Guardia-Security-1.0.0-linux.AppImage');
      setPlatform('Linux');
    }
    
    if (installationStarted && !downloadError) {
      setShowInstructions(true);
    }
  }, [installationStarted, downloadError]);
  
  const handleDownload = () => {
    if (onReset) {
      onReset();
    }
    
    setFileCheckInProgress(true);
    
    fetch(downloadUrl, { method: 'HEAD' })
      .then(response => {
        setFileCheckInProgress(false);
        if (response.ok) {
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
          
          onDownload();
          
          setShowInstructions(true);
        } else {
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
  
  const getSecurityInstructions = () => {
    switch(platform) {
      case 'Windows':
        return (
          <div className="bg-amber-50 p-2 rounded border border-amber-200 mt-1">
            <div className="flex items-start">
              <Shield className="h-4 w-4 text-amber-600 mr-2 mt-0.5" />
              <span className="text-amber-700 text-xs">
                <strong>Message "Windows a protégé votre ordinateur"</strong>: Cliquez sur "Plus d'informations" puis "Exécuter quand même".
              </span>
            </div>
            <div className="flex items-start mt-2">
              <Shield className="h-4 w-4 text-amber-600 mr-2 mt-0.5" />
              <span className="text-amber-700 text-xs">
                <strong>Message "guardia-security n'est pas fréquemment téléchargé"</strong>: Cliquez sur "Conserver" puis localisez le fichier dans vos téléchargements.
              </span>
            </div>
          </div>
        );
      case 'Mac':
        return (
          <div className="bg-amber-50 p-2 rounded border border-amber-200 mt-1">
            <div className="flex items-start">
              <Shield className="h-4 w-4 text-amber-600 mr-2 mt-0.5" />
              <span className="text-amber-700 text-xs">
                <strong>Message "L'application ne peut pas être ouverte"</strong>: Allez dans Préférences Système &gt; Sécurité &gt; cliquez sur "Ouvrir quand même".
              </span>
            </div>
          </div>
        );
      case 'Linux':
        return (
          <div className="bg-amber-50 p-2 rounded border border-amber-200 mt-1">
            <div className="flex items-start">
              <Shield className="h-4 w-4 text-amber-600 mr-2 mt-0.5" />
              <span className="text-amber-700 text-xs">
                <strong>Rendre exécutable</strong>: Après téléchargement, ouvrez un terminal, accédez au dossier et tapez "chmod +x Guardia-Security-*.AppImage"
              </span>
            </div>
          </div>
        );
      default:
        return null;
    }
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
              <strong>Attention aux messages de sécurité</strong>: Votre navigateur et système d'exploitation peuvent afficher des avertissements de sécurité.
              {getSecurityInstructions()}
            </li>
            <li><strong>Localisez le fichier</strong> téléchargé dans votre dossier de téléchargements.</li>
            <li><strong>Exécutez le fichier</strong> en double-cliquant dessus.</li>
            <li>Suivez les instructions d'installation à l'écran.</li>
            <li>Une fois installé, lancez l'application depuis votre menu Démarrer (Windows), Launchpad (Mac) ou Applications (Linux).</li>
          </ol>
          
          <div className="bg-blue-100 p-2 rounded text-xs text-blue-700 mt-2">
            <p><strong>Note</strong>: Ces avertissements de sécurité sont normaux et apparaissent pour les applications nouvellement téléchargées. Guardia Security est une application légitime et sécurisée.</p>
          </div>
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
        
        <Button
          onClick={() => window.open('/installation-guide', '_blank')}
          variant="ghost"
          size="sm"
          className="text-blue-600"
        >
          <ExternalLink className="h-3 w-3 mr-1" />
          Aide
        </Button>
      </div>
    </div>
  );
};

export default DesktopDownload;
