
import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

export function useInstallationTracker(isOpen: boolean) {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [userMadeChoice, setUserMadeChoice] = useState(false);
  
  // Reset user choice state when modal opens
  useEffect(() => {
    if (isOpen) {
      setUserMadeChoice(false);
    }
  }, [isOpen]);
  
  // Check if user has already made a choice (from session storage)
  useEffect(() => {
    if (isOpen) {
      const choiceMade = sessionStorage.getItem('installationChoiceMade') === 'true';
      if (choiceMade) {
        setUserMadeChoice(true);
      }
    }
  }, [isOpen]);
  
  // Persist the installation state when changes occur
  useEffect(() => {
    if (userMadeChoice) {
      sessionStorage.setItem('installationChoiceMade', 'true');
      
      // Redirect to dashboard after a brief delay
      const redirectTimer = setTimeout(() => {
        navigate('/dashboard');
      }, 3000);
      
      return () => clearTimeout(redirectTimer);
    }
  }, [userMadeChoice, navigate]);
  
  // Check direct session storage for most accurate data
  const hasUserMadeChoiceInStorage = () => {
    return sessionStorage.getItem('installationChoiceMade') === 'true';
  };
  
  const setChoice = (choice: boolean) => {
    if (choice) {
      sessionStorage.setItem('installationChoiceMade', 'true');
    } else {
      sessionStorage.removeItem('installationChoiceMade');
    }
    setUserMadeChoice(choice);
  };

  const handleClosePrevention = () => {
    try {
      // Only allow closing if the user made an installation choice
      if (userMadeChoice || hasUserMadeChoiceInStorage()) {
        return true;
      } else {
        toast({
          variant: "destructive",
          title: "Choix requis",
          description: "Veuillez choisir une option d'installation avant de continuer.",
        });
        return false;
      }
    } catch (error) {
      return false;
    }
  };

  return {
    userMadeChoice,
    setUserMadeChoice: setChoice,
    handleClosePrevention
  };
}
