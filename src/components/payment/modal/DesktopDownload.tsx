
import React, { useState, useEffect } from 'react';
import { Download, AlertTriangle, RefreshCw } from 'lucide-react';
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
  }, []);
  
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
      ) : (
        <p className="text-sm text-blue-600 mb-2">
          {installationStarted 
            ? "Le téléchargement a commencé. Exécutez le fichier une fois le téléchargement terminé pour installer Guardia."
            : "Téléchargement automatique en cours de préparation..."}
        </p>
      )}
      
      <Button 
        onClick={downloadError ? handleRetry : handleDownload}
        className="mt-2" 
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
            Réessayer le téléchargement
          </>
        ) : (
          <>
            <Download className="h-4 w-4 mr-2" />
            {installationStarted ? "Télécharger à nouveau" : "Télécharger maintenant"}
          </>
        )}
      </Button>
    </div>
  );
};

export default DesktopDownload;
