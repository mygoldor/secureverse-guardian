
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';

const LandingHeader = () => {
  const { t } = useLanguage();
  
  return (
    <header className="w-full bg-[#003366] py-4 px-4 sticky top-0 z-50 shadow-md">
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
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-6">
            <a href="#features" className="text-white hover:text-gray-300 transition-colors">{t('features')}</a>
            <a href="#testimonials" className="text-white hover:text-gray-300 transition-colors">{t('testimonials')}</a>
            <a href="#pricing" className="text-white hover:text-gray-300 transition-colors">{t('pricing')}</a>
            <a href="#contact" className="text-white hover:text-gray-300 transition-colors">{t('contact')}</a>
            <Link to="/login" className="text-white hover:text-gray-300 transition-colors">{t('login')}</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Link to="/signup">
              <Button className="bg-[#0099FF] hover:bg-[#007ACC] text-white">
                {t('get_started')}
              </Button>
            </Link>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className="flex md:hidden items-center space-x-2">
          <LanguageSelector />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="text-white hover:bg-blue-800">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px]">
              <div className="flex flex-col space-y-4 mt-8">
                <a href="#features" className="text-lg font-medium hover:text-security-primary py-2">{t('features')}</a>
                <a href="#testimonials" className="text-lg font-medium hover:text-security-primary py-2">{t('testimonials')}</a>
                <a href="#pricing" className="text-lg font-medium hover:text-security-primary py-2">{t('pricing')}</a>
                <a href="#contact" className="text-lg font-medium hover:text-security-primary py-2">{t('contact')}</a>
                <Link to="/login" className="text-lg font-medium hover:text-security-primary py-2">{t('login')}</Link>
                <Link to="/signup" className="mt-4">
                  <Button className="bg-[#0099FF] hover:bg-[#007ACC] text-white w-full">
                    {t('get_started')}
                  </Button>
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
