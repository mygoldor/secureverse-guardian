
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BeforeInstallPromptEvent } from '../types/installPwa';

export function useMobilePWAInstall(
  deferredPrompt: BeforeInstallPromptEvent | null,
  onDownload: () => void
) {
  const [installing, setInstalling] = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [installComplete, setInstallComplete] = useState(false);
  const [installError, setInstallError] = useState(false);
  const navigate = useNavigate();
  
  // Check if app is already installed or installation was handled
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
  
  // Simulate progress when installing
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

  // Completion logic
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

  // Handle installation
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

  // Skip installation
  const handleSkip = () => {
    sessionStorage.setItem('installationChoiceMade', 'true');
    navigate('/dashboard');
  };

  return {
    installing,
    progressValue,
    installComplete,
    installError,
    handleInstallClick,
    handleSkip
  };
}
