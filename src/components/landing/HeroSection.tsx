
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection = () => {
  const { t } = useLanguage();
  
  return (
    <section id="hero" className="relative py-20 md:py-32 px-4 bg-gradient-to-r from-[#003366] to-[#0099FF]">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div className="text-left">
          <div className="flex items-center mb-6">
            <img 
              src="/lovable-uploads/a79c46d3-f1c2-4593-967d-8c6176e58cbc.png" 
              alt="Guardia" 
              className="h-16 w-auto mr-4"
            />
            <div>
              <h1 className="text-3xl md:text-5xl font-bold text-white">{t('hero_title')}</h1>
              <p className="text-[#0099FF] font-bold text-xl">CYBERSECURITY SOLUTION</p>
            </div>
          </div>
          <p className="text-xl text-gray-200 mb-8">{t('hero_subtitle')}</p>
          <Link to="/signup">
            <Button className="bg-[#00CC66] hover:bg-[#00AA55] text-white text-lg px-8 py-6">
              {t('discover_guardia')} <ArrowRight className="ml-2" />
            </Button>
          </Link>
        </div>
        <div className="hidden md:block">
          <img 
            src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b" 
            alt={t('computer_security')} 
            className="rounded-lg shadow-xl" 
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
