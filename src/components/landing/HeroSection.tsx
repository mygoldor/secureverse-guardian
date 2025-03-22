
import React from 'react';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  return (
    <section className="relative py-20 overflow-hidden bg-gradient-to-b from-blue-800 to-blue-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Protection complète contre les menaces numériques
          </h1>
          <p className="text-xl mb-10 text-blue-100">
            Sécurisez vos appareils, données et vie privée avec notre solution de cybersécurité tout-en-un
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold">
              <Link to="/signup">
                Commencer
              </Link>
            </Button>
            <Button asChild size="lg" className="bg-white text-blue-700 hover:bg-blue-50 font-semibold">
              <Link to="/signup">
                Découvrir Guardia
              </Link>
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-16 flex justify-center">
        <div className="relative w-full max-w-4xl">
          <div className="aspect-video rounded-lg overflow-hidden shadow-xl">
            <img 
              src="/lovable-uploads/e43f9f04-afc5-43f6-857e-d2da3c3128f6.png" 
              alt="Guardia security illustration" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
