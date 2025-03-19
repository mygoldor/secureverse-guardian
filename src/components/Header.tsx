
import React from 'react';
import { Shield, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

const Header = () => {
  const location = useLocation();
  const { t } = useLanguage();
  
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
              <Shield className="h-8 w-8 text-security-primary" />
              <span className="font-bold text-2xl text-security-primary">Guardia</span>
            </div>
          </Link>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            to="/dashboard" 
            className={`transition-colors ${isActive('/') || isActive('/dashboard') ? 'text-security-primary' : 'text-security-muted hover:text-security-primary'}`}
          >
            {t('dashboard')}
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
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
