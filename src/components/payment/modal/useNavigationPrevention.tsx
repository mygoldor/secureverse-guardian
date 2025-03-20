
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

interface UseNavigationPreventionProps {
  isModalOpen: boolean;
  userMadeChoice: boolean;
}

export const useNavigationPrevention = ({ 
  isModalOpen, 
  userMadeChoice 
}: UseNavigationPreventionProps) => {
  const { toast } = useToast();

  // Prevent navigation attempts if modal is open and no choice made
  useEffect(() => {
    console.log('Modal state:', { 
      isModalOpen, 
      userMadeChoice,
      sessionStorageChoice: sessionStorage.getItem('installationChoiceMade'),
      timestamp: new Date().toISOString() 
    });
    
    // Block navigation attempts
    const blockNavigation = () => {
      if (isModalOpen && !userMadeChoice) {
        console.log('Blocking navigation attempt');
        toast({
          variant: "destructive",
          title: "Choix requis",
          description: "Veuillez choisir une option d'installation avant de continuer.",
        });
        return false;
      }
      return true;
    };
    
    // Prevent window closing
    const preventClosing = (e: BeforeUnloadEvent) => {
      if (isModalOpen && !userMadeChoice) {
        e.preventDefault();
        e.returnValue = 'Vous devez choisir une option d\'installation avant de quitter.';
        return e.returnValue;
      }
    };

    // Handle popstate (back button)
    const handlePopState = (e: PopStateEvent) => {
      if (isModalOpen && !userMadeChoice) {
        e.preventDefault();
        window.history.pushState(null, '', window.location.href);
        toast({
          variant: "destructive",
          title: "Choix requis",
          description: "Veuillez choisir une option d'installation avant de continuer.",
        });
      }
    };

    if (isModalOpen) {
      window.addEventListener('beforeunload', preventClosing);
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopState);
      
      return () => {
        window.removeEventListener('beforeunload', preventClosing);
        window.removeEventListener('popstate', handlePopState);
      };
    }
  }, [isModalOpen, userMadeChoice, toast]);

  // Prevent ESC key from closing the modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen && !userMadeChoice) {
        e.preventDefault();
        e.stopPropagation();
        
        toast({
          variant: "destructive",
          title: "Choix requis",
          description: "Veuillez choisir une option d'installation avant de continuer.",
        });
      }
    };
    
    window.addEventListener('keydown', handleKeyDown, true);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown, true);
    };
  }, [isModalOpen, userMadeChoice, toast]);

  // Handler functions for Dialog events
  const handleEscapeKeyDown = (e: React.KeyboardEvent) => {
    if (!userMadeChoice) {
      e.preventDefault();
      toast({
        variant: "destructive",
        title: "Choix requis",
        description: "Veuillez choisir une option d'installation avant de continuer.",
      });
    }
  };

  const handlePointerDownOutside = (e: React.PointerEvent) => {
    if (!userMadeChoice) {
      e.preventDefault();
      toast({
        variant: "destructive",
        title: "Choix requis",
        description: "Veuillez choisir une option d'installation avant de continuer.",
      });
    }
  };

  return {
    handleEscapeKeyDown,
    handlePointerDownOutside
  };
};
