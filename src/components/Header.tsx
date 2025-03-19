
import React from 'react';
import { Shield, Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm py-3 px-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Shield className="h-8 w-8 text-security-primary" />
          <span className="font-bold text-2xl text-security-primary">Guardia</span>
        </div>
        
        <div className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-security-foreground hover:text-security-primary transition-colors">Dashboard</a>
          <a href="#" className="text-security-muted hover:text-security-primary transition-colors">Protection</a>
          <a href="#" className="text-security-muted hover:text-security-primary transition-colors">Privacy</a>
          <a href="#" className="text-security-muted hover:text-security-primary transition-colors">Performance</a>
          <a href="#" className="text-security-muted hover:text-security-primary transition-colors">Settings</a>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-security-danger"></span>
          </Button>
          <Button className="hidden md:inline-flex bg-security-primary hover:bg-security-secondary text-white">
            Quick Scan
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
