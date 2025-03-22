
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationLinks = () => {
  const location = useLocation();
  
  // Check if a path is active
  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
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
  );
};

export default NavigationLinks;
