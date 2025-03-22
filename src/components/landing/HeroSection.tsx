
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-800 to-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t('hero_title')}
          </h1>
          <p className="text-xl mb-10 text-blue-100">
            {t('hero_subtitle')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Link to="/signup" className="inline-block w-full sm:w-auto">
              <Button 
                size="lg" 
                className="bg-white text-blue-700 hover:bg-blue-50 font-semibold w-full"
              >
                {t('get_started')}
              </Button>
            </Link>
            <Link to="/signup" className="inline-block w-full sm:w-auto">
              <Button 
                variant="outline"
                size="lg" 
                className="bg-transparent border-white text-white hover:bg-white/10 font-semibold w-full"
              >
                {t('discover_guardia')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
