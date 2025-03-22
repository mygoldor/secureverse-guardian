
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { signOutUser } from '@/utils/authUtils';

// Import refactored components
import Logo from './header/Logo';
import NavigationLinks from './header/NavigationLinks';
import UserActions from './header/UserActions';
import MobileMenu from './header/MobileMenu';

const Header = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [user, setUser] = useState<any>(null);
  
  useEffect(() => {
    // Check if user is logged in
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);
  
  const handleLogout = async () => {
    const result = await signOutUser();
    
    if (result.success) {
      // Update local state
      setUser(null);
      
      // Show toast notification
      toast({
        title: "Déconnexion réussie",
        description: "Vous avez été déconnecté avec succès."
      });
      
      // Redirect to home page
      navigate('/');
    } else {
      toast({
        title: "Erreur de déconnexion",
        description: "Une erreur s'est produite lors de la déconnexion. Veuillez réessayer.",
        variant: "destructive"
      });
    }
  };

  return (
    <>
      <header className="w-full bg-white border-b border-gray-100 shadow-sm py-3 px-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Logo user={user} />
          
          {user && <NavigationLinks />}
          
          <UserActions user={user} setUser={setUser} />
        </div>
      </header>

      {/* Mobile menu */}
      <MobileMenu user={user} handleLogout={handleLogout} />
    </>
  );
};

export default Header;
