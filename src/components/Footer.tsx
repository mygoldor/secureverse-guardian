
import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="border-t border-gray-100 py-6 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <Shield className="h-5 w-5 text-security-primary" />
            <span className="font-bold text-lg text-security-primary">Guardia</span>
          </div>
          
          <div className="flex flex-col md:flex-row md:items-center md:space-x-6 space-y-2 md:space-y-0">
            <a href="#" className="text-sm text-security-muted hover:text-security-primary transition-colors">Help & Support</a>
            <Link to="/privacy" className="text-sm text-security-muted hover:text-security-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm text-security-muted hover:text-security-primary transition-colors">Terms of Service</Link>
            <a href="#" className="text-sm text-security-muted hover:text-security-primary transition-colors">Contact Us</a>
          </div>
        </div>
        
        <div className="mt-6 text-center md:text-right">
          <p className="text-xs text-security-muted">© {new Date().getFullYear()} Guardia Security. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
