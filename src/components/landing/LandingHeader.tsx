
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import { Menu, X } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

const LandingHeader = () => {
  const { t } = useLanguage();
  const isMobile = useIsMobile();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  
  return (
    <header className="w-full bg-[#003366] py-4 px-4 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-3">
          <img 
            src="/lovable-uploads/a79c46d3-f1c2-4593-967d-8c6176e58cbc.png" 
            alt="Guardia" 
            className="h-10 w-auto"
          />
          <span className="font-bold text-2xl text-white">Guardia</span>
        </Link>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center ml-20">
          <nav className="flex items-center space-x-10 mr-6">
            <a href="#features" className="text-white hover:text-gray-300 transition-colors">{t('features')}</a>
            <a href="#pricing" className="text-white hover:text-gray-300 transition-colors">{t('pricing')}</a>
            <a href="#testimonials" className="text-white hover:text-gray-300 transition-colors">{t('testimonials')}</a>
            <a href="#contact" className="text-white hover:text-gray-300 transition-colors">{t('contact')}</a>
            <Link to="/login" className="text-white hover:text-gray-300 transition-colors">{t('login')}</Link>
          </nav>
          
          <div className="flex items-center space-x-3">
            <LanguageSelector />
            <Button className="bg-[#0099FF] hover:bg-[#007ACC] text-white" onClick={() => window.location.href='/signup'}>
              {t('get_started')}
            </Button>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center space-x-2">
          <LanguageSelector />
          <Button variant="ghost" size="icon" className="text-white" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-[#003366] z-40 flex flex-col p-5">
          <nav className="flex flex-col space-y-6 mt-4">
            <a 
              href="#features" 
              className="text-white text-xl hover:text-gray-300 transition-colors py-2 border-b border-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('features')}
            </a>
            <a 
              href="#pricing" 
              className="text-white text-xl hover:text-gray-300 transition-colors py-2 border-b border-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('pricing')}
            </a>
            <a 
              href="#testimonials" 
              className="text-white text-xl hover:text-gray-300 transition-colors py-2 border-b border-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('testimonials')}
            </a>
            <a 
              href="#contact" 
              className="text-white text-xl hover:text-gray-300 transition-colors py-2 border-b border-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('contact')}
            </a>
            <Link 
              to="/login" 
              className="text-white text-xl hover:text-gray-300 transition-colors py-2 border-b border-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              {t('login')}
            </Link>
          </nav>
          
          <div className="mt-8">
            <Button 
              className="bg-[#0099FF] hover:bg-[#007ACC] text-white w-full py-6" 
              onClick={() => {
                window.location.href='/signup';
                setMobileMenuOpen(false);
              }}
            >
              {t('get_started')}
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default LandingHeader;
