
import React from 'react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';

const HeroSection: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  // Function to handle navigation to signup page for "Get Started" button
  const handleGetStartedClick = () => {
    navigate('/signup');
  };
  
  // Function to handle navigation to signup page for "Discover Guardia" button
  const handleDiscoverGuardiaClick = () => {
    navigate('/signup');
  };
  
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
            <Button 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-blue-50 font-semibold"
              onClick={handleGetStartedClick}
            >
              {t('get_started')}
            </Button>
            <Button 
              size="lg" 
              className="bg-white text-blue-700 hover:bg-blue-50 font-semibold"
              onClick={handleDiscoverGuardiaClick}
            >
              {t('discover_guardia')}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
