
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from 'lucide-react';

interface MobileMenuProps {
  user: any;
  handleLogout: () => Promise<void>;
}

const MobileMenu = ({ user, handleLogout }: MobileMenuProps) => {
  const location = useLocation();
  const { t } = useLanguage();
  
  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="menu-button md:hidden">
          <Menu className="h-6 w-6" />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[80%] sm:w-[350px]">
        <SheetHeader className="mb-6">
          <SheetTitle>Guardia</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col space-y-4">
          {user ? (
            <>
              <div className="pb-4 border-b border-gray-100">
                <p className="font-medium">{user.name || user.email}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              
              <Link 
                to="/dashboard" 
                className={`py-2 text-base ${isActive('/') || isActive('/dashboard') ? 'text-security-primary font-medium' : 'text-security-muted'}`}
              >
                Dashboard
              </Link>
              <Link 
                to="/protection" 
                className={`py-2 text-base ${isActive('/protection') ? 'text-security-primary font-medium' : 'text-security-muted'}`}
              >
                Protection
              </Link>
              <Link 
                to="/privacy" 
                className={`py-2 text-base ${isActive('/privacy') ? 'text-security-primary font-medium' : 'text-security-muted'}`}
              >
                Privacy
              </Link>
              <Link 
                to="/performance" 
                className={`py-2 text-base ${isActive('/performance') ? 'text-security-primary font-medium' : 'text-security-muted'}`}
              >
                Performance
              </Link>
              <Link 
                to="/settings" 
                className={`py-2 text-base ${isActive('/settings') ? 'text-security-primary font-medium' : 'text-security-muted'}`}
              >
                Settings
              </Link>
              <Button className="mt-2 bg-security-primary hover:bg-security-secondary text-white">
                {t('quick_scan')}
              </Button>
              
              <Button 
                variant="outline" 
                className="mt-4 flex items-center justify-center" 
                onClick={handleLogout}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Se déconnecter
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="outline" className="w-full">
                  {t('login')}
                </Button>
              </Link>
              <Link to="/signup">
                <Button className="w-full bg-security-primary hover:bg-security-secondary text-white">
                  {t('signup')}
                </Button>
              </Link>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;
