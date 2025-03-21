
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

interface AuthGuardProps {
  children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuth = () => {
      // Check if user is logged in
      const userDataStr = localStorage.getItem('user');
      
      if (!userDataStr) {
        toast({
          variant: "destructive",
          title: "Accès non autorisé",
          description: "Veuillez vous connecter pour accéder à cette page.",
        });
        navigate('/login');
        return;
      }
      
      // Parse user data
      try {
        const userData = JSON.parse(userDataStr);
        
        // Check if user has made a successful payment
        if (!userData.subscriptionActive) {
          toast({
            variant: "destructive",
            title: "Abonnement requis",
            description: "Un abonnement actif est nécessaire pour accéder à cette page.",
          });
          navigate('/payment');
          return;
        }
        
        // User is authenticated and has an active subscription
        setIsAuthenticated(true);
      } catch (error) {
        console.error('Error parsing user data:', error);
        localStorage.removeItem('user');
        toast({
          variant: "destructive",
          title: "Erreur d'authentification",
          description: "Veuillez vous reconnecter.",
        });
        navigate('/login');
        return;
      }
      
      setIsLoading(false);
    };
    
    checkAuth();
  }, [navigate, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-security-primary"></div>
      </div>
    );
  }

  return isAuthenticated ? <>{children}</> : null;
};

export default AuthGuard;
