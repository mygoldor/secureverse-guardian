
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-600 to-blue-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            {t('hero_title')}
          </h1>
          <p className="text-xl mb-10 text-blue-100">
            {t('hero_subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold">
              <Link to="/signup">
                {t('get_started')}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="text-white border-white hover:bg-blue-700/20 hover:text-blue-50">
              <Link to="/signup">
                {t('discover_guardia')}
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-16 flex justify-center">
        <div className="relative w-full max-w-4xl">
          <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
            <img 
              src="/lovable-uploads/a79c46d3-f1c2-4593-967d-8c6176e58cbc.png" 
              alt="Guardia dashboard preview" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
