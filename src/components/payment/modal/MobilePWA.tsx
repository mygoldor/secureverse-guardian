import React, { useEffect, useState } from 'react';
import { Smartphone, Loader2, Check, AlertCircle } from 'lucide-react';
import InstallPWAButton from './InstallPWAButton';
import { BeforeInstallPromptEvent } from './types/installPwa';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

interface MobilePWAProps {
  deferredPrompt: BeforeInstallPromptEvent | null;
  onDownload: () => void;
}

const MobilePWA: React.FC<MobilePWAProps> = ({ deferredPrompt, onDownload }) => {
  const [installing, setInstalling] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [installComplete, setInstallComplete] = useState(false);
  const [installError, setInstallError] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches 
      || (window.navigator as any).standalone === true;
    
    if (isStandalone) {
      setProgressValue(100);
      setInstallComplete(true);
      sessionStorage.setItem('installationChoiceMade', 'true');
      
      setTimeout(() => {
        navigate('/dashboard');
      }, 2000);
    } else if (deferredPrompt === null && sessionStorage.getItem('promptWasAvailable') === 'true') {
      sessionStorage.setItem('installationChoiceMade', 'true');
      setInstalling(false);
      setProgressValue(100);
      setInstallComplete(true);
    }
    
    if (deferredPrompt !== null) {
      sessionStorage.setItem('promptWasAvailable', 'true');
    }
  }, [deferredPrompt, navigate]);
  
  useEffect(() => {
    if (installing && progressValue < 95) {
      const interval = setInterval(() => {
        setProgressValue((prevValue) => {
          const newValue = prevValue + (Math.random() * 5);
          return newValue < 95 ? newValue : 95;
        });
      }, 300);
      
      return () => clearInterval(interval);
    }
  }, [installing, progressValue]);

  useEffect(() => {
    if (installing && progressValue >= 95 && progressValue < 100) {
      const timeout = setTimeout(() => {
        setProgressValue(100);
        setInstallComplete(true);
        sessionStorage.setItem('installationChoiceMade', 'true');
      }, 5000);
      
      return () => clearTimeout(timeout);
    }
  }, [installing, progressValue]);

  const handleInstallClick = () => {
    sessionStorage.setItem('installationChoiceMade', 'true');
    setInstalling(true);
    setProgressValue(10);
    setInstallError(false);
    
    try {
      onDownload();
      
      if (!deferredPrompt) {
        setTimeout(() => {
          setProgressValue(100);
          setInstallComplete(true);
          setInstalling(false);
          
          navigate('/dashboard');
        }, 3000);
      }
    } catch (error) {
      console.error("Installation error:", error);
      setInstallError(true);
      setProgressValue(100);
      setInstallComplete(true);
      sessionStorage.setItem('installationChoiceMade', 'true');
    }
  };

  const handleSkip = () => {
    sessionStorage.setItem('installationChoiceMade', 'true');
    navigate('/dashboard');
  };

  return (
    <div className="bg-green-50 p-4 rounded-lg my-4">
      <h4 className="font-medium text-green-700 mb-2">
        <Smartphone className="h-4 w-4 inline mr-1" />
        Ajouter à l'écran d'accueil
      </h4>
      <p className="text-sm text-green-600 mb-2">
        Installez Guardia directement sur votre écran d'accueil pour un accès rapide et une expérience optimale.
      </p>
      
      {installing && (
        <div className="mb-3">
          <div className="flex items-center mb-1">
            <Loader2 className="h-4 w-4 mr-2 text-green-700 animate-spin" />
            <span className="text-sm text-green-700">Installation en cours...</span>
          </div>
          <Progress value={progressValue} className="h-2" indicatorClassName="bg-green-600" />
        </div>
      )}
      
      {(progressValue >= 100 || installComplete) && !installError && (
        <div className="bg-green-100 p-2 rounded text-green-800 text-sm mb-2">
          <div className="flex items-center">
            <Check className="h-4 w-4 mr-2 text-green-700" />
            <span>Installation réussie !</span>
          </div>
          <Progress value={100} className="h-2 mb-2" indicatorClassName="bg-green-600" />
          <p>L'application est maintenant disponible sur votre écran d'accueil. Vous allez être redirigé...</p>
        </div>
      )}
      
      {installError && (
        <div className="bg-amber-100 p-2 rounded text-amber-800 text-sm mb-2">
          <div className="flex items-center">
            <AlertCircle className="h-4 w-4 mr-2 text-amber-700" />
            <span>Problème d'installation</span>
          </div>
          <p>Une erreur s'est produite lors de l'installation. Vous pouvez continuer vers le tableau de bord.</p>
        </div>
      )}
      
      {progressValue < 100 && !installComplete && (
        <InstallPWAButton 
          deferredPrompt={deferredPrompt} 
          onInstall={handleInstallClick}
        />
      )}
      
      {!installComplete && !installing && (
        <button 
          onClick={handleSkip} 
          className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700"
        >
          Passer cette étape et continuer
        </button>
      )}
    </div>
  );
};

export default MobilePWA;
