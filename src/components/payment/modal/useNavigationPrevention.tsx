
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import type { DialogContentProps } from '@radix-ui/react-dialog';

interface UseNavigationPreventionProps {
  isModalOpen: boolean;
  userMadeChoice: boolean;
}

export const useNavigationPrevention = ({ 
  isModalOpen, 
  userMadeChoice 
}: UseNavigationPreventionProps) => {
  const { toast } = useToast();

  useEffect(() => {
    const preventClosing = (e: BeforeUnloadEvent) => {
      if (isModalOpen && !userMadeChoice) {
        e.preventDefault();
        e.returnValue = 'Vous devez choisir une option d\'installation avant de quitter.';
        return e.returnValue;
      }
    };

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

  const handleEscapeKeyDown: DialogContentProps["onEscapeKeyDown"] = (event) => {
    if (!userMadeChoice) {
      event.preventDefault();
      toast({
        variant: "destructive",
        title: "Choix requis",
        description: "Veuillez choisir une option d'installation avant de continuer.",
      });
    }
  };

  const handlePointerDownOutside: DialogContentProps["onPointerDownOutside"] = (event) => {
    if (!userMadeChoice) {
      event.preventDefault();
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
