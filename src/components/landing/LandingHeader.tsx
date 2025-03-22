
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import LanguageSelector from '@/components/LanguageSelector';
import { Menu, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { useDeviceDetection } from '@/hooks/use-device-detection';

const LandingHeader = () => {
  const { t } = useLanguage();
  const { isMobile } = useDeviceDetection();
  
  // These items will be used for both desktop and mobile navigation
  const navItems = [
    { href: "#features", label: t('features') },
    { href: "#testimonials", label: t('testimonials') },
    { href: "#pricing", label: t('pricing') },
    { href: "#contact", label: t('contact') },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    
    if (element) {
      window.scrollTo({
        top: element.getBoundingClientRect().top + window.scrollY - 80, // Account for header height
        behavior: 'smooth'
      });
    }
  };

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
            {navItems.map((item) => (
              <a 
                key={item.href} 
                href={item.href} 
                onClick={(e) => handleNavClick(e, item.href)}
                className="text-white hover:text-gray-300 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
            <Link to="/login" className="text-white hover:text-gray-300 transition-colors font-medium">{t('login')}</Link>
          </nav>
          
          <div className="flex items-center space-x-4">
            <LanguageSelector />
            <Link to="/signup">
              <Button className="bg-[#0099FF] hover:bg-[#007ACC] text-white font-semibold">
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
                <span className="sr-only">Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[250px] sm:w-[300px] bg-white">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <SheetClose key={item.href} asChild>
                    <a 
                      href={item.href} 
                      onClick={(e) => {
                        handleNavClick(e, item.href);
                      }}
                      className="text-lg font-medium text-gray-800 hover:text-[#0099FF] py-2"
                    >
                      {item.label}
                    </a>
                  </SheetClose>
                ))}
                <SheetClose asChild>
                  <Link to="/login" className="text-lg font-medium text-gray-800 hover:text-[#0099FF] py-2">
                    {t('login')}
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/signup" className="mt-4">
                    <Button className="bg-[#0099FF] hover:bg-[#007ACC] text-white w-full">
                      {t('get_started')}
                    </Button>
                  </Link>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default LandingHeader;
