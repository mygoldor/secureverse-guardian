
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';

const LandingHeader = () => {
  const { t } = useLanguage();
  
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
        
        <div className="flex items-center ml-20">
          <nav className="hidden md:flex items-center space-x-10 mr-6">
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
            <Button variant="ghost" size="icon" className="md:hidden text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
