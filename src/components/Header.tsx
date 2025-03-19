
import React, { useState } from 'react';
import { Bell, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

const Header = () => {
  const location = useLocation();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm py-3 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link to="/dashboard">
            <div className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/a79c46d3-f1c2-4593-967d-8c6176e58cbc.png" 
                alt="Guardia" 
                className="h-10 w-auto"
              />
              <span className="font-bold text-2xl text-security-primary">Guardia</span>
            </div>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/dashboard" 
            className={`transition-colors ${isActive('/') || isActive('/dashboard') ? 'text-security-primary' : 'text-security-muted hover:text-security-primary'}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/protection" 
            className={`transition-colors ${isActive('/protection') ? 'text-security-primary' : 'text-security-muted hover:text-security-primary'}`}
          >
            Protection
          </Link>
          <Link 
            to="/privacy" 
            className={`transition-colors ${isActive('/privacy') ? 'text-security-primary' : 'text-security-muted hover:text-security-primary'}`}
          >
            Privacy
          </Link>
          <Link 
            to="/performance" 
            className={`transition-colors ${isActive('/performance') ? 'text-security-primary' : 'text-security-muted hover:text-security-primary'}`}
          >
            Performance
          </Link>
          <Link 
            to="/settings" 
            className={`transition-colors ${isActive('/settings') ? 'text-security-primary' : 'text-security-muted hover:text-security-primary'}`}
          >
            Settings
          </Link>
        </div>
        
        <div className="flex items-center space-x-3">
          <LanguageSelector />
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-security-danger"></span>
          </Button>
          <Button className="hidden md:inline-flex bg-security-primary hover:bg-security-secondary text-white">
            {t('quick_scan')}
          </Button>
          
          {/* Mobile menu using Sheet component */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <SheetHeader className="mb-6">
                <SheetTitle>Guardia</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-4">
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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
